var charm = require('charm')(process.stdout);
var grphx = require('./graphics.js').grphx;

var lib={};
exports.lib=lib;

lib.getMatrix=function(matrix,move,playerSymbol){
	move=String(move).split("").map(function(num){
		return num-1;
	});
	matrix[move[0]][move[1]]=playerSymbol;
	return matrix;
}
lib.checkDiagonalMatch=function(player){
	var multipleOf11=function(element){
		return element%11==0;
	};
	var result1=player.moves.filter(multipleOf11).length==3?player.symbol:false;
	var result2=player.moves.filter(function(element){
		return element==13||element==22||element==31;
	});
	var status=result1||result2.length==3;
	return status?player.symbol:false;
}
lib.checkColumnMatch=function(player){
	var moveLength=player.moves.length;
	for(var index=0;index<moveLength;index++){
		var match=player.moves.filter(function(element){
			var remainder=(player.moves[index]-element)%10;
			return remainder==0;
		});
	}
	return match.length==3?player.symbol:false;
}
lib.checkRowMatch=function(player){
	player.moves=player.moves.sort();
	for(var index=0;index<5;index++){
		var match=player.moves.filter(function(element,index,arr){
			return (arr[index+1]==element+1)||(arr[index-1]==element-1);
		});
		if(match.length==3)
			return player.symbol;
	}
	return false;
}
lib.checkForMatch=function(player){
	var diagonal=lib.checkDiagonalMatch(player);
	var row=lib.checkRowMatch(player);
	var column=lib.checkColumnMatch(player);
	return diagonal||row||column;
}
lib.gameDraw = function(){
	grphx.writeMessage('Nobody Won The Game ..');
	process.stdin.pause();
	setTimeout(function(){
		charm.reset();
		process.exit(0);
	},2000);

}
lib.gameWin = function(winner){
	grphx.writeMessage('Player '+winner+' Won The Game ..');
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
