//dictionary for keyboard functionality
var keysDown = {};

(function () { //javascript entry point  
    //add listeners to grab keyboard input from user - make a seperate input manager class later!
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    addEventListener("keypress", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    // Matter.js module aliases
    var Engine = Matter.Engine,
        World = Matter.World,
        Bodies = Matter.Bodies;
    // create a Matter.js engine
    var engine = Engine.create(document.body);
    // encapsulate data
    var WorldData = new WorldContainer(engine, World, Bodies);

    // create a GameObjectManager
    var GameObjManager = new GameObjectManager();
    // create a PlayerManager
    var playerManager = new PlayerManager(0, false);

    GameObjManager.AddObject(playerManager);
    var myCharacter = new Character(400, 200, WorldData);
    GameObjManager.AddObject(myCharacter);
    playerManager.setLocalPLayer(myCharacter);

    // create a ground
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    World.add(engine.world, ground);

    game = new Game(60);

    game.onUpdate = function (delta) {
        GameObjManager.UpdateAll(delta);

        // run the engine
        Matter.Engine.update(engine, delta);
        Matter.Render.world(engine);
    }

    game.start();
})();