let wheelpath = document.querySelector('#wheelpath')
let wheel = document.querySelector('.wheel')
console.log(wheelpath)


const startingPoint = {
    x: 10, 
    y: 10
}

const numberOfSlices = 10;
const lineLength = 100;
const numberDistance = 136;
let incrementAngle = 2 * Math.PI / numberOfSlices
let incrementAngleDeg = 360 / numberOfSlices
wheel.style.position = 'relative'
let drawingPath = ''
let originOffset = {
    x : 100,
    y : 100
}

for(let i = 0; i < numberOfSlices; i++){
    drawingPath += `M ${originOffset.x},${originOffset.y}`
    let lineToX = Number.parseFloat((Math.cos(incrementAngle * i) * lineLength) + originOffset.x)
    let lineToY = Number.parseFloat((Math.sin(incrementAngle * i) * lineLength) + originOffset.y)

    let numToX = Number.parseFloat((Math.cos(incrementAngle * i) * numberDistance) + originOffset.x) //- (2 * (Math.PI/180)))
    let numToY = Number.parseFloat((Math.sin(incrementAngle * i) * numberDistance) + originOffset.y) //- (2 * (Math.PI/180)))

    drawingPath += `L ${lineToX},${lineToY} `

    //create the number
    let num = document.createElement('div')
    num.style.position = 'absolute'
    num.style.left = numToX - 11 + "px"
    num.style.top = numToY - 8 + "px"
    num.style.transform = `rotateY(${incrementAngleDeg}deg)`
    // num.innerText = i + 1// + ' ' + Number(incrementAngleDeg * i) + 'deg'
    num.innerHTML = Number(incrementAngleDeg * i) + '&deg;'
    num.style.fontWeight = 'bolder'
    wheel.appendChild(num)
}

console.log(drawingPath)

wheelpath.setAttribute('d',drawingPath)

const spinButton = document.querySelector('#spinbutton')
const landedOn = document.querySelector('#landedon')
let lastSpinVal = 0;
spinButton.addEventListener('click',e=>{
    let randomAngle = (Math.random() * 360 * 20) + 1
    lastSpinVal = randomAngle
    wheel.style.transform = `rotateZ(${lastSpinVal}deg)`
    while(lastSpinVal > 360){
        lastSpinVal -= 360
    }
    let finalAngle = 360 - lastSpinVal
    setTimeout(()=>{
        landedOn.innerHTML = `Landed on ${finalAngle.toFixed(2)}&deg;`
    },3000)
    console.log(`Rotating to: ${360 - lastSpinVal}`)
})