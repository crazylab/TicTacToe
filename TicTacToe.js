var io = require("./io.js").io;
var lib = require("./tttLib.js").ttt;

var main=function(){
	var players = [{symbol:'O', moves:[]},{symbol:'X', moves:[]}];
	io.processInput(players);
}
main();