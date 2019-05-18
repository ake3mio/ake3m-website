const SitemapProvider = require('./SitemapProvider')

module.exports = function sitemap (server) {

  server.get('/sitemap.xml', function (req, res) {

    res.setHeader('content-type', 'text/xml')

    res.send(SitemapProvider.sitemap)
  })
}
