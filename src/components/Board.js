import React, { useState } from 'react';
import Square from './Square';
import calculateWinner from '../logic/calculateWinner';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (i) => {
    if (gameOver || squares[i]) return; // Prevent further clicks if game is over or square is filled

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setGameOver(true);
    } else if (newSquares.every(square => square !== null)) {
      setGameOver(true); // It's a draw if no winner and all squares are filled
    }
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? `Game is a draw!`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const renderSquare = (i) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {gameOver && (
        <div>
          <button className="restart-button" onClick={restartGame}>
            Start a new game
          </button>
        </div>
      )}
    </div>
  );
}
