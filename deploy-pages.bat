@echo off
title Deploy Pages to GitHub
echo ========================================================
echo   Building and Deploying Pages to GitHub (main)
echo ========================================================
echo.

echo [1/2] Building production files...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Build failed! Please check your code.
    pause
    exit /b 1
)

echo.
echo [2/2] Pushing dist to GitHub main branch...
cd dist

:: Ensure .nojekyll exists
if not exist .nojekyll (
    echo # GitHub Pages > .nojekyll
)

if exist .git rmdir /s /q .git
git init -b main
git remote add origin https://github.com/naells/naells.git
git add -A
git commit -m "deploy: update pages"
git push -f origin main
rmdir /s /q .git
cd ..

echo.
echo ========================================================
echo   Success! Pages deployed to https://github.com/naells/naells
echo   Live URL: https://naells.github.io/naells/
echo ========================================================
echo.
pause
