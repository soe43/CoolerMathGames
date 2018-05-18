var svg = document.getElementById("svg");
var ns = "http://www.w3.org/2000/svg";

var drawTank = function(id, x, y, orientation){
    var rect = document.createElementNS(ns, "rect");
    rect.setAttribute("x", x - 25);
    rect.setAttribute("y", y - 10);
    rect.setAttribute("width", 50);
    rect.setAttribute("height", 20);
    rect.setAttribute("rx", 5);
    rect.setAttribute("ry", 5);
    rect.setAttribute("orientation", orientation);
    svg.appendChild(rect);
}
