require('colors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let port = process.env.PORT || 1337;
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./db/db");
db.init();

<<<<<<< HEAD
db.init()
player_r.getPlayerPasswordByUsername('MakeUsWhole')
=======
const routes = require('./routes/routes');

let router = express.Router();
routes.doRouting(router);

app.use('/api', router);
>>>>>>> 462b978259e2d5eb3755304d718488c3a6194289

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.listen(app.get('port'), function () {
    console.log('App listening on port 1337')
});

