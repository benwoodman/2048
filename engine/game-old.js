/*
Add your code for Game here
 */
export default class Game {

    constructor(size) {
        this.size = size;
        this.setupNewGame();

    }

    setupNewGame() {
        this.board = [];
        this.score = 0;
        this.won = false;
        this.over = false;

        for (let i = 0; i < this.size ** 2; i++) {
            this.board.push(0);
        }

        // const rand_tile1 = Math.floor(Math.random() * (size**2 + 1));
        // const rand_tile2 = Math.floor(Math.random() * (size**2 + 1));
        this.newTile(this.board);
        this.newTile(this.board);
    }

    loadGame(game) {
        this.board = game.board;
        this.score = game.score;
        this.won = game.won;
        this.over = game.over;
    }

    getGameState() {
        return {board: this.board, score: this.score, won: this.won, over: this.over};
    }

    newTile() {
        const seed = Math.random();
        //  remove -1
        let rand_tile = Math.floor(Math.random() * (this.size ** 2));
        while (this.board[rand_tile] > 0) {
            rand_tile = Math.floor(Math.random() * (this.size ** 2));
        }
        if (seed < .9) {
            this.board[rand_tile] = 2;
        } else{
            this.board[rand_tile] = 4;
        }
        
    }

    toString() {
        let row = '';
        for (let i = 0; i < this.board.length; i += this.size) {
            // let row = '';
            for (let j = 0; j < this.size; j++) {
                const tile = String(this.board[i + j]);
                if (tile === '0') {
                    // process.stdout.write('[   ]');
                    row += '[   ]';
                } else if (tile.length === 1) {
                    // process.stdout.write('[ ' + tile + ' ]');
                    row += '[ ' + tile + ' ]';
                } else if (tile.length === 2) {
                    // process.stdout.write('[ ' + tile + ']');
                    row += '[ ' + tile + ']';
                } else {
                    // process.stdout.write('[' + tile + ' ]');
                    row += '[' + tile + ']';
                }
            }
            row += '\n';
            // console.log();
        }
        return row;
    }

    onMove(callback) {
        this.onMoveCallback = callback;
    }

    onLose(callback) {
        this.onLoseCallback = callback;
    }

    onWin(callback) {
        this.onWinCallback = callback;
    }

    combineArray(arr) {
        let new_arr = [];
        // let furthest_left = 0;
        // console.log(arr);
        // let total_sum = 0;
        for (let i = 0; i < arr.length; i++) {
            if (new_arr.length === 0 && arr[i] !== 0) {
                new_arr.push(arr[i]);
            } else if (arr[i] === 0) {
                continue;
            } else if (new_arr[new_arr.length - 1] === arr[i]) {
                new_arr[new_arr.length - 1] += arr[i];
                this.score += new_arr[new_arr.length - 1];
                new_arr.push(0);
            } else if (new_arr[new_arr.length - 1] === 0) {
                new_arr[new_arr.length - 1] = arr[i];
            } else {
                new_arr.push(arr[i]);
            }
        }
        for (let i = new_arr.length; i < this.size; i++) {
            new_arr.push(0);
        }
        if (!new_arr.every((x, i) => x === arr[i])) {
            return new_arr;
        } else {
            return [];
        }
        // console.log('new', new_arr);
        // return new_arr;
        // return new_arr;
    }

