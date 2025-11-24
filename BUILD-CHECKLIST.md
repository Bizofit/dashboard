# Build Checklist

## Pre-Build

- [ ] All dependencies installed (`npm install`)
- [ ] Environment variables configured (`.env` file)
- [ ] Database connections verified (`npm test`)
- [ ] Code committed to git
- [ ] Tests passing

## Build

```bash
./build.sh
```

## Post-Build Verification

- [ ] Check `client/dist` directory exists
- [ ] Verify `build-info.json` created
- [ ] Test static file serving
- [ ] Verify API endpoints work

## Deployment

- [ ] Copy `.env.production.example` to `.env` with production values
- [ ] Set `NODE_ENV=production`
- [ ] Configure web server (nginx/Apache)
- [ ] Set up SSL certificates
- [ ] Start application (`npm start` or `pm2 start`)

## Testing

- [ ] Health check: `curl http://localhost:3006/health`
- [ ] Login test: `curl -X POST http://localhost:3006/api/auth/login`
- [ ] Dashboard test: Access https://dashboard.bizoforce.com

## Monitoring

- [ ] Check logs: `tail -f logs/app.log`
- [ ] Monitor PM2: `pm2 monit`
- [ ] Check database connections: `node test-db.js`

## Rollback Plan

If issues occur:

```bash
# Stop current version
pm2 stop bizoforce-dashboard

# Revert to previous commit
git checkout <previous-commit>

# Rebuild
./build.sh

# Restart
pm2 start ecosystem.config.js
```

---

**Build Date:** $(date)  
**Environment:** Production  
**Node Version:** $(node -v)
