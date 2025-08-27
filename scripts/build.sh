#!/bin/bash

echo "🏗️  Building Docker images for Gestión de Activos..."
echo "======================================================"

# Build backend
echo "🔨 Building backend image..."
docker build -f Dockerfile.backend -t gestion-activos-backend:latest .

if [ $? -eq 0 ]; then
    echo "✅ Backend image built successfully!"
else
    echo "❌ Failed to build backend image"
    exit 1
fi

# Build frontend
echo "🔨 Building frontend image..."
docker build -f Dockerfile.frontend -t gestion-activos-frontend:latest .

if [ $? -eq 0 ]; then
    echo "✅ Frontend image built successfully!"
else
    echo "❌ Failed to build frontend image"
    exit 1
fi

echo "======================================================"
echo "📦 Images created:"
docker images | grep gestion-activos-
echo "✅ Build completed!"
