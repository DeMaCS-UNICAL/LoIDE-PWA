#!/bin/bash
# Build Docker image with version from package.json

set -e

# Extract version from package.json
VERSION=$(node -p "require('./package.json').version")
IMAGE_NAME="loide-pwa"

echo "Building ${IMAGE_NAME}:${VERSION}..."

# Build with version as build arg and tag
docker build \
  --build-arg APP_VERSION="${VERSION}" \
  -t "${IMAGE_NAME}:${VERSION}" \
  -t "${IMAGE_NAME}:latest" \
  .

echo ""
echo "✅ Built successfully!"
echo "   - ${IMAGE_NAME}:${VERSION}"
echo "   - ${IMAGE_NAME}:latest"
echo ""
echo "Run with:"
echo "  docker run -p 9000:9000 -e LOIDE_API_SERVER=your-api-server:8084 ${IMAGE_NAME}:${VERSION}"
echo ""
echo "Note: Ports are configured in config/server/server-config.json (http: 9000, https: 9001)"
