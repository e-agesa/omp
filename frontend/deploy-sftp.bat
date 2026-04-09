@echo off
REM ═══════════════════════════════════════════════════════
REM OMP Frontend — Build & Prepare for SFTP Upload (Windows)
REM Usage: deploy-sftp.bat [staging|production]
REM ═══════════════════════════════════════════════════════

set ENV=%1
if "%ENV%"=="" set ENV=staging

echo ══════════════════════════════════════
echo   OMP Frontend Build - %ENV%
echo ══════════════════════════════════════

REM Step 1: Clean
echo.
echo [1/4] Cleaning previous build...
if exist ".next" rmdir /s /q .next
if exist "out" rmdir /s /q out

REM Step 2: Install
echo [2/4] Installing dependencies...
call npm ci --production=false

REM Step 3: Env
echo [3/4] Setting environment for %ENV%...
if "%ENV%"=="production" (
  if exist ".env.production" copy /Y .env.production .env.local
) else (
  if exist ".env.staging" copy /Y .env.staging .env.local
)

REM Step 4: Build
echo [4/4] Building Next.js (standalone)...
call npm run build

echo   Copying public and static assets...
if exist "public" xcopy /E /I /Y public .next\standalone\public >nul
xcopy /E /I /Y .next\static .next\standalone\.next\static >nul

if exist ".env.local" copy /Y .env.local .next\standalone\.env.local >nul

echo.
echo ══════════════════════════════════════
echo   Build complete!
echo   Standalone output: .next\standalone\
echo.
echo   Upload the contents of .next\standalone\
echo   to your server via WinSCP or FileZilla:
echo.
echo   1. Connect to your server via SFTP
echo   2. Navigate to /var/www/omp-frontend
echo   3. Upload all files from .next\standalone\
echo   4. On server run: PORT=3000 node server.js
echo      Or with PM2: pm2 start server.js --name omp-frontend
echo ══════════════════════════════════════
