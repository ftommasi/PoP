/* Author/Contributors: Fausto Tommasi 
*  Date: 1/21/2016
*  Purpose: This file contains the file that will be drawn onto the canvas
*/

//TODO(front-end): implement in webGL
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

//make sure to adapt this canvas size as necessary
var Cwidth = 1900;
var Cheight = 1000;
canvas.width = Cwidth;
canvas.height = Cheight;
document.body.appendChild(canvas);
  

//ctx.fillStyle = "rgb(0, 0, 0)";
  


var render = function(){
    ctx.font = "80px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    //ctx.fillText("dev test v420.69", 32, 32);
    ctx.fillText("POP",Cwidth/8 + 90,Cheight/4); 
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(500,400,50,0,2*Math.PI,false);
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(300,230,20,0,2*Math.PI,false);
    ctx.fillStyle = 'red';
    ctx.fill();
    
}

var main = function(){
 //requestAnimationFrame(main);
 render();
}
var w = window;
requestAnimationFram = w.requestAnimationFram || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mosRequestAnimationFrame;
main();
