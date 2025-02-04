let currentPlayer = 'X';
let gameActive = true;
let playerXName = 'Player X';
let playerOName = 'Player O';

document.getElementById('details-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get player names
    playerXName = document.getElementById('player1').value || 'Player X';
    playerOName = document.getElementById('player2').value || 'Player O';

    // Display SweetAlert2 confirmation
    Swal.fire({
        title: 'Game Started!',
        text: `Welcome ${playerXName} and ${playerOName}. Let’s start the game!`,
        icon: 'success',
        confirmButtonText: 'Let\'s Go!',
        background: '#fff',
        color: '#333',
        confirmButtonColor: '#4caf50'
    }).then(() => {
        // Hide user details and show game container
        document.getElementById('user-details').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
    });
});

function makeMove(id) {
    if (!gameActive) return;

    const cell = document.getElementById(id);
    if (cell.innerText === '') {
        cell.innerText = currentPlayer;
        if (checkWinner()) {
            Swal.fire({
                title: `${currentPlayer === 'X' ? playerXName : playerOName} Wins!`,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => resetGame());
            gameActive = false;
        } else if (isBoardFull()) {
            Swal.fire({
                title: 'It\'s a Draw!',
                icon: 'info',
                confirmButtonText: 'OK'
            }).then(() => resetGame());
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('game-status').innerText = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function checkWinner() {
    const winningCombos = [
        ['b1', 'b2', 'b3'],
        ['b4', 'b5', 'b6'],
        ['b7', 'b8', 'b9'],
        ['b1', 'b4', 'b7'],
        ['b2', 'b5', 'b8'],
        ['b3', 'b6', 'b9'],
        ['b1', 'b5', 'b9'],
        ['b3', 'b5', 'b7']
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo.map(id => document.getElementById(id).innerText);
        if (a && a === b && a === c) return true;
    }
    return false;
}

function isBoardFull() {
    for (let i = 1; i <= 9; i++) {
        if (document.getElementById(`b${i}`).innerText === '') return false;
    }
    return true;
}

function resetGame() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`b${i}`).innerText = '';
    }
    currentPlayer = 'X';
    document.getElementById('game-status').innerText = `Player X's Turn`;
    gameActive = true;
}

document.getElementById('reset-button').addEventListener('click', function() {
    resetGame();
    Swal.fire({
        title: 'Game Reset!',
        text: 'The game has been reset successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        background: '#fff',
        color: '#333',
        confirmButtonColor: '#4caf50'
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('details-form');
    const gameContainer = document.getElementById('game-container');
    const gameGif = document.getElementById('game-gif');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        const player1Name = document.getElementById('player1').value.trim();
        const player2Name = document.getElementById('player2').value.trim();

        if (player1Name === '' || player2Name === '') {
            Swal.fire('Please enter names for both players.');
            return;
        }

        // Hide the game GIF and show the game container
        gameGif.style.display = 'none';
        gameContainer.style.display = 'block';

        // Optionally, you can initialize the game with player names here
        // For example: initializeGame(player1Name, player2Name);
    });

    // Optionally handle the reset button to reset visibility
    document.getElementById('reset-button').addEventListener('click', () => {
        gameGif.style.display = 'block';
        gameContainer.style.display = 'none';
    });
});

