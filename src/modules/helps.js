function shuffleLetters() {
    const letters = document.querySelectorAll(".wheel-letter");

    for (let i = letters.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));

        const left = letters[i].style.left;
        const top = letters[i].style.top;

        letters[i].style.left = letters[random].style.left;
        letters[i].style.top = letters[random].style.top;

        letters[random].style.left = left;
        letters[random].style.top = top;
    }
}

function emptyCells() {
    const cells = document.querySelectorAll(".letter");
    const emptyCellsList = [];

    cells.forEach(cell => {
        if (cell.textContent === "") {
            emptyCellsList.push(cell);
        }
    })
    return emptyCellsList;
}

function revealLetter(game, cell) {
    const x = cell.getAttribute('data-x');
    const y = cell.getAttribute('data-y');

    cell.textContent = game.letterAt(x, y);
}

function obtainRandomCell(emptyCellsLlist){
    const randomIndex = Math.floor(Math.random() * emptyCellsLlist.length);
    const randomCell = emptyCellsLlist[randomIndex];
    return { randomCell, randomIndex};
}

function randomLetter(game) {
    const emptyCellsLlist = emptyCells();

    if (emptyCellsLlist.length === 0) return;

    const { randomCell } = obtainRandomCell(emptyCellsLlist);

    revealLetter(game, randomCell);
}

function multipleLetter(game) {
    const emptyCellsLlist = emptyCells();

    for (let i = 0; i < 5; i++) {
        if (emptyCellsLlist.length === 0) return;
        
        const { randomCell, randomIndex } = obtainRandomCell(emptyCellsLlist);

        revealLetter(game, randomCell);

        emptyCellsLlist.splice(randomIndex, 1);
    }
}

let helpHammerActive = false;

function hammerFinish() {
    const divLetters = document.querySelectorAll(".on-top");
    divLetters.forEach(div => div.classList.remove("on-top"));

    document.getElementById("black").classList.add("hidden");

    helpHammerActive = false;
}

function hammerClickBox(game, event) {
    if (!helpHammerActive) return;

    const target = event.target;

    if (!target.textContent) {
        revealLetter(game, target);
        hammerFinish();
    }
}

function hammerHelp(game) {
    document.getElementById("black").classList.remove("hidden");

    const divLetters = document.querySelectorAll(".letter");

    divLetters.forEach(div => div.classList.add("on-top"));

    helpHammerActive = true;

    const grid = document.getElementById("grid");

    grid.addEventListener('click', (event) => hammerClickBox(game, event));

    document.addEventListener('click', (event) => {
        const hammer = document.getElementById("hammer");
        if (!hammer.contains(event.target) && !grid.contains(event.target)) {
            hammerFinish();
        }
    });
}

export { shuffleLetters, randomLetter, multipleLetter, hammerHelp };