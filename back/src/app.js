const express = require('express')
const app = express()

const bdd = require("./bdd/bdd")

bdd.connect()
bdd.init()
bdd.getPeoplebyID(0)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

