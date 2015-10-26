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
lib.presentMatrix=function(matrix){
	var result=matrix.map(function(row,index){
		return ['\t',index+1,'.\t  ',row[0],' |  ',row[1],'  | ',row[2]].join('');
	}).join('\n\t\t----|-----|----\n');
	var columnNumbers=['\n\t\t 1  |  2  |  3 \n','\t\t---------------\n'].join('');
	return columnNumbers+result+'\n';
}
lib.showUserOption=function(availableMoves){
	var result=availableMoves.map(function(move,index){
		move=String(move).split("").join('\t');
		var divider='\n    -------------------'
		return '\t'+move+divider;
	}).join('\n');
	var header='    ---Row----Column---\n';
	return header+result+'\n';
};
var simplyfyMove=function(move){
	return move.replace(/\D/g,'');
};
lib.handleUserInteraction=function(matrix,player,move,availableMoves){
	if(availableMoves.indexOf(move) == -1)
		return;
	var indexOfMove = availableMoves.indexOf(+move);
	var placeSelected=availableMoves.splice(indexOfMove,1)[0];

	matrix=lib.getMatrix(matrix,placeSelected,player.symbol);
	player.moves.push(placeSelected);

	var winner=lib.checkForMatch(player);
	if(winner){
		console.log(lib.presentMatrix(matrix));
		console.log('Player '+winner+' own the match');
		process.exit(0);
	}
	if(availableMoves.length==[]){
		console.log(lib.presentMatrix(matrix));
		console.log('\nNobody won the game.');
		process.exit(0);
	}
}
