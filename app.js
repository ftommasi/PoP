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
  socket.on('join', function(){
    var player=world.addPlayer(id);
    var item = world.addItem(id)
    console.log('Player id: '+player.Player.id+' Connected to game: '+player.Player.gameid);
    
  
    //Send so you are created locally.
    //console.log(player);
    socket.emit('createPlayer', player);
    
    //Send to others so you get added.
    socket.broadcast.emit('addOtherPlayer', player);
    
    for (var i =0; i<world.playLength(player.Player.gameid); i++){
      var temp = world.getPlayers(player.Player.gameid, i);
      if(temp.Player.id!=player.Player.id){
	socket.emit('RequestOldPlayer', temp);
      }
    }
    
    //Can we start the game?
    if(world.checkReady(player.Player.gameid)){
      socket.broadcast.emit('start', player.Player.gameid);
    };
  
  });
  
  //Move, update world(server), broadcast to others.
  socket.on('move', function(data){
    var newData = world.updatePlayerData(data);
    socket.broadcast.emit('move', newData);
  });
  
  //Remove other players as they disconnect.
  socket.on('disconnect', function(){
 
  });
});

var port = 4004;
var ip_address = '0.0.0.0';

http.listen(port, ip_address, function(){
  console.log("Listening on " + ip_address + ", port " + port);
});
  
