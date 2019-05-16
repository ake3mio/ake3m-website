const express = require('express')
const cms = require('./cms/index')
const config = require('../config')

const app = express()

cms(app)

app.listen(config.port, () => {
  console.log('Server starting on http://localhost:' + config.port)
})
