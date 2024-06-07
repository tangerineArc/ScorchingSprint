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
let verticalFire1 = document.getElementById("verticalFire1")
let verticalFire2 = document.getElementById("verticalFire2")

let clouds = [document.getElementById("cloud1"), document.getElementById("cloud2"), document.getElementById("cloud3"), document.getElementById("cloud4")]

let isGameRunning = false
let score = 0
let verticalFire1Speed = 15
let verticalFire2Speed = 15
let groundSpeed = 15
let dragonTopPositions = ["350px", "325px", "375px", "275px", "250px", "225px", "200px", "150px"]
let limit = dragonTopPositions.length

let gameOnMusic = new Audio("static/sounds/chase.mp3")
let gameOverMusic = new Audio("static/sounds/dragonCastle.mp3")
gameOnMusic.loop = true
gameOverMusic.loop = true

playButton.addEventListener("click", function() {
    gameOverMusic.pause()
    gameOverMusic.currentTime = 0

    gameOnMusic.currentTime = 0
    gameOnMusic.play()

    dino.src = "static/graphics/runningDino.gif"
    dino.style.display = "inline"
    dino.style.height = "100px"
    dino.style.top = "480px"

    // reset animation for dragon
    dragon.style.width = "300px"
    dragon.style.animation = "none"
    dragon.offsetLeft
    dragon.style.animation = `slide 2.5s linear ${5 + Math.floor(Math.random() * 6)}s infinite`
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
    verticalFire1.style.left = `${fireResetPos + 500}px`
    verticalFire2.style.left = `${fireResetPos + 1000}px`

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
    gameOnMusic.pause()

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
    gameOnMusic.play()

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
    gameOverMusic.pause()
    gameOverMusic.currentTime = 0

    gameOnMusic.pause()
    gameOnMusic.currentTime = 0

    dino.style.display = "inline"
    dino.src = "static/graphics/standingDino.gif"
    dino.style.height = "100px"
    dino.style.top = "480px"

    // reset animation for dragon
    dragon.style.width = "300px"
    dragon.style.animation = "none"
    dragon.offsetLeft
    dragon.style.animation = `slide 2.5s linear ${5 + Math.floor(Math.random() * 6)}s infinite`
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
    verticalFire1.style.left = `${fireResetPos + 500}px`
    verticalFire2.style.left = `${fireResetPos + 1000}px`

    score = 0
    scoreText.textContent = `${score}`
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

    let verticalFire1Top = parseInt(window.getComputedStyle(verticalFire1).getPropertyValue("top"))
    let verticalFire1Left = parseInt(window.getComputedStyle(verticalFire1).getPropertyValue("left"))
    let verticalFire1Width = parseInt(window.getComputedStyle(verticalFire1).getPropertyValue("width"))

    let verticalFire2Top = parseInt(window.getComputedStyle(verticalFire2).getPropertyValue("top"))
    let verticalFire2Left = parseInt(window.getComputedStyle(verticalFire2).getPropertyValue("left"))
    let verticalFire2Width = parseInt(window.getComputedStyle(verticalFire2).getPropertyValue("width"))

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
        sendData()
        score = 0
        verticalFire1Speed = 15
        verticalFire2Speed = 15
        groundSpeed = 15

        dragon.style.width = "400px"
        dragon.style.top = `${dragonTop - 100}px`
        dino.style.display = "none"

        gameOnMusic.pause()
        gameOverMusic.play()

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

        dino.src = "static/graphics/dinoOnFire.gif"
        dino.style.height = "150px"
        dino.style.top = "430px"

        gameOnMusic.pause()
        gameOverMusic.play()

        isGameRunning = false
        sendData()
        score = 0
        verticalFire1Speed = 15
        verticalFire2Speed = 15
        groundSpeed = 15
        screenShake()
        return
    }
    // collsion with verticalFire1
    if (isGameRunning && (dinoTop + dinoHeight) >= verticalFire1Top && (verticalFire1Left + verticalFire1Width) >= (dinoLeft + 120) &&
        verticalFire1Left <= (dinoLeft + dinoWidth - 30)) {
        dragon.style.animationPlayState = "paused";

        clouds.forEach((cloud) => {
            cloud.style.animationPlayState = "paused"
        })

        playButton.style.display = "inline"
        playButton.textContent = "Play Again"
        gameOverText.style.opacity = 1
        pauseButton.style.display = "none"

        dino.src = "static/graphics/dinoOnFire.gif"
        dino.style.height = "150px"
        dino.style.top = "430px"

        gameOnMusic.pause()
        gameOverMusic.play()

        isGameRunning = false
        sendData()
        score = 0
        verticalFire1Speed = 15
        verticalFire2Speed = 15
        groundSpeed = 15
        screenShake()
        return
    }
    // collsion with verticalFire2
    if (isGameRunning && (dinoTop + dinoHeight) >= verticalFire2Top && (verticalFire2Left + verticalFire2Width) >= (dinoLeft + 120) &&
        verticalFire2Left <= (dinoLeft + dinoWidth - 30)) {
        dragon.style.animationPlayState = "paused";

        clouds.forEach((cloud) => {
            cloud.style.animationPlayState = "paused"
        })

        playButton.style.display = "inline"
        playButton.textContent = "Play Again"
        gameOverText.style.opacity = 1
        pauseButton.style.display = "none"

        dino.src = "static/graphics/dinoOnFire.gif"
        dino.style.height = "150px"
        dino.style.top = "430px"

        gameOnMusic.pause()
        gameOverMusic.play()

        isGameRunning = false
        sendData()
        score = 0
        verticalFire1Speed = 15
        verticalFire2Speed = 15
        groundSpeed = 15
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
            dragon.style.animation = `slide 2.5s linear ${5 + Math.floor(Math.random() * 6)}s infinite`
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
        scoreText.textContent = `${score}`
    }   
}

