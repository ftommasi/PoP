/* Author/Contributors: Saddha Santanaporn, Fausto Tommasi, Nicholas Anderson, Eric Whitman
*  Date: 2/9/2016
*  Purpose: Create the main game loop
*/
require('./ServerPlayer.js');

var Game = function (id) {
    this.id=id;
    this.playerList=[];
    this.lastTime = 0;

    // create a ground
    this.ground = {x:400, y:610, width:810, height:60, isStatic:true}; 
};

module.exports = global.Game = Game;

Game.prototype.getGameId = function(){
    return this.id;
};

Game.prototype.addOtherPlayer = function(player){
  var newPlayer ={};
  newPlayer.ServerPlayer=new ServerPlayer(player.newX, player.newY, player.id);
  newPlayer.ServerPlayer.oldX = player.oldX;
  newPlayer.ServerPlayer.oldY = player.oldY;
  newPlayer.ServerPlayer.gameid = player.gameid;
  this.playerList.push(newPlayer);
};

Game.prototype.updatePlayerPosition = function(data){
    for (var i=0; i<this.playerList.length; i++){
        var temp = this.playerList[i];
        if(temp.ServerPlayer.id == data.id){
            temp.ServerPlayer.setCurrentPos(data);
            break;
        }
    }
   return data;
}

Game.prototype.removePlayer = function(data){
	this.playerList.splice(this.playerList.indexOf(data),1);
};
