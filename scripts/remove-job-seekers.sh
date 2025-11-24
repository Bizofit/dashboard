#!/bin/bash
# Script to safely remove users with ONLY job_seeker role from unified database
# Part of new migration strategy implementation
# Author: Bizoforce Dev Team
# Date: November 24, 2025

set -e  # Exit on error

# Database connection details
DB_HOST="72.167.148.100"
DB_USER="bizoforce_newdashboard"
DB_PASS='i&B4{NKC~!6cLC*r'
DB_NAME="bizoforce_newdashboard"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Orphaned User Removal Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Function to run MySQL query
run_query() {
  mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -se "$1"
}

# Step 1: Count users with ONLY job_seeker role AND no platform IDs
echo -e "${YELLOW}🔍 Step 1: Counting job seeker users (without platform IDs)...${NC}"
JOB_SEEKER_COUNT=$(run_query "
SELECT COUNT(DISTINCT u.id)
FROM unified_users u
INNER JOIN user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'job_seeker'
AND u.id NOT IN (
  SELECT user_id FROM user_roles WHERE role != 'job_seeker'
)
AND u.bizoforce_user_id IS NULL 
AND u.giglancer_user_id IS NULL 
AND u.screenly_user_id IS NULL 
AND u.work_user_id IS NULL;
")

# Step 2: Count users with NO roles and NO platform IDs
echo -e "${YELLOW}🔍 Step 2: Counting orphaned users (no roles, no platforms)...${NC}"
ORPHANED_COUNT=$(run_query "
SELECT COUNT(*)
FROM unified_users 
WHERE id NOT IN (SELECT DISTINCT user_id FROM user_roles)
  AND bizoforce_user_id IS NULL 
  AND giglancer_user_id IS NULL 
  AND screenly_user_id IS NULL 
  AND work_user_id IS NULL;
")

echo -e "${GREEN}📊 Found $JOB_SEEKER_COUNT users with ONLY job_seeker role${NC}"
echo -e "${GREEN}📊 Found $ORPHANED_COUNT users with NO roles and NO platform IDs${NC}"
echo ""

TOTAL_TO_DELETE=$((JOB_SEEKER_COUNT + ORPHANED_COUNT))

# If nothing to delete, exit
if [ "$TOTAL_TO_DELETE" -eq 0 ]; then
  echo -e "${GREEN}✅ No orphaned users found. Database is clean!${NC}"
  exit 0
fi

# Step 3: Show sample job seeker users to be deleted
if [ "$JOB_SEEKER_COUNT" -gt 0 ]; then
  echo -e "${YELLOW}📋 Job seeker users (no platform IDs) to be deleted:${NC}"
  run_query "
SELECT u.id, u.email, u.first_name, u.last_name, u.created_at
FROM unified_users u
INNER JOIN user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'job_seeker'
AND u.id NOT IN (
  SELECT user_id FROM user_roles WHERE role != 'job_seeker'
)
AND u.bizoforce_user_id IS NULL 
AND u.giglancer_user_id IS NULL 
AND u.screenly_user_id IS NULL 
AND u.work_user_id IS NULL
LIMIT 10;
" | column -t -s $'\t'
  echo ""
fi

# Step 4: Show sample orphaned users to be deleted
if [ "$ORPHANED_COUNT" -gt 0 ]; then
  echo -e "${YELLOW}📋 Orphaned users (no roles, no platforms) to be deleted (first 10):${NC}"
  run_query "
SELECT id, email, first_name, last_name, created_at
FROM unified_users 
WHERE id NOT IN (SELECT DISTINCT user_id FROM user_roles)
  AND bizoforce_user_id IS NULL 
  AND giglancer_user_id IS NULL 
  AND screenly_user_id IS NULL 
  AND work_user_id IS NULL
LIMIT 10;
" | column -t -s $'\t'
  echo ""
fi

# Step 5: Confirmation prompt
echo -e "${RED}⚠️  WARNING: This will permanently delete $TOTAL_TO_DELETE users!${NC}"
echo -e "${RED}    - Job seekers: $JOB_SEEKER_COUNT${NC}"
echo -e "${RED}    - Orphaned users: $ORPHANED_COUNT${NC}"
echo -e "${RED}⚠️  Make sure you have a database backup before proceeding!${NC}"
echo ""
read -p "Do you want to continue? Type 'yes' to confirm: " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo -e "${RED}❌ Operation cancelled${NC}"
  exit 1
fi

echo ""
echo -e "${YELLOW}🗑️  Step 6: Deleting user_roles for job seekers...${NC}"

# Step 6: Delete user_roles entries for job seekers (without platform IDs only)
if [ "$JOB_SEEKER_COUNT" -gt 0 ]; then
  run_query "
DELETE ur FROM user_roles ur
INNER JOIN unified_users u ON ur.user_id = u.id
WHERE ur.role = 'job_seeker'
  AND u.bizoforce_user_id IS NULL 
  AND u.giglancer_user_id IS NULL 
  AND u.screenly_user_id IS NULL 
  AND u.work_user_id IS NULL
  AND u.id NOT IN (
    SELECT user_id FROM (SELECT user_id FROM user_roles WHERE role != 'job_seeker') AS temp
  );
"
  echo -e "${GREEN}✅ Deleted job seeker roles${NC}"
else
  echo -e "${GREEN}✅ No job seeker roles to delete${NC}"
fi
echo ""

echo -e "${YELLOW}🗑️  Step 7: Deleting orphaned unified_users...${NC}"

# Step 7: Delete orphaned unified_users (no roles AND no platforms)
run_query "
DELETE FROM unified_users
WHERE id NOT IN (SELECT DISTINCT user_id FROM user_roles)
  AND bizoforce_user_id IS NULL 
  AND giglancer_user_id IS NULL 
  AND screenly_user_id IS NULL 
  AND work_user_id IS NULL;
"

echo -e "${GREEN}✅ Deleted orphaned users${NC}"
echo ""

echo -e "${YELLOW}🗑️  Step 8: Deleting unified_users who only had job_seeker role...${NC}"

# Step 8: Delete unified_users who only had job_seeker role (and have no other roles now)
run_query "
DELETE FROM unified_users
WHERE id NOT IN (SELECT DISTINCT user_id FROM user_roles);
"

echo -e "${GREEN}✅ Deleted job seeker users${NC}"
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Orphaned users removed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📊 Deletion complete. Run query to verify:${NC}"
echo -e "  ${BLUE}SELECT COUNT(*) FROM unified_users;${NC}"
echo ""
echo -e "${YELLOW}🔄 Next steps:${NC}"
echo -e "  1. Verify database integrity with: ${BLUE}SELECT COUNT(*) FROM unified_users;${NC}"
echo -e "  2. Restart the server: ${BLUE}cd /home/bizoforce/public_html/dashboard && ./deploy.sh${NC}"
echo -e "  3. Test login flow with remaining users"
echo ""
