from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the trained models
with open('models/traffic_predictor.pkl', 'rb') as f:
    traffic_predictor = pickle.load(f)

with open('models/clustering_model.pkl', 'rb') as f:
    clustering_model = pickle.load(f)

@app.route('/predict_traffic', methods=['POST'])
def predict_traffic():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)
    prediction = traffic_predictor.predict(features)
    return jsonify({'prediction': prediction.tolist()})

@app.route('/cluster_data', methods=['POST'])
def cluster_data():
    data = request.json
    features = np.array(data['features'])
    clusters = clustering_model.predict(features)
    return jsonify({'clusters': clusters.tolist()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)