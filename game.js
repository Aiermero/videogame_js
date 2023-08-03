const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

let canvasSize
let elementSize

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function startGame(){

    game.font = elementSize + 'px Verndana'
    game.textAlign = 'end'
    for (let i = 1; i <= 10; i++) {
        for (let ii = 1; ii <= 10; ii++) {
            game.fillText(emojis['X'], elementSize * i, elementSize * ii)
            game.fillText(emojis['X'], elementSize * ii, elementSize * i)
        }
    }
    

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