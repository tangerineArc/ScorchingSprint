from cs50 import SQL
from flask import Flask, jsonify, render_template, redirect, request, session
from flask_session import Session
from functools import wraps
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)

# configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

db = SQL("sqlite:///arc.db")

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


@app.route("/process", methods = ["POST"])
def process():
    """ process and store score data """

    score = request.json["score"]
    username = db.execute("SELECT username FROM users WHERE id = ?", session["user_id"])[0]["username"]

    db.execute("INSERT INTO games (id, username, score) VALUES (?, ?, ?)", session["user_id"], username, score)

    result = score
    return jsonify({"result": result})


@app.route("/game")
@login_required
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
        
        username = request.form.get("username")
        userData = db.execute("SELECT * FROM users WHERE username = ?", username)

        if len(userData) != 1 or not check_password_hash(userData[0]["hash"], request.form.get("password")):
            return "invalid username and/or password"
        
        session.clear()
        session["user_id"] = userData[0]["id"]
        
        return redirect("/")


@app.route("/logout")
def logout():
    """ log user out """

    session.clear()

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
        existingUsers = db.execute("SELECT * FROM users")
        for user in existingUsers:
            if user["username"] == username:
                return "username already taken"
            
        session.clear()

        hash = generate_password_hash(request.form.get("password"))
        id = db.execute("INSERT INTO users (username, hash) VALUES(?, ?)", username, hash)

        session["user_id"] = id

        return redirect("/")
