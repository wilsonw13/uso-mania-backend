from flask import Flask
from prisma import Prisma, register
from routes.user import user_blueprint

db = Prisma()
db.connect()
register(db)

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return {
        "ping": "pong",
        "foo": "bar"
    }

app.register_blueprint(user_blueprint, url_prefix="/user")

if __name__ == "__main__":
    app.run(debug=True, port=5000, threaded=True)