/* Author/Contributors: Fausto Tommasi 
*  Date: 2/1/2016
*  Purpose: This file contains the Drawable class that extends PIXI.Spirte
*/


//Drawable class 
 
  var Drawable = function(x,y,img){
        PIXI.Sprite.call(this,PIXI.Texture.fromImage(img));
       
        this.x = x;
        this.y = y;
        this.old_x = null;
        this.old_y = null;
        this.speed = 256;
        
  };
  
  Drawable.prototype = PIXI.Sprite.prototype;
  Drawable.prototype.contructor = Drawable;
  
  
 //move functions 
  Drawable.prototype.moveX = function(dir,modifier){
    this.x+=(this.speed*dir)*modifier;
    //this.x+=(this.speed*dir)*modifier;
  };
  Drawable.prototype.moveY = function(dir,modifier){
    this.y+=(this.speed*dir)*modifier;
    //this.y+=(this.speed*dir)*modifier;
  };
  
  //setters and getters
  
  Drawable.prototype.getX = function(){
    return this.x;
  };
  
  //collision function
  Drawable.prototype.collision = function(other){
    if
        (
              (this.x   < other.x + other.width) && 
              (this.x + this.width   > other.x  )  &&
              (this.y + this.height > other.y) &&
              (this.y   < other.y + other.height)
              
       
          ){
              return true;
          }
    else {
        return false;
    }
  }
  
  
  Drawable.prototype.restorePos = function(){
       this.x = this.old_x; 
       this.y = this.old_y;
      
  }
 