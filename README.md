# 🐱 Pocket Friend

An AI-powered mental health companion inspired by *Tamagotchi*, combining nostalgic digital pet care with sophisticated emotional support and personality-driven interactions. We participated in the *2025 HackITAll Hackathon* edition with this project.

## Design

https://github.com/user-attachments/assets/541ccddf-321f-464e-b3b8-ed06e170ecc4

## Key Features

- **Personality-Driven AI**: Tailored interactions based on your 16 Personalities type (INFP, ESTJ, etc.)
- **Proactive Mental Health Support**: Detects depression, anxiety, and stress patterns
- **Smart Safety Net**: Shifts from friend mode to support mode when needed, suggesting resources

## Cost-Efficient Architecture

- Azure GPT-4o mini: ~$0.02 per 100 messages
- Local T5-Flan for emotion detection: zero cost
- No GPU or special hardware required

## Future Roadmap

- Custom personality test for new users
- Photo upload to create matching virtual pet personalities
- Smart collar integration for real pet mood and health tracking

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/VladWero08/pocket-friend.git
cd pocket-friend
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
npm start
```

2. Install backend dependencies:
```bash
cd deautchBanck
npm install
npm run dev
```

3. Install the mental health API dependencies:
```
cd mental-health-api
python -m venv venv
. venv/bin/activate
pip install -r requirements.txt
fastapi dev main.py
```

4. Configure your [16 Personalities type](https://www.16personalities.com/personality-types) and start building your companion bond
