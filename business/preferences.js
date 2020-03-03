const userapi = require('../api/user');
const weather = require('./weather');

const preferences = (profile) => {
    const ret = {
        gender: profile.gender
    };
    if (profile.lat !== null && profile.long !== null) {
        ret.location = {
            coordinates: [profile.lat, profile.long],
            city: profile.city,
            state: profile.state,
            country: profile.country
        }
    }
    return ret;
};

module.exports.get = async (req, resp) => {
    resp.json(preferences(req.session.profile));
}

module.exports.set = async (req, resp) => {
    const user = req.session.profile;
    const preferences = req.body;
    let changed = false;
    if (preferences.gender) {
        if (preferences.gender != user.gender) {
            user.gender = preferences.gender;
            changed = true;
        }
    }
    if (preferences.location) {
        user.lat = preferences.location.coordinates[0];
        user.long = preferences.location.coordinates[1];
        user.city = preferences.location.city;
        user.state = preferences.location.state;
        user.country = preferences.location.country;
        changed = true;
    }
    if (changed) {
        await userapi.save(user);
        weather.invalidate(req);
    }
    await module.exports.get(req, resp);
}
