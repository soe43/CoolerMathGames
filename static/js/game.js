var svg = document.getElementById("cvs");

var start = false
var x1;
var x2;
var y1;
var y2;

var makeLine = function( x1, x2, y1, y2 ) {
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute( 'x1', x1 );
    line.setAttribute( 'x2', x2 );
    line.setAttribute( 'y1', y1 );
    line.setAttribute( 'y2', y2 );
    line.setAttribute( 'stroke', 'seagreen' );
    svg.appendChild(line);
}

var makeRanLine = function() {
    if( start == false ) {
	y1 = Math.random()*(200) + 300;
	x1 = 0;
    }
    while( x < 500 ) {
	changeX = Math.random()*(50);
	changeY = Math.random()*(50);
	if( x2 < 300 || x2 > 500 ) {
	    
	    
	
	makeLine( x1, x2, y1, y2 );
	
	x1 = x2;
	y1 = y2;
    }
}

var makeRanFloor = function() {
    while( x < 500 ) {
	

makeLine( 0, 500, 400, 400 );
    
