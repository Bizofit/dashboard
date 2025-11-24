#!/bin/bash

# Test Company Details API Endpoints
echo "🧪 Testing Company Details API Endpoints"
echo "=========================================="

# Base URL for API
BASE_URL="http://localhost:3006/api"

# Test credentials - Testing with a Bizoforce user to get richer data
EMAIL="info.webkit24@gmail.com"
PASSWORD="password123"

echo ""
echo "1. Testing Login to get token..."

LOGIN_RESPONSE=$(curl -s -X POST "${BASE_URL}/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${EMAIL}\",\"password\":\"${PASSWORD}\"}")

echo "Login Response: $LOGIN_RESPONSE"

# Extract token from response
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ Failed to get authentication token"
    echo "Response: $LOGIN_RESPONSE"
    exit 1
fi

echo "✅ Authentication successful"
echo "Token: ${TOKEN:0:20}..."

echo ""
echo "2. Testing GET /api/companies (list all companies)..."

COMPANIES_RESPONSE=$(curl -s -X GET "${BASE_URL}/companies" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json")

echo "Companies Response:"
echo "$COMPANIES_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$COMPANIES_RESPONSE"

# Extract first company ID for detailed testing
COMPANY_ID=$(echo "$COMPANIES_RESPONSE" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

if [ ! -z "$COMPANY_ID" ]; then
    echo ""
    echo "3. Testing GET /api/companies/${COMPANY_ID} (company details)..."
    
    COMPANY_DETAILS=$(curl -s -X GET "${BASE_URL}/companies/${COMPANY_ID}" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json")
    
    echo "Company Details Response:"
    echo "$COMPANY_DETAILS" | python3 -m json.tool 2>/dev/null || echo "$COMPANY_DETAILS"
    
    echo ""
    echo "4. Testing GET /api/companies/${COMPANY_ID}/employees..."
    
    EMPLOYEES_RESPONSE=$(curl -s -X GET "${BASE_URL}/companies/${COMPANY_ID}/employees" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json")
    
    echo "Employees Response:"
    echo "$EMPLOYEES_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$EMPLOYEES_RESPONSE"
    
    echo ""
    echo "5. Testing GET /api/companies/${COMPANY_ID}/products..."
    
    PRODUCTS_RESPONSE=$(curl -s -X GET "${BASE_URL}/companies/${COMPANY_ID}/products" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json")
    
    echo "Products Response:"
    echo "$PRODUCTS_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$PRODUCTS_RESPONSE"
    
    echo ""
    echo "6. Testing GET /api/companies/${COMPANY_ID}/jobs..."
    
    JOBS_RESPONSE=$(curl -s -X GET "${BASE_URL}/companies/${COMPANY_ID}/jobs" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json")
    
    echo "Jobs Response:"
    echo "$JOBS_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$JOBS_RESPONSE"
    
    echo ""
    echo "7. Testing GET /api/companies/${COMPANY_ID}/projects..."
    
    PROJECTS_RESPONSE=$(curl -s -X GET "${BASE_URL}/companies/${COMPANY_ID}/projects" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json")
    
    echo "Projects Response:"
    echo "$PROJECTS_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$PROJECTS_RESPONSE"
    
    echo ""
    echo "8. Testing GET /api/companies/${COMPANY_ID}/financials..."
    
    FINANCIALS_RESPONSE=$(curl -s -X GET "${BASE_URL}/companies/${COMPANY_ID}/financials" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json")
    
    echo "Financials Response:"
    echo "$FINANCIALS_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$FINANCIALS_RESPONSE"
    
    echo ""
    echo "9. Testing GET /api/companies/${COMPANY_ID}/analytics..."
    
    ANALYTICS_RESPONSE=$(curl -s -X GET "${BASE_URL}/companies/${COMPANY_ID}/analytics" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json")
    
    echo "Analytics Response:"
    echo "$ANALYTICS_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$ANALYTICS_RESPONSE"
    
else
    echo "⚠️ No companies found to test detailed endpoints"
fi

echo ""
echo "✅ Company Details API Testing Complete!"
echo "=========================================="