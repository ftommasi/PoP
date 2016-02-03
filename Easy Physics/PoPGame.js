(function(){ //javascript entry point  
    //add listeners to grab keyboard input from user
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
  
    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);
  
    addEventListener("keypress", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    //dictionary for keyboard functionality
    var keysDown = {};

    // Matter.js module aliases
    var Engine = Matter.Engine,
        World = Matter.World,
        Bodies = Matter.Bodies;
    // create a Matter.js engine
    var engine = Engine.create(document.body);

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    // add all of the bodies to the world
    World.add(engine.world, [boxA, boxB, ground]);

    game = new Game(30);

    game.onUpdate = function (delta) {
        x_factor = y_factor = 0;

        if (38 in keysDown) { //up
            y_factor = -2;
        }
        if (40 in keysDown) { //down
            y_factor = 2;
        }
        if (37 in keysDown) { // left
            x_factor = -2;
        }
        if (39 in keysDown) { // right
            x_factor = 2;
        }
        Matter.Body.setVelocity(boxA, Matter.Vector.create(x_factor, y_factor))

        // run the engine
        Matter.Engine.update(engine, delta);
        Matter.Render.world(engine);
    }

    game.start();
})();