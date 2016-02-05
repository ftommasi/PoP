/* Author/Contributors: Fausto Tommasi 
*  Date: 1/21/2016
*  Purpose: This file contains the file that will be drawn onto the canvas
*/

//PoPGame

(function(){
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
  //TODO(Fausto): implement to Game class
  var keysDown = {};
 
  var wall = new Character(150, 350, 'assets/wall.png');
  var ball = new Character(150, 130, 'assets/white_ball.png');
  
  var game = new PoPGame(800,600,null,false,0x10F9bb);
  
  
  //TODO(Fausto): Add fucntionality to constructor
  //game.setLocalPlayer(ball);
  game.localPlayer = ball;
  game.then = Date.now();
  
  game.addPlayers(ball);
  game.addPlayers(wall);
  
  document.body.appendChild(game.renderer.view);
  
  animate();
 
  function animate(){
      game.animate();
      requestAnimationFrame(animate);
      game.now = Date.now();
      update((game.now-game.then)/1000); // should update be outside of animate?
      game.then = game.now;
     
  }
  
   function update(modifier){
       game.update(modifier,keysDown);
  
  }
 
  
})();