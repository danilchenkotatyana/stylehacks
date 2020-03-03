const weatherapi = require('../api/weather');

const TTL_HOURS = 6;

const is_weather_valid = (weather, date) => {
    date = date || '';
    return weather && weather.expires >= Date.now() && weather.date === date;
}

const is_profile_valid = (profile) => {
    return profile && profile.lat && profile.long;
}

const wrap = (weather, req) => {
    req.session.weather = {
        data: weather,
        expires: Date.now() + TTL_HOURS * 3600 * 1000,
        date: req.body.date || ''
    };
    req.session.save();
}

module.exports.get = async (req) => {
    let w = req.session.weather;
    if (is_weather_valid(w, req.body.date)) {
        return w.data;
    }
    const profile = req.session.profile;
    if (!is_profile_valid(profile)) {
        return null;
    }
    const extra = profile.city ? {city: profile.city} : null;
    w = await weatherapi(profile.lat, profile.long, req.body.date, extra);
    wrap(w, req);
    return w;
}

module.exports.invalidate = (req) => {
    delete req.session.weather;
    req.session.save();
}
