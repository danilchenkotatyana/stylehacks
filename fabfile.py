"""
Requirements:
    pip install pyyaml
Docs:
    http://docs.fabfile.org/en/1.14/usage/fab.html#per-task-arguments
"""

import os
from os import listdir
from os.path import isfile, join
import time
from datetime import datetime, timedelta

from fabric.api import local, abort, lcd, prompt
import yaml

PROJECT_PROD = 'maison-me'
PROJECT_STAGING = 'maison-me-staging'

SERVICES = [
    'web',
]


# def deploy(service, ver=None):
#     if service not in SERVICES:
#         abort('`{}` service is not defined'.format(service))
#     _deploy_service(service, PROJECT_STAGING, version=ver)


def deploy_prod(service, ver=None):
    if service not in SERVICES:
        abort('`{}` service is not defined'.format(service))
    _deploy_service(service, PROJECT_PROD, version=ver)


def _deploy_service(service, project, version):
    service_dir = '.'
    service_name = service

    project_dir = os.path.dirname(os.path.realpath(__file__))

    docker_file = 'Dockerfile'
    if project == PROJECT_PROD:
        docker_file = 'Dockerfile.prod'

    if not version:
        version = datetime.utcnow().strftime("%Y%m%d%H%M")

    cmd_docker_build = 'docker build -t gcr.io/{project}/{service_name}:{version} -f {docker_file} .'.format(
        project=project, service_name=service_name, version=version, docker_file=docker_file)
    cmd_docker_push = 'docker push gcr.io/{project}/{service_name}:{version}'.format(
        project=project, service_name=service_name, version=version
    )
    cmd_update_image = 'kubectl set image deployment/{service_name} {service_name}=gcr.io/{project}/{service_name}:{version}'.format(
        project=project, service_name=service_name, version=version
    )

    cmd_cron = ''
    cron_jobs = []
    manifests_dir = 'manifests_{}'.format('prod' if project == PROJECT_PROD else 'staging')
    cron_dir = os.path.join(project_dir, service_dir, manifests_dir)
    arr = _search_cron_files(cron_dir)
    if arr:
        for f in arr:
            with open('{}/{}.yaml'.format(cron_dir, f), 'r') as stream:
                data = yaml.safe_load(stream)
            cron_jobs.append('kubectl delete -f {}/{}.yaml'.format(manifests_dir, f))
            cron_jobs.append('kubectl apply -f {}/{}.yaml'.format(manifests_dir, f))
            cron_jobs.append('kubectl set image cronjob/{cron_job_name} {service_name}=gcr.io/{project}/{service_name}:{version}'.format(
                project=project, service_name=service_name, version=version, cron_job_name=data['metadata']['name'],
            ))
        cmd_cron = '\n * '.join(cron_jobs)

    metadata = '\nMetadata: \n\n project: [{}]\n service: [{}]\n version: [{}]\n \n'.format(
        project, service_name, version
    )
    question = 'Commands to execute: \n\n * {}\n * {}\n * {}\n\n'.format(
        cmd_docker_build, cmd_docker_push, cmd_update_image
    )
    if cmd_cron:
        cmd_cron = 'Cron updates: \n\n * {}\n\n'.format(cmd_cron)
    res = prompt('{}{}{}Do you want to continue (Y/n)?\n'.format(metadata, question, cmd_cron), default='y')
    if not res or res.lower()[0] != 'y':
        abort('Stop all.')

    local('gcloud container clusters get-credentials {} --project {}'.format(
        'app' if project == PROJECT_PROD else 'staging', project))
    with lcd(os.path.join(project_dir, service_dir)):
        local(cmd_docker_build)
        local(cmd_docker_push)
        local(cmd_update_image)

    print('..................................')
    local('kubectl rollout status deployment {service_name}'.format(
        service_name=service_name
    ))

    print('..................................')
    with lcd(os.path.join(project_dir, service_dir)):
        for cmd in cron_jobs:
            if ' delete ' in cmd:
                try:
                    local(cmd)
                except Exception as e:
                    print('WARNING! Cannot execute: {}'.format(cmd))
                    print('WARNING! {}'.format(e))
            else:
                local(cmd)


def _search_cron_files(cron_dir):
    res = []
    files = [f for f in listdir(cron_dir) if isfile(join(cron_dir, f))]
    for f in files:
        if f[:5] != 'cron-' or f[-5:] != '.yaml':
            continue
        res.append(f[:-5])
    return res
