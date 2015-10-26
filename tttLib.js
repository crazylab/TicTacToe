var charm = require('charm')(process.stdout);
var screen = require('./graphics.js').screen;

var lib={};
exports.lib=lib;

lib.getMatrix = function(matrix,move,playerSymbol){
	move = String(move).split("").map(function(num){
		return num - 1;
	});
	matrix[move[0]][move[1]] = playerSymbol;
	return matrix;
}
var matchEverything = function(findMe,insideMe){
	return findMe.every(function(element){
		return insideMe.indexOf(element) != -1;
	});
}
lib.checkDiagonalMatch = function(player){
	var diagonal1 = matchEverything([11,22,33],player.moves);
	var diagonal2 = matchEverything([13,22,31],player.moves);
	return diagonal1 || diagonal2 ? player.symbol : false;
}
lib.checkColumnMatch = function(player){
	var column1 = matchEverything([11,21,31],player.moves);
	var column2 = matchEverything([12,22,32],player.moves);
	var column3 = matchEverything([13,23,33],player.moves);
	return column1 || column2 || column3 ? player.symbol : false;
}
lib.checkRowMatch = function(player){
	var row1 = matchEverything([11,12,13],player.moves);
	var row2 = matchEverything([21,22,23],player.moves);
	var row3 = matchEverything([31,32,33],player.moves);
	return row1 || row2 || row3 ? player.symbol : false;
}
lib.checkForMatch = function(player){
	var diagonal = lib.checkDiagonalMatch(player);
	var row = lib.checkRowMatch(player);
	var column = lib.checkColumnMatch(player);
	return diagonal || row || column;
}
lib.gameDraw = function(){
	screen.writeMessage('Nobody Won The Game ..');
	process.stdin.pause();
	setTimeout(function(){
		charm.reset();
		process.exit(0);
	},2000);

}
lib.gameWin = function(winner){
	screen.writeMessage('Player '+winner+' Won The Game ..');
	process.stdin.pause();
	setTimeout(function(){
		charm.reset();
		process.exit(0);
	},2000);
}
lib.handleUserInteraction=function(matrix,player,move,availableMoves){
	if(availableMoves.indexOf(move) == -1)
		return {winner : false, end: false, isValidMove: false};
	var indexOfMove = availableMoves.indexOf(+move);
	var placeSelected=availableMoves.splice(indexOfMove,1)[0];

	matrix=lib.getMatrix(matrix,placeSelected,player.symbol);
	player.moves.push(placeSelected);

	return {
		winner 		: 	lib.checkForMatch(player),
		end    		: 	availableMoves.length == [] || lib.checkForMatch(player),
		isValidMove : 	true
	}
}
