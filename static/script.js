let playButton = document.getElementById("playButton")
let pauseButton = document.getElementById("pauseButton")
let resumeButton = document.getElementById("resumeButton")
let obstacle = document.getElementById("obstacle")
let sprite = document.getElementById("sprite")
let isGameRunning = false

document.querySelector("#playButton").addEventListener("click", function() {
    obstacle.style.animation = "none"
    obstacle.offsetLeft
    obstacle.style.animation = "slide 2s infinite linear"
    obstacle.style.animationPlayState = "running"

    gameOverText.style.display = "none"

    playButton.style.display = "none"

    pauseButton.style.display = "inline"

    isGameRunning = true
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
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"))

    if (obstacleLeft < -5 && obstacleLeft > -50 && spriteTop > 190) {
        gameOverText.style.display = "inline"
        obstacle.style.animationPlayState = "paused"
        pauseButton.style.display = "none"
        playButton.style.display = "inline"
        playButton.textContent = "Play Again"
        isGameRunning = false
        return
    }
}

if (!isGameRunning) {
    setInterval(gameOver, 10);
}