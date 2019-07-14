const axios = require('axios');
const config = require('../../config');

function verifyToken(token, remoteAddress) {

    const secretKey = config.recapcha.secret;

    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + token + "&remoteip=" + remoteAddress;

    return axios.get(verificationUrl, function ({ data }) {
        const body = JSON.parse(data);
        const isInvalid = body.success !== undefined && !body.success;
        return !isInvalid;
    });
}


module.exports.validateRequestMiddleware = async function (req, res, next) {
    const token = req.body.token;
    const remoteAddress = req.connection.remoteAddress;
    const sendInvalidToken = () => res.status(400).json({ error: 'Invalid token' });

    if (token === undefined || token === '' || token === null) {
        return sendInvalidToken()
    }

    const isValidToken = await verifyToken(token, remoteAddress);

    if (isValidToken) {
        return next();
    }

    return sendInvalidToken();

};
