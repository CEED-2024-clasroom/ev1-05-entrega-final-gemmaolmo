import './styles/styles.css';
import './lib/fontawesome.js';
import { Game } from './lib/Game.js';
import crossword from './modules/crossword.js';
import includeLetters from './modules/wheel_letters.js';
import { clickLetter, otherLetter, deleteLine } from './modules/lines_and_words.js';
import { shuffleLetters, randomLetter, multipleLetter, hammerHelp } from './modules/helps.js';

function init() {
    const game = new Game();
    const wordPosition = game.wordPositions;
    const letters = game.letters;

    crossword(wordPosition);

    includeLetters(letters);

    const boxDiv = document.querySelectorAll(".wheel-letter");

    for (let div of boxDiv) {
        div.addEventListener('mousedown', clickLetter);
        div.addEventListener('mouseover', otherLetter);
    }

    document.addEventListener('mouseup', () => deleteLine(game));


    const shuffle = document.getElementById("shuffle");

    shuffle.addEventListener('click', shuffleLetters);


    const random = document.getElementById("random");

    random.addEventListener('click', () => randomLetter(game));


    const multiple = document.getElementById("multiple");

    multiple.addEventListener('click', () => multipleLetter(game));


    const hammer = document.getElementById("hammer");

    hammer.addEventListener('click', () => hammerHelp(game));
}

window.onload = init;