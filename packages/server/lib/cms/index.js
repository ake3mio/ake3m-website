const config = require('../../config')
const api = require('./api')
const { getHomePage, getContactPage, getAboutPage } = require('./query')

const { cache, getResponseFromCache } = require('./cache')

const CMS_BASE_URL = `${config.route.base_url}/cms`
const WILD_CARD_URL = `${CMS_BASE_URL}/?*`

module.exports = (app) => {

  app.use(WILD_CARD_URL, getResponseFromCache)
  app.use(WILD_CARD_URL, api)
  app.use(WILD_CARD_URL, cache)

  app.get(`${CMS_BASE_URL}/home`, function (req, res) {
    getHomePage(req.api).then(result => res.json(result))
  })

  app.get(`${CMS_BASE_URL}/about`, function (req, res) {
    getAboutPage(req.api).then(result => res.json(result))
  })

  app.get(`${CMS_BASE_URL}/contact`, function (req, res) {
    getContactPage(req.api).then(result => res.json(result))
  })

}
