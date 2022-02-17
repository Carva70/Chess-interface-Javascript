export class Board {
    constructor(isAux = 0) {
        this.position = [['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'], 
                         ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                         [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                         [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                         [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                         [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                         ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
                         ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']]

        this.next = 'w'
        this.isAux = isAux
        this.castleWS = 1
        this.castleWL = 1
        this.castleBS = 1
        this.castleBL = 1
        this.enPessant = []
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

    move(p1, p2, display, enPessant) {
        this.position[p2[0]][p2[1]] = this.position[p1[0]][p1[1]]
        this.position[p1[0]][p1[1]] = ' '

        if (this.enPessant.length != 0) if (this.enPessant[1] == this.next) this.enPessant = []
        if (enPessant == 1) this.enPessant = [p2, this.next]
        if (enPessant == 2) {
            if (this.next == 'w')
                this.position[p2[0]+1][p2[1]] = ' '
            else
                this.position[p2[0]-1][p2[1]] = ' '
        }

        if (this.position[p2[0]][p2[1]] == 'K' && (p2[1] - p1[1]) == 2) {
            this.position[7][5] = this.position[7][7]
            this.position[7][7] = ' '
            this.castleWS = 0
        }

        if (this.position[p2[0]][p2[1]] == 'K' && (p1[1] - p2[1]) == 2) {
            this.position[7][3] = this.position[7][0]
            this.position[7][0] = ' '
            this.castleWL = 0
        }

        if (this.position[p2[0]][p2[1]] == 'k' && (p2[1] - p1[1]) == 2) {
            this.position[0][5] = this.position[0][7]
            this.position[0][7] = ' '
            this.castleBS = 0
        }

        if (this.position[p2[0]][p2[1]] == 'k' && (p1[1] - p2[1]) == 2) {
            this.position[0][3] = this.position[0][0]
            this.position[0][0] = ' '
            this.castleBL = 0
        }

        this.drawBoard(display)

        if (this.next == 'w') this.next = 'b'
        else this.next = 'w'
    }

    moveAux(p1, p2, enPessant) {

        this.position[p2[0]][p2[1]] = this.position[p1[0]][p1[1]]
        this.position[p1[0]][p1[1]] = ' '

        if (this.enPessant.length != 0) if (this.enPessant[1] == this.next) this.enPessant = []
        if (enPessant == 1) this.enPessant = [p2, (this.color(this.position[p2[0]][p2[1]]) == 1 ? 'w':'b' )]
        if (enPessant == 2) {
            if (this.next == 'w')
                this.position[p2[0]+1][p2[1]] = ' '
            else
                this.position[p2[0]-1][p2[1]] = ' '
        }

        if (this.position[p2[0]][p2[1]] == 'K' && (p2[1] - p1[1]) == 2) {
            this.position[7][5] = this.position[7][7]
            this.position[7][7] = ' '
            this.castleWS = 0
        }

        if (this.position[p2[0]][p2[1]] == 'K' && (p1[1] - p2[1]) == 2) {
            this.position[7][3] = this.position[7][0]
            this.position[7][0] = ' '
            this.castleWL = 0
        }

        if (this.position[p2[0]][p2[1]] == 'k' && (p2[1] - p1[1]) == 2) {
            this.position[0][5] = this.position[0][7]
            this.position[0][7] = ' '
            this.castleBS = 0
        }

        if (this.position[p2[0]][p2[1]] == 'k' && (p1[1] - p2[1]) == 2) {
            this.position[0][3] = this.position[0][0]
            this.position[0][0] = ' '
            this.castleBL = 0
        }

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
        var c = this.color(this.position[v[0]][v[1]])
        if (c == 1 && this.next == 'b') return []
        if (c == 2 && this.next == 'w') return []

        switch(this.position[v[0]][v[1]]) {
            case 'P':
                if (this.position[v[0]-1][v[1]] == ' ') {
                    result.push([[v[0]-1,v[1]], ' '])
                    if (v[0] == 6 && this.position[v[0]-2][v[1]] == ' ') {
                        if (this.position[v[0]-2][v[1]+1] == 'p' || this.position[v[0]-2][v[1]-1] == 'p')
                            result.push([[v[0]-2,v[1]], ' ', 1])
                        else
                            result.push([[v[0]-2,v[1]], ' '])
                    }
                }
                if (v[0]-1>=0 && v[1]-1>=0)
                    if (this.color(this.position[v[0]-1][v[1]-1]) == 2)
                        result.push([[v[0]-1,v[1]-1], this.position[v[0]-1][v[1]-1]])
                if (v[0]-1>=0 && v[1]+1<=7)
                    if (this.color(this.position[v[0]-1][v[1]+1]) == 2)
                        result.push([[v[0]-1,v[1]+1], this.position[v[0]-1][v[1]+1]])
                if (this.enPessant.length != 0) {
                    if (v[0]-1>=0 && v[1]-1>=0)
                        if (this.position[v[0]][v[1]-1] == 'p')
                            result.push([[v[0]-1,v[1]-1], this.position[v[0]][v[1]-1], 2])
                    if (v[0]-1>=0 && v[1]+1<=7)
                        if (this.position[v[0]][v[1]+1] == 'p')
                            result.push([[v[0]-1,v[1]+1], this.position[v[0]][v[1]+1], 2])
                }
                
                
                break
            

            case 'p':
                if (this.position[v[0]+1][v[1]] == ' ') {
                    result.push([[v[0]+1,v[1]], ' '])
                    if (v[0] == 1 && this.position[v[0]+2][v[1]] == ' ') {
                        if (this.position[v[0]+2][v[1]+1] == 'P' || this.position[v[0]+2][v[1]-1] == 'P')
                            result.push([[v[0]+2,v[1]], ' ', 1])
                        else
                            result.push([[v[0]+2,v[1]], ' '])
                    }
                }
                
                if (v[0]+1<=7 && v[1]+1<=7)
                    if (this.color(this.position[v[0]+1][v[1]+1]) == 1)
                        result.push([[v[0]+1,v[1]+1], this.position[v[0]+1][v[1]+1]])
                if (v[0]+1<=7 && v[1]-1>=0)
                    if (this.color(this.position[v[0]+1][v[1]-1]) == 1)
                        result.push([[v[0]+1,v[1]-1], this.position[v[0]+1][v[1]-1]])
                if (this.enPessant.length != 0) {
                    if (v[0]+1>=0 && v[1]-1>=0)
                        if (this.position[v[0]][v[1]-1] == 'P')
                            result.push([[v[0]+1,v[1]-1], this.position[v[0]][v[1]-1], 2])
                    if (v[0]+1>=0 && v[1]+1<=7)
                        if (this.position[v[0]][v[1]+1] == 'P')
                            result.push([[v[0]+1,v[1]+1], this.position[v[0]][v[1]+1], 2])
                }
                
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

                if (v[0] == 7 && v[1] == 4 && this.position[7][5] == ' ' && this.position[7][6] == ' ' && this.position[7][7] == 'R' && this.castleWS == 1)
                    result.push([[7,6], ' '])
                
                if (v[0] == 7 && v[1] == 4 && this.position[7][3] == ' ' && this.position[7][2] == ' ' && this.position[7][1] == ' ' && this.position[7][0] == 'R' && this.castleWL == 1)
                    result.push([[7,2], ' '])
                

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

                if (v[0] == 0 && v[1] == 4 && this.position[0][5] == ' ' && this.position[0][6] == ' ' && this.position[0][7] == 'r' && this.castleBS == 1) 
                    result.push([[0,6], ' '])

                if (v[0] == 0 && v[1] == 4 && this.position[0][3] == ' ' && this.position[0][2] == ' ' && this.position[0][1] == ' ' && this.position[0][0] == 'r' && this.castleBL == 1)
                    result.push([[0,2], ' '])


            }
        var final = []
        var auxBoard = new Board(1)
        var flag
        
        if (this.isAux == 0) {
            for (var ind in result) {

                if (result[ind].length == 2)
                    result[ind].push(0)
                
                for (var indk in this.position)
                    auxBoard.position[indk] = this.position[indk].slice()

                auxBoard.moveAux(v, result[ind][0], result[ind][2])
                if (this.next == 'w') auxBoard.next = 'b'
                else auxBoard.next = 'w'
                auxBoard.enPessant = this.enPessant.slice()
                auxBoard.castleBL = this.castleBL
                auxBoard.castleBS = this.castleBS
                auxBoard.castleWL = this.castleWL
                auxBoard.castleWS = this.castleWS

                flag = 0
                for (var i = 0; i < 8; i++) {
                    for (var j = 0; j < 8; j++) {
                        var c = this.color(auxBoard.position[i][j])
                        
                        if (((c == 1) && (auxBoard.next == 'w')) || ((c == 2) && (auxBoard.next == 'b'))) {
                            var checkSucc = auxBoard.getSuccesors([i, j])
                            for (var l in checkSucc) {
                                
                                if ((c == 1 && checkSucc[l][1] == 'k') || (c == 2 && checkSucc[l][1] == 'K')){
                                    flag = 1
                                }
                                
                            }
                        }
                        
                    }
                }
                if (flag == 0)
                    final.push(result[ind])
            }
            return final
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