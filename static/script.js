let playButton = document.getElementById("playButton")
let pauseButton = document.getElementById("pauseButton")
let resumeButton = document.getElementById("resumeButton")
let resetButton = document.getElementById("resetButton")

let flyingObstacle = document.getElementById("flyingObstacle")
let sprite = document.getElementById("sprite")

let scoreText = document.getElementById("scoreText")
let gameOverText = document.getElementById("gameOverText")

let ground1 = document.getElementById("ground1")
let ground2 = document.getElementById("ground2")

let fatCactusObstacle = document.getElementById("fatCactusObstacle")
let largeCactusObstacle = document.getElementById("largeCactusObstacle")

let clouds = [document.getElementById("cloud1"), document.getElementById("cloud2"), document.getElementById("cloud3"), document.getElementById("cloud4")]

let isGameRunning = false
let score = 0
let flyingObstacleTopPositions = ["350px", "400px", "325px", "375px", "420px", "275px", "250px", "225px", "200px", "100px", "150px", "410px"]
let limit = flyingObstacleTopPositions.length

document.querySelector("#playButton").addEventListener("click", function() {
    sprite.src = "static/graphics/runningDino.gif"

    // reset animation for flyingObstacle
    flyingObstacle.style.animation = "none"
    flyingObstacle.offsetLeft
    flyingObstacle.style.animation = `slide 2s linear ${5 + Math.floor(Math.random() * 6)}s infinite`
    flyingObstacle.style.animationPlayState = "running"
    flyingObstacle.style.opacity = "0"
    flyingObstacle.style.top = flyingObstacleTopPositions[Math.floor(Math.random() * limit)]

    // reset animation for clouds
    let counter = 0
    clouds.forEach((cloud) => {
        cloud.style.animation = "none"
        cloud.offsetLeft
        cloud.style.animation = `cloudMovement 30s linear ${counter}s infinite`
        counter += 10
        cloud.style.animationPlayState = "running"
    })

    gameOverText.style.display = "none"
    playButton.style.display = "none"
    pauseButton.style.display = "inline"
    resetButton.style.display = "inline"

    let cactusPos = 3000 + Math.floor(Math.random() * 1000)
    fatCactusObstacle.style.left = `${cactusPos}px`
    largeCactusObstacle.style.left = `${cactusPos + 600}px`

    isGameRunning = true
    score = 0

    if (playButton.textContent == "Play") {
        setInterval(gameOver, 10)
        setInterval(randomizeFlyingObstacle, 10)
        setInterval(delayCloud1, 10)
        setInterval(scoreKeeper, 100)
    }

    requestAnimationFrame(groundAnimation)
    requestAnimationFrame(cactusAnimation)
})

document.querySelector("#pauseButton").addEventListener("click", function() {
    flyingObstacle.style.animationPlayState = "paused"

    clouds.forEach((cloud) => {
        cloud.style.animationPlayState = "paused"
    })

    pauseButton.style.display = "none"
    resumeButton.style.display = "inline"

    sprite.src = "static/graphics/standingDino.png"

    isGameRunning = false
})

document.querySelector("#resumeButton").addEventListener("click", function() {
    flyingObstacle.style.animationPlayState = "running"

    clouds.forEach((cloud) => {
        cloud.style.animationPlayState = "running"
    })

    pauseButton.style.display = "inline"
    resumeButton.style.display = "none"

    sprite.src = "static/graphics/runningDino.gif"

    isGameRunning = true

    requestAnimationFrame(groundAnimation)
    requestAnimationFrame(cactusAnimation)
})

document.querySelector("#resetButton").addEventListener("click", function() {
    // reset animation for flyingObstacle
    flyingObstacle.style.animation = "none"
    flyingObstacle.offsetLeft
    flyingObstacle.style.animation = `slide 2s linear ${5 + Math.floor(Math.random() * 6)}s infinite`
    flyingObstacle.style.animationPlayState = "paused"
    flyingObstacle.style.opacity = "0"
    flyingObstacle.style.top = flyingObstacleTopPositions[Math.floor(Math.random() * limit)]

    // reset animation for clouds
    let counter = 0
    clouds.forEach((cloud) => {
        cloud.style.animation = "none"
        cloud.offsetLeft
        cloud.style.animation = `cloudMovement 30s linear ${counter}s infinite`
        counter += 10
        cloud.style.animationPlayState = "paused"
    })

    gameOverText.style.display = "none"
    playButton.style.display = "inline"
    pauseButton.style.display = "none"
    resumeButton.style.display = "none"
    resetButton.style.display = "none"

    sprite.src = "static/graphics/standingDino.png"

    // reset animation for cactus
    let cactusPos = 3000 + Math.floor(Math.random() * 1000)
    fatCactusObstacle.style.left = `${cactusPos}px`
    largeCactusObstacle.style.left = `${cactusPos + 600}px`

    score = 0
    scoreText.textContent = `Score: ${score}`
    isGameRunning = false
})

