# from cs50 import SQL
from flask import Flask, render_template, request

app = Flask(__name__)

# db = SQL("sqlite:///scores.db")


@app.route("/")
def index():
    """Game Homepage"""

    return render_template("index.html")


@app.route("/game")
def game():
    """Main Game"""

    return render_template("game.html")