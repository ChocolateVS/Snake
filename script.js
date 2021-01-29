function id(id) { return document.getElementById(id); }

let scr = id("score");
let canvas = id("canvas");
let snake = [];
let score = 0;
let gameSpeed = 100;
let boardW = 40;
let boardH = 30;
let cellSize = 20;
let speed = 0;
let cells = boardH * boardW;
let startCell = [(boardW/2) * cellSize, (boardH/2) * cellSize];
let apple = {};
let dx = 1;
let dy = 0;
let req;
let paused = false;

canvas.width = cellSize * boardW;
canvas.height = cellSize * boardH;

let width = canvas.width;
let height = canvas.height;

let c = canvas.getContext("2d");

let count = 0;
let countTo = 10;

function start() {
    cancelAnimationFrame(req);
    snake = [startCell];
    score = 0;
    count = 0;
    dx = 1;
    dy = 0;
    scr.innerHTML = score;
    getApple();
    animate();
}



function animate() {
    speed = score;
    countTo = Math.round(10 - (speed * (score/100)));
    console.log(countTo);
    req = requestAnimationFrame(animate);
    c.clearRect(0, 0, width, height);
    c.fillStyle = "rgba(0, 0, 0, 0)";
    c.fillRect(0, 0, width, height);
    count++;
    if (count == countTo) {
        move();
        if (snake[0][0] == apple.x && snake[0][1] == apple.y) {
            score += 1;
            scr.innerHTML = score;
            let x = snake[snake.length - 1][0] - (cellSize * dx);
            let y = snake[snake.length - 1][1] - (cellSize * dy);
            snake.push([x, y]);
            getApple();
        }
        if (snake[0][0] < 0 || snake[0][0] + cellSize > width || snake[0][1] < 0 || snake[0][1] + cellSize > height) {
            let msg = deathMsg();
            death(msg);
        }
        for (let i = 1; i < snake.length; i++) {
            if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {   
                let msg = deathMsg();
                death(msg);
            }
        }
        count = 0;
    } 
    draw();
}

function move() {
    let x;
    let y;
    x = snake[0][0] + (dx * cellSize);
    y = snake[0][1] + (dy * cellSize); 
    snake.unshift([x, y]);
    snake.pop();
    //console.log(snake);
}

function draw() {
    for (let i = 0; i < snake.length; i++) {
        let x = snake[i][0];
        let y = snake[i][1];
        c.fillStyle = "lightgreen";
        c.fillRect(x, y, cellSize, cellSize);
        if (i == 0) {
            c.fillStyle = "black";
            if (dx == -1 || dy == -1) {
                c.fillRect(x + 3, y + 3, cellSize / 4, cellSize / 4);
            }
            if (dx == 1 || dy == -1) {
                c.fillRect(x + 12, y + 3, cellSize / 4, cellSize / 4);
            }
            if (dx == -1 || dy == 1) {
                c.fillRect(x + 3, y + 12, cellSize / 4, cellSize / 4);
            }
            if (dx == 1 || dy == 1) {
                c.fillRect(x + 12, y + 12, cellSize / 4, cellSize / 4);
            }
        }
    }
    c.fillStyle = "red";
    c.fillRect(apple.x, apple.y, cellSize, cellSize);
}

function getApple () {
    apple.x = Math.floor(Math.random() * boardW) * cellSize;
    apple.y = Math.floor(Math.random() * boardH) * cellSize;
}

document.addEventListener("keydown", keyPress);

function keyPress(e) {
    if (e.keyCode == 82) { //RESTART
        start();
    }
    if (e.keyCode == 80) { //PAUSE
        pause();
    }
    if (e.keyCode == 87 || e.keyCode == 38) { //UP
        if (snake.length == 1 || dy != 1 && snake.length > 1) {
            dy = -1;
            dx = 0;   
        }
    }
    if (e.keyCode == 65 || e.keyCode == 37) { //LEFT
        if (snake.length == 1 || dx != 1 && snake.length > 1) {
            dy = 0;
            dx = -1;
        }
    }
    if (e.keyCode == 68 || e.keyCode == 39) { //RIGHT
        if (snake.length == 1 || dx != -1 && snake.length > 1) {
            dy = 0;
            dx = 1;
        }
    }
    if (e.keyCode == 83 || e.keyCode == 40) { //DOWN
        if (snake.length == 1 || dy != -1 && snake.length > 1) {
            dy = 1;
            dx = 0;
        }
    }
}

function pause() {
    if (!paused) {
        cancelAnimationFrame(req);
        paused = true;
    }
    else {
        req = requestAnimationFrame(animate);
        paused = false;
    }
}

function death(message) {
    cancelAnimationFrame(req);
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(0, 0, width, height);
    c.font = "20px monospace";
    c.fillStyle = "lightgreen";
    c.textAlign = "center";
    c.fillText(message + ", Score: " + score, width / 2, height / 2);
}

let any = [
    "U NEED HELP??? 0800 543 354",
    "NOT GG",
    "USELESS",
    "ABRADADECOBRA",
    "UR HISSSSSSSSSTERICALLY BAD",
    "ROBOT LAUGHING NOISES *&%$E$%^&*",
    "DEAD",
    "HAHAHA",
    ":)-",
    "DEATH BY IDIOCRACY NEAR WALLS", 
    "BONK",
    "SORE HEAD?",
]
function deathMsg() {
    let msg = Math.floor(Math.random() * any.length);
    return any[msg];
}