@echo off
echo ==========================================
echo  Starting EventHub AI Application...
echo ==========================================

IF NOT EXIST "node_modules\" (
  echo Installing backend dependencies (one-time)...
  call npm install
)

echo Launching EventHub server on http://localhost:5001
echo Open your browser to http://localhost:5001
node server/server.js
pause
