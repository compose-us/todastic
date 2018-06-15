const express = require('express');
var server = express();

server.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

server.listen(3000, function () {
  console.log('Todastic webserver listening on port 3000, Sire!');
});

