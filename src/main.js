import Game from './engine/game.js'
import { Board, Score, GameAlert } from './board.js'

const size = 4;
let game = new Game(size);

const loaded_game = {
    board: [4, 0, 0, 4,
        1024, 1024, 0, 8,
        2, 16, 4, 2,
        16, 2, 2, 2],
    won: false,
    over: false,
    score: 1000,
}

// game.loadGame(loaded_game);
document.getElementById('reset-button').addEventListener('click', () => {
    game.setupNewGame();
    renderBoard();
});
// console.log(game.toString());

const renderBoard = function () {
    ReactDOM.render(<Board size={size} game={game}></Board>, document.getElementById('main'));
    ReactDOM.render(<Score game={game}></Score>, document.getElementById('score'));
}


game.onMove(gameState => {
    renderBoard();
});

// game.onMove(() => console.log('test'));

game.onWin(gameState => {
    ReactDOM.render(<GameAlert alert="You won!"></GameAlert>, document.getElementById('alert-box'));
    // console.log('You won with a gameState of...', gameState)
});

game.onLose(gameState => {
    ReactDOM.render(<GameAlert alert="You lost!"></GameAlert>, document.getElementById('alert-box'));
    // console.log('You lost! :(', gameState)
    // console.log(`Your score was ${gameState.score}`);
});

renderBoard();

document.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowRight':
            game.move('right');
            break;
        case 'ArrowLeft':
            game.move('left');
            break;
        case 'ArrowDown':
            game.move('down');
            break;
        case 'ArrowUp':
            game.move('up');
            break;
    }
    // console.log(game.toString());

})
