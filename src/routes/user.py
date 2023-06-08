from flask import Blueprint, request, jsonify
from prisma.models import User

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/test', methods=['GET','POST'])
def list_create():
  if request.method == 'GET':
    users = User.prisma().find_many(include={'posts': True})
    return {
      "data": [user.dict() for user in users]
    }

  if request.method == 'POST':
    data = request.json

    if data is None:
      return

    name = data.get('name')
    email = data.get('email')

    if name is None or email is None:
      return {"error": "You need to provide name and email"}

    user = User.prisma().create(data={'email': email, 'name': name})

    return dict(user)

@user_blueprint.route('/<id>', methods=['GET','POST','PATCH','DELETE'])
def user(id):
  if request.method == 'GET':
    user = User.prisma().find_unique(
      where={'userId': id},
      include={'settings': True}
    )

    return jsonify(user) if user else "User not found", 404

  if request.method == 'POST':
    data = request.json
    if not data and not data.get('username'):
      return "No username provided", 400

    user = User.prisma().create(data={
      "userId": id,
      "username": data["username"],
      "settings": {
        "create": {}
      },
      "stats": {
        "create": {}
      }
    })

    return "User created", 200