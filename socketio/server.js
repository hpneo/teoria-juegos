var http = require('http');
var path = require('path');

var socketio = require('socket.io');
var express = require('express');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));

io.on('connection', function (socket) {
  console.log(socket.id);

  socket.on('new_player', function(data) {
    socket.broadcast.emit('new_player', data);
  });
  socket.on('disconnect', function () {
    //sockets.splice(sockets.indexOf(socket), 1);
    //updateRoster();
  });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Socket.io server started at", addr.address + ":" + addr.port);
});
