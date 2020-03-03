const api = require('./api')(process.env.weather_api_endpoint);
const logger = require('../logger');

module.exports = async (lat, long, date, params = null) => {
    logger.info('Fetching weather', lat, long, date, params);
    let uri = '/weather/';
    uri = uri + lat + '/' + long;
    if (date) {
        uri += '/' + date;
    }
    const response = await api.get(uri, params);
    const weather = response ? response.data : null;
    logger.info('Fetched weather', weather);
    return weather;
}
