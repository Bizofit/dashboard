# SSH Tunnel Configuration for Database Access

## Problem
Remote MySQL databases may be configured to only accept connections from localhost for security reasons.

## Solution: SSH Tunnel
Create an SSH tunnel to securely access remote databases through the SSH connection.

### Option 1: Manual SSH Tunnel (Recommended for Development)

Open a separate PowerShell terminal and run:

```powershell
# Giglancer tunnel
ssh -L 3307:localhost:3306 bizofitamin@72.167.148.100

# Keep this terminal open while developing
```

Then update your `.env` to use the tunnel:
```env
GIGLANCER_DB_HOST=127.0.0.1
GIGLANCER_DB_PORT=3307
```

### Option 2: Grant Remote MySQL Access (Less Secure)

If you have SSH access to the server:

```bash
ssh bizofitamin@72.167.148.100

# Login to MySQL
mysql -u root -p

# Grant remote access to giglancer user
GRANT ALL PRIVILEGES ON giglancer_bizoforce.* TO 'giglancerusr'@'%' IDENTIFIED BY 'Giglancer123@';
FLUSH PRIVILEGES;

# Or for specific IP:
GRANT ALL PRIVILEGES ON giglancer_bizoforce.* TO 'giglancerusr'@'YOUR_IP_ADDRESS' IDENTIFIED BY 'Giglancer123@';
FLUSH PRIVILEGES;
```

### Option 3: Use Node.js SSH Tunnel Library

Install:
```bash
npm install tunnel-ssh
```

Add to database.js (automated tunnel):
```javascript
const { createTunnel } = require('tunnel-ssh');

const tunnelOptions = {
  autoClose: true
};

const serverOptions = {
  port: 22,
  host: '72.167.148.100',
  username: 'bizofitamin',
  password: 'Sandhet123@'
};

const forwardOptions = {
  srcAddr: '127.0.0.1',
  srcPort: 3307,
  dstAddr: '127.0.0.1',
  dstPort: 3306
};

// Create tunnel before connecting to database
```

## Recommended Approach

For **local development**, use **Option 1 (Manual SSH Tunnel)**:
1. Keep SSH tunnel terminal open
2. Connect to localhost:3307 instead of remote server
3. Secure and works with existing MySQL configuration

For **production deployment** (on the same server):
- No tunnel needed - use localhost directly
- MySQL accepts local connections by default
