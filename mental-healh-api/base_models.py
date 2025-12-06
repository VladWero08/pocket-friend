from pydantic import BaseModel
from typing import List

class Message(BaseModel):
    type: str
    content: str

class Conversation(BaseModel):
    messages: List[Message]

class HumanMessage(BaseModel):
    message: str