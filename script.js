const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let basket = { x: 160, y: 450, width: 80, height: 20 };
let ball = { x: Math.random() * 380, y: 0, radius: 10, dy: 2 };
let score = 0;
let lives = 3;
let rightPressed = false;
let leftPressed = false;
let gameOver = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
  else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
  else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

function drawBasket() {
  ctx.beginPath();
  ctx.rect(basket.x, basket.y, basket.width, basket.height);
  ctx.fillStyle = "#0077ff";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#ff4500";
  ctx.fill();
  ctx.closePath();
}

function resetGame() {
  // reset everything for a new game
  score = 0;
  lives = 3;
  ball = { x: Math.random() * 380, y: 0, radius: 10, dy: 2 };
  basket = { x: 160, y: 450, width: 80, height: 20 };
  document.getElementById("score").innerText = "Score: " + score;
  gameOver = false;
  draw();
}

function draw() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBasket();
  drawBall();

  if (rightPressed && basket.x < canvas.width - basket.width) basket.x += 5;
  else if (leftPressed && basket.x > 0) basket.x -= 5;

  ball.y += ball.dy;

  if (ball.y + ball.radius > basket.y && ball.x > basket.x && ball.x < basket.x + basket.width) {
    score++;
    ball.y = 0;
    ball.x = Math.random() * 380;
    ball.dy += 0.2;
    document.getElementById("score").innerText = "Score: " + score;
  }

  if (ball.y > canvas.height) {
    lives--;
    if (lives <= 0) {
      gameOver = true;
      setTimeout(() => {
        alert("Game Over! Your Score: " + score);
        resetGame(); // restart cleanly
      }, 100);
      return;
    } else {
      ball.y = 0;
      ball.x = Math.random() * 380;
    }
  }

  requestAnimationFrame(draw);
}

draw();
