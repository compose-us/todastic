const express = require('express');
var server = express();
var http = require('http').Server(server);
var io = require('socket.io')(http);

server.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function () {
  console.log('Todastic webserver listening on port 3000, Sire!');
});

