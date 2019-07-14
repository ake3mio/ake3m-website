const express = require('express');
const cms = require('./cms');
const contact = require('./contact');
const config = require('../config');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
cms(app);
contact(app);

app.listen(config.port, () => {
    console.log('Server starting on http://localhost:' + config.port);
});
