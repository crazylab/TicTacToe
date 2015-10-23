var lib = require("./tttLib.js").lib;
var readline = require('readline');
var charm = require('charm')(process.stdout);

var initialView=function(matrix,players,availableMoves){
	console.log(lib.presentMatrix(matrix));
	console.log("Player",players[0].symbol,"Select one move from below:\n");
	console.log(lib.showUserOption(availableMoves));
	console.log('Player '+players[0].symbol+': ');
}

var takeInput=function(matrix,players,availableMoves){
	var playerIndex = 0;
	initialView(matrix,players,availableMoves);
	charm.move(10, -1);
	process.stdin.setEncoding('utf8');
	process.stdin.on('readable', function() {
		var move = process.stdin.read();
		var isValid = availableMoves.indexOf(+move) != -1;
		if(move!=null&&(!isValid)){
			console.log("Invalid Option! Please chose a valid option from above");
		}
	  	else if(move!=null){
			charm.move(10, -1);
			lib.handleUserInteraction(matrix,players[playerIndex],move,availableMoves);	
			playerIndex=1-playerIndex;
			console.log('Player '+players[playerIndex].symbol+': ');
			charm.move(10, -1);
		}
	  });
	process.stdin.on('end', function() {
	  process.stdout.write('end');
	});
}
var main=function(){
	var availableMoves = [11,12,13,21,22,23,31,32,33];
	var playerO = {symbol:'O', moves:[]};
	var playerX = {symbol:'X', moves:[]};
	var players = [playerO,playerX];
	var matrix = [ 	[' ',' ',' '],
				 	[' ',' ',' '],
				 	[' ',' ',' ']
			   	 ];

	takeInput(matrix,players,availableMoves);
}
main();