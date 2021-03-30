import Game from './engine/game.js';
import { Board, Score } from './board.js';

var size = 4;
var game = new Game(size);
// console.log(game.toString());

var renderBoard = function renderBoard() {
    ReactDOM.render(React.createElement(Board, { size: size, game: game }), document.getElementById('main'));
    ReactDOM.render(React.createElement(Score, { game: game }), document.getElementById('score'));
};

game.onMove(function (gameState) {
    // console.log(game.toString());
    renderBoard();
    // console.log(game.gameState);
});

game.onWin(function (gameState) {
    console.log('You won with a gameState of...', gameState);
});

game.onLose(function (gameState) {
    console.log('You lost! :(', gameState);
    console.log('Your score was ' + gameState.score);
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
    console.log(game.toString());
});