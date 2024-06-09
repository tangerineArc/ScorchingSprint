let elements = document.querySelectorAll(".colored")
let scoreBar = document.getElementById("scoreBar")

fetch("/sendTitleData")
    .then(response => response.json())
    .then(result => {
        switch (result["title"]) {
            case "Newbie":
                for (i = 0; i < elements.length; i ++) {
                    elements[i].style.color = "grey"
                }
                if (scoreBar != null) {
                    scoreBar.style.backgroundColor = "grey"
                    scoreBar.style.width = "10%"
                }
                break
            case "Pupil":
                for (i = 0; i < elements.length; i ++) {
                    elements[i].style.color = "green"
                }
                if (scoreBar != null) {
                    scoreBar.style.backgroundColor = "green"
                    scoreBar.style.width = "20%"
                }
                break
            case "Specialist":
                for (i = 0; i < elements.length; i ++) {
                    elements[i].style.color = "turquoise"
                }
                if (scoreBar != null) {
                    scoreBar.style.backgroundColor = "turquoise"
                    scoreBar.style.width = "30%"
                }
                break
            case "Expert":
                for (i = 0; i < elements.length; i ++) {
                    elements[i].style.color = "blue"
                }
                if (scoreBar != null) {
                    scoreBar.style.backgroundColor = "blue"
                    scoreBar.style.width = "40%"
                }
                break
            case "Candidate Master":
                for (i = 0; i < elements.length; i ++) {
                    elements[i].style.color = "purple"
                }
                if (scoreBar != null) {
                    scoreBar.style.backgroundColor = "purple"
                    scoreBar.style.width = "50%"
                }
                break
            case "Master":
                for (i = 0; i < elements.length; i ++) {
                    elements[i].style.color = "orange"
                }
                if (scoreBar != null) {
                    scoreBar.style.backgroundColor = "orange"
                    scoreBar.style.width = "60%"
                }
                break
            case "International Master":
                for (i = 0; i < elements.length; i ++) {
                    elements[i].style.color = "orange"
                }
                if (scoreBar != null) {
                    scoreBar.style.backgroundColor = "orange"
                    scoreBar.style.width = "70%"   
                }
                break
            case "Grandmaster":
                for (i = 0; i < elements.length; i ++) {
                    elements[i].style.color = "red"
                }
                if (scoreBar != null) {
                    scoreBar.style.backgroundColor = "red"
                    scoreBar.style.width = "80%"   
                }
            case "International Grandmaster":
                for (i = 0; i < elements.length; i ++) {
                    elements[i].style.color = "red"
                }
                if (scoreBar != null) {
                    scoreBar.style.backgroundColor = "red"
                    scoreBar.style.width = "90%"   
                }
            case "Legendary Grandmaster":
                for (i = 0; i < elements.length; i ++) {
                    elements[i].style.color = "red"
                }
                if (scoreBar != null) {
                    scoreBar.style.backgroundColor = "red"
                    scoreBar.style.width = "100%"   
                }
        }
    })
    .catch(error => console.log("Errror: ", error))
