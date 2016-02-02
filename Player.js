/* Authors/Contributors: Fred Trelz
*  Date: 2/2/16
*  Purpose: This file will contain all the functions and objects related to players and player
*           network communication.
*/

// Player object constructor

function Player() {
  var isHost = false;
  this.playerID = -1;
  this.character = null;
}

// takes anonymous object for optional initialization of character properties
Player.prototype.addCharacter = function(x, y, img) {
  this.character = new Character(x, y, img);
};

Player.prototype.getCharacterReference = function() {
  return this.character;
};

Player.prototype.isHost = function() {
  if (this.isHost) {
    return true;
  } else {
    return false;
  }
};

Player.prototype.getPlayerID = function() {
  return this.playerID;
};

Player.prototype.setPlayerID = function(newID) {
  this.playerID = newID;
};

