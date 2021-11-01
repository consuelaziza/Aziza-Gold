let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';


let bg = new Image();
bg.src = './images/bg.png';

let fg = new Image();
fg.src = './images/fg.png';

let fairy = new Image();
fairy.src = './images/aziza queen.png'

let star = new Image();
stars.src = './images/star.png'

let tree = new Image();
tree.src = './images/tree.png'

let gold = new Image();
gold.src = './images/gold dust.png'

let hunter = new Image();
hunter.src = './images/hunter.png'

let intervalId = 0;
let isGameOver = false;
let fairyY = 30, fairyX = 30
let foregroundY = canvas.height - fg.height
let starsX = 0
let treesX = 200
let decTrees = 2
let score = 0;
let falling = true;

let stars = [
    {x: starsX, y: 0},
    {x: starsX + 300, y: -100}
]


let trees = [
    {x: treesX, y: 0},
    {x: treesX + 300, y: -100}
]

function draw(){

    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(fairy, fairyX, fairyY)

    
    for(let i=0; i<trees.length; i++ ) {
        let gap = 100
        
        ctx.drawImage(tree, trees[i].x, trees[i].y + tree.height + gap)

        
        trees[i].x = trees[i].x - decTrees

        
        if(trees[i].x + tree.width < 0 ) {
            trees[i].x = 500
            trees[i].y = -Math.floor(Math.random() * tree.height)
        }

        
        
        if (fairyX == trees[i].x + stars.width) {
            score++
        }

        
        if(fairyX + fairy.width >= trees[i].x && fairyX <= trees[i].x + 
            stars.width && (fairyY <= pipes[i].y + stars.height || 
           + fairy.height >= trees[i].y + stars.height + gap)){

         isGameOver = true 
            }
         
        
    }

    /*for(let i=0; i < stars.length; i++ ) {

        ctx.drawImage(star, stars[i].x, stars[i].y)
    }*/

    
    if (fairyY + fairy.height > foregroundY) {
        isGameOver = true
    }

  
    if (falling) {
       fairyY = fairyY + 2
    }
    else {
       fairyY = fairyY - 5
    }
    
    ctx.drawImage(fg, 0, foregroundY)
    ctx.font = '24px Helvetica'
    ctx.fillText(`Score: ${score}`, 30, canvas.height - 70 )


    if (isGameOver) {
       
        cancelAnimationFrame(intervalId)

    }
    else {
        intervalId = requestAnimationFrame(draw)
    }
    
}

window.addEventListener('load', () => {
    draw()

    document.addEventListener('mousedown', () => {
        falling = false
       
    })
    document.addEventListener('mouseup', () => {
        falling = true
    })
    
})