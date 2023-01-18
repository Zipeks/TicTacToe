const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const player = (name, sign) => {
    let wins = 0;

    const wonGame = () => {
        wins++;
    };
    const getName = () => name;
    const getWins = () => wins;

    return { name, sign, wonGame, getName, getWins };
}
// const Player1 = player('Julek', 'x');
// const Player2 = player('Marian', 'o');
let players;

const Gameboard = ((player1, player2) => {
    const tiles = [];
    let currentPlayer = 0;
    const placeTile = (n, player) => {
        if ((n < 0) || (n > 9)) {
            return false;
        } else {
            tiles[n] = player.sign;
        }
        return true;
    }

    const showCurrentPlayerNumber = () => currentPlayer;
    const showPlayer = () => players[currentPlayer];

    const clearTiles = () => {
        tiles.length = 0;
    }

    const nextTurn = async () => {
        await checkForWin();
        currentPlayer++;
        currentPlayer = currentPlayer % 2;
        displayController.currentPlayerIndication();
    }
    const checkForDraw = () => {
        for (let i = 0; i < 9; i++) {
            if (placedTiles()[i] === undefined) {
                return false;
            }
        }
        return true;

    }
    const checkForWin = async () => {
        let win = false;
        const wininginTiles = [];
        for (let i = 0; i < 3; i++) {
            if (tiles[i] === undefined) {
                continue;
            }
            if ((tiles[i] === tiles[i + 3]) && (tiles[i] === tiles[i + 6])) {
                wininginTiles.push(i, i + 3, i + 6);
                win = true;
                break;
            }
        }
        if (!win) {
            for (let i = 0; i < 7; i = i + 3) {
                if (tiles[i] === undefined) {
                    continue;
                }
                if ((tiles[i] === tiles[i + 1]) && (tiles[i] === tiles[i + 2])) {
                    win = true;
                    wininginTiles.push(i, i + 1, i + 2);

                    break;
                }
            }
        }
        if (!win) {
            if (tiles[0] !== undefined) {
                if ((tiles[0] === tiles[4]) && (tiles[0] === tiles[8])) {
                    win = true;
                    wininginTiles.push(0, 4, 8);

                }
            }
        }
        if (!win) {
            if (tiles[2] !== undefined) {
                if ((tiles[2] === tiles[4]) && (tiles[2] === tiles[6])) {
                    win = true;
                    wininginTiles.push(2, 4, 6);
                }
            }
        }

        const infoPop = $('#winInfoPop');
        if (win) {

            displayController.showWinningTiles(wininginTiles);
            await sleep(1000);
            infoPop.innerText = showPlayer().getName() + " has won";
            infoPop.classList.add('winInfo');
            await sleep(3000);
            infoPop.classList.remove('winInfo');

            showPlayer().wonGame();

            displayController.generateBoard();
        } else if (checkForDraw()) {

            infoPop.innerText = "It's a draw";
            infoPop.classList.add('winInfo');
            await sleep(3000);
            infoPop.classList.remove('winInfo');

            displayController.generateBoard();

        }
        return false;

    }

    const placedTiles = () => tiles;

    return { placeTile, placedTiles, nextTurn, showPlayer, showCurrentPlayerNumber, clearTiles }
})();

const displayController = (() => {
    const board = $('#board');
    const generateBoard = () => {
        playerNames();
        Gameboard.clearTiles();
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const tile = document.createElement('div');
            tile.classList.add('open');
            tile.addEventListener('click', () => {
                if (Gameboard.placedTiles()[i] === undefined) {
                    Gameboard.placeTile(i, Gameboard.showPlayer());
                    tile.innerText = Gameboard.showPlayer().sign;
                    Gameboard.nextTurn();
                    tile.classList.remove('open');
                }
            });
            board.appendChild(tile);
        };
    };

    const playerNames = () => {
        const player1Name = $('#player1h1');
        const player2Name = $('#player2h1');

        player1Name.innerText = players[0].name + ": " + players[0].getWins();
        player2Name.innerText = players[1].name + ": " + players[1].getWins();

    };
    const currentPlayerIndication = () => {
        const player1Head = $('#player1Head');
        const player2Head = $('#player2Head');

        const playersHeads = [player1Head, player2Head];
        playersHeads[Gameboard.showCurrentPlayerNumber()].classList.add('active');
        playersHeads[(Gameboard.showCurrentPlayerNumber() + 1) % 2].classList.remove('active');

    }
    const showWinningTiles = async (tiles) => {

        const tile1 = board.querySelector(`:nth-child(${tiles[0] + 1})`);
        const tile2 = board.querySelector(`:nth-child(${tiles[1] + 1})`);
        const tile3 = board.querySelector(`:nth-child(${tiles[2] + 1})`);

        tile1.classList.add('won');
        tile2.classList.add('won');
        tile3.classList.add('won');

        await sleep(3800);

        tile1.classList.remove('won');
        tile2.classList.remove('won');
        tile3.classList.remove('won');


    }
    return { currentPlayerIndication, generateBoard, showWinningTiles };
})();
