-- Add profile fields for individual users to unified_users table

ALTER TABLE unified_users
ADD COLUMN professional_title VARCHAR(200) AFTER phone,
ADD COLUMN bio TEXT AFTER professional_title,
ADD COLUMN years_of_experience VARCHAR(20) AFTER bio,
ADD COLUMN resume_path VARCHAR(500) AFTER years_of_experience,
ADD COLUMN resume_uploaded_at TIMESTAMP NULL AFTER resume_path;

-- Add indexes for better query performance
CREATE INDEX idx_resume_uploaded_at ON unified_users(resume_uploaded_at);
CREATE INDEX idx_professional_title ON unified_users(professional_title);
