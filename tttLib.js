var charm = require('charm')(process.stdout);
var screen = require('./graphics.js').screen;

//-----------------------------------------------------------------------------
ttt = {
	availableMoves : [11,12,13,21,22,23,31,32,33],
	matrix : [ 	[' ',' ',' '],
				[' ',' ',' '],
				[' ',' ',' ']
			 ],
	currentMove : null,
	winner : null,
	isValidMove : false,
	end : false,

	set setMove(move){
		if(this.availableMoves.indexOf(move) == -1){
			this.isValidMove = false;
			return;
		}
		this.isValidMove = true;
		var indexOfMove = this.availableMoves.indexOf(move);
		this.currentMove = this.availableMoves.splice(indexOfMove,1)[0];

		if(this.availableMoves.length == 0 || this.winner)
			this.end = true;
	},
	set setMatrix(player){
		if(!this.isValidMove)
			return;
		var move = String(this.currentMove).match(/./gi);
		this.matrix[move[0] - 1][move[1] - 1] = player.symbol;
		var winner = this.checkForMatch(player);
		if(winner)
			this.winner = winner;
	}
}
//-----------------------------------------------------------------------------
var matchEverything = function(findMe,insideMe){
	return findMe.every(function(element){
		return insideMe.indexOf(element) != -1;
	});
}
ttt.checkDiagonalMatch = function(moves){
	var diagonal1 = matchEverything([11,22,33],moves);
	var diagonal2 = matchEverything([13,22,31],moves);
	return diagonal1 || diagonal2;
}
ttt.checkColumnMatch = function(moves){
	var column1 = matchEverything([11,21,31],moves);
	var column2 = matchEverything([12,22,32],moves);
	var column3 = matchEverything([13,23,33],moves);
	return column1 || column2 || column3;
}
ttt.checkRowMatch = function(moves){
	var row1 = matchEverything([11,12,13],moves);
	var row2 = matchEverything([21,22,23],moves);
	var row3 = matchEverything([31,32,33],moves);
	return row1 || row2 || row3;
}
ttt.checkForMatch = function(player){
	var diagonal = ttt.checkDiagonalMatch(player.moves);
	var row = ttt.checkRowMatch(player.moves);
	var column = ttt.checkColumnMatch(player.moves);
	return diagonal || row || column ? player.symbol : null;
}
//-----------------------------------------------------------------------------
ttt.actionWhenGameDraw = function(gameEnd){
	if(!gameEnd)
		return;
	screen.writeMessage('Nobody Won The Game ..');
	process.stdin.pause();
	charm.position(0,screen.height);
	charm.cursor(true);
	process.exit(0);
}
ttt.actionWhenGameWin = function(winner){
	if(!winner)
		return;
	screen.writeMessage('Player '+winner+' Won The Game ..');
	process.stdin.pause();
	charm.position(0,screen.height);
	charm.cursor(true);
	process.exit(0);
}
ttt.checkGameEnd = function(status){
	ttt.actionWhenGameWin(status.winner);
	ttt.actionWhenGameDraw(status.end);
}
//-----------------------------------------------------------------------------
ttt.handleUserMove = function(player,move){
	this.setMove = move;
	if(this.isValidMove)
		player.moves.push(move);
	this.setMatrix = player;
	var status = {
		winner : this.winner,
		end : this.end,
		isValidMove : this.isValidMove
	}
	return status;
}
exports.ttt = ttt;