#!/bin/bash

# 🏴‍☠️ Travel Landing Page - Development Startup Script
# Ahoy matey! This script will help ye start yer development environment!

echo "🏴‍☠️ Starting Travel Landing Page Development Environment..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "☠️ Docker is not installed! Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "☠️ Docker Compose is not installed! Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose found!"

# Create .env files if they don't exist
if [ ! -f "frontend/.env" ]; then
    echo "📝 Creating frontend .env file..."
    cp frontend/env.example frontend/.env
fi

if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    cp backend/env.example backend/.env
fi

echo ""

# Start the services
echo "🚀 Starting services with Docker Compose..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."

# Check PostgreSQL
if docker-compose ps postgres | grep -q "Up"; then
    echo "✅ PostgreSQL is running"
else
    echo "☠️ PostgreSQL failed to start"
fi

# Check Backend
if docker-compose ps backend | grep -q "Up"; then
    echo "✅ Backend is running"
else
    echo "☠️ Backend failed to start"
fi

# Check Frontend
if docker-compose ps frontend | grep -q "Up"; then
    echo "✅ Frontend is running"
else
    echo "☠️ Frontend failed to start"
fi

echo ""
echo "🌍 Your services are now running at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8080"
echo "   Database: localhost:5432"
echo ""
echo "📊 To view logs: docker-compose logs -f"
echo "🛑 To stop services: docker-compose down"
echo ""
echo "🏴‍☠️ Happy coding, captain! ☠️" 