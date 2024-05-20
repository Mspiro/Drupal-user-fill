from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/receive-data', methods=['POST'])
def receive_data():
    # Path to your JSON file
    json_file_path = 'test.json'

    # Read the existing data from the JSON file
    if os.path.exists(json_file_path):
        with open(json_file_path, 'r') as file:
            try:
                json_data = json.load(file)
            except json.JSONDecodeError:
                return jsonify({'status': 'error', 'message': 'Invalid JSON format in file'}), 400
    else:
        return jsonify({'status': 'error', 'message': 'JSON file not found'}), 404

    # Ensure json_data is a list and has at least one item
    if isinstance(json_data, list) and json_data:
        # Remove the first object
        removed_item = json_data.pop(0)

        # Write the updated data back to the JSON file
        with open(json_file_path, 'w') as file:
            json.dump(json_data, file, indent=4)

        return jsonify({'status': 'success', 'message': 'First object removed', 'removed_item': removed_item})
    else:
        return jsonify({'status': 'error', 'message': 'JSON data is not a list or is empty'}), 400

if __name__ == '__main__':
    app.run(debug=True)
