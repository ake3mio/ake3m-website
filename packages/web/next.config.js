const withSass = require('@zeit/next-sass');
const flowRight = require('lodash/flowRight');
const withImages = require('next-images');

const ASSET_PREFIX = process.env.ASSET_PREFIX || '';
const applyPlugins = flowRight(
    withSass,
    withImages
);

module.exports = applyPlugins({
    poweredByHeader: false,
    webpack(config, options) {
        return config
    },
    publicRuntimeConfig: {
        API_URL: process.env.API_URL || 'http://localhost:3002',
        ASSET_PREFIX: process.env.ASSET_PREFIX
    },
    assetPrefix: ASSET_PREFIX
});
