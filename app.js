var canvas;
var ctx;

var direction = 1;

var head;
var body = [];

var lastX;
var lastY;

var food;

var gameLoop;

window.onload = function(){
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');

    head = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
    }

    food = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
    }

    while (food.x === head.x && food.y === head.y){
        food = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
        }
    }

    setupInputs();

    gameLoop = setInterval(step, 1000/8);
}

function step() {

    if (body.length === 0) {
        lastX = head.x;
        lastY = head.y;
    } else {
        lastX = [body.length - 1].x;
        lastY = [body.length - 1].y;
    }

// Move Body
    for (let i = body.length - 1 ; i > 0; i--) {
        body[i].x = body[i - 1].x;
        body[i].y = body[i - 1].y;
    }
    if (body.length !== 0) {
        body[0].x = head.x;
        body[0].y = head.y;
    }

// Move Head
    if (direction === 0) {
        head.y --;
    } else if (direction === 1) {
        head.x ++;
    } else if (direction === 2) {
        head.y ++;
    } else if (direction === 3) {
        head.x --;
    }
    

// Wrap
    if (head.x === 20) {
        head.x = 0;
    } else if (head.x === -1) {
        head.x = 19;
    }

    if (head.y === 20) {
        head.y = 0;
    } else if (head.y === -1) {
        head.y = 19;
    }


// Add to Body
    let newBody = {
        x: lastX,
        y: lastY,
    }
    if (head.x === food.x && head.y === food.y) {
        food.x = Math.floor(Math.random() * 20);
        food.y = Math.floor(Math.random() * 20);
        body.push(newBody)
    }

    for (let i = 0; i < body.length; i++) {
        if (body[i].x === head.x && body[i].y === head.y) {
            clearTimeout(gameLoop);
        }
    }
 
    draw();
}

function draw() {
    ctx.fillStyle = 'gray';
    ctx.fillRect (0,0,500,500);

    // Draw Head
    ctx.fillStyle = 'green';
    ctx.fillRect(head.x * 25, head.y * 25, 25, 25);

    // Draw Body
    for (let i = 0; i < body.length; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(body[i].x * 25, body[i].y * 25, 25, 25);
    }
    
    // Draw Food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 25, food.y * 25, 25, 25);
}

function setupInputs() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'w' || event.key === 'ArrowUp'){
            if (!(body.length > 1 && direction === 2)) {
                direction = 0;
            }
        } else if (event.key === 'a' || event.key === 'ArrowRight') {
            if (!(body.length > 1 && direction === 3)) {
                direction = 1;
            }
        } else if (event.key === 's' || event.key === 'ArrowDown') {
            if (!(body.length > 1 && direction === 0)) {
                direction = 2;
            }
        } else if (event.key === 'd' || event.key === 'ArrowLeft') {
            if (!(body.length > 1 && direction === 1)) {
                direction = 3;
            }
        }
    });
}