/* Author/Contributors: Saddha Santanaporn
*  Date: 2/9/2016
*  Purpose: Manages all GameObjects
*/

var GameObjectManager = function () {
    this.GameObjectList = [];
    this.engine;
    this.World;
    this.Bodies;
};  
  
GameObjectManager.prototype.AddObject = function (object) {
    this.GameObjectList.push(object);
};

GameObjectManager.prototype.UpdateAll = function (delta) {
  //console.log('From GO Manager ' + this.GameObjectList.length);
  for (var i = 0; i < this.GameObjectList.length; i++)
        this.GameObjectList[i].update(delta);
};

GameObjectManager.prototype.GetGameObjectFromBody = function (body) {
    for (var i = 0; i < this.GameObjectList.length; i++) {
        if (this.GameObjectList[i].physicsComponent == body)
            return this.GameObjectList[i];
    }
    return null;
};

GameObjectManager.prototype.remove = function (gameObject) {
    this.World.remove(this.World, gameObject.physicsComponent);
    var index = this.GameObjectList.indexOf(gameObject);
    if (index > -1) {
        this.GameObjectList.splice(index, 1);
    }
};
 
 
