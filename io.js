var keypress = require('keypress');
var charm = require('charm')(process.stdout);

var screen = require("./graphics.js").screen;
var lib = require("./tttLib.js").ttt;

var io = {};
exports.io = io;

var left = function(position){
	var limit = screen.center.width - 20;
	position.width = position.width > limit ? position.width -= 20 : position.width;
	charm.position(position.width, position.height);
}
var right = function(position){
	var limit = screen.center.width + 20;
	position.width = position.width < limit ? position.width += 20 : position.width;
	charm.position(position.width, position.height);	
}
var up = function(position){
	var limit = screen.center.height - 8;
	position.height = position.height > limit ? position.height -= 8 : position.height;
	charm.position(position.width, position.height);	
}
var down = function(position){
	var limit = screen.center.height + 8;
	position.height = position.height < limit ? position.height += 8 : position.height;
	charm.position(position.width, position.height);	
}
io.processInput = function(players){
	var position = JSON.parse(JSON.stringify(screen.center));
	var row = 2, column = 2;
	var move = +(row + '' + column);
	var playerIndex = 0;
	var status = {winner : false, end: false};
	charm.erase('up');
	
	screen.drawDiagram('O',false);
	screen.drawCursor(position);
	keypress(process.stdin);

	process.stdin.on('keypress', function (ch, key){
		charm.erase('up');
		charm.erase('down');
		charm.position(0,0);

		switch(key.name){
			case 'left' : 	left(position);
							column = column == 1 ? column : column - 1;
							break;
			case 'right': 	right(position);
							column = column == 3 ? column : column + 1;
							break;
			case 'up' 	: 	up(position);
							row =  row == 1 ? row : row - 1;
							break;
			case 'down' : 	down(position);
							row = row == 3 ? row : row + 1;
							break;
			case 'space': 	var move = +(row + '' + column);
							status = lib.handleUserMove(players[playerIndex],move);
							console.log()
							playerIndex = status.isValidMove && !status.end? 1 - playerIndex : playerIndex;
		}	

		screen.drawDiagram(players[playerIndex].symbol,status.end);
		screen.drawCursor(position);
		screen.writeSymbols(lib.matrix);

		lib.checkGameEnd(status);
	  	if (key.name == 'escape' || key.name == 'q') {
			charm.position(0,screen.height);
			charm.cursor(true);
	    	process.stdin.pause();
	  	}
	});
	process.stdin.setRawMode(true);
	process.stdin.resume();
}