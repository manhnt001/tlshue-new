@echo off
setlocal

cd /d "%~dp0"

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0RenameSequential.ps1"

echo.
pause