const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.querySelector('.up')
const btnDown = document.querySelector('.down')
const btnLeft = document.querySelector('.left')
const btnRight = document.querySelector('.right')
const liveSpan = document.querySelector('.lives')
const timeSpan = document.querySelector('.time')
const recordSpan = document.querySelector('.record')
const resultP = document.querySelector('.result')
const btnReset = document.querySelector('.reset')

let canvasSize
let elementSize
let level = 0
let enemyPositions = []
let lives = 3
let timeStart
let timePlayer = Date.now() - timeStart
let timeInterval
let playerPosition ={
    x: undefined,
    y: undefined
}

const giftPosition = {
    x : undefined,
    y : undefined
}


window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
btnReset.addEventListener('click', gameReset)

function startGame(){

    game.font = elementSize + 'px Verdana'
    game.textAlign = 'end'
    
    const map = maps[level]
    
    if(!map) {
        gameWin()
        return
    }
    if (!timeStart){
        timeStart = Date.now()
        timeInterval = setInterval(showTime, 100)
    }
    enemyPositions = []
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))
    showLives()

    game.clearRect(0,0,canvasSize,canvasSize)

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementSize * (colI + 1)
            const posY = elementSize * (rowI+ 1)

            
            if (col == 'O'){
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX
                    playerPosition.y = posY
                }
            }else if (col == 'I'){
                giftPosition.x = posX,
                giftPosition.y = posY
            }else if (col == 'X') {
                enemyPositions.push({
                    x : posX,
                    y : posY
                })
        }
            game.fillText(emoji, posX, posY)
        })
        
    });
    console.log(playerPosition)
    movePlayer()
    showTime()
    showRecord()
}
function setCanvasSize () {
    if ( window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7
        canvas.setAttribute('width',canvasSize )
        canvas.setAttribute('height', canvasSize)
    } else if( window.innerHeight < window.innerWidth ){
        canvasSize = window.innerHeight * 0.7
        canvas.setAttribute('width',canvasSize)
        canvas.setAttribute('height', canvasSize)
    }
    canvasSize = Number(canvasSize.toFixed(0))
    elementSize = (canvasSize / 10)
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3)
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3)
    const giftColision = giftCollisionY && giftCollisionX
    if(giftColision){
        console.log('subiste de nivel')
        levelUp()
    }
    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
      });
      
      if (enemyCollision) {
        levelFail();
      }
    game.fillText(emojis['PLAYER'], playerPosition.x,playerPosition.y)
}
function levelUp(){
    level++
    
    startGame()
}
function levelFail(){
    lives--
    if(lives <= 0){
        level = 0
        lives = 3
        timeStart = undefined
    }
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function showLives(){
    const heartArray = Array(lives).fill(emojis['HEART'])
    liveSpan.innerHTML = ""
    heartArray.forEach(heart => liveSpan.append(heart))
    
}
function showTime(){
    timeSpan.textContent = Date.now() - timeStart
}
function gameWin () {
    clearInterval(timeInterval)
    console.log('entro clearInterval')
    const recordTime = localStorage.getItem('record_time')
    const playerTime = Date.now() - timeStart 
    if (recordTime) {
        if(recordTime >= playerTime){
            localStorage.setItem('record_time', playerTime)
            resultP.textContent = 'SUPERASTE EL RECORD'
        } else{
            resultP.textContent = 'No superaste el record'
        } 
    }else{
        localStorage.setItem('record_time', playerTime)
        resultP.textContent = 'PRIMERA MARCA'
    }
}
function showRecord(){
    recordSpan.textContent = localStorage.getItem('record_time')
}
function gameReset(){
    lives = 3
    level = 0
    timeStart = undefined
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}
btnDown.addEventListener('click',moveDown)
btnLeft.addEventListener('click',moveLeft)
btnRight.addEventListener('click',moveRight)
btnUp.addEventListener('click',moveUp)

window.addEventListener("keydown", moveKeys);

function moveKeys(arrow) {
    if (arrow.key === "ArrowLeft") {
      moveLeft()
    } else if (arrow.key === "ArrowUp") {
      moveUp()
    } else if (arrow.key === "ArrowRight") {
        moveRight()
    } else if (arrow.key === "ArrowDown") {
        moveDown()
    }
  }

  function moveUp() {
  
    if ((playerPosition.y - elementSize) < elementSize) {
      
    } else {
      playerPosition.y -= elementSize;
      startGame();
    }
  }
  function moveLeft() {
    if ((playerPosition.x - elementSize) < elementSize) {
      
    } else {
      playerPosition.x -= elementSize;
      startGame();
    }
  }
  function moveRight() {
    if ((playerPosition.x + elementSize) > canvasSize) {
      
    } else {
      playerPosition.x += elementSize;
      startGame();
    }
  }
  function moveDown() {
    if ((playerPosition.y + elementSize) > canvasSize) {
      
    } else {
      playerPosition.y += elementSize;
      startGame();
    }
  }
