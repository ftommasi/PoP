/* Authors/Contributors: Fred Trelz
*  Date: 1/25/16
*  Purpose: This file will contain all the functions and objects related to characters
*/

// Character object constructor (all of this is subject to change)
// TODO(back-end): Movement update function?
//                 Character color
//                 Character health
//                 Character size
//
// Takes optional anonymous object as initialization arguments
function Character() {
  this.xpos = 0;
  this.ypos = 0;

  if (arguments[0]) {
    for (var property in this) {
      if (arguments[0].hasOwnProperty(property)) {
        this[property] = arguments[0][property];
      }
    }
  }


}
