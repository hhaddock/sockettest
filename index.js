const express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('app'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

io.on('connection', function(socket){
  socket.broadcast.emit('conn', { msg: "user has connected!"});
  socket.on('disconnect', function(){
    io.emit('disconnect', "User has disconnected");
  });
  socket.on('msg', function(msg){
    io.emit('msg', msg);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
