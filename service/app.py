from flask import Flask, request, jsonify
from chatbot import ChatBot


app = Flask(__name__)
chatbot = ChatBot()


@app.route("/")
def home():
    return jsonify({ "message": "Service is alive" }), 200

@app.route("/chat", methods=["POST"])
def chat():
  data = request.get_json()
  reqMsg = data.get("message", None)
  reqHistory = data.get("history", None)
  if not reqMsg or reqHistory == None: return jsonify({ "message": "Bad request"}), 400
  try:
    resMsg = chatbot.chat(reqMsg, reqHistory)
    return jsonify({ "message": resMsg }), 200
  except:
    return jsonify({ "message": "Server internal error"}), 500

if __name__ == "__main__":
  app.run()
