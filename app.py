from cs50 import SQL
from flask import Flask, render_template, redirect, session, request
from flask_session import Session
from functools import wraps

app = Flask(__name__)

# configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# db = SQL("sqlite:///scores.db")

@app.after_request
def after_request(response):
    """ ensure that responses are not cached """

    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"

    return response


def login_required(f):
    """ decorate routes to require login """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        
        return f(*args, **kwargs)
    
    return decorated_function


@app.route("/")
# @login_required
def index():
    """ game homepage """

    return render_template("index.html")


@app.route("/game")
# @login_required
def game():
    """ main game """

    return render_template("game.html")


@app.route("/fame")
# @login_required
def fame():
    """ top players and game stats"""

    return render_template("fame.html")


@app.route("/login", methods = ["GET", "POST"])
def login():
    """ log user in """
    if request.method == "GET":
        return render_template("login.html")
    else:
        if not request.form.get("username"):
            return "must enter username"
        elif not request.form.get("password"):
            return "must enter password"
        
        return redirect("/")


@app.route("/logout")
def logout():
    """ log user out """

    # redirect user to login form
    return redirect("/")


@app.route("/register", methods = ["GET", "POST"])
def register():
    """ register user """
    
    if request.method == "GET":
        return render_template("register.html")
    else:
        if not request.form.get("username"):
            return "must enter username"
        elif not request.form.get("password"):
            return "must enter password"
        elif not request.form.get("confirmation"):
            return "must confirm password"
        elif request.form.get("password") != request.form.get("confirmation"):
            return "password fields do not match"
        
        username = request.form.get("username")

        return redirect("/")