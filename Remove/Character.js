/* Authors/Contributors: Fred Trelz, Saddha Santanaporn
*  Date: 1/25/16
*  Purpose: This file will contain all the functions and objects related to characters
*/

// Character object constructor (all of this is subject to change)
// TODO(back-end): Movement update function?
//                 Character color
//                 Character health
//                 Character size
//
// Takes optional anonymous object as initialization arguments
var Character = function (x, y, WorldData) {
    GameObject.call(this);
    this.AddPhysicsComponent(x, y, new RectBodyData(80, 80), WorldData);

    //set these values so we don't rotate as we collide with stuff
    this.physicsComponent.inertia = Infinity;
    this.physicsComponent.inverseInertia = 0;
}

Character.prototype = GameObject.prototype;
Character.prototype.contructor = Character;

