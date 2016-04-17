//TODO: ADD HEADER
//TODO: Implement Player functions
var ClientPlayer= function (x, y, texture_location, id, isServer, color) {
    GameObject.call(this);
    this.AddPhysicsComponent(x, y, new CircleBodyData(40), texture_location, color);

    //set these values so we don't rotate as we collide with stuff
    this.physicsComponent.inertia = Infinity;
    this.physicsComponent.inverseInertia = 0;
    this.oldX=x;
    this.oldY=y;
    this.newX;
    this.newY;
    this.id = id; //may need id for plaryer AND game
    this.gameid;
    this.item;
    this.type = "player";
    this.alive = true;

    this.health = {
      healthvalue: 1000,
      spritescale: 1.00
    }
}

ClientPlayer.prototype = GameObject.prototype;
ClientPlayer.prototype.contructor = ClientPlayer;

ClientPlayer.prototype.attack = function(){
  this.item = new Item(this.x,this.y,100,100,100);
};

ClientPlayer.prototype.stopAttack = function(){
  this.item = null ;
};

ClientPlayer.prototype.onCollisionEnter = function (other) {

};

ClientPlayer.prototype.dodamage = function (scaleFactor) {
  console.log("player health: " + this.health.healthvalue);
  this.health.healthvalue -= (1000 * scaleFactor);
  console.log("player health after update: " + this.health.healthvalue);
 
  console.log("this.circleRadius: " + this.physicsComponent.circleRadius); 
  if ((this.physicsComponent.circleRadius - (40 * scaleFactor)) < (40 * .10)) {
    this.physicsComponent.circleRadius = (40 * 0.10);
  } else {
    console.log(this.physicsComponent.circleRadius - scaleFactor);
    this.physicsComponent.circleRadius -= 0.4;
    Matter.Body.scale(this.physicsComponent, (1 - scaleFactor), (1 - scaleFactor));
  }


  if (this.health.healthvalue < 50) {
    this.alive = false;
    console.log("someone died!!");
  }
};

