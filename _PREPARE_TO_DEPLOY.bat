@echo off
setlocal enabledelayedexpansion

REM === CONFIGURATION ===
set "SOURCE=%~dp0"
set "DEST=%~dp0___DEPLOY___"

REM === DATE/TIME FORMATTING (safe for filenames) ===
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (
    set "MM=%%a"
    set "DD=%%b"
    set "YYYY=%%c"
)
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (
    set "HH=%%a"
    set "MN=%%b"
)
if "%time:~0,2%" lss "10" set "HH=0%time:~1,1%"
set "HH=%HH: =0%"
set "MN=%MN::=%"

set "ZIPNAME=_DEPLOY_%YYYY%-%MM%-%DD%_%HH%-%MN%-%SS%.zip"

echo.
echo === Preparing Deployment Package ===

REM === CLEANUP OLD FILES ===
if exist "%DEST%" (
    echo Removing old ___DEPLOY___ folder...
    rd /s /q "%DEST%"
)
if exist "%ZIPNAME%" (
    echo Removing old %ZIPNAME%...
    del "%ZIPNAME%"
)

REM === CREATE FOLDER ===
echo Creating ___DEPLOY___ folder...
mkdir "%DEST%"

REM === COPY ROOT FILES ===
echo Copying root files...
for %%F in (*.html *.htm *.ico *.webmanifest *.png *.jpg *.jpeg *.gif *.svg *.json) do (
    if exist "%%F" copy "%%F" "%DEST%" >nul
)

REM === COPY RELEVANT DIRECTORIES ===
set "FOLDERS=css js img snd"
for %%D in (%FOLDERS%) do (
    if exist "%SOURCE%%%D" (
        echo Copying folder %%D...
        xcopy "%SOURCE%%%D\*" "%DEST%\%%D\" /E /I /Y >nul
    )
)

REM === OPTIONAL CLEANUP ===
echo Cleaning up dev files...
del /q "%DEST%\*.bat" >nul 2>&1
del /q "%DEST%\*.ps1" >nul 2>&1
del /q "%DEST%\*.txt" >nul 2>&1

REM === ZIP FOLDER ===
echo.
echo Creating ZIP archive: %ZIPNAME%
powershell -command "Compress-Archive -Path '%DEST%\*' -DestinationPath '%ZIPNAME%' -Force" >nul 2>&1

if exist "%ZIPNAME%" (
    echo ✅ Successfully created %ZIPNAME%
) else (
    echo ❌ Failed to create ZIP archive. Check PowerShell availability.
)

REM === REMOVE TEMP FOLDER ===
echo Removing temporary ___DEPLOY___ folder...
rd /s /q "%DEST%"

echo.
echo ✅ Done! Deployment package created:
echo    %ZIPNAME%
