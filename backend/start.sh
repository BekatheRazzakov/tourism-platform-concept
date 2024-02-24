#!/bin/bash
CURRENT_DIR=$(pwd)
echo CURRENT_DIR
# Change directory to the backend directory
cd /Users/brzzkvgmail.com/Downloads/ESDP/tourism-platform-concept/backend

# Install dependencies
npm install

# Start the Express.js server
npm run dev
