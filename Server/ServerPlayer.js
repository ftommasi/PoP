//TODO: ADD HEADER
//TODO: Implement Player functions
var GameObject = require('./GameObject.js')
		, inherits = require('util').inherits;

//TODO: Update this so it behaves like Client - should consider a better way to do this!
var ServerPlayer= function (x, y, texture_location, id, isServer) {
    GameObject.call(this);
    this.AddPhysicsComponent(x, y, new GameObject.RectBodyData(80, 80), texture_location);

    //set these values so we don't rotate as we collide with stuff
    this.physicsComponent.inertia = Infinity;
    this.physicsComponent.inverseInertia = 0;
    this.oldX;
    this.oldY;
    this.newX=x;
    this.newY=y;
    this.id = id; //may need id for plaryer AND game
    this.gameid;
    this.item;

    this.tag = "player";
};

inherits(ServerPlayer, GameObject);
//Player.prototype = GameObject.prototype;
//Player.prototype.contructor = Player;
module.exports =global.ServerPlayer = ServerPlayer;

ServerPlayer.prototype.update = function(delta){
  ServerPlayer.super_.prototype.update(delta);
};
ServerPlayer.prototype.attack = function(){
    this.item = new Item(this.x,this.y,100,100,100,this.worldData);  
};

ServerPlayer.prototype.stopAttack = function(){
    this.item = null ;
};

