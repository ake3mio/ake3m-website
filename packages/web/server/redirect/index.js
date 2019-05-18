module.exports = function (server) {
  server.all(/.*/, function (req, res, next) {
    const host = req.header('host')
    if (host.match(/^www\..*/i)) {
      next()
    } else {
      res.redirect(301, 'http://www.' + host + req.url)
    }
  })
}
