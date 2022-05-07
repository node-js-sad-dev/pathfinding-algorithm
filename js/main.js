let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let btn = document.getElementById('btn');

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const DOT_RADIUS = 5;

const CELL_SIZE = 2;
const MILLI = 10;
const MIN_DIST = 200;
const X_RANGE = 75;
const Y_RANGE = 4;

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
        ctx.fillRect(startDot.x * CELL_SIZE, startDot.y * CELL_SIZE, DOT_RADIUS, DOT_RADIUS);

        ctx.fillStyle = 'red';
        ctx.fillRect(finishDot.x * CELL_SIZE, finishDot.y * CELL_SIZE, DOT_RADIUS, DOT_RADIUS);

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
        let i = 0;

        let interval = setInterval(() => {
            if (i === path.length) {
                clearInterval(interval);
            } else {
                ctx.fillStyle = 'black';
                ctx.fillRect(path[i].x * CELL_SIZE, path[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                i++;
            }
        }, MILLI);

    } else {
        btn.textContent = 'No possible way to connect 2 dots!'
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

    while (distance < MIN_DIST) {
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

    if ((middleY - Y_RANGE) > 0) yFrom = middleY - Y_RANGE;
    else yFrom = 0;

    if ((middleY + Y_RANGE) < CANVAS_HEIGHT / CELL_SIZE) yTo = middleY + Y_RANGE;
    else yTo = CANVAS_HEIGHT / CELL_SIZE;

    if ((middleX - X_RANGE) > 0) xFrom = middleX - X_RANGE;
    else xFrom = 0;

    if ((middleX + X_RANGE) < CANVAS_WIDTH / CELL_SIZE) xTo = middleX + X_RANGE;
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
            ctx.fillStyle = 'red';
            ctx.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            arr[i][j] = -1;
        }
    }
}
