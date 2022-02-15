export class Board {
    constructor() {
        this.position = [['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'], 
                         ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                         [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                         [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                         [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                         [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                         ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
                         ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']]

        this.next = 'w'
    }

    drawBoard(display) {
        var i = 0
        var j = 0

        for (var k = 0; k < display.childElementCount; k++) {
            j = k % 8
            this.drawPiece(display.children[k], this.position[i][j])
            if ((k % 8) == 7) i++
        }
    }

    drawPiece(element, piece) {
        element.innerText = ''
        if (piece == ' ') return
        var p
        if (piece == piece.toUpperCase()) p = `pieces/w${piece.toLowerCase()}.png`
        else p = `pieces/${piece}.png`
        var img = document.createElement('img')
        img.src = p
        img.classList.add('image')
        img.setAttribute('data-position', [element.getAttribute('data-position')[0], element.getAttribute('data-position')[2]])
        
        element.appendChild(img)   
    }

    move(p1, p2, display) {
        this.position[p2[0]][p2[1]] = this.position[p1[0]][p1[1]]
        this.position[p1[0]][p1[1]] = ' '
        this.drawBoard(display)

        if (this.next == 'w') this.next = 'b'
        else this.next = 'w'
    }

    color(piece) {
        if (piece == ' ') return 0
        if (piece == piece.toUpperCase()) return 1
        return 2
    }

    getSuccesors(v) {
        var result = []
        var i

        if (this.color(this.position[v[0]][v[1]]) == 1 && this.next == 'b') return []
        if (this.color(this.position[v[0]][v[1]]) == 2 && this.next == 'w') return []

        switch(this.position[v[0]][v[1]]) {
            case 'P':
                if (this.position[v[0]-1][v[1]] == ' ') {
                    result.push([[v[0]-1,v[1]], ' '])
                    if (v[0] == 6 && this.position[v[0]-2][v[1]] == ' ')
                        result.push([[v[0]-2,v[1]], ' '])
                }
                
                if (this.color(this.position[v[0]-1][v[1]-1]) == 2)
                    result.push([[v[0]-1,v[1]-1], this.position[v[0]-1][v[1]-1]])
                if (this.color(this.position[v[0]-1][v[1]+1]) == 2)
                    result.push([[v[0]-1,v[1]+1], this.position[v[0]-1][v[1]+1]])
                
                break
            

            case 'p':
                if (this.position[v[0]+1][v[1]] == ' ') {
                    result.push([[v[0]+1,v[1]], ' '])
                    if (v[0] == 1 && this.position[v[0]+2][v[1]] == ' ')
                        result.push([[v[0]+2,v[1]], ' '])
                }
                
                if (this.color(this.position[v[0]+1][v[1]+1]) == 1)
                    result.push([[v[0]+1,v[1]+1], this.position[v[0]+1][v[1]+1]])
                if (this.color(this.position[v[0]+1][v[1]-1]) == 1)
                    result.push([[v[0]+1,v[1]-1], this.position[v[0]+1][v[1]-1]])
                
                break

            case 'B':
                for (i = 1; i < Math.min((8-v[0]),(8-v[1])); i++) {
                    if (this.color(this.position[v[0]+i][v[1]+i]) == 1) break
                    result.push([[v[0]+i,v[1]+i], this.position[v[0]+i][v[1]+i]])
                    if (this.color(this.position[v[0]+i][v[1]+i]) == 2) break
                }
                
                for (i = 1; i < Math.min((v[0]+1),(8-v[1])); i++) {
                    if (this.color(this.position[v[0]-i][v[1]+i]) == 1) break
                    result.push([[v[0]-i,v[1]+i], this.position[v[0]-i][v[1]+i]])
                    if (this.color(this.position[v[0]-i][v[1]+i]) == 2) break
                }

                for (i = 1; i < Math.min((8-v[0]),(v[1]+1)); i++) {
                    if (this.color(this.position[v[0]+i][v[1]-i]) == 1) break
                    result.push([[v[0]+i,v[1]-i], this.position[v[0]+i][v[1]-i]])
                    if (this.color(this.position[v[0]+i][v[1]-i]) == 2) break
                }

                for (i = 1; i < Math.min((v[0]+1),(v[1]+1)); i++) {
                    if (this.color(this.position[v[0]-i][v[1]-i]) == 1) break
                    result.push([[v[0]-i,v[1]-i], this.position[v[0]-i][v[1]-i]])
                    if (this.color(this.position[v[0]-i][v[1]-i]) == 2) break
                }

                break

            case 'b':
                for (i = 1; i < Math.min((8-v[0]),(8-v[1])); i++) {
                    if (this.color(this.position[v[0]+i][v[1]+i]) == 2) break
                    result.push([[v[0]+i,v[1]+i], this.position[v[0]+i][v[1]+i]])
                    if (this.color(this.position[v[0]+i][v[1]+i]) == 1) break
                }
                
                for (i = 1; i < Math.min((v[0]+1),(8-v[1])); i++) {
                    if (this.color(this.position[v[0]-i][v[1]+i]) == 2) break
                    result.push([[v[0]-i,v[1]+i], this.position[v[0]-i][v[1]+i]])
                    if (this.color(this.position[v[0]-i][v[1]+i]) == 1) break
                }

                for (i = 1; i < Math.min((8-v[0]),(v[1]+1)); i++) {
                    if (this.color(this.position[v[0]+i][v[1]-i]) == 2) break
                    result.push([[v[0]+i,v[1]-i], this.position[v[0]+i][v[1]-i]])
                    if (this.color(this.position[v[0]+i][v[1]-i]) == 1) break
                }

                for (i = 1; i < Math.min((v[0]+1),(v[1]+1)); i++) {
                    if (this.color(this.position[v[0]-i][v[1]-i]) == 2) break
                    result.push([[v[0]-i,v[1]-i], this.position[v[0]-i][v[1]-i]])
                    if (this.color(this.position[v[0]-i][v[1]-i]) == 1) break
                }

                break

            case 'N':

                if (v[0]-1>= 0 && v[1]-2>=0) if (this.color(this.position[v[0]-1][v[1]-2]) != 1) result.push([[v[0]-1,v[1]-2], this.position[v[0]-1][v[1]-2]])
                if (v[0]-2>= 0 && v[1]-1>=0) if (this.color(this.position[v[0]-2][v[1]-1]) != 1) result.push([[v[0]-2,v[1]-1], this.position[v[0]-2][v[1]-1]])
                if (v[0]-2>= 0 && v[1]+1<=7) if (this.color(this.position[v[0]-2][v[1]+1]) != 1) result.push([[v[0]-2,v[1]+1], this.position[v[0]-2][v[1]+1]])
                if (v[0]-1>= 0 && v[1]+2<=7) if (this.color(this.position[v[0]-1][v[1]+2]) != 1) result.push([[v[0]-1,v[1]+2], this.position[v[0]-1][v[1]+2]])
                if (v[0]+1<= 7 && v[1]+2<=7) if (this.color(this.position[v[0]+1][v[1]+2]) != 1) result.push([[v[0]+1,v[1]+2], this.position[v[0]+1][v[1]+2]])
                if (v[0]+2<= 7 && v[1]+1<=7) if (this.color(this.position[v[0]+2][v[1]+1]) != 1) result.push([[v[0]+2,v[1]+1], this.position[v[0]+2][v[1]+1]])
                if (v[0]+2<= 7 && v[1]-1>=0) if (this.color(this.position[v[0]+2][v[1]-1]) != 1) result.push([[v[0]+2,v[1]-1], this.position[v[0]+2][v[1]-1]])
                if (v[0]+1<= 7 && v[1]-2>=0) if (this.color(this.position[v[0]+1][v[1]-2]) != 1) result.push([[v[0]+1,v[1]-2], this.position[v[0]+1][v[1]-2]])
                
                break

            case 'n':

                if (v[0]-1>= 0 && v[1]-2>=0) if (this.color(this.position[v[0]-1][v[1]-2]) != 2) result.push([[v[0]-1,v[1]-2], this.position[v[0]-1][v[1]-2]])
                if (v[0]-2>= 0 && v[1]-1>=0) if (this.color(this.position[v[0]-2][v[1]-1]) != 2) result.push([[v[0]-2,v[1]-1], this.position[v[0]-2][v[1]-1]])
                if (v[0]-2>= 0 && v[1]+1<=7) if (this.color(this.position[v[0]-2][v[1]+1]) != 2) result.push([[v[0]-2,v[1]+1], this.position[v[0]-2][v[1]+1]])
                if (v[0]-1>= 0 && v[1]+2<=7) if (this.color(this.position[v[0]-1][v[1]+2]) != 2) result.push([[v[0]-1,v[1]+2], this.position[v[0]-1][v[1]+2]])
                if (v[0]+1<= 7 && v[1]+2<=7) if (this.color(this.position[v[0]+1][v[1]+2]) != 2) result.push([[v[0]+1,v[1]+2], this.position[v[0]+1][v[1]+2]])
                if (v[0]+2<= 7 && v[1]+1<=7) if (this.color(this.position[v[0]+2][v[1]+1]) != 2) result.push([[v[0]+2,v[1]+1], this.position[v[0]+2][v[1]+1]])
                if (v[0]+2<= 7 && v[1]-1>=0) if (this.color(this.position[v[0]+2][v[1]-1]) != 2) result.push([[v[0]+2,v[1]-1], this.position[v[0]+2][v[1]-1]])
                if (v[0]+1<= 7 && v[1]-2>=0) if (this.color(this.position[v[0]+1][v[1]-2]) != 2) result.push([[v[0]+1,v[1]-2], this.position[v[0]+1][v[1]-2]])

                break


            case 'R':
                for (i = 1; i < 8-v[0]; i++) {
                    if (this.color(this.position[v[0]+i][v[1]]) == 1) break
                    result.push([[v[0]+i,v[1]], this.position[v[0]+i][v[1]]])
                    if (this.color(this.position[v[0]+i][v[1]]) == 2) break
                }
                
                for (i = 1; i <8-v[1]; i++) {
                    if (this.color(this.position[v[0]][v[1]+i]) == 1) break
                    result.push([[v[0],v[1]+i], this.position[v[0]][v[1]+i]])
                    if (this.color(this.position[v[0]][v[1]+i]) == 2) break
                }

                for (i = 1; i < v[1]+1; i++) {
                    if (this.color(this.position[v[0]][v[1]-i]) == 1) break
                    result.push([[v[0],v[1]-i], this.position[v[0]][v[1]-i]])
                    if (this.color(this.position[v[0]][v[1]-i]) == 2) break
                }

                for (i = 1; i < v[0]+1; i++) {
                    if (this.color(this.position[v[0]-i][v[1]]) == 1) break
                    result.push([[v[0]-i,v[1]], this.position[v[0]-i][v[1]]])
                    if (this.color(this.position[v[0]-i][v[1]]) == 2) break
                }

                break

            case 'r':
                for (i = 1; i < 8-v[0]; i++) {
                    if (this.color(this.position[v[0]+i][v[1]]) == 2) break
                    result.push([[v[0]+i,v[1]], this.position[v[0]+i][v[1]]])
                    if (this.color(this.position[v[0]+i][v[1]]) == 1) break
                }
                
                for (i = 1; i <8-v[1]; i++) {
                    if (this.color(this.position[v[0]][v[1]+i]) == 2) break
                    result.push([[v[0],v[1]+i], this.position[v[0]][v[1]+i]])
                    if (this.color(this.position[v[0]][v[1]+i]) == 1) break
                }

                for (i = 1; i < v[1]+1; i++) {
                    if (this.color(this.position[v[0]][v[1]-i]) == 2) break
                    result.push([[v[0],v[1]-i], this.position[v[0]][v[1]-i]])
                    if (this.color(this.position[v[0]][v[1]-i]) == 1) break
                }

                for (i = 1; i < v[0]+1; i++) {
                    if (this.color(this.position[v[0]-i][v[1]]) == 2) break
                    result.push([[v[0]-i,v[1]], this.position[v[0]-i][v[1]]])
                    if (this.color(this.position[v[0]-i][v[1]]) == 1) break
                }

                break

            case 'Q':
                for (i = 1; i < 8-v[0]; i++) {
                    if (this.color(this.position[v[0]+i][v[1]]) == 1) break
                    result.push([[v[0]+i,v[1]], this.position[v[0]+i][v[1]]])
                    if (this.color(this.position[v[0]+i][v[1]]) == 2) break
                }
                
                for (i = 1; i <8-v[1]; i++) {
                    if (this.color(this.position[v[0]][v[1]+i]) == 1) break
                    result.push([[v[0],v[1]+i], this.position[v[0]][v[1]+i]])
                    if (this.color(this.position[v[0]][v[1]+i]) == 2) break
                }

                for (i = 1; i < v[1]+1; i++) {
                    if (this.color(this.position[v[0]][v[1]-i]) == 1) break
                    result.push([[v[0],v[1]-i], this.position[v[0]][v[1]-i]])
                    if (this.color(this.position[v[0]][v[1]-i]) == 2) break
                }

                for (i = 1; i < v[0]+1; i++) {
                    if (this.color(this.position[v[0]-i][v[1]]) == 1) break
                    result.push([[v[0]-i,v[1]], this.position[v[0]-i][v[1]]])
                    if (this.color(this.position[v[0]-i][v[1]]) == 2) break
                }

                for (i = 1; i < Math.min((8-v[0]),(8-v[1])); i++) {
                    if (this.color(this.position[v[0]+i][v[1]+i]) == 1) break
                    result.push([[v[0]+i,v[1]+i], this.position[v[0]+i][v[1]+i]])
                    if (this.color(this.position[v[0]+i][v[1]+i]) == 2) break
                }
                
                for (i = 1; i < Math.min((v[0]+1),(8-v[1])); i++) {
                    if (this.color(this.position[v[0]-i][v[1]+i]) == 1) break
                    result.push([[v[0]-i,v[1]+i], this.position[v[0]-i][v[1]+i]])
                    if (this.color(this.position[v[0]-i][v[1]+i]) == 2) break
                }

                for (i = 1; i < Math.min((8-v[0]),(v[1]+1)); i++) {
                    if (this.color(this.position[v[0]+i][v[1]-i]) == 1) break
                    result.push([[v[0]+i,v[1]-i], this.position[v[0]+i][v[1]-i]])
                    if (this.color(this.position[v[0]+i][v[1]-i]) == 2) break
                }

                for (i = 1; i < Math.min((v[0]+1),(v[1]+1)); i++) {
                    if (this.color(this.position[v[0]-i][v[1]-i]) == 1) break
                    result.push([[v[0]-i,v[1]-i], this.position[v[0]-i][v[1]-i]])
                    if (this.color(this.position[v[0]-i][v[1]-i]) == 2) break
                }

                break

            case 'q':
                for (i = 1; i < 8-v[0]; i++) {
                    if (this.color(this.position[v[0]+i][v[1]]) == 2) break
                    result.push([[v[0]+i,v[1]], this.position[v[0]+i][v[1]]])
                    if (this.color(this.position[v[0]+i][v[1]]) == 1) break
                }
                
                for (i = 1; i <8-v[1]; i++) {
                    if (this.color(this.position[v[0]][v[1]+i]) == 2) break
                    result.push([[v[0],v[1]+i], this.position[v[0]][v[1]+i]])
                    if (this.color(this.position[v[0]][v[1]+i]) == 1) break
                }

                for (i = 1; i < v[1]+1; i++) {
                    if (this.color(this.position[v[0]][v[1]-i]) == 2) break
                    result.push([[v[0],v[1]-i], this.position[v[0]][v[1]-i]])
                    if (this.color(this.position[v[0]][v[1]-i]) == 1) break
                }

                for (i = 1; i < v[0]+1; i++) {
                    if (this.color(this.position[v[0]-i][v[1]]) == 2) break
                    result.push([[v[0]-i,v[1]], this.position[v[0]-i][v[1]]])
                    if (this.color(this.position[v[0]-i][v[1]]) == 1) break
                }

                for (i = 1; i < Math.min((8-v[0]),(8-v[1])); i++) {
                    if (this.color(this.position[v[0]+i][v[1]+i]) == 2) break
                    result.push([[v[0]+i,v[1]+i], this.position[v[0]+i][v[1]+i]])
                    if (this.color(this.position[v[0]+i][v[1]+i]) == 1) break
                }
                
                for (i = 1; i < Math.min((v[0]+1),(8-v[1])); i++) {
                    if (this.color(this.position[v[0]-i][v[1]+i]) == 2) break
                    result.push([[v[0]-i,v[1]+i], this.position[v[0]-i][v[1]+i]])
                    if (this.color(this.position[v[0]-i][v[1]+i]) == 1) break
                }

                for (i = 1; i < Math.min((8-v[0]),(v[1]+1)); i++) {
                    if (this.color(this.position[v[0]+i][v[1]-i]) == 2) break
                    result.push([[v[0]+i,v[1]-i], this.position[v[0]+i][v[1]-i]])
                    if (this.color(this.position[v[0]+i][v[1]-i]) == 1) break
                }

                for (i = 1; i < Math.min((v[0]+1),(v[1]+1)); i++) {
                    if (this.color(this.position[v[0]-i][v[1]-i]) == 2) break
                    result.push([[v[0]-i,v[1]-i], this.position[v[0]-i][v[1]-i]])
                    if (this.color(this.position[v[0]-i][v[1]-i]) == 1) break
                }

                break

            case 'K':
                if (v[0]-1>= 0) if (this.color(this.position[v[0]-1][v[1]]) != 1) result.push([[v[0]-1,v[1]], this.position[v[0]-1][v[1]]])
                if (v[0]+1<= 7) if (this.color(this.position[v[0]+1][v[1]]) != 1) result.push([[v[0]+1,v[1]], this.position[v[0]+1][v[1]]])
                if (v[1]-1>= 0) if (this.color(this.position[v[0]][v[1]-1]) != 1) result.push([[v[0],v[1]-1], this.position[v[0]][v[1]-1]])
                if (v[1]+1<= 7) if (this.color(this.position[v[0]][v[1]+1]) != 1) result.push([[v[0],v[1]+1], this.position[v[0]][v[1]+1]])
                if (v[0]-1>= 0 && v[1]+1<=7) if (this.color(this.position[v[0]-1][v[1]+1]) != 1) result.push([[v[0]-1,v[1]+1], this.position[v[0]-1][v[1]+1]])
                if (v[0]+1<= 7 && v[1]-1>=0) if (this.color(this.position[v[0]+1][v[1]-1]) != 1) result.push([[v[0]+1,v[1]-1], this.position[v[0]+1][v[1]-1]])
                if (v[0]+1<= 7 && v[1]+1<=7) if (this.color(this.position[v[0]+1][v[1]+1]) != 1) result.push([[v[0]+1,v[1]+1], this.position[v[0]+1][v[1]+1]])
                if (v[0]-1>= 0 && v[1]-1>=0) if (this.color(this.position[v[0]-1][v[1]-1]) != 1) result.push([[v[0]-1,v[1]-1], this.position[v[0]-1][v[1]-1]])

                break

            case 'k':

                if (v[0]-1>= 0) if (this.color(this.position[v[0]-1][v[1]]) != 2) result.push([[v[0]-1,v[1]], this.position[v[0]-1][v[1]]])
                if (v[0]+1<= 7) if (this.color(this.position[v[0]+1][v[1]]) != 2) result.push([[v[0]+1,v[1]], this.position[v[0]+1][v[1]]])
                if (v[1]-1>= 0) if (this.color(this.position[v[0]][v[1]-1]) != 2) result.push([[v[0],v[1]-1], this.position[v[0]][v[1]-1]])
                if (v[1]+1<= 7) if (this.color(this.position[v[0]][v[1]+1]) != 2) result.push([[v[0],v[1]+1], this.position[v[0]][v[1]+1]])
                if (v[0]-1>= 0 && v[1]+1<=7) if (this.color(this.position[v[0]-1][v[1]+1]) != 2) result.push([[v[0]-1,v[1]+1], this.position[v[0]-1][v[1]+1]])
                if (v[0]+1<= 7 && v[1]-1>=0) if (this.color(this.position[v[0]+1][v[1]-1]) != 2) result.push([[v[0]+1,v[1]-1], this.position[v[0]+1][v[1]-1]])
                if (v[0]+1<= 7 && v[1]+1<=7) if (this.color(this.position[v[0]+1][v[1]+1]) != 2) result.push([[v[0]+1,v[1]+1], this.position[v[0]+1][v[1]+1]])
                if (v[0]-1>= 0 && v[1]-1>=0) if (this.color(this.position[v[0]-1][v[1]-1]) != 2) result.push([[v[0]-1,v[1]-1], this.position[v[0]-1][v[1]-1]])

            }

        return result
        }
}



export function drawInitial(display) {
    

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var casilla = document.createElement('div')
            if (((i % 2) && (j % 2)) || (!(i % 2) && !(j % 2))) {
                casilla.classList.add('square', 'white')
            } else {
                casilla.classList.add('square', 'black')
            }


            casilla.setAttribute('data-position', [i, j])
            display.appendChild(casilla)
        }
    }
}