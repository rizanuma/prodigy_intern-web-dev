document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const result = document.getElementById('result');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Create the game board dynamically
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    function handleCellClick(event) {
        if (!gameActive) return;

        const index = event.target.getAttribute('data-index');
        if (gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.classList.add('selected', currentPlayer);
            checkForWinner();
            switchPlayer();
        }
    }

    function checkForWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                endGame(`${currentPlayer} wins!`);
                return;
            }
        }

        if (!gameBoard.includes('')) {
            endGame('It\'s a tie!');
            return;
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function endGame(message) {
        result.textContent = message;
        result.classList.add('show');
        gameActive = false;
    }
});
