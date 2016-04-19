/* Author/Contributor: Fausto Tommasi
*  Date: 2/16/2016
*  Purpose: item class to be used for weapons and powerups   
*/

function Item(x,y,width,height,damage, id, Project=false){
  GameObject.call(this);
  this.AddPhysicsComponent(x,y,new RectBodyData(width,height)) ;
  this.body;
  this.damage=damage;
  this.width=width;
  this.height=height;
  this.type= "item";
  this.id=id;
  this.gameid;
  this.dmg;
  this.proj= Project;
  this.hasBeenRemoved = false;
  setTimeout(this.itemRemove.bind(this), 3000);
};

Item.prototype = GameObject.prototype;
Item.prototype.constructor = Item;
Item.prototype.itemRemove = function(){
    console.log("From timeout function");
    console.log(this.hasBeenRemoved);
    console.log(this.id);
    if(!this.hasBeenRemoved){
        this.hasBeenRemoved=true;
        GameObjManager.remove(this.id);
    }
}
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
       
     }

     if(this.proj){
            GameObjManager.remove(this.id);
       }

}
