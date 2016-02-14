/* Authors/Contributors: Nick Anderson
*  Date: 2/3/16
*  Purpose: This file will contain all the functions related to the server.
*/

//var server = module.exports = { games : {}, game_count:0 };

var games = [];
var game_count=0;
require('./ServerGame.js');
require('./Player.js');
var createGame=function(player){
  var game={};
  
  console.log('Created game.');
  game.Game=new Game(60);
  game.Game.id=game_count;
  games.push(game);
  player.Player.gameid=game.Game.id;
  game.Game.playerList.push(player);
  game_count++;
  return player.Player.gameid;
};

var joinGame=function(player){
  var validGame=false;
  if(game_count!=0){
      for(var i = 0; i<game_count; i++){
	var temp = games[i];
	if(temp.Game.playerList.length<4){
	  player.Player.gameid=i;
	  temp.Game.playerList.push(player);
	  validGame=true;
	  break;
	}
      }
      if(!validGame){
	player.Player.gameid=createGame(player);
      }
  }
  else{
    player.Player.gameid=createGame(player);
  }
  return player;
};

var addPlayer = function(id){
  var player={}; 
  player.Player = new Player();
  player.Player.id=id;
  return joinGame(player);
};

var checkReady = function(gameid){
  if(games[gameid].Game.playerList.length==4){
    return true;
  }
  return false;
};

var removePlayer = function(id){
  
};

var updatePlayerData = function(data){
  var player={};
  player.Player = new Player();
  player.Player.gameid=data.Player.gameid;

  return player;
};


module.exports.addPlayer=addPlayer;
module.exports.removePlayer=removePlayer;
module.exports.updatePlayerData=updatePlayerData;
module.exports.checkReady=checkReady;



