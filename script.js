document.addEventListener('DOMContentLoaded', () => {
    const rowsSlider = document.getElementById('rows');
    const colsSlider = document.getElementById('cols');
    const sizeSlider = document.getElementById('size');
    const intervalInput = document.getElementById('interval');
    const rowsValue = document.getElementById('rowsValue');
    const colsValue = document.getElementById('colsValue');
    const sizeValue = document.getElementById('sizeValue');
    const chessboard = document.getElementById('chessboard');

    let intervalId;

    rowsSlider.addEventListener('input', updateBoard);
    colsSlider.addEventListener('input', updateBoard);
    sizeSlider.addEventListener('input', updateBoard);
    intervalInput.addEventListener('input', updateInterval);

    function updateBoard() {
        rowsValue.textContent = rowsSlider.value;
        colsValue.textContent = colsSlider.value;
        sizeValue.textContent = sizeSlider.value;
        generateChessboard(rowsSlider.value, colsSlider.value, sizeSlider.value);
        startColorChange(intervalInput.value);
    }

    function updateInterval() {
        if (intervalId) clearInterval(intervalId);
        startColorChange(intervalInput.value);
    }

    function generateChessboard(rows, cols, cellSize) {
        chessboard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        chessboard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        chessboard.innerHTML = '';

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.backgroundColor = (i + j) % 2 === 0 ? 'white' : 'black';
                cell.style.width = `${cellSize}px`;
                chessboard.appendChild(cell);
            }
        }
    }

    function startColorChange(interval) {
        const cells = chessboard.querySelectorAll('.cell');
        intervalId = setInterval(() => {
            cells.forEach((cell, index) => {
                const currentColor = cell.style.backgroundColor;
                cell.style.backgroundColor = currentColor === 'white' ? 'black' : 'white';
            });
        }, interval);
    }

    updateBoard();
    updateInterval();
});
