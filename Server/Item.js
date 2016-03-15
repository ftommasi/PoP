/* Author/Contributor: Fausto Tommasi
*  Date: 2/16/2016
*  Purpose: item class to be used for weapons and powerups   
*/

var GameObject = require('./GameObject.js')
    , inherits = require('util').inherits;

var Item = function(x,y,width,height,damage,GameObjManager){
  GameObject.call(this);
  this.AddPhysicsComponent(x,y,new GameObject.RectBodyData(width,height), null, GameObjManager) ;
  this.body;
  this.damage=damage;
  this.width=width;
  this.height=height;

  this.id;
  this.gameid;
};

inherits(Item, GameObject);
module.exports = global.Item = Item;
