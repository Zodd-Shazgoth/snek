const canvas = document.querySelector('.game-canvas');
const context = canvas.getContext('2d');
const background = document.querySelector('.game-wrapper');
const scoreBlock = document.querySelector('.game-score .score-count');
const gameOver = document.querySelector('.game-over');
const berry = new Image();
berry.src = 'berry.svg';

let blockSize = 32;
let scoreCount = 0;

let berrySpawn = {
    x: Math.floor(Math.random() * 21) * blockSize,
    y: Math.floor(Math.random() * 21) * blockSize,
};

let snake = [];
snake[0] = {
    x: 10 * blockSize,
    y: 10 * blockSize,
};

document.addEventListener('keydown', direction);

let movement;

function direction(event) {
    if ((event.keyCode === 87 || event.keyCode === 38) && movement != 'down')
        movement = 'up';
    else if ((event.keyCode === 83 || event.keyCode === 40) && movement != 'up')
        movement = 'down';
    else if ((event.keyCode === 65 || event.keyCode === 37) && movement != 'right')
        movement = 'left';
    else if ((event.keyCode === 68 || event.keyCode === 39) && movement != 'left')
        movement = 'right';
}

function tailBite(hd, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (hd.x === arr[i].x && hd.y === arr[i].y) {
            gameover();
        }
    }
}
function reload() {
    document.location.reload();
}
function gameover() {
    clearInterval(game);
    gameOver.style = 'display: block';
    document.querySelector('.retry').addEventListener('click', reload);
}

function gameDraw() {
    context.clearRect(0, 0, 672, 672);
    context.drawImage(berry, berrySpawn.x, berrySpawn.y);
    context.fillText = scoreBlock.textContent = 'SCORE: ' + scoreCount;

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle =
            i === 0 ? 'rgba(188, 24, 210, 1' : 'rgba(188, 24, 210, 0.6';
        context.fillRect(snake[i].x, snake[i].y, blockSize, blockSize);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX < 0) {
        snakeX = canvas.width - blockSize;
    } else if (snakeX >= canvas.width) {
        snakeX = 0;
    }

    if (snakeY < 0) {
        snakeY = canvas.height - blockSize;
    } else if (snakeY >= canvas.height) {
        snakeY = 0;
    }

    if (snakeX === berrySpawn.x && snakeY === berrySpawn.y) {
        scoreCount++;
        berrySpawn = {
            x: Math.floor(Math.random() * 21) * blockSize,
            y: Math.floor(Math.random() * 21) * blockSize,
        };
        if (scoreCount >= '2') {
            clearInterval(game);
            game = setInterval(gameDraw, 90);
        }
        if (scoreCount >= '4') {
            clearInterval(game);
            game = setInterval(gameDraw, 80);
        }
        if (scoreCount >= '6') {
            clearInterval(game);
            game = setInterval(gameDraw, 70);
        }
        if (scoreCount >= '8') {
            clearInterval(game);
            game = setInterval(gameDraw, 60);
        }
        if (scoreCount >= '10') {
            clearInterval(game);
            game = setInterval(gameDraw, 50);
        }
        if (scoreCount > '12') {
            clearInterval(game);
            game = setInterval(gameDraw, 40);
        }
    } else snake.pop();

    if (movement === 'up') snakeY -= blockSize;
    if (movement === 'down') snakeY += blockSize;
    if (movement === 'left') snakeX -= blockSize;
    if (movement === 'right') snakeX += blockSize;

    let head = {
        x: snakeX,
        y: snakeY,
    };

    tailBite(head, snake);

    snake.unshift(head);
}

let game = setInterval(gameDraw, 100);
