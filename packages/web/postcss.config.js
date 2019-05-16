module.exports = function () {
  return {
    plugins: [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer'),
    ],
  }
}
