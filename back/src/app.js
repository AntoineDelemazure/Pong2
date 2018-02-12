const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./db/db");
const player_r = require("./db/player_request");

<<<<<<< HEAD
db.init()
player_r.getPlayerPasswordByUsername('MakeUsWhole')
=======

db.init();
player_r.getAllPlayers();
>>>>>>> 2d988248b48145f1092e74f77663fbaf9e1313f8

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

