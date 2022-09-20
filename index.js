let wheelpath = document.querySelector('#wheelpath')
let wheel = document.querySelector('.wheel')
console.log(wheelpath)


const startingPoint = {
    x: 10, 
    y: 10
}

const numberOfPeople = 10;
const lineLength = 100;
const numberDistance = 120;
let incrementAngle = 2 * Math.PI / numberOfPeople
let incrementAngleDeg = 360 / numberOfPeople
wheel.style.position = 'relative'
let drawingPath = ''
let originOffset = {
    x : 100,
    y : 100
}

let ranges = new Map()
for(let i = 0; i < numberOfPeople; i++){
    drawingPath += `M ${originOffset.x},${originOffset.y}`
    let lineToX = Number.parseFloat((Math.cos(incrementAngle * i - 1) * lineLength) + originOffset.x)
    let numToX = Number.parseFloat((Math.cos(incrementAngle * i) * numberDistance) + originOffset.x) //- (2 * (Math.PI/180)))

    let lineToY = Number.parseFloat((Math.sin(incrementAngle * i - 1) * lineLength) + originOffset.y)
    let numToY = Number.parseFloat((Math.sin(incrementAngle * i) * numberDistance) + originOffset.y) //- (2 * (Math.PI/180)))

    drawingPath += `L ${lineToX},${lineToY} `

    ranges.set(i,(360 / numberOfPeople) * (i + 1))


    //create the number
    let num = document.createElement('div')
    num.style.position = 'absolute'
    num.style.left = numToX - 2 + "px"
    num.style.top = numToY - 8 + "px"
    num.style.transform = `rotateY(${incrementAngleDeg}deg)`
    num.innerText = i + 1
    num.style.fontWeight = 'bolder'
    wheel.appendChild(num)
}

console.log(drawingPath)

//Move to starting point
//Line To ending point

wheelpath.setAttribute('d',drawingPath)

const spinButton = document.querySelector('#spinbutton')
const landedOn = document.querySelector('#landedon')
spinButton.addEventListener('click',e=>{
    console.log("Spin")
    wheel.style.animation = 'rotate 2s linear 2s infinite'
    let randomTime = (Math.random() * 25) + 5 * 1000
    console.log(randomTime)
    wheel.style.animationPlayState = 'running'
    setTimeout(()=>{
        wheel.style.animationPlayState = 'paused'
        let tr = window.getComputedStyle(wheel).transform
        if( tr !== 'none') {
            var values = tr.split('(')[1]
            values = values.split(')')[0]
            values = values.split(',')
            var a = values[0]
            var b = values[1]
            //var c = values[2]
            //var d = values[3]
            var scale = Math.sqrt(a*a + b*b)
            var radians = Math.atan2(b, a);
            if ( radians < 0 ) {
                radians += (2 * Math.PI);
            }
            var angle = Math.round( radians * (180/Math.PI));
        } else {
            var angle = 0;
        }

        console.log('Rotate: ' + angle + 'deg');
        // console.log(ranges[0])
        // for(let i = 0; i <= 360; i += (360 / numberOfPeople)){
            // if(i > angle){
                // let landed = Number.parseFloat(i / (360 / numberOfPeople))
                let landed;
                for(let j = 0; j < numberOfPeople; j++){
                    console.log(ranges.get(j))
                    console.log(angle)
                    if(angle < ranges.get(j)){
                        landed = j
                        break
                    }
                }
                // console.log(landed)
                landedOn.innerText = "Landed on " + Number(landed + 1)
                // break;
            // }
        // }
    },randomTime)
})