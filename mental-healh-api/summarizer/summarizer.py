import torch
import typing as t
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

class MentalHealthSummarizer():
  def __init__(self):
    # load the model and the tokenizer
    self.name = "google/flan-t5-small"
    self.model = AutoModelForSeq2SeqLM.from_pretrained(self.name)
    self.tokenizer = AutoTokenizer.from_pretrained(self.name)

    self.instruction = """You are a focused, analytical summarizer. Your role is to extract and condense content
      into a summary that captures the emotional state, notable life events, communication style,
      timeline, behavioral change and any signs of sadness, depression or concering words expressed by the user. 
      Your output must be a standalone summary of no more than 200 words."""

  def predict(self, conversation: str) -> str:
    prompt = f"{self.instruction}\n\nText: {conversation}"
    
    inputs = self.tokenizer(
      prompt,
      return_tensors="pt",
      max_length=1024,  
      truncation=True,
      padding=True
    )

    with torch.no_grad():
      outputs = self.model.generate(
        **inputs,
        max_length=512,
        min_length=100,
        no_repeat_ngram_size=3
      )
      
      return self.tokenizer.decode(outputs[0], skip_special_tokens=True)
