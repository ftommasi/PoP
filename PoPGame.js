/* Author/Contributors: Fausto Tommasi 
*  Date: 1/21/2016
*  Purpose: This file contains the file that will be drawn onto the canvas
*/

//PoPGame
 var then = Date.now(); //global variable used for update time modifier
 var spriteList = []; //global variable used for collision detection
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
  var Drawable = function(x,y,img){
        PIXI.Sprite.fromImage(this,img);
        this.x = x;
        this.y =  y;
        this.imageId = img;
        this.old_x = x;
        this.old_y = x;
        this.speed = 256;
  };
  
  Drawable.prototype = new PIXI.Sprite();
  Drawable.prototype.contructor = Drawable;
  
  Drawable.prototype.moveX = function(dir,modifier){
    this.x+=(this.speed*dir)*modifier;
    //this.x+=(this.speed*dir)*modifier;
  };
  Drawable.prototype.moveY = function(dir,modifier){
    this.y+=(this.speed*dir)*modifier;
    //this.y+=(this.speed*dir)*modifier;
  };
  
  Drawable.prototype.getX = function(){
    return this.x;
  };
  
  Drawable.prototype.collision = function(other){
      //TODO(Fausto): refactor collision into this function when first version is done
  }
  
  //dictionary for keyboard functionality
  var keysDown = {};
 
  
  var renderer = PIXI.autoDetectRenderer(800,600,{backgroundColor : 0x10F9bb});
  document.body.appendChild(renderer.view);
  
  var stage = new PIXI.Container(); 
  
  var wall = new Drawable(330,350,'assets/wall.png');
  var ball = new Drawable(150,130,'assets/white_ball.png');
  stage.addChild(wall);
  stage.addChild(ball);
  
  //Debug text TODO(front-end): remove when not needed before release
  var debugText1 = new PIXI.Text('1 x: ');
  var debugText2 = new PIXI.Text('2 x: ');
  var debugText3 = new PIXI.Text(' ');
  debugText1.x = 400;
  debugText1.y = 30;
  debugText2.x = 400;
  debugText2.y = 90;
  debugText3.x =200;
  debugText3.y = 200;
  stage.addChild(debugText1);
  stage.addChild(debugText2);
  
  //END Debug
  
  spriteList.push(ball);
  spriteList.push(wall);
  
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
    var debugcollision = false;  
    
   // debugText3.setText(' ');
    var collision = false;
    for(var item1 in spriteList){
        for(var item2 in spriteList){
          spriteList[0].old_x = spriteList[0].x; 
          spriteList[0].old_y = spriteList[0].y;
          spriteList[1].old_x = spriteList[1].x;
          spriteList[1].old_y = spriteList[1].y;
          
          //TODO(Fausto): uncomment when collison function is fully refactored
          /*
            if(item1!=item2){
                if(spriteList[item1].collision(spriteList[item2]){
                    collision = true;
                }
            }
          */
          
          
          //Debug text TODO(front-end): remove when not needed before release
          debugText1.setText('1 x: '+ spriteList[0].x + ' y: '+ (spriteList[0].y));
          debugText2.setText('2 x: '+ spriteList[1].x + ' y: '+ (spriteList[1].y));        
          //END Debug
          if(
              (spriteList[0].x - spriteList[0].width/2 < (spriteList[1].x + spriteList[1].width/2)) && 
              (spriteList[0].x + spriteList[0].width/2 > spriteList[1].x  - spriteList[1].width/2)&&
              (spriteList[0].y + spriteList[0].height/2 > spriteList[1].y - spriteList[1].height/2)&&
              (spriteList[0].y - spriteList[0].height/2 < spriteList[1].y + spriteList[1].height/2)
              
          ){
            collision = true;    
            // debugcollision = true;  
            } 
          }
        }
    
    //get keys and call corresponding function 
    if(38 in keysDown && !collision){ //up
        ball.moveY(-1,modifier);
    }
    if(40  in keysDown && !collision){ //down
       ball.moveY(1,modifier);
    }
    if (37  in keysDown && !collision){ // left
        ball.moveX(-1,modifier);
    }
    if(39 in keysDown && !collision){ // right
        ball.moveX(1,modifier);
    }
    if(debugcollision){
          debugText3.setText('COLLISION!');
        
    }
    
  }
  
})();
