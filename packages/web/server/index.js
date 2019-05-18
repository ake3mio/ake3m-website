const express = require('express')
const next = require('next')
const path = require('path')
const sitemap = require('./sitemap')

const PROJECT_ROOT_PATH = path.join(__dirname, '..')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: PROJECT_ROOT_PATH })
const handle = app.getRequestHandler()
const { parse } = require('url')

app.prepare().then(() => {

  const server = express()

  server.use(express.static(path.join(PROJECT_ROOT_PATH, 'public')))

  sitemap(server)

  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, { ...parsedUrl })
  })

  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
