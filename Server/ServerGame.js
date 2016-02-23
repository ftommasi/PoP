/* Author/Contributors: Saddha Santanaporn
*  Date: 2/9/2016
*  Purpose: Create the main game loop
*/

var Game = function () {
  this.id;
  this.playerList = [];
};

module.exports =global.Game = Game;
Game.prototype.update = function (delta) {
    this.onUpdate(delta);
};

Game.prototype.loop = function (now) {
    this.raf = tick(this.loop.bind(this));
    var delta = now - this.lastTime;
    if (delta >= this.delay) {
        this.update(delta);
        this.lastTime = now;
    }
};
Game.prototype.start = function () {
    if (this.raf < 1) {
        this.loop(0);
    }
};
Game.prototype.stop = function () {
    if (this.raf > 0) {
        //TODO(Nick): Broadcast stop to all client games
	//cancelAnimationFrame(this.raf);
        this.raf = 0;
    }
};

Game.prototype.addItem = function (item){
  this.itemList.push(item);
};

