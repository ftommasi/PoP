/* Author/Contributors: Fausto Tommasi 
*  Date: 1/21/2016
*  Purpose: This file contains the file that will be drawn onto the canvas
*/

//PoPGame
 var then = Date.now(); //global variable used for update time modifier
 var spriteList = []; //global variable used for collision detection
  var collision, gravity ; //Testing for collisions on different sides
  collision = false; //global collision vairable 
  gravity = true;
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

  
 
  
  //dictionary for keyboard functionality
  var keysDown = {};
 
  
  var renderer = PIXI.autoDetectRenderer(800,600,{backgroundColor : 0x10F9bb});
  document.body.appendChild(renderer.view);
  
  var stage = new PIXI.Container(); 
  
  var wall = new Drawable(150,350,'assets/wall.png');
  var ball = new Drawable(150,130,'assets/white_ball.png');
  
  
  stage.addChild(ball);
  stage.addChild(wall);
  
  spriteList.push(ball);
  spriteList.push(wall);
  
  
  //Debug text TODO(front-end): remove when not needed before release
  var debugText1 = new PIXI.Text('1 x: ');
  var debugText2 = new PIXI.Text('2 x: ');
  
  debugText1.x = 400;
  debugText1.y = 30;
  debugText2.x = 400;
  debugText2.y = 90;
  
 
  stage.addChild(debugText1);
  stage.addChild(debugText2);

  
  //END Debug
  
  
  animate();
 
  function animate(){
      requestAnimationFrame(animate);
      var now = Date.now();
      update((now-then)/1000); // should update be outside of animate?
      then = now;
      renderer.render(stage);//this functon is what draws on the scrren
  }
  
   function update(modifier){
       
   
    for(var item1 in spriteList){
        for(var item2 in spriteList){
            if(item1!=item2){
                if(spriteList[item1].collision(spriteList[item2])){
                    collision = true;
                }
            } 
          }
        }
 //Debug text TODO(front-end): remove when not needed before release
  debugText1.setText('1 x: '+ spriteList[0].x + ' y: '+ (spriteList[0].y));
  debugText2.setText('2 x: '+ ball.y + ' y: '+ ball.max_height);        
  //END Debug
    //get keys and call corresponding function 
    if(38 in keysDown && !collision){ //up
        //HACK 
        //TODO(front-end): fix this collision work around
         ball.old_y = ball.y-100;
        //end HACK
        if(!collision && ball.y > ball.max_height){
             ball.moveY(-2,modifier);
             gravity = true;
        }
       
    }
    if(40  in keysDown && !collision){ //down
         //HACK 
        //TODO(front-end): fix this collision work around
        ball.old_y = ball.y + 10;
        //end HACK
        if(!collision){
            ball.moveY(1,modifier);
        }
       
    }
    if (37  in keysDown && !collision){ // left
        //HACK 
        //TODO(front-end): fix this collision work around
        ball.old_x = ball.x - 10;
        //end HACK
        if(!collision){
            ball.moveX(-1,modifier);
        }
            
    }
    if(39 in keysDown && !collision){ // right
        //HACK 
        //TODO(front-end): fix this collision work around
        ball.old_x = ball.x + 10;
        //end HACK
        if(!collision){
            ball.moveX(1,modifier);
        }
    }
    
    if(gravity){
        //Gravity effect
        ball.moveY(1,modifier);
        
    }
    if(collision){
        ball.max_height = ball.y - 250;
         if(ball.collisionLeft(wall)){
            ball.moveX(1,modifier);
           // gravity = false;
         }
          if(ball.collisionRight(wall)){
            ball.moveX(-1,modifier);
           // gravity = false;
        }
         if(ball.collisionBot(wall)){
            ball.moveY(-1,modifier);
            gravity = false;
        }
         if(ball.collisionTop(wall)){
            ball.moveY(1,modifier);
            //gravity = false;
        }
       
        
        
        collision = false;
        
    }
    /*
    for(var i in spriteList){
       
         if(collision){
            spriteList[i].restorePos();
             }
        spriteList[i].old_x = spriteList[i].x;
        spriteList[i].old_y = spriteList[i].y;
        }
    collision = false;
     */
  }
 
  
})();