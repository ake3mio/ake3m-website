const config = require('../../config');
const api = require('./api');
const { getHomePage, getContactPage, getAboutPage } = require('./query');

const { cache, getResponseFromCache, lru } = require('./cache');

const CMS_BASE_URL = `${config.route.base_url}/cms`;
const WILD_CARD_URL = `${CMS_BASE_URL}/?*`;

module.exports = (app) => {

    app.use(WILD_CARD_URL, getResponseFromCache);
    app.use(WILD_CARD_URL, api);
    app.use(WILD_CARD_URL, cache);

    app.post(`${CMS_BASE_URL}`, function (req, res) {
        if (req.body.secret && config.cache.clear_key === req.body.secret) {
            console.log('clearing cache');
            lru.reset();
        }
        res.send('OK');
    });

    app.get(`${CMS_BASE_URL}/home`, function (req, res) {
        getHomePage(req.api).then(result => res.json(result))
    });

    app.get(`${CMS_BASE_URL}/about`, function (req, res) {
        getAboutPage(req.api).then(result => res.json(result))
    });

    app.get(`${CMS_BASE_URL}/contact`, function (req, res) {
        getContactPage(req.api).then(result => res.json(result))
    })

};
