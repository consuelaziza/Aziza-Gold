let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "2px solid black";
let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");
let startPage = document.querySelector("#startPage");

let bg = new Image();
bg.src = "./images/bg.png";
let fg = new Image();
fg.src = "./images/fg.png";
let fairy = new Image();
fairy.src = "./images/aziza queen.png";
let star = new Image();
star.src = "./images/star.png";
let tree = new Image();
tree.src = "./images/tree.png";
let gold = new Image();
gold.src = "./images/gold dust.png";
let hunter = new Image();
hunter.src = "./images/hunter.png";
let intervalId = 0;
let isGameOver = false;
let fairyY = 30,
  fairyX = 30;
let starsX = 500;
let treesX = 200;
let treesY = 500;
let decTrees = 2;
let score = 0;
let falling = true;
let stars = [
  { x: starsX, y: 0 },
  { x: starsX + 300, y: -100 }
];
let trees = [
  { x: treesX, y: 0 },
  { x: treesX + 300, y: -100 }
];
function showGameOver() {
  canvas.style.display = "none";
  restartBtn.style.display = "block";
}
function draw() {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(fairy, fairyX, fairyY);
  let leftFairyBorder = fairyX;
  let rightFairyBorder = fairyX + fairy.width;
  let bottomFairyBorder = fairyY + fairy.height;
  for (let i = 0; i < trees.length; i++) {
    let gap = 200;
    ctx.drawImage(tree, trees[i].x, trees[i].y + tree.height + gap);
    trees[i].x = trees[i].x - decTrees;
    if (trees[i].x + tree.width < 0) {
      score++;
      trees[i].x = 500;
      trees[i].y = -Math.floor(Math.random() * tree.height);
    }
    let topTreeBorder = trees[i].y + tree.height + gap;
    let leftTreeBorder = trees[i].x;
    let rightTreeBorder = trees[i].x + tree.width;
    let isInBetweenTreeX =
      rightFairyBorder >= leftTreeBorder && leftFairyBorder <= rightTreeBorder;
    let isInBetweenTreeY = bottomFairyBorder >= topTreeBorder;
    if (isInBetweenTreeX && isInBetweenTreeY) {
      isGameOver = true;
    }
  }
  for (let i = 0; i < stars.length; i++) {
    ctx.drawImage(star, stars[i].x, stars[i].y);
    let bottomStarBorder = stars[i].y + star.height;
    let leftStarBorder = stars[i].x;
    let rightStarBorder = stars[i].x + star.width;
    let isInBetweenStarX =
      rightFairyBorder >= leftStarBorder && leftFairyBorder <= rightStarBorder;
    let isInBetweenStarY = bottomFairyBorder <= bottomStarBorder;
    if (isInBetweenStarX && isInBetweenStarY) {
      isGameOver = true;
    }
    stars[i].x = stars[i].x - decTrees;
    if (stars[i].x + star.width < 0) {
      score++;
      stars[i].x = 500;
      stars[i].y = -Math.floor(Math.random() * star.height);
    }
  }
  if (fairyY + fairy.height > canvas.height) {
    isGameOver = true;
  }
  if (falling) {
    fairyY = fairyY + 2;
  } else {
    fairyY = fairyY - 5;
  }
  ctx.font = "24px Helvetica";
  ctx.fillText(`Score: ${score}`, 10, 30);
  if (isGameOver) {
    cancelAnimationFrame(intervalId);
  } else {
    intervalId = requestAnimationFrame(draw);
  }
}
function handleStart() {
  draw();
  startBtn.style.display = "none";
  restartBtn.style.display = "none";
  canvas.style.display = "block";
}
window.addEventListener("load", () => {
  canvas.style.display = "none";
  restartBtn.style.display = "none";
  startPage.style.display = "none";
  document.addEventListener("mousedown", () => {
    falling = false;
  });
  document.addEventListener("mouseup", () => {
    falling = true;
  });
  startBtn.addEventListener("click", () => {
    handleStart();
  });
  restartBtn.addEventListener("click", () => {
    isGameOver = false;
    score = 0;
    handleStart();
  });
});