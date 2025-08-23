@echo off
TITLE Push Changes to GitHub - Auto Git Finder

echo Attempting to locate Git and push changes to GitHub...
echo.

REM Common Git installation paths to check
set "GIT_PATHS=C:\Program Files\Git\bin;C:\Program Files\Git\cmd;C:\Program Files (x86)\Git\bin;C:\Program Files (x86)\Git\cmd;C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Git\bin;C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Git\cmd"

REM Try to find Git in common locations
set "FOUND_GIT="
for %%p in (%GIT_PATHS%) do (
    if exist "%%p\git.exe" (
        set "FOUND_GIT=%%p\git.exe"
        echo Found Git at: %%p\git.exe
        goto :FOUND
    )
)

echo Could not find Git in common locations.
echo.
echo Please specify the full path to git.exe:
set /p GIT_PATH="Git path: "

if exist "%GIT_PATH%" (
    set "FOUND_GIT=%GIT_PATH%"
    goto :FOUND
) else (
    echo The specified path does not exist.
    echo Please download and install Git from https://git-scm.com/downloads
    echo.
    pause
    exit /b 1
)

:FOUND
echo Using Git from: %FOUND_GIT%
echo.

REM Navigate to project directory
cd /d %~dp0

echo Adding changes to Git...
"%FOUND_GIT%" add .

echo.
echo Enter commit message (default: "Integrate PostgreSQL database with Neon"):
set /p COMMIT_MSG="Commit message: " || set COMMIT_MSG=Integrate PostgreSQL database with Neon

echo.
echo Committing changes with message: "%COMMIT_MSG%"
"%FOUND_GIT%" commit -m "%COMMIT_MSG%"

echo.
echo Pushing to main branch...
"%FOUND_GIT%" push origin master

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
