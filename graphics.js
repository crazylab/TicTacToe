var axel = require('axel');
var charm = require('charm')(process.stdout);

var grphx = {	
	screen : { 
		height: process.stdout.rows, 
		width: process.stdout.columns
	},
	center : { 
		height: Math.round(process.stdout.rows/2), 
		width: Math.round(process.stdout.columns/2)
	}
};
exports.grphx = grphx;

grphx.writeHeading = function(message){
	axel.bg(255,0,0);
	axel.fg(255,255,255);
	axel.text(69,2,message);
}
grphx.writeSymbols = function(matrix){
	//Top Row
	axel.text(this.center.width - 20, this.center.height - 8, matrix[0][0]);
	axel.text(this.center.width, this.center.height - 8, matrix[0][1]);
	axel.text(this.center.width + 20, this.center.height - 8, matrix[0][2]);
	//Middle Row
	axel.text(this.center.width - 20, this.center.height, matrix[1][0]);
	axel.text(this.center.width,this.center.height,matrix[1][1]);
	axel.text(this.center.width + 20, this.center.height, matrix[1][2]);
	//Bottom Row
	axel.text(this.center.width - 20, this.center.height + 8, matrix[2][0]);
	axel.text(this.center.width, this.center.height + 8, matrix[2][1]);
	axel.text(this.center.width + 20, this.center.height + 8, matrix[2][2]);
}
var drawCursor = function(x,y){
	axel.bg(100,100,100);
	axel.box(x,y,8,1);
	axel.bg(0,0,0);
}
grphx.cursor = function(position){
	var position = {x: position.x - 4, y: position.y + 2};
	drawCursor(position.x,position.y);
}
//-----------------------------------------------------------------------------------
grphx.writeMessage = function(message){
	var messageLength = message.length;
	axel.bg(255,0,0);
	axel.text(this.center.width - (messageLength/2),this.center.height,message);
	axel.bg(0,0,0)
}
//-----------------------------------------------------------------------------------
var horizontalLines = function(center){
	axel.bg(255,255,255);
	//Top Line
	var start = {width: center.width - 30, height: center.height - 5};
	var end	  = {width: center.width + 30, height: center.height - 5};
	axel.line(start.width,start.height,end.width,end.height);

	//Bottom Line
	var start = {width: center.width - 30, height: center.height + 4};
	var end	  = {width: center.width + 30, height: center.height + 4};
	axel.line(start.width,start.height,end.width,end.height);
}
var verticalLines = function(center){
	axel.bg(255,255,255);
	//Left Line
	var start = {width: center.width - 12, height: center.height - 12};
	var end	  = {width: center.width - 12, height: center.height + 12};
	axel.line(start.width,start.height,end.width,end.height);
	axel.line(start.width+1,start.height,end.width+1,end.height);

	//Right Line
	var start = {width: center.width + 12, height: center.height - 12};
	var end	  = {width: center.width + 12, height: center.height + 12};
	axel.line(start.width,start.height,end.width,end.height);
	axel.line(start.width+1,start.height,end.width+1,end.height);
}
grphx.drawDiagram = function(player){
	charm.cursor(false);
	
	grphx.writeHeading("Player "+player+"'s  Turn");
	horizontalLines(this.center);
	verticalLines(this.center);
}

