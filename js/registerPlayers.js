const blacker = $('.blacker');
const registerPopUp = $('.registerPopUp');

// document.addEventListener('click', function (event) {
//     const isClick = registerPopUp.contains(event.target);
//     if (!isClick) {
//         blacker.classList.remove('active');
//         registerPopUp.classList.remove('active');
//     }
// });
const startGame = $('#startGame');
console.log(startGame)
startGame.addEventListener('click', function (e) {

    e.preventDefault();

    const player1Name = $('#player1Name').value;
    const player2Name = $('#player2Name').value;
    if ((player1Name.length >= 3) && (player2Name.length >= 3)) {

        const Player1 = player(player1Name, "x");
        const Player2 = player(player2Name, "o");
        players = [Player1, Player2];

        blacker.classList.remove('active');
        registerPopUp.classList.remove('active');
    }
});

// addBookBtn.addEventListener('click', function (e) {
//     e.preventDefault();

//     const title = $('#title').value;
//     const author = $('#author').value;
//     const pages = $('#pages').value;
//     const read = $('#read').checked;

//     const book = new Book(title, author, pages, read);
//     addToLibrary(book);
//     showBooks();
//     storeBooks();
// })