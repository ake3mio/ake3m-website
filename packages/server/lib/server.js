const express = require('express')
const Prismic = require('prismic-javascript')
const cms = require('./cms/index')

const app = express()

cms(app);

app.listen(3000, () => {
  console.log('Server starting on http://localhost:3000')
})
