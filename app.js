
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
      res.sendFile(__dirname + '/PoP.html');
});
app.get('/*', function(req, res){
    var file = req.params[0];
      //Send the requesting client the file.
     res.sendfile( __dirname + '/' + file );
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  var id = socket.id;
  
  //Add Player
  
});

var port = 4004;
var ip_address = '10.178.9.245';

http.listen(port, ip_address, function(){
  console.log("Listening on " + ip_address + ", port " + port);
});
  