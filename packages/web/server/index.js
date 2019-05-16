const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const { parse } = require('url');

app.prepare().then(() => {

  const server = express()

  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, {...parsedUrl})
  })

  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
