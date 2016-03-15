/* Author/Contributors: Saddha Santanaporn, Fausto Tommasi, Nicholas Anderson, Eric Whitman
*  Date: 2/9/2016
*  Purpose: Create the main game loop
*/
var GameObjManager = require('./GameObjectManager.js');
require('./ServerPlayer.js');
var WorldData=require('./GameObject.js').WorldContainer;
var Matter = require ('../matter.js');
var Events = Matter.Events;

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
        timer = 
        window.requestAnimationFrame;
    }
    return function (cb) {
        return timer(cb);
    }
};

tick = tick(100);
    
var Game = function (fps) {
    this.id;
    this.host = true;
    this.fps = fps;    
    this.playerList=[];
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
    this.engine = Matter.Engine.create();
    var World = Matter.World,
        Bodies = Matter.Bodies;
	Events = Matter.Events;


    // create a GameObjectManager
    GameObjManager.GameObjectManager = new GameObjectManager();
    GameObjManager.engine=this.engine;
    GameObjManager.World=World;
    GameObjManager.Bodies=Bodies;
  
    // create a ground
    var ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    
    World.add(this.engine.world, ground);

    //TODO: What is this item?
    var item = new Item(10,10,10,10,10);
    World.add(this.engine.world,item.body);

    Events.on(this.engine, 'collisionStart', function(event) {
        var pairs = event.pairs;
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            var baseObject = GameObjManager.GetGameObjectFromBody(pair.bodyA);
            var otherObject = GameObjManager.GetGameObjectFromBody(pair.bodyB);
            if (baseObject != null && otherObject != null) {
                baseObject.onCollisionEnter(otherObject);
                otherObject.onCollisionEnter(baseObject);
            }
        }
    });
};


module.exports = global.Game = Game;
Game.prototype.update = function (delta) {
    this.onUpdate(delta);
    GameObjManager.GameObjectManager.UpdateAll(delta);

        // run the engine
        //Matter.Engine.update(this.engine,e delta);
        //Matter.Render.world(this.engine);
};
Game.prototype.render = function () {
    this.onRender();
};
Game.prototype.loop = function (now) {
    this.raf = tick(this.loop.bind(this));
    var delta = now - this.lastTime;
    if (delta >= this.delay) {
        this.update(delta);
        //this.render();
        this.lastTime = now;
    }
    //this.raf = requestAnimationFrame(this.loop.bind(this));
    //var delta = now - this.lastTime;
    //if (delta >= this.delay) {
      //console.log('new delta');
      //this.update(delta);
      //this.render();
      //this.lastTime = now;
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


Game.prototype.addOtherPlayer = function(player){
  //TODO: implement
  var newPlayer ={};
  newPlayer.ServerPlayer=new ServerPlayer(player.newX, player.newY, null, player.id, false, GameObjManager);
  newPlayer.ServerPlayer.oldX = player.oldX;
  newPlayer.ServerPlayer.oldY = player.oldY;
  newPlayer.ServerPlayer.gameid = player.gameid; 
  this.playerList.push(newPlayer);
  GameObjManager.GameObjectManager.AddObject(newPlayer); 
  console.log('add other from server');
};

Game.prototype.updatePlayerPosition = function(data){
  for (var i=0; i<GameObjManager.GameObjectList.length; i++){
      var temp = GameObjManager.GameObjectList[i];
      if((data.id!=this.localPlayerid)&&(temp.id == data.id)){
	Matter.Body.setVelocity(temp.physicsComponent, Matter.Vector.create(data.xFac, data.yFac));
      }
  }
  //RENDER ITEM ON GROUND   
   for(var i=0; i<this.itemList.length; i++){
       if((data.id!=this.localPlayerid)&&(temp.id == data.id)){ //dont know if we need this
         Matter.Body.setVelocity(itemList[i].physicsComponent, Matter.Vector.create(0,0)); // still object
       }
   }
};

Game.prototype.addItem = function (item){
  this.itemList.push(item);
  //TODO(Fausto): Make sure that item is still
}
	
Game.prototype.attack = function(data){
  for (var i=0; i<GameObjManager.GameObjectList.length; i++){
      var temp = GameObjManager.GameObjectList[i];
      if((data.id!=this.localPlayerid)&&(temp.id == data.id)){
        this.item = new Item(temp.physicsComponent.position.x,temp.physicsComponent.position.y,10,10);
//  this.item.body = Bodies.rectangle(this.player.x,80,this.player.y,80,{isStatic: true});
      
      }
  }

};





