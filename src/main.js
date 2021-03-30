import Game from './engine/game.js'
import {Board, Score} from './board.js'

const size = 4;
let game = new Game(size);
// console.log(game.toString());

let renderBoard = function () {
    ReactDOM.render(<Board size={size} game={game}></Board>, document.getElementById('main'));
    ReactDOM.render(<Score game={game}></Score>, document.getElementById('score'));
}


game.onMove(gameState => {
    // console.log(game.toString());
    renderBoard();
    // console.log(game.gameState);
});

game.onWin(gameState => {
    console.log('You won with a gameState of...', gameState)
});

game.onLose(gameState => {
    console.log('You lost! :(', gameState)
    console.log(`Your score was ${gameState.score}`);
});

renderBoard();

document.addEventListener('keydown', function(e) {
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
        
})
