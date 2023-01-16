const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = (name, sign) => {
    const wins = 0;

    const wonGame = () => wins++;
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
    const showPlayer = () => players[currentPlayer];

    const nextTurn = () => {
        checkForWin();
        currentPlayer++;
        currentPlayer = currentPlayer % 2;
    }

    const checkForWin = () => {
        let win = false;

        for (let i = 0; i < 3; i++) {
            if (tiles[i] === undefined) {
                continue;
            }
            if ((tiles[i] === tiles[i + 3]) && (tiles[i] === tiles[i + 6])) {
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
                    break;
                }
            }
        }
        if (!win) {
            if (tiles[0] !== undefined) {
                if ((tiles[0] === tiles[4]) && (tiles[0] === tiles[8])) {
                    win = true;
                }
            }
        }
        if (!win) {
            if (tiles[2] !== undefined) {
                if ((tiles[2] === tiles[4]) && (tiles[2] === tiles[6])) {
                    win = true;
                }
            }
        }
        if (win) {
            console.log(showPlayer().name + ' has wone');
            return true;
        }
        return false;

    }

    const placedTiles = () => tiles;

    return { placeTile, placedTiles, nextTurn, showPlayer }
})();

const displayController = (() => {
    const board = $('#board');
    const generateBoard = () => {
        for (let i = 0; i < 9; i++) {
            const tile = document.createElement('div');
            tile.addEventListener('click', () => {
                if (Gameboard.placedTiles()[i] === undefined) {
                    Gameboard.placeTile(i, Gameboard.showPlayer());
                    tile.innerText = Gameboard.showPlayer().sign;

                    Gameboard.nextTurn();
                }
            });
            board.appendChild(tile);
        };
    };
    return { generateBoard };
})();
displayController.generateBoard();