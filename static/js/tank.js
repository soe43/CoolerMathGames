var svg = document.getElementById("svg");
var ns = "http://www.w3.org/2000/svg";

var createCircle = function(cx, cy, r, id){
    var circ = document.createElementNS(ns, "circle");
    circ.setAttribute("cx", cx);
    circ.setAttribute("cy", cy);
    circ.setAttribute("r", 10);
    circ.setAttribute("class", "tank" + id);
    svg.appendChild(circ);
}

//Creates a tank at centered at (x,y) with a given id "tank" + id.
//Orientation has NOT been taken into account yet
//fill changes color of tank, default is black
var drawTank = function(id, x, y, orientation, fill){
    var rect = document.createElementNS(ns, "rect");
    var cx = x-25;
    var cy = y-10;
    rect.setAttribute("x", cx);
    rect.setAttribute("y", cy);
    rect.setAttribute("width", 45);
    rect.setAttribute("height", 20);
    rect.setAttribute("rx", 5);
    rect.setAttribute("ry", 5);
    rect.setAttribute("orientation", orientation);
    rect.setAttribute("class", "tank" + id);
    svg.appendChild(rect);
    createCircle(cx + 10, cy + 15, 10, id);
    createCircle(cx + 35, cy + 15, 10, id);
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
    var tank = document.getElementsByClassName("tank" + id)
    for(var i = 0;i < tank.length;i++){
	tank[i].setAttribute("fill", fill);
    }
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


