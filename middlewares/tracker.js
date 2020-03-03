const uuidv4 = require('uuid/v4');

const userapi = require('../api/user');

const UID = '$uid';
const MAX_COOKIE_AGE = 365 * 24 * 3600 * 1000;

const keepalive = (res, uid) => {
    res.cookie(UID, uid, {
        maxAge: MAX_COOKIE_AGE,
        signed: true
    });
}

const init_default_values = async (profile) => {
    let changed = false;
    if (!profile.gender) {
        profile.gender = 'woman';
        changed = true;
    }
    if (profile.lat === null && profile.long === null) {

        
        profile.lat = 41.8755616;
        profile.long = -87.6244212;
        profile.city = 'Chicago';
        profile.state = 'IL';
        profile.country = 'USA';
        changed = true;
    }
    if (changed) {
        await userapi.save(profile);
    }
}

module.exports = async(req, res, next) => {
    if (req.session.profile) {
        keepalive(res, req.session.profile.uid);
        return await next();
    }
    let uid = req.signedCookies[UID];
    if (!uid) {
        uid = uuidv4();
    }
    keepalive(res, uid);
    req.session.profile = await userapi.get(uid);
    await init_default_values(req.session.profile);
    await next();
}