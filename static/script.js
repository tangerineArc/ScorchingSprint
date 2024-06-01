let playButton = document.getElementById("playButton")
let pauseButton = document.getElementById("pauseButton")
let resumeButton = document.getElementById("resumeButton")
let obstacle = document.getElementById("obstacle")
let sprite = document.getElementById("sprite")
let scoreText = document.getElementById("scoreText")
let gameOverText = document.getElementById("gameOverText")
let ground1 = document.getElementById("ground1")
let ground2 = document.getElementById("ground2")

let isGameRunning = false
let score = 0
let obstacleTopPositions = ["350px", "400px", "325px", "375px", "420px", "275px", "250px", "225px", "200px", "100px", "150px"]
let limit = obstacleTopPositions.length

document.querySelector("#playButton").addEventListener("click", function() {
    sprite.src = "static/graphics/runningDino.gif"

    // reset animation
    obstacle.style.animation = "none"
    obstacle.offsetLeft
    obstacle.style.animation = `slide 2s linear ${5 + Math.floor(Math.random() * 6)}s infinite`
    obstacle.style.animationPlayState = "running"
    obstacle.style.opacity = "0"

    obstacle.style.top = obstacleTopPositions[Math.floor(Math.random() * limit)]

    gameOverText.style.display = "none"

    playButton.style.display = "none"

    pauseButton.style.display = "inline"

    isGameRunning = true
    score = 0

    if (playButton.textContent == "Play") {
        setInterval(gameOver, 10)
        setInterval(randomizeObstacle, 10)
        setInterval(scoreKeeper, 100)
        setInterval(groundAnimation, 0.1)
    }
})

document.querySelector("#pauseButton").addEventListener("click", function() {
    obstacle.style.animationPlayState = "paused"

    pauseButton.style.display = "none"

    resumeButton.style.display = "inline"

    sprite.src = "static/graphics/standingDino.png"

    isGameRunning = false
})

document.querySelector("#resumeButton").addEventListener("click", function() {
    obstacle.style.animationPlayState = "running"

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

    let obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"))
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"))
    let obstacleHeight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("height"))

    if (obstacleLeft < (spriteLeft + spriteWidth - 65) && obstacleLeft > (spriteLeft + 200) &&
        (obstacleTop + obstacleHeight) > (spriteTop + 30) && obstacleTop < (spriteTop + spriteHeight - 120) && isGameRunning) {
        gameOverText.style.display = "inline"

        obstacle.style.animationPlayState = "paused"

        pauseButton.style.display = "none"

        playButton.style.display = "inline"
        playButton.textContent = "Play Again"

        sprite.src = "static/graphics/standingDino.png"

        isGameRunning = false
        score = 0
    }
}

function randomizeObstacle() {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"))

    if (isGameRunning) {
        if (obstacleLeft < -20) {
            // randomize obstacle vertical position
            obstacle.style.top = obstacleTopPositions[Math.floor(Math.random() * limit)]
            obstacle.style.opacity = "0"

            // randomize obstacle appearance time
            obstacle.style.animationPlayState = "paused"
            obstacle.style.animation = "none"
            obstacle.offsetLeft
            obstacle.style.animation = `slide 2s linear ${5 + Math.floor(Math.random() * 6)}s infinite`
        }
        else if (obstacleLeft < 1600) {
            obstacle.style.opacity = "1"
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