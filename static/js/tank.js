var svg = document.getElementById("svg");
var ns = "http://www.w3.org/2000/svg";

var createCircle = function(cx, cy, r, id, orientation){
    var circ = document.createElementNS(ns, "circle");
    circ.setAttribute("cx", cx);
    circ.setAttribute("cy", cy);
    circ.setAttribute("r", 10);
    circ.setAttribute("orientation", orientation);
    circ.setAttribute("class", "tank" + id);
    svg.appendChild(circ);
}

//Creates a tank at centered at (x,y) with a given id "tank" + id.
//Orientation has NOT been taken into account yet
//fill changes color of tank, default is black
var drawTank = function(id, x, y, orientation, fill){
    var cx = x-25;
    var cy = y-10;
    createCircle(cx + 11, cy + 17, 10, id,orientation);
    createCircle(cx + 34, cy + 17, 10, id,orientation);
    createCircle(cx + 22.5,cy+17,10,id,orientation);
    var body = document.createElementNS(ns, "rect");
    body.setAttribute("x", cx);
    body.setAttribute("y", cy);
    body.setAttribute("width", 45);
    body.setAttribute("height", 20);
    body.setAttribute("rx", 5);
    body.setAttribute("ry", 5);
    body.setAttribute("orientation", orientation);
    body.setAttribute("class", "tank" + id);
    svg.appendChild(body);
    body.innerHTML = "tank" + id;
    var cockpit = document.createElementNS(ns, "rect");
    cockpit.setAttribute("x", cx + 10);
    cockpit.setAttribute("y", cy - 10);
    cockpit.setAttribute("width", 20);
    cockpit.setAttribute("height", 10);
    cockpit.setAttribute("orientation", orientation);
    cockpit.setAttribute("class", "tank" + id);
    svg.appendChild(cockpit);
    var barrel = document.createElementNS(ns, "rect");
    barrel.setAttribute("x", cx + 25);
    barrel.setAttribute("y", cy - 6);
    barrel.setAttribute("width", 25);
    barrel.setAttribute("height", 4);
    barrel.setAttribute("orientation", orientation);
    barrel.setAttribute("class", "tank" + id);
    barrel.setAttribute("id", "barrel");
    svg.appendChild(barrel);
    //to make tank face left
    if (orientation == 180){
	cockpit.setAttribute("x", cx + 15);
	barrel.setAttribute("x", cx - 5);
    }
    var tank = document.getElementsByClassName("tank" + id)
    for(var i=0;i < tank.length;i++){
	tank[i].setAttribute("fill", fill);
	if(tank[i].tagName == "circle"){
	    tank[i].setAttribute("fill", "black");
	}
    }
    var tankTag = document.createElementNS(ns, "text");
    tankTag.setAttributeNS(null, 'x', cx + 7);
    tankTag.setAttributeNS(null, 'y', cy - 20);
    tankTag.setAttributeNS(null, 'font-size','10px');
    tankTag.innerHTML = "tank"+ id;
    svg.appendChild(tankTag);
}

//removes tank with given id from the svg
//There's a bug where you need to run this three times to remove all elements of the tank (the cockpit and a wheel remain after the first delete)
var removeTank = function(id){
    var tank = document.getElementsByClassName("tank" + id);
    for(var i = 0; i < tank.length; i++){
	/*var parent = tank[i].parentNode;
	parent.removeChild(tank[i]);
	console.log("removed one element.");*/
	tank[i].remove();
    }
    console.log("tank" + id + " removed.");
}

//ONKEYDOWN METHOD
//Method to move a tank around the map
//Use the W, A, S, D keys to move
//Arrow Keys work too
//KEYCODES:
//W -> 119
//A -> 97
//S -> 115
//D -> 100
//Left -> 37
//Up -> 38
//Right -> 39
//Down -> 40
var moveTank = function(event){
    var key = event.keyCode || event.which
    console.log(key);
}

$(window).on('keydown', moveTank);


