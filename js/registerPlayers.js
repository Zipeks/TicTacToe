const blacker = $('.blacker');
const registerPopUp = $('.registerPopUp');

const startGame = $('#startGame');
startGame.addEventListener('click', function (e) {

    e.preventDefault();

    const player1Name = $('#player1Name').value;
    const player2Name = $('#player2Name').value;


    const radioButtons = document.querySelectorAll('input[name="oponent"]');

    let oponent;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            oponent = radioButton.value;
            break;
        }
    }
    if (oponent == "Human") {
        if ((player1Name.length >= 3) && (player2Name.length >= 3)) {

            const Player1 = player(player1Name, "x");
            const Player2 = player(player2Name, "o");
            players = [Player1, Player2];

            displayController.generateBoard();
            displayController.currentPlayerIndication();
            displayController.playerNames();

            blacker.classList.remove('active');
            registerPopUp.classList.remove('active');
        }
    } else {
        Gameboard.gameAgainstComputerSet();

        const Player1 = player(player1Name, "x");
        const Player2 = player("Computer", "o");
        players = [Player1, Player2];

        displayController.generateBoard();
        displayController.currentPlayerIndication();
        displayController.playerNames();

        blacker.classList.remove('active');
        registerPopUp.classList.remove('active');

    }

});

