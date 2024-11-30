const board = document.getElementById("board");
const message = document.getElementById("message");
let currentPlayer = "X";
let cells = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }

    if (!cells.includes("")) {
        return "T";
    }

    return null;
}

function computerMove() {
    // Check for a winning move.
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] === "") {
            cells[i] = currentPlayer;
            if (checkWinner() === currentPlayer) {
                return i;
            }
            cells[i] = ""; // Reset the cell.
        }
    }

    // Check for a blocking move.
    const opponent = currentPlayer === "X" ? "O" : "X";
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] === "") {
            cells[i] = opponent;
            if (checkWinner() === opponent) {
                return i;
            }
            cells[i] = ""; // Reset the cell.
        }
    }

    // If no winning or blocking move, choose the first available empty cell.
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] === "") {
            return i;
        }
    }
    return null; // No empty cells left (shouldn't happen in a fair game).
}

function handleClick(event) {
    const cellIndex = event.target.dataset.index;
    if (cells[cellIndex] === "" && gameActive) {
        cells[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            if (winner === "T") {
                message.textContent = "It's a tie!";
            } else {
                message.textContent = `${winner} wins!`;
            }
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";

            // Simulate computer's move.
            const computerIndex = computerMove();
            if (computerIndex !== null && gameActive) {
                cells[computerIndex] = currentPlayer;
                const computerCell = document.querySelector(`[data-index="${computerIndex}"]`);
                computerCell.textContent = currentPlayer;

                const computerWinner = checkWinner();
                if (computerWinner) {
                    if (computerWinner === "T") {
                        message.textContent = "It's a tie!";
                    } else {
                        message.textContent = `${computerWinner} wins!`;
                    }
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        }
    }
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}
function computerMove() {
const availableCells = [];
for (let i = 0; i < cells.length; i++) {
if (cells[i] === "") {
    availableCells.push(i);
}
}

if (availableCells.length === 0) {
return null; // No empty cells left (shouldn't happen in a fair game).
}

// Choose a random index from the available empty cells.
const randomIndex = Math.floor(Math.random() * availableCells.length);
return availableCells[randomIndex];
}
function computerMove() {
const availableCells = [];
for (let i = 0; i < cells.length; i++) {
if (cells[i] === "") {
    availableCells.push(i);
}
}

if (availableCells.length === 0) {
return null; // No empty cells left (shouldn't happen in a fair game).
}

// Check for a winning move.
for (let i = 0; i < availableCells.length; i++) {
const index = availableCells[i];
cells[index] = currentPlayer;
if (checkWinner() === currentPlayer) {
    cells[index] = ""; // Reset the cell.
    return index;
}
cells[index] = ""; // Reset the cell.
}

// Check for a blocking move.
const opponent = currentPlayer === "X" ? "O" : "X";
for (let i = 0; i < availableCells.length; i++) {
const index = availableCells[i];
cells[index] = opponent;
if (checkWinner() === opponent) {
    cells[index] = ""; // Reset the cell.
    return index;
}
cells[index] = ""; // Reset the cell.
}

// Choose a random index from the available empty cells.
const randomIndex = Math.floor(Math.random() * availableCells.length);
return availableCells[randomIndex];
}

createBoard();