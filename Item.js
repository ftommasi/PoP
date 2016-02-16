/* Author/Contributor: Fausto Tommasi
*  Date: 2/16/2016
*  Purpose: item class to be used for weapons and powerups   
*/

function Item(){
  GameObject.call(this);
  this.damage;
  this.width;
  this.height;
};

Item.prototype = GameObject.prototype;
Item.prototype.constructor = Item;
