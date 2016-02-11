/* Authors/Contributors: Nick Anderson
*  Date: 2/3/16
*  Purpose: This file will contain all the functions related to the server.
*/

//var server = module.exports = { games : {}, game_count:0 };

var games = [];
var players=[];

require('./Game.js');
var createGame=function(id){
  var game={};
  console.log('Created game.');
  game.Game=new Game(60);
  
}

var addPlayer = function(id){
  var player = new Player();
  player.playerId=id;
  
  //TODO call addPlayer in game
  
  return player;
};

var removePlayer = function(player){
  //TODO Nick call remove Player in game.
};

var updatePlayerData = function(data){
  var player = //TODO Nick getPlayerById(data.playerId);
  player.x=data.x;
  player.y=data.y;
  return player;
};
module.exports.createGame=createGame;
module.exports.players=players;
module.exports.addPlayer=addPlayer;
module.exports.removePlayer=removePlayer;
module.exports.updatePlayerData=updatePlayerData;



