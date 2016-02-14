var PlayerManager = function (id, isServer) {
    GameObject.call(this);
    this.id = id; //may need id for plaryer AND game
    this.isServer = isServer; //prevent server from drawing
    this.playerList = [];
    this.localPlayer;
}

PlayerManager.prototype = GameObject.prototype;
PlayerManager.prototype.contructor = PlayerManager;

PlayerManager.prototype.getPlayerCount = function () {
    return this.playerList.length;
}

PlayerManager.prototype.update = function (delta) {

/*    x_factor = y_factor = 0;

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

    if (this.localPlayer != null) {
        Matter.Body.setVelocity(this.localPlayer.physicsComponent, Matter.Vector.create(x_factor, y_factor));
    }*/
};

PlayerManager.prototype.updatePlayers = function () {
    //TODO(Fausto) implement
};

PlayerManager.prototype.addPlayers = function (player) {
    this.playerList.push(player);
};

PlayerManager.prototype.setLocalPLayer = function (player) {
    //TODO(Fausto): implement with addPlayers()
    this.localPlayer = player;
    // this.addPlayers(player);
};
