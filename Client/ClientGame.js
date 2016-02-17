/* Author/Contributors: Saddha Santanaporn, Fausto Tommasi
*  Date: 2/9/2016
*  Purpose: Create the main game loop
*/
var GameObjManager;
var playerManager;
var WorldData;

//TODO: make game render here
var tick = function (delay) {
    var _delay = delay;
    var timer;
    if (typeof requestAnimationFrame === 'undefined') {
        timer = function (cb) {
            setImmediate(function () {
                cb(_delay);
            }, _delay);
        }
    } else {
        timer = window.requestAnimationFrame;
    }
    return function (cb) {
        return timer(cb);
    }
};

tick = tick(100);

var Game = function (fps) {
    this.id;
    this.socket;
    this.localPlayerid;
    this.fps = fps;
    this.playerList =[];
    this.itemList =[];	
    this.delay = 1000 / this.fps;
    this.lastTime = 0;
    this.raf = 0;
    this.engine;
    this.onUpdate = function (delta) {
    };
    this.onRender = function () {
    };
    
    // Matter.js module aliases
    var Engine = Matter.Engine,
        World = Matter.World,
        Bodies = Matter.Bodies;
    // create a Matter.js engine
    this.engine = Engine.create(document.body);
    // encapsulate data
    WorldData = new WorldContainer(this.engine, World, Bodies);
    var renderOptions = this.engine.render.options;
    renderOptions.background = './assets/Background.png';
    renderOptions.showAngleIndicator = false;
    renderOptions.wireframes = false;
    Matter.Engine.run(this.engine);

    // create a GameObjectManager
    GameObjManager = new GameObjectManager();
    // create a PlayerManager
    playerManager = new PlayerManager(0, false);
    GameObjManager.AddObject(playerManager);
  
    // create a ground
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    World.add(this.engine.world, ground);
};

Game.prototype.update = function (delta) {
    this.onUpdate(delta);
    console.log('update');
           GameObjManager.UpdateAll(delta);

        // run the engine
        //Matter.Engine.update(this.engine,e delta);
        //Matter.Render.world(this.engine);
};
Game.prototype.render = function () {
    this.onRender();
};
Game.prototype.loop = function (now) {
    /*this.raf = tick(this.loop.bind(this));
    var delta = now - this.lastTime;
    if (delta >= this.delay) {
        this.update(delta);
        this.render();
        this.lastTime = now;
    }*/
    this.raf = requestAnimationFrame(this.loop.bind(this));
    var delta = now - this.lastTime;
    //if (delta >= this.delay) {
      console.log('new delta');
      this.update(delta);
      this.render();
      this.lastTime = now;
    //}
};
Game.prototype.start = function () {    
    if (this.raf < 1) {
        this.loop(0);
    }
};
Game.prototype.stop = function () {
    if (this.raf > 0) {
        cancelAnimationFrame(this.raf);
        this.raf = 0;
    }
};

Game.prototype.addLocalPlayer = function(player){
  //TODO: implement
    this.playerList.push(player);
    this.localPlayerid=player.Player.id;
    var myCharacter = new Character(player.Player.startX, player.Player.startY);
    myCharacter.id=player.Player.id;
    myCharacter.gameid=this.id;
    GameObjManager.AddObject(myCharacter);
    playerManager.setLocalPLayer(myCharacter);
    var myInputManager = new InputListener(this.socket);
    myInputManager.player=myCharacter;
    GameObjManager.AddObject(myInputManager);
    console.log('add local from client');
};

Game.prototype.addOtherPlayer = function(player){
  //TODO: implement
    this.playerList.push(player);
    var myCharacter = new Character(player.Player.startX, player.Player.startY);
    myCharacter.id=player.Player.id;
    myCharacter.gameid=this.id;
    GameObjManager.AddObject(myCharacter); 
    console.log('add other from client');
};

Game.prototype.updatePlayerPosition = function(data){
  for (var i=0; i<GameObjManager.GameObjectList.length; i++){
      var temp = GameObjManager.GameObjectList[i];
      if((data.id!=this.localPlayerid)&&(temp.id == data.id)){
	Matter.Body.setVelocity(temp.physicsComponent, Matter.Vector.create(data.xFac, data.yFac));
      }
   //RENDER ITEM ON GROUND   
   for(var i=0; i<this.itemList.length; i++){
       if((data.id!=this.localPlayerid)&&(temp.id == data.id)){ //dont know if we need this
         Matter.Body.setVelocity(itemList[i].physicsComponent, Matter.Vector.create(0,0)); // still object
       
       } 
    }
  }

Game.prototype.addItem(item){
  this.itemList.push(item); 
}
};
	


