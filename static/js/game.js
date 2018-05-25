var svg = document.getElementById("svg");
svg.setAttribute("width", window.innerWidth);
svg.setAttribute("height", window.innerHeight);
var svgHeight = svg.height.baseVal.value
var svgWidth = svg.width.baseVal.value

var makeLine = function( x1, x2, y1, y2 ) {
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute( 'x1', x1 );
    line.setAttribute( 'x2', x2 );
    line.setAttribute( 'y1', y1 );
    line.setAttribute( 'y2', y2 );
    line.setAttribute( 'stroke', 'seagreen' );
    line.setAttribute( 'class', 'ground' );
    svg.appendChild(line);
}

//random terrain generation
var makeRanLine = function() {
    var y1 = Math.random()*( ( svgHeight * .9 ) - ( svgHeight * 2 / 3 ) ) + ( svgHeight * 2 / 3 );
    var x1 = 0;
    var x2 = 0;
    var y2 = y1;
    
    while( x1 < svgWidth ) {
	var changeX = Math.random()*(100) + 10;
	var changeY = Math.random()*(100) - 50;
	console.log( 'x1: ' + x1 );
	console.log( 'x2: ' + x2 );
	console.log( 'y1: ' + y1 );
	console.log( 'y2: ' + y2 );
	console.log( 'changeX: ' + changeX );
	console.log( 'changeY: ' + changeY );
	
	if( y2 + changeY <= svgHeight / 2 || y2 + changeY >= svgHeight ) {
	    y2 = y2 - changeY;
	} else {
	    y2 = y2 + changeY;
	}
	x2 = x2 + changeX;
	
	makeLine( x1, x2, y1, y2 );

	//fills space under ground by making trapezoids
	var pts = '' + x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + x2 + ',' + svgHeight + ' ' + x1 + ',' + svgHeight;
	var trap = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	trap.setAttribute( 'fill', 'seagreen' );
	trap.setAttribute( 'points', pts );
	svg.appendChild(trap);

	//hides weird vertical white lines a little
	makeLine( x2, x2, y2, svgHeight );
	
	x1 = x2;
	y1 = y2;
	console.log( 'x1: ' + x1 );
	console.log( 'x2: ' + x2 );
	console.log( 'y1: ' + y1 );
	console.log( 'y2: ' + y2 );
	console.log( 'changeX: ' + changeX );
	console.log( 'changeY: ' + changeY );
	
    }
}    

$(document).ready(makeRanLine());
console.log(svgWidth);
console.log(svgHeight);


    
