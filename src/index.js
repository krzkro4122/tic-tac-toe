import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'


function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}


  class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            oIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i])
            return;

        squares[i] = this.state.oIsNext ? '❌' : '⭕'
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            oIsNext: !this.state.oIsNext,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            oIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                `Go to move #${move}` :
                "Go to game start";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner)
            status = `Winner: ${winner}`;
        else
            status = `Current player: ${this.state.oIsNext ? '❌' : '⭕'}`;


        return (
            <div className="game">
                <div className="imageContainer">
                    <img
                        src="https://www.tictac.com/pl/sites/tictac30_pl/files/2020-01/mint_pl.png"
                        width="43%"
                    />
                    <img
                        src="https://dictionary.cambridge.org/fr/images/thumb/bigtoe_noun_004_0321.jpg?version=5.0.244"
                        // width=
                    />
                </div>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

  // ========================================

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
