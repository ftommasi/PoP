/* Authors/Contributors: Nick Anderson
*  Date: 2/3/16
*  Purpose: Handles setting up the server to handle connections and pass stuff around.
*/

//Grabs all node modules, and the server file for use.
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var UUID = require('node-uuid');
var world = require('./Server/Server.js');

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
    console.log('Player id: '+player.id+' Connected to game: '+player.gameid);
    socket.gameid=player.gameid;
    //Send so you are created locally.
    socket.emit('createPlayer', player);
    
    //Send to others so you get added.
    //TODO bind this socket to a room.
    socket.broadcast.emit('addOtherPlayer', player);

    //Send the players in the game to the client who just connected.
    for (var i =0; i<world.playLength(player.gameid); i++){

      var temp = world.getPlayers(player.gameid, i);
      if(temp.id!=player.id){
	socket.emit('RequestOldPlayer', temp);
      }
    }
    
    //Can we start the game?
    if(world.checkReady(player.gameid)){
      socket.broadcast.emit('start', player.gameid);
    };
  
  });
  
  //Move, update world(server), broadcast to others.
  socket.on('move', function(data){
    //console.log(data);
    var newData = world.updatePlayerData(data);
    //console.log(newData);
    socket.broadcast.emit('move', newData);
  });
  socket.on('hit', function(data){
   //TODO: world.hit(data)
  socket.broadcast.emit('hit', data);
  });
  
  //TODO Remove other players as they disconnect.
  socket.on('disconnect', function(){
   console.log(socket.id);
   console.log(socket.gameid);
     var data={id:socket.id, gameid:socket.gameid};
   socket.broadcast.emit('removePlayer', data); 
   world.removePlayer(socket.id, socket.gameid);
  });

  socket.on('restart', function(data) {
    if (world.checkReady(data.gameid)) {
      socket.broadcast.emit('gameover', data);
    }
  });
});

var port = 4004;
var ip_address = '0.0.0.0';
//Set to listen on this ip and this port.
http.listen(port, ip_address, function(){
  console.log("Listening on " + ip_address + ", port " + port);
});
  
