var game = {};

//Initiate game function in server file
window.onload = function(){

		//Create our game client instance.
	game = new game_core();

			//Fetch the viewport
		game.viewport = document.getElementById('viewport');
			
			//Adjust viewport sizes
		game.viewport.width = game.world.width;
		game.viewport.height = game.world.height;

		game.ctx = game.viewport.getContext('2d');

		game.ctx.font = '11px "Helvetica"';

		//Finally, start the loop
	game.update( new Date().getTime() );

};