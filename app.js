const grid = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll('.grid div'));
const width = 10;

const OTetromino = [[1, 2, width + 1, width + 2], [1, 2, width + 1, width + 2], [1, 2, width + 1, width + 2], [1, 2, width + 1, width + 2]];
const ITetromino = [[width, width + 1, width + 2, width + 3], [2, width + 2, 2 * width + 2, 3 * width + 2], [2 * width, 2 * width + 1, 2 * width + 2, 2 * width + 3], [1, width + 1, 2 * width + 1, 3 * width + 1]];
const STetromino = [[1, 2, width, width + 1], [1, width + 1, width + 2, 2 * width + 2], [width + 1, width + 2, 2 * width, 2 * width + 1], [0, width, width + 1, 2 * width + 1]];
const Ztetromino = [[0, 1, width + 1, width + 2], [2, width + 1, width + 2, 2 * width + 1], [width, width + 1, 2 * width + 1, 2 * width + 2], [1, width, width + 1, 2 * width]];
const LTetromino = [[2, width, width + 1, width + 2], [1, width + 1, 2 * width + 1, 2 * width + 2], [width, width + 1, width + 2, 2 * width], [0, 1, width + 1, 2 * width + 1]];
const JTetromino = [[0, width, width + 1, width + 2], [1, 2, width + 1, 2 * width + 1], [width, width + 1, width + 2, 2 * width + 2], [1, width + 1, 2 * width, 2 * width + 1]];
const TTetromino = [[1, width, width + 1, width + 2], [1, width + 1, width + 2, 2 * width + 1], [width, width + 1, width + 2, 2 * width + 1], [1, width, width + 1, 2 * width + 1]];

const Tetrominos = [OTetromino, ITetromino, STetromino, Ztetromino, LTetromino, JTetromino, TTetromino];

let currentPos = 4;
let currentRotation = 0;
let currentTetromino = getRandom()
var current = Tetrominos[currentTetromino][currentRotation];

function getRandom() {
    return Math.floor(Math.random() * 7);
}

function draw() {
    current.forEach(index => {
        squares[currentPos + index].classList.add("tetromino");
    })
}

function undraw() {
    current.forEach(index => {
        squares[currentPos + index].classList.remove("tetromino");
    })
}

function freeze() {
    // down
    if (current.some(index => squares[currentPos + index + width].classList.contains("taken"))) {
        current.forEach(index => squares[currentPos + index].classList.add("taken"));
        currentTetromino = getRandom();
        currentRotation = 0;
        current = Tetrominos[currentTetromino][currentRotation];
        currentPos = 4;
        draw();
        return true;
    }
    return false;
}

function moveDown() {
    if (!freeze()) {
        undraw();
        currentPos += width;
        draw();
    }
}

function moveLeft() {
    undraw();
    const isAtLeftEdge = (current.some(index => !Boolean((currentPos + index) % width)));
    const leftTaken = current.some(index => squares[currentPos + index - 1].classList.contains("taken"));
    if (!isAtLeftEdge && !leftTaken) { currentPos -= 1; }
    draw();
}

function moveRight() {
    undraw();
    const isAtRightEdge = (current.some(index => ((currentPos + index) % width == width - 1)));
    const rightTaken = current.some(index => squares[currentPos + index + 1].classList.contains("taken"));
    if (!isAtRightEdge && !rightTaken) { currentPos += 1; }
    draw();
}

function rotate(e) {
    undraw();
    currentRotation = (currentRotation + 1) % 4
    current = Tetrominos[currentTetromino][currentRotation];
    draw();
}

function takeAction(e) {
    switch (e.keyCode) {
        case 37:
            moveLeft();
            break;
        case 38:
            rotate();
            break;
        case 39:
            moveRight();
            break;
        case 40:
            moveDown();
            break;
    }
}

function main() {
    draw();
    timer = setInterval(moveDown, 1000);
    document.addEventListener('keyup', takeAction);
}

main();