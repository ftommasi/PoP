//TODO: ADD HEADER
//TODO: Implement Player functions
var Player= function (id, isServer) {
    GameObject.call(this);
    this.id = id; //may need id for plaryer AND game
    this.gameidi;
    this item;
}

Player.prototype = GameObject.prototype;
Player.prototype.contructor = Player;

Player.prototype.attack = function(){
  this.item = new Item(this.x,this.y,100,100,100,this.worldData);

};

Player.prototype.stopAttack = function(){
  this.item = null ;
};

