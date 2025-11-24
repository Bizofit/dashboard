import jwt from "jsonwebtoken";

// Generate a test token for user 1008
const token = jwt.sign(
  {
    userId: 1008,
    email: "user1008@example.com",
    roles: [
      { role: "company_admin", company_id: 2, is_primary: true },
      { role: "vendor", company_id: 3, is_primary: false },
    ],
  },
  "bizoforce-local-dev-secret-key-change-in-production-min-64-chars", // JWT_SECRET from .env
  { expiresIn: "7d" }
);

console.log("Token:", token);
