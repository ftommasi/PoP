/* Authors/Contributors: Nick Anderson
*  Date: 2/3/16
*  Purpose: Handles setting up the server to handle connections and pass stuff around.
*/


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var world = require('./server.js');
  require('./Player.js');

app.get('/', function(req, res){
      res.sendFile(__dirname + '/index.html');
});
app.get('/*', function(req, res){
    var file = req.params[0];
      //Send the requesting client the file.
     res.sendfile( __dirname + '/' + file );
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  var player = { };
  player.Player = new Player(player);
  player.Player.setPlayerID(socket.id);
  console.log(player.Player.getPlayerID());

  world.findGame(player);
  
  socket.on('move', function(data){
    world.onMove(player, data);
  });
  
  socket.on('disconnect', function(){
    console.log(player.id);
    console.log(socket.id);
    world.endGame();
  });
});

var port = 4004;
var ip_address = '10.178.9.245';

http.listen(port, ip_address, function(){
  console.log("Listening on " + ip_address + ", port " + port);
});
  