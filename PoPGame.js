/* Author/Contributors: Fausto Tommasi 
*  Date: 1/21/2016
*  Purpose: This file contains the file that will be drawn onto the canvas
*/

//TODO(front-end): implement in webGL
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var Cwidth = 512;
var Cheight = 480;
//make sure to adapt this canvas size as necessary
canvas.width = Cwitdh;
canvas.height = Cheight;

var render = function(){
  ctx.font = "20px Helvetica";
  ctx.fillText("POP",Cwidth/2,Cheight/2);   
}

var main = function(){
 requestAnimationFrame(main);
 render();
}
var w = window;
requestAnimationFram = w.requestAnimationFram || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mosRequestAnimationFrame;
main();
