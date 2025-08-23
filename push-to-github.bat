@echo off
TITLE Push Changes to GitHub

echo Preparing to push changes to GitHub main branch...
echo.

REM Set Git path - using the path you provided
SET "GIT_PATH=C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Git\bin"

REM Add Git to PATH temporarily
SET "PATH=%GIT_PATH%;%PATH%"

REM Check if Git is accessible with the new path
echo Checking for Git access...
"%GIT_PATH%\git.exe" --version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Could not find Git executable. 
    echo Try running:
    echo "C:\Program Files\Git\bin\git.exe" --version
    echo or
    echo "C:\Program Files (x86)\Git\bin\git.exe" --version
    echo.
    pause
    exit /b
)

REM Navigate to project directory
cd /d %~dp0

echo Adding changes to Git...
call git add .

echo.
echo Enter commit message (default: "Integrate PostgreSQL database with Neon"):
set /p COMMIT_MSG="Commit message: " || set COMMIT_MSG=Integrate PostgreSQL database with Neon

echo.
echo Committing changes with message: "%COMMIT_MSG%"
call git commit -m "%COMMIT_MSG%"

echo.
echo Pushing to main branch...
call git push origin master

echo.
if %ERRORLEVEL% EQU 0 (
    echo Successfully pushed to GitHub!
) else (
    echo There was an issue pushing to GitHub.
    echo You might need to set up authentication or resolve merge conflicts.
)

echo.
echo Press any key to exit...
pause > nul

echo.
if %ERRORLEVEL% EQU 0 (
    echo Successfully pushed changes to GitHub!
) else (
    echo Failed to push changes. Please check your internet connection and GitHub credentials.
)

echo.
pause
