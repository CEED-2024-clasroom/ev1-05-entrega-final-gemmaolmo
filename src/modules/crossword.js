import center from '../lib/center.js';

function calculateMax(wordPosition) {
    let maxColumn = 0;
    let maxRow = 0;

    for (let { origin, direction, length } of wordPosition) {
        if (direction === 'horizontal') {
            maxColumn = Math.max(maxColumn, origin[0] + length - 1);
            maxRow = Math.max(maxRow, origin[1]);
        } else if (direction === 'vertical') {
            maxColumn = Math.max(maxColumn, origin[0]);
            maxRow = Math.max(maxRow, origin[1] + length - 1);
        }
    }

    return [maxColumn, maxRow];
}

function displacement(wordPosition) {
    const [maxColumn, maxRow] = calculateMax(wordPosition);
    const gridWidth = 10;
    const gridHeight = 10;

    return center(maxColumn, maxRow, gridWidth, gridHeight);
}

function createPositions(wordPosition) {
    const [despx, despy] = displacement(wordPosition);
    const positions = [];

    for (let { origin, direction, length } of wordPosition) {
        for (let i = 0; i < length; i++) {
            const column = origin[0] + (direction === 'horizontal' ? i : 0);
            const row = origin[1] + (direction === 'vertical' ? i : 0);

            positions.push({
                column: column + 1 + despx,
                row: row + 1 + despy,
                dataX: column,
                dataY: row
            });
        }
    }

    return positions;
}

function crossword(wordPosition) {
    const box = document.getElementById("grid");

    const positions = createPositions(wordPosition);

    for (let { column, row, dataX, dataY } of positions) {
        const cell = document.querySelector(`[data-x = "${dataX}"][data-y = "${dataY}"]`);

        if (!cell) {
            const boxDiv = document.createElement("div");

            boxDiv.setAttribute("data-x", dataX);
            boxDiv.setAttribute("data-y", dataY);

            boxDiv.classList.add("letter");

            boxDiv.style.gridArea = `${row} / ${column}`;

            box.appendChild(boxDiv);
        }
    }
}

export default crossword;