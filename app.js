/* Code to handle setting up a server hosting.
   
   Usage : nodejs app.js

*/

  var gamePort = 4004,
      
      io = require('socket.io'),
      express = require('express'),
      UUID = require('node-uuid'),
      
      http = require('http'),
      app = express();
      server = http.createServer(app);
      
 //Set up the express server.
 
   //Listen on the gamePort.
      server.listen(gamePort);
      
   //See if it worked.
      console.log('Express: Listening on ' + gamePort);
      
   //Request index.html
      
      app.get('/', function(req, res){
	console.log('trying to load %s', __dirname + '/index.html');
	res.sendfile('/index.html', {root:__dirname});
      });
      
    //Listen for requests on /*
      
      app.get('/*', function(req, res, next){
	var file = req.params[0];
	
	console.log('Express: file requested : ' + file);
	res.sendfile(__dirname + '/' + file);
      });
      
     //Create a socket using the express server.
      var sio = io.listen(server);
      
  /* TODO Possibly get rid of this.
   *  sio.configure(function (){
	sio.set('log level', 0);
      
	sio.set('authorization', function (handshakeData, callback){
	  callback(null, true); //error first callback
	});
      });
      */
      
      gameServer = require('./game.server.js');
      
      //When a client connects this will be called.
      sio.sockets.on('connection', function (client) {
	
	client.userid = UUID();
	
	client.emit('onconnected', { id: client.userid});
	
	//TODO find game
	
	
	//Log that someone connected
	console.log('socket.io: player ' + client.userid + ' connected');
	
	client.on('message', function(m) {
	  //TODO send message to game server
	});
	
	client.on('disconnect', function(){
	  //Log on disconnect
	  console.log('socket.io: player ' + client.userid + ' disconnected');
	  
	}); //client.on disconnect
      }); //sio.on connection