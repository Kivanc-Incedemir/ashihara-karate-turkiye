@echo off
REM Double-click this to refresh the photo gallery after adding images to \photos
cd /d "%~dp0"
node scripts\build-gallery.mjs
echo.
pause
