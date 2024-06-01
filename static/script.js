let playButton = document.getElementById("playButton")
let pauseButton = document.getElementById("pauseButton")
let resumeButton = document.getElementById("resumeButton")
let obstacle = document.getElementById("obstacle")
let sprite = document.getElementById("sprite")
let scoreText = document.getElementById("scoreText")
let gameOverText = document.getElementById("gameOverText")

let isGameRunning = false
let score = 0
let obstacleTopPositions = ["300px", "350px", "400px", "450px", "325px", "375px", "425px", "275px", "250px"]

document.querySelector("#playButton").addEventListener("click", function() {
    sprite.src = "static/graphics/runningDino.gif"

    // reset animation
    obstacle.style.animation = "none"
    obstacle.offsetLeft
    let delay = 5 + Math.floor(Math.random() * 6)
    obstacle.style.animation = `slide 2s linear ${delay}s infinite`
    obstacle.style.animationPlayState = "running"
    obstacle.style.opacity = "0"

    gameOverText.style.display = "none"

    playButton.style.display = "none"

    pauseButton.style.display = "inline"

    isGameRunning = true
    score = 0

    if (playButton.textContent == "Play") {
        setInterval(gameOver, 10)
        setInterval(randomizeObstacle, 10)
        setInterval(scoreKeeper, 100)
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

    let obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"))
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"))

    if (obstacleLeft < 0 && obstacleLeft > -300 && obstacleTop > (spriteTop - 80) && obstacleTop < spriteTop && isGameRunning) {
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
        if (obstacleLeft < -500) {
            // randomize obstacle vertical position
            let idx = Math.floor(Math.random() * 9)
            obstacle.style.top = obstacleTopPositions[idx]
            obstacle.style.opacity = "0"

            // randomize obstacle appearance time
            let delay = 5 + Math.floor(Math.random() * 6)
            obstacle.style.animationPlayState = "paused"
            obstacle.style.animation = "none"
            obstacle.offsetLeft
            obstacle.style.animation = `slide 2s linear ${delay}s infinite`
        }
        else if (obstacleLeft < 1050) {
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