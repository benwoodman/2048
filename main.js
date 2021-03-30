import Game from './engine/game.js';
import { Board, Score, GameAlert } from './board.js';

var size = 4;
var game = new Game(size);

var loaded_game = {
    board: [4, 0, 0, 4, 1024, 1024, 0, 8, 2, 16, 4, 2, 16, 2, 2, 2],
    won: false,
    over: false,
    score: 1000

    // game.loadGame(loaded_game);
};document.getElementById('reset-button').addEventListener('click', function () {
    game.setupNewGame();
    renderBoard();
});
// console.log(game.toString());

var renderBoard = function renderBoard() {
    ReactDOM.render(React.createElement(Board, { size: size, game: game }), document.getElementById('main'));
    ReactDOM.render(React.createElement(Score, { game: game }), document.getElementById('score'));
};

game.onMove(function (gameState) {
    renderBoard();
});

// game.onMove(() => console.log('test'));

game.onWin(function (gameState) {
    ReactDOM.render(React.createElement(GameAlert, { alert: 'You won!' }), document.getElementById('alert-box'));
    // console.log('You won with a gameState of...', gameState)
});

game.onLose(function (gameState) {
    ReactDOM.render(React.createElement(GameAlert, { alert: 'You lost!' }), document.getElementById('alert-box'));
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
});