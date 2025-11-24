#!/bin/bash

# IMPORTANT: This script needs to be run by ROOT to fix the login issue
# 
# Issue: The dashboard server running as PID 215724 (owned by root) is using
# the old code with incorrect database schema. It has roleType instead of role.
#
# Solution: Kill the old process and start the new one

echo "🔧 Fixing Bizoforce Dashboard Server"
echo "======================================"
echo ""

# Kill old processes
echo "1. Stopping old dashboard processes..."
pkill -f "dashboard/node_modules/.bin/cross-env"
pkill -f "dashboard/dist/index.js"

# Wait a moment
sleep 2

# Check if port is free
if lsof -i :3006 > /dev/null 2>&1; then
    echo "❌ Port 3006 is still in use. Trying harder..."
    fuser -k 3006/tcp
    sleep 2
fi

# Navigate to dashboard
cd /home/bizoforce/public_html/dashboard

# Start with PM2 as root
echo "2. Starting new dashboard server..."
pm2 start dist/index.js --name dashboard -i 1 --update-env

# Check status
echo ""
echo "3. Checking status..."
pm2 list

echo ""
echo "4. Testing login endpoint..."
sleep 3
curl -X POST http://localhost:3006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"test123"}' \
  2>/dev/null | python3 -m json.tool 2>/dev/null || echo "Login test completed"

echo ""
echo "✅ Done! If you see a JWT token above, the fix worked!"
echo ""
echo "To check logs: pm2 logs dashboard"
echo "To restart: pm2 restart dashboard"
