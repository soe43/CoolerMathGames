var svg = document.getElementById("svg");
svg.setAttribute("width", window.innerWidth);
svg.setAttribute("height", window.innerHeight);
var svgHeight = svg.height.baseVal.value
var svgWidth = svg.width.baseVal.value

var turn = 0;

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
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute('x', svgWidth - 95);
    text.setAttribute('y', 50);
    text.setAttribute('font-size','18');
    text.innerHTML = "Lobby";
    a.appendChild(text);
    svg.appendChild(a);
}

var moveByVelocity = function(tankid){
    var terrain = document.getElementsByClassName("testPath")[0];
    var accelConst = 1.009;
    var tanks = Array.prototype.slice.call(document.getElementsByClassName("tank" + tankid));
    tanks.push(Array.prototype.slice.call(document.getElementsByClassName("bullet"))[0]);
    for(var i = 0; i < tanks.length; i++){
	if (!svg.checkIntersection(tanks[0], terrain.getBBox())){
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
	if (i == 6 && !svg.checkIntersection(tanks[6], terrain.getBBox())){
	    tanks[i].setAttribute("vy",parseFloat(tanks[i].getAttribute("vy")) * accelConst);
	    tanks[i].setAttribute("cy", parseFloat(tanks[i].getAttribute("cy")) + parseFloat(tanks[i].getAttribute("vy")) * -1);
	}
    }
}


var gravity = function(tankid){

    var terrain = document.getElementsByClassName("testPath")[0];
    var tanks = Array.prototype.slice.call(document.getElementsByClassName("tank" + tankid));
    tanks.push(Array.prototype.slice.call(document.getElementsByClassName("bullet"))[0]);
    console.log(tanks);
    for(var i = 0; i < tanks.length; i++){
	if (!svg.checkIntersection(tanks[0], terrain.getBBox())){
	    //console.log(tanks[i].getAttribute("vy") == null);
	    if(tanks[i].getAttribute("vy") == null){
		tanks[i].setAttribute("vy", -0.1);
	    }
	    
	}
	if (i == 6 && !svg.checkIntersection(tanks[6], terrain.getBBox())){
	    console.log(tanks[i].getAttribute("vy"));
	    if(tanks[i].getAttribute("vy") == 0){
		console.log("So did I");
		tanks[i].setAttribute("vy", -0.1);
	    }
	}
    }
    if(svg.checkIntersection(tanks[6], terrain.getBBox())){
	explode();
	if(turn == 0){
	    turn = 1;
	}
	else{
	    turn = 0;
	}
    }
}


var createBullet = function(id, power, angle){
    var bullet = document.createElementNS(ns, "circle");
    var barrel = document.getElementById("barrel" + id);
    var barrelEndX;
    var barrelEndY;
    if(barrel.getAttribute("orientation") == 180){
	var barrelEndX = Number(barrel.getAttribute("x"));
	var barrelEndY = Number(barrel.getAttribute("y")) + (barrel.getAttribute("height") / 2);
    }
    else{
	var barrelEndX = Number(barrel.getAttribute("x")) + Number(barrel.getAttribute("width"));
	var barrelEndY = Number(barrel.getAttribute("y")) + (barrel.getAttribute("height") / 2);
    }
    bullet.setAttribute("r", 2);
    bullet.setAttribute("cx", barrelEndX);
    bullet.setAttribute("cy", barrelEndY);
    bullet.setAttribute("vy", 0);
    bullet.setAttribute("fill", "black");
    bullet.setAttribute("class", "bullet");
    svg.appendChild(bullet);
}

//Removes bullet from svg and leave behind bullet damage
var explode = function(){
    document.getElementsByClassName("bullet")[0].remove();
    /* Exploding Mechanic*/
    /* If Colliding With Floor
       Feature to be implmented later */
    /* If Colliding With Another Tank*/
}

var checkTurn = function(){
    if(turn == 0){
	createBullet(0, 100, 0);
    }
    if(turn == 1){
	createBullet(1, 100, 0);
    }
}

var shot = function(event){
    var key = event.keyCode || event.which;
    console.log(key);
    if(key == 32){
	checkTurn();
    }
}


testFloor();
drawTank(250,250,0,"blue", 0);
drawTank(svgWidth - 250,250,180,"red", 1);
createButton();
setInterval(gravity, 10, 0);
setInterval(moveByVelocity, 10, 0);
setInterval(gravity, 10, 1);
setInterval(moveByVelocity, 10, 1);

$(window).on('keydown', shot);

