let playButton = document.getElementById("playButton")
let pauseButton = document.getElementById("pauseButton")
let resumeButton = document.getElementById("resumeButton")

let flyingObstacle = document.getElementById("flyingObstacle")
let sprite = document.getElementById("sprite")

let scoreText = document.getElementById("scoreText")
let gameOverText = document.getElementById("gameOverText")

let ground1 = document.getElementById("ground1")
let ground2 = document.getElementById("ground2")

let fatCactusObstacle = document.getElementById("fatCactusObstacle")
let thickCactus2 = document.getElementById("thickCactus2")
let thinCactus1 = document.getElementById("thinCactus1")
let thinCactus2 = document.getElementById("thinCactus2")

let isGameRunning = false
let score = 0
let flyingObstacleTopPositions = ["350px", "400px", "325px", "375px", "420px", "275px", "250px", "225px", "200px", "100px", "150px"]
let limit = flyingObstacleTopPositions.length

document.querySelector("#playButton").addEventListener("click", function() {
    sprite.src = "static/graphics/runningDino.gif"

    // reset animation for flyingObstacle
    flyingObstacle.style.animation = "none"
    flyingObstacle.offsetLeft
    flyingObstacle.style.animation = `slide 3s linear ${5 + Math.floor(Math.random() * 6)}s infinite`
    flyingObstacle.style.animationPlayState = "running"
    flyingObstacle.style.opacity = "0"
    flyingObstacle.style.top = flyingObstacleTopPositions[Math.floor(Math.random() * limit)]

    gameOverText.style.display = "none"
    playButton.style.display = "none"
    pauseButton.style.display = "inline"

    isGameRunning = true
    score = 0

    if (playButton.textContent == "Play") {
        setInterval(gameOver, 10)
        setInterval(randomizeFlyingObstacle, 10)
        setInterval(scoreKeeper, 100)
        // setInterval(groundAnimation, 0.1)
        setInterval(cactusAnimation, 0.01)
    }
})

document.querySelector("#pauseButton").addEventListener("click", function() {
    flyingObstacle.style.animationPlayState = "paused"

    pauseButton.style.display = "none"
    resumeButton.style.display = "inline"

    sprite.src = "static/graphics/standingDino.png"

    isGameRunning = false
})

document.querySelector("#resumeButton").addEventListener("click", function() {
    flyingObstacle.style.animationPlayState = "running"

    pauseButton.style.display = "inline"
    resumeButton.style.display = "none"

    sprite.src = "static/graphics/runningDino.gif"

    isGameRunning = true
})


document.addEventListener("keydown", jump);
function jump(event) {
    if (sprite.classList == "animate" || !isGameRunning) {
        return
    }

    if (event.key === "ArrowUp" || event.key === " " || event.key === "w" || event.key === "W") {
        sprite.src = "static/graphics/standingDino.png"
        sprite.classList.add("animate")
        setTimeout(removeJump, 480)
    }
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

    if (flyingObstacleLeft < (spriteLeft + spriteWidth - 65) && flyingObstacleLeft > (spriteLeft + 200) &&
        (flyingObstacleTop + flyingObstacleHeight) > (spriteTop + 30) && flyingObstacleTop < (spriteTop + spriteHeight - 120) && isGameRunning) {

        flyingObstacle.style.animationPlayState = "paused"

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
            flyingObstacle.style.animation = `slide 3s linear ${5 + Math.floor(Math.random() * 6)}s infinite`
        }
        else if (flyingObstacleLeft < 1600) {
            flyingObstacle.style.opacity = "1"
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
    if (isGameRunning) {
        let ground1Left = parseInt(window.getComputedStyle(ground1).getPropertyValue("left"))
        let ground2Left = parseInt(window.getComputedStyle(ground2).getPropertyValue("left"))

        ground1Left -= 6
        ground2Left -= 6

        ground1.style.left = `${ground1Left}px`
        ground2.style.left = `${ground2Left}px`

        if (ground1Left <= -1650) {
            ground1.style.left = "1649px"
        }
        if (ground2Left <= -1650) {
            ground2.style.left = "1649px"
        }
    }
}

let iterations = 0
let slowDown;
function cactusAnimation() {
    if (isGameRunning) {
        let fatCactusObstacleLeft = parseInt(window.getComputedStyle(fatCactusObstacle).getPropertyValue("left"))
        let flyingObstacleLeft = parseInt(window.getComputedStyle(flyingObstacle).getPropertyValue("left"))

        if (fatCactusObstacleLeft >= 1600) {
            if (iterations == 0) {
                slowDown = 0.5 + Math.floor(Math.random() * 2)
            }
            fatCactusObstacleLeft -= slowDown
            fatCactusObstacle.style.left = `${fatCactusObstacleLeft}px`

            if (Math.abs(flyingObstacleLeft - fatCactusObstacleLeft) <= 590) {
                fatCactusObstacleLeft = 1600;
                fatCactusObstacle.style.left = "1600px";
            }
        }
        else if (fatCactusObstacleLeft >= -20) {
            fatCactusObstacleLeft -= 6
            fatCactusObstacle.style.left = `${fatCactusObstacleLeft}px`
            iterations = 1
            slowDown = 0
        }
        else if (fatCactusObstacleLeft < -20) {
            fatCactusObstacle.style.left = `${2500 + Math.floor(Math.random() * 1000)}px`
            iterations = 0
        }
    }
}