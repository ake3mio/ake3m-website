const withSass = require('@zeit/next-sass')
const flowRight = require('lodash/flowRight');
const withImages = require('next-images');

const applyPlugins = flowRight(
  withSass,
  withImages
)
module.exports = applyPlugins({
  poweredByHeader: false,
  webpack(config, options) {
    return config
  }
})
