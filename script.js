var snake = [{ top: 0, left: 0 }];
var apple = null;
var direction = null;
var gameBoardSize = 400; // Tamaño del tablero de juego
var dotSize = 20; // Tamaño de la serpiente y la manzana

function createDot(top, left, id, color, parent) {
    var dot = document.createElement('div');
    dot.classList.add(color);
    dot.style.top = `${top}px`;
    dot.style.left = `${left}px`;
    dot.id = id;
    parent.appendChild(dot);
}

function checkCollision(dot, array) {
    for (let i = 0; i < array.length; i++) {
        if (dot.top === array[i].top && dot.left === array[i].left) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    snake = [{ top: 0, left: 0 }];
    apple = null;
    direction = null;
    document.querySelectorAll('.dot').forEach(dot => dot.remove());
    document.getElementById('apple') && document.getElementById('apple').remove();
}

function updateGame() {
    var gameBoard = document.getElementById('game-board');
    if (apple === null || apple.top === snake[0].top && apple.left === snake[0].left) {
        document.getElementById('apple') && document.getElementById('apple').remove(); // Elimina la manzana actual del DOM
        apple = { top: Math.floor(Math.random() * 20) * dotSize, left: Math.floor(Math.random() * 20) * dotSize }; // Cambiamos la generación de la posición de la manzana
        createDot(apple.top, apple.left, 'apple', 'apple', gameBoard); // Crea una nueva manzana
        var lastDot = Object.assign({}, snake[snake.length - 1]); // Copia la última dot de la serpiente
        snake.push(lastDot); // Agrega la nueva dot al final de la serpiente
    }
    gameBoard.querySelectorAll('.dot').forEach(dot => dot.remove()); // Elimina todas las dots actuales de la serpiente
    for (var i = snake.length - 1; i >= 0; i--) {
        if (i === 0) {
            if (direction === 'right') snake[i].left += dotSize;
            else if (direction === 'down') snake[i].top += dotSize;
            else if (direction === 'left') snake[i].left -= dotSize;
            else if (direction === 'up') snake[i].top -= dotSize;

            // Comprueba si la serpiente ha chocado con la pared
            if (snake[i].top < 0 || snake[i].top === gameBoardSize || snake[i].left < 0 || snake[i].left === gameBoardSize) {
                resetGame();
                return;
            }

            // Comprueba si la serpiente ha chocado consigo misma
            if (checkCollision(snake[i], snake.slice(1))) {
                resetGame();
                return;
            }
        } else {
            snake[i].top = snake[i - 1].top;
            snake[i].left = snake[i - 1].left;
        }
        createDot(snake[i].top, snake[i].left, 'dot' + i, 'dot', gameBoard);
    }
}

setInterval(updateGame, 200);

window.onkeydown = function(e) {
    if (e.key === 'ArrowUp') direction = 'up';
    else if (e.key === 'ArrowDown') direction = 'down';
    else if (e.key === 'ArrowRight') direction = 'right';
    else if (e.key === 'ArrowLeft') direction = 'left';
};

// Agrega controladores de eventos para los botones de dirección
document.getElementById('up-button').onclick = function() { direction = 'up'; };
document.getElementById('down-button').onclick = function() { direction = 'down'; };
document.getElementById('left-button').onclick = function() { direction = 'left'; };
document.getElementById('right-button').onclick = function() { direction = 'right'; };

document.getElementById('reset-button').onclick = resetGame;
