/*
//TODO: ADD HEADER
var keysDown = {};
var isAttacking = false;
var InputListener = function(socket){
  //TODO: Add members as necessary
  GameObject.call(this);
  this.socket=socket;
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

  if (32 in keysDown){ //Spacebar
    //TODO(Fausto): implement attack
    isAttacking = !isAttacking;

  }  

  if (this.player != null) {
    var message = {
      gameid : this.player.gameid,
      id :this.player.id,
      xFac : x_factor,
      yFac : y_factor,
      attack: isAttacking
    };
    this.socket.emit('move', message);
    Matter.Body.setVelocity(this.player.physicsComponent, Matter.Vector.create(x_factor, y_factor)); 

    if(isAttacking){
      if(!this.item){
        this.item = new Item(this.player.physicsComponent.position.x,this.player.physicsComponent.position.y,10,10);
        //  this.item.body = Bodies.rectangle(this.player.x,80,this.player.y,80,{isStatic: true});
        isAttacking = false;
      }

      else {
        this.item = null;
      }

    } 

  } 
}; 
*/
