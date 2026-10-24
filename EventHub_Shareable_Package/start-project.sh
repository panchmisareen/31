#!/bin/bash
echo "=========================================="
echo " Starting EventHub AI Application..."
echo "=========================================="

if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies (one-time)..."
  npm install
fi

echo "Launching EventHub server on http://localhost:5001"
echo "Open your browser to http://localhost:5001"
node server/server.js
