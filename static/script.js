let playButton = document.getElementById("playButton")
let pauseButton = document.getElementById("pauseButton")
let resumeButton = document.getElementById("resumeButton")
let obstacle = document.getElementById("obstacle")

document.querySelector("#playButton").addEventListener("click", function() {
    obstacle.style.animation = "none"
    obstacle.offsetLeft
    obstacle.style.animation = "slide 1s infinite linear"
    obstacle.style.animationPlayState = "running"

    gameOverText.style.display = "none"

    playButton.style.display = "none"

    pauseButton.style.display = "inline"
})

document.querySelector("#pauseButton").addEventListener("click", function() {
    obstacle.style.animationPlayState = "paused"

    pauseButton.style.display = "none"

    resumeButton.style.display = "inline"
})

document.querySelector("#resumeButton").addEventListener("click", function() {
    obstacle.style.animationPlayState = "running"

    pauseButton.style.display = "inline"

    resumeButton.style.display = "none"
})


let sprite = document.getElementById("sprite")
document.addEventListener("click", jump);
function jump() {
    if (sprite.classList == "animate") {
        return
    }

    sprite.classList.add("animate")
    setTimeout(removeJump, 300)
}
function removeJump() {
    sprite.classList.remove("animate")
}


let gameOverText = document.getElementById("gameOverText")
let gameOverCount = 0
function gameOver() {
    let spriteTop = parseInt(window.getComputedStyle(sprite).getPropertyValue("top"))
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"))

    if (obstacleLeft < 20 && obstacleLeft > -20 && spriteTop >= 100) {
        gameOverText.style.display = "inline"
        obstacle.style.animationPlayState = "paused"
        pauseButton.style.display = "none"
        playButton.style.display = "inline"
        playButton.textContent = "Play Again"
        gameOverCount ++
        return
    }
}


if (!gameOverCount) {
    setInterval(gameOver, 10);
}