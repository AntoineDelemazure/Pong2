require('colors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let port = process.env.PORT || 1337;
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./db/db");
const routes = require('./routes/routes');

db.init();

let router = express.Router();
routes.doRouting(router);

app.use('/api', router);

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.listen(app.get('port'), function () {
    console.log('App listening on port 1337')
});

