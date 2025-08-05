@echo off
REM 🏴‍☠️ Travel Landing Page - Development Startup Script for Windows
REM Ahoy matey! This script will help ye start yer development environment!

echo 🏴‍☠️ Starting Travel Landing Page Development Environment...
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ☠️ Docker is not installed! Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ☠️ Docker Compose is not installed! Please install Docker Compose first.
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose found!

REM Create .env files if they don't exist
if not exist "frontend\.env" (
    echo 📝 Creating frontend .env file...
    copy "frontend\env.example" "frontend\.env"
)

if not exist "backend\.env" (
    echo 📝 Creating backend .env file...
    copy "backend\env.example" "backend\.env"
)

echo.

REM Start the services
echo 🚀 Starting services with Docker Compose...
docker-compose up -d

echo.
echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak >nul

REM Check if services are running
echo 🔍 Checking service status...

REM Check PostgreSQL
docker-compose ps postgres | findstr "Up" >nul
if errorlevel 1 (
    echo ☠️ PostgreSQL failed to start
) else (
    echo ✅ PostgreSQL is running
)

REM Check Backend
docker-compose ps backend | findstr "Up" >nul
if errorlevel 1 (
    echo ☠️ Backend failed to start
) else (
    echo ✅ Backend is running
)

REM Check Frontend
docker-compose ps frontend | findstr "Up" >nul
if errorlevel 1 (
    echo ☠️ Frontend failed to start
) else (
    echo ✅ Frontend is running
)

echo.
echo 🌍 Your services are now running at:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:8080
echo    Database: localhost:5432
echo.
echo 📊 To view logs: docker-compose logs -f
echo 🛑 To stop services: docker-compose down
echo.
echo 🏴‍☠️ Happy coding, captain! ☠️
pause 