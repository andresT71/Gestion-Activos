#!/bin/bash

echo "🛑 Stopping Gestión de Activos containers..."
echo "======================================================"

docker-compose down

if [ $? -eq 0 ]; then
    echo "✅ Containers stopped successfully!"
    echo ""
    echo "🧹 Cleaning up Docker system..."
    docker system prune -f
    echo "✅ Cleanup completed!"
else
    echo "❌ Failed to stop containers"
    exit 1
fi
