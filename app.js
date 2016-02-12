/* Authors/Contributors: Nick Anderson
*  Date: 2/3/16
*  Purpose: Handles setting up the server to handle connections and pass stuff around.
*/


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var UUID = require('node-uuid');
var world = require('./Server/server.js');

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
  var id = socket.id;
  console.log('a user connected with id '+socket.id);
  
  //TODO Nick find/create game here and add (use that game as world).
  //Add yourself to the world
  
  //world.createGame(id);
  var player=world.addPlayer(id);
  console.log('Player id: '+player.Player.id+' Connected to game: '+player.Player.gameid);
  //Send so you are created locally.
  socket.emit('createPlayer', player);
  
  //Send to others so you get added.
  socket.broadcast.emit('addOtherPlayer', player);
  
  
  //Request the old players from the world
  socket.on('requestOldPlayers', function(){
//     for (var i = 0; i<world.players.length; i++){
//       if(world.players[i].playerId!=id)
// 	socket.emit('addOtherPlayer', world.players[i]);
//     }
  });
  
  //Move, update world(server), broadcast to others.
  socket.on('move', function(data){
    var newData = world.updatePlayerData(data);
    socket.broadcast.emit('move', newData);
  });
  
  //Remove other players as they disconnect.
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('removeOtherPlayer', player);
    world.removePlayer(player);
  });
});

var port = 4004;
var ip_address = '0.0.0.0';

http.listen(port, ip_address, function(){
  console.log("Listening on " + ip_address + ", port " + port);
});
  
