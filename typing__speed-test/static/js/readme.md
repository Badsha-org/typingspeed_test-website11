# Typing Speed Test Website

## Overview
A Monkeytype-inspired typing speed test website with customizable time options (30s, 60s, 120s), 8 themes, smooth animations, and stats tracking. Supports timed, free, and practice modes, a 50-quote library, custom quote input, and responsive design.

## Features
- *Time Options*: 30s, 60s, 120s tests.
- *Modes*: Timed, Free Type, Practice with quotes.
- *Themes*: Dark, Light, Neon, Pastel, Minimal, Ocean, Retro, Cyberpunk.
- *Animations*: Blinking caret, letter highlighting, fade-ins, and transitions.
- *Stats*: Real-time WPM, accuracy, errors, stored in SQLite.
- *Quotes*: 50 quotes, with custom quote input.
- *Responsive*: Optimized for desktop, tablet, and mobile.
- *Localization*: Supports ?lang= query (e.g., ?lang=en).

## Setup
1. Clone: git clone https://github.com/bhishamt/typing-speed-test
2. Install: pip install -r requirements.txt
3. Run: python app.py
4. Access: http://localhost:5000/?lang=en
5. Deploy: Use Heroku/Netlify.

## Technical Details
- *Frontend*: HTML5, CSS3 (~1200 lines, Grid, Flexbox, animations), JavaScript (ES6+).
- *Backend*: Flask with SQLite for quotes and stats.
- *API Endpoints*:
  - GET /quotes: Fetch quotes.
  - POST /save_stats: Save stats.
  - POST /add_quote: Add custom quote.

## Deployment
- *Heroku*:
  - Create Procfile: web: python app.py
  - Deploy: git push heroku main
  - URL: https://typing-speed-test.herokuapp.com/?lang=en
- *Netlify (Frontend)*: Host static files, connect to backend via API.

## Usage
- Select time, mode, and theme from the settings.
- Click "Start" to begin typing.
- View real-time stats (WPM, accuracy, errors).
- Add custom quotes via the input field.

## Live Demo
[https://typing-speed-test.herokuapp.com/?lang=en](https://typing-speed-test.herokuapp.com/?lang=en)