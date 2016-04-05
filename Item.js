/* Author/Contributor: Fausto Tommasi
*  Date: 2/16/2016
*  Purpose: item class to be used for weapons and powerups   
*/

function Item(x,y,width,height,damage,isProjectile=false){
  GameObject.call(this);
  this.AddPhysicsComponent(x,y,new RectBodyData(width,height)) ;
  this.body;
  this.damage=damage;
  this.width=width;
  this.height=height;
  this.type= "item";
  this.id;
  this.gameid;
  this.dmg;
  this.isProjectile = isProjectile;
};

Item.prototype = GameObject.prototype;
Item.prototype.constructor = Item;

Item.prototype.getDamage = function (){
  return this.dmg;

}

Item.prototype.isProjectile = function(){
  return this.isPrjectile;
}
