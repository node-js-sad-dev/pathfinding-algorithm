let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let btn = document.getElementById('btn');

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const DOT_RADIUS = 5;

const CELL_SIZE = 5;

let dotsDrawn = false;
let obstaclesDrawn = false;

let dotFrom, dotTo;

let arr = [];

for (let i = 0; i < CANVAS_WIDTH / CELL_SIZE; i++) {
    arr[i] = Array(CANVAS_HEIGHT / CELL_SIZE).fill(0);
}

btn.onclick = (e) => {
    e.preventDefault();

    if (!dotsDrawn) {
        let { startDot, finishDot } = generateStartFinishDots();

        dotFrom = startDot;
        dotTo = finishDot;

        ctx.fillStyle = 'red';
        ctx.fillRect(startDot.x * CELL_SIZE, startDot.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        ctx.fillStyle = 'red';
        ctx.fillRect(finishDot.x * CELL_SIZE, finishDot.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        dotsDrawn = true;

        btn.textContent = 'Generate obstacles';

        return;
    }

    if (dotsDrawn && !obstaclesDrawn) {
        generateObstacles();

        obstaclesDrawn = true;

        btn.textContent = 'Find Path';

        return;
    }

    if (dotsDrawn && obstaclesDrawn) {
        let path = new PathFind_v2(arr, dotFrom, dotTo).find_path();

        console.log(arr)
        console.log(path)

        drawPath(path);
    }
}

function drawPath(path) {
    if (path) {
        for (let el of path) {
            ctx.fillStyle = 'black';
            ctx.fillRect(el.x * CELL_SIZE, el.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

function calculateDistance(dotFrom, dotTo) {
    return Math.sqrt(Math.pow((dotTo.x - dotFrom.x), 2) + Math.pow((dotTo.y - dotFrom.y), 2));
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateStartFinishDots() {
    let startDot, finishDot;

    let distance = 0;

    while (distance < 20) {
        startDot = {
            x: randomNumber(DOT_RADIUS, CANVAS_WIDTH / CELL_SIZE),
            y: randomNumber(DOT_RADIUS, CANVAS_HEIGHT / CELL_SIZE)
        }

        finishDot = {
            x: randomNumber(DOT_RADIUS, CANVAS_WIDTH / CELL_SIZE),
            y: randomNumber(DOT_RADIUS, CANVAS_HEIGHT / CELL_SIZE)
        }

        distance = calculateDistance(startDot, finishDot);
    }

    return {
        startDot, finishDot
    }
}

function generateObstacles() {
    // find x and y cords in middle of start and finish dot
    let middleX = Math.floor((dotTo.x + dotFrom.x) / 2);
    let middleY = Math.floor((dotTo.y + dotFrom.y) / 2);

    let yFrom, yTo, xFrom, xTo;

    if ((middleY - 1) > 0) yFrom = middleY - 1;
    else yFrom = 0;

    if ((middleY + 1) < CANVAS_HEIGHT / CELL_SIZE) yTo = middleY + 1;
    else yTo = CANVAS_HEIGHT / CELL_SIZE;

    if ((middleX - 6) > 0) xFrom = middleX - 6;
    else xFrom = 0;

    if ((middleX + 6) < CANVAS_WIDTH / CELL_SIZE) xTo = middleX + 6;
    else xTo = CANVAS_WIDTH / CELL_SIZE;

    if (xFrom > xTo) {
        let temp = xTo;

        xTo = xFrom;
        xFrom = temp;
    }

    if (yFrom > yTo) {
        let temp = yTo;

        yTo = yFrom;
        yFrom = temp;
    }

    for (let i = xFrom; i < xTo; i++) {
        for (let j = yFrom; j < yTo; j++) {
            console.log(arr[i][j])
            ctx.fillStyle = 'blue';
            ctx.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            arr[i][j] = -1;
        }
    }
}