function groundAnimation() {
    let ground1Left = parseInt(window.getComputedStyle(ground1).getPropertyValue("left"))
    let ground2Left = parseInt(window.getComputedStyle(ground2).getPropertyValue("left"))

    switch (score) {
        case 500:
            groundSpeed += 0.3
            break
        case 1000:
            groundSpeed += 0.3
            break
        case 2000:
            groundSpeed += 0.4
            break
        case 3000:
            groundSpeed += 0.5
            break
        case 4000:
            groundSpeed += 0.5
    }

    ground1Left -= groundSpeed
    ground2Left -= groundSpeed

    ground1.style.left = `${ground1Left}px`
    ground2.style.left = `${ground2Left}px`

    if (ground1Left <= -1650) {
        ground1.style.left = "1650px"
    }
    if (ground2Left <= -1650) {
        ground2.style.left = "1650px"
    }

    if ((ground1Left + 1650) > 0 && ground2Left > 0 && ground2Left < 1650 && ground1Left < 0) {
        ground2Left = ground1Left + 1650
        ground2.style.left = `${ground2Left}px`
    }
    if ((ground2Left + 1650) > 0 && ground1Left > 0 && ground1Left < 1650 && ground2Left < 0) {
        ground1Left = ground2Left + 1650
        ground1.style.left = `${ground1Left}px`
    }

    if (isGameRunning) {
        requestAnimationFrame(groundAnimation)
    }
}

