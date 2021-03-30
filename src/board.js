// import React from "react";

// import Game from './engine/game.js';
const COLORS = {2:'#05A8AA', 4:'#B8D5B8', 8:'#D7B49E', 16:'#DC602E', 32:'#BC412B', 64:'#FF715B', 128:'#1EA896', 256:'#523F38', 512:'#BDFFFD', 1024:'#9A4C95', 2048: '#F08CAE'}

export class Board extends React.Component {

    renderSquare(i) {
        return <Square value={i} />
    }

    render() {
        const elements = [];

        for (let i = 0; i < this.props.size**2; i++) {
            elements.push(this.renderSquare(this.props.game.board[i]));
        }
        
        return (
            <div id="board" style={{gridTemplateColumns: 'repeat(' + this.props.size + ',1fr)'}}>{elements}</div>    
        );
        
    }
}

export class Score extends React.Component {
    render() {
        return (
            <p>Score: {this.props.game.score}</p>
        )
    }
}



class Square extends React.Component {
    render() {
        const return_val = this.props.value === 0 ? '' : this.props.value;
        return (
            <div className="square" style={{backgroundColor: COLORS[this.props.value]}}>
                {return_val}
            </div>
        );
    }
}



// const domContainer = document.querySelector('#board');

// alert('hi');