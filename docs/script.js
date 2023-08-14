const canvas = document.querySelector('.game')
const game = canvas.getContext('2d')
const message = document.querySelector('.menssage')
const restart = document.querySelector('.restart')

let faceInterval
let canvasSize
let elementSize
let posX
let posY
window.addEventListener('load', setSize)
window.addEventListener('resize', setSize)

function startGame(){
    game.font = elementSize + 'px Verdana'
    faceInterval  = setInterval(printing, 600)
}

function setSize(){
    message.classList.toggle('inactive')
    restart.classList.toggle('inactive')
    
    if(innerHeight < innerWidth){
        canvasSize = window.innerHeight * 0.3
        canvas.setAttribute('width', canvasSize)
        canvas.setAttribute('height', canvasSize)
    }else if(innerHeight > innerWidth){
        canvasSize = window.innerWidth * 0.3
        canvas.setAttribute('width', canvasSize)
        canvas.setAttribute('height', canvasSize)
    }
    elementSize = (canvasSize/10)
    game.align = 'start'
    startGame()
}
function printing(){
    posX = undefined
    posY = undefined
    game.clearRect(0,0, canvasSize,canvasSize)
    /**Creating the face */
    posY = Math.floor(Math.random() * canvasSize) + 1
    posX = Math.floor(Math.random() * canvasSize) + 1
    game.fillText('🤪', posX, posY)

}
/*transforming coords*/
function viewportToCanvas(x,y){
    const rect = canvas.getBoundingClientRect()
    return {
        x: (x - rect.left) * (canvas.width / rect.width),
        y: (y - rect.top) * (canvas.height / rect.height)
    }
}
/*adding the shooting*/
window.addEventListener("click", function(event) {
    const canvasCoords = viewportToCanvas(event.clientX, event.clientY)
    if((canvasCoords.x >= posX && canvasCoords.x <= posX + elementSize) && (canvasCoords.y >= posY - elementSize && canvasCoords.y <= posY )){
        clearInterval(faceInterval)
        game.clearRect(0,0, canvasSize,canvasSize)
        game.fillText('🥴', posX, posY)
        message.classList.toggle('inactive')
        restart.classList.toggle('inactive')
        restart.addEventListener('click', setSize)
}})


