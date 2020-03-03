const weather = require('../business/weather');
const recommendation = require('../api/recommendation');

module.exports.list = async (req, resp) => {
    const w = await weather.get(req);
    const agenda = req.body.agenda;
    const user = req.session.profile;
    resp.json({
        filter: {},
        weather: w,
        outfits: await recommendation.list(user, 
            w, 
            agenda,
            req.body.age_group,
            req.body.body_type,
            req.body.hair,
            req.body.product_type_id)
    });
}

module.exports.listml = async (req, resp) => {
    const w = await weather.get(req);
    const agenda = req.body.agenda;
    const user = req.session.profile;
    resp.json({
        filter: {},
        weather: w,
        outfits: await recommendation.listml(user, 
            w, 
            agenda,
            req.body.age_group,
            req.body.body_type,
            req.body.hair,
            req.body.product_type_id)
    });
}

module.exports.get = async (req, resp) => {
    const user = req.session.profile;
    const outfit = await recommendation.get(user, req.params.id);
    resp.json({
        filter: {},
        outfits: outfit ? [outfit] : null
    });
}

module.exports.like = async (req, resp) => {
    await recommendation.rate(req.session.profile, req.params.id, 1);
    resp.json({});
}


module.exports.dislike = async (req, resp) => {
    await recommendation.rate(req.session.profile, req.params.id, 0);
    resp.json({});
}

module.exports.unlike = async (req, resp) => {
    await recommendation.rate(req.session.profile, req.params.id, -1);
    resp.json({});
}
