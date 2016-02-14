/* Author/Contributors: Saddha Santanaporn
*  Date: 2/9/2016
*  Purpose: Manages all GameObjects
*/

var GameObjectManager = function () {
    this.GameObjectList = [];
};  
  
GameObjectManager.prototype.AddObject = function (object) {
    this.GameObjectList.push(object);
};

GameObjectManager.prototype.UpdateAll = function (delta) {
  //console.log('From GO Manager ' + this.GameObjectList.length);
  for (var i = 0; i < this.GameObjectList.length; i++)
        this.GameObjectList[i].update(delta);
};
 