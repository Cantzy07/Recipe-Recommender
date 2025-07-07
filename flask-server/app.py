from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/cardswipe", method=['POST']) 
def card_swiped():
    data = request.json() # { cardId, direction }
    id = data["cardId"]
    direction = data["direction"]

    # left: no, right: maybe, up: yes, down: save
    # if no just add to seen list
    # if maybe add to maybe list to average to find new vector and add to seen
    # up then display recipe
    # down add to saved


    return jsonify({"status": "ok", **data})

if __name__ == "__main__":
    app.run(debug=True)