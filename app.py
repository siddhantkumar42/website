import flask

app = flask.Flask(__name__)

@app.route('/')
def index():
    return flask.send_file('static/pages/general/index.html')

@app.errorhandler(404)
def not_found(e):
    return flask.send_file('static/pages/general/404_not_found.html')

app.run()