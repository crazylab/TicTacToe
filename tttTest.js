var m=require("./tttLib.js").ttt;
var assert=require("assert");
var test={};
exports.test=test;

test["setMove sets remove moves from availableMoves upon giving a valid Move"]=function(){
	var availableMoves = [11,12,13,22,23,31,32,33];
	m.setMove = 21;
	assert.deepEqual(availableMoves,m.availableMoves);
	m.setMove = 21;
	assert.deepEqual(availableMoves,m.availableMoves); //21 is already taken
	assert.equal(false,m.isValidMove);
	assert.equal(21,m.currentMove);
};
test["setMove sets isValidMove upon giving a valid move"] = function(){
	m.availableMoves = [11,12,13,21,22,23,31,32,33];
	var availableMoves = [11,12,13,21,22,23,31,32,33];
	availableMoves.forEach(function(move){
		m.setMove = move;
		assert.equal(true,m.isValidMove);
	});
	m.setMove = 22;
	assert.equal(false,m.isValidMove);
}
test["setMove sets end when no more moves available"] = function(){
	m.availableMoves = [11,12,13,21,22,23,31,32,33];
	var availableMoves = [11,12,13,22,23,31,32,33];
	availableMoves.forEach(function(move){
		m.setMove = move;
		assert.equal(true,m.isValidMove);
	});
	assert.equal(true, m.end);
}
test["setMove sets end when someone won the game"] = function(){
	m.winner = 'O';
	m.availableMoves = [11,12,13,21,22,23,31,32,33];
	m.setMove = 21;
	assert.equal(true, m.end);
}
test["setMatrix sets symbol in matrix"] = function(){
	m.currentMove = 33;
	m.setMatrix = {symbol: 'X', moves:[]};
	assert.equal('X',m.matrix[2][2]);
}
test["setMatrix sets winner symbol in case of win condition"] = function(){
	m.currentMove = 33;
	m.setMatrix = {symbol: 'X', moves:[33,22,11]};
	assert.equal('X',m.winner);
}
test["checkDiagonalMatch gives player symbol when it matches diagonaly during forwar diagonal match"]=function(){
	assert.deepEqual(true,m.checkDiagonalMatch([33,13,31,22]));
}
test["checkDiagonalMatch gives player symbol when it matches backward diagonaly "]=function(){
	assert.deepEqual(true,m.checkDiagonalMatch([11,22,23,32,33]));
}
test["checkColumnMatch gives player symbol when all the symbol of one of the column matches"]=function(){
	assert.deepEqual(true,m.checkColumnMatch([11,21,31]));
	assert.deepEqual(true,m.checkColumnMatch([22,12,32]));
	assert.deepEqual(true,m.checkColumnMatch([13,23,33]));
	assert.deepEqual(false,m.checkColumnMatch([11,22,12,13]));
}
test["checkRowMatch gives player symbol when all the symbol of one of the row matches"]=function(){
	assert.deepEqual(true,m.checkRowMatch([11,12,13]));
	assert.deepEqual(true,m.checkRowMatch([21,22,23]));
	assert.deepEqual(true,m.checkRowMatch([31,32,33]));
	assert.deepEqual(false,m.checkRowMatch([11,23,31,32,23]));
}
test["checkForMatch checks whether a player had a match in row or column or diagonal and gives null when there is no match"]=function(){
	var playerO={symbol:'O',
				 moves:[21,33,22,12,31]};
	var expected = null;
	assert.deepEqual(expected,m.checkForMatch(playerO));
};
//---------------------------------------------------------------------------------------