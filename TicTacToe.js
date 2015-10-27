var io = require("./io.js").io;
var main=function(){
	var players = [{symbol:'O', moves:[]},{symbol:'X', moves:[]}];
	io.processInput(players);
}
main();