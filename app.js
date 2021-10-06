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

const materials = ["url('img/o.png')","url('img/i.png')","url('img/s.png')","url('img/z.png')","url('img/l.png')","url('img/j.png')","url('img/t.png')"];


let currentPos = 4;
let currentRotation = 0;
let currentTetromino = getRandom()
var current = Tetrominos[currentTetromino][currentRotation];
let score = 0;

function getRandom() {
    return Math.floor(Math.random() * 7);
}

function draw() {
    current.forEach(index => {
        squares[currentPos + index].classList.add("tetromino");
        squares[currentPos + index].style.backgroundImage = materials[currentTetromino];
        squares[currentPos + index].style.backgroundSize = "cover";
    })
}

function undraw() {
    current.forEach(index => {
        squares[currentPos + index].classList.remove("tetromino");
        squares[currentPos + index].style.backgroundImage = "";
    })
}

function freeze() {
    // down
    if (current.some(index => squares[currentPos + index + width].classList.contains("taken"))) {
        current.forEach(index => squares[currentPos + index].classList.add("taken"));
        addScore();
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

    // const floor = currentPos-(currentPos%width)
    // if (current.every(index => ((currentPos+index)-floor) > width)) {
    //     console.log(currentPos, floor);
    //     currentRotation = (currentRotation - 1) % 4
    //     current = Tetrominos[currentTetromino][currentRotation];
    // }
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

function addScore() {
    for (let i = 0; i < 200; i += width) {
        const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
        if (row.every(index => squares[index].classList.contains("taken"))) {
            row.forEach(index => {
                squares[index].classList.remove("tetromino");
                squares[index].classList.remove("taken");
                squares[index].style.backgroundImage = "";
            }
            );
            score += 10;
            document.getElementById("score").innerText = `Score: ${score}`;
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        }
    }
}

function main() {
    draw();
    timer = setInterval(moveDown, 1000);
    document.addEventListener('keyup', takeAction);
}

main();