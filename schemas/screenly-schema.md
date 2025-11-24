# SCREENLY Database Schema

**Database Type:** postgres
**Total Tables:** 51
**Generated:** 11/22/2025, 12:50:35 PM

---

## Table of Contents

1. [admin_settings](#admin-settings)
2. [api_keys](#api-keys)
3. [api_usage_tracking](#api-usage-tracking)
4. [applied_migrations](#applied-migrations)
5. [branding_settings](#branding-settings)
6. [candidate_applications](#candidate-applications)
7. [candidate_comments](#candidate-comments)
8. [candidate_profiles](#candidate-profiles)
9. [candidate_shares](#candidate-shares)
10. [candidate_skill_proficiencies](#candidate-skill-proficiencies)
11. [candidate_stage_history](#candidate-stage-history)
12. [candidates](#candidates)
13. [contact_enrichment_cache](#contact-enrichment-cache)
14. [generated_questions](#generated-questions)
15. [hiring_team_members](#hiring-team-members)
16. [integration_settings](#integration-settings)
17. [interview_notifications](#interview-notifications)
18. [interview_questions](#interview-questions)
19. [interview_responses](#interview-responses)
20. [interview_schedules](#interview-schedules)
21. [interview_shares](#interview-shares)
22. [interviews](#interviews)
23. [job_descriptions](#job-descriptions)
24. [job_offers](#job-offers)
25. [job_postings](#job-postings)
26. [job_requisitions](#job-requisitions)
27. [migration_history](#migration-history)
28. [ml_models](#ml-models)
29. [parsing_feedback](#parsing-feedback)
30. [payments](#payments)
31. [pipeline_stages](#pipeline-stages)
32. [public_assessment_history](#public-assessment-history)
33. [public_assessments](#public-assessments)
34. [public_candidates](#public-candidates)
35. [public_job_applications](#public-job-applications)
36. [public_jobs](#public-jobs)
37. [public_resume_uploads](#public-resume-uploads)
38. [public_sessions](#public-sessions)
39. [screening_projects](#screening-projects)
40. [sessions](#sessions)
41. [sourced_candidates](#sourced-candidates)
42. [sourcing_agent_configs](#sourcing-agent-configs)
43. [sourcing_campaigns](#sourcing-campaigns)
44. [subscription_plan_features](#subscription-plan-features)
45. [subscription_plans](#subscription-plans)
46. [subscription_usage](#subscription-usage)
47. [token_usage](#token-usage)
48. [training_jobs](#training-jobs)
49. [user_feedback](#user-feedback)
50. [users](#users)
51. [work_experience](#work-experience)

---

## admin_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('admin_settings_id_seq'::regclass) | PRI |  |
| `settings_key` | character varying | NO | NULL |  |  |
| `settings_data` | jsonb | NO | NULL |  |  |
| `updated_at` | timestamp without time zone | YES | CURRENT_TIMESTAMP |  |  |
| `created_at` | timestamp without time zone | YES | CURRENT_TIMESTAMP |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| admin_settings_pkey | id | YES | btree |
| admin_settings_settings_key_key | settings_key | YES | btree |

---

## api_keys

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('api_keys_id_seq'::regclass) | PRI |  |
| `user_id` | integer | NO | NULL |  |  |
| `name` | character varying | NO | NULL |  |  |
| `key_hash` | character varying | NO | NULL |  |  |
| `key_prefix` | character varying | NO | NULL |  |  |
| `is_active` | boolean | YES | true |  |  |
| `last_used_at` | timestamp without time zone | YES | NULL |  |  |
| `expires_at` | timestamp without time zone | YES | NULL |  |  |
| `permissions` | jsonb | YES | '["read"]'::jsonb |  |  |
| `rate_limit` | integer | YES | 1000 |  |  |
| `usage_count` | integer | YES | 0 |  |  |
| `created_at` | timestamp without time zone | YES | now() |  |  |
| `updated_at` | timestamp without time zone | YES | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| api_keys_key_hash_unique | key_hash | YES | btree |
| api_keys_pkey | id | YES | btree |
| idx_api_keys_is_active | is_active | NO | btree |
| idx_api_keys_user_id | user_id | NO | btree |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| api_keys_user_id_users_id_fk | user_id | users.id |

---

## api_usage_tracking

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | character varying | NO | NULL |  |  |
| `user_id` | integer | NO | NULL |  |  |
| `campaign_id` | character varying | YES | NULL |  |  |
| `company_id` | character varying | YES | NULL |  |  |
| `api_provider` | character varying | NO | NULL |  |  |
| `endpoint` | character varying | YES | NULL |  |  |
| `method` | character varying | YES | NULL |  |  |
| `request_size` | integer | YES | 0 |  |  |
| `response_size` | integer | YES | 0 |  |  |
| `cost` | numeric | YES | 0.00 |  |  |
| `tokens_used` | integer | YES | 0 |  |  |
| `credits_used` | integer | YES | 0 |  |  |
| `status` | character varying | NO | NULL |  |  |
| `response_time_ms` | integer | YES | 0 |  |  |
| `error_message` | text | YES | NULL |  |  |
| `request_type` | character varying | YES | NULL |  |  |
| `metadata` | jsonb | YES | '{}'::jsonb |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |

---

## applied_migrations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('applied_migrations_id_seq'::regclass) | PRI |  |
| `filename` | character varying | NO | NULL |  |  |
| `applied_at` | timestamp without time zone | YES | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| applied_migrations_filename_key | filename | YES | btree |
| applied_migrations_pkey | id | YES | btree |

---

## branding_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('branding_settings_id_seq'::regclass) | PRI |  |
| `application_name` | character varying | YES | 'Screenly'::character varying |  |  |
| `company_name` | character varying | YES | 'Bizofit'::character varying |  |  |
| `logo_url` | text | YES | NULL |  |  |
| `favicon_url` | text | YES | NULL |  |  |
| `apple_touch_icon_url` | text | YES | NULL |  |  |
| `theme_color` | character varying | YES | '#2563eb'::character varying |  |  |
| `site_name` | character varying | YES | 'Screenly'::character varying |  |  |
| `title` | text | YES | 'Screenly - AI-Powered Candidate Screening Platform'::text |  |  |
| `created_at` | timestamp without time zone | YES | CURRENT_TIMESTAMP |  |  |
| `updated_at` | timestamp without time zone | YES | CURRENT_TIMESTAMP |  |  |
| `primary_color` | character varying | YES | '#2563eb'::character varying |  |  |
| `secondary_color` | character varying | YES | '#059669'::character varying |  |  |
| `tertiary_color` | character varying | YES | '#7c3aed'::character varying |  |  |
| `og_image` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| branding_settings_pkey | id | YES | btree |

---

## candidate_applications

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('candidate_applications_id_seq'::regclass) |  |  |
| `candidate_id` | integer | NO | NULL |  |  |
| `requisition_id` | integer | NO | NULL |  |  |
| `screening_project_id` | integer | YES | NULL |  |  |
| `application_status` | character varying | YES | 'new'::character varying |  |  |
| `current_stage_id` | integer | YES | NULL |  |  |
| `source` | character varying | YES | NULL |  |  |
| `applied_at` | timestamp without time zone | NO | now() |  |  |
| `cover_letter` | text | YES | NULL |  |  |
| `application_notes` | text | YES | NULL |  |  |
| `referral_source` | character varying | YES | NULL |  |  |
| `company_id` | character varying | NO | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |
| `stage_entered_at` | timestamp without time zone | YES | CURRENT_TIMESTAMP |  |  |
| `days_in_current_stage` | integer | YES | 0 |  |  |
| `application_source` | character varying | YES | NULL |  |  |
| `overall_rating` | numeric | YES | NULL |  |  |
| `recommendation` | character varying | YES | NULL |  |  |
| `rejection_reason` | character varying | YES | NULL |  |  |
| `rejected_at` | timestamp without time zone | YES | NULL |  |  |
| `last_contact_date` | timestamp without time zone | YES | NULL |  |  |
| `last_contact_type` | character varying | YES | NULL |  |  |
| `next_follow_up_date` | timestamp without time zone | YES | NULL |  |  |
| `communication_notes` | text | YES | NULL |  |  |
| `referrer_id` | integer | YES | NULL |  |  |
| `rejected_by` | integer | YES | NULL |  |  |
| `created_by` | integer | YES | NULL |  |  |
| `updated_by` | integer | YES | NULL |  |  |

---

## candidate_comments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('candidate_comments_id_seq'::regclass) |  |  |
| `candidate_id` | integer | NO | NULL |  |  |
| `requisition_id` | integer | NO | NULL |  |  |
| `user_id` | integer | NO | NULL |  |  |
| `comment_text` | text | NO | NULL |  |  |
| `comment_type` | character varying | YES | 'general'::character varying |  |  |
| `is_private` | boolean | YES | false |  |  |
| `rating` | integer | YES | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |
| `company_id` | character varying | NO | NULL |  |  |

---

## candidate_profiles

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('candidate_profiles_id_seq'::regclass) | PRI |  |
| `candidate_id` | integer | NO | NULL |  |  |
| `name` | character varying | NO | NULL |  |  |
| `email` | character varying | YES | NULL |  |  |
| `phone` | character varying | YES | NULL |  |  |
| `location` | character varying | YES | NULL |  |  |
| `years_of_experience` | numeric | YES | NULL |  |  |
| `extracted_summary` | text | YES | NULL |  |  |
| `professional_title` | character varying | YES | NULL |  |  |
| `work_experience_evidence` | json | YES | NULL |  |  |
| `raw_skills_extraction` | json | YES | NULL |  |  |
| `education_background` | json | YES | NULL |  |  |
| `ai_analysis_insights` | json | YES | NULL |  |  |
| `parsing_metadata` | json | YES | NULL |  |  |
| `company_id` | character varying | YES | NULL |  |  |
| `created_by` | integer | YES | NULL |  |  |
| `updated_by` | integer | YES | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| candidate_profiles_candidate_id_unique | candidate_id | YES | btree |
| candidate_profiles_pkey | id | YES | btree |
| idx_candidate_profiles_candidate_id | candidate_id | NO | btree |
| idx_candidate_profiles_company_id | company_id | NO | btree |
| idx_candidate_profiles_created_by | created_by | NO | btree |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| candidate_profiles_candidate_id_fkey | candidate_id | candidates.id |

---

## candidate_shares

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('candidate_shares_id_seq'::regclass) | PRI |  |
| `candidate_id` | integer | NO | NULL |  |  |
| `project_id` | integer | NO | NULL |  |  |
| `share_token` | character varying | NO | NULL |  |  |
| `created_by` | integer | NO | NULL |  |  |
| `expires_at` | timestamp without time zone | YES | NULL |  |  |
| `access_count` | integer | YES | 0 |  |  |
| `last_accessed_at` | timestamp without time zone | YES | NULL |  |  |
| `is_active` | boolean | YES | true |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| candidate_project_idx | candidate_id | NO | btree |
| candidate_project_idx | project_id | NO | btree |
| candidate_shares_pkey | id | YES | btree |
| candidate_shares_share_token_unique | share_token | YES | btree |
| idx_candidate_shares_active | is_active | NO | btree |
| idx_candidate_shares_candidate | candidate_id | NO | btree |
| idx_candidate_shares_created_by | created_by | NO | btree |
| idx_candidate_shares_expires | expires_at | NO | btree |
| idx_candidate_shares_project | project_id | NO | btree |
| idx_candidate_shares_token | share_token | NO | btree |
| share_token_idx | share_token | NO | btree |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| candidate_shares_candidate_id_candidates_id_fk | candidate_id | candidates.id |
| candidate_shares_project_id_screening_projects_id_fk | project_id | screening_projects.id |
| candidate_shares_created_by_users_id_fk | created_by | users.id |

---

## candidate_skill_proficiencies

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('candidate_skill_proficiencies_id_seq'::regclass) | PRI |  |
| `candidate_id` | integer | NO | NULL |  |  |
| `skill_name` | character varying | NO | NULL |  |  |
| `proficiency_score` | numeric | NO | NULL |  |  |
| `evidence_strength` | integer | NO | NULL |  |  |
| `evidence_text` | text | YES | NULL |  |  |
| `years_experience` | numeric | YES | NULL |  |  |
| `last_used_year` | integer | YES | NULL |  |  |
| `skill_category` | character varying | NO | 'technical'::character varying |  |  |
| `company_id` | character varying | YES | NULL |  |  |
| `created_at` | timestamp without time zone | YES | now() |  |  |
| `updated_at` | timestamp without time zone | YES | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| candidate_skill_proficiencies_pkey | id | YES | btree |

---

## candidate_stage_history

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('candidate_stage_history_id_seq'::regclass) |  |  |
| `candidate_id` | integer | NO | NULL |  |  |
| `screening_project_id` | integer | NO | NULL |  |  |
| `previous_stage` | character varying | YES | NULL |  |  |
| `new_stage` | character varying | NO | NULL |  |  |
| `moved_by` | integer | YES | NULL |  |  |
| `moved_at` | timestamp without time zone | NO | now() |  |  |
| `notes` | text | YES | NULL |  |  |
| `feedback` | jsonb | YES | NULL |  |  |
| `duration_in_previous_stage` | integer | YES | NULL |  |  |
| `automated_move` | boolean | YES | false |  |  |
| `move_reason` | character varying | YES | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `application_id` | integer | YES | NULL |  |  |
| `stage_id` | integer | YES | NULL |  |  |
| `requisition_id` | integer | YES | NULL |  |  |
| `entered_at` | timestamp without time zone | YES | now() |  |  |
| `exited_at` | timestamp without time zone | YES | NULL |  |  |
| `days_in_stage` | integer | YES | NULL |  |  |
| `stage_outcome` | character varying | YES | NULL |  |  |
| `stage_rating` | numeric | YES | NULL |  |  |
| `interviewer_id` | integer | YES | NULL |  |  |
| `interview_feedback` | text | YES | NULL |  |  |
| `feedback_summary` | character varying | YES | NULL |  |  |
| `strengths_noted` | text | YES | NULL |  |  |
| `concerns_noted` | text | YES | NULL |  |  |
| `recommendation` | character varying | YES | NULL |  |  |
| `decision_made_by` | integer | YES | NULL |  |  |
| `decision_notes` | text | YES | NULL |  |  |
| `next_steps` | text | YES | NULL |  |  |
| `company_id` | character varying | YES | NULL |  |  |
| `updated_at` | timestamp without time zone | YES | now() |  |  |

---

## candidates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('candidates_id_seq'::regclass) | PRI |  |
| `job_description_id` | integer | NO | NULL |  |  |
| `name` | character varying | NO | NULL |  |  |
| `email` | character varying | YES | NULL |  |  |
| `title` | character varying | YES | NULL |  |  |
| `resume_filename` | text | NO | NULL |  |  |
| `resume_content` | text | NO | NULL |  |  |
| `extracted_skills` | json | NO | NULL |  |  |
| `overall_score` | numeric | NO | NULL |  |  |
| `verdict` | character varying | NO | NULL |  |  |
| `flags` | json | YES | '[]'::json |  |  |
| `analysis_notes` | json | NO | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `parsing_confidence` | json | YES | NULL |  |  |
| `ml_parsed_data` | json | YES | NULL |  |  |
| `phone` | character varying | YES | NULL |  |  |
| `location` | character varying | YES | NULL |  |  |
| `linkedin_url` | character varying | YES | NULL |  |  |
| `salary_range` | character varying | YES | NULL |  |  |
| `work_mode` | character varying | YES | NULL |  |  |
| `visa_status` | character varying | YES | NULL |  |  |
| `notice_period` | character varying | YES | NULL |  |  |
| `ready_to_relocate` | boolean | YES | NULL |  |  |
| `additional_details_complete` | boolean | YES | false |  |  |
| `recruiter_notes` | text | YES | NULL |  |  |
| `created_by` | integer | YES | NULL |  |  |
| `company_id` | character varying | YES | NULL |  |  |
| `skill_summary_vector` | text | YES | NULL |  |  |
| `search_keywords` | ARRAY | YES | NULL |  |  |
| `primary_skills` | character varying | YES | NULL |  |  |
| `skill_experience_updated_at` | timestamp without time zone | YES | NULL |  |  |
| `enhanced_scoring_data` | text | YES | NULL |  |  |
| `job_specific_score` | numeric | YES | NULL |  |  |
| `location_score` | numeric | YES | NULL |  |  |
| `standard_score` | numeric | YES | NULL |  |  |
| `enhanced_score` | numeric | YES | NULL |  |  |
| `expected_salary` | integer | YES | NULL |  |  |
| `scoring_metadata` | jsonb | YES | NULL |  |  |
| `years_of_experience` | numeric | YES | NULL |  |  |
| `updated_at` | timestamp without time zone | YES | now() |  |  |
| `parsing_version` | character varying | YES | '1.0'::character varying |  |  |
| `last_auto_parsed` | timestamp without time zone | YES | NULL |  |  |
| `auto_parsing_enabled` | boolean | YES | true |  |  |
| `api_source` | character varying | YES | NULL |  |  |
| `external_job_id` | character varying | YES | NULL |  |  |
| `external_candidate_id` | character varying | YES | NULL |  |  |
| `api_synced_at` | timestamp without time zone | YES | NULL |  |  |
| `api_metadata` | jsonb | YES | NULL |  |  |
| `availability` | character varying | YES | NULL |  |  |
| `preferred_salary_range` | character varying | YES | NULL |  |  |
| `preferred_work_type` | character varying | YES | NULL |  |  |
| `remote_work_preference` | boolean | YES | false |  |  |
| `work_authorization` | character varying | YES | NULL |  |  |
| `giglancer_id` | character varying | YES | NULL |  |  |
| `skill_summary` | jsonb | YES | NULL |  |  |
| `comprehensive_score` | numeric | YES | NULL |  |  |
| `skill_diversity_index` | numeric | YES | NULL |  |  |
| `experience_level` | character varying | YES | NULL |  |  |
| `primary_domain` | character varying | YES | NULL |  |  |
| `last_reprocessed_at` | timestamp without time zone | YES | NULL |  |  |
| `reprocessing_reason` | character varying | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| candidates_pkey | id | YES | btree |
| idx_candidates_api_source | api_source | NO | btree |
| idx_candidates_api_unique | external_candidate_id | YES | btree |
| idx_candidates_api_unique | email | YES | btree |
| idx_candidates_api_unique | api_source | YES | btree |
| idx_candidates_api_unique | external_job_id | YES | btree |
| idx_candidates_company_id | company_id | NO | btree |
| idx_candidates_enhanced_score | enhanced_score | NO | btree |
| idx_candidates_external_candidate_id | external_candidate_id | NO | btree |
| idx_candidates_external_job_id | external_job_id | NO | btree |
| idx_candidates_job_description_id | job_description_id | NO | btree |
| idx_candidates_job_specific_score | job_specific_score | NO | btree |
| idx_candidates_last_auto_parsed | last_auto_parsed | NO | btree |
| idx_candidates_location_score | location_score | NO | btree |
| idx_candidates_overall_score | overall_score | NO | btree |
| idx_candidates_parsing_version | parsing_version | NO | btree |
| idx_candidates_standard_score | standard_score | NO | btree |

---

## contact_enrichment_cache

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | character varying | NO | NULL |  |  |
| `cache_key` | character varying | NO | NULL |  |  |
| `input_data` | jsonb | NO | '{}'::jsonb |  |  |
| `apollo_result` | jsonb | YES | '{}'::jsonb |  |  |
| `pdl_result` | jsonb | YES | '{}'::jsonb |  |  |
| `enrichment_quality` | character varying | YES | 'unknown'::character varying |  |  |
| `confidence` | numeric | YES | 0.00 |  |  |
| `completeness` | integer | YES | 0 |  |  |
| `hit_count` | integer | YES | 1 |  |  |
| `last_hit` | timestamp without time zone | NO | now() |  |  |
| `ttl` | timestamp without time zone | NO | NULL |  |  |
| `original_cost` | numeric | YES | 0.00 |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |

---

## generated_questions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('generated_questions_id_seq'::regclass) | PRI |  |
| `job_description_id` | integer | NO | NULL |  |  |
| `question_type` | character varying | NO | NULL |  |  |
| `question_id` | character varying | NO | NULL |  |  |
| `question` | text | NO | NULL |  |  |
| `expected_duration` | integer | NO | NULL |  |  |
| `skills_assessed` | json | NO | NULL |  |  |
| `difficulty_level` | character varying | NO | NULL |  |  |
| `experience_level` | character varying | NO | NULL |  |  |
| `is_active` | boolean | YES | true |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| generated_questions_pkey | id | YES | btree |

---

## hiring_team_members

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('hiring_team_members_id_seq'::regclass) |  |  |
| `requisition_id` | integer | NO | NULL |  |  |
| `user_id` | integer | NO | NULL |  |  |
| `role` | character varying | NO | NULL |  |  |
| `permissions` | jsonb | YES | '["read"]'::jsonb |  |  |
| `can_view_all_candidates` | boolean | YES | true |  |  |
| `can_advance_candidates` | boolean | YES | false |  |  |
| `can_reject_candidates` | boolean | YES | false |  |  |
| `can_add_feedback` | boolean | YES | true |  |  |
| `notification_preferences` | jsonb | YES | NULL |  |  |
| `added_at` | timestamp without time zone | NO | now() |  |  |
| `added_by` | integer | NO | NULL |  |  |
| `last_active_at` | timestamp without time zone | YES | NULL |  |  |
| `is_active` | boolean | YES | true |  |  |
| `company_id` | character varying | NO | NULL |  |  |

---

## integration_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('integration_settings_id_seq'::regclass) | PRI |  |
| `service` | character varying | NO | NULL |  |  |
| `config` | jsonb | NO | NULL |  |  |
| `is_active` | boolean | YES | true |  |  |
| `created_at` | timestamp without time zone | YES | now() |  |  |
| `updated_at` | timestamp without time zone | YES | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| integration_settings_pkey | id | YES | btree |
| integration_settings_service_unique | service | YES | btree |

---

## interview_notifications

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('interview_notifications_id_seq'::regclass) | PRI |  |
| `interview_id` | integer | NO | NULL |  |  |
| `type` | character varying | NO | NULL |  |  |
| `status` | character varying | NO | 'pending'::character varying |  |  |
| `email` | character varying | NO | NULL |  |  |
| `subject` | character varying | NO | NULL |  |  |
| `content` | text | NO | NULL |  |  |
| `sent_at` | timestamp without time zone | YES | NULL |  |  |
| `error_message` | text | YES | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| interview_notifications_pkey | id | YES | btree |

---

## interview_questions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('interview_questions_id_seq'::regclass) | PRI |  |
| `interview_id` | integer | NO | NULL |  |  |
| `question_order` | integer | NO | NULL |  |  |
| `question_data` | json | NO | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| interview_questions_pkey | id | YES | btree |

---

## interview_responses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('interview_responses_id_seq'::regclass) | PRI |  |
| `interview_id` | integer | NO | NULL |  |  |
| `question_id` | integer | NO | NULL |  |  |
| `video_url` | text | YES | NULL |  |  |
| `audio_url` | text | YES | NULL |  |  |
| `duration` | integer | NO | NULL |  |  |
| `transcript` | text | YES | NULL |  |  |
| `analysis` | json | YES | NULL |  |  |
| `score` | numeric | YES | NULL |  |  |
| `analysis_complete` | boolean | YES | false |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| interview_responses_pkey | id | YES | btree |

---

## interview_schedules

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('interview_schedules_id_seq'::regclass) |  |  |
| `candidate_id` | integer | NO | NULL |  |  |
| `requisition_id` | integer | NO | NULL |  |  |
| `interviewer_id` | integer | NO | NULL |  |  |
| `interview_type` | character varying | NO | NULL |  |  |
| `scheduled_at` | timestamp without time zone | NO | NULL |  |  |
| `duration_minutes` | integer | YES | 60 |  |  |
| `location` | character varying | YES | NULL |  |  |
| `meeting_link` | character varying | YES | NULL |  |  |
| `status` | character varying | YES | 'scheduled'::character varying |  |  |
| `feedback` | text | YES | NULL |  |  |
| `rating` | integer | YES | NULL |  |  |
| `recommendation` | character varying | YES | NULL |  |  |
| `company_id` | character varying | NO | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |

---

## interview_shares

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('interview_shares_id_seq'::regclass) | PRI |  |
| `interview_id` | integer | NO | NULL |  |  |
| `share_token` | character varying | NO | NULL |  |  |
| `created_by` | integer | NO | NULL |  |  |
| `expires_at` | timestamp without time zone | YES | NULL |  |  |
| `access_count` | integer | YES | 0 |  |  |
| `last_accessed_at` | timestamp without time zone | YES | NULL |  |  |
| `is_active` | boolean | YES | true |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| interview_share_interview_idx | interview_id | NO | btree |
| interview_share_token_idx | share_token | NO | btree |
| interview_shares_pkey | id | YES | btree |
| interview_shares_share_token_key | share_token | YES | btree |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| interview_shares_interview_id_fkey | interview_id | interviews.id |
| interview_shares_created_by_fkey | created_by | users.id |

---

## interviews

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('interviews_id_seq'::regclass) | PRI |  |
| `candidate_id` | integer | NO | NULL |  |  |
| `job_description_id` | integer | NO | NULL |  |  |
| `screening_project_id` | integer | NO | NULL |  |  |
| `status` | character varying | NO | 'scheduled'::character varying |  |  |
| `scheduled_at` | timestamp without time zone | YES | NULL |  |  |
| `started_at` | timestamp without time zone | YES | NULL |  |  |
| `completed_at` | timestamp without time zone | YES | NULL |  |  |
| `duration` | integer | YES | NULL |  |  |
| `overall_score` | numeric | YES | NULL |  |  |
| `config` | json | NO | NULL |  |  |
| `invite_token` | character varying | NO | NULL |  |  |
| `invite_sent_at` | timestamp without time zone | YES | NULL |  |  |
| `reminder_sent_at` | timestamp without time zone | YES | NULL |  |  |
| `recording_url` | text | YES | NULL |  |  |
| `analysis_complete` | boolean | YES | false |  |  |
| `cheating_detected` | boolean | YES | false |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| interviews_pkey | id | YES | btree |

---

## job_descriptions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('job_descriptions_id_seq'::regclass) | PRI |  |
| `title` | character varying | NO | NULL |  |  |
| `department` | character varying | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `skill_matrix` | json | NO | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `experience_level` | character varying | YES | 'mid'::character varying |  |  |
| `location` | character varying | YES | NULL |  |  |
| `created_by` | integer | YES | NULL |  |  |
| `company_id` | character varying | YES | NULL |  |  |
| `required_experience_years` | integer | YES | 0 |  |  |
| `work_mode` | character varying | YES | 'remote'::character varying |  |  |
| `generate_questions` | boolean | YES | false |  |  |
| `workflow_type` | character varying | YES | 'direct_assessment'::character varying |  |  |
| `min_salary` | integer | YES | NULL |  |  |
| `max_salary` | integer | YES | NULL |  |  |
| `required_education` | character varying | YES | 'bachelors'::character varying |  |  |
| `hiring_urgency` | character varying | YES | 'normal'::character varying |  |  |
| `experience_required` | text | YES | NULL |  |  |
| `remote_work_allowed` | boolean | YES | false |  |  |
| `salary_currency` | character varying | YES | 'USD'::character varying |  |  |
| `visa_requirements` | character varying | YES | NULL |  |  |
| `work_type` | character varying | YES | NULL |  |  |
| `enable_candidate_notifications` | boolean | YES | true |  |  |
| `is_published` | boolean | YES | false |  |  |
| `published_at` | timestamp without time zone | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_job_descriptions_company_id | company_id | NO | btree |
| job_descriptions_pkey | id | YES | btree |

---

## job_offers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('job_offers_id_seq'::regclass) |  |  |
| `application_id` | integer | NO | NULL |  |  |
| `candidate_id` | integer | NO | NULL |  |  |
| `requisition_id` | integer | NO | NULL |  |  |
| `offer_letter_number` | character varying | YES | NULL |  |  |
| `job_title` | character varying | NO | NULL |  |  |
| `base_salary` | integer | NO | NULL |  |  |
| `bonus_amount` | integer | YES | 0 |  |  |
| `equity_percentage` | numeric | YES | NULL |  |  |
| `benefits_summary` | text | YES | NULL |  |  |
| `start_date` | character varying | YES | NULL |  |  |
| `offer_expiry_date` | character varying | YES | NULL |  |  |
| `status` | character varying | YES | 'draft'::character varying |  |  |
| `sent_at` | timestamp without time zone | YES | NULL |  |  |
| `response_due_date` | timestamp without time zone | YES | NULL |  |  |
| `candidate_response_date` | timestamp without time zone | YES | NULL |  |  |
| `final_decision_date` | timestamp without time zone | YES | NULL |  |  |
| `negotiation_rounds` | integer | YES | 0 |  |  |
| `candidate_counter_offer` | jsonb | YES | NULL |  |  |
| `final_agreed_terms` | jsonb | YES | NULL |  |  |
| `rejection_reason` | text | YES | NULL |  |  |
| `requires_approval` | boolean | YES | true |  |  |
| `approved_by` | integer | YES | NULL |  |  |
| `approval_notes` | text | YES | NULL |  |  |
| `approved_at` | timestamp without time zone | YES | NULL |  |  |
| `offer_letter_url` | text | YES | NULL |  |  |
| `signed_offer_url` | text | YES | NULL |  |  |
| `company_id` | character varying | NO | NULL |  |  |
| `created_by` | integer | NO | NULL |  |  |
| `updated_by` | integer | YES | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |

---

## job_postings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('job_postings_id_seq'::regclass) |  |  |
| `requisition_id` | integer | NO | NULL |  |  |
| `job_description_id` | integer | YES | NULL |  |  |
| `title` | character varying | NO | NULL |  |  |
| `department` | character varying | NO | NULL |  |  |
| `location` | character varying | YES | NULL |  |  |
| `remote_option` | character varying | YES | 'office'::character varying |  |  |
| `employment_type` | character varying | YES | 'full-time'::character varying |  |  |
| `experience_level` | character varying | YES | NULL |  |  |
| `job_summary` | text | YES | NULL |  |  |
| `responsibilities` | text | YES | NULL |  |  |
| `qualifications` | text | YES | NULL |  |  |
| `preferred_skills` | text | YES | NULL |  |  |
| `benefits` | text | YES | NULL |  |  |
| `salary_min` | integer | YES | NULL |  |  |
| `salary_max` | integer | YES | NULL |  |  |
| `salary_display_type` | character varying | YES | 'range'::character varying |  |  |
| `status` | character varying | YES | 'draft'::character varying |  |  |
| `is_public` | boolean | YES | true |  |  |
| `published_at` | timestamp without time zone | YES | NULL |  |  |
| `closing_date` | timestamp without time zone | YES | NULL |  |  |
| `application_deadline` | timestamp without time zone | YES | NULL |  |  |
| `slug` | character varying | YES | NULL |  |  |
| `meta_description` | text | YES | NULL |  |  |
| `external_job_board_urls` | jsonb | YES | NULL |  |  |
| `application_method` | character varying | YES | 'internal'::character varying |  |  |
| `external_application_url` | text | YES | NULL |  |  |
| `application_instructions` | text | YES | NULL |  |  |
| `require_cover_letter` | boolean | YES | false |  |  |
| `required_documents` | jsonb | YES | NULL |  |  |
| `view_count` | integer | YES | 0 |  |  |
| `application_count` | integer | YES | 0 |  |  |
| `last_viewed_at` | timestamp without time zone | YES | NULL |  |  |
| `company_id` | character varying | NO | NULL |  |  |
| `created_by` | integer | NO | NULL |  |  |
| `updated_by` | integer | YES | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_job_postings_company_id | company_id | NO | btree |
| idx_job_postings_published_at | published_at | NO | btree |
| idx_job_postings_requisition_id | requisition_id | NO | btree |
| idx_job_postings_status | status | NO | btree |

---

## job_requisitions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('job_requisitions_id_seq'::regclass) |  |  |
| `req_number` | character varying | NO | NULL |  |  |
| `title` | character varying | NO | NULL |  |  |
| `department` | character varying | NO | NULL |  |  |
| `hiring_manager_id` | integer | YES | NULL |  |  |
| `recruiter_id` | integer | YES | NULL |  |  |
| `requestor_id` | integer | NO | NULL |  |  |
| `job_description_id` | integer | YES | NULL |  |  |
| `positions_to_fill` | integer | NO | 1 |  |  |
| `employment_type` | character varying | YES | 'full-time'::character varying |  |  |
| `priority` | character varying | YES | 'normal'::character varying |  |  |
| `target_start_date` | character varying | YES | NULL |  |  |
| `budget_min` | integer | YES | NULL |  |  |
| `budget_max` | integer | YES | NULL |  |  |
| `annual_budget` | integer | YES | NULL |  |  |
| `approval_status` | character varying | YES | 'draft'::character varying |  |  |
| `approved_by` | integer | YES | NULL |  |  |
| `approved_at` | timestamp without time zone | YES | NULL |  |  |
| `rejection_reason` | text | YES | NULL |  |  |
| `status` | character varying | YES | 'open'::character varying |  |  |
| `filled_positions` | integer | YES | 0 |  |  |
| `pipeline_status` | character varying | YES | 'sourcing'::character varying |  |  |
| `target_hire_date` | character varying | YES | NULL |  |  |
| `actual_hire_date` | character varying | YES | NULL |  |  |
| `justification` | text | YES | NULL |  |  |
| `company_id` | character varying | NO | NULL |  |  |
| `created_by` | integer | NO | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |

---

## migration_history

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('migration_history_id_seq'::regclass) | PRI |  |
| `migration_name` | character varying | NO | NULL |  |  |
| `applied_at` | timestamp without time zone | YES | CURRENT_TIMESTAMP |  |  |
| `version` | character varying | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| migration_history_migration_name_key | migration_name | YES | btree |
| migration_history_pkey | id | YES | btree |

---

## ml_models

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('ml_models_id_seq'::regclass) | PRI |  |
| `name` | character varying | NO | NULL |  |  |
| `version` | character varying | NO | NULL |  |  |
| `model_type` | character varying | NO | NULL |  |  |
| `training_data` | json | NO | NULL |  |  |
| `performance` | json | NO | NULL |  |  |
| `is_active` | boolean | YES | false |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ml_models_pkey | id | YES | btree |

---

## parsing_feedback

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('parsing_feedback_id_seq'::regclass) | PRI |  |
| `candidate_id` | integer | NO | NULL |  |  |
| `field_name` | character varying | NO | NULL |  |  |
| `extracted_value` | text | YES | NULL |  |  |
| `corrected_value` | text | NO | NULL |  |  |
| `confidence` | integer | NO | NULL |  |  |
| `feedback_type` | character varying | NO | NULL |  |  |
| `resume_context` | text | YES | NULL |  |  |
| `user_id` | character varying | YES | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| parsing_feedback_pkey | id | YES | btree |

---

## payments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('payments_id_seq'::regclass) | PRI |  |
| `user_id` | integer | NO | NULL |  |  |
| `payment_provider` | character varying | NO | NULL |  |  |
| `provider_payment_id` | character varying | NO | NULL |  |  |
| `provider_transaction_id` | character varying | YES | NULL |  |  |
| `amount` | numeric | NO | NULL |  |  |
| `currency` | character varying | NO | 'USD'::character varying |  |  |
| `status` | character varying | NO | NULL |  |  |
| `subscription_plan` | character varying | NO | NULL |  |  |
| `billing_period` | character varying | YES | 'monthly'::character varying |  |  |
| `payment_method` | character varying | YES | NULL |  |  |
| `payer_email` | character varying | YES | NULL |  |  |
| `payer_name` | character varying | YES | NULL |  |  |
| `provider_response` | jsonb | YES | NULL |  |  |
| `failure_reason` | character varying | YES | NULL |  |  |
| `processed_at` | timestamp without time zone | YES | NULL |  |  |
| `created_at` | timestamp without time zone | YES | now() |  |  |
| `updated_at` | timestamp without time zone | YES | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| payments_created_at_idx | created_at | NO | btree |
| payments_pkey | id | YES | btree |
| payments_provider_payment_id_idx | provider_payment_id | NO | btree |
| payments_provider_payment_id_unique | provider_payment_id | YES | btree |
| payments_status_idx | status | NO | btree |
| payments_user_id_idx | user_id | NO | btree |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| payments_user_id_users_id_fk | user_id | users.id |

---

## pipeline_stages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('pipeline_stages_id_seq'::regclass) |  |  |
| `name` | character varying | NO | NULL |  |  |
| `stage_type` | character varying | NO | NULL |  |  |
| `order_sequence` | integer | NO | NULL |  |  |
| `is_default` | boolean | YES | false |  |  |
| `is_active` | boolean | YES | true |  |  |
| `stage_config` | jsonb | YES | NULL |  |  |
| `require_feedback` | boolean | YES | false |  |  |
| `auto_advance` | boolean | YES | false |  |  |
| `notification_settings` | jsonb | YES | NULL |  |  |
| `company_id` | character varying | NO | NULL |  |  |
| `created_by` | integer | NO | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |

---

## public_assessment_history

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('public_assessment_history_id_seq'::regclass) | PRI |  |
| `candidate_id` | integer | YES | NULL |  |  |
| `session_id` | integer | YES | NULL |  |  |
| `assessment_type` | character varying | NO | NULL |  |  |
| `started_at` | timestamp without time zone | YES | now() |  |  |
| `completed_at` | timestamp without time zone | YES | NULL |  |  |
| `duration_seconds` | integer | YES | NULL |  |  |
| `assessment_id` | integer | YES | NULL |  |  |
| `user_feedback` | jsonb | YES | NULL |  |  |
| `completion_rate` | numeric | YES | NULL |  |  |
| `page_views` | integer | YES | 1 |  |  |
| `time_spent_seconds` | integer | YES | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| public_assessment_history_pkey | id | YES | btree |

---

## public_assessments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('public_assessments_id_seq'::regclass) | PRI |  |
| `candidate_id` | integer | YES | NULL |  |  |
| `resume_upload_id` | integer | YES | NULL |  |  |
| `assessment_type` | character varying | YES | 'resume_analysis'::character varying |  |  |
| `assessment_version` | character varying | YES | '1.0'::character varying |  |  |
| `overall_score` | integer | YES | NULL |  |  |
| `ats_compatibility_score` | integer | YES | NULL |  |  |
| `keyword_optimization_score` | integer | YES | NULL |  |  |
| `format_score` | integer | YES | NULL |  |  |
| `experience_relevance_score` | integer | YES | NULL |  |  |
| `analysis_results` | jsonb | YES | NULL |  |  |
| `skill_extraction` | jsonb | YES | NULL |  |  |
| `improvement_suggestions` | jsonb | YES | NULL |  |  |
| `ats_flags` | jsonb | YES | NULL |  |  |
| `modern_resume_score` | integer | YES | NULL |  |  |
| `readability_score` | integer | YES | NULL |  |  |
| `career_level` | character varying | YES | NULL |  |  |
| `predicted_salary_range` | jsonb | YES | NULL |  |  |
| `role_recommendations` | jsonb | YES | NULL |  |  |
| `completed_at` | timestamp without time zone | YES | NULL |  |  |
| `created_at` | timestamp without time zone | YES | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| public_assessments_pkey | id | YES | btree |

---

## public_candidates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('public_candidates_id_seq'::regclass) | PRI |  |
| `google_id` | character varying | YES | NULL |  |  |
| `email` | character varying | NO | NULL |  |  |
| `first_name` | character varying | YES | NULL |  |  |
| `last_name` | character varying | YES | NULL |  |  |
| `display_name` | character varying | YES | NULL |  |  |
| `profile_image_url` | character varying | YES | NULL |  |  |
| `phone_number` | character varying | YES | NULL |  |  |
| `location` | character varying | YES | NULL |  |  |
| `linkedin_url` | character varying | YES | NULL |  |  |
| `github_url` | character varying | YES | NULL |  |  |
| `portfolio_url` | character varying | YES | NULL |  |  |
| `years_experience` | integer | YES | 0 |  |  |
| `desired_salary_min` | integer | YES | NULL |  |  |
| `desired_salary_max` | integer | YES | NULL |  |  |
| `current_job_title` | character varying | YES | NULL |  |  |
| `profile_visibility` | character varying | YES | 'private'::character varying |  |  |
| `allow_recruiter_contact` | boolean | YES | true |  |  |
| `is_active` | boolean | YES | true |  |  |
| `email_verified` | boolean | YES | false |  |  |
| `profile_completed` | boolean | YES | false |  |  |
| `created_at` | timestamp without time zone | YES | now() |  |  |
| `updated_at` | timestamp without time zone | YES | now() |  |  |
| `last_login_at` | timestamp without time zone | YES | NULL |  |  |
| `password_hash` | character varying | YES | NULL |  |  |
| `email_verification_token` | character varying | YES | NULL |  |  |
| `email_verification_expires` | timestamp without time zone | YES | NULL |  |  |
| `password_reset_token` | character varying | YES | NULL |  |  |
| `password_reset_expires` | timestamp without time zone | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| public_candidates_pkey | id | YES | btree |

---

## public_job_applications

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('public_job_applications_id_seq'::regclass) | PRI |  |
| `candidate_id` | integer | NO | NULL |  |  |
| `job_id` | integer | NO | NULL |  |  |
| `resume_upload_id` | integer | YES | NULL |  |  |
| `cover_letter` | text | YES | NULL |  |  |
| `application_status` | character varying | YES | 'submitted'::character varying |  |  |
| `match_score` | integer | YES | NULL |  |  |
| `skills_match_score` | integer | YES | NULL |  |  |
| `experience_match_score` | integer | YES | NULL |  |  |
| `recruiter_notes` | text | YES | NULL |  |  |
| `recruiter_rating` | character varying | YES | NULL |  |  |
| `viewed_by_recruiter` | boolean | YES | false |  |  |
| `recruiter_viewed_at` | timestamp without time zone | YES | NULL |  |  |
| `converted_to_main_candidate` | boolean | YES | false |  |  |
| `main_candidate_id` | integer | YES | NULL |  |  |
| `applied_at` | timestamp without time zone | YES | now() |  |  |
| `updated_at` | timestamp without time zone | YES | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| public_job_applications_pkey | id | YES | btree |

---

## public_jobs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('public_jobs_id_seq'::regclass) | PRI |  |
| `title` | character varying | NO | NULL |  |  |
| `company_name` | character varying | NO | NULL |  |  |
| `location` | character varying | YES | NULL |  |  |
| `job_type` | character varying | YES | 'full-time'::character varying |  |  |
| `experience_level` | character varying | YES | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `requirements` | text | YES | NULL |  |  |
| `responsibilities` | text | YES | NULL |  |  |
| `benefits` | text | YES | NULL |  |  |
| `salary_min` | integer | YES | NULL |  |  |
| `salary_max` | integer | YES | NULL |  |  |
| `currency` | character varying | YES | 'USD'::character varying |  |  |
| `required_skills` | jsonb | YES | NULL |  |  |
| `preferred_skills` | jsonb | YES | NULL |  |  |
| `is_active` | boolean | YES | true |  |  |
| `is_featured` | boolean | YES | false |  |  |
| `applications_count` | integer | YES | 0 |  |  |
| `company_size` | character varying | YES | NULL |  |  |
| `industry` | character varying | YES | NULL |  |  |
| `remote_allowed` | boolean | YES | false |  |  |
| `source_system` | character varying | YES | NULL |  |  |
| `external_job_id` | character varying | YES | NULL |  |  |
| `posted_at` | timestamp without time zone | YES | now() |  |  |
| `expires_at` | timestamp without time zone | YES | NULL |  |  |
| `created_at` | timestamp without time zone | YES | now() |  |  |
| `updated_at` | timestamp without time zone | YES | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| public_jobs_pkey | id | YES | btree |

---

## public_resume_uploads

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('public_resume_uploads_id_seq'::regclass) | PRI |  |
| `candidate_id` | integer | YES | NULL |  |  |
| `session_id` | integer | YES | NULL |  |  |
| `filename` | character varying | NO | NULL |  |  |
| `original_filename` | character varying | NO | NULL |  |  |
| `file_path` | character varying | NO | NULL |  |  |
| `file_size` | integer | NO | NULL |  |  |
| `file_type` | character varying | NO | NULL |  |  |
| `processing_status` | character varying | YES | 'pending'::character varying |  |  |
| `parsing_completed` | boolean | YES | false |  |  |
| `ai_analysis_completed` | boolean | YES | false |  |  |
| `parsed_text` | text | YES | NULL |  |  |
| `structured_data` | jsonb | YES | NULL |  |  |
| `error_message` | text | YES | NULL |  |  |
| `retry_count` | integer | YES | 0 |  |  |
| `uploaded_at` | timestamp without time zone | YES | now() |  |  |
| `processed_at` | timestamp without time zone | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| public_resume_uploads_pkey | id | YES | btree |

---

## public_sessions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('public_sessions_id_seq'::regclass) | PRI |  |
| `session_token` | character varying | NO | NULL |  |  |
| `candidate_id` | integer | YES | NULL |  |  |
| `ip_address` | character varying | YES | NULL |  |  |
| `user_agent` | text | YES | NULL |  |  |
| `browser_fingerprint` | character varying | YES | NULL |  |  |
| `is_authenticated` | boolean | YES | false |  |  |
| `assessment_started` | boolean | YES | false |  |  |
| `assessment_completed` | boolean | YES | false |  |  |
| `requests_count` | integer | YES | 0 |  |  |
| `last_request_at` | timestamp without time zone | YES | now() |  |  |
| `expires_at` | timestamp without time zone | NO | NULL |  |  |
| `created_at` | timestamp without time zone | YES | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| public_sessions_pkey | id | YES | btree |

---

## screening_projects

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('screening_projects_id_seq'::regclass) | PRI |  |
| `job_description_id` | integer | NO | NULL |  |  |
| `name` | character varying | NO | NULL |  |  |
| `status` | character varying | NO | 'setup'::character varying |  |  |
| `total_candidates` | integer | YES | 0 |  |  |
| `processed_candidates` | integer | YES | 0 |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `created_by` | integer | YES | NULL |  |  |
| `company_id` | character varying | YES | NULL |  |  |
| `scoring_module` | character varying | NO | 'job-specific'::character varying |  |  |
| `scoring_config` | jsonb | YES | '{}'::jsonb |  |  |
| `pipeline_template` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_screening_projects_company_id | company_id | NO | btree |
| screening_projects_pkey | id | YES | btree |

---

## sessions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `sid` | character varying | NO | NULL | PRI |  |
| `sess` | jsonb | NO | NULL |  |  |
| `expire` | timestamp without time zone | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| IDX_session_expire | expire | NO | btree |
| sessions_pkey | sid | YES | btree |

---

## sourced_candidates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | character varying | NO | NULL |  |  |
| `campaign_id` | character varying | YES | NULL |  |  |
| `user_id` | integer | NO | NULL |  |  |
| `company_id` | character varying | YES | NULL |  |  |
| `source_type` | character varying | NO | NULL |  |  |
| `source_id` | character varying | YES | NULL |  |  |
| `source_url` | character varying | YES | NULL |  |  |
| `full_name` | character varying | YES | NULL |  |  |
| `first_name` | character varying | YES | NULL |  |  |
| `last_name` | character varying | YES | NULL |  |  |
| `email` | character varying | YES | NULL |  |  |
| `phone` | character varying | YES | NULL |  |  |
| `linkedin_url` | character varying | YES | NULL |  |  |
| `current_title` | character varying | YES | NULL |  |  |
| `current_company` | character varying | YES | NULL |  |  |
| `location` | character varying | YES | NULL |  |  |
| `experience_years` | integer | YES | NULL |  |  |
| `skills` | jsonb | YES | '[]'::jsonb |  |  |
| `industries` | jsonb | YES | '[]'::jsonb |  |  |
| `seniority` | character varying | YES | NULL |  |  |
| `profile_data` | jsonb | NO | '{}'::jsonb |  |  |
| `data_quality_score` | integer | YES | 0 |  |  |
| `profile_completeness_score` | integer | YES | 0 |  |  |
| `contact_info_quality` | character varying | YES | 'unknown'::character varying |  |  |
| `match_score` | integer | YES | 0 |  |  |
| `apollo_cost` | numeric | YES | 0.00 |  |  |
| `pdl_cost` | numeric | YES | 0.00 |  |  |
| `total_cost` | numeric | YES | 0.00 |  |  |
| `deduplication_hash` | character varying | YES | NULL |  |  |
| `is_duplicate` | boolean | YES | false |  |  |
| `duplicate_of_id` | character varying | YES | NULL |  |  |
| `added_to_pipeline` | boolean | YES | false |  |  |
| `pipeline_stage` | character varying | YES | NULL |  |  |
| `candidate_id` | integer | YES | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |
| `contacted_at` | timestamp without time zone | YES | NULL |  |  |
| `last_activity_at` | timestamp without time zone | YES | NULL |  |  |
| `source_channel` | character varying | NO | NULL |  |  |
| `enriched_profile` | jsonb | NO | '{}'::jsonb |  |  |
| `contact_attempts` | integer | YES | 0 |  |  |
| `last_contact_date` | timestamp without time zone | YES | NULL |  |  |
| `response_status` | character varying | YES | 'no_contact'::character varying |  |  |
| `engagement_score` | integer | YES | 0 |  |  |
| `enrichment_cost` | numeric | YES | 0.00 |  |  |
| `apollo_data` | jsonb | YES | '{}'::jsonb |  |  |
| `pdl_data` | jsonb | YES | '{}'::jsonb |  |  |
| `hr_feedback` | text | YES | NULL |  |  |
| `last_enriched_at` | timestamp without time zone | YES | NULL |  |  |
| `giglancer_data` | jsonb | YES | '{}'::jsonb |  |  |
| `processing_status` | character varying | YES | 'pending'::character varying |  |  |
| `processing_error` | text | YES | NULL |  |  |
| `processing_attempts` | integer | YES | 0 |  |  |
| `last_processed_at` | timestamp without time zone | YES | NULL |  |  |
| `matched_to_job_id` | integer | YES | NULL |  |  |
| `parsed_resume_data` | jsonb | YES | NULL |  |  |
| `skill_scoring_results` | jsonb | YES | NULL |  |  |
| `ai_analysis` | jsonb | YES | NULL |  |  |
| `resume_text` | text | YES | NULL |  |  |
| `processing_metadata` | jsonb | YES | NULL |  |  |
| `overall_skill_score` | integer | YES | NULL |  |  |
| `marketability` | character varying | YES | NULL |  |  |
| `ai_processed` | boolean | YES | false |  |  |
| `resume_file_path` | character varying | YES | NULL |  |  |

---

## sourcing_agent_configs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | character varying | NO | NULL |  |  |
| `user_id` | integer | NO | NULL |  |  |
| `company_id` | character varying | YES | NULL |  |  |
| `agent_name` | character varying | NO | NULL |  |  |
| `agent_type` | character varying | NO | NULL |  |  |
| `is_active` | boolean | YES | true |  |  |
| `schedule_type` | character varying | NO | NULL |  |  |
| `cron_expression` | character varying | YES | NULL |  |  |
| `interval_minutes` | integer | YES | NULL |  |  |
| `triggers` | jsonb | NO | '[]'::jsonb |  |  |
| `actions` | jsonb | NO | '[]'::jsonb |  |  |
| `conditions` | jsonb | YES | '{}'::jsonb |  |  |
| `last_executed_at` | timestamp without time zone | YES | NULL |  |  |
| `next_execution_at` | timestamp without time zone | YES | NULL |  |  |
| `execution_count` | integer | YES | 0 |  |  |
| `success_rate` | numeric | YES | 0.00 |  |  |
| `avg_execution_time` | integer | YES | 0 |  |  |
| `max_daily_cost` | numeric | YES | 10.00 |  |  |
| `current_daily_cost` | numeric | YES | 0.00 |  |  |
| `last_cost_reset` | timestamp without time zone | YES | now() |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |

---

## sourcing_campaigns

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | character varying | NO | NULL |  |  |
| `user_id` | integer | NO | NULL |  |  |
| `company_id` | character varying | YES | NULL |  |  |
| `name` | character varying | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `status` | character varying | NO | 'draft'::character varying |  |  |
| `job_requirements` | jsonb | NO | '{}'::jsonb |  |  |
| `apollo_search_query` | jsonb | YES | '{}'::jsonb |  |  |
| `pdl_search_query` | jsonb | YES | '{}'::jsonb |  |  |
| `target_candidate_count` | integer | YES | 100 |  |  |
| `max_cost_per_candidate` | numeric | YES | 0.10 |  |  |
| `enable_auto_enrichment` | boolean | YES | true |  |  |
| `enable_deduplication` | boolean | YES | true |  |  |
| `candidates_found` | integer | YES | 0 |  |  |
| `candidates_enriched` | integer | YES | 0 |  |  |
| `total_cost_spent` | numeric | YES | 0.00 |  |  |
| `avg_cost_per_candidate` | numeric | YES | 0.00 |  |  |
| `auto_add_to_pipeline` | boolean | YES | false |  |  |
| `target_pipeline_stage` | character varying | YES | NULL |  |  |
| `auto_contact_enabled` | boolean | YES | false |  |  |
| `contact_template` | text | YES | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |
| `updated_at` | timestamp without time zone | NO | now() |  |  |
| `last_run_at` | timestamp without time zone | YES | NULL |  |  |
| `next_run_at` | timestamp without time zone | YES | NULL |  |  |

---

## subscription_plan_features

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('subscription_plan_features_id_seq'::regclass) | PRI |  |
| `plan_id` | character varying | YES | NULL |  |  |
| `feature_key` | character varying | NO | NULL |  |  |
| `feature_value` | text | NO | NULL |  |  |
| `feature_type` | character varying | YES | 'number'::character varying |  |  |
| `created_at` | timestamp without time zone | YES | CURRENT_TIMESTAMP |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_subscription_plan_features_plan_id | plan_id | NO | btree |
| subscription_plan_features_pkey | id | YES | btree |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| subscription_plan_features_plan_id_fkey | plan_id | subscription_plans.plan_id |

---

## subscription_plans

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('subscription_plans_id_seq'::regclass) | PRI |  |
| `plan_id` | character varying | NO | NULL |  |  |
| `name` | character varying | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `price` | numeric | NO | 0 |  |  |
| `interval` | character varying | NO | 'month'::character varying |  |  |
| `is_active` | boolean | YES | true |  |  |
| `is_featured` | boolean | YES | false |  |  |
| `paypal_plan_id` | character varying | YES | NULL |  |  |
| `stripe_price_id` | character varying | YES | NULL |  |  |
| `created_at` | timestamp without time zone | YES | CURRENT_TIMESTAMP |  |  |
| `updated_at` | timestamp without time zone | YES | CURRENT_TIMESTAMP |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_subscription_plans_active | is_active | NO | btree |
| subscription_plans_pkey | id | YES | btree |
| subscription_plans_plan_id_key | plan_id | YES | btree |

---

## subscription_usage

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('subscription_usage_id_seq'::regclass) | PRI |  |
| `user_id` | integer | NO | NULL |  |  |
| `feature_key` | character varying | NO | NULL |  |  |
| `usage_count` | integer | YES | 0 |  |  |
| `period_start` | timestamp without time zone | YES | CURRENT_TIMESTAMP |  |  |
| `period_end` | timestamp without time zone | YES | NULL |  |  |
| `created_at` | timestamp without time zone | YES | CURRENT_TIMESTAMP |  |  |
| `updated_at` | timestamp without time zone | YES | CURRENT_TIMESTAMP |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_subscription_usage_period | user_id | NO | btree |
| idx_subscription_usage_period | period_end | NO | btree |
| idx_subscription_usage_period | period_start | NO | btree |
| idx_subscription_usage_user_id | user_id | NO | btree |
| subscription_usage_pkey | id | YES | btree |
| subscription_usage_user_id_feature_key_period_start_key | period_start | YES | btree |
| subscription_usage_user_id_feature_key_period_start_key | feature_key | YES | btree |
| subscription_usage_user_id_feature_key_period_start_key | user_id | YES | btree |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| subscription_usage_user_id_fkey | user_id | users.id |

---

## token_usage

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('token_usage_id_seq'::regclass) | PRI |  |
| `service` | text | NO | NULL |  |  |
| `endpoint` | text | NO | NULL |  |  |
| `tokens_used` | integer | NO | NULL |  |  |
| `cost` | real | YES | 0 |  |  |
| `timestamp` | timestamp without time zone | NO | NULL |  |  |
| `user_id` | integer | YES | NULL |  |  |
| `created_at` | timestamp without time zone | YES | CURRENT_TIMESTAMP |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_token_usage_service_timestamp | service | NO | btree |
| idx_token_usage_service_timestamp | timestamp | NO | btree |
| token_usage_pkey | id | YES | btree |

---

## training_jobs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('training_jobs_id_seq'::regclass) | PRI |  |
| `model_id` | integer | YES | NULL |  |  |
| `status` | character varying | NO | 'pending'::character varying |  |  |
| `training_data_count` | integer | YES | 0 |  |  |
| `accuracy` | integer | YES | NULL |  |  |
| `logs` | text | YES | NULL |  |  |
| `started_at` | timestamp without time zone | YES | NULL |  |  |
| `completed_at` | timestamp without time zone | YES | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| training_jobs_pkey | id | YES | btree |

---

## user_feedback

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('user_feedback_id_seq'::regclass) | PRI |  |
| `candidate_id` | integer | NO | NULL |  |  |
| `job_description_id` | integer | NO | NULL |  |  |
| `original_score` | integer | NO | NULL |  |  |
| `feedback_score` | integer | NO | NULL |  |  |
| `feedback_verdict` | character varying | NO | NULL |  |  |
| `feedback` | text | YES | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| user_feedback_pkey | id | YES | btree |

---

## users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('users_id_seq'::regclass) | PRI |  |
| `google_id` | character varying | YES | NULL |  |  |
| `email` | character varying | NO | NULL |  |  |
| `first_name` | character varying | YES | NULL |  |  |
| `last_name` | character varying | YES | NULL |  |  |
| `display_name` | character varying | YES | NULL |  |  |
| `profile_image_url` | character varying | YES | NULL |  |  |
| `is_active` | boolean | YES | true |  |  |
| `last_login_at` | timestamp without time zone | YES | NULL |  |  |
| `created_at` | timestamp without time zone | YES | now() |  |  |
| `updated_at` | timestamp without time zone | YES | now() |  |  |
| `password_hash` | character varying | YES | NULL |  |  |
| `stripe_customer_id` | character varying | YES | NULL |  |  |
| `stripe_subscription_id` | character varying | YES | NULL |  |  |
| `subscription_plan` | character varying | YES | 'free'::character varying |  |  |
| `subscription_status` | character varying | YES | 'active'::character varying |  |  |
| `subscription_current_period_end` | timestamp without time zone | YES | NULL |  |  |
| `subscription_cancel_at_period_end` | boolean | YES | false |  |  |
| `usage_count` | integer | YES | 0 |  |  |
| `monthly_usage_reset` | timestamp without time zone | YES | now() |  |  |
| `role` | character varying | NO | 'recruiter'::character varying |  |  |
| `phone_number` | character varying | YES | NULL |  |  |
| `work_email` | character varying | YES | NULL |  |  |
| `company_name` | character varying | YES | NULL |  |  |
| `company_id` | character varying | YES | NULL |  |  |
| `paypal_subscription_id` | character varying | YES | NULL |  |  |
| `payment_provider` | character varying | YES | NULL |  |  |
| `paypal_plan_id` | character varying | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| users_email_unique | email | YES | btree |
| users_google_id_unique | google_id | YES | btree |
| users_pkey | id | YES | btree |

---

## work_experience

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | integer | NO | nextval('work_experience_id_seq'::regclass) | PRI |  |
| `candidate_id` | integer | NO | NULL |  |  |
| `company_name` | character varying | NO | NULL |  |  |
| `job_title` | character varying | NO | NULL |  |  |
| `start_date` | character varying | YES | NULL |  |  |
| `end_date` | character varying | YES | NULL |  |  |
| `duration` | character varying | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `technologies` | json | YES | '[]'::json |  |  |
| `is_current_job` | boolean | YES | false |  |  |
| `location` | character varying | YES | NULL |  |  |
| `employment_type` | character varying | YES | NULL |  |  |
| `extraction_confidence` | integer | YES | 0 |  |  |
| `raw_text` | text | YES | NULL |  |  |
| `created_at` | timestamp without time zone | NO | now() |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| work_experience_pkey | id | YES | btree |

---

