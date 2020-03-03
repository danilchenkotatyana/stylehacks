const axios = require('axios');
const uuidv4 = require('uuid/v4');

require('dotenv').config();
const logger = require('../logger');

module.exports = (baseURL) => {

    const handleError = (url, method, error, extra) => {
        let args = ['Failed to perform request', method];
        if (error.response) {
            args.push(error.response.config.url,
                extra,
                error.response.status,
                error.response.headers,
                error.response.data);
        } else if (error.request) {
            args.push(error.request.path,
                extra,
                error.request);
        } else {
            args.push(url, extra, error);
        }
        logger.error(...args);
    }

    const base = axios.create({
        baseURL,
        headers: {
            'X-Maison-Me-Token': process.env.api_token,
            'X-Maison-Me-Parent-Service': 'web'
        }
    });
    const request_id = () => uuidv4();
    const transform = (c) => {
        if (!c) {
            c = {};
        }
        if (!c.headers) {
            c.headers = {};
        }
        c.headers['X-Maison-Me-Request-Id'] = request_id();
        return c;
    }
    return {
        request_id,
        get: async (url, params, config = null) => {
            try {
                const opts = transform(config);
                if (params) {
                    opts.params = params;
                }
                return await base.get(url, opts);
            } catch (e) {
                handleError(url, 'GET', e);
            }
        },
        put: async (url, data, config = null) => {
            try {
                return await base.put(url, data, transform(config));
            } catch (e) {
                handleError(url, 'PUT', e, JSON.stringify(data));
            }
        },
        post: async (url, data, config = null) => {
            try {
                return await base.post(url, data, transform(config));
            } catch (e) {
                handleError(url, 'POST', e, JSON.stringify(data));
            }
        }
    }
}
