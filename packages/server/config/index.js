module.exports = {
  port: process.env.CMS_PORT || 3002,
  cms: {
    access_token: process.env.AKE3M_CMS_ACCESS_TOKEN,
    endpoint: process.env.AKE3M_CMS_ENDPOINT
  },
  route: {
    base_url: '/api'
  }
}
