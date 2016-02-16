function Item(){
  GameObject.call(this);
  this.damage;
  this.width;
  this.height;
};

Item.prototype = GameObject.prototype;
Item.prototype.constructor = Item;
