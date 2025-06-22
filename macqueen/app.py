from flask import Flask, render_template, jsonify, request
import json
import os

app = Flask(__name__)

# Глобальные переменные для хранения состояния игры
game_state = {
    'is_running': False,
    'score': 0,
    'best_score': 0,
    'generation': 1,
    'population_size': 50,
    'current_agent': 0
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/game-state')
def get_game_state():
    return jsonify(game_state)

@app.route('/api/start-game', methods=['POST'])
def start_game():
    game_state['is_running'] = True
    game_state['score'] = 0
    return jsonify({'status': 'success'})

@app.route('/api/reset-game', methods=['POST'])
def reset_game():
    game_state['is_running'] = False
    game_state['score'] = 0
    return jsonify({'status': 'success'})

@app.route('/api/update-score', methods=['POST'])
def update_score():
    data = request.get_json()
    score = data.get('score', 0)
    game_state['score'] = score
    if score > game_state['best_score']:
        game_state['best_score'] = score
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 