/* Authors/Contributors: Nick Anderson
*  Date: 2/3/16
*  Purpose: This file will contain all the functions related to the server.
*/


//List of games.
var games = [];
var game_count=0;
var num_players=4;
//Grab the game engine
require('./ServerGame.js');

//Creates a game for the player
var createGame=function(player){
  var game={};
  
  game.Game=new Game(game_count);
  games.push(game);
  player.gameid=game.Game.getGameId();
  player.newX=100;
  player.newY=500;
  game.Game.addOtherPlayer(player);
  game_count++;
  return player.gameid;
};

//Looks for an available, valid game, if none a createGame is called.
var joinGame=function(player){
  var validGame=false;
  if(game_count!=0){
      for(var i = 0; i<game_count; i++){
        var temp = games[i];
        var length=temp.Game.playerList.length;
        if(length<num_players){
          player.gameid=i;
          player.newX=100*(length+3);
          player.newY=500;
          temp.Game.addOtherPlayer(player);
          validGame=true;
          break;
        }
      }
      if(!validGame){
	    player.gameid=createGame(player);
      }
  }
  else{
    player.gameid=createGame(player);
  }
  return player;
};

//Adds a player to a game.
var addPlayer = function(id){
  var player={
    id : id,
    gameid: null,
    oldX: null,
    oldY: null,
    newX: null,
    newY: null
  }; 
  return joinGame(player);
};

//Checks if the game is ready
var checkReady = function(gameid){
  if(games[gameid].Game.playerList.length==num_players){
    return true;
  }
  return false;
};

//Handles removing a player from the game.
var removePlayer = function(id, gameid){
  games[gameid].Game.removePlayer(id);
};

//Updates the player data
//TODO Nick correct client data if needed.
var updatePlayerData = function(data){
    var newData = games[data.gameid].Game.updatePlayerPosition(data);
    return newData;
};


//Returns the number of players in this game.
var playLength = function(gameid){
  return games[gameid].Game.playerList.length;
};

//Returns the playerlist for this game.
var getPlayers = function(gameid, i){
    var player={
    id : null,
    gameid: null,
    oldX: null,
    oldY: null,
    newX: null,
    newY: null
  }; 
  
  var temp = games[gameid].Game.playerList[i];
  player.id = temp.ServerPlayer.id;
  player.gameid=temp.ServerPlayer.gameid;
  player.oldX = temp.ServerPlayer.oldX;
  player.oldY=temp.ServerPlayer.oldY;
  player.newX=temp.ServerPlayer.newX;
  player.newY=temp.ServerPlayer.newY;
  return player;
};

//Exports all the functions so they can be used with node.
module.exports.getPlayers=getPlayers;
module.exports.playLength=playLength;
module.exports.addPlayer=addPlayer;
module.exports.removePlayer=removePlayer;
module.exports.updatePlayerData=updatePlayerData;
module.exports.checkReady=checkReady;



