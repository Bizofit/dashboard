#!/bin/bash
# Bizoforce Dashboard Production Deployment Script
# This script builds and deploys the dashboard to production

set -e  # Exit on any error

echo "🚀 Bizoforce Dashboard Production Deployment"
echo "============================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run from dashboard root directory."
    exit 1
fi

# 1. TypeScript Compilation Check
echo "📝 Step 1/5: TypeScript compilation check..."
npm run check
if [ $? -eq 0 ]; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi

# 2. Build Production Bundle
echo ""
echo "🔨 Step 2/5: Building production bundle (frontend + backend)..."
npm run build:prod
if [ $? -eq 0 ]; then
    echo "✅ Production build successful"
else
    echo "❌ Production build failed"
    exit 1
fi

# 3. Restart PM2 Process
echo ""
echo "♻️  Step 3/5: Restarting PM2 dashboard process..."
sudo /usr/local/bin/pm2 restart dashboard --update-env
if [ $? -eq 0 ]; then
    echo "✅ PM2 restart successful"
else
    echo "❌ PM2 restart failed"
    exit 1
fi

# 4. Save PM2 Configuration
echo ""
echo "💾 Step 4/5: Saving PM2 configuration..."
sudo /usr/local/bin/pm2 save
if [ $? -eq 0 ]; then
    echo "✅ PM2 configuration saved"
else
    echo "⚠️  Warning: PM2 save failed (non-critical)"
fi

# 5. Check for errors in logs
echo ""
echo "🔍 Step 5/5: Checking for errors in recent logs..."
sleep 2  # Wait for server to start
sudo /usr/local/bin/pm2 logs dashboard --lines 20 --nostream 2>&1 | grep -iE "error|Error|ERROR" | tail -5 || echo "✅ No errors found in recent logs"

# Final status check
echo ""
echo "📊 Current PM2 Status:"
sudo /usr/local/bin/pm2 list | grep dashboard

echo ""
echo "============================================"
echo "✨ Deployment Complete!"
echo "🌐 Production URL: https://dashboard.bizoforce.com"
echo "📝 To view logs: sudo /usr/local/bin/pm2 logs dashboard"
echo "============================================"
