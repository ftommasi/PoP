
/* Author/Contributors: Fausto Tommasi 
*  Date: 1/21/2016
*  Purpose: This file contains the file that will be drawn onto the canvas
*/

//PoPGame
 var then = Date.now(); //global variable used for update time modifier
(function(){ //javascript entry point
  
  //add listeners to grab keyboard input from user
  addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
  }, false);
  
  addEventListener("keyup", function (e) {
  	delete keysDown[e.keyCode];
  }, false);
  
  addEventListener("keypress", function (e) {
  	keysDown[e.keyCode] = true;
  }, false);

  
 
  //Drawable class 
  function Drawable(x,y,img){
        this.sprite = new PIXI.Sprite.fromImage(img);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.speed = 256;
        //TODO(front-end): make these variables represent real values
        this.height = 100;
        this.width = 100;
  };
  
  Drawable.prototype.moveX = function(dir,modifier){
    this.sprite.x+=(this.speed*dir)*modifier;
    
  };
  Drawable.prototype.moveY = function(dir,modifier){
    this.sprite.y+=(this.speed*dir)*modifier;
    
  };
  
  Drawable.prototype.getX = function(){
    return this.sprite.x;
  };
  
  //dictionary for keyboard functionality
  var keysDown = {};
 
  
  var renderer = PIXI.autoDetectRenderer(800,600,{backgroundColor : 0x10F9bb});
  document.body.appendChild(renderer.view);
  
  var stage = new PIXI.Container(); 
  
  //var walltext = new PIXI.Texture.fromImage();
  var wall = new Drawable(130,530,'assets/wall.png')
  var ball = new Drawable(140,130,'assets/white_ball.png')
  
  var debugText1 = new PIXI.Text('1 x: ');
  var debugText2 = new PIXI.Text('2 x: ');
  
  debugText1.x = 400;
  debugText1.y = 30;
  debugText2.x = 400;
  debugText2.y = 90;
  
  stage.addChild(wall.sprite);
  stage.addChild(ball.sprite);
  stage.addChild(debugText1);
  stage.addChild(debugText2);
  
  
  animate();
 
  function animate(){
      requestAnimationFrame(animate);
      var now = Date.now();
      update((now-then)/1000); // should update be outside of animate?
      then = now;
      renderer.render(stage);
  }
  
   function update(modifier){
    
    //TODO(Fausto):get this working
    //basic collision detection
    var update = true;
    for(var item1 in stage){
        for(var item2 in stage){
          debugText1.setText('1 x: '+ typeof(item1.x));
          debugText2.setText('2 x: '+ (item2.x + 100).toString());
          if(item1 != item2){
              if(item1.x <= (item2.x + 100)){
                update = false;        
              }
            } 
          }
        }
    
    
    //get keys and call corresponding function 
    if(38 in keysDown && update){ //up
        ball.moveY(-1,modifier);
    }
    if(40  in keysDown && update){ //down
       ball.moveY(1,modifier);
    }
    if (37  in keysDown && update){ // left
        ball.moveX(-1,modifier);
    }
    if(39 in keysDown && update){ // right
        ball.moveX(1,modifier);
    }
    
    
  }
  
})();