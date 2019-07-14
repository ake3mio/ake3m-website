const config = require('../../config');
const axios = require('axios');
const { validateRequestMiddleware } = require('./recaptcha');
const CONTACT_BASE_URL = `${config.route.base_url}/contact`;
const nodemailer = require("nodemailer");

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const transport = nodemailer.createTransport({
    service: 'gmail',

    auth: {
        user: config.email.user,
        pass: config.email.password
    }
});

const validateMessageBody = body => {
    const { name, email, telephone, message } = body;

    let errors = [];
    if (typeof email !== 'string' || !emailRegex.test(email)) {
        errors.push({ error: 'Invalid email' })
    }

    if (typeof name !== 'string' || !name) {
        errors.push({ error: 'Invalid name' });
    }

    if (typeof message !== 'string' || !message) {
        errors.push({ error: 'Invalid message' });
    }

    return errors;
};


module.exports = (app) => {

    app.post(CONTACT_BASE_URL, [validateRequestMiddleware], async (req, res) => {

        const errors = validateMessageBody(req.body);

        if (errors.length) {
            return res.status(400).json(errors[0]);
        }

        const { name, email, telephone, message } = req.body;

        const mailOptions = {
            from: `${name} <${email}>`,
            to: config.email.user,
            subject: `Email from ${name} on ake3m.com`,
            text: message + (telephone ? '\n' + `Telephone: ${telephone}` : '')
        };


        transport.sendMail(mailOptions, function (error) {
            if (error) {
                res.status(400).json({ error: 'Error sending message!' });
            } else {
                res.json({ message: 'success' })
            }
        });

    });
};


