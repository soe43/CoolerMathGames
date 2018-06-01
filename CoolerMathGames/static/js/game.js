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
    var floorPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var floorPts = 'M0 '+y2;

    
    while( x1 < svgWidth ) {
	var changeX = Math.random()*(100) + 10;
	var changeY = Math.random()*(100) - 50;

	floorPts += 'L' + x2 + ' ' + y2 + ' ';
	
	if( y2 + changeY <= svgHeight / 2 || y2 + changeY >= svgHeight ) {
	    y2 = y2 - changeY;
	} else {
	    y2 = y2 + changeY;
	}
	x2 = x2 + changeX;
	
	/*makeLine( x1, x2, y1, y2 );
	
	//fills space under ground by making trapezoids
	var pts = '' + x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + x2 + ',' + svgHeight + ' ' + x1 + ',' + svgHeight;
	var trap = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	trap.setAttribute( 'fill', 'seagreen' );
	trap.setAttribute( 'points', pts );
	svg.appendChild(trap);

	//hides weird vertical white lines a little
	makeLine( x2, x2, y2, svgHeight );*/


	//makes floor single path
	
	
	x1 = x2;
	y1 = y2;

    }
    floorPts += 'L' + x2 + ' ' + y2 + ' ';
    floorPts += 'L' + svgWidth + ' ' + svgHeight + ' L0 ' + svgHeight + ' Z';
    floorPath.setAttribute( 'd', floorPts );
    floorPath.setAttribute( 'stroke', 'seagreen' );
    floorPath.setAttribute( 'stroke-width', '1' );
    floorPath.setAttribute( 'fill', 'seagreen' );
    floorPath.setAttribute( 'id', 'flPath' );
    svg.appendChild( floorPath );
    console.log(floorPath);
}


//$(document).ready(makeRanLine());

var makeRect = function( x, y, width, height ) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute( 'x', x );
    rect.setAttribute( 'y', y );
    rect.setAttribute( 'width', width );
    rect.setAttribute( 'height', height );
    rect.setAttribute( 'fill', 'seagreen' );
    svg.appendChild(rect);
    return rect;
}

var testFloor = function() {
     var floorPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var floorPts = 'M0 600 L' + svgWidth + ' 600 L' + svgWidth + ' ' + svgHeight + ' L0 ' + svgHeight + ' Z';
    floorPath.setAttribute( 'd', floorPts );
    floorPath.setAttribute( 'stroke', 'seagreen' );
    floorPath.setAttribute( 'stroke-width', '1' );
    floorPath.setAttribute( 'fill', 'seagreen' );
    floorPath.setAttribute( 'id', 'testPath' );
    svg.appendChild( floorPath );
}

/*function intersectRect(r1, r2) {
    var r1 = r1.getBoundingClientRect();    //BOUNDING BOX OF THE FIRST OBJECT
    var r2 = r2.getBoundingClientRect();    //BOUNDING BOX OF THE SECOND OBJECT

    console.log(r1.left);
    
    //CHECK IF THE TWO BOUNDING BOXES OVERLAP
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}*/

