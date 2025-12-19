#!/bin/sh
set -e

# Replace runtime config placeholders with actual environment variables
# This runs when the container starts, before the app is served

CONFIG_FILE="/app/build/config.js"

if [ -f "$CONFIG_FILE" ]; then
  # Replace placeholder with env var, fallback to default if not set
  sed -i "s|__LOIDE_API_SERVER__|${LOIDE_API_SERVER:-localhost:8084}|g" "$CONFIG_FILE"
  
  echo "Runtime config updated:"
  cat "$CONFIG_FILE"
fi

# Execute the main command
exec "$@"
