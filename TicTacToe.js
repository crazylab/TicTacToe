var io = require("./io.js").io;

var main=function(){
	var availableMoves = [11,12,13,21,22,23,31,32,33];
	var playerO = {symbol:'O', moves:[]};
	var playerX = {symbol:'X', moves:[]};
	var players = [playerO,playerX];
	var matrix = [ 	[' ',' ',' '],
				 	[' ',' ',' '],
				 	[' ',' ',' ']
			   	 ];
	io.processInput(matrix,players,availableMoves);
}
main();