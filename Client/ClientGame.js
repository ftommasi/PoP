/* Author/Contributors: Saddha Santanaporn, Fausto Tommasi
 *  Date: 2/9/2016
 *  Purpose: Create the main game loop
 */
var localColor='#FF0000';
var nonLocalColor='#FFFF00';
var GameObjManager;
var playerManager;
var Events = Matter.Events;
var MAXSHOTS = 120;
var numShots=MAXSHOTS;
var reloading = false;
var inputTimer = 0;
var inputTimeoutPeriod = 100;
var x_direction= 1;
var y_direction= 1;
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


	World.add(this.engine.world, ground);


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
	var newPlayer = new ClientPlayer(player.newX, player.newY, null, player.id, false, localColor);
	newPlayer.oldX = player.oldX;
	newPlayer.oldY = player.oldY;
	newPlayer.gameid = player.gameid;
	this.playerList.push(newPlayer);
	this.localPlayerid=newPlayer.id;
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
            if(temp.health.healthvalue!=data.size.health || temp.physicsComponent.circleRadius!=data.size.radius){
                temp.health.healthvalue = data.size.health;
                temp.physicsComponent.circleRadius = data.size.radius;
                Matter.Body.scale(temp.physicsComponent, (1 - .01), (1 - .01));
            }
		}
	}
	for(var i=0; i<this.itemList.length; i++){
		if((data.id!=this.localPlayerid)&&(temp.id == data.id)){ //dont know if we need this
			Matter.Body.setVelocity(itemList[i].physicsComponent, Matter.Vector.create(0,0)); // still object
		}
	}
};

Game.prototype.addItem = function (item){
	this.itemList.push(item);
}

Game.prototype.attack = function(data){
	for (var i=0; i<GameObjManager.GameObjectList.length; i++){
		var temp = GameObjManager.GameObjectList[i];
		if((data.id!=this.localPlayerid)&&(temp.id == data.id)){
			var item = new Item(data.pos.x + (data.size.radius *(data.x_direction)),data.pos.y + (data.size.radius *(data.y_direction)),10,10, data.itemId, true);
			item.proj = true;
                        Matter.Body.setVelocity( item.physicsComponent,Matter.Vector.create(data.x_direction*20,data.y_direction*20));
			GameObjManager.AddObject(item);

		}
	}

};
Game.prototype.removeOtherPlayer = function(data){
        for (var i=0; i<GameObjManager.GameObjectList.length; i++){
		var temp = GameObjManager.GameObjectList[i];
		if(temp.id == data.id){
		 		}	
		
	}


};
//----------------------------------------------------------------------------------------------------------------------------------------------
//begin input
//----------------------------------------------------------------------------------------------------------------------------------------------
var keysDown = {};
var isAttacking = false;
var InputListener = function(socket){
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
	if (38 in keysDown) { //up
		y_factor = -2;
		input.push('u');
		y_direction = -1;
		x_direction = 0;
	}
	if (40 in keysDown) { //down
		y_factor = 2;
		input.push('d');
		y_direction = 1;
		x_direction = 0;
	}
	if (37 in keysDown) { // left
		x_factor = -2;
		input.push('l');
		x_direction = -1; //shoot projectile on the left  side
		y_direction = 0;
	}
	if (39 in keysDown) { // right
		x_factor = 2;
		input.push('r');
		x_direction = 1; //shoot projectile on the right side
		y_direction = 0;
	}

	if (32 in keysDown){ //Spacebar
	    itemId=Math.random()*10000;
	    if(numShots >= 0 && !reloading){
	      isAttacking = true;
	      numShots--;
	    }
	    else{
	        reloading = true;
	    	numShots++;
		if(numShots == MAXSHOTS){
		  reloading = false;
		}
	    }
               
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
			x_direction: x_direction,
			y_direction: y_direction,
                        itemId: itemId,
                        size : this.player.getSize()
			     };
			   if(isAttacking){
			    var tempitem = new Item(this.player.physicsComponent.position.x+((this.player.getSize().radius + 10)*x_direction), this.player.physicsComponent.position.y+(y_direction*(this.player.getSize().radius + 10)),10,10,itemId, true);
                Matter.Body.setVelocity( tempitem.physicsComponent,Matter.Vector.create(x_direction*20,y_direction*20));
                tempitem.proj = true;
		        GameObjManager.AddObject(tempitem);
                

			}
            if(!isAttacking){
                message.attack=false;
            }
            this.socket.emit('move', message);
			Matter.Body.setVelocity(this.player.physicsComponent,
					Matter.Vector.create(x_factor, y_factor));

		}
	}
};

