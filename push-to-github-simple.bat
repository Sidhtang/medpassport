@echo off
TITLE Simple GitHub Push

echo This script will help you push your changes to GitHub.
echo.

REM Try to find Git in the system
where git >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Found Git in PATH.
    goto :USEGITWHERE
)

REM Check common Git installation paths
if exist "C:\Program Files\Git\cmd\git.exe" (
    set "GIT_EXE=C:\Program Files\Git\cmd\git.exe"
    goto :USEGIT
)

if exist "C:\Program Files\Git\bin\git.exe" (
    set "GIT_EXE=C:\Program Files\Git\bin\git.exe"
    goto :USEGIT
)

if exist "C:\Program Files (x86)\Git\cmd\git.exe" (
    set "GIT_EXE=C:\Program Files (x86)\Git\cmd\git.exe"
    goto :USEGIT
)

if exist "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Git\cmd\git.exe" (
    set "GIT_EXE=C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Git\cmd\git.exe"
    goto :USEGIT
)

echo Could not find Git. Please enter the full path to git.exe:
set /p GIT_EXE="Path to git.exe: "

if not exist "%GIT_EXE%" (
    echo Invalid path. Exiting.
    pause
    exit /b 1
)

:USEGIT
echo Using Git from: %GIT_EXE%
echo.

cd /d %~dp0

echo Adding all changes...
"%GIT_EXE%" add .

echo.
set /p COMMIT_MSG="Enter commit message (or press Enter for default): " || set COMMIT_MSG=Push code to main branch

echo.
echo Committing with message: "%COMMIT_MSG%"
"%GIT_EXE%" commit -m "%COMMIT_MSG%"

echo.
echo Pushing to main branch...
"%GIT_EXE%" push origin master

goto :END

:USEGITWHERE
echo.
cd /d %~dp0

echo Adding all changes...
git add .

echo.
set /p COMMIT_MSG="Enter commit message (or press Enter for default): " || set COMMIT_MSG=Push code to main branch

echo.
echo Committing with message: "%COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"

echo.
echo Pushing to main branch...
git push origin master

:END
echo.
if %ERRORLEVEL% EQU 0 (
    echo Successfully pushed to GitHub!
) else (
    echo There was an issue pushing to GitHub.
)

echo.
pause
