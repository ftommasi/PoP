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
    //TODO (EVERYONE) We need to type everything so I can go by class in the gameObjectList
    
        this.GameObjectList[i].ServerPlayer.update(delta);
};

GameObjectManager.prototype.GetGameObjectFromBody = function (body) {
    for (var i = 0; i < this.GameObjectList.length; i++) {
        if (GameObjectList[i].physicsComponent == body)
            return GameObjectList[i];
    }
    return null;
};

module.exports=global.GameObjectManager=GameObjectManager;
 
