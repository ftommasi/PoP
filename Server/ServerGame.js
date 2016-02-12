/* Author/Contributors: Saddha Santanaporn
*  Date: 2/9/2016
*  Purpose: Create the main game loop
*/

var tick = function (delay) {
    var _delay = delay;
    var timer;
    if (typeof requestAnimationFrame === 'undefined') {
        timer = function (cb) {
            setImmediate(function () {
                cb(_delay);
            }, _delay);
        }
    } else {
        timer = window.requestAnimationFrame;
    }
    return function (cb) {
        return timer(cb);
    }
};

tick = tick(100);

var Game = function (fps) {
    this.fps = fps;
    this.id;
    this.playerList = [];
    this.delay = 1000 / this.fps;
    this.lastTime = 0;
    this.raf = 0;
    this.onUpdate = function (delta) {
    };
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
