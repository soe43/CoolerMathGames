var svg = document.getElementById("svg");
var ns = "http://www.w3.org/2000/svg";
//decides who's turn is it to move by tankID
var turn = 0;
var timerID;

//tank numbering begins at 0
var tankID = 0;

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
//if orientation = 180, tank faces left, for now every other number faces right
//fill changes color of tank, default is black
var drawTank = function(x, y, orientation, fill, id){
    var cx = x-25;
    var cy = y-10;
    createCircle(cx + 11, cy + 17, 10, id,orientation);
    createCircle(cx + 34, cy + 17, 10, id,orientation);
    createCircle(cx + 22.5, cy+17, 10, id,orientation);
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
    cockpit.setAttribute("class", "tank"+id);
    svg.appendChild(cockpit);
    var barrel = document.createElementNS(ns, "rect");
    barrel.setAttribute("x", cx + 25);
    barrel.setAttribute("y", cy - 6);
    barrel.setAttribute("width", 31);
    barrel.setAttribute("height", 4);
    barrel.setAttribute("orientation", orientation);
    barrel.setAttribute("class", "tank" + id);
    barrel.setAttribute("id", "barrel" + id);
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
    /*
    var tankTag = document.createElementNS(ns, "text");
    tankTag.setAttributeNS(null, 'x', cx + 7);
    tankTag.setAttributeNS(null, 'y', cy - 20);
    tankTag.setAttributeNS(null, 'class', tankID);
    tankTag.setAttributeNS(null, 'font-size','10px');
    tankTag.innerHTML = "tank"+ tankID;
    svg.appendChild(tankTag);
    */
}

//rotates tank
var toRotate = function(id, angle){
  var idElements = document.getElementsByClassName("tank" + id);
  var center = idElements[3];
  var xAtt = center.getAttribute('x');
  var yAtt = center.getAttribute('y');
  for(i = 0; i < idElements.length; i++){
    var x = idElements[i];
    x.setAttribute("transform", "rotate(" + angle + " "+ xAtt + " " + yAtt + ")");
  }
}

var toRotateBarrel = function(id, angle){
  var idElements = document.getElementsByClassName("tank" + id);
  var center = idElements[4];
  var xAtt = parseInt(center.getAttribute('x')) + 10;
  var yAtt = parseInt(center.getAttribute('y')) + 5;
  idElements[5].setAttribute("transform", "rotate(" + angle + " "+ xAtt + " " + yAtt + ")");
}

//removes tank with given id from the svg
var removeTank = function(id){
    var tank = document.getElementsByClassName("tank" + id);
    while(tank.length>0){
	tank[0].remove();
    }
    console.log("tank" + id + " removed.");
}

//ONKEYDOWN METHOD
//Method to move a tank around the map
//Use the W, A, S, D keys to move
//Arrow Keys work too
//KEYCODES:
//W -> 87
//A -> 65
//S -> 83
//D -> 68
//Left -> 37
//Up -> 38
//Right -> 39
//Down -> 40
var moveTank = function(event){
    var key = event.keyCode || event.which
    console.log(key);
    if (key == 39 || key == 68){
	var tank = document.getElementsByClassName("tank" + turn);
	var currentX = parseInt(tank[3].getAttribute('x')) + 25;
	var currentY = parseInt(tank[3].getAttribute('y')) + 10;
	var color = tank[3].getAttribute('fill');
	removeTank(turn);
	drawTank(currentX + 2, currentY, 0, color, turn);
	console.log(key);
    }
    if (key == 37 || key == 65){
	var tank = document.getElementsByClassName("tank" + turn);
	var currentX = parseInt(tank[3].getAttribute('x')) + 25;
	var currentY = parseInt(tank[3].getAttribute('y')) + 10;
	var color = tank[3].getAttribute('fill');
	removeTank(turn);
	drawTank(currentX - 2, currentY, 180, color, turn);
	console.log(key);
    }
}


//$(window).on('keypress', checkSpace);
$(window).on('keydown', moveTank);