let slowdownH = 0
function horizontalFireController() {
    let horizontalFireLeft = parseInt(window.getComputedStyle(horizontalFire).getPropertyValue("left"))
    let verticalFire1Left = parseInt(window.getComputedStyle(verticalFire1).getPropertyValue("left"))
    let verticalFire2Left = parseInt(window.getComputedStyle(verticalFire2).getPropertyValue("left"))
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
        if (Math.abs(verticalFire1Left - horizontalFireLeft) < 400 || Math.abs(verticalFire1Left - verticalFire2Left) < 400) {
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
    let verticalFire1Left = parseInt(window.getComputedStyle(verticalFire1).getPropertyValue("left"))
    let verticalFire2Left = parseInt(window.getComputedStyle(verticalFire2).getPropertyValue("left"))
    let dragonLeft = parseInt(window.getComputedStyle(dragon).getPropertyValue("left"))

    switch (score) {
        case 500:
            verticalFire1Speed += 0.3
            verticalFire2Speed += 0.3
            break
        case 1000:
            verticalFire1Speed += 0.3
            verticalFire2Speed += 0.3
            break
        case 2000:
            verticalFire1Speed += 0.4
            verticalFire2Speed += 0.4
            break
        case 3000:
            verticalFire1Speed += 0.5
            verticalFire2Speed += 0.5
            break
        case 4000:
            verticalFire1Speed += 0.5
            verticalFire2Speed += 0.5
    }
    
    // verticalFire1
    if (verticalFire1Left > 2900) {
        if (slowdownV == 0) {
            slowdownV = 4 + Math.floor(Math.random() * 7)
        }
        verticalFire1Left -= slowdownV
    }
    else if (verticalFire1Left > 2400) {
        if (dragonLeft < 2200 && dragonLeft > 2100) {
            verticalFire1Left = 3000
            verticalFire1.style.left = `${verticalFire1Left}px`
        }
        verticalFire1Left -= slowdownV
    }
    else if (verticalFire1Left > 1700) {
        if (dragonLeft < 2200 && dragonLeft > 2100) {
            verticalFire1Left = 3000
            verticalFire1.style.left = `${verticalFire1Left}px`
        }
        verticalFire1Left -= slowdownV
    }
    else if (verticalFire1Left > -50) {
        verticalFire1Left -= verticalFire1Speed
    }
    else {
        slowdownV = 0
        verticalFire1Left = 3000 + Math.random() * 1000
    }
    verticalFire1.style.left = `${verticalFire1Left}px`

    // verticalFire2
    if (verticalFire2Left > 2900) {
        if (slowdownV == 0) {
            slowdownV = 4 + Math.floor(Math.random() * 7)
        }
        verticalFire2Left -= slowdownV
    }
    else if (verticalFire2Left > 2400) {
        if (dragonLeft < 2200 && dragonLeft > 2100) {
            verticalFire2Left = 3000
            verticalFire2.style.left = `${verticalFire2Left}px`
        }
        verticalFire2Left -= slowdownV
    }
    else if (verticalFire2Left > 1700) {
        if (dragonLeft < 2200 && dragonLeft > 2100) {
            verticalFire2Left = 3500
            verticalFire2.style.left = `${verticalFire2Left}px`
        }
        if (Math.abs(verticalFire1Left - verticalFire2Left) <= 400) {
            if (verticalFire1Left > verticalFire2Left) {
                verticalFire1Left += 400
                verticalFire1.style.left = `${verticalFire1Left}px`
            } else {
                verticalFire2Left += 400
                verticalFire2.style.left = `${verticalFire2Left}px`
            }
        }
        verticalFire2Left -= slowdownV
    }
    else if (verticalFire2Left > -50) {
        if (Math.abs(verticalFire1Left - verticalFire2Left) <= 400 && verticalFire1Left > 1600 && verticalFire2Left > 1600) {
            if (verticalFire1Left > verticalFire2Left) {
                verticalFire1Left += 400
                verticalFire1.style.left = `${verticalFire1Left}px`
            } else {
                verticalFire2Left += 400
                verticalFire2.style.left = `${verticalFire2Left}px`
            }
        }
        verticalFire2Left -= verticalFire2Speed
    }
    else {
        slowdownV = 0
        verticalFire2Left = 3000 + Math.random() * 1000
    }
    verticalFire2.style.left = `${verticalFire2Left}px`

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
    verticalFire1.classList.add("shake")
    verticalFire2.classList.add("shake")
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
        verticalFire1.classList.remove("shake")
        verticalFire2.classList.remove("shake")
        dragon.classList.remove("shake")
        dino.classList.remove("shake")

        gameOverText.classList.remove("shake")
    }, 50)
}

function sendData() {
    fetch("/process", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({score: score})
    })
    .then(response => response.text())
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.error("Error", error)
    })
}
