var m=require("./tttLib.js").lib;
var assert=require("assert");
var test={};
exports.test=test;

test["getMatrix gives an 2D array with effect of user move"]=function(){
	var matrix=  [ 	['','',''],
					['','',''],
					['','','']];
	var move=11;
	var playerSymbol='O';
	var expected=  [['O','',''],
					['','',''],
					['','','']];
	assert.deepEqual(expected,m.getMatrix(matrix,move,playerSymbol));
};
test["checkDiagonalMatch gives player symbol when diagonaly all symbol matches started from 00 position"]=function(){
	var playerO={symbol:'O',
				 moves:[11,21,22,33]};
	var expected='O';
	assert.deepEqual(expected,m.checkDiagonalMatch(playerO));
}
test["checkDiagonalMatch gives player symbol when it matches diagonaly during forwar diagonal match"]=function(){
	var playerO={symbol:'O',
				 moves:[33,13,31,22]};
	var expected='O';
	assert.deepEqual(expected,m.checkDiagonalMatch(playerO));
}
test["checkDiagonalMatch gives player symbol when it matches diagonaly "]=function(){
	var playerO={symbol:'O',
				 moves:[11,22,23,32,33]};
	var expected='O';
	assert.deepEqual(expected,m.checkDiagonalMatch(playerO));
}
test["checkColumnMatch gives player symbol when all the symbol of one of the column matches"]=function(){
	var playerX={symbol:'X',
				 moves:[21,33,23,12,13]};
	var expected='X'
	assert.deepEqual(expected,m.checkColumnMatch(playerX));
}
test["checkColumnMatch gives player symbol when all the symbol of one column matches and the full game is not complete but O wins"]=function(){
	var playerO={symbol:'O',
				 moves:[22,12,32]};
	var expected='O';
	assert.deepEqual(expected,m.checkColumnMatch(playerO));
}
test["checkColumnMatch gives player symbol when all the symbol of one column matches and the full game is not complete but X wins"]=function(){
	var playerX={symbol:'X',
				 moves:[11,21,31]};
	var expected='X';
	assert.deepEqual(expected,m.checkColumnMatch(playerX));
}
test["checkRowMatch gives player symbol when all the symbol of one of the row matches"]=function(){
	var playerX={symbol:'X',
				 moves:[33,12,31,32,23]};
	var expected='X'
	assert.deepEqual(expected,m.checkRowMatch(playerX));
}
test["checkForMatch checks whether a player had a match in row or column or diagonal and gives the winning player symbol when match is in diagonal"]=function(){
	var playerO={symbol:'O',
				 moves:[11,22,33]};
	var expected='O';
	assert.deepEqual(expected,m.checkForMatch(playerO));
};
test["checkForMatch checks whether a player had a match in row or column or diagonal and gives false when there is no match"]=function(){
	var playerO={symbol:'O',
				 moves:[21,33,22,12,31]};
	var expected=false;
	assert.deepEqual(expected,m.checkForMatch(playerO));
};
//---------------------------------------------------------------------------------------