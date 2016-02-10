/* Author/Contributors: Saddha Santanaporn
*  Date: 2/9/2016
*  Purpose: Hold states for an object that wants to use the game loop
*/

var GameObject = function () {
    this.tag = "";
    this.physicsComponent = null;
};

GameObject.prototype.AddPhysicsComponent = function (x, y, RigidBodyData, WorldData) {
    this.physicsComponent = RigidBodyData.MakeRigidBody(x, y, WorldData);
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

RectBodyData.prototype.MakeRigidBody = function (x, y, WorldData) {
    body = WorldData.bodies.rectangle(x, y, this.width, this.height);
    WorldData.world.add(WorldData.engine.world, body);
    return body;
};

var CircleBodyData = function (radius) {
    this.radius = radius;
};

CircleBodyData.prototype.MakeRigidBody = function (x, y, WorldData) {
    body = WorldData.bodies.circle(x, y, radius);
    WorldData.world.add(WorldData.engine.world, body);
    return body;
};

