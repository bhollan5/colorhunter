const express = require('express')
const app = express()

app.get('/', function (req, res) {
  var colors = {
      c1: "#ffffff",
      c2: "#ababab",
      c3: "#777777",
      c4: "#111111"
  }
  res.json(colors)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})