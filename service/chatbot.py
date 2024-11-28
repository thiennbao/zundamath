import random

class ChatBot():
  def __new__(cls):
    if not hasattr(cls, "_instance"):
      cls._instance = super(ChatBot, cls).__new__(cls)
      cls.model = None # Init model here
    return cls._instance
    
  def chat(self, message):
    # Just placeholder, change later
    messages = [
      "Anh hẹn em Pickleball 🏓🌟",
      "Ta vờn nhau Pickleball 🎉💖",
      "Tay vợt bên dưới hông 🤾‍♂️👟",
      "Anh đập banh, đập banh 💥🏃‍♂️",
      "Đến em mạnh vào 💪🔥",
      "Ta chỉ chơi Pickleball 🎈✨",
      "Không nên vượt mức Pickleball 🚫🎯",
      "Đưa vợt anh tiếp banh 🥢🎾",
      "High and low 📈📉",
      "Từ thấp đến trên cao 🌅🌈",
      "Ta chỉ gặp chơi Pickleball. 🎊🏆",
    ]
    msg = random.choice(messages)
    return msg

    