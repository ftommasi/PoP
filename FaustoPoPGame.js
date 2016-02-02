/* Author/Contributors: Fausto Tommasi 
*  Date: 1/21/2016
*  Purpose: This file contains the file that will be drawn onto the canvas
*/

//PoPGame
 var then = Date.now(); //global variable used for update time modifier
<<<<<<< HEAD:FaustoPoPGame.js
 var spriteList = []; //global variable used for collision detection
  var collision, gravity ; //Testing for collisions on different sides
  collision = false; //global collision vairable 
  gravity = true;
=======
 var characterList = []; //global variable used for collision detection
  var collision = false; //global collision vairable 
>>>>>>> 4c695f00ff6e5969fa8ce1fbc87a2fa1e44c2073:PoPGame.js
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
  
  //var wall = new Drawable(150,350,'assets/wall.png');
  //var ball = new Drawable(150,130,'assets/white_ball.png');
  var wall = new Character(150, 350, 'assets/wall.png');
  var ball = new Character(150, 130, 'assets/white_ball.png');
  
  stage.addChild(ball.sprite);
  stage.addChild(wall.sprite);
  
  characterList.push(ball);
  characterList.push(wall);
  
  
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
       
   
    for(var item1 in characterList){
        for(var item2 in characterList){
            if(item1!==item2){
                if(characterList[item1].collision(characterList[item2])){
                    collision = true;
                }
            } 
          }
        }
 //Debug text TODO(front-end): remove when not needed before release
<<<<<<< HEAD:FaustoPoPGame.js
  debugText1.setText('1 x: '+ spriteList[0].x + ' y: '+ (spriteList[0].y));
  debugText2.setText('2 x: '+ ball.y + ' y: '+ ball.max_height);        
=======
  debugText1.setText('1 x: '+ characterList[0].sprite.x + ' y: '+ (characterList[0].sprite.y));
  debugText2.setText('2 x: '+ characterList[1].sprite.x + ' y: '+ (characterList[1].sprite.y));        
>>>>>>> 4c695f00ff6e5969fa8ce1fbc87a2fa1e44c2073:PoPGame.js
  //END Debug
    //get keys and call corresponding function 
    if(38 in keysDown && !collision){ //up
        //HACK 
        //TODO(front-end): fix this collision work around
<<<<<<< HEAD:FaustoPoPGame.js
         ball.old_y = ball.y-100;
=======
        ball.sprite.old_y = ball.sprite.y + 10;
>>>>>>> 4c695f00ff6e5969fa8ce1fbc87a2fa1e44c2073:PoPGame.js
        //end HACK
        if(!collision && ball.y > ball.max_height){
             ball.moveY(-2,modifier);
             gravity = true;
        }
       
    }
    if(40  in keysDown && !collision){ //down
         //HACK 
        //TODO(front-end): fix this collision work around
<<<<<<< HEAD:FaustoPoPGame.js
        ball.old_y = ball.y + 10;
=======
        ball.sprite.old_y = ball.sprite.y - 10;
>>>>>>> 4c695f00ff6e5969fa8ce1fbc87a2fa1e44c2073:PoPGame.js
        //end HACK
        if(!collision){
            ball.moveY(1,modifier);
        }
       
    }
    if (37  in keysDown && !collision){ // left
        //HACK 
        //TODO(front-end): fix this collision work around
<<<<<<< HEAD:FaustoPoPGame.js
        ball.old_x = ball.x - 10;
=======
        ball.sprite.old_x = ball.sprite.x + 10;
>>>>>>> 4c695f00ff6e5969fa8ce1fbc87a2fa1e44c2073:PoPGame.js
        //end HACK
        if(!collision){
            ball.moveX(-1,modifier);
        }
            
    }
    if(39 in keysDown && !collision){ // right
        //HACK 
        //TODO(front-end): fix this collision work around
<<<<<<< HEAD:FaustoPoPGame.js
        ball.old_x = ball.x + 10;
=======
        ball.sprite.old_x = ball.sprite.x - 10;
>>>>>>> 4c695f00ff6e5969fa8ce1fbc87a2fa1e44c2073:PoPGame.js
        //end HACK
        if(!collision){
            ball.moveX(1,modifier);
        }
    }
    
<<<<<<< HEAD:FaustoPoPGame.js
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
=======
    for(var i in characterList){
>>>>>>> 4c695f00ff6e5969fa8ce1fbc87a2fa1e44c2073:PoPGame.js
       
         if(collision){
            characterList[i].restorePos();
             }
        characterList[i].sprite.old_x = characterList[i].sprite.x;
        characterList[i].sprite.old_y = characterList[i].sprite.y;
        }
    collision = false;
     */
  }
 
  
})();