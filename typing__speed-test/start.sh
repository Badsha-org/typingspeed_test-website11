#!/bin/bash

# Create the database directory if it doesn't exist
mkdir -p instance

# Initialize the database
python -c "
import sqlite3
import os

# Create database directory if it doesn't exist
os.makedirs('instance', exist_ok=True)

# Connect to the database (this will create it if it doesn't exist)
conn = sqlite3.connect('instance/typing.db')
c = conn.cursor()

# Create tables if they don't exist
c.execute('''CREATE TABLE IF NOT EXISTS stats
             (user_id TEXT, wpm INTEGER, accuracy INTEGER, errors INTEGER, timestamp TEXT)''')
c.execute('''CREATE TABLE IF NOT EXISTS quotes
             (quote TEXT)''')

# Commit changes and close the connection
conn.commit()
conn.close()
"

# Run the application
gunicorn --bind 0.0.0.0:$PORT app:app
