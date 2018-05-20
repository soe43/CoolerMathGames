var svg = document.getElementById("svg");
var ns = "http://www.w3.org/2000/svg";

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
    var circ1 = document.createElementNS(ns, "circle");
    circ1.setAttribute("cx", cx + 10);
    circ1.setAttribute("cy", cy + 15);
    circ1.setAttribute("r", 10);
    circ1.setAttribute("class", "tank" + id);
    svg.appendChild(circ1);
    var circ2 = document.createElementNS(ns, "circle");
    circ2.setAttribute("cx", cx + 40);
    circ2.setAttribute("cy", cy + 15);
    circ2.setAttribute("r", 10);
    circ2.setAttribute("class", "tank" + id);
    svg.appendChild(circ2);
}
