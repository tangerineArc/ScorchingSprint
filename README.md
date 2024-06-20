# Scorching Sprint

Scorching Sprint is a web application/game which is inspired by the classic Chrome Dino game, but has a lot more features.
Users have to create an account and sign in to the play the game. Their gameplay data is stored and the highest score is used to rank the players in a global leaderboard.

This project was done by Swagatam Pati for the 2024 Harvard CS50x online course: Introduction to the Intellectual Enterprises of Computer Science & the Art of Programming.

### Video Demonstration: 

## Technological Design Choices

Here is a list of the various technologies I used in this project:

### Flask
    The backend of the application is implemented using Flask. Python Flask is a lightweight and powerful web framework. It stands out for its simplicity, flexibility, and fine-grained control over its components, making it an ideal choice for my project.

### Jinja
    Jinja is the templating engine that I used for my project. Jinja is a fast, expressive, extensible templating engine. Special placeholders in the template allow writing code similar to Python syntax. Then the template is passed data to render the final document.

### SQLite & SQLAlchemy
    SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. The ORM used is CS50's implementation of SQLAlchemy which made it possible to work with Python's own objects instead of writing separate SQL queries.

### Bootstrap
    Bootstrap is a CSS framework directed at responsive front-end web development. It contains HTML, CSS and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.

## Filesystem Explanation

Below is a list of all the folders and files that the project contains:
- `app.py` - The main file where the Flask routes are created, also containing route handlers for API endpoints.
- `arc.db` - The database storing the users' data.
- `/templates` - Contains HTML webpages of the application.
  - `apology.html` - Error page on form submission while logging in or registering for a new user.
  - `fame.html` - Global Leaderboard showing the top 10 players ranked according to their highest scores.
  - `game.html` - The primary page that contains the actual Scorching Sprint game.
  - `index.html` - Homepage of the application.
  - `layout.html` - Boilerplate used for the other webpages.
  - `login.html` - Displays login form.
  - `register.html` - Displays new user registration form.
  - `stats.html` - Shows the player title, highest score and five recent game scores of the current user.
- `/static` - Contains graphics and music used in the game. Also contains the stylesheets (`.css`) and script files (`.js`) powering the application.
  - `/graphics` - Contains the game artwork files.
    - `cloud{1..4}.png`
    - `dinoOnFire.gif`
    - `dragon.gif`
    - `gameBG.jpg`
    - `ground.png`
    - `homeBG.jpeg`
    - `horizontalFire.gif`
    - `runningDino.gif`
    - `standingDino.gif`
    - `verticalFire.gif`
  - `/sounds` - Contains game music files.
    - `chase.mp3`
    - `dragonCastle.mp3`
  - `/stylesheets` - Contains CSS stylesheets.
    - `apologyStyles.css` - Stylesheet for `apology.html` page.
    - `fameStyles.css` - Stylesheet for `fame.html` page.
    - `formStyles.css` - Stylesheet for `login.html` and `register.html` pages.
    - `gameStyles.css` - Stylesheet for `game.html` page.
    - `indexStyles.css` - Stylesheet for `index.html` page.
    - `statsStyles.css` - Stylesheet for `stats.html` page.
  - `/scripts` - Contains frontend JS scripts.
    - `coloringScript.js` - Script to get colored usernames on all pages. Used in `layout.html` page.
    - `formValidationScript.js` - Script (from Bootstrap) for frontend validation of forms. Used in `login.html` and `register.html` pages.
    - `gameScript.js` - Primary script powering the actual game. Used in `game.html` page.

## Artwork & Music Credits

#### `/static/graphics/runningDino.gif`
> **Dino-4-Run** | https://dribbble.com/shots/4146682-Dino-4-Run  
> Artowrk by **Gustavo Zanzero** | https://dribbble.com/zgus

#### `/static/graphics/dragon.gif`
> **First animation: dragon flight** | https://www.deviantart.com/allmannerofbeasties/art/First-animation-dragon-flight-521575008  
> Artwork by **AllMannerOfBeasties** | https://www.deviantart.com/allmannerofbeasties

#### `/static/graphics/gameBG.jpg` and `/static/graphics/homeBG.jpeg`
> From **Firewatch** | https://www.firewatchgame.com

#### `/static/sounds/chase.mp3`
> **Chase** by **Alexander Nakarada** | https://creatorchords.com  
> Music promoted by https://www.chosic.com/free-music/all  
> Attribution 4.0 International (CC BY 4.0)  
> https://creativecommons.org/licenses/by/4.0

#### `/static/sounds/dragonCastle.mp3`
> **Dragon Castle** by **Makai Symphony** | https://soundcloud.com/makai-symphony  
> Music promoted by https://www.chosic.com/free-music/all  
> Creative Commons CC BY-SA 3.0  
> https://creativecommons.org/licenses/by-sa/3.0
