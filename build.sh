#!/bin/bash

# Bizoforce Dashboard Build Script
# This script builds the frontend and prepares the backend for production

set -e  # Exit on any error

echo "======================================"
echo "🏗️  Bizoforce Dashboard Build Script"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "server.js" ]; then
    print_error "Error: server.js not found. Are you in the dashboard directory?"
    exit 1
fi

print_info "Starting build process..."
echo ""

# Step 1: Check Node.js version
print_info "Checking Node.js version..."
NODE_VERSION=$(node -v)
print_status "Node.js version: $NODE_VERSION"
echo ""

# Step 2: Install backend dependencies
print_info "Installing backend dependencies..."
if npm install --production=false; then
    print_status "Backend dependencies installed"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi
echo ""

# Step 3: Build React frontend
print_info "Building React frontend..."
cd client

if [ ! -d "node_modules" ]; then
    print_info "Installing client dependencies..."
    npm install
fi

if npm run build; then
    print_status "Frontend built successfully"
    print_info "Build output: $(pwd)/dist"
else
    print_error "Frontend build failed"
    cd ..
    exit 1
fi
cd ..
echo ""

# Step 4: Copy static files
print_info "Organizing build files..."
if [ -d "client/dist" ]; then
    print_status "Frontend dist directory ready"
    print_info "Files in dist: $(ls -1 client/dist | wc -l) items"
else
    print_warning "No dist directory found"
fi
echo ""

# Step 5: Check environment file
print_info "Checking environment configuration..."
if [ -f ".env" ]; then
    print_status ".env file exists"
else
    print_warning ".env file not found! Copy .env.example to .env"
fi
echo ""

# Step 6: Test database connections
print_info "Testing database connections..."
if node test-db.js > /dev/null 2>&1; then
    print_status "Database connections verified"
else
    print_warning "Database connection test failed (this is OK if DBs are not accessible from build machine)"
fi
echo ""

# Step 7: Create production build info
BUILD_DATE=$(date +"%Y-%m-%d %H:%M:%S")
BUILD_COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
cat > build-info.json <<EOF
{
  "buildDate": "$BUILD_DATE",
  "commit": "$BUILD_COMMIT",
  "nodeVersion": "$NODE_VERSION",
  "environment": "production"
}
EOF
print_status "Build info created: build-info.json"
echo ""

# Step 8: Display summary
echo "======================================"
echo "✨ Build Complete!"
echo "======================================"
echo ""
print_info "Build Summary:"
echo "  📦 Backend: Ready"
echo "  ⚛️  Frontend: Built (client/dist)"
echo "  🕐 Build Date: $BUILD_DATE"
echo "  📝 Commit: $BUILD_COMMIT"
echo ""
print_info "Next Steps:"
echo "  1. Review .env configuration"
echo "  2. Start server: npm start"
echo "  3. Or use PM2: npm run pm2:start"
echo ""
print_warning "Remember to:"
echo "  • Set NODE_ENV=production in .env"
echo "  • Configure reverse proxy (nginx/Apache)"
echo "  • Set up SSL certificates"
echo "  • Configure firewall rules"
echo ""
