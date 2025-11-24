# Bizoforce Dashboard - Quick Deployment Guide

## Automatic Deployment

Use the automated deployment script for production updates:

```bash
cd /home/bizoforce/public_html/dashboard
./deploy.sh
```

This script automatically:

1. ✅ Runs TypeScript compilation check
2. 🔨 Builds production bundle (frontend + backend)
3. ♻️ Restarts PM2 process with updated env
4. 💾 Saves PM2 configuration
5. 🔍 Checks for errors in logs

## Manual Deployment Steps

If you need to deploy manually:

```bash
# 1. Check TypeScript compilation
npm run check

# 2. Build production bundle
npm run build:prod

# 3. Restart PM2
sudo /usr/local/bin/pm2 restart dashboard --update-env

# 4. Save PM2 config
sudo /usr/local/bin/pm2 save
```

## Quick Commands

```bash
# View logs
sudo /usr/local/bin/pm2 logs dashboard

# Check status
sudo /usr/local/bin/pm2 list

# View last 50 log lines
sudo /usr/local/bin/pm2 logs dashboard --lines 50 --nostream

# Test API endpoint
curl -X GET "http://localhost:3006/api/companies" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Frontend not updating

- Clear browser cache: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Check bundle hash in HTML: `curl -s https://dashboard.bizoforce.com/ | grep index-`
- Verify build created new files: `ls -lh dist/client/assets/`

### Sidebar links not clickable

- Ensure latest frontend bundle is deployed
- Check browser console for JavaScript errors
- Verify Wouter routing is working

### API returning errors

- Check PM2 logs: `sudo /usr/local/bin/pm2 logs dashboard --err`
- Verify database connections: Look for "Connected to 5/5 databases" in logs
- Test database queries manually with credentials from `.env`

## Production URL

**Live Site**: https://dashboard.bizoforce.com

## Development

```bash
# Start development server (port 3006)
npm run dev

# Build server only
npm run build:server

# TypeScript check
npm run check
```

---

_Last Updated: November 24, 2025_
