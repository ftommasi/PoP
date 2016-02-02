/* Authors/Contributors: Fred Trelz
*  Date: 1/25/16
*  Purpose: This file will contain all the functions and objects related to characters
*/

// Character object constructor (all of this is subject to change)
// TODO(back-end): Movement update function?
//                 Character color
//                 Character health
//                 Character size
//
// Takes optional anonymous object as initialization arguments
function Character(x, y, img) {
  this.sprite = new Drawable(x, y, img);
}

// wrappers to access character sprite functionality
Character.prototype.moveX = function(dir, modifier) {
  this.sprite.moveX(dir, modifier);
};

Character.prototype.moveY = function(dir, modifier) {
  this.sprite.moveY(dir, modifier);
};

Character.prototype.getSpriteX = function() {
  return this.sprite.getX();
};

Character.prototype.getSpriteY = function() {
  return this.sprite.getY();
};

Character.prototype.setSpriteX = function(newX) {
  this.sprite.setX(newX);
};

Character.prototype.setSpriteY = function(newY) {
  this.sprite.setY(newY);
};

Character.prototype.getSpriteWidth = function() {
  return this.sprite.getWidth();
};

Character.prototype.getSpriteHeight = function() {
  return this.sprite.getHeight();
};

Character.prototype.getSpriteSpeed = function() {
  return this.sprite.getSpeed();
};

Character.prototype.setSpriteSpeed = function(newSpeed) {
  this.sprite.setSpeed(newSpeed);
};

Character.prototype.collision = function(other) {
  return this.sprite.collision(other.sprite);
};

Character.prototype.restorePos = function() {
  this.sprite.restorePos();
};
