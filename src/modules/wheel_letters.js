import calculateLetterPositions from "../lib/letter_positions.js"

function includeLetters(letters){
    const box = document.getElementById("wheel");
    let positions = calculateLetterPositions(letters.length);

    for (let i = 0; i < letters.length; i++) {
        const boxDiv = document.createElement("div");
        boxDiv.classList.add("wheel-letter");
        boxDiv.textContent = letters[i];
        boxDiv.style.left = positions[i].left;
        boxDiv.style.top = positions[i].top;

        box.appendChild(boxDiv);        
    }
}

export default includeLetters;