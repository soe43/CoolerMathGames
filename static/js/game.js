var svg = document.getElementById("svg");

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

var makeRanLine = function() {
    var y1 = Math.random()*(150) + 300;
    var x1 = 0;
    var x2 = 0;
    var y2 = y1;
    
    while( x1 < svg.getAttribute('width') ) {
	var changeX = Math.random()*(100) + 10;
	var changeY = Math.random()*(100) - 50;
	console.log( 'x1: ' + x1 );
	console.log( 'x2: ' + x2 );
	console.log( 'y1: ' + y1 );
	console.log( 'y2: ' + y2 );
	console.log( 'changeX: ' + changeX );
	console.log( 'changeY: ' + changeY );
	
	if( y2 + changeY <= 250 || y2 + changeY >= 500 ) {
	    y2 = y2 - changeY;
	} else {
	    y2 = y2 + changeY;
	}
	x2 = x2 + changeX;
	
	makeLine( x1, x2, y1, y2 );
	var pts = '' + x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + x2 + ',' + svg.getAttribute('height') + ' ' + x1 + ',' + svg.getAttribute('height');
	var trap = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	trap.setAttribute( 'fill', 'seagreen' );
	svg.appendChild(trap);
	
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

//makeLine( 0, 500, 400, 400 );
makeRanLine();
    
