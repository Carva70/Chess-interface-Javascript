import { drawInitial, Board } from "./chess.js";

var display = document.querySelector('.board')
drawInitial(display)
var board = new Board()
board.drawBoard(display)

var drag, drop

var limit = 3
var auxlimit = 2
let quiesenceLimit = 1
let nodosVisitados = 0

document.addEventListener("dragstart", function(event) {
    nodosVisitados = 0
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

    for (var i in succ.reverse()) {
        if (succ[i][0][0] == drop[0] && succ[i][0][1] == drop[1]) {
            board.move(drag, drop, display, succ[i][2], succ[i][1])
        }
    }

    if (board.next == 'b') {
        var mov = mejormoviviento(board, limit)
        console.log(`Nodos visitados: ${nodosVisitados}`)
        if (mov != null)
            board.move(mov[0], mov[1], display, mov[2])
        console.log(`Predicción: ${minimax(board, 0, -9999, 9999, limit)}`)
        console.log(`Heuristica: ${heuristic(board)}`)
        console.log('-------------------')
    }

}, false);

function mejormoviviento(board, limit) {
    //console.log(minimax(board, 0, -9999, 9999, limit))
    var copy
    var succ = board.getAllSuccesors()
    var bestmove
    var alpha
    var min
    var i
    if (board.next == 'b') {
        min = 9999
        for (var i in succ) {
            copy = new Board(0, board)
            copy.move(succ[i][0], succ[i][1], null, succ[i][2])
            alpha = minimax(copy, 0, -99999, 99999, limit)
            
            if (min >= alpha) {
                bestmove = succ[i]
                min = alpha
            }
        }
    } else {
        min = -9999
        for (var i in succ) {
            copy = new Board(0, board)
            copy.move(succ[i][0], succ[i][1], null, succ[i][2])
            alpha = minimax(copy, 0, -99999, 99999, limit)
            
            if (min < alpha) {
                bestmove = succ[i]
                min = alpha
            }
        }
    }
    return bestmove
}


function minimax(board, depth, alpha, beta, limit) {
    var succ
    if (limit > auxlimit) succ = board.getAllAuxSuccesors()
    else succ = board.getAllSuccesors() 
    nodosVisitados += 1

    var i
    if (succ.length == 0) {
        if (board.next == 'w') return -9999
        if (board.next == 'b') return 9999
    }
    
    //if (depth == limit) return quiesence(alpha, beta, board, 0)
    if (depth == limit) return heuristic(board)
    var copy = null
    if (board.next == 'w') {
        for (i in succ) {
            copy = new Board(0, board)
            copy.move(succ[i][0], succ[i][1], null, succ[i][2])
            alpha = Math.max(alpha, minimax(copy, depth + 1, alpha, beta, limit))
            if (beta <= alpha) break
        }
        return alpha
    } else {
        for (i in succ) {
            copy = new Board(0, board)
            copy.move(succ[i][0], succ[i][1], null, succ[i][2])
            beta = Math.min(beta, minimax(copy, depth + 1, alpha, beta, limit))
            if (beta <= alpha) break
        }
        return beta
    }
}

function quiesence(alpha, beta, board, depth) {
    
    nodosVisitados += 1
    var evaln = heuristic(board)
    if (evaln >= beta)
        return beta
    if (alpha < evaln)
        alpha = evaln
    var succ = board.getAllCaptures()
    var copy
    var score

    if (depth == quiesenceLimit) return alpha

    for (var i in succ) {
        copy = new Board(0, board)
        copy.move(succ[i][0], succ[i][1], null, succ[i][2])
        score = -quiesence(-beta, -alpha, board, depth + 1)

        if (score >= beta)
            return beta
        if (score > alpha)
            alpha = score
    }
    return alpha
}

function heuristic(board) {
    var cont = 0
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            switch (board.position[i][j]) {
                case 'P':
                    cont += 10
                    break
                case 'p':
                    cont -= 10
                    break
                case 'N':
                    cont += 30
                    break
                case 'n':
                    cont -= 30
                    break
                case 'B':
                    cont += 30
                    break
                case 'b':
                    cont -= 30
                    break
                case 'R':
                    cont += 50
                    break
                case 'r':
                    cont -= 50
                    break
                case 'Q':
                    cont += 90
                    break
                case 'q':
                    cont -= 90
                    break
                case 'K':
                    cont += 900
                    break
                case 'k':
                    cont -= 900
                    break
            }
        }
    }
    return cont
}