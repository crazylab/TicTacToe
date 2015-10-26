var keypress = require('keypress');
var charm = require('charm')(process.stdout);

var grphx = require("./graphics.js").grphx;
var lib = require("./tttLib.js").lib;

var key = {};
exports.key = key;

var left = function(center,position){
	var limit = center.x - 20;
	position.x = position.x > limit ? position.x -= 20 : position.x;
	charm.position(position.x, position.y);
}
var right = function(center,position){
	var limit = center.x + 20;
	position.x = position.x < limit ? position.x += 20 : position.x;
	charm.position(position.x, position.y);	
}
var up = function(center,position){
	var limit = center.y - 8;
	position.y = position.y > limit ? position.y -= 8 : position.y;
	charm.position(position.x, position.y);	
}
var down = function(center,position){
	var limit = center.y + 8;
	position.y = position.y < limit ? position.y += 8 : position.y;
	charm.position(position.x, position.y);	
}
var action = function(matrix,player,move,availableMoves){
	lib.handleUserInteraction(matrix,player,move,availableMoves);
}
key.input = function(matrix,players,availableMoves){
	var screenHeight = process.stdout.rows;
	var screenWidth = process.stdout.columns;

	var center = {x: Math.round(screenWidth/2), y: Math.round(screenHeight/2)};
	var position = JSON.parse(JSON.stringify(center));
	
	var row = 2, column = 2;
	var move = +(row + '' + column);
	var playerIndex = 0;

	charm.erase('up');
	
	grphx.presentScreen('O',position);
	grphx.cursor(position);
	keypress(process.stdin);


	process.stdin.on('keypress', function (ch, key){
		// charm.position(0,0);
		// charm.erase('up');
		charm.reset();
		switch(key.name){
			case 'left' : 	left(center,position);
							column = column == 1 ? column : column - 1;
							break;
			case 'right': 	right(center,position);
							column = column == 3 ? column : column + 1;
							break;
			case 'up' 	: 	up(center,position);
							row =  row == 1 ? row : row - 1;
							break;
			case 'down' : 	down(center,position);
							row = row == 3 ? row : row + 1;
							break;
			case 'space': 	var move = +(row + '' + column);
							action(matrix,players[playerIndex],move,availableMoves);
							playerIndex = 1 - playerIndex;

		}		
		grphx.presentScreen(players[playerIndex].symbol);
		grphx.cursor(position);
		grphx.writeSymbols(matrix,center);
	  
	  	if (key && key.ctrl && key.name == 'c') {
			charm.reset();
	    	process.stdin.pause();
	  	}
	});
	process.stdin.setRawMode(true);
	process.stdin.resume();
}