const api = require('./api')(process.env.recommendation_api_endpoint);

module.exports.list = async (user,
    weather,
    agenda,
    age_group,
    body_type,
    hair,
    product_type_id) => {

    const data = create_request(user,
        weather,
        agenda,
        age_group,
        body_type,
        hair,
        product_type_id);
    console.log(product_type_id, data);

    const response = await api.post('/recommendations_list', data);
    return response ? response.data : null;
}

module.exports.listml = async (user,
    weather,
    agenda,
    age_group,
    body_type,
    hair,
    product_type_id) => {

    const data = create_request(user,
        weather,
        agenda,
        age_group,
        body_type,
        hair,
        product_type_id);
    console.log(product_type_id, data);

    const response = await api.post('/recommendations_list_smart', data);
    return response ? response.data : null;
}

module.exports.get = async (user, id) => {
    const data = {
        user,
        outfit_id: id
    };
    // TODO logger.info('Fetching recommendation for', data);

    const response = await api.post('/recommendations', data);
    const recommendation = response ? response.data : null;
    // TODO logger.info('Fetched recommendation', recommendation);
    return recommendation;
}


module.exports.rate = async (user, outfit_id, rating) => {
    const data = {
        outfit_id,
        rating
    };
    await api.post('/users/' + user.id + '/outfit_ratings', data);
}

const create_request = (user,
    weather,
    agenda,
    age_group,
    body_type,
    hair,
    product_type_id) => {
    const data = {
        user,
        weather,
        agenda,
        count: parseInt(process.env.outfits_per_page)
    };
    if (age_group && age_group.length) {
        data.age_group = age_group;
    }
    if (body_type && body_type.length) {
        data.body_type = body_type;
    }
    if (hair && hair.length) {
        data.hair = hair;
    }
    if (product_type_id && product_type_id.length) {
        data.product_type_id = product_type_id;
    }
    return data;
}