let playButton = document.getElementById("playButton")
let pauseButton = document.getElementById("pauseButton")
let resumeButton = document.getElementById("resumeButton")
let resetButton = document.getElementById("resetButton")

let gameContainer = document.getElementById("gameContainer")

let dragon = document.getElementById("dragon")
let dino = document.getElementById("dino")

let scoreText = document.getElementById("scoreText")
let gameOverText = document.getElementById("gameOverText")

let ground1 = document.getElementById("ground1")
let ground2 = document.getElementById("ground2")

let horizontalFire = document.getElementById("horizontalFire")
let verticalFire = document.getElementById("verticalFire")

let clouds = [document.getElementById("cloud1"), document.getElementById("cloud2"), document.getElementById("cloud3"), document.getElementById("cloud4")]

let isGameRunning = false
let score = 0
let dragonTopPositions = ["350px", "325px", "375px", "275px", "250px", "225px", "200px", "150px"]
let limit = dragonTopPositions.length

playButton.addEventListener("click", function() {
    dino.src = "static/graphics/runningDino.gif"
    dino.style.display = "inline"

    // reset animation for dragon
    dragon.style.width = "300px"
    dragon.style.animation = "none"
    dragon.offsetLeft
    dragon.style.animation = `slide 2s linear ${5 + Math.floor(Math.random() * 6)}s infinite`
    dragon.style.animationPlayState = "running"
    dragon.style.top = dragonTopPositions[Math.floor(Math.random() * limit)]

    // reset animation for clouds
    let counter = 0
    clouds.forEach((cloud) => {
        cloud.style.animation = "none"
        cloud.offsetLeft
        cloud.style.animation = `cloudMovement 30s linear ${counter}s infinite`
        counter += 10
        cloud.style.animationPlayState = "running"
    })

    gameOverText.style.opacity = 0
    playButton.style.display = "none"
    pauseButton.style.display = "inline"
    resetButton.style.display = "inline"
    scoreText.style.display = "inline"

    let fireResetPos = 3000 + Math.floor(Math.random() * 1000)
    horizontalFire.style.left = `${fireResetPos}px`
    verticalFire.style.left = `${fireResetPos + 500}px`

    isGameRunning = true
    score = 0

    if (playButton.textContent == "Play") {
        setInterval(gameOver, 10)
        setInterval(randomizedragon, 10)
        setInterval(delayCloud1, 10)
        setInterval(scoreKeeper, 100)
    }

    requestAnimationFrame(groundAnimation)
    requestAnimationFrame(horizontalFireController)
    requestAnimationFrame(verticalFireController)
})

pauseButton.addEventListener("click", function() {
    dragon.style.animationPlayState = "paused"

    clouds.forEach((cloud) => {
        cloud.style.animationPlayState = "paused"
    })

    pauseButton.style.display = "none"
    resumeButton.style.display = "inline"

    dino.src = "static/graphics/standingDino.gif"

    isGameRunning = false
})

resumeButton.addEventListener("click", function() {
    dragon.style.animationPlayState = "running"

    clouds.forEach((cloud) => {
        cloud.style.animationPlayState = "running"
    })

    pauseButton.style.display = "inline"
    resumeButton.style.display = "none"

    dino.src = "static/graphics/runningDino.gif"

    isGameRunning = true

    requestAnimationFrame(groundAnimation)
    requestAnimationFrame(horizontalFireController)
    requestAnimationFrame(verticalFireController)
})

resetButton.addEventListener("click", function() {
    dino.style.display = "inline"
    dino.src = "static/graphics/standingDino.gif"

    // reset animation for dragon
    dragon.style.width = "300px"
    dragon.style.animation = "none"
    dragon.offsetLeft
    dragon.style.animation = `slide 2s linear ${5 + Math.floor(Math.random() * 6)}s infinite`
    dragon.style.animationPlayState = "paused"
    dragon.style.top = dragonTopPositions[Math.floor(Math.random() * limit)]
    
    // reset animation for clouds
    let counter = 0
    clouds.forEach((cloud) => {
        cloud.style.animation = "none"
        cloud.offsetLeft
        cloud.style.animation = `cloudMovement 30s linear ${counter}s infinite`
        counter += 10
        cloud.style.animationPlayState = "paused"
    })

    gameOverText.style.opacity = 0
    playButton.style.display = "inline"
    pauseButton.style.display = "none"
    resumeButton.style.display = "none"
    resetButton.style.display = "none"

    let fireResetPos = 3000 + Math.floor(Math.random() * 1000)
    horizontalFire.style.left = `${fireResetPos}px`
    verticalFire.style.left = `${fireResetPos + 500}px`

    score = 0
    scoreText.textContent = `Score: ${score}`
    isGameRunning = false
})

