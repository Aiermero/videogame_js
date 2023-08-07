const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.querySelector('.up')
const btnDown = document.querySelector('.down')
const btnLeft = document.querySelector('.left')
const btnRight = document.querySelector('.right')

let canvasSize
let elementSize
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

function startGame(){

    game.font = elementSize + 'px Verdana'
    game.textAlign = 'end'

    const map = maps[0]
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))

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
            }else if (
                giftPosition.x = posX,
                giftPosition.y = posY
            )
            game.fillText(emoji, posX, posY)
        })
    });
    console.log(playerPosition)
    movePlayer()
}
function setCanvasSize () {
    if ( window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.5
        canvas.setAttribute('width',canvasSize )
        canvas.setAttribute('height', canvasSize)
    } else if( window.innerHeight < window.innerWidth ){
        canvasSize = window.innerHeight * 0.5
        canvas.setAttribute('width',canvasSize)
        canvas.setAttribute('height', canvasSize)
    }
    elementSize = (canvasSize / 10)
    startGame()
}

function movePlayer() {
    const giftPositionX = playerPosition.x.toFixed(3) == playerPosition.x.toFixed(3)
    const giftPositionY = playerPosition.y.toFixed(3) == playerPosition.y.toFixed(3)
    const giftColision = giftPositionY && giftPositionX
    if(giftColision){

    }
    game.fillText(emojis['PLAYER'], playerPosition.x,playerPosition.y)
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

function moveDown(){
    if ((playerPosition.y + elementSize) > canvasSize) {
        game.fillText(emojis['PLAYER'], playerPosition.x,playerPosition.y)
    }else{
    game.fillText(emojis['PLAYER'], playerPosition.x,playerPosition.y += elementSize)}
    startGame()
}
function moveLeft(){
    if ((playerPosition.x - elementSize)  <= elementSize) {
        game.fillText(emojis['PLAYER'], playerPosition.x,playerPosition.y)
    }else{
    game.fillText(emojis['PLAYER'], playerPosition.x -= elementSize,playerPosition.y)}
    startGame()
}
function moveRight(){
    if ((playerPosition.x + elementSize) > canvasSize) {
        game.fillText(emojis['PLAYER'], playerPosition.x,playerPosition.y)
    }else{
    game.fillText(emojis['PLAYER'], playerPosition.x += elementSize,playerPosition.y)}
    startGame()
}
function moveUp(){
    if ((playerPosition.y - elementSize) < elementSize) {
        game.fillText(emojis['PLAYER'], playerPosition.x,playerPosition.y)
    }else{game.fillText(emojis['PLAYER'], playerPosition.x,playerPosition.y -= elementSize)}
    
    startGame()
}