    move(direction) {

        let add_tile = false;
        //FIX BY MAKING THE RETURN AN ARRAY AND CHANGING TO 0 AND 1
        switch(direction) {
            case 'left':
                for (let r = 0; r < this.board.length; r += this.size) {
                    const arr = this.board.slice(r, r + this.size);
                    const new_arr = this.combineArray(arr);
                    if (new_arr.length > 0) {
                         add_tile = true;
                        this.board.splice(r, new_arr.length, ...new_arr);
                    }
                    // this.board.splice(r, new_arr.length, ...new_arr);
                }
                break;

            case 'right':
                for (let r = 0; r < this.board.length; r += this.size) {
                    const arr = this.board.slice(r, r + this.size);
                    const new_arr = this.combineArray(arr.reverse()).reverse();
                    if (new_arr.length > 0) {
                        add_tile = true;
                        this.board.splice(r, new_arr.length, ...new_arr);
                    }
                    // this.board.splice(r, new_arr.length, ...new_arr);
                }
                break;

            case 'up':
                for (let c = 0; c < this.size; c++) {
                    let arr = [];
                    for (let r = 0; r < this.board.length; r += this.size) {
                        arr.push(this.board[c + r]);
                    }
                    const new_arr = this.combineArray(arr);
                    if (new_arr.length > 0) {
                        add_tile = true;
                        for (let r = 0; r < this.board.length; r += this.size) {
                            this.board[c + r] = new_arr[r / this.size];
                        }
                    }
                    // console.log(new_arr);
                    // for (let r = 0; r < this.board.length; r += this.size) {
                    //     this.board[c + r] = new_arr[r / this.size];
                    // }
                }
                break;

            case 'down':
                for (let c = 0; c < this.size; c++) {
                    let arr = [];
                    for (let r = 0; r < this.board.length; r += this.size) {
                        arr.push(this.board[c + r]);
                    }
                    const new_arr = this.combineArray(arr.reverse()).reverse();
                    if (new_arr.length > 0) {
                        add_tile = true;
                        for (let r = 0; r < this.board.length; r += this.size) {
                            this.board[c + r] = new_arr[r / this.size];
                        }
                    }
                    
                    // for (let r = 0; r < this.board.length; r += this.size) {
                    //     this.board[c + r] = new_arr[r / this.size];
                    // }
                }
                break;
        }
        if (add_tile) {
            this.newTile();
        }
        if (this.onMoveCallback !== undefined) {
            this.onMoveCallback(this.getGameState());
        }
        // console.log(this.verifyBoard());
        this.verifyBoard();
    }

    verifyBoard() {
        if (this.board.find(x => x === 2048) !== undefined) {
            this.won = true;
            this.over = true;
            // if (this.onWinCallback !== undefined) {
                this.onWinCallback(this.getGameState());
            // }
            return;
        }
        console.log(this.board.find(x => x === 0));
        if (this.board.find(x => x === 0) === undefined) {
            console.log('HELLO');
            let keep_playing = false;
            for (let i = 0; i < this.board.length; i++) {
                let check_arr;
                if (i % this.size === 0) {
                    check_arr = [1, this.size, -(this.size)];
                } else if (i % this.size === this.size - 1) {
                    check_arr = [-1, this.size, -(this.size)];
                } else {
                    check_arr = [1, -1, this.size, -(this.size)];
                }

                check_arr.forEach(x => {
                    try {
                        if (this.board[i+x] === this.board[i]) {
                            console.log(this.board[i+x], this.board[i]);
                            console.log(i, i+x);
                            keep_playing = true;
                        }
                    } catch (err) {
                    }
                });

                // if (i % this.size === 0) {
                //     const check_arr = [1, this.size, -(this.size)];
                //     check_arr.forEach(x => {
                //         try {
                //             if (this.board[i+x] === this.board[i]) {
                //                 keep_playing = true;
                //             }
                //         } catch (err) {
                //         }
                //     });
                // } else if (i % this.size - 1 === 0) {
                //     for (let r in [-1, this.size, -(this.size)]) {
                //         // console.log(r);
                //         try {
                //             if (this.board[i+r] === this.board[i]) {
                //                 console.log('tiles:', i+r, ', ', i);
                //                 keep_playing = true;
                //             }
                //         } catch (err) {
                //             // console.log(err);
                //         }
                //     }
                    
                // } else {
                //     for (let r in [1, -1, this.size, -(this.size)]) {
                //         // console.log(r);
                //         try {
                //             if (this.board[i+r] === this.board[i]) {
                //                 console.log('tiles:', i+r, ', ', i);
                //                 keep_playing = true;
                //             }
                //         } catch (err) {
                //             // console.log(err);
                //         }
                //     }
                // }  
            }
            this.over = !keep_playing;
            if (this.over) {
                this.onLoseCallback(this.getGameState());
            }
            // return keep_playing;
            // console.log('test');
            // this.over = true;
            // if (this.onLoseCallback !== undefined) {
            //     this.onLoseCallback();
            // }
        }
    }

}