document.addEventListener("keydown", jumpKey);
document.querySelector("#gameContainer").addEventListener("touchstart", jumpTouch);
function jumpKey(event) {
    if (sprite.classList == "animate" || !isGameRunning) {
        return
    }

    if (event.key === "ArrowUp" || event.key === " " || event.key === "w" || event.key === "W") {
        sprite.src = "static/graphics/standingDino.png"
        sprite.classList.add("animate")
        setTimeout(removeJump, 480)
    }
}
function jumpTouch(event) {

    if (sprite.classList == "animate" || !isGameRunning || event.target == pauseButton || event.target == resetButton) {
        return
    }
    sprite.src = "static/graphics/standingDino.png"
    sprite.classList.add("animate")
    setTimeout(removeJump, 480)
}
function removeJump() {
    sprite.classList.remove("animate")
    if (isGameRunning) {
        sprite.src = "static/graphics/runningDino.gif"
    }
}

function gameOver() {
    let spriteTop = parseInt(window.getComputedStyle(sprite).getPropertyValue("top"))
    let spriteLeft = parseInt(window.getComputedStyle(sprite).getPropertyValue("left"))
    let spriteWidth = parseInt(window.getComputedStyle(sprite).getPropertyValue("width"))
    let spriteHeight = parseInt(window.getComputedStyle(sprite).getPropertyValue("height"))

    let flyingObstacleTop = parseInt(window.getComputedStyle(flyingObstacle).getPropertyValue("top"))
    let flyingObstacleLeft = parseInt(window.getComputedStyle(flyingObstacle).getPropertyValue("left"))
    let flyingObstacleHeight = parseInt(window.getComputedStyle(flyingObstacle).getPropertyValue("height"))

    let fatCactusObstacleTop = parseInt(window.getComputedStyle(fatCactusObstacle).getPropertyValue("top"))
    let fatCactusObstacleLeft = parseInt(window.getComputedStyle(fatCactusObstacle).getPropertyValue("left"))
    let fatCactusObstacleWidth = parseInt(window.getComputedStyle(fatCactusObstacle).getPropertyValue("width"))

    let largeCactusObstacleTop = parseInt(window.getComputedStyle(largeCactusObstacle).getPropertyValue("top"))
    let largeCactusObstacleLeft = parseInt(window.getComputedStyle(largeCactusObstacle).getPropertyValue("left"))
    let largeCactusObstacleWidth = parseInt(window.getComputedStyle(largeCactusObstacle).getPropertyValue("width"))

    if (flyingObstacleLeft < (spriteLeft + spriteWidth - 65) && flyingObstacleLeft > (spriteLeft + 200) &&
        (flyingObstacleTop + flyingObstacleHeight) > (spriteTop + 30) && flyingObstacleTop < (spriteTop + spriteHeight - 120) && isGameRunning) {

        flyingObstacle.style.animationPlayState = "paused"

        clouds.forEach((cloud) => {
            cloud.style.animationPlayState = "paused"
        })

        playButton.style.display = "inline"
        playButton.textContent = "Play Again"
        gameOverText.style.display = "inline"
        pauseButton.style.display = "none"

        sprite.src = "static/graphics/standingDino.png"

        isGameRunning = false
        score = 0
        
        return
    }

    if ((spriteTop + spriteHeight) >= fatCactusObstacleTop && (fatCactusObstacleLeft + fatCactusObstacleWidth) >= (spriteLeft + 280) &&
        fatCactusObstacleLeft <= (spriteLeft + spriteWidth - 120) && isGameRunning) {
        flyingObstacle.style.animationPlayState = "paused"

        clouds.forEach((cloud) => {
            cloud.style.animationPlayState = "paused"
        })

        playButton.style.display = "inline"
        playButton.textContent = "Play Again"
        gameOverText.style.display = "inline"
        pauseButton.style.display = "none"

        sprite.src = "static/graphics/standingDino.png"

        isGameRunning = false
        score = 0
    }

    if (largeCactusObstacle.style.display != "none" && (spriteTop + spriteHeight) >= largeCactusObstacleTop &&
        (largeCactusObstacleLeft + largeCactusObstacleWidth) >= (spriteLeft + 280) && largeCactusObstacleLeft <= (spriteLeft + spriteWidth - 120)
         && isGameRunning) {
        flyingObstacle.style.animationPlayState = "paused";

        clouds.forEach((cloud) => {
            cloud.style.animationPlayState = "paused"
        })

        playButton.style.display = "inline"
        playButton.textContent = "Play Again"
        gameOverText.style.display = "inline"
        pauseButton.style.display = "none"

        sprite.src = "static/graphics/standingDino.png"

        isGameRunning = false
        score = 0
    }
}

