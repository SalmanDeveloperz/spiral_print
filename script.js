function createSpiralMatrix(rows, cols) {
    let matrix = Array.from({ length: rows }, () => Array(cols).fill(' '));

    let top = 0;
    let bottom = rows - 1;
    let left = 0;
    let right = cols - 1;
    let num = 1;

    while (top <= bottom && left <= right) {
        // Traverse from left to right along the top row
        for (let i = left; i <= right; i++) {
            matrix[top][i] = num++;
        }
        top++;

        // Traverse from top to bottom along the right column
        for (let i = top; i <= bottom; i++) {
            matrix[i][right] = num++;
        }
        right--;

        // Traverse from right to left along the bottom row
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                matrix[bottom][i] = num++;
            }
            bottom--;
        }

        // Traverse from bottom to top along the left column
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                matrix[i][left] = num++;
            }
            left++;
        }
    }

    return matrix;
}

function displayMatrix(matrix) {
    const table = document.getElementById('spiralMatrix');
    table.innerHTML = '';
    for (let row of matrix) {
        const tr = document.createElement('tr');
        for (let cell of row) {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function animateMatrix(matrix, speed) {
    const table = document.getElementById('spiralMatrix');
    const cells = table.getElementsByTagName('td');
    const totalCells = matrix.length * matrix[0].length;

    let order = [];
    let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // Traverse from left to right along the top row
        for (let i = left; i <= right; i++) {
            order.push([top, i]);
        }
        top++;

        // Traverse from top to bottom along the right column
        for (let i = top; i <= bottom; i++) {
            order.push([i, right]);
        }
        right--;

        // Traverse from right to left along the bottom row
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                order.push([bottom, i]);
            }
            bottom--;
        }

        // Traverse from bottom to top along the left column
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                order.push([i, left]);
            }
            left++;
        }
    }

    let index = 0;

    function showNext() {
        if (index < totalCells) {
            const [row, col] = order[index];
            cells[row * matrix[0].length + col].classList.add('appear');
            index++;
            setTimeout(showNext, speed); // Use speed input here
        } else {
            setTimeout(() => {
                for (let cell of cells) {
                    cell.classList.add('appear');
                }
                table.classList.add('blink');
            }, 500);
        }
    }

    showNext();
}

function generateSpiral() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);
    const speed = parseInt(document.getElementById('speed').value);

    if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0 || isNaN(speed) || speed <= 0) {
        alert('Please enter valid positive numbers for rows, columns, and speed.');
        return;
    }

    const spiralMatrix = createSpiralMatrix(rows, cols);
    displayMatrix(spiralMatrix);
    animateMatrix(spiralMatrix, speed);
}
