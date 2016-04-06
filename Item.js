/* Author/Contributor: Fausto Tommasi
*  Date: 2/16/2016
*  Purpose: item class to be used for weapons and powerups   
*/

function Item(x,y,width,height,damage,Project=false){
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
  this.proj= Project;
};

Item.prototype = GameObject.prototype;
Item.prototype.constructor = Item;

Item.prototype.getDamage = function (){
  return this.dmg;

}

Item.prototype.isProjectile = function(){
  return this.proj;
}

Item.prototype.onCollisionEnter = function (other){
  //TODO: Get this function to work
     if (other.type == "player") {
        other.dodamage(0.01);
       //TODO(Fausto): Make proper projectile class
       if(this.proj){
         console.log("Item id" + this.id);
         GameObjManager.remove(this.id);
       }

     }


}
