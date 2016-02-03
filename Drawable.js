/* Author/Contributors: Fausto Tommasi 
*  Date: 2/1/2016
*  Purpose: This file contains the Drawable class that extends PIXI.Spirte
*/


//Drawable class 
 
  var Drawable = function(x,y,img){
    //TODO(Fausto): add elements as necessary
        PIXI.Sprite.call(this,PIXI.Texture.fromImage(img));
       
        this.x = x;
        this.y = y;
        this.old_x = null;
        this.old_y = null;
        this.speed = 256; //TODO(Fausto): implement dynamic speed 
        this.max_height = y - 256;
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
  
  Drawable.prototype.getY = function(){
    return this.y;
  };
  
    Drawable.prototype.setX = function(newX){
     this.x = newX;
  };
  
  Drawable.prototype.setY = function(newY){
     this.y = newY;
  };
  
  Drawable.prototype.getWidth = function(){
    return this.width;
  };
  
  Drawable.prototype.getHeight = function(){
    return this.height;
  };
  
   Drawable.prototype.getSpeed = function(){
    return this.speed;
  };
  
    Drawable.prototype.setSpeed = function(newSpeed){
     this.speed = newSpeed;
  };
  
  
  //collision function
  Drawable.prototype.collision = function(other){
    if
        (
              (this.x   < other.x + other.width) && //right
              (this.x + this.width   > other.x  )  && //left
              (this.y + this.height > other.y) && //bot
              (this.y   < other.y + other.height) // top
              
       
          ){
              return true;
          }
    else {
        return false;
    }

  }
   Drawable.prototype.collisionBot = function(other){
    if(this.y + this.height > other.y && this.x >= other.x && this.x + this.width <= other.x + other.width){
      return true;
    }
    else {
      return false;
    }
  }
  
  Drawable.prototype.collisionTop = function(other){
    if(this.y   < other.y + other.height && this.x > other.x && this.x + this.width < other.x + other.width){
      return true;
    }
    else {
      return false;
    }
  }
  
  Drawable.prototype.collisionLeft = function(other){
    if(this.x + this.width   > other.x && this.y > other.y && this.y + this.height < other.y + other.height  ){
      return true;
    }
    else {
      return false;
    }
  }
  
  Drawable.prototype.collisionRight = function(other){
    if (this.x   < other.x + other.width && this.y > other.y && this.y + this.height < other.y + other.height){
      return true;
    }
    else {
      return false;
    }
  }
  
  



  
  
  Drawable.prototype.restorePos = function(){
       this.x = this.old_x; 
       this.y = this.old_y;
      
  };
 