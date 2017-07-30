var express = require('express')
var path = require('path')

var app = express()

const PORT = process.env.PORT || 3003

console.log('Server loaded')

app.use(express.static(path.join(__dirname, './public')))
app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
