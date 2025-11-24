# Deployment Guide - Bizoforce Unified Dashboard

## 🚀 Quick Deploy

```bash
# 1. Build the application
chmod +x build.sh
./build.sh

# 2. Configure environment
cp .env.production.example .env
nano .env  # Update with production values

# 3. Start the server
npm start

# OR use PM2 for production
npm run pm2:start
```

## 📋 Prerequisites

### System Requirements

- **Node.js**: v18+ or v20+ (tested with v24+)
- **npm**: v8+
- **Memory**: Minimum 1GB RAM
- **Disk**: 500MB free space
- **OS**: Linux (Ubuntu/CentOS/Debian)

### Database Access

Ensure your server can connect to:

- MySQL servers (ports 3306)
- PostgreSQL server (port 5432)
- IP: 72.167.148.100

### Required Packages

```bash
# Install PM2 globally (recommended for production)
npm install -g pm2

# Install build tools
npm install -g concurrently
```

## 🏗️ Build Process

### Option 1: Using Build Script (Recommended)

```bash
./build.sh
```

This will:

- ✅ Install all dependencies
- ✅ Build React frontend with Vite
- ✅ Optimize production bundles
- ✅ Verify database connections
- ✅ Create build info file

### Option 2: Manual Build

```bash
# Install backend dependencies
npm install --production

# Build frontend
cd client
npm install
npm run build
cd ..

# Verify build
ls -la client/dist
```

## ⚙️ Configuration

### 1. Environment Variables

```bash
# Copy and edit production config
cp .env.production.example .env
nano .env
```

**Critical Variables:**

- `NODE_ENV=production`
- `JWT_SECRET` - Change to strong random string
- `SESSION_SECRET` - Change to strong random string
- Database credentials for all 5 databases

### 2. Database Setup

```bash
# Test database connections
npm test

# Run migrations (if not already done)
node run-migration.js
```

### 3. Static Files

The React build outputs to `client/dist/`. Ensure your web server serves these files correctly.

## 🚦 Deployment Options

### Option A: PM2 (Recommended)

**Start:**

```bash
npm run pm2:start
# or
pm2 start ecosystem.config.js --env production
```

**Manage:**

```bash
npm run pm2:stop      # Stop server
npm run pm2:restart   # Restart server
npm run pm2:logs      # View logs
pm2 status            # Check status
pm2 monit             # Monitor resources
```

**Auto-start on boot:**

```bash
pm2 startup
pm2 save
```

### Option B: Direct Node.js

```bash
# Development
npm run dev

# Production
NODE_ENV=production npm start
```

### Option C: Systemd Service

Create `/etc/systemd/system/bizoforce-dashboard.service`:

```ini
[Unit]
Description=Bizoforce Unified Dashboard
After=network.target

[Service]
Type=simple
User=bizoforce
WorkingDirectory=/home/bizoforce/public_html/dashboard
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=bizoforce-dashboard
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

**Enable and start:**

```bash
sudo systemctl enable bizoforce-dashboard
sudo systemctl start bizoforce-dashboard
sudo systemctl status bizoforce-dashboard
```

## 🌐 Web Server Configuration

### Nginx (Recommended)

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name dashboard.bizoforce.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name dashboard.bizoforce.com;

    # SSL Configuration
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Serve React app static files
    location / {
        root /home/bizoforce/public_html/dashboard/client/dist;
        try_files $uri $uri/ /index.html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API proxy to Node.js backend
    location /api {
        proxy_pass http://localhost:3006;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90;
    }

    # Static assets cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        root /home/bizoforce/public_html/dashboard/client/dist;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Logs
    access_log /var/log/nginx/dashboard.bizoforce.com.access.log;
    error_log /var/log/nginx/dashboard.bizoforce.com.error.log;
}
```

**Apply configuration:**

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Apache (Alternative)

```apache
<VirtualHost *:80>
    ServerName dashboard.bizoforce.com
    Redirect permanent / https://dashboard.bizoforce.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName dashboard.bizoforce.com

    SSLEngine on
    SSLCertificateFile /path/to/ssl/cert.pem
    SSLCertificateKeyFile /path/to/ssl/key.pem

    DocumentRoot /home/bizoforce/public_html/dashboard/client/dist

    <Directory /home/bizoforce/public_html/dashboard/client/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted

        # React Router support
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # Proxy API requests to Node.js
    ProxyPreserveHost On
    ProxyPass /api http://localhost:3006/api
    ProxyPassReverse /api http://localhost:3006/api

    ErrorLog ${APACHE_LOG_DIR}/dashboard-error.log
    CustomLog ${APACHE_LOG_DIR}/dashboard-access.log combined
</VirtualHost>
```

## 🔒 Security Checklist

- [ ] Set strong `JWT_SECRET` and `SESSION_SECRET`
- [ ] Configure SSL/TLS certificates
- [ ] Enable firewall (allow only 80, 443)
- [ ] Set `NODE_ENV=production`
- [ ] Disable directory listing
- [ ] Configure rate limiting
- [ ] Set up regular backups
- [ ] Enable database connection encryption
- [ ] Review CORS origins
- [ ] Set secure cookie flags
- [ ] Implement CSP headers

## 📊 Monitoring

### PM2 Monitoring

```bash
pm2 status
pm2 logs bizoforce-dashboard
pm2 monit
```

### Log Files

```bash
# Application logs
tail -f logs/app.log
tail -f logs/pm2-out.log
tail -f logs/pm2-error.log

# Nginx logs
tail -f /var/log/nginx/dashboard.bizoforce.com.access.log
tail -f /var/log/nginx/dashboard.bizoforce.com.error.log
```

### Health Check

```bash
# API health endpoint
curl http://localhost:3006/health

# Expected response:
# {"status":"healthy","database":"5/5 connected","uptime":"..."}
```

## 🔄 Updates & Maintenance

### Update Application

```bash
# Pull latest code
git pull origin main

# Rebuild
./build.sh

# Restart
npm run pm2:restart
```

### Database Migrations

```bash
# Run new migrations
node run-migration.js
```

### Clear Logs

```bash
# Clear PM2 logs
pm2 flush

# Rotate logs
pm2 install pm2-logrotate
```

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear node_modules and rebuild
rm -rf node_modules client/node_modules
npm install
cd client && npm install && cd ..
./build.sh
```

### Database Connection Issues

```bash
# Test connections
node test-db.js

# Check .env file
cat .env | grep DB_HOST

# Verify firewall/network access
telnet 72.167.148.100 3306
telnet 72.167.148.100 5432
```

### Port Already in Use

```bash
# Find process using port 3006
lsof -i :3006

# Kill process
kill -9 <PID>
```

### PM2 Not Starting

```bash
# Check PM2 logs
pm2 logs bizoforce-dashboard --err

# Check permissions
ls -la /home/bizoforce/public_html/dashboard

# Restart PM2 daemon
pm2 kill
pm2 resurrect
```

## 📈 Performance Optimization

### 1. Enable Caching

- Use Redis for session storage
- Enable CDN for static assets
- Configure browser caching

### 2. Database Optimization

- Enable connection pooling (already configured)
- Add database indexes
- Optimize slow queries

### 3. Node.js Optimization

- Use cluster mode (PM2 already configured)
- Enable compression middleware
- Optimize memory usage

## 📞 Support

For issues or questions:

- Check logs: `npm run pm2:logs`
- Review documentation: `/docs/*.md`
- Test endpoints: `node test-dashboard-api.js`

---

**Last Updated:** November 22, 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✅
