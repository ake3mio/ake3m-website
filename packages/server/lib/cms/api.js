const config = require('../../config')
const Prismic = require('prismic-javascript')

module.exports = function api (request, response, next) {

  const apiPromise = Prismic.getApi(config.cms.endpoint, {
    accessToken: config.cms.access_token,
    req: request,
  })

  return apiPromise.then(api => {

    request.api = api
    next()

  }).catch(reason => {

    response.status(400).json({ reason: reason.message })

  })
}
