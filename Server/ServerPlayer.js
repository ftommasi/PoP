/* Author/Contributors: Nick Anderson, Eric Whitman
 * Date: 3/01/2016
 * Purpose: The player for the server to manage.
 */

var ServerPlayer= function (x, y, id) {
    //set these values so we don't rotate as we collide with stuff
    this.oldX;
    this.oldY;
    this.newX=x;
    this.newY=y;
    this.id = id; //may need id for player AND game
    this.gameid;

    this.tag = "player";
};

module.exports =global.ServerPlayer = ServerPlayer;

ServerPlayer.prototype.currPos = function(){
	var pos ={x:this.newX, y:this.newY};
	return pos;
};

ServerPlayer.prototype.setCurrentPos = function(data){
    this.oldX = this.newX;
    this.oldY = this.newY;
    this.newX = data.pos.x;
    this.newY = data.pos.y;
};
