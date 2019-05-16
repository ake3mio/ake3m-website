const mung = require('express-mung')
const LRU = require('lru-cache')

const options = {
  max: 500,
  maxAge: 1000 * 60 * 60,
}

const lru = new LRU(options)

const CACHE_RESULT = {
  HIT: 'HIT',
  MISS: 'MISS',
}

const CACHE_HEADER = 'cache';

function cacheResponse (body, request, response) {

  const cacheHeader = response.getHeader(CACHE_HEADER)

  if (cacheHeader === CACHE_RESULT.MISS) {
    lru.set(request.route.path, body)
  }

  return body
}

function getResponseFromCache (request, response, next) {

  const result = lru.get(request.baseUrl)

  if (result) {
    response.setHeader(CACHE_HEADER, CACHE_RESULT.HIT)
    return response.json(result)
  }

  response.setHeader(CACHE_HEADER, CACHE_RESULT.MISS)

  next()
}

module.exports = {
  cache: mung.json(cacheResponse),
  getResponseFromCache
}
