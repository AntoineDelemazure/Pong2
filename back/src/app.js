require('colors');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

let port = process.env.PORT || 1337;
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./db/db");
db.init();

const routes = require('./routes/routes');

let router = express.Router();
routes.doRouting(router);

app.use('/api', router);

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.listen(app.get('port'), function () {
    console.log('App listening on port 1337')
});

