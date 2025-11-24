# 🚀 Quick Start Guide - Bizoforce Dashboard Build

## ✅ Build Complete!

**Status:** Production Ready  
**Build Time:** 4.72s  
**Bundle Size:** 296KB (91KB gzipped)  
**Node Version:** v20.19.5  
**Date:** November 22, 2025

---

## 🎯 Quick Deploy

### Development

```bash
npm start
# Server: http://localhost:3006
```

### Production (PM2)

```bash
npm run pm2:start
npm run pm2:logs
```

### Production (Manual)

```bash
NODE_ENV=production npm start
```

---

## 📁 Build Output

```
client/dist/
├── index.html           (625 bytes)
├── vite.svg            (1.5 KB)
└── assets/
    ├── index-*.js      (196 KB) - Main app
    ├── react-vendor-*.js (44 KB) - React libs
    ├── utils-*.js       (36 KB) - Utilities
    └── index-*.css      (17 KB) - Styles
```

**Total:** 296 KB uncompressed, ~91 KB gzipped

---

## ⚙️ Configuration

### Required .env Variables

```bash
NODE_ENV=production
PORT=3006
JWT_SECRET=your_secret_here
SESSION_SECRET=your_session_secret

# 5 Database configs (see .env.production.example)
```

---

## 🧪 Quick Tests

### Health Check

```bash
curl http://localhost:3006/health
```

### Auth Test

```bash
curl -X POST http://localhost:3006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### Full Test Suite

```bash
node test-dashboard-api.js
```

---

## 🌐 URLs

- **Frontend:** `/` (React SPA)
- **API:** `/api/*`
- **Health:** `/health`
- **Login:** `/login.html`
- **Dashboard:** `/dashboard`

---

## 📊 PM2 Commands

```bash
pm2 start ecosystem.config.js   # Start
pm2 stop bizoforce-dashboard    # Stop
pm2 restart bizoforce-dashboard # Restart
pm2 logs bizoforce-dashboard    # Logs
pm2 monit                        # Monitor
pm2 status                       # Status
```

---

## 🔧 Common Commands

### Rebuild

```bash
./build.sh
```

### Update & Redeploy

```bash
git pull origin main
./build.sh
npm run pm2:restart
```

### View Logs

```bash
tail -f logs/app.log
npm run pm2:logs
```

### Database Test

```bash
node test-db.js
```

---

## 🐛 Quick Troubleshooting

**Port in use:**

```bash
lsof -i :3006
kill -9 <PID>
```

**Build fails:**

```bash
rm -rf node_modules client/node_modules
npm install
cd client && npm install && cd ..
./build.sh
```

**Database connection:**

```bash
node test-db.js
```

---

## 📚 Documentation

- `BUILD-SUCCESS.md` - Full build report
- `DEPLOYMENT.md` - Deployment guide
- `BUILD-CHECKLIST.md` - Pre/post checks
- `docs/SESSION-BASED-DASHBOARD.md` - Architecture

---

## 🎉 Success Checklist

- [x] Backend dependencies installed
- [x] Frontend built & optimized
- [x] Database connections verified
- [x] Build artifacts generated
- [x] PM2 config created
- [x] Documentation complete

## Next: Deploy! 🚀

```bash
npm run pm2:start
```

---

**Build by:** build.sh  
**Commit:** 62ee0aa  
**Ready:** YES ✅
