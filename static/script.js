let playButton = document.getElementById("playButton")
let pauseButton = document.getElementById("pauseButton")
let resumeButton = document.getElementById("resumeButton")
let obstacle = document.getElementById("obstacle")
let sprite = document.getElementById("sprite")
let isGameRunning = false

document.querySelector("#playButton").addEventListener("click", function() {
    obstacle.style.animation = "none"
    obstacle.offsetLeft
    obstacle.style.animation = "slide 2s linear 2s infinite"
    obstacle.style.animationPlayState = "running"
    obstacle.style.opacity = "0"

    gameOverText.style.display = "none"

    playButton.style.display = "none"

    pauseButton.style.display = "inline"

    isGameRunning = true

    setInterval(gameOver, 10)
    setInterval(randomizeObstacle, 10)
})

document.querySelector("#pauseButton").addEventListener("click", function() {
    obstacle.style.animationPlayState = "paused"

    pauseButton.style.display = "none"

    resumeButton.style.display = "inline"

    isGameRunning = false
})

document.querySelector("#resumeButton").addEventListener("click", function() {
    obstacle.style.animationPlayState = "running"

    pauseButton.style.display = "inline"

    resumeButton.style.display = "none"

    isGameRunning = true

    setInterval(gameOver, 10)
    setInterval(randomizeObstacle, 10)
})


document.addEventListener("keydown", jump);
function jump(event) {
    if (sprite.classList == "animate" || !isGameRunning) {
        return
    }

    if (event.key === "ArrowUp") {
        sprite.classList.add("animate")
        setTimeout(removeJump, 500)
    }
}
function removeJump() {
    sprite.classList.remove("animate")
}


let gameOverText = document.getElementById("gameOverText")
function gameOver() {
    let spriteTop = parseInt(window.getComputedStyle(sprite).getPropertyValue("top"))
    let obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"))
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"))

    if (obstacleLeft < -6 && obstacleLeft > -50 && obstacleTop > (spriteTop - 20) && obstacleTop < (spriteTop + 80) && isGameRunning) {
        gameOverText.style.display = "inline"

        obstacle.style.animationPlayState = "paused"

        pauseButton.style.display = "none"

        playButton.style.display = "inline"
        playButton.textContent = "Play Again"

        isGameRunning = false
        return
    }
}


let obstacleTopPositions = ["240px", "220px", "250px", "230px", "260px", "210px"]
function randomizeObstacle() {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"))
    if (isGameRunning) {
        if (obstacleLeft <= -70) {
            let idx = Math.floor(Math.random() * 7)
            obstacle.style.top = obstacleTopPositions[idx]
            obstacle.style.opacity = "0"

            let delay = 5 + Math.floor(Math.random() * 6)
            obstacle.style.animationPlayState = "paused"
            obstacle.style.animation = "none"
            obstacle.offsetLeft
            obstacle.style.animation = `slide 2s linear ${delay}s infinite`
        }
        else if (obstacleLeft <= 730) {
            obstacle.style.opacity = "1"
        }
    }
}