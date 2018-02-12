const express = require('express')
const app = express()

const db = require("./db/db")
const player_r = require("./db/player_request")


db.init()
player_r.getPlayerPasswordByUsername('MakeUsWhole')

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

