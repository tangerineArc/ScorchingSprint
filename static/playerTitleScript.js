title = document.getElementById("title")
username = document.getElementById("username")

switch (title.textContent) {
    case "Newbie":
        title.style.color = "grey"
        username.style.color = "grey"
        break
    case "Pupil":
        title.style.color = "green"
        username.style.color = "green"
        break
    case "Specialist":
        title.style.color = "turquoise"
        username.style.color = "turquoise"
        break
    case "Expert":
        title.style.color = "blue"
        username.style.color = "blue"
        break
    case "Candidate Master":
        title.style.color = "purple"
        username.style.color = "purple"
        break
    case "Master":
        title.style.color = "orange"
        username.style.color = "orange"
        break
    case "International Master":
        title.style.color = "orange"
        username.style.color = "orange"
        break
    case "Grandmaster":
        title.style.color = "red"
        username.style.color = "red"
        break
    case "International Grandmaster":
        title.style.color = "red"
        username.style.color = "red"
        break
    case "Legendary Grandmaster":
        title.style.color = "red"
        username.style.color = "red"
}
