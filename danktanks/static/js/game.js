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
    var floorPts = 'M0 '+ y2;

    
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

	//OLD WAY WE MADE GROUND. OBSOLETE
	/*makeLine( x1, x2, y1, y2 );
	
	//fills space under ground by making trapezoids
	var pts = '' + x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + x2 + ',' + svgHeight + ' ' + x1 + ',' + svgHeight;
	var trap = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	trap.setAttribute( 'fill', 'seagreen' );
	trap.setAttribute( 'points', pts );
	svg.appendChild(trap);

	//hides weird vertical white lines a little
	makeLine( x2, x2, y2, svgHeight );*/
	
	x1 = x2;
	y1 = y2;

    }
    //makes floor single path	
    floorPts += 'L' + x2 + ' ' + y2 + ' ';
    floorPts += 'L' + svgWidth + ' ' + svgHeight + ' L0 ' + svgHeight + ' Z';
    floorPath.setAttribute( 'd', floorPts );
    floorPath.setAttribute( 'stroke', 'seagreen' );
    floorPath.setAttribute( 'stroke-width', '1' );
    floorPath.setAttribute( 'fill', 'seagreen' );
    floorPath.setAttribute( 'class', 'flPath' );
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

//flat terrain for testing
var testFloor = function() {
    var floorPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var floorPts = 'M0 600 L' + svgWidth + ' 600 L' + svgWidth + ' ' + svgHeight + ' L0 ' + svgHeight + ' Z';
    floorPath.setAttribute( 'd', floorPts );
    floorPath.setAttribute( 'stroke', 'seagreen' );
    floorPath.setAttribute( 'stroke-width', '1' );
    floorPath.setAttribute( 'fill', 'seagreen' );
    floorPath.setAttribute( 'class', 'testPath' );
    svg.appendChild( floorPath );
}

var createButton = function(){
    var a = document.createElementNS("http://www.w3.org/2000/svg", "a");
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute('id', 'lobbyButton');
    rect.setAttributeNS(null,'x', svgWidth - 120);
    rect.setAttributeNS(null,'y', 20);
    rect.setAttributeNS(null,'height', '50');
    rect.setAttributeNS(null,'width', '100');
    rect.setAttributeNS(null,'style', 'fill:red');
    var xlinkNS="http://www.w3.org/1999/xlink";
    a.setAttributeNS(xlinkNS,"href","/home/");
    a.appendChild(rect);
    svg.appendChild(a);
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute('x', svgWidth - 95);
    text.setAttribute('y', 50);
    text.setAttribute('font-size','18');
    text.innerHTML = "Lobby";
    svg.appendChild(text);
}
/*var intersectRect = function(r1, r2) {
    var r1 = r1.getBBox();    //BOUNDING BOX OF THE FIRST OBJECT
    var r2 = r2.getBBox();    //BOUNDING BOX OF THE SECOND OBJECT

    console.log(r1.left);
    
    //CHECK IF THE TWO BOUNDING BOXES OVERLAP
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

var gravity = function(){
    var terrain = document.getElementsByClassName("flPath");

    var tanks = document.getElementsByClassName("tank0");

    console.log(intersectRect(terrain, tanks));
}

setInterval(gravity, 30);
    
*/
var moveByVelocity = function(){
    var terrain = document.getElementsByClassName("testPath")[0];
    var accelConst = 1.009;
    var tanks = document.getElementsByClassName("tank0");
    if (!svg.checkIntersection(tanks[0], terrain.getBBox())){
	for(var i = 0; i < tanks.length; i++){
	    if((tanks[i].getAttribute("vy") < 0)){
	//	console.log(tanks[i].getAttribute("cy") == null);
		if(tanks[i].getAttribute("cy") != null){
		    tanks[i].setAttribute("vy",parseFloat(tanks[i].getAttribute("vy")) * accelConst);
		    tanks[i].setAttribute("cy", parseFloat(tanks[i].getAttribute("cy")) + parseFloat(tanks[i].getAttribute("vy")) * -1);
		}
		else{
		    tanks[i].setAttribute("vy", parseFloat(tanks[i].getAttribute("vy")) * accelConst); 
		    tanks[i].setAttribute("y", parseFloat(tanks[i].getAttribute("y")) + parseFloat(tanks[i].getAttribute("vy")) * -1);
		}
	    }
	    
	}
    }
    
}
var gravity = function(){
    
    var terrain = document.getElementsByClassName("testPath")[0];
    var tanks = document.getElementsByClassName("tank0");
    if (!svg.checkIntersection(tanks[0], terrain.getBBox())){
	for(var i = 0; i < tanks.length; i++){
	    //console.log(tanks[i].getAttribute("vy") == null);
	    if(tanks[i].getAttribute("vy") == null){
		tanks[i].setAttribute("vy", -0.1);		
	    }
	}
    }
}   
	    

testFloor();
drawTank(0,250,250,0,"blue");
setInterval(gravity, 10);
setInterval(moveByVelocity, 10);
