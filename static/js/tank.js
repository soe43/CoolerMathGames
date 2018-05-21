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

var drawTank = function(id, x, y, orientation){
    var rect = document.createElementNS(ns, "rect");
    var cx = x-25;
    var cy = y-10;
    rect.setAttribute("x", cx);
    rect.setAttribute("y", cy);
    rect.setAttribute("width", 50);
    rect.setAttribute("height", 20);
    rect.setAttribute("rx", 5);
    rect.setAttribute("ry", 5);
    rect.setAttribute("orientation", orientation);
    rect.setAttribute("class", "tank" + id);
    svg.appendChild(rect);
    createCircle(cx + 10, cy + 15, 10, id);
    createCircle(cx + 40, cy + 15, 10, id);
    var cockpit = document.createElementNS(ns, "rect");
    cockpit.setAttribute("x", cx + 10);
    cockpit.setAttribute("y", cy - 10);
    cockpit.setAttribute("width", 25);
    cockpit.setAttribute("height", 10);
    cockpit.setAttribute("class", "tank" + id);
    svg.appendChild(cockpit);
    var barrel = document.createElementNS(ns, "rect");
    barrel.setAttribute('x', cx + 20);
    barrel.setAttribute("y", cy - 15);
    barrel.setAttribute("width", 25);
    barrel.setAttribute("height", 2);
    barrel.setAttribute("class", "tank" + id);
    svg.appendChild(barrel);
}
