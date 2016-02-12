//TODO: ADD HEADER
//TODO: Implement Player functions
var GameObject = require('./GameObject.js')
		, inherits = require('util').inherits;
var Player= function () {
    GameObject.call(this);
    this.id; //may need id for plaryer AND game
    this.gameid;
};

inherits(Player, GameObject);
//Player.prototype = GameObject.prototype;
//Player.prototype.contructor = Player;
module.exports =global.Player = Player;

