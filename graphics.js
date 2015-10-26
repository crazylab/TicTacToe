var axel = require('axel');
var charm = require('charm')(process.stdout);

var grphx = {};
exports.grphx = grphx;
var horizontalLines = function(center){
	axel.bg(255,255,255);
	//Top Line
	var start = {x: center.x - 30, y: center.y - 5};
	var end	  = {x: center.x + 30, y: center.y - 5};
	axel.line(start.x,start.y,end.x,end.y);

	//Bottom Line
	var start = {x: center.x - 30, y: center.y + 4};
	var end	  = {x: center.x + 30, y: center.y + 4};
	axel.line(start.x,start.y,end.x,end.y);
}
var verticalLines = function(center){
	axel.bg(255,255,255);
	//Left Line
	var start = {x: center.x - 12, y: center.y - 12};
	var end	  = {x: center.x - 12, y: center.y + 12};
	axel.line(start.x,start.y,end.x,end.y);
	axel.line(start.x+1,start.y,end.x+1,end.y);

	//Right Line
	var start = {x: center.x + 12, y: center.y - 12};
	var end	  = {x: center.x + 12, y: center.y + 12};
	axel.line(start.x,start.y,end.x,end.y);
	axel.line(start.x+1,start.y,end.x+1,end.y);
}
var drawDiagram = function(center){
	horizontalLines(center);
	verticalLines(center);
}
var writeHeading = function(message){
	axel.bg(255,0,0);
	axel.fg(255,255,255);
	axel.text(69,2,message);
}
var drawCursor = function(x,y){
	axel.bg(100,100,100);
	axel.box(x,y,8,1);
	axel.bg(0,0,0);
}
grphx.writeSymbols = function(matrix,center){
	//Top Row
	axel.text(center.x - 20, center.y - 8, matrix[0][0]);
	axel.text(center.x, center.y - 8, matrix[0][1]);
	axel.text(center.x + 20, center.y - 8, matrix[0][2]);
	//Middle Row
	axel.text(center.x - 20, center.y, matrix[1][0]);
	axel.text(center.x,center.y,matrix[1][1]);
	axel.text(center.x + 20, center.y, matrix[1][2]);
	//Bottom Row
	axel.text(center.x - 20, center.y + 8, matrix[2][0]);
	axel.text(center.x, center.y + 8, matrix[2][1]);
	axel.text(center.x + 20, center.y + 8, matrix[2][2]);
}
grphx.cursor = function(position){
	var position = {x: position.x - 4, y: position.y + 2};
	drawCursor(position.x,position.y);
}
grphx.presentScreen = function(player){
	var screenHeight = process.stdout.rows;
	var screenWidth = process.stdout.columns;
	var center = {	
		x: Math.round(screenWidth/2), 
		y: Math.round(screenHeight/2)
	};
	charm.cursor(false);

	writeHeading("Player "+player+"'s  Turn");
	drawDiagram(center);
	axel.bg(0,0,0);	
}

