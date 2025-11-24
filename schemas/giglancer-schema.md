# GIGLANCER Database Schema

**Database Type:** mysql
**Total Tables:** 162
**Generated:** 11/22/2025, 12:50:34 PM

---

## Table of Contents

1. [activities](#activities)
2. [apns_devices](#apns-devices)
3. [attachments](#attachments)
4. [bid_statuses](#bid-statuses)
5. [bids](#bids)
6. [certifications](#certifications)
7. [cities](#cities)
8. [contacts](#contacts)
9. [contest_statuses](#contest-statuses)
10. [contest_types](#contest-types)
11. [contest_types_pricing_days](#contest-types-pricing-days)
12. [contest_types_pricing_packages](#contest-types-pricing-packages)
13. [contest_user_downloads](#contest-user-downloads)
14. [contest_user_statuses](#contest-user-statuses)
15. [contest_users](#contest-users)
16. [contests](#contests)
17. [countries](#countries)
18. [coupons](#coupons)
19. [credit_purchase_logs](#credit-purchase-logs)
20. [credit_purchase_plans](#credit-purchase-plans)
21. [default_review](#default-review)
22. [discount_types](#discount-types)
23. [dispute_closed_types](#dispute-closed-types)
24. [dispute_open_types](#dispute-open-types)
25. [dispute_statuses](#dispute-statuses)
26. [educations](#educations)
27. [email_templates](#email-templates)
28. [exam_answers](#exam-answers)
29. [exam_attends](#exam-attends)
30. [exam_categories](#exam-categories)
31. [exam_levels](#exam-levels)
32. [exam_statuses](#exam-statuses)
33. [exams](#exams)
34. [exams_questions](#exams-questions)
35. [exams_users](#exams-users)
36. [flag_categories](#flag-categories)
37. [flags](#flags)
38. [followers](#followers)
39. [form_field_groups](#form-field-groups)
40. [form_field_submissions](#form-field-submissions)
41. [form_fields](#form-fields)
42. [hire_requests](#hire-requests)
43. [input_types](#input-types)
44. [ips](#ips)
45. [job_applies](#job-applies)
46. [job_applies_portfolios](#job-applies-portfolios)
47. [job_apply_clicks](#job-apply-clicks)
48. [job_apply_statuses](#job-apply-statuses)
49. [job_categories](#job-categories)
50. [job_statuses](#job-statuses)
51. [job_types](#job-types)
52. [jobs](#jobs)
53. [jobs_skills](#jobs-skills)
54. [languages](#languages)
55. [message_contents](#message-contents)
56. [messages](#messages)
57. [milestone_statuses](#milestone-statuses)
58. [milestones](#milestones)
59. [money_transfer_accounts](#money-transfer-accounts)
60. [oauth_access_tokens](#oauth-access-tokens)
61. [oauth_authorization_codes](#oauth-authorization-codes)
62. [oauth_clients](#oauth-clients)
63. [oauth_jwt](#oauth-jwt)
64. [oauth_refresh_tokens](#oauth-refresh-tokens)
65. [oauth_scopes](#oauth-scopes)
66. [pages](#pages)
67. [payment_gateway_settings](#payment-gateway-settings)
68. [payment_gateways](#payment-gateways)
69. [portfolios](#portfolios)
70. [pricing_days](#pricing-days)
71. [pricing_packages](#pricing-packages)
72. [privacy_analytics_events](#privacy-analytics-events)
73. [privacy_audit_log](#privacy-audit-log)
74. [privacy_compliance_log](#privacy-compliance-log)
75. [privacy_cookie_preferences](#privacy-cookie-preferences)
76. [privacy_data_requests](#privacy-data-requests)
77. [privacy_retention_policy](#privacy-retention-policy)
78. [privacy_user_journey](#privacy-user-journey)
79. [project_bid_invoice_items](#project-bid-invoice-items)
80. [project_bid_invoices](#project-bid-invoices)
81. [project_bids](#project-bids)
82. [project_categories](#project-categories)
83. [project_disputes](#project-disputes)
84. [project_ranges](#project-ranges)
85. [project_statuses](#project-statuses)
86. [projects](#projects)
87. [projects_project_categories](#projects-project-categories)
88. [provider_users](#provider-users)
89. [providers](#providers)
90. [publications](#publications)
91. [question_answer_options](#question-answer-options)
92. [question_categories](#question-categories)
93. [question_display_types](#question-display-types)
94. [questions](#questions)
95. [quote_bids](#quote-bids)
96. [quote_categories](#quote-categories)
97. [quote_categories_quote_services](#quote-categories-quote-services)
98. [quote_faq_answers](#quote-faq-answers)
99. [quote_faq_question_templates](#quote-faq-question-templates)
100. [quote_request_form_fields](#quote-request-form-fields)
101. [quote_requests](#quote-requests)
102. [quote_service_audios](#quote-service-audios)
103. [quote_service_photos](#quote-service-photos)
104. [quote_service_videos](#quote-service-videos)
105. [quote_services](#quote-services)
106. [quote_statuses](#quote-statuses)
107. [quote_user_faq_questions](#quote-user-faq-questions)
108. [resources](#resources)
109. [resume_downloads](#resume-downloads)
110. [resume_extractions](#resume-extractions)
111. [resume_ratings](#resume-ratings)
112. [reviews](#reviews)
113. [roles](#roles)
114. [salary_types](#salary-types)
115. [screening_candidates](#screening-candidates)
116. [screening_projects](#screening-projects)
117. [seo_generated_pages](#seo-generated-pages)
118. [seo_static_pages](#seo-static-pages)
119. [seo_templates](#seo-templates)
120. [seo_tracking_configs](#seo-tracking-configs)
121. [seo_variables](#seo-variables)
122. [session_cookie_consent](#session-cookie-consent)
123. [setting_categories](#setting-categories)
124. [settings](#settings)
125. [skill_info](#skill-info)
126. [skill_info_faqs](#skill-info-faqs)
127. [skill_info_tech_stack](#skill-info-tech-stack)
128. [skills](#skills)
129. [skills_portfolios](#skills-portfolios)
130. [skills_projects](#skills-projects)
131. [skills_users](#skills-users)
132. [states](#states)
133. [subscription_features](#subscription-features)
134. [subscription_payments](#subscription-payments)
135. [subscription_plans](#subscription-plans)
136. [subscription_usage](#subscription-usage)
137. [subscription_usage_logs](#subscription-usage-logs)
138. [temp_skills](#temp-skills)
139. [temp_skills_projects](#temp-skills-projects)
140. [temp_skills_users](#temp-skills-users)
141. [timezones](#timezones)
142. [transactions](#transactions)
143. [upload_hosters](#upload-hosters)
144. [upload_service_settings](#upload-service-settings)
145. [upload_service_types](#upload-service-types)
146. [upload_services](#upload-services)
147. [upload_statuses](#upload-statuses)
148. [uploads](#uploads)
149. [user_cash_withdrawals](#user-cash-withdrawals)
150. [user_logins](#user-logins)
151. [user_subscriptions](#user-subscriptions)
152. [users](#users)
153. [vaults](#vaults)
154. [views](#views)
155. [wallet_transaction_logs](#wallet-transaction-logs)
156. [wallets](#wallets)
157. [work_profiles](#work-profiles)
158. [zazpay_ipn_logs](#zazpay-ipn-logs)
159. [zazpay_payment_gateways](#zazpay-payment-gateways)
160. [zazpay_payment_gateways_users](#zazpay-payment-gateways-users)
161. [zazpay_payment_groups](#zazpay-payment-groups)
162. [zazpay_transaction_logs](#zazpay-transaction-logs)

---

## activities

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `other_user_id` | bigint | YES | NULL |  |  |
| `foreign_id` | bigint | YES | 0 |  |  |
| `class` | varchar(255) | NO | NULL |  |  |
| `from_status_id` | bigint | NO | 0 |  |  |
| `to_status_id` | bigint | NO | 0 |  |  |
| `activity_type` | varchar(255) | NO | NULL |  |  |
| `model_id` | bigint | NO | 0 |  |  |
| `model_class` | varchar(255) | YES | NULL |  |  |
| `amount` | double | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## apns_devices

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `pid` | int | NO | NULL | PRI |  |
| `appname` | varchar(510) | NO | NULL |  |  |
| `appversion` | varchar(50) | YES | NULL |  |  |
| `deviceuid` | char(40) | NO | NULL |  |  |
| `devicetoken` | char(64) | NO | NULL |  |  |
| `devicename` | varchar(510) | NO | NULL |  |  |
| `devicemodel` | varchar(200) | NO | NULL |  |  |
| `deviceversion` | varchar(50) | NO | NULL |  |  |
| `pushbadge` | varchar(200) | YES | enabled |  |  |
| `pushalert` | varchar(200) | YES | enabled |  |  |
| `pushsound` | varchar(200) | YES | enabled |  |  |
| `development` | varchar(200) | NO | production |  |  |
| `status` | varchar(200) | NO | registered |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | pid | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## attachments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `class` | varchar(200) | NO | NULL |  |  |
| `foreign_id` | bigint | NO | NULL |  |  |
| `filename` | varchar(510) | NO | NULL |  |  |
| `dir` | varchar(200) | NO | NULL |  |  |
| `mimetype` | varchar(200) | YES | NULL |  |  |
| `filesize` | bigint | YES | NULL |  |  |
| `height` | bigint | YES | NULL |  |  |
| `width` | bigint | YES | NULL |  |  |
| `thumb` | tinyint(1) | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `original_filename` | varchar(512) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## bid_statuses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `bid_count` | bigint | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## bids

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `user_id` | bigint | YES | NULL | MUL |  |
| `project_bid_id` | bigint | NO | NULL | MUL |  |
| `project_id` | bigint | NO | NULL | MUL |  |
| `screening_candidate_id` | bigint | YES | 0 |  |  |
| `amount` | double | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `visa_status` | varchar(64) | YES | NULL |  |  |
| `ready_to_relocate` | varchar(16) | YES | NULL |  |  |
| `years_of_exp` | int | YES | 0 |  |  |
| `duration` | bigint | NO | NULL |  |  |
| `winner_selected_date` | timestamp | YES | NULL |  |  |
| `bid_status_id` | int | NO | NULL | MUL |  |
| `is_notifiy` | tinyint(1) | YES | NULL |  |  |
| `is_withdrawn` | tinyint(1) | NO | 0 |  |  |
| `is_freelancer_withdrawn` | tinyint(1) | NO | 0 |  |  |
| `total_escrow_amount` | double | NO | 0 |  |  |
| `amount_in_escrow` | double | NO | 0 |  |  |
| `paid_escrow_amount` | double | NO | 0 |  |  |
| `total_invoice_requested_amount` | double | NO | 0 |  |  |
| `site_commission_from_employer` | double | NO | 0 |  |  |
| `total_invoice_got_paid` | double | NO | 0 |  |  |
| `site_commission_from_freelancer` | double | NO | 0 |  |  |
| `development_start_date` | timestamp | YES | NULL |  |  |
| `development_end_date` | timestamp | YES | NULL |  |  |
| `is_offered_rejected` | tinyint(1) | NO | 0 |  |  |
| `message_count` | bigint | NO | 0 |  |  |
| `milestone_count` | bigint | NO | 0 |  |  |
| `credit_purchase_log_id` | bigint | NO | 0 |  |  |
| `is_reached_response_end_date_for_freelancer` | tinyint(1) | NO | 0 |  |  |
| `is_screening_completed` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| bid_status_id | bid_status_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| project_bid_id | project_bid_id | NO | BTREE |
| project_id | project_id | NO | BTREE |
| user_id | user_id | NO | BTREE |

---

## certifications

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `title` | varchar(510) | NO | NULL |  |  |
| `conferring_organization` | varchar(510) | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `year` | varchar(510) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## cities

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `country_id` | int | NO | NULL |  |  |
| `state_id` | bigint | NO | NULL |  |  |
| `name` | varchar(90) | NO | NULL |  |  |
| `slug` | varchar(90) | NO | NULL |  |  |
| `latitude` | double | YES | NULL |  |  |
| `longitude` | double | YES | NULL |  |  |
| `timezone` | varchar(20) | YES | NULL |  |  |
| `dma_id` | int | YES | NULL |  |  |
| `county` | varchar(50) | YES | NULL |  |  |
| `code` | varchar(8) | YES | NULL |  |  |
| `is_active` | tinyint(1) | NO | 0 |  |  |
| `project_count` | int | NO | 0 |  |  |
| `quote_service_count` | int | NO | 0 |  |  |
| `user_profile_count` | int | NO | 0 |  |  |
| `user_freelancer_count` | bigint | NO | 0 |  |  |
| `language_id` | bigint | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| language_id | language_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## contacts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `first_name` | varchar(200) | NO | NULL |  |  |
| `last_name` | varchar(200) | YES | NULL |  |  |
| `email` | varchar(510) | NO | NULL |  |  |
| `subject` | varchar(510) | YES | NULL |  |  |
| `message` | text | NO | NULL |  |  |
| `phone` | varchar(40) | YES | NULL |  |  |
| `ip_id` | bigint | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ip_id | ip_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## contest_statuses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `name` | varchar(255) | YES | NULL |  |  |
| `slug` | varchar(255) | YES | NULL |  |  |
| `message` | text | YES | NULL |  |  |
| `contest_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## contest_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `resource_id` | int | YES | NULL | MUL |  |
| `name` | varchar(45) | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `next` | int | YES | NULL |  |  |
| `contest_count` | bigint | YES | NULL |  |  |
| `form_field_count` | bigint | YES | NULL |  |  |
| `contest_user_count` | bigint | YES | NULL |  |  |
| `minimum_prize` | double | YES | 0 |  |  |
| `blind_fee` | int | YES | 0 |  |  |
| `private_fee` | int | YES | 0 |  |  |
| `featured_fee` | int | YES | 0 |  |  |
| `highlight_fee` | double | YES | NULL |  |  |
| `site_revenue` | double | YES | NULL |  |  |
| `is_watermarked` | tinyint(1) | YES | 1 |  |  |
| `is_active` | tinyint(1) | YES | 1 |  |  |
| `is_template` | tinyint(1) | YES | 0 |  |  |
| `is_blind` | tinyint(1) | YES | 0 |  |  |
| `is_featured` | tinyint(1) | YES | 0 |  |  |
| `is_highlight` | tinyint(1) | YES | NULL |  |  |
| `is_private` | tinyint(1) | YES | 0 |  |  |
| `maximum_entries_allowed` | bigint | YES | 40 |  |  |
| `maximum_entries_allowed_per_user` | bigint | YES | 0 |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| resource_id | resource_id | NO | BTREE |

---

## contest_types_pricing_days

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `contest_type_id` | int | YES | NULL | MUL |  |
| `pricing_day_id` | int | YES | NULL | MUL |  |
| `price` | double | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| contest_type_id | contest_type_id | NO | BTREE |
| pricing_day_id | pricing_day_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## contest_types_pricing_packages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `contest_type_id` | int | YES | NULL | MUL |  |
| `pricing_package_id` | int | YES | NULL | MUL |  |
| `price` | double | YES | NULL |  |  |
| `participant_commision` | double | YES | NULL |  |  |
| `maximum_entry_allowed` | int | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| contest_type_id | contest_type_id | NO | BTREE |
| pricing_package_id | pricing_package_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## contest_user_downloads

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `contest_user_id` | bigint | YES | NULL | MUL |  |
| `ip_id` | bigint | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| contest_user_id | contest_user_id | NO | BTREE |
| ip_id | ip_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## contest_user_statuses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `name` | varchar(255) | YES | NULL |  |  |
| `description` | varchar(255) | YES | NULL |  |  |
| `slug` | varchar(255) | YES | NULL |  |  |
| `contest_user_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## contest_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `contest_owner_user_id` | bigint | YES | NULL |  |  |
| `contest_id` | bigint | YES | NULL | MUL |  |
| `description` | text | YES | NULL |  |  |
| `copyright_note` | text | YES | NULL |  |  |
| `entry_no` | bigint | YES | NULL |  |  |
| `contest_user_status_id` | bigint | YES | 1 | MUL |  |
| `contest_user_total_ratings` | int | YES | 0 |  |  |
| `contest_user_rating_count` | int | YES | 0 |  |  |
| `average_rating` | double | YES | 0 |  |  |
| `site_revenue` | double | YES | 0 |  |  |
| `zazpay_gateway_id` | bigint | YES | NULL |  |  |
| `view_count` | bigint | NO | 0 |  |  |
| `flag_count` | bigint | NO | 0 |  |  |
| `message_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| contest_id | contest_id | NO | BTREE |
| contest_user_status_id | contest_user_status_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## contests

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `referred_by_user_id` | bigint | YES | 0 |  |  |
| `contest_type_id` | int | YES | NULL | MUL |  |
| `contest_status_id` | int | YES | NULL | MUL |  |
| `is_send_payment_notification` | tinyint(1) | YES | 0 |  |  |
| `resource_id` | int | YES | NULL | MUL |  |
| `pricing_package_id` | int | YES | NULL | MUL |  |
| `pricing_day_id` | int | YES | NULL | MUL |  |
| `name` | varchar(255) | YES | NULL |  |  |
| `slug` | varchar(255) | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `maximum_entry_allowed` | int | YES | NULL |  |  |
| `maximum_entry_allowed_per_user` | bigint | YES | 0 |  |  |
| `reason_for_cancelation` | text | YES | NULL |  |  |
| `prize` | double | YES | 0 |  |  |
| `creation_cost` | double | YES | NULL |  |  |
| `actual_end_date` | timestamp | YES | NULL |  |  |
| `end_date` | timestamp | YES | NULL |  |  |
| `start_date` | timestamp | YES | NULL |  |  |
| `refund_request_date` | timestamp | YES | NULL |  |  |
| `canceled_by_admin_date` | timestamp | YES | NULL |  |  |
| `winner_selected_date` | timestamp | YES | NULL |  |  |
| `judging_date` | timestamp | YES | NULL |  |  |
| `pending_action_to_admin_date` | timestamp | YES | NULL |  |  |
| `change_requested_date` | timestamp | YES | NULL |  |  |
| `change_completed_date` | timestamp | YES | NULL |  |  |
| `paid_to_participant_date` | timestamp | YES | NULL |  |  |
| `completed_date` | timestamp | YES | NULL |  |  |
| `files_expectation_date` | timestamp | YES | NULL |  |  |
| `partcipant_count` | bigint | YES | 0 |  |  |
| `contest_user_count` | bigint | YES | 0 |  |  |
| `contest_user_won_count` | bigint | YES | 0 |  |  |
| `contest_user_eliminated_count` | bigint | YES | 0 |  |  |
| `contest_user_withdrawn_count` | bigint | YES | 0 |  |  |
| `contest_user_active_count` | bigint | YES | 0 |  |  |
| `message_count` | bigint | YES | 0 |  |  |
| `total_site_revenue` | bigint | YES | 0 |  |  |
| `winner_user_id` | bigint | YES | NULL |  |  |
| `payment_gateway_id` | int | YES | NULL |  |  |
| `last_contest_user_entry_no` | bigint | YES | 0 |  |  |
| `is_system_flagged` | tinyint(1) | YES | 0 |  |  |
| `is_user_flagged` | tinyint(1) | YES | 0 |  |  |
| `is_admin_complete` | tinyint(1) | YES | 0 |  |  |
| `admin_suspend` | tinyint(1) | YES | 0 |  |  |
| `is_winner_selected_by_admin` | tinyint(1) | YES | 0 |  |  |
| `is_pending_action_to_admin` | tinyint(1) | YES | 0 |  |  |
| `is_blind` | tinyint(1) | YES | 0 |  |  |
| `is_private` | tinyint(1) | YES | 0 |  |  |
| `is_featured` | tinyint(1) | YES | 0 |  |  |
| `is_highlight` | tinyint(1) | YES | NULL |  |  |
| `blind_contest_fee` | double | YES | 0 |  |  |
| `private_contest_fee` | double | YES | 0 |  |  |
| `featured_contest_fee` | double | YES | 0 |  |  |
| `highlight_contest_fee` | double | YES | 0 |  |  |
| `detected_suspicious_words` | text | YES | NULL |  |  |
| `reason_for_calcelation` | text | YES | NULL |  |  |
| `site_commision` | double | YES | 0 |  |  |
| `is_paid` | tinyint(1) | YES | 0 |  |  |
| `is_uploaded_entry_design` | tinyint(1) | YES | 0 |  |  |
| `admin_commission_amount` | double | YES | 0 |  |  |
| `affiliate_commission_amount` | double | YES | 0 |  |  |
| `zazpay_gateway_id` | bigint | YES | NULL |  |  |
| `zazpay_payment_id` | bigint | YES | NULL |  |  |
| `zazpay_pay_key` | varchar(250) | YES | NULL |  |  |
| `zazpay_revised_amount` | double | YES | NULL |  |  |
| `upgrade` | text | YES | NULL |  |  |
| `participant_count` | bigint | NO | 0 |  |  |
| `view_count` | bigint | NO | 0 |  |  |
| `follower_count` | bigint | NO | 0 |  |  |
| `flag_count` | bigint | NO | 0 |  |  |
| `is_notification_sent` | tinyint(1) | NO | 0 |  |  |
| `paypal_pay_key` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| contest_status_id | contest_status_id | NO | BTREE |
| contest_type_id | contest_type_id | NO | BTREE |
| pricing_day_id | pricing_day_id | NO | BTREE |
| pricing_package_id | pricing_package_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| resource_id | resource_id | NO | BTREE |
| user_id | user_id | NO | BTREE |

---

## countries

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `iso_alpha2` | varchar(2) | YES | NULL |  |  |
| `iso_alpha3` | varchar(3) | YES | NULL |  |  |
| `iso_numeric` | int | YES | NULL |  |  |
| `fips_code` | varchar(6) | YES | NULL |  |  |
| `name` | varchar(400) | YES | NULL |  |  |
| `capital` | varchar(400) | YES | NULL |  |  |
| `areainsqkm` | double | YES | NULL |  |  |
| `population` | int | YES | NULL |  |  |
| `continent` | varchar(2) | YES | NULL |  |  |
| `tld` | varchar(3) | YES | NULL |  |  |
| `currency` | varchar(3) | YES | NULL |  |  |
| `currencyname` | varchar(20) | YES | NULL |  |  |
| `phone` | varchar(10) | YES | NULL |  |  |
| `postalcodeformat` | varchar(20) | YES | NULL |  |  |
| `postalcoderegex` | varchar(20) | YES | NULL |  |  |
| `languages` | varchar(400) | YES | NULL |  |  |
| `geonameid` | int | YES | NULL |  |  |
| `neighbours` | varchar(20) | YES | NULL |  |  |
| `equivalentfipscode` | varchar(10) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## coupons

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `coupon_code` | varchar(512) | NO | NULL |  |  |
| `max_number_of_time_can_use` | int | NO | 0 |  |  |
| `max_number_of_time_can_use_per_user` | int | NO | 0 |  |  |
| `coupon_used_count` | bigint | NO | 0 |  |  |
| `discount` | double | NO | NULL |  |  |
| `discount_type_id` | bigint | NO | NULL | MUL |  |
| `min_amount` | double | NO | NULL |  |  |
| `coupon_expiry_date` | date | NO | NULL |  |  |
| `is_active` | tinyint(1) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| discount_type_id | discount_type_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## credit_purchase_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `credit_purchase_plan_id` | bigint | NO | NULL | MUL |  |
| `credit_count` | int | NO | NULL |  |  |
| `price` | double | NO | NULL |  |  |
| `discount_percentage` | double | NO | NULL |  |  |
| `original_price` | double | NO | NULL |  |  |
| `payment_gateway_id` | bigint | YES | NULL |  |  |
| `gateway_id` | bigint | YES | NULL |  |  |
| `is_payment_completed` | tinyint(1) | NO | 0 |  |  |
| `coupon_id` | smallint | YES | NULL | MUL |  |
| `is_active` | tinyint(1) | NO | 0 |  |  |
| `used_credit_count` | bigint | NO | 0 |  |  |
| `paypal_pay_key` | varchar(255) | YES | NULL |  |  |
| `expiry_date` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| coupon_id | coupon_id | NO | BTREE |
| credit_purchase_plan_id | credit_purchase_plan_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## credit_purchase_plans

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(255) | NO | NULL |  |  |
| `no_of_credits` | bigint | NO | 0 |  |  |
| `price` | double | NO | NULL |  |  |
| `discount_percentage` | double | NO | NULL |  |  |
| `original_price` | double | NO | NULL |  |  |
| `is_active` | tinyint(1) | NO | 1 |  |  |
| `day_limit` | bigint | YES | NULL |  |  |
| `is_welcome_plan` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## default_review

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | bigint | NO | NULL |  |  |
| `rating` | int | NO | NULL |  |  |
| `message` | text | YES | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## discount_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## dispute_closed_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `name` | varchar(510) | YES | NULL |  |  |
| `dispute_open_type_id` | bigint | YES | NULL | MUL |  |
| `project_role_id` | bigint | YES | NULL |  |  |
| `reason` | varchar(510) | YES | NULL |  |  |
| `resolve_type` | varchar(510) | YES | NULL |  |  |
| `action_list` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| dispute_open_type_id | dispute_open_type_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## dispute_open_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `name` | varchar(510) | YES | NULL |  |  |
| `project_role_id` | bigint | YES | NULL |  |  |
| `is_active` | tinyint(1) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## dispute_statuses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `name` | varchar(510) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## educations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `country_id` | bigint | NO | NULL | MUL |  |
| `title` | varchar(510) | NO | NULL |  |  |
| `from_year` | varchar(255) | NO | NULL |  |  |
| `to_year` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| country_id | country_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## email_templates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `from_email` | varchar(1000) | NO | NULL |  |  |
| `reply_to` | varchar(1000) | NO | NULL |  |  |
| `name` | varchar(300) | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `subject` | varchar(510) | NO | NULL |  |  |
| `text_email_content` | text | YES | NULL |  |  |
| `html_email_content` | text | YES | NULL |  |  |
| `notification_content` | text | YES | NULL |  |  |
| `email_variables` | varchar(2000) | NO | NULL |  |  |
| `is_html` | tinyint(1) | NO | NULL |  |  |
| `is_notify` | tinyint(1) | YES | NULL |  |  |
| `display_name` | varchar(300) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## exam_answers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `exam_id` | bigint | YES | NULL | MUL |  |
| `question_id` | bigint | YES | NULL | MUL |  |
| `exams_user_id` | bigint | YES | NULL | MUL |  |
| `user_answer` | text | YES | NULL |  |  |
| `total_mark` | double | YES | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| exam_id | exam_id | NO | BTREE |
| exams_user_id | exams_user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| question_id | question_id | NO | BTREE |
| user_id | user_id | NO | BTREE |

---

## exam_attends

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `exam_id` | bigint | YES | NULL | MUL |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `exams_user_id` | bigint | YES | NULL | MUL |  |
| `user_login_ip_id` | varchar(30) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| exam_id | exam_id | NO | BTREE |
| exams_user_id | exams_user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## exam_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `name` | varchar(255) | NO | NULL |  |  |
| `exam_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## exam_levels

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `exam_count` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## exam_statuses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `exams_user_count` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## exams

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `question_display_type_id` | bigint | NO | NULL | MUL |  |
| `topics_covered` | text | NO | NULL |  |  |
| `instructions` | text | NO | NULL |  |  |
| `splash_content` | text | YES | NULL |  |  |
| `title` | varchar(100) | YES | NULL |  |  |
| `slug` | varchar(100) | NO | NULL |  |  |
| `duration` | int | NO | 0 |  |  |
| `fee` | double | NO | 0 |  |  |
| `pass_mark_percentage` | int | NO | NULL |  |  |
| `exams_question_count` | int | YES | 0 |  |  |
| `exams_user_count` | int | NO | 0 |  |  |
| `exam_level_id` | bigint | YES | NULL | MUL |  |
| `is_active` | tinyint(1) | YES | NULL |  |  |
| `is_recommended` | tinyint(1) | NO | NULL |  |  |
| `additional_time_to_expire` | int | YES | NULL |  |  |
| `total_fee_received` | double | NO | 0 |  |  |
| `exams_user_passed_count` | int | NO | 0 |  |  |
| `view_count` | bigint | NO | 0 |  |  |
| `parent_exam_id` | bigint | YES | NULL | MUL |  |
| `exam_category_id` | bigint | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| exam_category_id | exam_category_id | NO | BTREE |
| exam_level_id | exam_level_id | NO | BTREE |
| parent_exam_id | parent_exam_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| question_display_type_id | question_display_type_id | NO | BTREE |

---

## exams_questions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `exam_id` | bigint | NO | NULL | MUL |  |
| `question_id` | bigint | NO | NULL | MUL |  |
| `display_order` | int | YES | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| exam_id | exam_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| question_id | question_id | NO | BTREE |

---

## exams_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `exam_id` | bigint | YES | NULL | MUL |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `fee_paid` | double | YES | NULL |  |  |
| `total_mark` | double | YES | 0 |  |  |
| `total_mark_mean` | double | YES | 0 |  |  |
| `total_mark_standard_deviation` | double | YES | 0 |  |  |
| `exam_status_id` | int | NO | 1 |  |  |
| `no_of_times` | int | YES | NULL |  |  |
| `exam_started_date` | timestamp | YES | NULL |  |  |
| `exam_end_date` | timestamp | YES | NULL |  |  |
| `exam_level_id` | bigint | YES | NULL |  |  |
| `allow_duration` | int | NO | 0 |  |  |
| `total_question_count` | int | NO | 0 |  |  |
| `pass_mark_percentage` | double | NO | 0 |  |  |
| `payment_gateway_id` | bigint | YES | NULL |  |  |
| `zazpay_gateway_id` | bigint | YES | NULL |  |  |
| `zazpay_payment_id` | bigint | YES | NULL |  |  |
| `zazpay_pay_key` | varchar(510) | YES | NULL |  |  |
| `zazpay_revised_amount` | double | YES | NULL |  |  |
| `taken_time` | double | NO | 0 |  |  |
| `percentile_rank` | int | YES | NULL |  |  |
| `paypal_pay_key` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| exam_id | exam_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## flag_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | date | NO | NULL |  |  |
| `updated_at` | date | NO | NULL |  |  |
| `name` | varchar(255) | NO | NULL |  |  |
| `class` | varchar(255) | YES | NULL |  |  |
| `flag_count` | bigint | NO | 0 |  |  |
| `is_active` | tinyint(1) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## flags

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `class` | varchar(255) | NO | NULL |  |  |
| `foreign_id` | bigint | NO | NULL |  |  |
| `flag_category_id` | bigint | NO | NULL | MUL |  |
| `message` | text | NO | NULL |  |  |
| `ip_id` | bigint | NO | 0 | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| flag_category_id | flag_category_id | NO | BTREE |
| ip_id | ip_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## followers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `foreign_id` | bigint | YES | NULL |  |  |
| `class` | varchar(255) | NO | NULL |  |  |
| `ip_id` | bigint | NO | 0 | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_followers_ip_id | ip_id | NO | BTREE |
| fk_followers_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## form_field_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `name` | varchar(255) | YES | NULL |  |  |
| `slug` | varchar(255) | YES | NULL |  |  |
| `foreign_id` | bigint | YES | NULL |  |  |
| `info` | text | YES | NULL |  |  |
| `field_order` | bigint | YES | NULL |  |  |
| `class` | varchar(255) | YES | NULL |  |  |
| `is_deletable` | tinyint(1) | YES | 1 |  |  |
| `is_editable` | tinyint(1) | YES | 1 |  |  |

---

## form_field_submissions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `form_field_id` | bigint | NO | NULL |  |  |
| `foreign_id` | int | NO | NULL |  |  |
| `class` | varchar(512) | NO | NULL |  |  |
| `response` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## form_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `name` | varchar(510) | YES | NULL |  |  |
| `label` | varchar(510) | YES | NULL |  |  |
| `info` | varchar(510) | YES | NULL |  |  |
| `length` | bigint | YES | NULL |  |  |
| `options` | text | YES | NULL |  |  |
| `class` | varchar(512) | YES | NULL |  |  |
| `input_type_id` | int | NO | 0 | MUL |  |
| `foreign_id` | int | YES | NULL |  |  |
| `form_field_group_id` | bigint | YES | NULL | MUL |  |
| `is_required` | tinyint(1) | NO | NULL |  |  |
| `is_active` | tinyint(1) | NO | NULL |  |  |
| `display_order` | int | NO | NULL |  |  |
| `depends_on` | varchar(45) | YES | NULL |  |  |
| `depends_value` | varchar(45) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_form_fields_form_field_group_id | form_field_group_id | NO | BTREE |
| fk_form_fields_input_type_id | input_type_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## hire_requests

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `requested_user_id` | bigint | YES | NULL | MUL |  |
| `foreign_id` | bigint | YES | NULL |  |  |
| `class` | varchar(200) | NO | NULL |  |  |
| `message` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_hire_requests_requested_user_id | requested_user_id | NO | BTREE |
| fk_hire_requests_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## input_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(200) | YES | NULL |  |  |
| `value` | varchar(200) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## ips

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `ip` | varchar(510) | YES | NULL |  |  |
| `host` | varchar(200) | NO | NULL |  |  |
| `city_id` | bigint | YES | NULL | MUL |  |
| `state_id` | bigint | YES | NULL | MUL |  |
| `country_id` | bigint | YES | NULL | MUL |  |
| `timezone_id` | bigint | YES | NULL | MUL |  |
| `latitude` | double | YES | NULL |  |  |
| `longitude` | double | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_ips_city_id | city_id | NO | BTREE |
| fk_ips_country_id | country_id | NO | BTREE |
| fk_ips_state_id | state_id | NO | BTREE |
| fk_ips_timezone_id | timezone_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## job_applies

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `job_id` | bigint | YES | NULL | MUL |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `job_apply_status_id` | int | NO | 1 | MUL |  |
| `cover_letter` | text | NO | NULL |  |  |
| `total_resume_rating` | int | NO | 0 |  |  |
| `resume_rating_count` | int | NO | 0 |  |  |
| `ip_id` | bigint | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_job_applies_ip_id | ip_id | NO | BTREE |
| fk_job_applies_job_apply_status_id | job_apply_status_id | NO | BTREE |
| fk_job_applies_job_id | job_id | NO | BTREE |
| fk_job_applies_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## job_applies_portfolios

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `job_apply_id` | bigint | NO | NULL | MUL |  |
| `portfolio_id` | bigint | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_job_applies_portfolios_job_apply_id | job_apply_id | NO | BTREE |
| fk_job_applies_portfolios_portfolio_id | portfolio_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## job_apply_clicks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `job_id` | bigint | NO | NULL | MUL |  |
| `ip_id` | bigint | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_job_apply_clicks_ip_id | ip_id | NO | BTREE |
| fk_job_apply_clicks_job_id | job_id | NO | BTREE |
| fk_job_apply_clicks_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## job_apply_statuses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `slug` | varchar(510) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## job_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `slug` | varchar(510) | NO | NULL |  |  |
| `job_count` | bigint | NO | 0 |  |  |
| `is_active` | tinyint(1) | NO | NULL |  |  |
| `active_job_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## job_statuses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `slug` | varchar(510) | NO | NULL |  |  |
| `job_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## job_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `slug` | varchar(510) | NO | NULL |  |  |
| `is_active` | tinyint(1) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## jobs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `job_status_id` | bigint | YES | NULL | MUL |  |
| `job_type_id` | int | YES | NULL | MUL |  |
| `job_category_id` | bigint | YES | NULL | MUL |  |
| `title` | varchar(510) | NO | NULL |  |  |
| `slug` | varchar(510) | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `address` | varchar(510) | NO | NULL |  |  |
| `address1` | varchar(510) | YES | NULL |  |  |
| `city_id` | bigint | YES | NULL | MUL |  |
| `state_id` | bigint | YES | NULL | MUL |  |
| `country_id` | bigint | YES | NULL | MUL |  |
| `zip_code` | varchar(100) | YES | NULL |  |  |
| `latitude` | double | YES | NULL |  |  |
| `longitude` | double | YES | NULL |  |  |
| `salary_from` | double | YES | NULL |  |  |
| `salary_to` | double | YES | NULL |  |  |
| `salary_type_id` | int | YES | NULL | MUL |  |
| `is_show_salary` | tinyint(1) | NO | NULL |  |  |
| `last_date_to_apply` | date | YES | NULL |  |  |
| `no_of_opening` | int | YES | NULL |  |  |
| `company_name` | varchar(255) | NO | NULL |  |  |
| `ip_id` | bigint | YES | NULL | MUL |  |
| `apply_via` | varchar(100) | NO | NULL |  |  |
| `job_url` | varchar(510) | YES | NULL |  |  |
| `featured_fee` | double(5,2) | NO | 0.00 |  |  |
| `urgent_fee` | double(5,2) | NO | 0.00 |  |  |
| `zazpay_revised_amount` | double | YES | NULL |  |  |
| `payment_gateway_id` | bigint | YES | NULL |  |  |
| `zazpay_gateway_id` | bigint | YES | NULL |  |  |
| `zazpay_payment_id` | bigint | YES | NULL |  |  |
| `zazpay_pay_key` | varchar(510) | YES | NULL |  |  |
| `job_apply_click_count` | bigint | NO | 0 |  |  |
| `job_apply_count` | bigint | NO | 0 |  |  |
| `is_featured` | tinyint(1) | NO | 0 |  |  |
| `is_urgent` | tinyint(1) | NO | 0 |  |  |
| `is_paid` | tinyint(1) | YES | NULL |  |  |
| `company_website` | varchar(510) | YES | NULL |  |  |
| `view_count` | bigint | NO | 0 |  |  |
| `flag_count` | bigint | NO | 0 |  |  |
| `full_address` | text | YES | NULL |  |  |
| `total_listing_fee` | double | NO | 0 |  |  |
| `is_notification_sent` | tinyint(1) | NO | 0 |  |  |
| `paypal_pay_key` | varchar(255) | YES | NULL |  |  |
| `job_open_date` | timestamp | YES | NULL |  |  |
| `minimum_experience` | smallint | YES | NULL |  |  |
| `maximum_experience` | smallint | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_jobs_city_id | city_id | NO | BTREE |
| fk_jobs_country_id | country_id | NO | BTREE |
| fk_jobs_ip_id | ip_id | NO | BTREE |
| fk_jobs_job_category_id | job_category_id | NO | BTREE |
| fk_jobs_job_status_id | job_status_id | NO | BTREE |
| fk_jobs_job_type_id | job_type_id | NO | BTREE |
| fk_jobs_salary_type_id | salary_type_id | NO | BTREE |
| fk_jobs_state_id | state_id | NO | BTREE |
| fk_jobs_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## jobs_skills

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `job_id` | bigint | NO | NULL | MUL |  |
| `skill_id` | bigint | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_jobs_skills_job_id | job_id | NO | BTREE |
| fk_jobs_skills_skill_id | skill_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## languages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(160) | NO | NULL |  |  |
| `iso2` | char(2) | NO | NULL |  |  |
| `iso3` | char(3) | NO | NULL |  |  |
| `is_active` | tinyint(1) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## message_contents

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `subject` | text | NO | NULL |  |  |
| `message` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## messages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `other_user_id` | bigint | YES | NULL |  |  |
| `parent_id` | bigint | YES | NULL |  |  |
| `message_content_id` | bigint | NO | NULL | MUL |  |
| `foreign_id` | bigint | NO | NULL |  |  |
| `class` | varchar(255) | NO | NULL |  |  |
| `root` | varchar(255) | YES | NULL |  |  |
| `freshness_ts` | varchar(255) | YES | NULL |  |  |
| `depth` | bigint | NO | NULL |  |  |
| `materialized_path` | varchar(255) | YES | NULL |  |  |
| `path` | varchar(255) | YES | NULL |  |  |
| `size` | bigint | YES | NULL |  |  |
| `is_sender` | tinyint(1) | NO | NULL |  |  |
| `is_read` | tinyint(1) | YES | NULL |  |  |
| `is_deleted` | tinyint(1) | YES | NULL |  |  |
| `is_private` | tinyint(1) | YES | NULL |  |  |
| `is_child_replied` | tinyint(1) | YES | NULL |  |  |
| `model_id` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_messages_message_content_id | message_content_id | NO | BTREE |
| fk_messages_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## milestone_statuses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `slug` | varchar(510) | NO | NULL |  |  |
| `is_active` | varchar(2) | NO | NULL |  |  |
| `milestone_count` | bigint | NO | NULL |  |  |
| `status_order` | bigint | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## milestones

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `project_id` | bigint | YES | NULL | MUL |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `amount` | double | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `milestone_status_id` | bigint | YES | NULL | MUL |  |
| `bid_id` | bigint | YES | NULL |  |  |
| `completed_date` | date | YES | NULL |  |  |
| `escrow_amount_requested_date` | date | YES | NULL |  |  |
| `escrow_amount_released_date` | date | YES | NULL |  |  |
| `escrow_amount_paid_date` | date | YES | NULL |  |  |
| `site_commission_from_employer` | double | NO | 0 |  |  |
| `site_commission_from_freelancer` | double | NO | 0 |  |  |
| `payment_gateway_id` | bigint | YES | NULL |  |  |
| `paypal_pay_key` | varchar(255) | YES | NULL |  |  |
| `deadline_date` | date | YES | NULL |  |  |
| `zazpay_gateway_id` | bigint | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_milestones_milestone_status_id | milestone_status_id | NO | BTREE |
| fk_milestones_project_id | project_id | NO | BTREE |
| fk_milestones_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## money_transfer_accounts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `account` | text | NO | NULL |  |  |
| `is_active` | tinyint(1) | NO | 1 |  |  |
| `is_primary` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_money_transfer_accounts_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## oauth_access_tokens

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `access_token` | varchar(40) | NO | NULL |  |  |
| `client_id` | varchar(80) | YES | NULL |  |  |
| `user_id` | varchar(255) | YES | NULL |  |  |
| `expires` | timestamp | YES | NULL |  |  |
| `scope` | text | YES | NULL |  |  |

---

## oauth_authorization_codes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `authorization_code` | varchar(40) | NO | NULL |  |  |
| `client_id` | varchar(80) | YES | NULL |  |  |
| `user_id` | varchar(255) | YES | NULL |  |  |
| `redirect_uri` | varchar(2000) | YES | NULL |  |  |
| `expires` | timestamp | YES | NULL |  |  |
| `scope` | varchar(2000) | YES | NULL |  |  |

---

## oauth_clients

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | varchar(80) | NO | NULL |  |  |
| `client_name` | varchar(255) | NO | NULL |  |  |
| `client_id` | varchar(80) | NO | NULL |  |  |
| `client_secret` | varchar(80) | NO | NULL |  |  |
| `redirect_uri` | varchar(2000) | YES | NULL |  |  |
| `grant_types` | varchar(80) | NO | NULL |  |  |
| `scope` | varchar(100) | YES | NULL |  |  |
| `client_url` | varchar(255) | YES | NULL |  |  |
| `logo_url` | varchar(255) | YES | NULL |  |  |
| `tos_url` | varchar(255) | YES | NULL |  |  |
| `policy_url` | varchar(2000) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## oauth_jwt

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `client_id` | varchar(80) | NO | NULL |  |  |
| `subject` | varchar(80) | YES | NULL |  |  |
| `public_key` | varchar(2000) | YES | NULL |  |  |

---

## oauth_refresh_tokens

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `refresh_token` | varchar(40) | NO | NULL |  |  |
| `client_id` | varchar(80) | YES | NULL |  |  |
| `user_id` | varchar(255) | YES | NULL |  |  |
| `expires` | timestamp | YES | NULL |  |  |
| `scope` | text | YES | NULL |  |  |

---

## oauth_scopes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `scope` | text | NO | NULL |  |  |
| `is_default` | tinyint(1) | YES | NULL |  |  |

---

## pages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `parent_id` | bigint | YES | NULL |  |  |
| `title` | varchar(510) | NO | NULL |  |  |
| `title_es` | varchar(510) | YES | NULL |  |  |
| `content` | text | YES | NULL |  |  |
| `content_es` | text | YES | NULL |  |  |
| `template` | varchar(510) | YES | NULL |  |  |
| `draft` | tinyint(1) | YES | NULL |  |  |
| `lft` | bigint | YES | NULL |  |  |
| `rght` | bigint | YES | NULL |  |  |
| `level` | int | NO | 0 |  |  |
| `meta_keywords` | varchar(510) | YES | NULL |  |  |
| `description_meta_tag` | text | YES | NULL |  |  |
| `url` | text | YES | NULL |  |  |
| `slug` | varchar(510) | NO | NULL |  |  |
| `is_default` | tinyint(1) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## payment_gateway_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `payment_gateway_id` | bigint | NO | NULL | MUL |  |
| `name` | varchar(512) | NO | NULL |  |  |
| `type` | varchar(512) | NO | NULL |  |  |
| `options` | text | NO | NULL |  |  |
| `test_mode_value` | text | YES | NULL |  |  |
| `live_mode_value` | text | YES | NULL |  |  |
| `label` | varchar(1024) | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| payment_gateway_id | payment_gateway_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## payment_gateways

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `slug` | varchar(510) | YES | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `is_test_mode` | tinyint(1) | NO | NULL |  |  |
| `is_active` | tinyint(1) | NO | NULL |  |  |
| `display_name` | varchar(510) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## portfolios

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `description` | text | NO | NULL |  |  |
| `message_count` | smallint | YES | 0 |  |  |
| `follower_count` | smallint | YES | 0 |  |  |
| `view_count` | bigint | NO | 0 |  |  |
| `flag_count` | bigint | NO | 0 |  |  |
| `title` | varchar(255) | NO | NULL |  |  |
| `is_admin_suspend` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_portfolios_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## pricing_days

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `no_of_days` | int | YES | NULL |  |  |
| `global_price` | double | YES | 0 |  |  |
| `is_active` | tinyint(1) | YES | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## pricing_packages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `name` | varchar(100) | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `global_price` | double | YES | 0 |  |  |
| `participant_commision` | double | YES | 0 |  |  |
| `maximum_entry_allowed` | int | YES | NULL |  |  |
| `features` | text | YES | NULL |  |  |
| `is_active` | tinyint(1) | YES | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## privacy_analytics_events

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `session_id` | varchar(255) | NO | NULL | MUL |  |
| `user_id` | int | YES | NULL | MUL |  |
| `event_type` | enum('page_view','interaction','conversion','custom') | NO | NULL | MUL |  |
| `event_data` | json | YES | NULL |  |  |
| `page_url` | varchar(500) | YES | NULL |  |  |
| `page_title` | varchar(200) | YES | NULL |  |  |
| `referrer` | varchar(500) | YES | NULL |  |  |
| `user_agent_hash` | varchar(64) | YES | NULL |  |  |
| `ip_address_hash` | varchar(64) | YES | NULL |  |  |
| `created_at` | timestamp | YES | CURRENT_TIMESTAMP | MUL | DEFAULT_GENERATED |
| `anonymized_at` | timestamp | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_anonymized_at | anonymized_at | NO | BTREE |
| idx_created_at | created_at | NO | BTREE |
| idx_event_type | event_type | NO | BTREE |
| idx_session_id | session_id | NO | BTREE |
| idx_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## privacy_audit_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `session_id` | varchar(255) | YES | NULL | MUL |  |
| `user_id` | int | YES | NULL | MUL |  |
| `action_type` | enum('consent_given','consent_updated','consent_withdrawn','data_exported','data_deleted','data_anonymized') | NO | NULL | MUL |  |
| `action_details` | json | YES | NULL |  |  |
| `ip_address` | varchar(45) | YES | NULL |  |  |
| `user_agent` | text | YES | NULL |  |  |
| `timestamp` | timestamp | YES | CURRENT_TIMESTAMP | MUL | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_action_type | action_type | NO | BTREE |
| idx_session_id | session_id | NO | BTREE |
| idx_timestamp | timestamp | NO | BTREE |
| idx_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## privacy_compliance_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `compliance_type` | enum('gdpr','ccpa','data_cleanup','consent_refresh') | NO | NULL | MUL |  |
| `compliance_action` | varchar(100) | NO | NULL |  |  |
| `affected_records` | int | YES | 0 |  |  |
| `execution_details` | json | YES | NULL |  |  |
| `executed_at` | timestamp | YES | CURRENT_TIMESTAMP | MUL | DEFAULT_GENERATED |
| `execution_status` | enum('success','partial','failed') | YES | success | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_compliance_type | compliance_type | NO | BTREE |
| idx_executed_at | executed_at | NO | BTREE |
| idx_execution_status | execution_status | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## privacy_cookie_preferences

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `session_id` | varchar(255) | NO | NULL | MUL |  |
| `user_id` | int | YES | NULL | MUL |  |
| `cookie_category` | enum('functional','analytics','marketing','preferences') | NO | NULL | MUL |  |
| `is_enabled` | tinyint(1) | YES | 0 |  |  |
| `preference_details` | json | YES | NULL |  |  |
| `created_at` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_cookie_category | cookie_category | NO | BTREE |
| idx_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| unique_session_category | session_id | YES | BTREE |
| unique_session_category | cookie_category | YES | BTREE |

---

## privacy_data_requests

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `session_id` | varchar(255) | YES | NULL | MUL |  |
| `user_id` | int | YES | NULL | MUL |  |
| `request_type` | enum('export','delete','rectify','restrict','object') | NO | NULL | MUL |  |
| `request_status` | enum('pending','processing','completed','failed') | YES | pending | MUL |  |
| `contact_email` | varchar(255) | YES | NULL |  |  |
| `request_details` | json | YES | NULL |  |  |
| `submitted_at` | timestamp | YES | CURRENT_TIMESTAMP | MUL | DEFAULT_GENERATED |
| `processed_at` | timestamp | YES | NULL |  |  |
| `expires_at` | timestamp | YES | NULL |  |  |
| `contact_reference` | varchar(50) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_request_status | request_status | NO | BTREE |
| idx_request_type | request_type | NO | BTREE |
| idx_session_id | session_id | NO | BTREE |
| idx_submitted_at | submitted_at | NO | BTREE |
| idx_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## privacy_retention_policy

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `data_type` | enum('consent','analytics','journey','audit','requests') | NO | NULL | UNI |  |
| `retention_days` | int | NO | 365 |  |  |
| `anonymization_days` | int | NO | 90 |  |  |
| `auto_cleanup` | tinyint(1) | YES | 1 |  |  |
| `policy_details` | json | YES | NULL |  |  |
| `created_at` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| unique_data_type | data_type | YES | BTREE |

---

## privacy_user_journey

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `session_id` | varchar(255) | NO | NULL | MUL |  |
| `user_id` | int | YES | NULL | MUL |  |
| `journey_step` | varchar(100) | NO | NULL | MUL |  |
| `step_data` | json | YES | NULL |  |  |
| `timestamp` | timestamp | YES | CURRENT_TIMESTAMP | MUL | DEFAULT_GENERATED |
| `duration_seconds` | int | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_journey_step | journey_step | NO | BTREE |
| idx_session_id | session_id | NO | BTREE |
| idx_timestamp | timestamp | NO | BTREE |
| idx_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## project_bid_invoice_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `project_bid_invoice_id` | bigint | NO | NULL | MUL |  |
| `description` | text | NO | NULL |  |  |
| `amount` | double | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_bid_invoice_id | project_bid_invoice_id | NO | BTREE |

---

## project_bid_invoices

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `project_id` | bigint | YES | NULL | MUL |  |
| `bid_id` | bigint | YES | NULL | MUL |  |
| `amount` | double | NO | NULL |  |  |
| `site_fee` | double | NO | 0 |  |  |
| `paid_on` | timestamp | YES | NULL |  |  |
| `pay_key` | varchar(255) | YES | NULL |  |  |
| `zazpay_pay_key` | varchar(255) | YES | NULL |  |  |
| `zazpay_payment_id` | bigint | YES | NULL |  |  |
| `zazpay_gateway_id` | bigint | YES | NULL |  |  |
| `zazpay_revised_amount` | double | YES | NULL |  |  |
| `site_commission_from_employer` | double | YES | NULL |  |  |
| `site_commission_from_freelancer` | double | YES | NULL |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `is_paid` | tinyint(1) | NO | 0 |  |  |
| `payment_gateway_id` | bigint | YES | NULL |  |  |
| `paypal_pay_key` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_project_bid_invoices_bid_id | bid_id | NO | BTREE |
| fk_project_bid_invoices_project_id | project_id | NO | BTREE |
| fk_project_bid_invoices_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## project_bids

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `project_id` | bigint | YES | NULL | MUL |  |
| `amount` | double | NO | NULL |  |  |
| `duration` | bigint | YES | NULL |  |  |
| `total_bid_amount` | double | YES | NULL |  |  |
| `closed_date` | timestamp | YES | NULL |  |  |
| `is_closed` | tinyint(1) | NO | 0 |  |  |
| `is_active` | tinyint(1) | NO | 1 |  |  |
| `bidding_start_date` | timestamp | YES | NULL |  |  |
| `bidding_end_date` | timestamp | YES | NULL |  |  |
| `site_commission_from_employer` | double | NO | 0 |  |  |
| `site_commission_from_freelancer` | double | NO | 0 |  |  |
| `total_paid_amount` | double | NO | 0 |  |  |
| `lowest_bid_amount` | double | NO | 0 |  |  |
| `bid_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_project_bids_project_id | project_id | NO | BTREE |
| fk_project_bids_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## project_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `project_count` | bigint | YES | NULL |  |  |
| `is_active` | tinyint(1) | NO | NULL |  |  |
| `active_project_count` | bigint | NO | 0 |  |  |
| `icon_class` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## project_disputes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `project_id` | bigint | YES | NULL | MUL |  |
| `dispute_open_type_id` | bigint | YES | NULL |  |  |
| `reason` | text | YES | NULL |  |  |
| `dispute_status_id` | bigint | YES | NULL |  |  |
| `resolved_date` | timestamp | YES | NULL |  |  |
| `favour_role_id` | bigint | YES | NULL |  |  |
| `last_replied_user_id` | bigint | YES | NULL |  |  |
| `last_replied_date` | timestamp | YES | NULL |  |  |
| `dispute_closed_type_id` | bigint | YES | NULL |  |  |
| `message_count` | bigint | YES | NULL |  |  |
| `expected_rating` | double | YES | NULL |  |  |
| `bid_id` | bigint | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_project_disputes_project_id | project_id | NO | BTREE |
| fk_project_disputes_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## project_ranges

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(40) | NO | NULL |  |  |
| `min_amount` | double | NO | NULL |  |  |
| `max_amount` | double | NO | NULL |  |  |
| `is_active` | tinyint(1) | NO | NULL |  |  |
| `project_count` | bigint | NO | 0 |  |  |
| `active_project_count` | bigint | NO | 0 |  |  |
| `user_id` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## project_statuses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `project_count` | bigint | NO | NULL |  |  |
| `is_active` | tinyint(1) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## projects

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `screening_job_description_id` | bigint | YES | 0 |  |  |
| `screening_project_id` | bigint | YES | 0 |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `user_id` | bigint | YES | NULL | MUL |  |
| `project_status_id` | bigint | NO | NULL | MUL |  |
| `project_range_id` | bigint | NO | NULL | MUL |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `slug` | varchar(510) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `seo_title` | varchar(510) | YES | NULL |  |  |
| `seo_description` | text | YES | NULL |  |  |
| `employment_type` | varchar(64) | YES | NULL |  |  |
| `work_mode` | varchar(64) | YES | NULL |  |  |
| `hiring_org` | varchar(256) | YES | NULL |  |  |
| `years_of_exp` | int | YES | 0 |  |  |
| `job_location` | varchar(256) | YES | NULL |  |  |
| `total_listing_fee` | double | NO | NULL |  |  |
| `cancelled_date` | timestamp | YES | NULL |  |  |
| `ip_id` | bigint | YES | NULL |  |  |
| `freelancer_user_id` | bigint | YES | NULL |  |  |
| `bid_duration` | bigint | NO | 0 |  |  |
| `is_featured` | tinyint(1) | NO | 0 |  |  |
| `is_private` | tinyint(1) | NO | 0 |  |  |
| `is_hidded_bid` | tinyint(1) | NO | 0 |  |  |
| `is_pre_paid` | tinyint(1) | NO | 0 |  |  |
| `is_urgent` | tinyint(1) | NO | 0 |  |  |
| `is_active` | tinyint(1) | NO | 1 |  |  |
| `is_dispute` | tinyint(1) | NO | 0 |  |  |
| `is_cancel_request_freelancer` | tinyint(1) | NO | 0 |  |  |
| `is_cancel_request_employer` | tinyint(1) | NO | 0 |  |  |
| `funded_date` | timestamp | YES | NULL |  |  |
| `last_reopened_date` | timestamp | YES | NULL |  |  |
| `payment_completed_date` | timestamp | YES | NULL |  |  |
| `listing_fee` | double | NO | 0 |  |  |
| `is_paid` | tinyint(1) | NO | 0 |  |  |
| `is_reopened` | tinyint(1) | NO | 0 |  |  |
| `zazpay_gateway_id` | bigint | YES | NULL |  |  |
| `zazpay_payment_id` | bigint | YES | NULL |  |  |
| `zazpay_pay_key` | varchar(255) | YES | NULL |  |  |
| `zazpay_revised_amount` | double | YES | NULL |  |  |
| `is_notification_sent` | tinyint(1) | NO | 0 |  |  |
| `project_type_id` | bigint | NO | 1 |  |  |
| `site_commission_from_employer` | double | NO | 0 |  |  |
| `site_commission_from_freelancer` | double | NO | 0 |  |  |
| `total_paid_amount` | double | NO | 0 |  |  |
| `additional_descriptions` | text | YES | NULL |  |  |
| `mutual_cancel_note` | text | YES | NULL |  |  |
| `project_rating_count` | bigint | NO | 0 |  |  |
| `flag_count` | bigint | NO | 0 |  |  |
| `message_count` | bigint | NO | 0 |  |  |
| `follower_count` | bigint | NO | 0 |  |  |
| `total_ratings` | bigint | NO | 0 |  |  |
| `milestone_count` | bigint | NO | 0 |  |  |
| `view_count` | bigint | NO | 0 |  |  |
| `project_bid_invoice_count` | bigint | NO | 0 |  |  |
| `payment_gateway_id` | bigint | YES | NULL |  |  |
| `paypal_pay_key` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_projects_project_range_id | project_range_id | NO | BTREE |
| fk_projects_project_status_id | project_status_id | NO | BTREE |
| fk_projects_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## projects_project_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `project_category_id` | bigint | NO | NULL | MUL |  |
| `project_id` | bigint | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_projects_project_categories_project_category_id | project_category_id | NO | BTREE |
| fk_projects_project_categories_project_id | project_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## provider_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `provider_id` | bigint | NO | NULL | MUL |  |
| `foreign_id` | varchar(255) | YES | NULL |  |  |
| `access_token` | varchar(255) | NO | NULL |  |  |
| `access_token_secret` | varchar(255) | YES | NULL |  |  |
| `is_connected` | tinyint(1) | NO | 1 |  |  |
| `profile_picture_url` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_provider_users_provider_id | provider_id | NO | BTREE |
| fk_provider_users_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## providers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(255) | YES | NULL |  |  |
| `slug` | varchar(265) | NO | NULL |  |  |
| `secret_key` | varchar(255) | YES | NULL |  |  |
| `api_key` | varchar(255) | YES | NULL |  |  |
| `icon_class` | varchar(255) | YES | NULL |  |  |
| `button_class` | varchar(255) | YES | NULL |  |  |
| `is_active` | tinyint(1) | NO | 1 |  |  |
| `position` | bigint | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## publications

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `title` | varchar(510) | NO | NULL |  |  |
| `publisher` | varchar(510) | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_publications_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## question_answer_options

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `question_id` | bigint | NO | NULL | MUL |  |
| `option_text` | text | NO | NULL |  |  |
| `is_correct_answer` | tinyint(1) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_question_answer_options_question_id | question_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## question_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(500) | YES | NULL |  |  |
| `question_count` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## question_display_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(510) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## questions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `question_category_id` | bigint | NO | NULL | MUL |  |
| `question` | text | NO | NULL |  |  |
| `info_tip` | varchar(510) | YES | NULL |  |  |
| `is_active` | tinyint(1) | YES | NULL |  |  |
| `exams_question_count` | bigint | YES | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_questions_question_category_id | question_category_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## quote_bids

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `quote_request_id` | bigint | NO | NULL | MUL |  |
| `quote_service_id` | bigint | YES | NULL | MUL |  |
| `quote_status_id` | bigint | NO | 1 | MUL |  |
| `is_direct_send` | tinyint(1) | NO | 0 |  |  |
| `quote_amount` | double | YES | NULL |  |  |
| `quote_type` | varchar(100) | YES | NULL |  |  |
| `price_note` | text | YES | NULL |  |  |
| `quote_last_update_on` | timestamp | YES | NULL |  |  |
| `hired_on` | timestamp | YES | NULL |  |  |
| `completed_on` | timestamp | YES | NULL |  |  |
| `requestor_received_message_count` | bigint | NO | 0 |  |  |
| `provider_received_message_count` | bigint | NO | 0 |  |  |
| `requestor_unread_message_count` | bigint | NO | 0 |  |  |
| `provider_unread_message_count` | bigint | NO | 0 |  |  |
| `is_provider_readed` | tinyint(1) | NO | 0 |  |  |
| `is_requestor_readed` | tinyint(1) | NO | 0 |  |  |
| `used_credit_count` | int | NO | 0 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `service_provider_user_id` | bigint | YES | NULL | MUL |  |
| `escrow_amount` | double | NO | 0 |  |  |
| `site_commission` | double | NO | 0 |  |  |
| `is_paid_to_escrow` | tinyint(1) | NO | 0 |  |  |
| `is_escrow_amount_released` | tinyint(1) | NO | 0 |  |  |
| `coupon_id` | bigint | NO | 0 |  |  |
| `last_new_quote_remainder_notify_date_to_freelancer` | timestamp | YES | NULL |  |  |
| `credit_purchase_log_id` | bigint | YES | NULL | MUL |  |
| `private_note_of_incomplete` | text | YES | NULL |  |  |
| `is_first_level_quote_request` | tinyint(1) | NO | 1 |  |  |
| `is_show_bid_to_requestor` | tinyint(1) | NO | 1 |  |  |
| `closed_on` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_quote_bids_credit_purchase_log_id | credit_purchase_log_id | NO | BTREE |
| fk_quote_bids_quote_request_id | quote_request_id | NO | BTREE |
| fk_quote_bids_quote_service_id | quote_service_id | NO | BTREE |
| fk_quote_bids_quote_status_id | quote_status_id | NO | BTREE |
| fk_quote_bids_service_provider_user_id | service_provider_user_id | NO | BTREE |
| fk_quote_bids_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## quote_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `parent_category_id` | bigint | YES | NULL | MUL |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `slug` | varchar(510) | NO | NULL |  |  |
| `form_field_count` | bigint | NO | 0 |  |  |
| `quote_request_count` | bigint | NO | 0 |  |  |
| `is_active` | tinyint(1) | NO | 1 |  |  |
| `credit_point_for_sending_quote` | bigint | NO | 0 |  |  |
| `description` | text | YES | NULL |  |  |
| `is_featured` | tinyint(1) | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_quote_categories_parent_category_id | parent_category_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## quote_categories_quote_services

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `quote_category_id` | bigint | NO | NULL | MUL |  |
| `quote_service_id` | bigint | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_quote_categories_quote_services_quote_category_id | quote_category_id | NO | BTREE |
| fk_quote_categories_quote_services_quote_service_id | quote_service_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## quote_faq_answers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `quote_service_id` | bigint | NO | NULL | MUL |  |
| `quote_faq_question_template_id` | bigint | YES | NULL | MUL |  |
| `quote_user_faq_question_id` | bigint | YES | NULL | MUL |  |
| `answer` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_quote_faq_answers_quote_faq_question_template_id | quote_faq_question_template_id | NO | BTREE |
| fk_quote_faq_answers_quote_service_id | quote_service_id | NO | BTREE |
| fk_quote_faq_answers_quote_user_faq_question_id | quote_user_faq_question_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## quote_faq_question_templates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `question` | text | NO | NULL |  |  |
| `is_active` | tinyint(1) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## quote_request_form_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `quote_form_field_id` | bigint | NO | NULL | MUL |  |
| `quote_request_id` | bigint | NO | NULL | MUL |  |
| `response` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_quote_request_form_fields_quote_form_field_id | quote_form_field_id | NO | BTREE |
| fk_quote_request_form_fields_quote_request_id | quote_request_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## quote_requests

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `quote_category_id` | bigint | YES | NULL | MUL |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `quote_service_id` | bigint | YES | NULL | MUL |  |
| `title` | varchar(510) | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `best_day_time_for_work` | varchar(510) | NO | NULL |  |  |
| `full_address` | varchar(510) | YES | NULL |  |  |
| `address` | varchar(510) | YES | NULL |  |  |
| `city_id` | bigint | YES | NULL | MUL |  |
| `state_id` | bigint | YES | NULL | MUL |  |
| `country_id` | bigint | YES | NULL | MUL |  |
| `zip_code` | varchar(510) | YES | NULL |  |  |
| `latitude` | double | YES | NULL |  |  |
| `longitude` | double | YES | NULL |  |  |
| `phone_no` | varchar(100) | YES | NULL |  |  |
| `quote_bid_count` | int | NO | 0 |  |  |
| `is_archived` | tinyint(1) | NO | 0 |  |  |
| `is_send_request_to_other_service_providers` | tinyint(1) | NO | 0 |  |  |
| `quote_bid_new_count` | bigint | NO | 0 |  |  |
| `quote_bid_discussion_count` | bigint | NO | 0 |  |  |
| `quote_bid_hired_count` | bigint | NO | 0 |  |  |
| `quote_bid_completed_count` | bigint | NO | 0 |  |  |
| `is_request_for_buy` | tinyint(1) | NO | 0 |  |  |
| `last_new_quote_remainder_notify_date` | timestamp | YES | NULL |  |  |
| `is_quote_bid_sent` | tinyint(1) | NO | 0 |  |  |
| `radius` | varchar(50) | YES | NULL |  |  |
| `is_first_level_quote_request_sent` | tinyint(1) | NO | 0 |  |  |
| `is_updated_bid_visibility_to_requestor` | tinyint(1) | NO | 1 |  |  |
| `quote_bid_pending_discussion_count` | bigint | NO | 0 |  |  |
| `quote_bid_closed_count` | bigint | NO | 0 |  |  |
| `quote_bid_not_completed_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_quote_requests_city_id | city_id | NO | BTREE |
| fk_quote_requests_country_id | country_id | NO | BTREE |
| fk_quote_requests_quote_category_id | quote_category_id | NO | BTREE |
| fk_quote_requests_quote_service_id | quote_service_id | NO | BTREE |
| fk_quote_requests_state_id | state_id | NO | BTREE |
| fk_quote_requests_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## quote_service_audios

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `quote_service_id` | bigint | NO | NULL | MUL |  |
| `embed_code` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_quote_service_audios_quote_service_id | quote_service_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## quote_service_photos

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `quote_service_id` | bigint | NO | NULL | MUL |  |
| `caption` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_quote_service_photos_quote_service_id | quote_service_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## quote_service_videos

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `quote_service_id` | bigint | NO | NULL | MUL |  |
| `embed_code` | text | NO | NULL |  |  |
| `video_url` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_quote_service_videos_quote_service_id | quote_service_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## quote_services

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `business_name` | varchar(510) | NO | NULL |  |  |
| `slug` | varchar(510) | NO | NULL |  |  |
| `how_does_your_service_stand_out` | text | NO | NULL |  |  |
| `full_address` | varchar(510) | NO | NULL |  |  |
| `address` | varchar(200) | NO | NULL |  |  |
| `city_id` | bigint | NO | NULL | MUL |  |
| `state_id` | bigint | NO | NULL | MUL |  |
| `country_id` | bigint | NO | NULL | MUL |  |
| `zip_code` | varchar(510) | YES | NULL |  |  |
| `latitude` | double | NO | NULL |  |  |
| `longitude` | double | NO | NULL |  |  |
| `website_url` | varchar(200) | YES | NULL |  |  |
| `phone_number` | varchar(40) | NO | NULL |  |  |
| `is_service_provider_travel_to_customer_place` | tinyint(1) | NO | NULL |  |  |
| `service_provider_travels_upto` | int | YES | NULL |  |  |
| `is_customer_travel_to_me` | tinyint(1) | NO | NULL |  |  |
| `is_over_phone_or_internet` | tinyint(1) | NO | NULL |  |  |
| `is_active` | tinyint(1) | NO | NULL |  |  |
| `quote_service_photo_count` | bigint | NO | 0 |  |  |
| `quote_service_audio_count` | bigint | NO | 0 |  |  |
| `quote_service_video_count` | bigint | NO | 0 |  |  |
| `quote_faq_answer_count` | int | YES | 0 |  |  |
| `quote_bid_count` | bigint | NO | 0 |  |  |
| `quote_service_flag_count` | bigint | NO | 0 |  |  |
| `under_discussion_count` | bigint | NO | 0 |  |  |
| `hired_count` | bigint | NO | 0 |  |  |
| `completed_count` | bigint | NO | 0 |  |  |
| `year_founded` | bigint | YES | NULL |  |  |
| `number_of_employees` | bigint | YES | NULL |  |  |
| `what_do_you_enjoy_about_the_work_you_do` | text | NO | NULL |  |  |
| `view_count` | bigint | NO | 0 |  |  |
| `flag_count` | bigint | NO | 0 |  |  |
| `total_rating` | int | NO | 0 |  |  |
| `review_count` | bigint | NO | 0 |  |  |
| `quote_bid_new_count` | bigint | NO | 0 |  |  |
| `quote_bid_discussion_count` | bigint | NO | 0 |  |  |
| `quote_bid_hired_count` | bigint | NO | 0 |  |  |
| `quote_bid_completed_count` | bigint | NO | 0 |  |  |
| `is_admin_suspend` | tinyint(1) | NO | 0 |  |  |
| `quote_bid_not_completed_count` | bigint | NO | 0 |  |  |
| `quote_bid_closed_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_quote_services_city_id | city_id | NO | BTREE |
| fk_quote_services_country_id | country_id | NO | BTREE |
| fk_quote_services_state_id | state_id | NO | BTREE |
| fk_quote_services_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## quote_statuses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(510) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## quote_user_faq_questions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `question` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_quote_user_faq_questions_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## resources

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `name` | varchar(255) | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `folder_name` | varchar(255) | YES | NULL |  |  |
| `contest_count` | bigint | YES | NULL |  |  |
| `contest_user_count` | bigint | YES | NULL |  |  |
| `revenue` | double | YES | NULL |  |  |
| `class_name` | varchar(512) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## resume_downloads

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `job_apply_id` | bigint | YES | NULL | MUL |  |
| `ip_id` | bigint | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_resume_downloads_ip_id | ip_id | NO | BTREE |
| fk_resume_downloads_job_apply_id | job_apply_id | NO | BTREE |
| fk_resume_downloads_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## resume_extractions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `user_id` | bigint | NO | NULL |  |  |
| `attachment_id` | bigint | NO | NULL |  |  |
| `user_profile_url` | text | NO | NULL |  |  |
| `old_profile_score` | int | NO | NULL |  |  |
| `new_profile_score` | int | NO | NULL |  |  |
| `extraction_attempt1` | tinyint(1) | NO | 0 |  |  |
| `extraction_attempt2` | tinyint(1) | NO | 0 |  |  |
| `extraction_attempt3` | tinyint(1) | NO | 0 |  |  |
| `extraction_time` | datetime | YES | NULL |  |  |
| `is_resume_extracted` | tinyint(1) | NO | 0 |  |  |
| `is_apply_job_resume_uploaded` | tinyint(1) | NO | 0 |  |  |
| `is_historical_resume` | tinyint(1) | NO | 0 |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## resume_ratings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `job_id` | bigint | NO | NULL | MUL |  |
| `job_apply_id` | bigint | NO | NULL | MUL |  |
| `rating` | int | NO | 0 |  |  |
| `comment` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_resume_ratings_job_apply_id | job_apply_id | NO | BTREE |
| fk_resume_ratings_job_id | job_id | NO | BTREE |
| fk_resume_ratings_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## reviews

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `to_user_id` | bigint | YES | NULL |  |  |
| `foreign_id` | bigint | NO | NULL |  |  |
| `class` | varchar(255) | NO | NULL |  |  |
| `rating` | int | NO | 0 |  |  |
| `message` | text | YES | NULL |  |  |
| `ip_id` | bigint | NO | 0 | MUL |  |
| `is_freelancer` | tinyint(1) | YES | 1 |  |  |
| `model_id` | bigint | YES | NULL |  |  |
| `model_class` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_reviews_ip_id | ip_id | NO | BTREE |
| fk_reviews_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## roles

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(50) | NO | NULL |  |  |
| `is_active` | tinyint(1) | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## salary_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `is_active` | tinyint(1) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## screening_candidates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `project_id` | bigint | NO | NULL |  |  |
| `bid_id` | bigint | NO | NULL |  |  |
| `user_id` | bigint | NO | NULL |  |  |
| `name` | varchar(256) | NO | NULL |  |  |
| `email` | varchar(256) | YES | NULL |  |  |
| `phone` | varchar(64) | YES | NULL |  |  |
| `title` | varchar(256) | YES | NULL |  |  |
| `resume_filename` | text | NO | NULL |  |  |
| `resume_content` | longtext | NO | NULL |  |  |
| `extracted_skills` | longtext | NO | NULL |  |  |
| `overall_score` | int | NO | NULL |  |  |
| `verdict` | varchar(256) | NO | NULL |  |  |
| `flags` | longtext | NO | NULL |  |  |
| `analysis_notes` | longtext | NO | NULL |  |  |
| `years_of_experience` | int | YES | NULL |  |  |
| `location` | varchar(256) | YES | NULL |  |  |
| `linkedin_url` | varchar(256) | YES | NULL |  |  |
| `salary_range` | varchar(256) | YES | NULL |  |  |
| `work_mode` | varchar(128) | YES | NULL |  |  |
| `visa_status` | varchar(128) | YES | NULL |  |  |
| `notice_period` | varchar(128) | YES | NULL |  |  |
| `ready_to_relocate` | tinyint(1) | YES | NULL |  |  |
| `additional_details_complete` | tinyint(1) | NO | 0 |  |  |
| `recruiter_notes` | text | YES | NULL |  |  |
| `parsing_confidence` | longtext | YES | NULL |  |  |
| `ml_parsed_data` | longtext | YES | NULL |  |  |
| `created_at` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## screening_projects

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `project_id` | bigint | NO | NULL |  |  |
| `name` | text | NO | NULL |  |  |
| `status` | varchar(256) | NO | setup |  |  |
| `total_candidates` | int | YES | 0 |  |  |
| `processed_candidates` | int | YES | 0 |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## seo_generated_pages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `page_url` | varchar(255) | NO | NULL | UNI |  |
| `template_id` | int | YES | NULL | MUL |  |
| `generated_title` | varchar(255) | YES | NULL |  |  |
| `generated_description` | text | YES | NULL |  |  |
| `generated_keywords` | text | YES | NULL |  |  |
| `generated_schema` | json | YES | NULL |  |  |
| `last_generated` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| page_url | page_url | YES | BTREE |
| PRIMARY | id | YES | BTREE |
| template_id | template_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| seo_generated_pages_ibfk_1 | template_id | seo_templates.id |

---

## seo_static_pages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `page_url` | varchar(255) | NO | NULL | UNI |  |
| `page_name` | varchar(100) | NO | NULL |  |  |
| `title` | varchar(255) | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `keywords` | text | YES | NULL |  |  |
| `og_title` | varchar(255) | YES | NULL |  |  |
| `og_description` | text | YES | NULL |  |  |
| `og_image` | varchar(500) | YES | NULL |  |  |
| `twitter_title` | varchar(255) | YES | NULL |  |  |
| `twitter_description` | text | YES | NULL |  |  |
| `twitter_image` | varchar(500) | YES | NULL |  |  |
| `is_indexable` | tinyint(1) | YES | 1 |  |  |
| `robots_directive` | varchar(100) | YES | index,follow |  |  |
| `custom_schema` | json | YES | NULL |  |  |
| `created_at` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| page_url | page_url | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## seo_templates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `template_name` | varchar(100) | NO | NULL |  |  |
| `page_pattern` | varchar(255) | NO | NULL |  |  |
| `title_template` | text | NO | NULL |  |  |
| `description_template` | text | NO | NULL |  |  |
| `keywords_template` | text | YES | NULL |  |  |
| `og_title_template` | text | YES | NULL |  |  |
| `og_description_template` | text | YES | NULL |  |  |
| `schema_template` | json | YES | NULL |  |  |
| `is_indexable` | tinyint(1) | YES | 1 |  |  |
| `robots_directive` | varchar(100) | YES | index,follow |  |  |
| `created_at` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## seo_tracking_configs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `platform_name` | varchar(100) | NO | NULL |  |  |
| `platform_key` | varchar(50) | NO | NULL | UNI |  |
| `tracking_id` | varchar(255) | YES | NULL |  |  |
| `script_type` | enum('analytics','marketing','functional','necessary') | NO | analytics |  |  |
| `is_active` | tinyint(1) | NO | 0 | MUL |  |
| `config_data` | json | YES | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_active_scripts | is_active | NO | BTREE |
| idx_active_scripts | script_type | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| unique_platform_key | platform_key | YES | BTREE |

---

## seo_variables

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `variable_name` | varchar(50) | NO | NULL | UNI |  |
| `variable_description` | text | YES | NULL |  |  |
| `data_source` | varchar(100) | YES | NULL |  |  |
| `source_column` | varchar(50) | YES | NULL |  |  |
| `formatting_rules` | json | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| variable_name | variable_name | YES | BTREE |

---

## session_cookie_consent

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `session_id` | varchar(255) | NO | NULL | MUL |  |
| `user_id` | int | YES | NULL | MUL |  |
| `functional_cookies` | tinyint(1) | YES | 1 |  |  |
| `analytics_cookies` | tinyint(1) | YES | 0 |  |  |
| `marketing_cookies` | tinyint(1) | YES | 0 |  |  |
| `preferences_cookies` | tinyint(1) | YES | 0 |  |  |
| `consent_given_at` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `consent_updated_at` | timestamp | YES | CURRENT_TIMESTAMP | MUL | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `expires_at` | timestamp | YES | NULL | MUL |  |
| `ip_address` | varchar(45) | YES | NULL |  |  |
| `user_agent` | text | YES | NULL |  |  |
| `consent_version` | varchar(10) | YES | 1.0 |  |  |
| `is_active` | tinyint(1) | YES | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_consent_updated | consent_updated_at | NO | BTREE |
| idx_expires_at | expires_at | NO | BTREE |
| idx_session_id | session_id | NO | BTREE |
| idx_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## setting_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `name` | varchar(200) | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `setting_category_id` | bigint | NO | NULL |  |  |
| `name` | varchar(255) | NO | NULL |  |  |
| `value` | text | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `type` | varchar(8) | NO | NULL |  |  |
| `label` | varchar(255) | NO | NULL |  |  |
| `position` | int | NO | NULL |  |  |
| `option_values` | text | YES | NULL |  |  |
| `is_send_to_frontend` | tinyint(1) | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## skill_info

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `skill_id` | int | NO | NULL |  |  |
| `title` | varchar(256) | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `why_hire_dev_label` | varchar(256) | YES | NULL |  |  |
| `why_hire_side_label` | varchar(256) | YES | NULL |  |  |
| `why_hire_label1` | varchar(256) | YES | NULL |  |  |
| `why_hire_description1` | text | YES | NULL |  |  |
| `why_hire_label2` | varchar(256) | YES | NULL |  |  |
| `why_hire_description2` | text | YES | NULL |  |  |
| `why_hire_label3` | varchar(256) | YES | NULL |  |  |
| `why_hire_description3` | text | YES | NULL |  |  |
| `why_hire_label4` | varchar(256) | YES | NULL |  |  |
| `why_hire_description4` | text | YES | NULL |  |  |
| `tech_stack_title` | varchar(256) | YES | NULL |  |  |
| `common_projects_title` | varchar(256) | YES | NULL |  |  |
| `common_project_title1` | varchar(256) | YES | NULL |  |  |
| `common_project_description1` | text | YES | NULL |  |  |
| `common_project_title2` | varchar(256) | YES | NULL |  |  |
| `common_project_description2` | text | YES | NULL |  |  |
| `common_project_title3` | varchar(256) | YES | NULL |  |  |
| `common_project_description3` | text | YES | NULL |  |  |
| `common_project_title4` | varchar(256) | YES | NULL |  |  |
| `common_project_description4` | text | YES | NULL |  |  |
| `seo_title` | varchar(256) | YES | NULL |  |  |
| `seo_description` | text | YES | NULL |  |  |
| `is_active` | tinyint(1) | NO | 1 |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## skill_info_faqs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `skill_info_id` | bigint | NO | NULL |  |  |
| `question` | text | NO | NULL |  |  |
| `answer` | text | NO | NULL |  |  |
| `is_active` | tinyint(1) | NO | 1 |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## skill_info_tech_stack

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `skill_info_id` | bigint | NO | NULL |  |  |
| `skill_id` | int | NO | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## skills

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `name` | varchar(510) | NO | NULL |  |  |
| `slug` | varchar(510) | NO | NULL |  |  |
| `project_count` | bigint | NO | 0 |  |  |
| `user_count` | bigint | NO | 0 |  |  |
| `open_project_count` | bigint | NO | 0 |  |  |
| `is_active` | tinyint(1) | NO | 1 |  |  |
| `active_job_count` | bigint | NO | 0 |  |  |
| `job_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## skills_portfolios

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `portfolio_id` | bigint | NO | NULL | MUL |  |
| `skill_id` | bigint | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_skills_portfolios_portfolio_id | portfolio_id | NO | BTREE |
| fk_skills_portfolios_skill_id | skill_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## skills_projects

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `project_id` | bigint | NO | NULL | MUL |  |
| `skill_id` | bigint | NO | NULL | MUL |  |
| `weight` | int | YES | 50 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_skills_projects_project_id | project_id | NO | BTREE |
| fk_skills_projects_skill_id | skill_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## skills_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | bigint | YES | NULL | MUL |  |
| `skill_id` | bigint | YES | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_skills_users_skill_id | skill_id | NO | BTREE |
| fk_skills_users_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## states

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `country_id` | bigint | NO | NULL |  |  |
| `name` | varchar(90) | NO | NULL |  |  |
| `code` | varchar(16) | YES | NULL |  |  |
| `adm1code` | char(4) | YES | NULL |  |  |
| `is_active` | tinyint(1) | NO | 1 |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## subscription_features

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `plan_id` | varchar(50) | NO | NULL | MUL |  |
| `feature_name` | varchar(100) | NO | NULL |  |  |
| `feature_limit` | varchar(20) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_plan_id | plan_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| subscription_features_ibfk_1 | plan_id | subscription_plans.id |

---

## subscription_payments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `subscription_id` | bigint | NO | NULL | MUL |  |
| `user_id` | int | NO | NULL | MUL |  |
| `payment_method` | varchar(50) | NO | paypal |  |  |
| `payment_id` | varchar(100) | NO | NULL | MUL |  |
| `transaction_id` | varchar(100) | YES | NULL | MUL |  |
| `amount` | decimal(10,2) | NO | NULL |  |  |
| `currency` | varchar(3) | NO | USD |  |  |
| `status` | enum('pending','completed','failed','refunded','cancelled') | NO | pending | MUL |  |
| `payment_date` | datetime | NO | NULL | MUL |  |
| `response_data` | json | YES | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_payment_date | payment_date | NO | BTREE |
| idx_payment_id | payment_id | NO | BTREE |
| idx_status | status | NO | BTREE |
| idx_subscription_id | subscription_id | NO | BTREE |
| idx_transaction_id | transaction_id | NO | BTREE |
| idx_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| subscription_payments_ibfk_1 | subscription_id | user_subscriptions.id |

---

## subscription_plans

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | varchar(50) | NO | NULL | PRI |  |
| `name` | varchar(100) | NO | NULL |  |  |
| `price` | decimal(10,2) | NO | 0.00 |  |  |
| `currency` | varchar(3) | NO | USD |  |  |
| `billing_cycle` | enum('monthly','yearly') | NO | monthly | MUL |  |
| `is_popular` | tinyint(1) | YES | 0 |  |  |
| `paypal_plan_id` | varchar(100) | YES | NULL |  |  |
| `status` | enum('active','inactive') | NO | active | MUL |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_billing_cycle | billing_cycle | NO | BTREE |
| idx_status | status | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## subscription_usage

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `subscription_id` | bigint | NO | NULL | UNI |  |
| `user_id` | int | NO | NULL | MUL |  |
| `job_posts` | int | NO | 0 |  |  |
| `resume_downloads` | int | NO | 0 |  |  |
| `profile_views` | int | NO | 0 |  |  |
| `screenly_access` | int | NO | 0 |  |  |
| `candidate_screening` | int | NO | 0 |  |  |
| `reset_date` | datetime | NO | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_subscription_id | subscription_id | NO | BTREE |
| idx_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| unique_subscription_usage | subscription_id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| subscription_usage_ibfk_1 | subscription_id | user_subscriptions.id |

---

## subscription_usage_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `subscription_id` | bigint | NO | NULL | MUL |  |
| `user_id` | int | NO | NULL | MUL |  |
| `usage_type` | varchar(50) | NO | NULL | MUL |  |
| `usage_count` | int | NO | 1 |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP | MUL | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_created_at | created_at | NO | BTREE |
| idx_subscription_id | subscription_id | NO | BTREE |
| idx_usage_type | usage_type | NO | BTREE |
| idx_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| subscription_usage_logs_ibfk_1 | subscription_id | user_subscriptions.id |

---

## temp_skills

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI |  |
| `created_at` | timestamp | NO | NULL |  |  |
| `updated_at` | timestamp | NO | NULL |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `slug` | varchar(510) | NO | NULL |  |  |
| `project_count` | bigint | NO | 0 |  |  |
| `user_count` | bigint | NO | 0 |  |  |
| `open_project_count` | bigint | NO | 0 |  |  |
| `is_active` | int | NO | 1 |  |  |
| `active_job_count` | bigint | NO | 0 |  |  |
| `job_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## temp_skills_projects

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL |  |  |
| `project_id` | bigint | NO | NULL |  |  |
| `skill_id` | bigint | NO | NULL |  |  |
| `weight` | int | NO | NULL |  |  |

---

## temp_skills_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI |  |
| `user_id` | bigint | NO | NULL |  |  |
| `skill_id` | bigint | NO | NULL |  |  |
| `created_at` | timestamp | NO | NULL |  |  |
| `updated_at` | timestamp | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## timezones

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `code` | varchar(510) | NO | NULL |  |  |
| `name` | varchar(510) | NO | NULL |  |  |
| `gmt_offset` | varchar(20) | NO | NULL |  |  |
| `dst_offset` | varchar(20) | NO | NULL |  |  |
| `raw_offset` | varchar(20) | NO | NULL |  |  |
| `hasdst` | tinyint(1) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## transactions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `to_user_id` | bigint | YES | NULL | MUL |  |
| `foreign_id` | bigint | NO | NULL |  |  |
| `class` | varchar(255) | NO | NULL |  |  |
| `transaction_type` | varchar(255) | NO | NULL |  |  |
| `payment_gateway_id` | bigint | YES | NULL |  |  |
| `amount` | double | NO | NULL |  |  |
| `site_revenue_from_freelancer` | double | YES | 0 |  |  |
| `coupon_id` | smallint | YES | NULL |  |  |
| `site_revenue_from_employer` | double | NO | 0 |  |  |
| `model_id` | bigint | YES | NULL |  |  |
| `model_class` | varchar(255) | YES | NULL |  |  |
| `zazpay_gateway_id` | bigint | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_transactions_to_user_id | to_user_id | NO | BTREE |
| fk_transactions_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## upload_hosters

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `upload_service_id` | int | YES | NULL | MUL |  |
| `upload_service_type_id` | int | YES | NULL | MUL |  |
| `total_upload_count` | bigint | YES | NULL |  |  |
| `total_upload_error_count` | bigint | YES | NULL |  |  |
| `total_upload_filesize` | bigint | YES | NULL |  |  |
| `is_active` | tinyint(1) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_upload_hosters_upload_service_id | upload_service_id | NO | BTREE |
| fk_upload_hosters_upload_service_type_id | upload_service_type_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## upload_service_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `upload_service_id` | int | YES | NULL | MUL |  |
| `name` | varchar(255) | YES | NULL |  |  |
| `value` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_upload_service_settings_upload_service_id | upload_service_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## upload_service_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `name` | varchar(20) | YES | NULL |  |  |
| `slug` | varchar(20) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## upload_services

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `name` | varchar(20) | YES | NULL |  |  |
| `slug` | varchar(20) | YES | NULL |  |  |
| `total_quota` | bigint | YES | 0 |  |  |
| `total_upload_count` | bigint | YES | NULL |  |  |
| `total_upload_filesize` | bigint | YES | NULL |  |  |
| `total_upload_error_count` | bigint | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## upload_statuses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `name` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## uploads

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `upload_service_type_id` | int | YES | NULL | MUL |  |
| `upload_service_id` | int | YES | NULL | MUL |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `contest_user_id` | bigint | YES | NULL | MUL |  |
| `upload_status_id` | int | YES | NULL | MUL |  |
| `video_url` | varchar(255) | YES | NULL |  |  |
| `vimeo_video_id` | varchar(255) | YES | NULL |  |  |
| `youtube_video_id` | varchar(255) | YES | NULL |  |  |
| `vimeo_thumbnail_url` | varchar(255) | YES | NULL |  |  |
| `youtube_thumbnail_url` | varchar(255) | YES | NULL |  |  |
| `video_title` | varchar(255) | YES | NULL |  |  |
| `filesize` | bigint | YES | NULL |  |  |
| `failure_message` | varchar(255) | YES | NULL |  |  |
| `soundcloud_audio_id` | varchar(255) | YES | NULL |  |  |
| `audio_url` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_uploads_contest_user_id | contest_user_id | NO | BTREE |
| fk_uploads_upload_service_id | upload_service_id | NO | BTREE |
| fk_uploads_upload_service_type_id | upload_service_type_id | NO | BTREE |
| fk_uploads_upload_status_id | upload_status_id | NO | BTREE |
| fk_uploads_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## user_cash_withdrawals

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `withdrawal_status_id` | bigint | NO | 1 |  |  |
| `amount` | double | NO | NULL |  |  |
| `remark` | text | YES | NULL |  |  |
| `money_transfer_account_id` | bigint | NO | NULL | MUL |  |
| `withdrawal_fee` | double | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_user_cash_withdrawals_money_transfer_account_id | money_transfer_account_id | NO | BTREE |
| fk_user_cash_withdrawals_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## user_logins

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `ip_id` | bigint | YES | NULL | MUL |  |
| `user_agent` | varchar(1000) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_user_logins_ip_id | ip_id | NO | BTREE |
| fk_user_logins_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## user_subscriptions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL | MUL |  |
| `plan_id` | varchar(50) | NO | NULL | MUL |  |
| `status` | enum('active','inactive','cancelled','expired','pending') | NO | pending | MUL |  |
| `start_date` | datetime | NO | NULL | MUL |  |
| `end_date` | datetime | NO | NULL |  |  |
| `paypal_subscription_id` | varchar(100) | YES | NULL |  |  |
| `paypal_order_id` | varchar(100) | YES | NULL |  |  |
| `amount_paid` | decimal(10,2) | YES | 0.00 |  |  |
| `currency` | varchar(3) | YES | USD |  |  |
| `billing_cycle` | enum('monthly','yearly') | NO | monthly |  |  |
| `auto_renew` | tinyint(1) | YES | 1 |  |  |
| `cancelled_at` | datetime | YES | NULL |  |  |
| `cancellation_reason` | text | YES | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_dates | start_date | NO | BTREE |
| idx_dates | end_date | NO | BTREE |
| idx_plan_id | plan_id | NO | BTREE |
| idx_status | status | NO | BTREE |
| idx_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| user_subscriptions_ibfk_1 | plan_id | subscription_plans.id |

---

## users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `role_id` | int | NO | 2 |  |  |
| `username` | varchar(510) | NO | NULL |  |  |
| `email` | varchar(510) | NO | NULL |  |  |
| `password` | varchar(200) | NO | NULL |  |  |
| `bid_count` | bigint | NO | 0 |  |  |
| `won_bid_count` | bigint | NO | 0 |  |  |
| `user_login_count` | bigint | NO | 0 |  |  |
| `project_count` | bigint | NO | 0 |  |  |
| `project_flag_count` | bigint | NO | 0 |  |  |
| `job_flag_count` | bigint | NO | 0 |  |  |
| `quote_service_flag_count` | bigint | NO | 0 |  |  |
| `portfolio_flag_count` | bigint | NO | 0 |  |  |
| `available_wallet_amount` | double | YES | 0 |  |  |
| `ip_id` | bigint | YES | NULL | MUL |  |
| `last_login_ip_id` | bigint | YES | NULL | MUL |  |
| `last_logged_in_time` | timestamp | YES | NULL |  |  |
| `is_agree_terms_conditions` | tinyint(1) | NO | 0 |  |  |
| `is_active` | tinyint(1) | NO | 0 |  |  |
| `is_email_confirmed` | tinyint(1) | NO | 0 |  |  |
| `total_amount_withdrawn` | double | NO | 0 |  |  |
| `job_count` | bigint | NO | 0 |  |  |
| `job_apply_count` | bigint | NO | 0 |  |  |
| `portfolio_count` | bigint | NO | 0 |  |  |
| `portfolio_favorite_count` | bigint | NO | 0 |  |  |
| `quote_service_count` | bigint | NO | 0 |  |  |
| `quote_request_count` | bigint | NO | 0 |  |  |
| `quote_bid_count` | bigint | NO | 0 |  |  |
| `exams_user_count` | int | NO | 0 |  |  |
| `exams_user_passed_count` | int | NO | 0 |  |  |
| `zazpay_receiver_account_id` | bigint | YES | NULL |  |  |
| `available_credit_count` | bigint | NO | 0 |  |  |
| `total_credit_bought` | bigint | NO | 0 |  |  |
| `first_name` | varchar(255) | YES | NULL |  |  |
| `last_name` | varchar(255) | YES | NULL |  |  |
| `gender_id` | int | YES | NULL |  |  |
| `quote_credit_purchase_log_count` | bigint | NO | 0 |  |  |
| `contest_count` | bigint | NO | 0 |  |  |
| `contest_user_count` | bigint | NO | 0 |  |  |
| `total_site_revenue_as_employer` | double | NO | 0 |  |  |
| `total_site_revenue_as_freelancer` | double | NO | 0 |  |  |
| `total_earned_amount_as_freelancer` | double | NO | 0 |  |  |
| `view_count` | bigint | NO | 0 |  |  |
| `follower_count` | bigint | NO | 0 |  |  |
| `flag_count` | bigint | NO | 0 |  |  |
| `total_rating_as_employer` | int | NO | 0 |  |  |
| `review_count_as_employer` | bigint | NO | 0 |  |  |
| `total_rating_as_freelancer` | int | NO | 0 |  |  |
| `review_count_as_freelancer` | bigint | NO | 0 |  |  |
| `education_count` | bigint | NO | 0 |  |  |
| `work_profile_count` | bigint | NO | 0 |  |  |
| `certificate_count` | bigint | NO | 0 |  |  |
| `publication_count` | bigint | NO | 0 |  |  |
| `address` | varchar(512) | YES | NULL |  |  |
| `address1` | varchar(512) | YES | NULL |  |  |
| `city_id` | bigint | YES | NULL | MUL |  |
| `state_id` | bigint | YES | NULL | MUL |  |
| `country_id` | bigint | YES | NULL | MUL |  |
| `zip_code` | varchar(512) | YES | NULL |  |  |
| `latitude` | double | YES | NULL |  |  |
| `longitude` | double | YES | NULL |  |  |
| `full_address` | text | YES | NULL |  |  |
| `expired_balance_credit_points` | bigint | NO | 0 |  |  |
| `is_made_deposite` | tinyint(1) | NO | 0 |  |  |
| `hourly_rate` | double | YES | NULL |  |  |
| `total_spend_amount_as_employer` | double | NO | 0 |  |  |
| `project_completed_count` | bigint | NO | 0 |  |  |
| `project_failed_count` | bigint | NO | 0 |  |  |
| `designation` | varchar(512) | YES | NULL |  |  |
| `about_me` | text | YES | NULL |  |  |
| `blocked_amount` | double | YES | 0 |  |  |
| `is_have_unreaded_activity` | tinyint(1) | NO | 0 |  |  |
| `availability` | varchar(64) | YES | NULL |  |  |
| `experience_level` | varchar(64) | YES | NULL |  |  |
| `work_mode` | varchar(64) | YES | NULL |  |  |
| `availability_to_join` | int | YES | NULL |  |  |
| `current_company` | varchar(255) | YES | NULL |  |  |
| `bizoforce_company_id` | bigint | YES | NULL |  |  |
| `bizoforce_company_name` | varchar(512) | YES | NULL |  |  |
| `bizoforce_company_website` | varchar(512) | YES | NULL |  |  |
| `how_soon_join` | varchar(255) | YES | NULL |  |  |
| `linkedin_url` | varchar(512) | YES | NULL |  |  |
| `schedule_day` | varchar(512) | YES | NULL |  |  |
| `schedule_start_time` | varchar(512) | YES | NULL |  |  |
| `schedule_end_time` | varchar(512) | YES | NULL |  |  |
| `profile_score` | bigint | NO | 0 |  |  |
| `profile_step` | varchar(128) | NO | profile_pic |  |  |
| `is_apply_job_resume_uploaded` | tinyint(1) | NO | 0 |  |  |
| `is_resume_extracted` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_users_city_id | city_id | NO | BTREE |
| fk_users_country_id | country_id | NO | BTREE |
| fk_users_ip_id | ip_id | NO | BTREE |
| fk_users_last_login_ip_id | last_login_ip_id | NO | BTREE |
| fk_users_state_id | state_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## vaults

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `masked_cc` | varchar(100) | NO | NULL |  |  |
| `credit_card_type` | varchar(100) | NO | NULL |  |  |
| `vault_key` | varchar(100) | YES | NULL |  |  |
| `vault_id` | bigint | YES | NULL |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `email` | varchar(200) | YES | NULL |  |  |
| `address` | text | YES | NULL |  |  |
| `city` | varchar(100) | YES | NULL |  |  |
| `state` | varchar(100) | YES | NULL |  |  |
| `country` | varchar(100) | YES | NULL |  |  |
| `zip_code` | varchar(100) | YES | NULL |  |  |
| `phone` | varchar(100) | YES | NULL |  |  |
| `is_primary` | tinyint(1) | YES | 1 |  |  |
| `credit_card_expire` | varchar(100) | YES | NULL |  |  |
| `expire_month` | int | YES | NULL |  |  |
| `expire_year` | int | YES | NULL |  |  |
| `cvv2` | varchar(10) | YES | NULL |  |  |
| `first_name` | varchar(100) | YES | NULL |  |  |
| `last_name` | varchar(100) | YES | NULL |  |  |
| `payment_type` | smallint | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_vaults_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## views

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `foreign_id` | bigint | NO | NULL |  |  |
| `class` | varchar(255) | NO | NULL |  |  |
| `ip_id` | bigint | NO | 0 | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_views_ip_id | ip_id | NO | BTREE |
| fk_views_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wallet_transaction_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `foreign_id` | bigint | NO | 0 |  |  |
| `class` | varchar(100) | NO | NULL |  |  |
| `amount` | double | NO | 0 |  |  |
| `status` | varchar(100) | YES | NULL |  |  |
| `payment_type` | varchar(100) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wallets

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `amount` | double | NO | NULL |  |  |
| `payment_gateway_id` | smallint | NO | 0 |  |  |
| `gateway_id` | bigint | YES | NULL |  |  |
| `is_payment_completed` | tinyint(1) | NO | 0 |  |  |
| `paypal_pay_key` | varchar(250) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_wallets_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## work_profiles

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `title` | varchar(510) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `from_month_year` | varchar(512) | NO | NULL |  |  |
| `to_month_year` | varchar(512) | YES | NULL |  |  |
| `company` | varchar(512) | YES | NULL |  |  |
| `currently_working` | tinyint(1) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_work_profiles_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## zazpay_ipn_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `ip` | bigint | YES | NULL |  |  |
| `post_variable` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## zazpay_payment_gateways

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `zazpay_gateway_name` | varchar(510) | YES | NULL |  |  |
| `zazpay_gateway_id` | bigint | YES | NULL |  |  |
| `zazpay_payment_group_id` | bigint | NO | NULL | MUL |  |
| `zazpay_gateway_details` | text | YES | NULL |  |  |
| `days_after_amount_paid` | bigint | YES | NULL |  |  |
| `is_marketplace_supported` | tinyint(1) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_zazpay_payment_gateways_zazpay_payment_group_id | zazpay_payment_group_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## zazpay_payment_gateways_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `zazpay_payment_gateway_id` | bigint | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_zazpay_payment_gateways_users_user_id | user_id | NO | BTREE |
| fk_zazpay_payment_gateways_users_zazpay_payment_gateway_id | zazpay_payment_gateway_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## zazpay_payment_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `zazpay_group_id` | bigint | NO | NULL |  |  |
| `name` | varchar(400) | YES | NULL |  |  |
| `thumb_url` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## zazpay_transaction_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `updated_at` | timestamp | NO | 0000-00-00 00:00:00 |  |  |
| `user_id` | bigint | YES | NULL | MUL |  |
| `amount` | double | NO | NULL |  |  |
| `payment_id` | bigint | YES | NULL |  |  |
| `class` | varchar(100) | YES | NULL |  |  |
| `foreign_id` | bigint | YES | NULL |  |  |
| `zazpay_pay_key` | varchar(510) | YES | NULL |  |  |
| `merchant_id` | bigint | YES | NULL |  |  |
| `gateway_id` | int | YES | NULL |  |  |
| `gateway_name` | varchar(510) | YES | NULL |  |  |
| `status` | varchar(100) | YES | NULL |  |  |
| `payment_type` | varchar(100) | YES | NULL |  |  |
| `buyer_id` | bigint | YES | NULL |  |  |
| `buyer_email` | varchar(510) | YES | NULL |  |  |
| `buyer_address` | varchar(510) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| fk_zazpay_transaction_logs_user_id | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

