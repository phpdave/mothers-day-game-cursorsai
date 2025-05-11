#!/bin/bash

echo "🎮 Mother's Day Game Sharing Information 🎮"
echo "=========================================="
echo ""
echo "Local access:"
echo "http://localhost:8000"
echo ""
echo "Network access (for other devices on your network):"
echo "http://172.29.154.162:8000"
echo ""
echo "To stop sharing, press Ctrl+C"
echo ""
echo "Starting server..."
python3 -m http.server 8000 