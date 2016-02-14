//TODO: ADD HEADER
var keysDown = {};

var InputListener = function(){
  //TODO: Add members as necessary
  GameObject.call(this);
  this.player;
  addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    addEventListener("keypress", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

};
InputListener.prototype = GameObject.prototype;
InputListener.prototype.contructor = InputListener;

InputListener.prototype.update = function (delta) { 
 
     x_factor = y_factor = 0; 

     if (38 in keysDown) { //up 
	     y_factor = -2; 
	     //player.WHATERVER();i//TODO IMPLEMENT CORRECT FUNCTION
     } 
     if (40 in keysDown) { //down 
	     y_factor = 2; 
     } 
     if (37 in keysDown) { // left 
	     x_factor = -2; 
     } 
     if (39 in keysDown) { // right 
	     x_factor = 2; 
     } 

     if (this.player != null) { 
	     Matter.Body.setVelocity(this.player.physicsComponent, Matter.Vector.create(x_factor, y_factor)); 
     } 
}; 

