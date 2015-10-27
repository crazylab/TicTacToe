var axel = require('axel');
var charm = require('charm')(process.stdout);
var screen = {	
	height: process.stdout.rows, 
	width: process.stdout.columns,
	center : { 
		height: Math.round(process.stdout.rows/2), 
		width: Math.round(process.stdout.columns/2)
	}
};
exports.screen = screen;
//---------------------------------------------------------------------------------------
screen.writeSymbols = function(matrix){
	//Top Row
	axel.text(this.center.width - 20, this.center.height - 8, matrix[0][0]);
	axel.text(this.center.width, this.center.height - 8, matrix[0][1]);
	axel.text(this.center.width + 20, this.center.height - 8, matrix[0][2]);
	//Middle Row
	axel.text(this.center.width - 20, this.center.height, matrix[1][0]);
	axel.text(this.center.width, this.center.height, matrix[1][1]);
	axel.text(this.center.width + 20, this.center.height, matrix[1][2]);
	//Bottom Row
	axel.text(this.center.width - 20, this.center.height + 8, matrix[2][0]);
	axel.text(this.center.width, this.center.height + 8, matrix[2][1]);
	axel.text(this.center.width + 20, this.center.height + 8, matrix[2][2]);
}
//---------------------------------------------------------------------------------------
screen.drawCursor = function(position){
	axel.bg(100,100,100);
	axel.box(position.width - 4,position.height + 2,8,1);
	axel.bg(0,0,0);
}
//-----------------------------------------------------------------------------------
screen.writeMessage = function(message){
	var messageLength = message.length;
	axel.bg(255,0,0);
	axel.box(this.center.width - (messageLength/2) - 4, this.center.height - 1,messageLength + 8,1);
	axel.text(this.center.width - (messageLength/2),this.center.height - 1,message);
	axel.bg(0,0,0)
}
//---------------------------------------------------------------------------------------
screen.writeHeading = function(message){
	var messageLength = message.length;
	axel.bg(25,25,30);
	axel.box(this.center.width - (messageLength/2) - 5, 3,messageLength + 10,1);
	axel.fg(255,255,255);
	axel.text(this.center.width - (messageLength/2),3,message);
}
//---------------------------------------------------------------------------------------
var writeInfo = function(){
	axel.bg(25,25,30);
	axel.box(screen.width - 30, 5,25,13);
	axel.text(screen.width - 28,6,'← 		Left');
	axel.text(screen.width - 28,8,'→ 		Right');
	axel.text(screen.width - 28,10,'↑ 		Up');
	axel.text(screen.width - 28,12,'↓		Down');
	axel.text(screen.width - 28,14,'space	Select');
	axel.text(screen.width - 28,16,'esc / q	Exit');
	axel.bg(0,0,0);
}
//-----------------------------------------------------------------------------------
var horizontalLines = function(center){
	axel.bg(255,255,255);
	//Top Line
	var start = {width: center.width - 28, height: center.height - 4};
	var end	  = {width: center.width + 28, height: center.height - 4};
	axel.line(start.width,start.height,end.width,end.height);

	//Bottom Line
	var start = {width: center.width - 28, height: center.height + 4};
	var end	  = {width: center.width + 28, height: center.height + 4};
	axel.line(start.width,start.height,end.width,end.height);
}
var verticalLines = function(center){
	axel.bg(255,255,255);
	//Left Line
	var start = {width: center.width - 12, height: center.height - 10};
	var end	  = {width: center.width - 12, height: center.height + 11};
	axel.line(start.width,start.height,end.width,end.height);
	axel.line(start.width+1,start.height,end.width+1,end.height);

	//Right Line
	var start = {width: center.width + 10, height: center.height - 10};
	var end	  = {width: center.width + 10, height: center.height + 11};
	axel.line(start.width,start.height,end.width,end.height);
	axel.line(start.width+1,start.height,end.width+1,end.height);
}
screen.drawDiagram = function(player,end){
	charm.cursor(false);
	if(!end)
		screen.writeHeading("Player "+player+"'s  Turn");
	horizontalLines(this.center);
	verticalLines(this.center);
	writeInfo();
}

