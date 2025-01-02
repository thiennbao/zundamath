import os
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig, GenerationConfig
from huggingface_hub.hf_api import HfFolder
from dotenv import load_dotenv


load_dotenv()


class ChatBot():
  def __new__(cls):
    if not hasattr(cls, "_instance"):
      cls._instance = super(ChatBot, cls).__new__(cls)
      # Init model
      HfFolder.save_token(os.getenv("REPO_ACCESS_TOKEN"))
      bnb_config = BitsAndBytesConfig(
        load_in_4bit = True,
        bnb_4bit_use_double_quant = True,
        bnb_4bit_quant_type = "nf4",
        bnb_4bit_compute_dtype = torch.bfloat16
      )
      generation_config = GenerationConfig.from_pretrained(os.getenv("MODEL_NAME"))
      cls.model = AutoModelForCausalLM.from_pretrained(
        os.getenv("MODEL_NAME"),
        device_map = "auto",
        trust_remote_code = True,
        quantization_config = bnb_config
      )
      cls.model.generation_config = generation_config
      cls.tokenizer = AutoTokenizer.from_pretrained(os.getenv("MODEL_NAME"))
      cls.tokenizer.pad_token = cls.tokenizer.eos_token
    return cls._instance

  def chat(self, message: str, history: dict[str, str]):
    # Process history
    init_msg = {
      "role": "system",
      "content": "Bạn là một chuyên gia về toán. Khi nhận được yêu cầu từ người dùng, dựa vào những kiến thức mà bạn đã có, hãy trả lời người dùng một cách nhất quán, đầy đủ nhưng tránh dư thừa thông tin, và hơn hết nội dung câu trả lời phải chính xác nhất"
    }
    history = [init_msg, *history, {"role": "user", "content": message}]
    
    # Generate assistant
    device = "cuda" if torch.cuda.is_available() else "cpu"
    input_ids = self.tokenizer.apply_chat_template(history, return_tensors = "pt").to(device)
    attention_mask = (input_ids != self.tokenizer.pad_token_id).long()
    out_ids = self.model.generate(
      input_ids=input_ids,
      attention_mask=attention_mask,
      pad_token_id=self.tokenizer.pad_token_id,
      max_new_tokens=150,
      do_sample=True,
      top_p=0.95,
      top_k=40,
      temperature=0.1,
      repetition_penalty=1.05,
    )
    assistant = self.tokenizer.batch_decode(out_ids[:, input_ids.size(1): ], skip_special_tokens=True)[0].strip()
    return assistant
    