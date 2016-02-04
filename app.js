/* Authors/Contributors: Nick Anderson
*  Date: 2/3/16
*  Purpose: Handles setting up the server to handle connections and pass stuff around.
*/


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var UUID = require('node-uuid');
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
   
  socket.id = UUID();
  console.log('a user connected with id '+socket.id);
  var player = { };
  player.Player = new Player(player);
  player.Player.setPlayerID(socket.id);
  
  //Save to the socket.
  socket.player = player;
  
  
  world.findGame(player);
  
  socket.on('move', function(data){
    world.onMove(player, data);
  });
  
  socket.on('disconnect', function(){
    console.log(player.Player.getPlayerID());
    console.log(socket.id);
    world.endGame();
  });
});

var port = 4004;
var ip_address = '0.0.0.0';

http.listen(port, ip_address, function(){
  console.log("Listening on " + ip_address + ", port " + port);
});
  