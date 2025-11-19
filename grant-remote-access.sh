#!/bin/bash
# Run this script on the remote server to grant remote MySQL access

echo "================================================"
echo "  MySQL Remote Access Configuration"
echo "================================================"
echo ""

# Login to MySQL and grant remote access
mysql -u root -p << EOF

-- Grant remote access to giglancerusr from any IP
GRANT ALL PRIVILEGES ON giglancer_bizoforce.* TO 'giglancerusr'@'%' IDENTIFIED BY 'Giglancer123@';

-- Or for specific IP (replace with your actual IP)
-- GRANT ALL PRIVILEGES ON giglancer_bizoforce.* TO 'giglancerusr'@'YOUR_IP_ADDRESS' IDENTIFIED BY 'Giglancer123@';

FLUSH PRIVILEGES;

-- Verify the grant
SELECT User, Host FROM mysql.user WHERE User='giglancerusr';

EOF

echo ""
echo "✅ Remote access granted for giglancerusr"
echo ""
echo "Now check MySQL bind-address configuration:"
echo "  1. Edit: sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf"
echo "  2. Find: bind-address = 127.0.0.1"
echo "  3. Change to: bind-address = 0.0.0.0"
echo "  4. Restart: sudo systemctl restart mysql"
echo ""
