import { getElementCenter, lengthAndAngle } from "../lib/line_position.js"
import { WordNotFound } from "../lib/Game.js";

let draw = false;
let origin = null;
let boxDiv = null;
let selectedLetters = [];
let word = [];

function createLine(origin, end) {
    const { length, angle } = lengthAndAngle([origin.x, origin.y], [end.x, end.y]);

    boxDiv.style.width = `${length}px`;
    boxDiv.style.transform = `rotate(${angle}deg)`;
}

function continueLine(event) {
    const end = { x: event.clientX, y: event.clientY };

    createLine(origin, end);
}

function selectLetter(target) {
    target.classList.add("selected");
    selectedLetters.push(target);
    word.push(target.textContent);
}

function createDiv(origin) {
    boxDiv = document.createElement("div");
    boxDiv.classList.add("line");

    boxDiv.style.left = `${origin.x}px`;
    boxDiv.style.top = `${origin.y}px`;

    document.body.appendChild(boxDiv);
}

function clickLetter(event) {
    if (draw) return;

    const target = event.target;
    selectLetter(target);

    origin = getElementCenter(target);
    createDiv(origin);

    draw = true;

    document.addEventListener('mousemove', continueLine);
}

function otherLetter(event) {
    if (!origin) return;

    const target = event.target;
    if (selectedLetters.includes(target)) return;

    const newOrigin = getElementCenter(target);
    createLine(origin, newOrigin);

    selectLetter(target);

    origin = newOrigin;
    createDiv(origin);
}

function includeLetter(wordLetters, position) {
    for (let i = 0; i < wordLetters.length; i++) {
        const letter = wordLetters[i];

        const x = position.origin[0] + i * (position.direction === "horizontal" ? 1 : 0);
        const y = position.origin[1] + i * (position.direction === "vertical" ? 1 : 0);

        const cell = document.querySelector(`.letter[data-x="${x}"][data-y="${y}"]`);
        cell.textContent = letter;        
    }
}

function findLetter(game, wordLetters) {
    wordLetters = wordLetters.toUpperCase();
    console.log(wordLetters);

    try {
        const position = game.findWord(wordLetters);
        includeLetter(wordLetters, position);

    } catch (error) {
        if (error instanceof WordNotFound) {
            console.log(`Word not found: ${error.message}`);
        }
    }
}

function deleteLine(game) {
    draw = false;
    origin = null;
    boxDiv = null;

    document.removeEventListener('mousemove', continueLine);

    const lines = document.querySelectorAll('.line');
    lines.forEach(line => line.remove());

    selectedLetters.forEach(selected => selected.classList.remove('selected'));

    const wordLetters = word.join("");
    if (wordLetters) {
        findLetter(game, wordLetters);
    }

    selectedLetters = [];
    word = [];
}

export { clickLetter, otherLetter, deleteLine };