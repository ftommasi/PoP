/* Authors/Contributors: Nick Anderson
*  Date: 2/3/16
*  Purpose: This file will contain all the functions related to the server.
*/


//List of games.
var games = [];
var game_count=0;

//Grab the game engine and the player class
require('./ServerGame.js');
require('./Player.js');

//Creates a game for the player
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

//Looks for an available, valid game, if none a createGame is called.
var joinGame=function(player){
  var validGame=false;
  if(game_count!=0){
      for(var i = 0; i<game_count; i++){
	var temp = games[i];
	var length=temp.Game.playerList.length;
	if(length<4){
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

//Adds a player to a game.
var addPlayer = function(id){
  var player={}; 
  player.Player = new Player();
  player.Player.id=id;
  return joinGame(player);
};

//Checks if the game is ready
var checkReady = function(gameid){
  if(games[gameid].Game.playerList.length==4){
    return true;
  }
  return false;
};

//Handles removing a player from the game.
var removePlayer = function(id){
  
};

//Updates the player data
//TODO Nick correct client data if needed.
var updatePlayerData = function(data){
  return data;
};


//Returns the number of players in this game.
var playLength = function(gameid){
  return games[gameid].Game.playerList.length;
};

//Returns the playerlist for this game.
var getPlayers = function(gameid, i){
  return games[gameid].Game.playerList[i];
};

//Exports all the functions so they can be used with node.
module.exports.getPlayers=getPlayers;
module.exports.playLength=playLength;
module.exports.addPlayer=addPlayer;
module.exports.removePlayer=removePlayer;
module.exports.updatePlayerData=updatePlayerData;
module.exports.checkReady=checkReady;



