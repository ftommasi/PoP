/* Author/Contributors: Saddha Santanaporn
*  Date: 2/9/2016
*  Purpose: Hold states for an object that wants to use the game loop
*/

var GameObject = function () {
    this.physicsComponent = null;
    this.tag = "";
    this.manager;
};

GameObject.prototype.AddPhysicsComponent = function (x, y, RigidBodyData, texture_location, color) {
    this.physicsComponent = RigidBodyData.MakeRigidBody(x, y, texture_location, color);
};

GameObject.prototype.update = function (delta) {

};

GameObject.prototype.onCollisionEnter = function (other) {
};

// classes containing data to create physics rigidbody
var RectBodyData = function (width, height) {
    this.width = width;
    this.height = height;
};

RectBodyData.prototype.MakeRigidBody = function (x, y, texture_location, color) {
    body = Matter.Bodies.rectangle(x, y, this.width, this.height, {
        render: {
            fillStyle: color,
            strokeStyle: '#ffffff',
            sprite: {
                texture: texture_location
            }
        }
    });
    Matter.World.add(GameObjManager.engine.world, body);
    return body;
};

var CircleBodyData = function (radius) {
    this.radius = radius;
};

CircleBodyData.prototype.MakeRigidBody = function (x, y, texture_location, color) {
    body = Matter.Bodies.circle(x, y, this.radius, {
        render: {
            fillStyle: color,
            strokeStyle: '#ffffff',
                sprite: {
                texture: texture_location
            }
        }
    });
    Matter.World.add(GameObjManager.engine.world, body);
    return body;
};

