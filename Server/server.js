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
  player.Player.startX=100;
  player.Player.startY=500;
  game_count++;
  return player.Player.gameid;
};

var joinGame=function(player){
  var validGame=false;
  if(game_count!=0){
      for(var i = 0; i<game_count; i++){
	var temp = games[i];
	var length=temp.Game.playerList.length;
	if(length<2){
	  player.Player.gameid=i;
	  player.Player.startX=100*(length+3);
	  player.Player.startY=500;
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
  if(games[gameid].Game.playerList.length==2){
    return true;
  }
  return false;
};

var removePlayer = function(id){
  
};

var updatePlayerData = function(data){
  return data;
};

var playLength = function(gameid){
  return games[gameid].Game.playerList.length;
};

var getPlayers = function(gameid, i){
  return games[gameid].Game.playerList[i];
};
module.exports.getPlayers=getPlayers;
module.exports.playLength=playLength;
module.exports.addPlayer=addPlayer;
module.exports.removePlayer=removePlayer;
module.exports.updatePlayerData=updatePlayerData;
module.exports.checkReady=checkReady;



