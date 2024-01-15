from flask import Flask, request, jsonify
from flask_cors import CORS
from functions import calculate_weights

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Portfolio Builder Server'

@app.route('/weights', methods=['GET'])
def get_weights():
    data = request.json
    data = calculate_weights(data)
    return jsonify(data)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0')