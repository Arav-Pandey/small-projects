import { useState, useEffect } from "react";

export default function Todos4() {
    const [player1, setPlayer1] = useState("X");
    const [player2, setPlayer2] = useState("O");
    const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState(player1);
    const [winner, setWinner] = useState<string | null>(null);
    const [isDraw, setIsDraw] = useState(false);
    const [winningPattern, setWinningPattern] = useState<number[] | null>(null);

    const checkWinner = () => {
        // Horizontal
        const winPatterns = [
            // Rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // Columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // Diagonals
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(board[a]);
                setWinningPattern(pattern);
                return;
            }
        }
        if (!board.includes(null)) {
            setIsDraw(true);

        }
    }
    useEffect(() => {
        checkWinner();
    }, [board]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}// make the board a 3x3 and each a button
        >
            <h1>Tic-Tac-Toe</h1>
            <a href="/homepage">Go back to home</a>
            <button
                onClick={() => {
                    setBoard(Array(9).fill(null));
                    setCurrentPlayer(player1);
                    setWinner(null);
                    setIsDraw(false);
                    setWinningPattern(null); // ✅ reset
                }}
                style={{
                    marginBottom: "20px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                }}
            >
                Reset Board
            </button>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 100px)",
                    gridTemplateRows: "repeat(3, 100px)",
                    gap: "5px",
                }}
            >
                {board.map((cell, index) => {
                    const isWinningCell =
                        winningPattern?.includes(index) && winner; // ✅ check if this cell is part of winning pattern

                    return (
                        <button
                            key={index}
                            onClick={() => {
                                if (cell || winner) return;
                                const newBoard = [...board];
                                newBoard[index] = currentPlayer;
                                setBoard(newBoard);
                                setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
                            }}
                            style={{
                                width: "100px",
                                height: "100px",
                                fontSize: "24px",
                                cursor: cell || winner ? "not-allowed" : "pointer",
                                color: isWinningCell
                                    ? "green" // ✅ make winning X or O light green
                                    : cell === "X"
                                        ? "red"
                                        : cell === "O"
                                            ? "blue"
                                            : "black",
                            }}
                        >
                            {cell}
                        </button>
                    );
                })}


            </div>
            <div>
                {winner ? (
                    <strong>Winner: {winner}</strong>
                ) : isDraw ? (
                    <strong>It's a draw!</strong>
                ) : (
                    <strong>Current turn: {currentPlayer}</strong>
                )}
            </div>
        </div>
    )
}