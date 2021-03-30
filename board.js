var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import React from "react";

// import Game from './engine/game.js';
var COLORS = { 2: '#05A8AA', 4: '#B8D5B8', 8: '#D7B49E', 16: '#DC602E', 32: '#BC412B', 64: '#FF715B', 128: '#1EA896', 256: '#523F38', 512: '#BDFFFD', 1024: '#9A4C95', 2048: '#F08CAE' };

export var Board = function (_React$Component) {
    _inherits(Board, _React$Component);

    function Board() {
        _classCallCheck(this, Board);

        return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
    }

    _createClass(Board, [{
        key: 'renderSquare',
        value: function renderSquare(i) {
            return React.createElement(Square, { value: i });
        }
    }, {
        key: 'render',
        value: function render() {
            var elements = [];

            for (var i = 0; i < Math.pow(this.props.size, 2); i++) {
                elements.push(this.renderSquare(this.props.game.board[i]));
            }

            return React.createElement(
                'div',
                { id: 'board', style: { gridTemplateColumns: 'repeat(' + this.props.size + ',1fr)' } },
                elements
            );
        }
    }]);

    return Board;
}(React.Component);

export var Score = function (_React$Component2) {
    _inherits(Score, _React$Component2);

    function Score() {
        _classCallCheck(this, Score);

        return _possibleConstructorReturn(this, (Score.__proto__ || Object.getPrototypeOf(Score)).apply(this, arguments));
    }

    _createClass(Score, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'p',
                null,
                'Score: ',
                this.props.game.score
            );
        }
    }]);

    return Score;
}(React.Component);

export var GameAlert = function (_React$Component3) {
    _inherits(GameAlert, _React$Component3);

    function GameAlert() {
        _classCallCheck(this, GameAlert);

        return _possibleConstructorReturn(this, (GameAlert.__proto__ || Object.getPrototypeOf(GameAlert)).apply(this, arguments));
    }

    _createClass(GameAlert, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { id: 'game-alert' },
                React.createElement(
                    'h1',
                    null,
                    this.props.alert
                )
            );
        }
    }]);

    return GameAlert;
}(React.Component);

var Square = function (_React$Component4) {
    _inherits(Square, _React$Component4);

    function Square() {
        _classCallCheck(this, Square);

        return _possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).apply(this, arguments));
    }

    _createClass(Square, [{
        key: 'render',
        value: function render() {
            var return_val = this.props.value === 0 ? '' : this.props.value;
            return React.createElement(
                'div',
                { className: 'square', style: { backgroundColor: COLORS[this.props.value] } },
                return_val
            );
        }
    }]);

    return Square;
}(React.Component);

// const domContainer = document.querySelector('#board');

// alert('hi');