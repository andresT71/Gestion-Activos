#!/bin/bash

echo "📋 Showing logs for Gestión de Activos..."
echo "Press Ctrl+C to exit"
echo "======================================================"
echo "Select logs to view:"
echo "1) Backend logs"
echo "2) Frontend logs" 
echo "3) All logs (default)"
echo "======================================================"

read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo "🔍 Showing backend logs..."
        docker-compose logs -f backend
        ;;
    2)
        echo "🔍 Showing frontend logs..."
        docker-compose logs -f frontend
        ;;
    3|"")
        echo "🔍 Showing all logs..."
        docker-compose logs -f
        ;;
    *)
        echo "❌ Invalid choice. Showing all logs..."
        docker-compose logs -f
        ;;
esac
