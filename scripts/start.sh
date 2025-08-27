#!/bin/bash

echo "🚀 Starting Gestión de Activos containers..."
echo "======================================================"

# Check if images exist, build if not
if ! docker image inspect gestion-activos-backend:latest > /dev/null 2>&1; then
    echo "⚠️  Backend image not found. Building first..."
    ./scripts/build.sh
fi

if ! docker image inspect gestion-activos-frontend:latest > /dev/null 2>&1; then
    echo "⚠️  Frontend image not found. Building first..."
    ./scripts/build.sh
fi

# Start containers
docker-compose up -d

if [ $? -eq 0 ]; then
    echo "✅ Containers started successfully!"
    echo ""
    echo "🌐 Application URLs:"
    echo "   Backend API:    http://localhost:3000"
    echo "   Frontend App:   http://localhost:4200" 
    echo "   Health Check:   http://localhost:3000/health"
    echo "   API Activos:    http://localhost:3000/api/activos"
    echo ""
    echo "📋 Container status:"
    docker-compose ps
    echo ""
    echo "👀 To view logs: ./scripts/logs.sh"
    echo "🛑 To stop: ./scripts/stop.sh"
else
    echo "❌ Failed to start containers"
    exit 1
fi
