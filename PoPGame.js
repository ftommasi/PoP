/* Author/Contributors: Fausto Tommasi 
*  Date: 1/21/2016
*  Purpose: This file contains the file that will be drawn onto the canvas
*/
(function(){ //javascript entry point
    
//TODO(front-end): implement in webGL
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

//make sure to adapt this canvas size as necessary
var Cwidth = 1900;
var Cheight = 1000;
canvas.width = Cwidth;
canvas.height = Cheight;
document.body.appendChild(canvas);
  

var drawTitleScreen = function (){
    //ctx.beginPath();
    
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0,0,Cwidth,Cheight);
    //ctx.fill();
    
    
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(500,400,50,0,2*Math.PI,false);
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(300,230,20,0,2*Math.PI,false);
    ctx.fillStyle = 'red';
    ctx.fill();
    
    ctx.font = "80px Helvetica";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    //ctx.fillText("dev test v420.69", 32, 32);
    ctx.fillText("POP",Cwidth/8 + 90,Cheight/4); 
}

//function to handle rendering of main game loop
var render = function(){
    //TODO(front-end) create a proper render function based on a list of sprites
    //test background
    ctx.beginPath();
    ctx.fillStyle = "rgb(0,155,255)";
    ctx.fillRect(0,0,Cwidth,Cheight);
    ctx.fill();
    
    //test plataform
    ctx.beginPath();
    ctx.fillStyle = "rgb(165,42,42)";
    ctx.fillRect(20,250,500,120);
    ctx.fill();
    
    //test bubble
    ctx.beginPath();
    ctx.arc(300,230,20,0,2*Math.PI,false);
    ctx.fillStyle = 'red';
    ctx.fill();
    
}

//variable to handle input via Virtual KeyCodes
var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

addEventListener("keypress", function (e) {
	keysDown[e.keyCode] = true;
}, false);
//function that will update all variables in main game loop
var update = function(){
   
   //TODO(front-end) - modulate input handling to allow for custom controls    
   if(38 in keysDown){ //up
        
    }
    
    if(40  in keysDown){ // down
       
    }
    
    if (37  in keysDown){ // left
        
    }
    
    if(39 in keysDown){ // right
        
    }
    
    if(32 in keysDown){ // space
        
        
    }
    
    
}


var main = function(){
 //TODO(front-end) implement game menus and proper game intitalization    
 //show title screen untl a button is pressed
 if(82 in keysDown){
     showTitle = true;
 }
 if (13 in keysDown){
     showTitle = false;
 }
 
 if(showTitle){
        drawTitleScreen();
    }
    else{
        render();
    }
    requestAnimationFrame(main);
}
var w = window;
requestAnimationFram = w.requestAnimationFram || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mosRequestAnimationFrame;
var showTitle = true;

main(); //TODO(Fausto) fix issue where calling main freezes everythin

})();