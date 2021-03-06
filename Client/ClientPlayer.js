/* Author/Contributor: Fred Trelz
 *  Date: 2/16/2016
 *  Purpose: Player class for the clients.
 */

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
	this.id = id; 
	this.gameid;
	this.item;
	this.type = "player";
	this.alive = true;
	this.flying = false;
	this.maxFuel = 100;
	this.currentFuel = this.maxFuel;
	this.fuelRegenPerSec = 10;
	this.fuelDrainPerSec = 30;

	this.health = {
	     healthvalue: 1000,
	     spritescale: 1.00
	}
}

ClientPlayer.prototype = new GameObject();
ClientPlayer.prototype.contructor = ClientPlayer;

ClientPlayer.prototype.update = function (delta) {
	if (this.flying) {
		this.currentFuel -= this.fuelDrainPerSec * (delta / 1000);
	}
	else
		this.currentFuel = Math.min(this.currentFuel + this.fuelRegenPerSec * (delta / 1000), this.maxFuel);
};

ClientPlayer.prototype.canFly = function () {
	if (!this.flying)
		return this.currentFuel > this.fuelDrainPerSec;
	else
		return this.currentFuel > 0;
};

ClientPlayer.prototype.stopAttack = function(){
	this.item = null ;
};

ClientPlayer.prototype.getSize = function(){
	var data = { health : this.health.healthvalue,
		     radius : this.physicsComponent.circleRadius}
	return data;
};

ClientPlayer.prototype.dodamage = function (scaleFactor) {
	this.health.healthvalue -= (1000 * scaleFactor);

	if ((this.physicsComponent.circleRadius - (40 * scaleFactor)) < (40 * .10)) {
		this.physicsComponent.circleRadius = (40 * 0.10);
	} else {
		this.physicsComponent.circleRadius -= 0.4;
		Matter.Body.scale(this.physicsComponent, (1 - scaleFactor), (1 - scaleFactor));
	}


	if (this.health.healthvalue < 50) {
		this.alive = false;
		this.physicsComponent.circleRadius = 0.00001;
	}
};

