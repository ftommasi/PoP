//TODO: ADD HEADER

function InputListener(){
  //TODO: Add members as necessary
  this.player 


};


InputListener.prototype.update = function (delta) { 
 
     x_factor = y_factor = 0; 

     if (38 in keysDown) { //up 
	     y_factor = -2; 
	     player.WHATERVER();i//TODO IMPLEMENT CORRECT FUNCTION
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

     if (this.localPlayer != null) { 
	     Matter.Body.setVelocity(this.localPlayer.physicsComponent, Matter.Vector.create(x_factor, y_factor)); 
     } 
}; 

