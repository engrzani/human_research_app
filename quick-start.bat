@echo off
echo ================================
echo Human Research Shop App - Quick Start
echo ================================
echo.

echo [1/4] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install from: https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js found!

echo.
echo [2/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo [3/4] Checking Expo CLI...
call expo --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Expo CLI not found. Installing...
    call npm install -g expo-cli
)

echo.
echo [4/4] Setup complete!
echo.
echo ================================
echo Next Steps:
echo ================================
echo 1. Configure Firebase in src/config/firebase.js
echo 2. Update payment URL in src/screens/CartScreen.js
echo 3. Run: npm start
echo.
echo For detailed setup instructions, see SETUP_GUIDE.md
echo.
pause