document.addEventListener("keydown", jumpKey);
gameContainer.addEventListener("touchstart", jumpTouch);
function jumpKey(event) {
    if (dino.classList == "animate" || !isGameRunning) {
        return
    }

    if (event.key === "ArrowUp" || event.key === " " || event.key === "w" || event.key === "W") {
        dino.src = "static/graphics/standingDino.gif"
        dino.classList.add("animate")
        setTimeout(removeJump, 480)
    }
}
function jumpTouch(event) {
    if (dino.classList == "animate" || !isGameRunning || event.target == pauseButton || event.target == resetButton) {
        return
    }
    dino.src = "static/graphics/standingDino.gif"
    dino.classList.add("animate")
    setTimeout(removeJump, 480)
}
function removeJump() {
    dino.classList.remove("animate")
    if (isGameRunning) {
        dino.src = "static/graphics/runningDino.gif"
    }
}

function gameOver() {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
    let dinoLeft = parseInt(window.getComputedStyle(dino).getPropertyValue("left"))
    let dinoWidth = parseInt(window.getComputedStyle(dino).getPropertyValue("width"))
    let dinoHeight = parseInt(window.getComputedStyle(dino).getPropertyValue("height"))

    let dragonTop = parseInt(window.getComputedStyle(dragon).getPropertyValue("top"))
    let dragonLeft = parseInt(window.getComputedStyle(dragon).getPropertyValue("left"))
    let dragonHeight = parseInt(window.getComputedStyle(dragon).getPropertyValue("height"))

    let horizontalFireTop = parseInt(window.getComputedStyle(horizontalFire).getPropertyValue("top"))
    let horizontalFireLeft = parseInt(window.getComputedStyle(horizontalFire).getPropertyValue("left"))
    let horizontalFireWidth = parseInt(window.getComputedStyle(horizontalFire).getPropertyValue("width"))

    let verticalFireTop = parseInt(window.getComputedStyle(verticalFire).getPropertyValue("top"))
    let verticalFireLeft = parseInt(window.getComputedStyle(verticalFire).getPropertyValue("left"))
    let verticalFireWidth = parseInt(window.getComputedStyle(verticalFire).getPropertyValue("width"))

    // collision with dragon
    if (isGameRunning && dragonLeft < (dinoLeft + dinoWidth - 20) && dragonLeft > (dinoLeft + 70) && (dragonTop + dragonHeight) > (dinoTop + 80)
        && dragonTop < (dinoTop + dinoHeight)) {

        dragon.style.animationPlayState = "paused"

        clouds.forEach((cloud) => {
            cloud.style.animationPlayState = "paused"
        })

        playButton.style.display = "inline"
        playButton.textContent = "Play Again"
        gameOverText.style.opacity = 1
        pauseButton.style.display = "none"

        isGameRunning = false
        score = 0

        dragon.style.width = "400px"
        dragon.style.top = `${dragonTop - 100}px`
        dino.style.display = "none"

        screenShake()
        return
    }
    // collision with horizontalFire
    if (isGameRunning && (dinoTop + dinoHeight) >= horizontalFireTop && (horizontalFireLeft + horizontalFireWidth) >= (dinoLeft + 250) &&
        horizontalFireLeft <= (dinoLeft + dinoWidth - 20)) {
        dragon.style.animationPlayState = "paused"

        clouds.forEach((cloud) => {
            cloud.style.animationPlayState = "paused"
        })

        playButton.style.display = "inline"
        playButton.textContent = "Play Again"
        gameOverText.style.opacity = 1
        pauseButton.style.display = "none"

        dino.src = "static/graphics/standingDino.gif"

        isGameRunning = false
        score = 0
        screenShake()
        return
    }
    // collsion with verticalFire
    if (isGameRunning && (dinoTop + dinoHeight) >= verticalFireTop && (verticalFireLeft + verticalFireWidth) >= (dinoLeft + 120) &&
        verticalFireLeft <= (dinoLeft + dinoWidth - 30)) {
        dragon.style.animationPlayState = "paused";

        clouds.forEach((cloud) => {
            cloud.style.animationPlayState = "paused"
        })

        playButton.style.display = "inline"
        playButton.textContent = "Play Again"
        gameOverText.style.opacity = 1
        pauseButton.style.display = "none"

        dino.src = "static/graphics/standingDino.gif"

        isGameRunning = false
        score = 0
        screenShake()
        return
    }
}

function randomizedragon() {
    if (isGameRunning) {
        let dragonLeft = parseInt(window.getComputedStyle(dragon).getPropertyValue("left"))
        if (dragonLeft < -300) {
            // randomize obstacle vertical position
            dragon.style.top = dragonTopPositions[Math.floor(Math.random() * limit)]

            // randomize obstacle appearance time
            dragon.style.animationPlayState = "paused"
            dragon.style.animation = "none"
            dragon.offsetLeft
            dragon.style.animation = `slide 2s linear ${5 + Math.floor(Math.random() * 6)}s infinite`
        }
    }
}

function delayCloud1() {
    if (isGameRunning) {
        let cloud1Left = parseInt(window.getComputedStyle(clouds[0]).getPropertyValue("left"))
        if (cloud1Left < - 245) {
            clouds[0].style.animationPlayState = "paused"
            clouds[0].style.animation = "none"
            clouds[0].offsetLeft
            clouds[0].style.animation = "cloudMovement 30s linear 50s infinite"
        }
    }
}

