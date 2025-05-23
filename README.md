🧠 Typing Speed Test
A sleek, Monkeytype-inspired typing speed test web app featuring customizable durations, multiple themes, responsive design, and real-time performance stats.

🌐 Overview
This app provides a fun and interactive way to test and improve your typing speed. Choose from various time settings, modes, and themes to personalize your experience. Track your progress with detailed stats and enjoy smooth UI animations that make practicing more engaging.

✨ Features
⏱️ Time Options: 30s, 60s, and 120s tests.

🧪 Modes:
Timed Mode
Free Type
Practice (with quotes)

🎨 Themes:

Dark, Light, Neon, Pastel, Minimal, Ocean, Retro, Cyberpunk

🖋️ Animations:

Blinking caret, letter highlighting, fade-ins, and transitions

📊 Stats Tracking:

Real-time WPM, accuracy, error count

Stored in SQLite

📚 Quote Library:

50 curated quotes

Add your own custom quotes

📱 Responsive Design:

Optimized for desktop, tablet, and mobile

🌍 Localization:

Support for ?lang= query param (e.g., ?lang=en)

🚀 Setup & Installation
# 1. Clone the repository
git clone https://github.com/Bhishamt/typing-speed-test

# 2. Navigate to the project directory
cd typing-speed-test

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the app locally
python app.py

# 5. Access in browser
http://localhost:5000/?lang=en

🧰 Technical Details
Frontend:

HTML5, CSS3 (Grid, Flexbox, Animations — ~1200 lines), JavaScript (ES6+)

Backend:

Python Flask

SQLite for data storage

API Endpoints:

GET /quotes — Fetch available quotes

POST /save_stats — Save typing stats

POST /add_quote — Add a custom quote

📦 Deployment
Heroku
Create a Procfile:


web: python app.py
Deploy:


git push heroku main
Access:
https://typing-speed-test.herokuapp.com/?lang=en
Netlify (Frontend Only)
Host static files (HTML/CSS/JS)

Connect to backend API via environment-configured URLs

🎮 Usage
Choose your time, mode, and theme

Click Start and begin typing

View your real-time stats

Add your own quotes for personalized practice
