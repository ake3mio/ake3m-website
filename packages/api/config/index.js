module.exports = {
    port: process.env.CMS_PORT || 3002,
    cms: {
        access_token: process.env.AKE3M_CMS_ACCESS_TOKEN,
        endpoint: process.env.AKE3M_CMS_ENDPOINT
    },
    recapcha: {
        secret: process.env.AKE3M_RECAPCHA_SECRET
    },
    route: {
        base_url: '/api'
    },
    email: {
        user: process.env.AKE3M_EMAIL,
        password: process.env.AKE3M_EMAIL_PASSWORD
    },
    cache: {
        clear_key: process.env.AKE3M_CACHE_CLEAR_KEY,
    }
};
