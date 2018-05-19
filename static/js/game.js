var svg = document.getElementById("svg");

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
    var y1 = Math.random()*(200) + 300;
    var x1 = 0;
    var x2 = 0;
    var y2 = y1;
    
    while( x1 < 500 ) {
	var changeX = Math.random()*(100);
	var changeY = Math.random()*(100) - 50;
	
	if( y2 + changeY < 300 || y2 + changeY > 500 ) {
	    y2 = y2 - changeY;
	}	    

	x2 = x2 + changeX;
	
	makeLine( x1, x2, y1, y2 );	
	x1 = x2;
	y1 = y2;
	console.log( 'x1: ' + x1 );
	console.log( 'x2: ' + x2 );
	console.log( 'y1: ' + y1 );
	console.log( 'y2: ' + y2 );
    }
}

//makeLine( 0, 500, 400, 400 );
    
