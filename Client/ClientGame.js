/* Author/Contributors: Saddha Santanaporn, Fausto Tommasi
 *  Date: 2/9/2016
 *  Purpose: Create the main game loop
 */
var localColor='#FF0000';
var nonLocalColor='#FFFF00';
var GameObjManager;
var playerManager;
var Events = Matter.Events;
var numShots=10;
var outOfShots=false;
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
	renderOptions.background = './assets/Background.png';
	renderOptions.showAngleIndicator = false;
	renderOptions.wireframes = false;
	Matter.Engine.run(this.engine);

	// create a PlayerManager
	playerManager = new PlayerManager(0, false);
	GameObjManager.AddObject(playerManager);

	// create a ground
	var ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

//	var item = new Item(10,10,10,10,10);
//	item.body = Matter.Bodies.rectangle(400, 600, 80, 60, { isStatic: true });

	World.add(this.engine.world, ground);

	//World.add(this.engine.world,item.body);

	Events.on(this.engine, 'collisionStart', function(event) {
	  var pairs = event.pairs;
          for (var i = 0; i < pairs.length; i++) {
	    var pair = pairs[i];

	    var baseObject = GameObjManager.GetGameObjectFromBody(pair.bodyA);
	    var otherObject = GameObjManager.GetGameObjectFromBody(pair.bodyB);

            //console.log(baseObject.type + " with " + otherObject.type);
	    if (baseObject != null && otherObject != null) {
	      baseObject.onCollisionEnter(otherObject);
	      otherObject.onCollisionEnter(baseObject);
	     }


   
	   }
	});
};

Game.prototype.update = function (delta) {
        var isLocalPlayerAlive = true;
	this.onUpdate(delta);
    var deadPlayers = 0;
	GameObjManager.UpdateAll(delta);
        for (var i = 0; i < this.playerList.length; i++) {
          if (this.localPlayerId == this.playerList[i].id && !this.playerList[i].alive) {
            isLocalPlayerAlive = false;
          }
          if (!this.playerList[i].alive) {
                deadPlayers++;
          }
        }

        if (deadPlayers == (this.playerList.length - 1)) {
          if (isLocalPlayerAlive) {
            var message = {
              gameid:this.id,
            }
            this.socket.emit('restart', message);
          } 
        }
        if(numShots==0){
            if(outOfShots==false){
                outOfShots=true;
                setTimeout(shotFunction, 1000);
            }
        }
	// run the engine
	//Matter.Engine.update(this.engine,e delta);
	//Matter.Render.world(this.engine);
};
function shotFunction(){
    outOfShots=false;
    numShots=10;
}
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
        for (var i = 0; i < this.playerList.length; i++) {
          this.playerList[i].alive = true;
          this.playerList[i].health.healthvalue = 1000;
          this.playerList[i].health.spritescale = 1.00;
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
	var newPlayer = new ClientPlayer(player.newX, player.newY, null, player.id, false, localColor);
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
	var newPlayer = new ClientPlayer(player.newX, player.newY, null, player.id, false, nonLocalColor);
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
			var item = new Item(data.pos.x + 60*(data.direction),data.pos.y,10,10, data.itemId, true);
			item.proj = true;
            //item.id=data.itemId;
                        Matter.Body.setVelocity( item.physicsComponent,Matter.Vector.create(data.direction*15,0));
			GameObjManager.AddObject(item);
			//  this.item.body = Bodies.rectangle(this.player.x,80,this.player.y,80,{isStatic: true});

		}
	}

};
Game.prototype.removeOtherPlayer = function(data){
        for (var i=0; i<GameObjManager.GameObjectList.length; i++){
		var temp = GameObjManager.GameObjectList[i];
		if(temp.id == data.id){
		  //this.playerList.splice(this.playerList.indexOf(temp),1);
		  //GameObjManager.remove(data.id);	
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
        isAttacking = false;
    itemId=null;
	x_factor = y_factor = 0;
	var input = [];
        var direction= 1;
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
		direction = -1; //shoot projectile on the left  side
	}
	if (39 in keysDown) { // right
		x_factor = 2;
		input.push('r');
		direction = 1; //shoot projectile on the right side
	}

	if (32 in keysDown){ //Spacebar
	    isAttacking = true;
	    itemId=Math.random()*10000;
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
	                inputSeq: this.inputSeq,
			        direction: direction,
                    itemId: itemId
			     };
			   if(isAttacking && (numShots>0)){
			    var tempitem = new Item(this.player.physicsComponent.position.x+60*direction, this.player.physicsComponent.position.y,10,10,itemId, true);
                Matter.Body.setVelocity( tempitem.physicsComponent,Matter.Vector.create(direction*15,0));
                tempitem.proj = true;
		        GameObjManager.AddObject(tempitem);
                if(numShots>0){
                    numShots-=1;
                }

			}
            if(numShots==0){
                message.attack=false;
            }
            this.socket.emit('move', message);
			Matter.Body.setVelocity(this.player.physicsComponent,
					Matter.Vector.create(x_factor, y_factor));

		}
	}
};