function randomizeFlyingObstacle() {
    if (isGameRunning) {
        let flyingObstacleLeft = parseInt(window.getComputedStyle(flyingObstacle).getPropertyValue("left"))
        if (flyingObstacleLeft < -20) {
            // randomize obstacle vertical position
            flyingObstacle.style.top = flyingObstacleTopPositions[Math.floor(Math.random() * limit)]
            flyingObstacle.style.opacity = "0"

            // randomize obstacle appearance time
            flyingObstacle.style.animationPlayState = "paused"
            flyingObstacle.style.animation = "none"
            flyingObstacle.offsetLeft
            flyingObstacle.style.animation = `slide 2s linear ${5 + Math.floor(Math.random() * 6)}s infinite`
        }
        else if (flyingObstacleLeft < 1600) {
            flyingObstacle.style.opacity = "1"
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

let iterations = 0
let slowDown = 0
let cactusResetPos = 0
function cactusAnimation() {
    let fatCactusObstacleLeft = parseInt(window.getComputedStyle(fatCactusObstacle).getPropertyValue("left"))
    let largeCactusObstacleLeft = parseInt(window.getComputedStyle(largeCactusObstacle).getPropertyValue("left"))
    let flyingObstacleLeft = parseInt(window.getComputedStyle(flyingObstacle).getPropertyValue("left"))

    if (largeCactusObstacleLeft >= 1600) {
        if (Math.abs(fatCactusObstacleLeft - largeCactusObstacleLeft) <= 500 && Math.abs(fatCactusObstacleLeft - largeCactusObstacleLeft) >= 100) {
            largeCactusObstacle.style.display = "none"
        }
    }

    // fatCactusObstacle dynamics
    if (fatCactusObstacleLeft > 2100) {
        if (iterations == 0) {
            slowDown = 4 + Math.floor(Math.random() * 7)
            iterations = 1
        }
        fatCactusObstacleLeft -= slowDown
        fatCactusObstacle.style.left = `${fatCactusObstacleLeft}px`

        if (Math.abs(flyingObstacleLeft - fatCactusObstacleLeft) <= 590) {
            fatCactusObstacleLeft = 1650;
            fatCactusObstacle.style.left = "1650px"
        }
    }
    else if (fatCactusObstacleLeft >= -50) {
        fatCactusObstacleLeft -= 15
        fatCactusObstacle.style.left = `${fatCactusObstacleLeft}px`
    }
    else if (fatCactusObstacleLeft < -50) {
        cactusResetPos = 3000 + Math.floor(Math.random() * 1000)
        fatCactusObstacleLeft = cactusResetPos
        fatCactusObstacle.style.left = `${cactusResetPos}px`
        iterations = 0
    }

    // largeCactusObstacle dynamics
    if (largeCactusObstacleLeft > 2100) {
        if (iterations == 0) {
            slowDown = 4 + Math.floor(Math.random() * 7)
            iterations = 1
        }
        largeCactusObstacleLeft -= slowDown
        largeCactusObstacle.style.left = `${largeCactusObstacleLeft}px`
        largeCactusObstacle.style.display = "inline"

        if (Math.abs(flyingObstacleLeft - largeCactusObstacleLeft) <= 590) {
            largeCactusObstacleLeft = 1650
            largeCactusObstacle.style.left = "1650px"
        }
    }
    else if (largeCactusObstacleLeft >= -50) {
        largeCactusObstacleLeft -= 15
        largeCactusObstacle.style.left = `${largeCactusObstacleLeft}px`
    }
    else if (largeCactusObstacleLeft < -50) {
        largeCactusObstacleLeft = cactusResetPos + 800
        largeCactusObstacle.style.left = `${cactusResetPos + 800}px`
        iterations = 0
        slowDown = 0
        largeCactusObstacle.style.display = "inline"
    }

    if (isGameRunning) {
        requestAnimationFrame(cactusAnimation)
    }
}

// function screenShake() {
//     let ground1Left = parseInt(window.getComputedStyle(ground1).getPropertyValue("left"))
//     let ground2Left = parseInt(window.getComputedStyle(ground2).getPropertyValue("left"))

//     ground1Left -= 10
//     ground2Left -= 10

// }