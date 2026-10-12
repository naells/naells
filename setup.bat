@echo off
title Naell Linktree Dev Server
echo ========================================================
echo        Naell Linktree - Setup & Development Server
echo ========================================================
echo.

if not exist node_modules (
    echo [1/2] Installing dependencies...
    call npm install
) else (
    echo [1/2] Dependencies already installed.
)

echo.
echo [2/2] Starting development server at http://localhost:3000...
echo.
call npm run dev

pause
