let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';


let bg = new Image();
bg.src = './images/bg.png';

let fg = new Image();
fg.src = './images/fg.png';

let fairy = new Image();
fairy.src = './images/aziza queen.png'

let stars = new Image();
stars.src = './images/star.png'

let trees = new Image();
trees.src = './images/tree.png'

let gold = new Image();
gold.src = './images/gold dust.png'

let intervalId = 0;
let isGameOver = false;
let fairyY = 30, fairyX = 30
let foregroundY = canvas.height - fg.height
//let pipeX = 200
let decTrees = 2
let score = 0;
let falling = true;




let trees = [
    {x: treesX, y: 0},
    {x: treesX + 300, y: -100},
]

function draw(){

    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(fairy, fairyX, fairyY)

    
    for(let i=0; i<trees.length; i++ ) {
        let gap = 100
        ctx.drawImage(stars, stars[i].x, stars[i].y)
        ctx.drawImage(trees, trees[i].x, trees[i].y + stars.height + gap)

        
        //pipes[i].x = pipes[i].x - decPipe

        
        if(pipes[i].x + stars.width < 0 ) {
            pipes[i].x = 500
            pipes[i].y = -Math.floor(Math.random() * stars.height)
        }

        
        //if (fairyX == trees[i].x +  stars.width) {
          //  score++
        //}

        
        //if(fairyX +fairy.width >= pipes[i].x && fairyX <= pipes[i].x + 
          //  stars.width && (fairyY <= pipes[i].y + stars.height || 
           //+fairy.height >= pipes[i].y + stars.height + gap)){
//isGameOver = true 
            }
         
        
    }

    
    if (fairyY +fairy.height > foregroundY) {
        isGameOver = true
    }

  
    if (falling) {
       fairyY =fairyY + 2
    }
    else {
       fairyY =fairyY - 5
    }
    
    ctx.drawImage(fg, 0, foregroundY)
    ctx.font = '24px Verdana'
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