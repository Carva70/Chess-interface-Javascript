import { drawInitial, Board } from "./chess.js";

var display = document.querySelector('.board')
drawInitial(display)
var board = new Board()
board.drawBoard(display)

var drag, drop

document.addEventListener("dragstart", function(event) {
    
    var aux
    aux = event.target.getAttribute('data-position')
    drag = [parseInt(aux[0]), parseInt(aux[2])]
    
}, false);

document.addEventListener("dragover", function(event) {

    var aux
    aux = event.target.getAttribute('data-position')
    drop = [parseInt(aux[0]), parseInt(aux[2])]
    event.preventDefault()

}, false);

document.addEventListener("dragend", function(event) {

    var succ = board.getSuccesors(drag)
    //console.log(succ)

    for (var i in succ) {
        if (succ[i][0][0] == drop[0] && succ[i][0][1] == drop[1]) {
            board.move(drag, drop, display, succ[i][2])
        }
    }

    

}, false);