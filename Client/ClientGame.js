/* Author/Contributors: Saddha Santanaporn, Fausto Tommasi
 *  Date: 2/9/2016
 *  Purpose: Create the main game loop
 */
var GameObjManager;
var playerManager;
var Events = Matter.Events;
var inputTimer = 0;
var inputTimeoutPeriod = 100;
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
		this.inputSeq=0;
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
        World = Matter.World
	Events = Matter.Events;
	// create a Matter.js engine
	this.engine = Engine.create(document.body);

    // create a GameObjectManager
	GameObjManager = new GameObjectManager();
	GameObjManager.engine = this.engine;

	var renderOptions = this.engine.render.options;
	renderOptions.background = './assets/grid.png';
	renderOptions.showAngleIndicator = false;
	renderOptions.wireframes = false;
	Matter.Engine.run(this.engine);

	// create a PlayerManager
	playerManager = new PlayerManager(0, false);
	GameObjManager.AddObject(playerManager);

	// create a ground
	var ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

	var item = new Item(10,10,10,10,10);
	item.body = Matter.Bodies.rectangle(400, 600, 80, 60, { isStatic: true });

	World.add(this.engine.world, ground);

	World.add(this.engine.world,item.body);

	Events.on(this.engine, 'collisionStart', function(event) {
	  var pairs = event.pairs;
          for (var i = 0; i < pairs.length; i++) {
	    var pair = pairs[i];

            //TODO(BUGFIX): these functions return null
	    var baseObject = GameObjManager.GetGameObjectFromBody(pair.bodyA);
	    var otherObject = GameObjManager.GetGameObjectFromBody(pair.bodyB);

            console.log(baseObject.type + " with " + otherObject.type);
	    if (baseObject != null && otherObject != null) {
	      baseObject.onCollisionEnter(otherObject);
	      otherObject.onCollisionEnter(baseObject);
	     }
	    if (baseObject.type == "item" && otherObject.type == "player") {
             //TODO(Fred/Fausto): reduce player health here
             //otherObject.hp -= baseObject.dmg
             baseObject.manager.remove(baseObject);
             console.log("ITEM AND PLAYER COLLISION");
            }  else if(baseObject.type == "player" && otherObject.type == "item")  {

              //TODO(Fred/Fausto): reduce player health here
              //baseObject.hp -= otherObject.dmg
              otherObject.manager.remove(otherObject);
              console.log("ITEM AND PLAYER COLLISION");


  }
   
	   }
	});
};

Game.prototype.update = function (delta) {
	this.onUpdate(delta);
	GameObjManager.UpdateAll(delta);

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
		this.render();
		this.lastTime = now;
	}
	/*this.raf = requestAnimationFrame(this.loop.bind(this));
	  var delta = now - this.lastTime;
	//if (delta >= this.delay) {
	console.log('new delta');
	this.update(delta);
	this.render();
	this.lastTime = now;
	}*/
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
	var newPlayer = new ClientPlayer(player.newX, player.newY, null, player.id, false);
	newPlayer.oldX = player.oldX;
	newPlayer.oldY = player.oldY;
	newPlayer.gameid = player.gameid;
	this.playerList.push(newPlayer);
	this.localPlayerid=newPlayer.id;
	//var myCharacter = new Character(player.Player.startX, player.Player.startY);
	//myCharacter.id=player.Player.id;
	//myCharacter.gameid=this.id;
	GameObjManager.AddObject(newPlayer);
	playerManager.setLocalPLayer(newPlayer);
	var myInputManager = new InputListener(this.socket);
	myInputManager.player=newPlayer;
	GameObjManager.AddObject(myInputManager);
	console.log('add local from client');
};

Game.prototype.addOtherPlayer = function(player){
	//TODO: implement
	var newPlayer = new ClientPlayer(player.newX, player.newY, null, player.id, false);
	newPlayer.oldX = player.oldX;
	newPlayer.oldY = player.oldY;
	newPlayer.gameid = player.gameid;
	this.playerList.push(newPlayer);
	//var myCharacter = new Character(player.Player.startX, player.Player.startY);
	//myCharacter.id=player.Player.id;
	//myCharacter.gameid=this.id;
	GameObjManager.AddObject(newPlayer);
	console.log('add other from client');
};

Game.prototype.updatePlayerPosition = function(data){
	for (var i=0; i<GameObjManager.GameObjectList.length; i++){
		var temp = GameObjManager.GameObjectList[i];
		if((data.id!=this.localPlayerid)&&(temp.id == data.id)){
			if(temp.physicsComponent.position.x != data.pos.x || temp.physicsComponent.position.y != data.pos.y)
			{
					Matter.Body.setPosition(temp.physicsComponent, data.pos);
					Matter.Body.setVelocity(temp.physicsComponent, Matter.Vector.create(data.xFac, data.yFac));
			}
			else{
					Matter.Body.setVelocity(temp.physicsComponent, Matter.Vector.create(data.xFac, data.yFac));
			}
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

//----------------------------------------------------------------------------------------------------------------------------------------------
//begin input
//----------------------------------------------------------------------------------------------------------------------------------------------
//TODO: ADD HEADER
var keysDown = {};
var isAttacking = false;
var InputListener = function(socket){
	//TODO: Add members as necessary
	GameObject.call(this);
	this.socket=socket;
	this.player;

	addEventListener("keydown", function (e) {
			keysDown[e.keyCode] = true;
			}, false);

	addEventListener("keyup", function (e) {
			delete keysDown[e.keyCode];
			}, false);

	addEventListener("keypress", function (e) {
			keysDown[e.keyCode] = true;
			}, false);

};
InputListener.prototype = GameObject.prototype;
InputListener.prototype.contructor = InputListener;

InputListener.prototype.update = function (delta) {

	x_factor = y_factor = 0;
	var input = [];

	if (38 in keysDown) { //up
		y_factor = -2;
		input.push('u');
		//player.WHATERVER();i//TODO IMPLEMENT CORRECT FUNCTION
	}
	if (40 in keysDown) { //down
		y_factor = 2;
		input.push('d');
	}
	if (37 in keysDown) { // left
		x_factor = -2;
		input.push('l');
	}
	if (39 in keysDown) { // right
		x_factor = 2;
		input.push('r');
	}

	if (32 in keysDown){ //Spacebar
		//TODO(Fausto): implement attack
		isAttacking = !isAttacking;
		input.push('s');

	}

	if (this.player != null) {
		if(input.length){
			this.inputSeq += 1;
			var message = {
	            gameid : this.player.gameid,
	            id :this.player.id,
							pos:this.player.physicsComponent.position,
							velocity: this.player.physicsComponent.velocity,
	            xFac : x_factor,
	            yFac : y_factor,
	            attack: isAttacking,
							inputSeq: this.inputSeq
	        };
	        if(isAttacking){
	            if(!this.item){
	                    tempitem = new Item(this.player.physicsComponent.position.x+100, this.player.physicsComponent.position.y+100,10,10);
	                    /*this.item.body = Bodies.rectangle(this.player.x,80,this.player.y,
	                                                      80,{isStatic: true});*/
	              GameObjManager.AddObject(tempitem);      
                      isAttacking = false;
	            }

	            else {
	                this.item = null;
	            }

	        }
					  this.socket.emit('move', message);
	          Matter.Body.setVelocity(this.player.physicsComponent,
	                                Matter.Vector.create(x_factor, y_factor));

			}
    }
};

