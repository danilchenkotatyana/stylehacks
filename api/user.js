const _ = require('underscore');

const api = require('./api')(process.env.user_api_endpoint);
const logger = require('../logger');

module.exports.get = async (uid) => {
    const uri = '/users/touch/web/' + uid;
    logger.info('Fetching user', uri);
    const ret = await api.get(uri);
    const user = ret.data;
    user.uid = uid;
    logger.info('Fetched user', uid, user);
    return user;
}

module.exports.save = async (user) => {
    const uri = '/users/web/' + user.uid;
    logger.info('About to save', uri, JSON.stringify(user));
    const data = _.extend({}, user);
    const response = await api.put(uri, data);
    logger.info('Saved', response.data);
    return response.data;
}