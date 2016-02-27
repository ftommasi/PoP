/* Author/Contributors: Saddha Santanaporn
*  Date: 2/9/2016
*  Purpose: Hold states for an object that wants to use the game loop
*/

var GameObject = function () {
    this.tag = "";
    this.physicsComponent = null;
};

GameObject.prototype.AddPhysicsComponent = function (x, y, RigidBodyData, texture_location, GameObjManager) {
    this.physicsComponent = RigidBodyData.MakeRigidBody(x, y, GameObjManager, texture_location);
};

GameObject.prototype.update = function (delta) {

};


// a class to encapsulate physics world, engine, and bodies
var WorldContainer = function (engine, world, bodies) {
    this.engine = engine;
    this.world = world;
    this.bodies = bodies;
};

// classes containing data to create physics rigidbody
var RectBodyData = function (width, height) {
    this.width = width;
    this.height = height;
};

RectBodyData.prototype.MakeRigidBody = function (x, y, worldData, texture_location) {
    body = worldData.Bodies.rectangle(x, y, this.width, this.height, {
        render: {
            strokeStyle: '#ffffff',
            sprite: {
                texture: texture_location
            }
        }
    });
    worldData.World.add(worldData.engine.world, body);
    return body;
};

var CircleBodyData = function (radius) {
    this.radius = radius;
};

CircleBodyData.prototype.MakeRigidBody = function (x, y, worldData, texture_location) {
    body = worldData.Bodies.circle(x, y, radius, {
        render: {
            strokeStyle: '#ffffff',
                sprite: {
                texture: texture_location
            }
        }
    });
    worldData.World.add(worldData.engine.world, body);
    return body;
};

module.exports =GameObject;
module.exports.RectBodyData = RectBodyData;
module.exports.CircleBodyData = CircleBodyData;
module.exports.WorldContainer=WorldContainer;