function scoreKeeper() {
    if (isGameRunning) {
        score += 2
        scoreText.textContent = `Score: ${score}`
    }
}

function groundAnimation() {
    let ground1Left = parseInt(window.getComputedStyle(ground1).getPropertyValue("left"))
    let ground2Left = parseInt(window.getComputedStyle(ground2).getPropertyValue("left"))

    ground1Left -= 15
    ground2Left -= 15

    ground1.style.left = `${ground1Left}px`
    ground2.style.left = `${ground2Left}px`

    if (ground1Left <= -1650) {
        ground1.style.left = "1649px"
    }
    if (ground2Left <= -1650) {
        ground2.style.left = "1649px"
    }

    if (isGameRunning) {
        requestAnimationFrame(groundAnimation)
    }
}

let slowdownH = 0
function horizontalFireController() {
    let horizontalFireLeft = parseInt(window.getComputedStyle(horizontalFire).getPropertyValue("left"))
    let verticalFireLeft = parseInt(window.getComputedStyle(verticalFire).getPropertyValue("left"))
    let dragonLeft = parseInt(window.getComputedStyle(dragon).getPropertyValue("left"))

    if (horizontalFireLeft > 2900) {
        if (slowdownH == 0) {
            slowdownH = 4 + Math.floor(Math.random() * 7)
        }
        horizontalFireLeft -= slowdownH
    }
    else if (horizontalFireLeft > 2400) {
        if (dragonLeft < 2200 && dragonLeft > 2100) {
            horizontalFireLeft = 3000
            horizontalFire.style.left = `${horizontalFireLeft}px`
        }
        horizontalFireLeft -= slowdownH
    }
    else if (horizontalFireLeft > 1700) {
        if (dragonLeft < 2200 && dragonLeft > 2100) {
            horizontalFireLeft = 3000
            horizontalFire.style.left = `${horizontalFireLeft}px`
        }
        horizontalFireLeft -= slowdownH
        if (Math.abs(verticalFireLeft - horizontalFireLeft) < 400) {
            horizontalFire.style.display == "none"
        }
    }
    else if (horizontalFireLeft > -50) {
        horizontalFireLeft -= 25
    }
    else {
        slowdownH = 0
        horizontalFireLeft = 3000 + Math.random() * 1000
        horizontalFire.style.display = "inline"
    }
    horizontalFire.style.left = `${horizontalFireLeft}px`

    if (isGameRunning) {
        requestAnimationFrame(horizontalFireController)
    }
}

let slowdownV = 0
function verticalFireController() {
    let verticalFireLeft = parseInt(window.getComputedStyle(verticalFire).getPropertyValue("left"))
    let dragonLeft = parseInt(window.getComputedStyle(dragon).getPropertyValue("left"))

    if (verticalFireLeft > 2900) {
        if (slowdownV == 0) {
            slowdownV = 4 + Math.floor(Math.random() * 7)
        }
        verticalFireLeft -= slowdownV
    }
    else if (verticalFireLeft > 2400) {
        if (dragonLeft < 2200 && dragonLeft > 2100) {
            verticalFireLeft = 3000
            verticalFire.style.left = `${verticalFireLeft}px`
        }
        verticalFireLeft -= slowdownV
    }
    else if (verticalFireLeft > 1700) {
        if (dragonLeft < 2200 && dragonLeft > 2100) {
            verticalFireLeft = 3000
            verticalFire.style.left = `${verticalFireLeft}px`
        }
        verticalFireLeft -= slowdownV
    }
    else if (verticalFireLeft > -50) {
        verticalFireLeft -= 15
    }
    else {
        slowdownV = 0
        verticalFireLeft = 3000 + Math.random() * 1000
    }
    verticalFire.style.left = `${verticalFireLeft}px`

    if (isGameRunning) {
        requestAnimationFrame(verticalFireController)
    }
}

function screenShake() {
    ground1.classList.add("shake")
    ground2.classList.add("shake")
    
    clouds.forEach((cloud) => {
        cloud.classList.add("shake")
    })

    horizontalFire.classList.add("shake")
    verticalFire.classList.add("shake")
    dragon.classList.add("shake")
    dino.classList.add("shake")

    gameOverText.classList.add("shake")

    setTimeout(() => {
        ground1.classList.remove("shake")
        ground2.classList.remove("shake")

        clouds.forEach((cloud) => {
            cloud.classList.remove("shake")
        })

        horizontalFire.classList.remove("shake")
        verticalFire.classList.remove("shake")
        dragon.classList.remove("shake")
        dino.classList.remove("shake")

        gameOverText.classList.remove("shake")
    }, 50)
}

// function onLongPress(element, callback) {
//     let timer;
  
//     element.addEventListener('touchstart', () => { 
//       timer = setTimeout(() => {
//         timer = null;
//         callback();
//       }, 500);
//     });
  
//     function cancel() {
//       clearTimeout(timer);
//     }
  
//     element.addEventListener('touchend', cancel);
//     element.addEventListener('touchmove', cancel);
//   }

//   onLongPress(gameContainer, () => {
//     console.log('Long pressed', gameContainer);
//   });