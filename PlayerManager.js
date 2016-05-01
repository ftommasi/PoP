/* Author/Contributors: Fred Trelz, Fausto Thomassi, Saddha Santanaporn
 * Date: 2/16/2016
 * Purpose: manages players
 */
var PlayerManager = function (id, isServer) {
    GameObject.call(this);
    this.id = id; 
    this.isServer = isServer; 
    this.playerList = [];
    this.localPlayer;
}

PlayerManager.prototype = GameObject.prototype;
PlayerManager.prototype.contructor = PlayerManager;

PlayerManager.prototype.getPlayerCount = function () {
    return this.playerList.length;
}

PlayerManager.prototype.update = function (delta) {

};

PlayerManager.prototype.updatePlayers = function () {
};

PlayerManager.prototype.addPlayers = function (player) {
    this.playerList.push(player);
};

PlayerManager.prototype.setLocalPLayer = function (player) {
    this.localPlayer = player;
};
