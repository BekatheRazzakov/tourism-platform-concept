#!/bin/bash
CURRENT_DIR=$(pwd)
echo CURRENT_DIR
# Change directory to the frontend directory
cd /Users/brzzkvgmail.com/Downloads/ESDP/tourism-platform-concept/frontend

# Install dependencies
npm install

# Build the Next.js app
npm run build
