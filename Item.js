/* Author/Contributors: Fausto Tommasi
*  Date: 2/14/2016
*  Purpose: Item class for weapons and power-ups
*/
function Item(damage,height,width,worldData){
    GameObject.call(this);
    this.damage = damage;
    this.height = height;
    this.width = width;
    this.worldData = worldData;
};


Item.prototype.activate = function(){
    //activate collision and damage (think of swinging a sword)
    //this.addPhysicsComponent(this.x,this.y,Matter.Bodies.rectangle(this.x,this.y,this.height,this.width));
    this.MakeRigidBody(this.x,this.y.this.worldData,this.width,this.height);
    
    
    
};


Item.prototype.deactivate = function(){
    //deactivate collision (idle sword)
    this.physicsComponent = null;
    
}

Item.prototype = GameObject.prototype;
Item.prototype.contructor = Item;

module.exports.Item = Item;