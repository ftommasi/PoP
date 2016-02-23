/* Authors/Contributors: Nick Anderson
*  Date: 2/3/16
*  Purpose: Handles setting up the server to handle connections and pass stuff around.
*/

//Grabs all node modules, and the server file for use.
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var UUID = require('node-uuid');
var world = require('./Server/server.js');

//Send the index page
app.get('/', function(req, res){
      res.sendFile(__dirname + '/index.html');
});

//Send any page requested.
app.get('/*', function(req, res){
    var file = req.params[0];
      //Send the requesting client the file.
     res.sendfile( __dirname + '/' + file );
});

io.on('connection', function(socket){
  //Redifine the socket id.
  socket.id = UUID();
  var socketid = socket.id;
  console.log('a user connected with id '+socket.id);
  //When a client calls join do this.
  socket.on('join', function(){
    //Find a game.
    var player=world.addPlayer(socketid);
    console.log('Player id: '+player.ServerPlayer.id+' Connected to game: '+player.ServerPlayer.gameid);
    
    var message = {
      id : player.ServerPlayer.id,
      gameid : player.ServerPlayer.gameid,
      oldX : player.ServerPlayer.oldX,
      oldY : player.ServerPlayer.oldY,
      newX : player.ServerPlayer.newX,
      newY : player.ServerPlayer.newY
    };
    //Send so you are created locally.
    socket.emit('createPlayer', message);
    
    //Send to others so you get added.
    //TODO bind this socket to a room.
    socket.broadcast.emit('addOtherPlayer', message);

    //Send the players in the game to the client who just connected.
    for (var i =0; i<world.playLength(player.ServerPlayer.gameid); i++){
      var temp = world.getPlayers(player.ServerPlayer.gameid, i);
      if(temp.ServerPlayer.id!=player.ServerPlayer.id){
        var socketMessage = {
          id : temp.ServerPlayer.id,
          gameid : temp.ServerPlayer.gameid,
          oldX : temp.ServerPlayer.oldX,
          oldY : temp.ServerPlayer.oldY,
          newX : temp.ServerPlayer.newX,
          newY : temp.ServerPlayer.newY
        };
	socket.emit('RequestOldPlayer', socketMessage);
      }
    }
    
    //Can we start the game?
    if(world.checkReady(player.ServerPlayer.gameid)){
      socket.broadcast.emit('start', player.ServerPlayer.gameid);
    };
  
  });
  
  //Move, update world(server), broadcast to others.
  socket.on('move', function(data){
    var newData = world.updatePlayerData(data);
    socket.broadcast.emit('move', newData);
  });
  
  //TODO Remove other players as they disconnect.
  socket.on('disconnect', function(){
 
  });
});

var port = 4004;
var ip_address = '0.0.0.0';
//Set to listen on this ip and this port.
http.listen(port, ip_address, function(){
  console.log("Listening on " + ip_address + ", port " + port);
});
  
