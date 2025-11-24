# WORK Database Schema

**Database Type:** mysql
**Total Tables:** 226
**Generated:** 11/22/2025, 12:50:35 PM

---

## Table of Contents

1. [accept_estimates](#accept-estimates)
2. [attendance_settings](#attendance-settings)
3. [attendances](#attendances)
4. [authorize_invoices](#authorize-invoices)
5. [authorize_subscriptions](#authorize-subscriptions)
6. [client_categories](#client-categories)
7. [client_contacts](#client-contacts)
8. [client_details](#client-details)
9. [client_docs](#client-docs)
10. [client_sub_categories](#client-sub-categories)
11. [client_user_notes](#client-user-notes)
12. [companies](#companies)
13. [contract_discussions](#contract-discussions)
14. [contract_files](#contract-files)
15. [contract_renews](#contract-renews)
16. [contract_signs](#contract-signs)
17. [contract_types](#contract-types)
18. [contracts](#contracts)
19. [conversation](#conversation)
20. [conversation_reply](#conversation-reply)
21. [countries](#countries)
22. [credit_note_items](#credit-note-items)
23. [credit_notes](#credit-notes)
24. [credit_notes_invoice](#credit-notes-invoice)
25. [currencies](#currencies)
26. [currency_format_settings](#currency-format-settings)
27. [custom_field_groups](#custom-field-groups)
28. [custom_fields](#custom-fields)
29. [custom_fields_data](#custom-fields-data)
30. [dashboard_widgets](#dashboard-widgets)
31. [designations](#designations)
32. [devices](#devices)
33. [discussion_categories](#discussion-categories)
34. [discussion_files](#discussion-files)
35. [discussion_replies](#discussion-replies)
36. [discussions](#discussions)
37. [email_notification_settings](#email-notification-settings)
38. [employee_details](#employee-details)
39. [employee_docs](#employee-docs)
40. [employee_faq_categories](#employee-faq-categories)
41. [employee_faq_files](#employee-faq-files)
42. [employee_faqs](#employee-faqs)
43. [employee_leave_quotas](#employee-leave-quotas)
44. [employee_monthly_salaries](#employee-monthly-salaries)
45. [employee_payroll_cycle](#employee-payroll-cycle)
46. [employee_salary_groups](#employee-salary-groups)
47. [employee_skills](#employee-skills)
48. [employee_teams](#employee-teams)
49. [estimate_items](#estimate-items)
50. [estimates](#estimates)
51. [event_attendees](#event-attendees)
52. [event_categories](#event-categories)
53. [event_types](#event-types)
54. [events](#events)
55. [expenses](#expenses)
56. [expenses_category](#expenses-category)
57. [expenses_category_roles](#expenses-category-roles)
58. [expenses_recurring](#expenses-recurring)
59. [failed_jobs](#failed-jobs)
60. [faq_categories](#faq-categories)
61. [faq_files](#faq-files)
62. [faqs](#faqs)
63. [features](#features)
64. [file_storage](#file-storage)
65. [file_storage_settings](#file-storage-settings)
66. [footer_menu](#footer-menu)
67. [front_clients](#front-clients)
68. [front_details](#front-details)
69. [front_faqs](#front-faqs)
70. [front_features](#front-features)
71. [front_menu_buttons](#front-menu-buttons)
72. [front_widgets](#front-widgets)
73. [gdpr_settings](#gdpr-settings)
74. [global_currencies](#global-currencies)
75. [global_settings](#global-settings)
76. [google_accounts](#google-accounts)
77. [google_calendar_modules](#google-calendar-modules)
78. [holidays](#holidays)
79. [invoice_items](#invoice-items)
80. [invoice_recurring](#invoice-recurring)
81. [invoice_recurring_items](#invoice-recurring-items)
82. [invoice_settings](#invoice-settings)
83. [invoices](#invoices)
84. [issues](#issues)
85. [jobs](#jobs)
86. [language_settings](#language-settings)
87. [lead_agents](#lead-agents)
88. [lead_category](#lead-category)
89. [lead_custom_forms](#lead-custom-forms)
90. [lead_files](#lead-files)
91. [lead_follow_up](#lead-follow-up)
92. [lead_sources](#lead-sources)
93. [lead_status](#lead-status)
94. [leads](#leads)
95. [leave_types](#leave-types)
96. [leaves](#leaves)
97. [licences](#licences)
98. [log_time_for](#log-time-for)
99. [ltm_translations](#ltm-translations)
100. [message_settings](#message-settings)
101. [migrations](#migrations)
102. [module_settings](#module-settings)
103. [modules](#modules)
104. [mollie_invoices](#mollie-invoices)
105. [mollie_subscriptions](#mollie-subscriptions)
106. [notes](#notes)
107. [notice_views](#notice-views)
108. [notices](#notices)
109. [notifications](#notifications)
110. [offline_invoice_payments](#offline-invoice-payments)
111. [offline_invoices](#offline-invoices)
112. [offline_payment_methods](#offline-payment-methods)
113. [offline_plan_changes](#offline-plan-changes)
114. [package_settings](#package-settings)
115. [packages](#packages)
116. [password_resets](#password-resets)
117. [payfast_invoices](#payfast-invoices)
118. [payfast_subscriptions](#payfast-subscriptions)
119. [payment_gateway_credentials](#payment-gateway-credentials)
120. [payments](#payments)
121. [paypal_invoices](#paypal-invoices)
122. [payroll_cycles](#payroll-cycles)
123. [payroll_settings](#payroll-settings)
124. [paystack_invoices](#paystack-invoices)
125. [paystack_subscriptions](#paystack-subscriptions)
126. [permission_role](#permission-role)
127. [permissions](#permissions)
128. [pinned](#pinned)
129. [product_category](#product-category)
130. [product_sub_category](#product-sub-category)
131. [products](#products)
132. [project_activity](#project-activity)
133. [project_category](#project-category)
134. [project_files](#project-files)
135. [project_members](#project-members)
136. [project_milestones](#project-milestones)
137. [project_notes](#project-notes)
138. [project_ratings](#project-ratings)
139. [project_settings](#project-settings)
140. [project_template_members](#project-template-members)
141. [project_template_sub_tasks](#project-template-sub-tasks)
142. [project_template_task_users](#project-template-task-users)
143. [project_template_tasks](#project-template-tasks)
144. [project_templates](#project-templates)
145. [project_time_logs](#project-time-logs)
146. [project_user_notes](#project-user-notes)
147. [projects](#projects)
148. [proposal_items](#proposal-items)
149. [proposal_signs](#proposal-signs)
150. [proposals](#proposals)
151. [purpose_consent](#purpose-consent)
152. [purpose_consent_leads](#purpose-consent-leads)
153. [purpose_consent_users](#purpose-consent-users)
154. [push_notification_settings](#push-notification-settings)
155. [push_subscriptions](#push-subscriptions)
156. [pusher_settings](#pusher-settings)
157. [quotation_items](#quotation-items)
158. [quotations](#quotations)
159. [razorpay_invoices](#razorpay-invoices)
160. [razorpay_subscriptions](#razorpay-subscriptions)
161. [removal_requests](#removal-requests)
162. [removal_requests_lead](#removal-requests-lead)
163. [rest_api_application_settings](#rest-api-application-settings)
164. [rest_api_settings](#rest-api-settings)
165. [role_user](#role-user)
166. [roles](#roles)
167. [salary_components](#salary-components)
168. [salary_group_components](#salary-group-components)
169. [salary_groups](#salary-groups)
170. [salary_payment_methods](#salary-payment-methods)
171. [salary_slips](#salary-slips)
172. [salary_tds](#salary-tds)
173. [seo_details](#seo-details)
174. [sign_up_settings](#sign-up-settings)
175. [skills](#skills)
176. [slack_settings](#slack-settings)
177. [smtp_settings](#smtp-settings)
178. [social_auth_settings](#social-auth-settings)
179. [socials](#socials)
180. [sticky_notes](#sticky-notes)
181. [storage_settings](#storage-settings)
182. [stripe_invoices](#stripe-invoices)
183. [stripe_setting](#stripe-setting)
184. [sub_task_files](#sub-task-files)
185. [sub_tasks](#sub-tasks)
186. [subscription_items](#subscription-items)
187. [subscriptions](#subscriptions)
188. [super_admin_payroll_settings](#super-admin-payroll-settings)
189. [support_ticket_files](#support-ticket-files)
190. [support_ticket_replies](#support-ticket-replies)
191. [support_ticket_types](#support-ticket-types)
192. [support_tickets](#support-tickets)
193. [task_category](#task-category)
194. [task_comment_files](#task-comment-files)
195. [task_comments](#task-comments)
196. [task_files](#task-files)
197. [task_history](#task-history)
198. [task_label_list](#task-label-list)
199. [task_labels](#task-labels)
200. [task_notes](#task-notes)
201. [task_request_files](#task-request-files)
202. [task_requests](#task-requests)
203. [task_users](#task-users)
204. [taskboard_columns](#taskboard-columns)
205. [tasks](#tasks)
206. [taxes](#taxes)
207. [teams](#teams)
208. [testimonials](#testimonials)
209. [theme_settings](#theme-settings)
210. [ticket_agent_groups](#ticket-agent-groups)
211. [ticket_channels](#ticket-channels)
212. [ticket_custom_forms](#ticket-custom-forms)
213. [ticket_files](#ticket-files)
214. [ticket_groups](#ticket-groups)
215. [ticket_replies](#ticket-replies)
216. [ticket_reply_templates](#ticket-reply-templates)
217. [ticket_tag_list](#ticket-tag-list)
218. [ticket_tags](#ticket-tags)
219. [ticket_types](#ticket-types)
220. [tickets](#tickets)
221. [tr_front_details](#tr-front-details)
222. [universal_search](#universal-search)
223. [user_activities](#user-activities)
224. [users](#users)
225. [users_chat](#users-chat)
226. [users_chat_files](#users-chat-files)

---

## accept_estimates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `estimate_id` | int unsigned | NO | NULL | MUL |  |
| `full_name` | varchar(191) | NO | NULL |  |  |
| `email` | varchar(191) | NO | NULL |  |  |
| `signature` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| accept_estimates_company_id_foreign | company_id | NO | BTREE |
| accept_estimates_estimate_id_foreign | estimate_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| accept_estimates_company_id_foreign | company_id | companies.id |
| accept_estimates_estimate_id_foreign | estimate_id | estimates.id |

---

## attendance_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `office_start_time` | time | NO | NULL |  |  |
| `office_end_time` | time | NO | NULL |  |  |
| `halfday_mark_time` | time | YES | NULL |  |  |
| `late_mark_duration` | tinyint | NO | NULL |  |  |
| `clockin_in_day` | int | NO | 1 |  |  |
| `employee_clock_in_out` | enum('yes','no') | NO | yes |  |  |
| `office_open_days` | varchar(191) | NO | [1,2,3,4,5] |  |  |
| `ip_address` | text | YES | NULL |  |  |
| `radius` | int | YES | NULL |  |  |
| `radius_check` | enum('yes','no') | NO | no |  |  |
| `ip_check` | enum('yes','no') | NO | no |  |  |
| `alert_after` | int | YES | NULL |  |  |
| `alert_after_status` | tinyint(1) | NO | 1 |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| attendance_settings_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| attendance_settings_company_id_foreign | company_id | companies.id |

---

## attendances

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `clock_in_time` | datetime | NO | NULL |  |  |
| `clock_out_time` | datetime | YES | NULL |  |  |
| `clock_in_ip` | varchar(191) | NO | NULL |  |  |
| `clock_out_ip` | varchar(191) | NO | NULL |  |  |
| `working_from` | varchar(191) | NO | office |  |  |
| `late` | enum('yes','no') | NO | no |  |  |
| `half_day` | enum('yes','no') | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| attendances_company_id_foreign | company_id | NO | BTREE |
| attendances_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| attendances_company_id_foreign | company_id | companies.id |
| attendances_user_id_foreign | user_id | users.id |

---

## authorize_invoices

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `package_id` | int unsigned | NO | NULL | MUL |  |
| `transaction_id` | varchar(191) | YES | NULL |  |  |
| `amount` | varchar(191) | YES | NULL |  |  |
| `pay_date` | date | YES | NULL |  |  |
| `next_pay_date` | date | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| authorize_invoices_company_id_foreign | company_id | NO | BTREE |
| authorize_invoices_package_id_foreign | package_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| authorize_invoices_company_id_foreign | company_id | companies.id |
| authorize_invoices_package_id_foreign | package_id | packages.id |

---

## authorize_subscriptions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `subscription_id` | varchar(191) | NO | NULL |  |  |
| `plan_id` | int unsigned | YES | NULL | MUL |  |
| `plan_type` | varchar(191) | YES | NULL |  |  |
| `ends_at` | timestamp | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| authorize_subscriptions_company_id_foreign | company_id | NO | BTREE |
| authorize_subscriptions_plan_id_foreign | plan_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| authorize_subscriptions_company_id_foreign | company_id | companies.id |
| authorize_subscriptions_plan_id_foreign | plan_id | packages.id |

---

## client_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `category_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| client_categories_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| client_categories_company_id_foreign | company_id | companies.id |

---

## client_contacts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `contact_name` | varchar(191) | NO | NULL |  |  |
| `phone` | varchar(191) | YES | NULL |  |  |
| `email` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| client_contacts_company_id_foreign | company_id | NO | BTREE |
| client_contacts_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| client_contacts_company_id_foreign | company_id | companies.id |
| client_contacts_user_id_foreign | user_id | users.id |

---

## client_details

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `name` | varchar(191) | YES | NULL |  |  |
| `email` | varchar(191) | YES | NULL |  |  |
| `image` | varchar(191) | YES | NULL |  |  |
| `mobile` | varchar(191) | YES | NULL |  |  |
| `company_name` | varchar(191) | YES | NULL |  |  |
| `address` | text | YES | NULL |  |  |
| `shipping_address` | text | YES | NULL |  |  |
| `office_phone` | varchar(191) | YES | NULL |  |  |
| `city` | varchar(191) | YES | NULL |  |  |
| `state` | varchar(191) | YES | NULL |  |  |
| `postal_code` | varchar(191) | YES | NULL |  |  |
| `website` | varchar(191) | YES | NULL |  |  |
| `note` | text | YES | NULL |  |  |
| `linkedin` | varchar(191) | YES | NULL |  |  |
| `facebook` | varchar(191) | YES | NULL |  |  |
| `twitter` | varchar(191) | YES | NULL |  |  |
| `skype` | varchar(191) | YES | NULL |  |  |
| `gst_number` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `email_notifications` | tinyint(1) | NO | 1 |  |  |
| `country_id` | int unsigned | YES | NULL | MUL |  |
| `category_id` | bigint unsigned | YES | NULL | MUL |  |
| `sub_category_id` | bigint unsigned | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| client_details_category_id_foreign | category_id | NO | BTREE |
| client_details_company_id_foreign | company_id | NO | BTREE |
| client_details_country_id_foreign | country_id | NO | BTREE |
| client_details_sub_category_id_foreign | sub_category_id | NO | BTREE |
| client_details_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| client_details_category_id_foreign | category_id | client_categories.id |
| client_details_company_id_foreign | company_id | companies.id |
| client_details_country_id_foreign | country_id | countries.id |
| client_details_sub_category_id_foreign | sub_category_id | client_sub_categories.id |
| client_details_user_id_foreign | user_id | users.id |

---

## client_docs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `name` | varchar(200) | NO | NULL |  |  |
| `filename` | varchar(200) | NO | NULL |  |  |
| `hashname` | varchar(200) | NO | NULL |  |  |
| `size` | varchar(200) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| client_docs_company_id_foreign | company_id | NO | BTREE |
| client_docs_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| client_docs_company_id_foreign | company_id | companies.id |
| client_docs_user_id_foreign | user_id | users.id |

---

## client_sub_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `category_id` | bigint unsigned | NO | NULL | MUL |  |
| `category_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| client_sub_categories_category_id_foreign | category_id | NO | BTREE |
| client_sub_categories_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| client_sub_categories_category_id_foreign | category_id | client_categories.id |
| client_sub_categories_company_id_foreign | company_id | companies.id |

---

## client_user_notes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `note_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| client_user_notes_company_id_foreign | company_id | NO | BTREE |
| client_user_notes_note_id_foreign | note_id | NO | BTREE |
| client_user_notes_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| client_user_notes_company_id_foreign | company_id | companies.id |
| client_user_notes_note_id_foreign | note_id | notes.id |
| client_user_notes_user_id_foreign | user_id | users.id |

---

## companies

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_name` | varchar(191) | NO | NULL |  |  |
| `company_email` | varchar(191) | NO | NULL |  |  |
| `company_phone` | varchar(191) | NO | NULL |  |  |
| `logo` | varchar(191) | YES | NULL |  |  |
| `login_background` | varchar(191) | YES | NULL |  |  |
| `address` | text | NO | NULL |  |  |
| `website` | varchar(191) | YES | NULL |  |  |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `package_id` | int unsigned | YES | NULL | MUL |  |
| `package_type` | enum('monthly','annual') | NO | monthly |  |  |
| `timezone` | varchar(191) | NO | Asia/Kolkata |  |  |
| `date_format` | varchar(20) | NO | d-m-Y |  |  |
| `date_picker_format` | varchar(191) | YES | NULL |  |  |
| `moment_format` | varchar(191) | YES | NULL |  |  |
| `time_format` | varchar(20) | NO | h:i A |  |  |
| `week_start` | int | NO | 1 |  |  |
| `locale` | varchar(191) | NO | en |  |  |
| `latitude` | decimal(10,8) | YES | NULL |  |  |
| `longitude` | decimal(11,8) | YES | NULL |  |  |
| `leaves_start_from` | enum('joining_date','year_start') | NO | joining_date |  |  |
| `active_theme` | enum('default','custom') | NO | default |  |  |
| `status` | enum('active','inactive','license_expired') | NO | active |  |  |
| `task_self` | enum('yes','no') | NO | yes |  |  |
| `last_updated_by` | int unsigned | YES | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `stripe_id` | varchar(191) | YES | NULL |  |  |
| `card_brand` | varchar(191) | YES | NULL |  |  |
| `card_last_four` | varchar(191) | YES | NULL |  |  |
| `trial_ends_at` | timestamp | YES | NULL |  |  |
| `licence_expire_on` | date | YES | NULL |  |  |
| `rounded_theme` | tinyint(1) | NO | 1 |  |  |
| `last_login` | datetime | YES | NULL |  |  |
| `default_task_status` | int unsigned | YES | NULL | MUL |  |
| `show_update_popup` | tinyint(1) | NO | 1 |  |  |
| `dashboard_clock` | tinyint(1) | NO | 1 |  |  |
| `ticket_form_google_captcha` | tinyint(1) | NO | 0 |  |  |
| `lead_form_google_captcha` | tinyint(1) | NO | 0 |  |  |
| `rtl` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| companies_currency_id_foreign | currency_id | NO | BTREE |
| companies_default_task_status_foreign | default_task_status | NO | BTREE |
| companies_package_id_foreign | package_id | NO | BTREE |
| organisation_settings_last_updated_by_foreign | last_updated_by | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| companies_currency_id_foreign | currency_id | currencies.id |
| companies_default_task_status_foreign | default_task_status | taskboard_columns.id |
| companies_package_id_foreign | package_id | packages.id |
| organisation_settings_last_updated_by_foreign | last_updated_by | users.id |

---

## contract_discussions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `contract_id` | bigint unsigned | NO | NULL | MUL |  |
| `from` | int unsigned | NO | NULL | MUL |  |
| `message` | longtext | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| contract_discussions_company_id_foreign | company_id | NO | BTREE |
| contract_discussions_contract_id_foreign | contract_id | NO | BTREE |
| contract_discussions_from_foreign | from | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| contract_discussions_company_id_foreign | company_id | companies.id |
| contract_discussions_contract_id_foreign | contract_id | contracts.id |
| contract_discussions_from_foreign | from | users.id |

---

## contract_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `contract_id` | bigint unsigned | NO | NULL | MUL |  |
| `filename` | varchar(191) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `google_url` | varchar(191) | YES | NULL |  |  |
| `hashname` | varchar(191) | YES | NULL |  |  |
| `size` | varchar(191) | YES | NULL |  |  |
| `dropbox_link` | varchar(191) | YES | NULL |  |  |
| `external_link` | varchar(191) | YES | NULL |  |  |
| `external_link_name` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| contract_files_company_id_foreign | company_id | NO | BTREE |
| contract_files_contract_id_foreign | contract_id | NO | BTREE |
| contract_files_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| contract_files_company_id_foreign | company_id | companies.id |
| contract_files_contract_id_foreign | contract_id | contracts.id |
| contract_files_user_id_foreign | user_id | users.id |

---

## contract_renews

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `renewed_by` | int unsigned | NO | NULL | MUL |  |
| `contract_id` | bigint unsigned | NO | NULL | MUL |  |
| `start_date` | date | NO | NULL |  |  |
| `end_date` | date | NO | NULL |  |  |
| `amount` | decimal(12,2) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| contract_renews_company_id_foreign | company_id | NO | BTREE |
| contract_renews_contract_id_foreign | contract_id | NO | BTREE |
| contract_renews_renewed_by_foreign | renewed_by | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| contract_renews_company_id_foreign | company_id | companies.id |
| contract_renews_contract_id_foreign | contract_id | contracts.id |
| contract_renews_renewed_by_foreign | renewed_by | users.id |

---

## contract_signs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `contract_id` | bigint unsigned | NO | NULL | MUL |  |
| `full_name` | varchar(191) | NO | NULL |  |  |
| `email` | varchar(191) | NO | NULL |  |  |
| `signature` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| contract_signs_company_id_foreign | company_id | NO | BTREE |
| contract_signs_contract_id_foreign | contract_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| contract_signs_company_id_foreign | company_id | companies.id |
| contract_signs_contract_id_foreign | contract_id | contracts.id |

---

## contract_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| contract_types_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| contract_types_company_id_foreign | company_id | companies.id |

---

## contracts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `client_id` | int unsigned | NO | NULL | MUL |  |
| `subject` | varchar(191) | NO | NULL |  |  |
| `amount` | varchar(191) | NO | NULL |  |  |
| `original_amount` | decimal(15,2) | NO | NULL |  |  |
| `contract_type_id` | bigint unsigned | YES | NULL | MUL |  |
| `start_date` | date | NO | NULL |  |  |
| `original_start_date` | date | NO | NULL |  |  |
| `end_date` | date | YES | NULL |  |  |
| `original_end_date` | date | YES | NULL |  |  |
| `description` | longtext | YES | NULL |  |  |
| `contract_name` | varchar(191) | YES | NULL |  |  |
| `company_logo` | varchar(191) | YES | NULL |  |  |
| `alternate_address` | varchar(191) | YES | NULL |  |  |
| `mobile` | varchar(191) | YES | NULL |  |  |
| `office_phone` | varchar(191) | YES | NULL |  |  |
| `city` | varchar(191) | YES | NULL |  |  |
| `state` | varchar(191) | YES | NULL |  |  |
| `country` | varchar(191) | YES | NULL |  |  |
| `postal_code` | varchar(191) | YES | NULL |  |  |
| `contract_detail` | longtext | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `send_status` | tinyint(1) | NO | 1 |  |  |
| `event_id` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| contracts_client_id_foreign | client_id | NO | BTREE |
| contracts_company_id_foreign | company_id | NO | BTREE |
| contracts_contract_type_id_foreign | contract_type_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| contracts_client_id_foreign | client_id | users.id |
| contracts_company_id_foreign | company_id | companies.id |
| contracts_contract_type_id_foreign | contract_type_id | contract_types.id |

---

## conversation

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `user_one` | int unsigned | NO | NULL | MUL |  |
| `user_two` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| conversation_user_one_foreign | user_one | NO | BTREE |
| conversation_user_two_foreign | user_two | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| conversation_user_one_foreign | user_one | users.id |
| conversation_user_two_foreign | user_two | users.id |

---

## conversation_reply

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `conversation_id` | int unsigned | NO | NULL | MUL |  |
| `reply` | text | NO | NULL |  |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| conversation_reply_conversation_id_foreign | conversation_id | NO | BTREE |
| conversation_reply_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| conversation_reply_conversation_id_foreign | conversation_id | conversation.id |
| conversation_reply_user_id_foreign | user_id | users.id |

---

## countries

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `iso` | char(2) | NO | NULL |  |  |
| `name` | varchar(80) | NO | NULL |  |  |
| `nicename` | varchar(80) | NO | NULL |  |  |
| `iso3` | char(3) | YES | NULL |  |  |
| `numcode` | smallint | YES | NULL |  |  |
| `phonecode` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## credit_note_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `credit_note_id` | int unsigned | NO | NULL | MUL |  |
| `item_name` | varchar(191) | NO | NULL |  |  |
| `type` | enum('item','discount','tax') | NO | item |  |  |
| `quantity` | int | NO | NULL |  |  |
| `unit_price` | double(8,2) | NO | NULL |  |  |
| `amount` | double(8,2) | NO | NULL |  |  |
| `taxes` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `hsn_sac_code` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| credit_note_items_credit_note_id_foreign | credit_note_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| credit_note_items_credit_note_id_foreign | credit_note_id | credit_notes.id |

---

## credit_notes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `project_id` | int unsigned | YES | NULL | MUL |  |
| `cn_number` | varchar(191) | NO | NULL |  |  |
| `invoice_id` | int unsigned | YES | NULL |  |  |
| `issue_date` | date | NO | NULL |  |  |
| `due_date` | date | NO | NULL |  |  |
| `discount` | double | NO | 0 |  |  |
| `discount_type` | enum('percent','fixed') | NO | percent |  |  |
| `sub_total` | double(8,2) | NO | NULL |  |  |
| `total` | double(8,2) | NO | NULL |  |  |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `status` | enum('closed','open') | NO | open |  |  |
| `recurring` | enum('yes','no') | NO | no |  |  |
| `billing_frequency` | varchar(191) | YES | NULL |  |  |
| `billing_interval` | int | YES | NULL |  |  |
| `billing_cycle` | int | YES | NULL |  |  |
| `file` | varchar(191) | YES | NULL |  |  |
| `file_original_name` | varchar(191) | YES | NULL |  |  |
| `note` | text | YES | NULL |  |  |
| `deleted_at` | timestamp | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `client_id` | int unsigned | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| credit_notes_client_id_foreign | client_id | NO | BTREE |
| credit_notes_company_id_foreign | company_id | NO | BTREE |
| credit_notes_currency_id_foreign | currency_id | NO | BTREE |
| credit_notes_project_id_foreign | project_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| credit_notes_client_id_foreign | client_id | users.id |
| credit_notes_company_id_foreign | company_id | companies.id |
| credit_notes_currency_id_foreign | currency_id | currencies.id |
| credit_notes_project_id_foreign | project_id | projects.id |

---

## credit_notes_invoice

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `credit_notes_id` | bigint unsigned | NO | NULL |  |  |
| `invoice_id` | bigint unsigned | NO | NULL |  |  |
| `date` | datetime | NO | NULL |  |  |
| `credit_amount` | double(16,2) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## currencies

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `currency_name` | varchar(191) | NO | NULL |  |  |
| `currency_symbol` | varchar(191) | YES | NULL |  |  |
| `currency_code` | varchar(191) | NO | NULL |  |  |
| `exchange_rate` | double | YES | NULL |  |  |
| `is_cryptocurrency` | enum('yes','no') | NO | no |  |  |
| `usd_price` | double | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `currency_position` | enum('front','behind') | NO | front |  |  |
| `status` | enum('enable','disable') | NO | enable |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| currencies_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| currencies_company_id_foreign | company_id | companies.id |

---

## currency_format_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `currency_position` | enum('left','right','left_with_space','right_with_space') | NO | left |  |  |
| `no_of_decimal` | int unsigned | NO | NULL |  |  |
| `thousand_separator` | varchar(191) | YES | NULL |  |  |
| `decimal_separator` | varchar(191) | YES | NULL |  |  |
| `sample_data` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| currency_format_settings_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| currency_format_settings_company_id_foreign | company_id | companies.id |

---

## custom_field_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `model` | varchar(191) | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| custom_field_groups_company_id_foreign | company_id | NO | BTREE |
| custom_field_groups_model_index | model | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| custom_field_groups_company_id_foreign | company_id | companies.id |

---

## custom_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `custom_field_group_id` | int unsigned | YES | NULL | MUL |  |
| `label` | varchar(100) | NO | NULL |  |  |
| `name` | varchar(100) | NO | NULL |  |  |
| `type` | varchar(10) | NO | NULL |  |  |
| `required` | enum('yes','no') | NO | no |  |  |
| `values` | varchar(5000) | YES | NULL |  |  |
| `show_employee` | tinyint(1) | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| custom_fields_custom_field_group_id_foreign | custom_field_group_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| custom_fields_custom_field_group_id_foreign | custom_field_group_id | custom_field_groups.id |

---

## custom_fields_data

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `custom_field_id` | int unsigned | NO | NULL | MUL |  |
| `model_id` | int unsigned | NO | NULL |  |  |
| `model` | varchar(191) | YES | NULL | MUL |  |
| `value` | varchar(10000) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| custom_fields_data_custom_field_id_foreign | custom_field_id | NO | BTREE |
| custom_fields_data_model_index | model | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| custom_fields_data_custom_field_id_foreign | custom_field_id | custom_fields.id |

---

## dashboard_widgets

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `widget_name` | varchar(191) | NO | NULL |  |  |
| `status` | tinyint(1) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `dashboard_type` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| dashboard_widgets_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| dashboard_widgets_company_id_foreign | company_id | companies.id |

---

## designations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| designations_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| designations_company_id_foreign | company_id | companies.id |

---

## devices

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `device_id` | bigint unsigned | NO | NULL |  |  |
| `registration_id` | varchar(255) | NO | NULL |  |  |
| `details` | varchar(1000) | YES | NULL |  |  |
| `type` | varchar(20) | YES | NULL |  |  |
| `status` | enum('active','inactive') | NO | active |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| devices_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| devices_user_id_foreign | user_id | users.id |

---

## discussion_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `order` | int | NO | 1 |  |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `color` | varchar(20) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| discussion_categories_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| discussion_categories_company_id_foreign | company_id | companies.id |

---

## discussion_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `discussion_id` | int unsigned | YES | NULL | MUL |  |
| `discussion_reply_id` | int unsigned | YES | NULL | MUL |  |
| `filename` | varchar(191) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `google_url` | varchar(191) | YES | NULL |  |  |
| `hashname` | varchar(191) | YES | NULL |  |  |
| `size` | varchar(191) | YES | NULL |  |  |
| `dropbox_link` | varchar(191) | YES | NULL |  |  |
| `external_link_name` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| discussion_files_company_id_foreign | company_id | NO | BTREE |
| discussion_files_discussion_id_foreign | discussion_id | NO | BTREE |
| discussion_files_discussion_reply_id_foreign | discussion_reply_id | NO | BTREE |
| discussion_files_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| discussion_files_company_id_foreign | company_id | companies.id |
| discussion_files_discussion_id_foreign | discussion_id | discussions.id |
| discussion_files_discussion_reply_id_foreign | discussion_reply_id | discussion_replies.id |
| discussion_files_user_id_foreign | user_id | users.id |

---

## discussion_replies

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `discussion_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `body` | text | NO | NULL |  |  |
| `deleted_at` | timestamp | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| discussion_replies_company_id_foreign | company_id | NO | BTREE |
| discussion_replies_discussion_id_foreign | discussion_id | NO | BTREE |
| discussion_replies_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| discussion_replies_company_id_foreign | company_id | companies.id |
| discussion_replies_discussion_id_foreign | discussion_id | discussions.id |
| discussion_replies_user_id_foreign | user_id | users.id |

---

## discussions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `discussion_category_id` | int unsigned | YES | NULL | MUL |  |
| `project_id` | int unsigned | YES | NULL | MUL |  |
| `title` | varchar(191) | NO | NULL |  |  |
| `color` | varchar(20) | YES | #232629 |  |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `pinned` | tinyint(1) | NO | 0 |  |  |
| `closed` | tinyint(1) | NO | 0 |  |  |
| `deleted_at` | timestamp | YES | NULL |  |  |
| `last_reply_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `best_answer_id` | int unsigned | YES | NULL | MUL |  |
| `last_reply_by_id` | int unsigned | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| discussions_best_answer_id_foreign | best_answer_id | NO | BTREE |
| discussions_company_id_foreign | company_id | NO | BTREE |
| discussions_discussion_category_id_foreign | discussion_category_id | NO | BTREE |
| discussions_last_reply_by_id_foreign | last_reply_by_id | NO | BTREE |
| discussions_project_id_foreign | project_id | NO | BTREE |
| discussions_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| discussions_best_answer_id_foreign | best_answer_id | discussion_replies.id |
| discussions_company_id_foreign | company_id | companies.id |
| discussions_discussion_category_id_foreign | discussion_category_id | discussion_categories.id |
| discussions_last_reply_by_id_foreign | last_reply_by_id | users.id |
| discussions_project_id_foreign | project_id | projects.id |
| discussions_user_id_foreign | user_id | users.id |

---

## email_notification_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `setting_name` | varchar(191) | NO | NULL |  |  |
| `send_email` | enum('yes','no') | NO | no |  |  |
| `send_slack` | enum('yes','no') | NO | no |  |  |
| `send_push` | enum('yes','no') | NO | no |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| email_notification_settings_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| email_notification_settings_company_id_foreign | company_id | companies.id |

---

## employee_details

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `employee_id` | varchar(191) | YES | NULL |  |  |
| `address` | text | YES | NULL |  |  |
| `hourly_rate` | double | YES | NULL |  |  |
| `slack_username` | varchar(191) | YES | NULL | UNI |  |
| `department_id` | int unsigned | YES | NULL | MUL |  |
| `designation_id` | bigint unsigned | YES | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `joining_date` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `last_date` | date | YES | NULL |  |  |
| `attendance_reminder` | date | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| employee_details_company_id_foreign | company_id | NO | BTREE |
| employee_details_department_id_foreign | department_id | NO | BTREE |
| employee_details_designation_id_foreign | designation_id | NO | BTREE |
| employee_details_slack_username_unique | slack_username | YES | BTREE |
| employee_details_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| employee_details_company_id_foreign | company_id | companies.id |
| employee_details_department_id_foreign | department_id | teams.id |
| employee_details_designation_id_foreign | designation_id | designations.id |
| employee_details_user_id_foreign | user_id | users.id |

---

## employee_docs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `name` | varchar(200) | NO | NULL |  |  |
| `filename` | varchar(200) | NO | NULL |  |  |
| `hashname` | varchar(200) | NO | NULL |  |  |
| `size` | varchar(200) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| employee_docs_company_id_foreign | company_id | NO | BTREE |
| employee_docs_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| employee_docs_company_id_foreign | company_id | companies.id |
| employee_docs_user_id_foreign | user_id | users.id |

---

## employee_faq_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| employee_faq_categories_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| employee_faq_categories_company_id_foreign | company_id | companies.id |

---

## employee_faq_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `employee_faq_id` | int unsigned | NO | NULL | MUL |  |
| `filename` | varchar(191) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `google_url` | varchar(191) | YES | NULL |  |  |
| `hashname` | varchar(191) | YES | NULL |  |  |
| `size` | varchar(191) | YES | NULL |  |  |
| `dropbox_link` | varchar(191) | YES | NULL |  |  |
| `external_link` | varchar(191) | YES | NULL |  |  |
| `external_link_name` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| employee_faq_files_company_id_foreign | company_id | NO | BTREE |
| employee_faq_files_employee_faq_id_foreign | employee_faq_id | NO | BTREE |
| employee_faq_files_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| employee_faq_files_company_id_foreign | company_id | companies.id |
| employee_faq_files_employee_faq_id_foreign | employee_faq_id | employee_faqs.id |
| employee_faq_files_user_id_foreign | user_id | users.id |

---

## employee_faqs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `title` | varchar(191) | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `employee_faq_category_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| employee_faqs_company_id_foreign | company_id | NO | BTREE |
| employee_faqs_employee_faq_category_id_foreign | employee_faq_category_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| employee_faqs_company_id_foreign | company_id | companies.id |
| employee_faqs_employee_faq_category_id_foreign | employee_faq_category_id | employee_faq_categories.id |

---

## employee_leave_quotas

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `leave_type_id` | int unsigned | NO | NULL | MUL |  |
| `no_of_leaves` | int | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| employee_leave_quotas_company_id_foreign | company_id | NO | BTREE |
| employee_leave_quotas_leave_type_id_foreign | leave_type_id | NO | BTREE |
| employee_leave_quotas_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| employee_leave_quotas_company_id_foreign | company_id | companies.id |
| employee_leave_quotas_leave_type_id_foreign | leave_type_id | leave_types.id |
| employee_leave_quotas_user_id_foreign | user_id | users.id |

---

## employee_monthly_salaries

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `amount` | varchar(191) | NO | 0 |  |  |
| `type` | enum('initial','increment','decrement') | NO | initial |  |  |
| `date` | date | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `allow_generate_payroll` | enum('yes','no') | NO | yes |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| employee_monthly_salaries_company_id_foreign | company_id | NO | BTREE |
| employee_monthly_salaries_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| employee_monthly_salaries_company_id_foreign | company_id | companies.id |
| employee_monthly_salaries_user_id_foreign | user_id | users.id |

---

## employee_payroll_cycle

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `payroll_cycle_id` | bigint unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| employee_payroll_cycle_company_id_foreign | company_id | NO | BTREE |
| employee_payroll_cycle_payroll_cycle_id_foreign | payroll_cycle_id | NO | BTREE |
| employee_payroll_cycle_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| employee_payroll_cycle_company_id_foreign | company_id | companies.id |
| employee_payroll_cycle_payroll_cycle_id_foreign | payroll_cycle_id | payroll_cycles.id |
| employee_payroll_cycle_user_id_foreign | user_id | users.id |

---

## employee_salary_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `salary_group_id` | bigint unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| employee_salary_groups_company_id_foreign | company_id | NO | BTREE |
| employee_salary_groups_salary_group_id_foreign | salary_group_id | NO | BTREE |
| employee_salary_groups_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| employee_salary_groups_company_id_foreign | company_id | companies.id |
| employee_salary_groups_salary_group_id_foreign | salary_group_id | salary_groups.id |
| employee_salary_groups_user_id_foreign | user_id | users.id |

---

## employee_skills

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `skill_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| employee_skills_skill_id_foreign | skill_id | NO | BTREE |
| employee_skills_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| employee_skills_skill_id_foreign | skill_id | skills.id |
| employee_skills_user_id_foreign | user_id | users.id |

---

## employee_teams

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `team_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| employee_teams_team_id_foreign | team_id | NO | BTREE |
| employee_teams_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| employee_teams_team_id_foreign | team_id | teams.id |
| employee_teams_user_id_foreign | user_id | users.id |

---

## estimate_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `estimate_id` | int unsigned | NO | NULL | MUL |  |
| `item_name` | varchar(191) | NO | NULL |  |  |
| `item_summary` | text | YES | NULL |  |  |
| `type` | enum('item','discount','tax') | NO | item |  |  |
| `quantity` | double(16,2) | NO | NULL |  |  |
| `unit_price` | double(16,2) | NO | NULL |  |  |
| `amount` | double(16,2) | NO | NULL |  |  |
| `taxes` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `hsn_sac_code` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| estimate_items_estimate_id_foreign | estimate_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| estimate_items_estimate_id_foreign | estimate_id | estimates.id |

---

## estimates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `client_id` | int unsigned | NO | NULL | MUL |  |
| `estimate_number` | varchar(191) | YES | NULL |  |  |
| `valid_till` | date | NO | NULL |  |  |
| `sub_total` | double(16,2) | NO | NULL |  |  |
| `total` | double(16,2) | NO | NULL |  |  |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `status` | enum('declined','accepted','waiting','sent','draft','canceled') | NO | waiting |  |  |
| `note` | mediumtext | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `discount` | varchar(191) | NO | NULL |  |  |
| `discount_type` | varchar(191) | NO | NULL |  |  |
| `deleted_at` | timestamp | YES | NULL |  |  |
| `send_status` | tinyint(1) | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| estimates_client_id_foreign | client_id | NO | BTREE |
| estimates_company_id_foreign | company_id | NO | BTREE |
| estimates_currency_id_foreign | currency_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| estimates_client_id_foreign | client_id | users.id |
| estimates_company_id_foreign | company_id | companies.id |
| estimates_currency_id_foreign | currency_id | currencies.id |

---

## event_attendees

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `event_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| event_attendees_event_id_foreign | event_id | NO | BTREE |
| event_attendees_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| event_attendees_event_id_foreign | event_id | events.id |
| event_attendees_user_id_foreign | user_id | users.id |

---

## event_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `category_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| event_categories_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| event_categories_company_id_foreign | company_id | companies.id |

---

## event_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| event_types_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| event_types_company_id_foreign | company_id | companies.id |

---

## events

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `event_name` | varchar(191) | NO | NULL |  |  |
| `label_color` | varchar(191) | NO | NULL |  |  |
| `where` | varchar(191) | NO | NULL |  |  |
| `description` | mediumtext | NO | NULL |  |  |
| `start_date_time` | datetime | NO | NULL |  |  |
| `end_date_time` | datetime | NO | NULL |  |  |
| `repeat` | enum('yes','no') | NO | no |  |  |
| `repeat_every` | int | YES | NULL |  |  |
| `repeat_cycles` | int | YES | NULL |  |  |
| `repeat_type` | enum('day','week','month','year') | NO | day |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `category_id` | int unsigned | YES | NULL | MUL |  |
| `event_type_id` | int unsigned | YES | NULL | MUL |  |
| `event_unique_id` | varchar(191) | YES | NULL |  |  |
| `event_id` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| events_category_id_foreign | category_id | NO | BTREE |
| events_company_id_foreign | company_id | NO | BTREE |
| events_event_type_id_foreign | event_type_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| events_category_id_foreign | category_id | event_categories.id |
| events_company_id_foreign | company_id | companies.id |
| events_event_type_id_foreign | event_type_id | event_types.id |

---

## expenses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `item_name` | varchar(191) | NO | NULL |  |  |
| `purchase_date` | date | NO | NULL |  |  |
| `purchase_from` | varchar(191) | YES | NULL |  |  |
| `price` | double | NO | NULL |  |  |
| `currency_id` | int unsigned | NO | NULL | MUL |  |
| `project_id` | int unsigned | YES | NULL |  |  |
| `bill` | varchar(191) | YES | NULL |  |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `status` | enum('pending','approved','rejected') | NO | pending |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `can_claim` | tinyint(1) | NO | 1 |  |  |
| `category_id` | bigint unsigned | YES | NULL | MUL |  |
| `expenses_recurring_id` | bigint unsigned | YES | NULL | MUL |  |
| `created_by` | int unsigned | YES | NULL | MUL |  |
| `description` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| expenses_category_id_foreign | category_id | NO | BTREE |
| expenses_company_id_foreign | company_id | NO | BTREE |
| expenses_created_by_foreign | created_by | NO | BTREE |
| expenses_currency_id_foreign | currency_id | NO | BTREE |
| expenses_expenses_recurring_id_foreign | expenses_recurring_id | NO | BTREE |
| expenses_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| expenses_category_id_foreign | category_id | expenses_category.id |
| expenses_company_id_foreign | company_id | companies.id |
| expenses_created_by_foreign | created_by | users.id |
| expenses_currency_id_foreign | currency_id | currencies.id |
| expenses_expenses_recurring_id_foreign | expenses_recurring_id | expenses_recurring.id |
| expenses_user_id_foreign | user_id | users.id |

---

## expenses_category

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `category_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| expenses_category_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| expenses_category_company_id_foreign | company_id | companies.id |

---

## expenses_category_roles

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `expenses_category_id` | bigint unsigned | YES | NULL | MUL |  |
| `role_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| expenses_category_roles_company_id_foreign | company_id | NO | BTREE |
| expenses_category_roles_expenses_category_id_foreign | expenses_category_id | NO | BTREE |
| expenses_category_roles_role_id_foreign | role_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| expenses_category_roles_company_id_foreign | company_id | companies.id |
| expenses_category_roles_expenses_category_id_foreign | expenses_category_id | expenses_category.id |
| expenses_category_roles_role_id_foreign | role_id | roles.id |

---

## expenses_recurring

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `category_id` | bigint unsigned | YES | NULL | MUL |  |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `project_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | YES | NULL | MUL |  |
| `created_by` | int unsigned | YES | NULL | MUL |  |
| `item_name` | varchar(191) | NO | NULL |  |  |
| `day_of_month` | int | YES | 1 |  |  |
| `day_of_week` | int | YES | 1 |  |  |
| `payment_method` | varchar(191) | YES | NULL |  |  |
| `rotation` | enum('monthly','weekly','bi-weekly','quarterly','half-yearly','annually','daily') | NO | NULL |  |  |
| `billing_cycle` | int | YES | NULL |  |  |
| `unlimited_recurring` | tinyint(1) | NO | 0 |  |  |
| `price` | double | NO | NULL |  |  |
| `bill` | varchar(191) | YES | NULL |  |  |
| `status` | enum('active','inactive') | NO | active |  |  |
| `description` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| expenses_recurring_category_id_foreign | category_id | NO | BTREE |
| expenses_recurring_company_id_foreign | company_id | NO | BTREE |
| expenses_recurring_created_by_foreign | created_by | NO | BTREE |
| expenses_recurring_currency_id_foreign | currency_id | NO | BTREE |
| expenses_recurring_project_id_foreign | project_id | NO | BTREE |
| expenses_recurring_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| expenses_recurring_category_id_foreign | category_id | expenses_category.id |
| expenses_recurring_company_id_foreign | company_id | companies.id |
| expenses_recurring_created_by_foreign | created_by | users.id |
| expenses_recurring_currency_id_foreign | currency_id | currencies.id |
| expenses_recurring_project_id_foreign | project_id | projects.id |
| expenses_recurring_user_id_foreign | user_id | users.id |

---

## failed_jobs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `connection` | text | NO | NULL |  |  |
| `queue` | text | NO | NULL |  |  |
| `payload` | longtext | NO | NULL |  |  |
| `exception` | longtext | NO | NULL |  |  |
| `failed_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## faq_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## faq_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `faq_id` | int unsigned | NO | NULL | MUL |  |
| `filename` | varchar(191) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `google_url` | varchar(191) | YES | NULL |  |  |
| `hashname` | varchar(191) | YES | NULL |  |  |
| `size` | varchar(191) | YES | NULL |  |  |
| `dropbox_link` | varchar(191) | YES | NULL |  |  |
| `external_link` | varchar(191) | YES | NULL |  |  |
| `external_link_name` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| faq_files_faq_id_foreign | faq_id | NO | BTREE |
| faq_files_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| faq_files_faq_id_foreign | faq_id | faqs.id |
| faq_files_user_id_foreign | user_id | users.id |

---

## faqs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `title` | varchar(191) | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `faq_category_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `image` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| faqs_faq_category_id_foreign | faq_category_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| faqs_faq_category_id_foreign | faq_category_id | faq_categories.id |

---

## features

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `language_setting_id` | int unsigned | YES | NULL | MUL |  |
| `title` | varchar(191) | NO | NULL |  |  |
| `description` | longtext | YES | NULL |  |  |
| `image` | varchar(200) | YES | NULL |  |  |
| `icon` | varchar(200) | YES | NULL |  |  |
| `type` | enum('image','icon','task','bills','team','apps') | NO | image |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `front_feature_id` | bigint unsigned | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| features_front_feature_id_foreign | front_feature_id | NO | BTREE |
| features_language_setting_id_foreign | language_setting_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| features_front_feature_id_foreign | front_feature_id | front_features.id |
| features_language_setting_id_foreign | language_setting_id | language_settings.id |

---

## file_storage

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `path` | varchar(191) | NO | NULL |  |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `type` | varchar(50) | YES | NULL |  |  |
| `size` | int unsigned | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| file_storage_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| file_storage_company_id_foreign | company_id | companies.id |

---

## file_storage_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `filesystem` | varchar(191) | NO | NULL |  |  |
| `auth_keys` | text | YES | NULL |  |  |
| `status` | enum('enabled','disabled') | NO | disabled |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| file_storage_settings_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| file_storage_settings_company_id_foreign | company_id | companies.id |

---

## footer_menu

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `language_setting_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `slug` | varchar(191) | NO | NULL |  |  |
| `description` | longtext | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `video_link` | varchar(191) | YES | NULL |  |  |
| `video_embed` | text | YES | NULL |  |  |
| `file_name` | varchar(191) | YES | NULL |  |  |
| `hash_name` | varchar(191) | YES | NULL |  |  |
| `external_link` | varchar(191) | YES | NULL |  |  |
| `type` | enum('header','footer','both') | YES | footer |  |  |
| `status` | enum('active','inactive') | YES | active |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| footer_menu_language_setting_id_foreign | language_setting_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| footer_menu_language_setting_id_foreign | language_setting_id | language_settings.id |

---

## front_clients

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `language_setting_id` | int unsigned | YES | NULL | MUL |  |
| `title` | varchar(191) | YES | NULL |  |  |
| `image` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| front_clients_language_setting_id_foreign | language_setting_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| front_clients_language_setting_id_foreign | language_setting_id | language_settings.id |

---

## front_details

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `get_started_show` | enum('yes','no') | NO | yes |  |  |
| `sign_in_show` | enum('yes','no') | NO | yes |  |  |
| `address` | text | YES | NULL |  |  |
| `phone` | varchar(20) | YES | NULL |  |  |
| `email` | varchar(60) | YES | NULL |  |  |
| `social_links` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `primary_color` | varchar(191) | YES | NULL |  |  |
| `custom_css` | longtext | YES | NULL |  |  |
| `custom_css_theme_two` | longtext | YES | NULL |  |  |
| `locale` | varchar(191) | YES | en |  |  |
| `contact_html` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## front_faqs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `language_setting_id` | int unsigned | YES | NULL | MUL |  |
| `question` | varchar(191) | NO | NULL |  |  |
| `answer` | text | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| front_faqs_language_setting_id_foreign | language_setting_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| front_faqs_language_setting_id_foreign | language_setting_id | language_settings.id |

---

## front_features

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `language_setting_id` | int unsigned | YES | NULL | MUL |  |
| `title` | varchar(191) | YES | NULL |  |  |
| `description` | varchar(191) | YES | NULL |  |  |
| `status` | enum('enable','disable') | NO | enable |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| front_features_language_setting_id_foreign | language_setting_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| front_features_language_setting_id_foreign | language_setting_id | language_settings.id |

---

## front_menu_buttons

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `language_setting_id` | int unsigned | YES | NULL | MUL |  |
| `home` | varchar(20) | YES | home |  |  |
| `feature` | varchar(20) | YES | feature |  |  |
| `price` | varchar(20) | YES | price |  |  |
| `contact` | varchar(20) | YES | contact |  |  |
| `get_start` | varchar(20) | YES | get_start |  |  |
| `login` | varchar(20) | YES | login |  |  |
| `contact_submit` | varchar(20) | YES | contact_submit |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| front_menu_buttons_language_setting_id_foreign | language_setting_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| front_menu_buttons_language_setting_id_foreign | language_setting_id | language_settings.id |

---

## front_widgets

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(191) | NO | NULL |  |  |
| `widget_code` | text | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gdpr_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `enable_gdpr` | tinyint(1) | NO | 0 |  |  |
| `show_customer_area` | tinyint(1) | NO | 0 |  |  |
| `show_customer_footer` | tinyint(1) | NO | 0 |  |  |
| `top_information_block` | longtext | YES | NULL |  |  |
| `enable_export` | tinyint(1) | NO | 0 |  |  |
| `data_removal` | tinyint(1) | NO | 0 |  |  |
| `lead_removal_public_form` | tinyint(1) | NO | 0 |  |  |
| `terms_customer_footer` | tinyint(1) | NO | 0 |  |  |
| `terms` | longtext | YES | NULL |  |  |
| `policy` | longtext | YES | NULL |  |  |
| `public_lead_edit` | tinyint(1) | NO | 0 |  |  |
| `consent_customer` | tinyint(1) | NO | 0 |  |  |
| `consent_leads` | tinyint(1) | NO | 0 |  |  |
| `consent_block` | longtext | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| gdpr_settings_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| gdpr_settings_company_id_foreign | company_id | companies.id |

---

## global_currencies

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `currency_name` | varchar(191) | NO | NULL |  |  |
| `currency_symbol` | varchar(191) | NO | NULL |  |  |
| `currency_code` | varchar(191) | NO | NULL |  |  |
| `exchange_rate` | double | YES | NULL |  |  |
| `usd_price` | double | YES | NULL |  |  |
| `is_cryptocurrency` | enum('yes','no') | NO | no |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `deleted_at` | timestamp | YES | NULL |  |  |
| `currency_position` | enum('front','behind') | NO | front |  |  |
| `status` | enum('enable','disable') | NO | enable |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## global_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `timezone` | varchar(191) | NO | Asia/Kolkata |  |  |
| `locale` | varchar(191) | NO | en |  |  |
| `company_name` | varchar(191) | NO | NULL |  |  |
| `company_email` | varchar(191) | NO | NULL |  |  |
| `company_phone` | varchar(191) | YES | NULL |  |  |
| `logo` | varchar(191) | YES | NULL |  |  |
| `login_background` | varchar(191) | YES | NULL |  |  |
| `address` | text | NO | NULL |  |  |
| `website` | varchar(191) | YES | NULL |  |  |
| `last_updated_by` | int unsigned | YES | NULL | MUL |  |
| `front_design` | tinyint(1) | NO | 1 |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `google_map_key` | varchar(191) | NO | NULL |  |  |
| `currency_converter_key` | varchar(191) | NO | NULL |  |  |
| `google_captcha_version` | varchar(191) | NO | v2 |  |  |
| `google_recaptcha_key` | text | YES | NULL |  |  |
| `google_recaptcha_secret` | text | YES | NULL |  |  |
| `purchase_code` | varchar(100) | YES | NULL |  |  |
| `supported_until` | timestamp | YES | NULL |  |  |
| `hide_cron_message` | tinyint(1) | NO | 0 |  |  |
| `week_start` | int | NO | 1 |  |  |
| `system_update` | tinyint(1) | NO | 1 |  |  |
| `email_verification` | tinyint(1) | NO | 1 |  |  |
| `logo_background_color` | varchar(191) | NO | #171e28 |  |  |
| `currency_key_version` | varchar(191) | NO | free |  |  |
| `show_review_modal` | tinyint(1) | NO | 1 |  |  |
| `logo_front` | varchar(191) | YES | NULL |  |  |
| `login_ui` | tinyint(1) | NO | NULL |  |  |
| `active_theme` | enum('default','custom') | NO | default |  |  |
| `auth_css` | longtext | YES | NULL |  |  |
| `auth_css_theme_two` | longtext | YES | NULL |  |  |
| `new_company_locale` | varchar(191) | YES | NULL |  |  |
| `frontend_disable` | tinyint(1) | NO | 0 |  |  |
| `google_recaptcha_status` | tinyint(1) | NO | 0 |  |  |
| `setup_homepage` | varchar(191) | NO | default |  |  |
| `custom_homepage_url` | varchar(191) | YES | NULL |  |  |
| `app_debug` | tinyint(1) | NO | 0 |  |  |
| `expired_message` | text | YES | NULL |  |  |
| `show_update_popup` | tinyint(1) | NO | 1 |  |  |
| `favicon` | varchar(191) | YES | NULL |  |  |
| `enable_register` | tinyint(1) | NO | 1 |  |  |
| `last_cron_run` | timestamp | YES | NULL |  |  |
| `rtl` | tinyint(1) | NO | 0 |  |  |
| `registration_open` | tinyint(1) | NO | 1 |  |  |
| `google_calendar_status` | enum('active','inactive') | NO | inactive |  |  |
| `google_client_id` | text | YES | NULL |  |  |
| `google_client_secret` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| global_settings_currency_id_foreign | currency_id | NO | BTREE |
| global_settings_last_updated_by_foreign | last_updated_by | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| global_settings_currency_id_foreign | currency_id | global_currencies.id |
| global_settings_last_updated_by_foreign | last_updated_by | users.id |

---

## google_accounts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `google_id` | varchar(191) | YES | NULL |  |  |
| `name` | varchar(191) | YES | NULL |  |  |
| `token` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| google_accounts_company_id_foreign | company_id | NO | BTREE |
| google_accounts_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| google_accounts_company_id_foreign | company_id | companies.id |
| google_accounts_user_id_foreign | user_id | users.id |

---

## google_calendar_modules

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `lead_status` | tinyint(1) | NO | 0 |  |  |
| `leave_status` | tinyint(1) | NO | 0 |  |  |
| `invoice_status` | tinyint(1) | NO | 0 |  |  |
| `contract_status` | tinyint(1) | NO | 0 |  |  |
| `task_status` | tinyint(1) | NO | 0 |  |  |
| `event_status` | tinyint(1) | NO | 0 |  |  |
| `holiday_status` | tinyint(1) | NO | 0 |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| google_calendar_modules_company_id_foreign | company_id | NO | BTREE |
| google_calendar_modules_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| google_calendar_modules_company_id_foreign | company_id | companies.id |
| google_calendar_modules_user_id_foreign | user_id | users.id |

---

## holidays

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `date` | date | NO | NULL |  |  |
| `occassion` | varchar(100) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `event_id` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| holidays_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| holidays_company_id_foreign | company_id | companies.id |

---

## invoice_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `invoice_id` | int unsigned | NO | NULL | MUL |  |
| `item_name` | varchar(191) | NO | NULL |  |  |
| `item_summary` | text | YES | NULL |  |  |
| `type` | enum('item','discount','tax') | NO | item |  |  |
| `quantity` | double(16,2) | NO | NULL |  |  |
| `unit_price` | double(16,2) | NO | NULL |  |  |
| `amount` | double(16,2) | NO | NULL |  |  |
| `taxes` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `hsn_sac_code` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| invoice_items_invoice_id_foreign | invoice_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| invoice_items_invoice_id_foreign | invoice_id | invoices.id |

---

## invoice_recurring

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `project_id` | int unsigned | YES | NULL | MUL |  |
| `client_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | YES | NULL | MUL |  |
| `created_by` | int unsigned | YES | NULL | MUL |  |
| `issue_date` | date | NO | NULL |  |  |
| `due_date` | date | NO | NULL |  |  |
| `sub_total` | double | NO | 0 |  |  |
| `total` | double | NO | 0 |  |  |
| `discount` | double | NO | 0 |  |  |
| `discount_type` | enum('percent','fixed') | NO | percent |  |  |
| `status` | enum('active','inactive') | NO | active |  |  |
| `file` | varchar(191) | YES | NULL |  |  |
| `file_original_name` | varchar(191) | YES | NULL |  |  |
| `note` | text | YES | NULL |  |  |
| `show_shipping_address` | enum('yes','no') | NO | no |  |  |
| `day_of_month` | int | YES | 1 |  |  |
| `day_of_week` | int | YES | 1 |  |  |
| `payment_method` | varchar(191) | YES | NULL |  |  |
| `rotation` | enum('monthly','weekly','bi-weekly','quarterly','half-yearly','annually','daily') | NO | NULL |  |  |
| `billing_cycle` | int | YES | NULL |  |  |
| `unlimited_recurring` | tinyint(1) | NO | 0 |  |  |
| `client_can_stop` | tinyint(1) | NO | 1 |  |  |
| `deleted_at` | datetime | YES | NULL |  |  |
| `shipping_address` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| invoice_recurring_client_id_foreign | client_id | NO | BTREE |
| invoice_recurring_company_id_foreign | company_id | NO | BTREE |
| invoice_recurring_created_by_foreign | created_by | NO | BTREE |
| invoice_recurring_currency_id_foreign | currency_id | NO | BTREE |
| invoice_recurring_project_id_foreign | project_id | NO | BTREE |
| invoice_recurring_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| invoice_recurring_client_id_foreign | client_id | users.id |
| invoice_recurring_company_id_foreign | company_id | companies.id |
| invoice_recurring_created_by_foreign | created_by | users.id |
| invoice_recurring_currency_id_foreign | currency_id | currencies.id |
| invoice_recurring_project_id_foreign | project_id | projects.id |
| invoice_recurring_user_id_foreign | user_id | users.id |

---

## invoice_recurring_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `invoice_recurring_id` | bigint unsigned | NO | NULL | MUL |  |
| `item_name` | varchar(191) | NO | NULL |  |  |
| `quantity` | double | NO | NULL |  |  |
| `unit_price` | double | NO | NULL |  |  |
| `amount` | double | NO | NULL |  |  |
| `taxes` | text | YES | NULL |  |  |
| `type` | enum('item','discount','tax') | NO | item |  |  |
| `item_summary` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `hsn_sac_code` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| invoice_recurring_items_invoice_recurring_id_foreign | invoice_recurring_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| invoice_recurring_items_invoice_recurring_id_foreign | invoice_recurring_id | invoice_recurring.id |

---

## invoice_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `invoice_prefix` | varchar(191) | NO | NULL |  |  |
| `invoice_digit` | int unsigned | NO | 3 |  |  |
| `estimate_prefix` | varchar(191) | NO | EST |  |  |
| `estimate_digit` | int unsigned | NO | 3 |  |  |
| `credit_note_prefix` | varchar(191) | NO | CN |  |  |
| `credit_note_digit` | int unsigned | NO | 3 |  |  |
| `template` | varchar(191) | NO | NULL |  |  |
| `due_after` | int | NO | NULL |  |  |
| `invoice_terms` | text | NO | NULL |  |  |
| `estimate_terms` | text | YES | NULL |  |  |
| `gst_number` | varchar(191) | YES | NULL |  |  |
| `show_gst` | enum('yes','no') | YES | no |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `logo` | varchar(80) | YES | NULL |  |  |
| `hsn_sac_code_show` | tinyint(1) | NO | 1 |  |  |
| `locale` | varchar(191) | YES | en |  |  |
| `send_reminder` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| invoice_settings_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| invoice_settings_company_id_foreign | company_id | companies.id |

---

## invoices

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `project_id` | int unsigned | YES | NULL | MUL |  |
| `client_id` | int unsigned | YES | NULL | MUL |  |
| `invoice_number` | varchar(191) | NO | NULL |  |  |
| `issue_date` | date | NO | NULL |  |  |
| `due_date` | date | NO | NULL |  |  |
| `sub_total` | double(16,2) | NO | NULL |  |  |
| `discount` | double | NO | 0 |  |  |
| `discount_type` | enum('percent','fixed') | NO | percent |  |  |
| `total` | double(16,2) | NO | NULL |  |  |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `status` | enum('paid','unpaid','partial','canceled','draft','review') | NO | unpaid |  |  |
| `recurring` | enum('yes','no') | NO | no |  |  |
| `billing_cycle` | int | YES | NULL |  |  |
| `billing_interval` | int | YES | NULL |  |  |
| `billing_frequency` | varchar(191) | YES | NULL |  |  |
| `file` | varchar(191) | YES | NULL |  |  |
| `file_original_name` | varchar(191) | YES | NULL |  |  |
| `note` | text | YES | NULL |  |  |
| `credit_note` | tinyint(1) | NO | 0 |  |  |
| `show_shipping_address` | enum('yes','no') | NO | no |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `deleted_at` | timestamp | YES | NULL |  |  |
| `estimate_id` | int unsigned | YES | NULL | MUL |  |
| `send_status` | tinyint(1) | NO | 1 |  |  |
| `invoice_recurring_id` | bigint unsigned | YES | NULL | MUL |  |
| `created_by` | int unsigned | YES | NULL | MUL |  |
| `event_id` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| invoices_client_id_foreign | client_id | NO | BTREE |
| invoices_company_id_foreign | company_id | NO | BTREE |
| invoices_created_by_foreign | created_by | NO | BTREE |
| invoices_currency_id_foreign | currency_id | NO | BTREE |
| invoices_estimate_id_foreign | estimate_id | NO | BTREE |
| invoices_invoice_recurring_id_foreign | invoice_recurring_id | NO | BTREE |
| invoices_project_id_foreign | project_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| invoices_client_id_foreign | client_id | users.id |
| invoices_company_id_foreign | company_id | companies.id |
| invoices_created_by_foreign | created_by | users.id |
| invoices_currency_id_foreign | currency_id | currencies.id |
| invoices_estimate_id_foreign | estimate_id | estimates.id |
| invoices_invoice_recurring_id_foreign | invoice_recurring_id | invoice_recurring.id |
| invoices_project_id_foreign | project_id | projects.id |

---

## issues

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `description` | mediumtext | NO | NULL |  |  |
| `user_id` | int unsigned | YES | NULL | MUL |  |
| `project_id` | int unsigned | YES | NULL | MUL |  |
| `status` | enum('pending','resolved') | NO | pending |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| issues_project_id_foreign | project_id | NO | BTREE |
| issues_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| issues_project_id_foreign | project_id | projects.id |
| issues_user_id_foreign | user_id | users.id |

---

## jobs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `queue` | varchar(191) | NO | NULL | MUL |  |
| `payload` | longtext | NO | NULL |  |  |
| `attempts` | tinyint unsigned | NO | NULL |  |  |
| `reserved_at` | int unsigned | YES | NULL |  |  |
| `available_at` | int unsigned | NO | NULL |  |  |
| `created_at` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| jobs_queue_index | queue | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## language_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `language_code` | varchar(191) | NO | NULL |  |  |
| `language_name` | varchar(191) | NO | NULL |  |  |
| `status` | enum('enabled','disabled') | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## lead_agents

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `status` | enum('enabled','disabled') | NO | enabled |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| lead_agents_company_id_foreign | company_id | NO | BTREE |
| lead_agents_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| lead_agents_company_id_foreign | company_id | companies.id |
| lead_agents_user_id_foreign | user_id | users.id |

---

## lead_category

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `category_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `company_id` | int unsigned | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| lead_category_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| lead_category_company_id_foreign | company_id | companies.id |

---

## lead_custom_forms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `field_display_name` | varchar(191) | NO | NULL |  |  |
| `field_name` | varchar(191) | NO | NULL |  |  |
| `field_order` | int | NO | NULL |  |  |
| `status` | enum('active','inactive') | NO | active |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `required` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| lead_custom_forms_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| lead_custom_forms_company_id_foreign | company_id | companies.id |

---

## lead_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `lead_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `filename` | varchar(200) | NO | NULL |  |  |
| `hashname` | varchar(200) | NO | NULL |  |  |
| `size` | varchar(200) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `google_url` | varchar(191) | YES | NULL |  |  |
| `dropbox_link` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| lead_files_company_id_foreign | company_id | NO | BTREE |
| lead_files_lead_id_foreign | lead_id | NO | BTREE |
| lead_files_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| lead_files_company_id_foreign | company_id | companies.id |
| lead_files_lead_id_foreign | lead_id | leads.id |
| lead_files_user_id_foreign | user_id | users.id |

---

## lead_follow_up

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `lead_id` | int unsigned | NO | NULL | MUL |  |
| `remark` | longtext | YES | NULL |  |  |
| `next_follow_up_date` | datetime | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `event_id` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| lead_follow_up_lead_id_foreign | lead_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| lead_follow_up_lead_id_foreign | lead_id | leads.id |

---

## lead_sources

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `type` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| lead_sources_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| lead_sources_company_id_foreign | company_id | companies.id |

---

## lead_status

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `type` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `priority` | int | NO | NULL |  |  |
| `default` | tinyint(1) | NO | NULL |  |  |
| `label_color` | varchar(191) | NO | #ff0000 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| lead_status_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| lead_status_company_id_foreign | company_id | companies.id |

---

## leads

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `client_id` | int | YES | NULL |  |  |
| `source_id` | int | YES | NULL |  |  |
| `status_id` | int | YES | NULL |  |  |
| `column_priority` | int | NO | NULL |  |  |
| `agent_id` | bigint unsigned | YES | NULL | MUL |  |
| `company_name` | varchar(191) | YES | NULL |  |  |
| `website` | varchar(191) | YES | NULL |  |  |
| `address` | text | YES | NULL |  |  |
| `office_phone` | varchar(191) | YES | NULL |  |  |
| `city` | varchar(191) | YES | NULL |  |  |
| `state` | varchar(191) | YES | NULL |  |  |
| `country` | varchar(191) | YES | NULL |  |  |
| `postal_code` | varchar(191) | YES | NULL |  |  |
| `client_name` | varchar(191) | NO | NULL |  |  |
| `client_email` | varchar(191) | NO | NULL |  |  |
| `mobile` | varchar(191) | YES | NULL |  |  |
| `note` | text | YES | NULL |  |  |
| `next_follow_up` | enum('yes','no') | NO | yes |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `value` | double | YES | 0 |  |  |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `category_id` | int unsigned | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| leads_agent_id_foreign | agent_id | NO | BTREE |
| leads_category_id_foreign | category_id | NO | BTREE |
| leads_company_id_foreign | company_id | NO | BTREE |
| leads_currency_id_foreign | currency_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| leads_agent_id_foreign | agent_id | lead_agents.id |
| leads_category_id_foreign | category_id | lead_category.id |
| leads_company_id_foreign | company_id | companies.id |
| leads_currency_id_foreign | currency_id | currencies.id |

---

## leave_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `type_name` | varchar(191) | NO | NULL |  |  |
| `color` | varchar(191) | NO | NULL |  |  |
| `no_of_leaves` | int | NO | 5 |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `paid` | int | YES | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| leave_types_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| leave_types_company_id_foreign | company_id | companies.id |

---

## leaves

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `leave_type_id` | int unsigned | NO | NULL | MUL |  |
| `duration` | varchar(191) | NO | NULL |  |  |
| `leave_date` | date | NO | NULL |  |  |
| `reason` | text | NO | NULL |  |  |
| `status` | enum('approved','pending','rejected') | NO | NULL |  |  |
| `reject_reason` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `paid` | tinyint(1) | NO | 0 |  |  |
| `event_id` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| leaves_company_id_foreign | company_id | NO | BTREE |
| leaves_leave_type_id_foreign | leave_type_id | NO | BTREE |
| leaves_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| leaves_company_id_foreign | company_id | companies.id |
| leaves_leave_type_id_foreign | leave_type_id | leave_types.id |
| leaves_user_id_foreign | user_id | users.id |

---

## licences

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `license_number` | char(29) | NO | NULL |  |  |
| `package_id` | int unsigned | YES | NULL | MUL |  |
| `company_name` | varchar(100) | NO | NULL |  |  |
| `email` | varchar(255) | NO | NULL |  |  |
| `contact_person` | varchar(70) | YES | NULL |  |  |
| `billing_name` | varchar(100) | YES | NULL |  |  |
| `billing_address` | varchar(255) | YES | NULL |  |  |
| `tax_number` | varchar(100) | YES | NULL |  |  |
| `expire_date` | date | YES | NULL |  |  |
| `last_payment_date` | date | YES | NULL |  |  |
| `next_payment_date` | date | YES | NULL |  |  |
| `status` | enum('valid','invalid') | NO | valid |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| licences_company_id_foreign | company_id | NO | BTREE |
| licences_package_id_foreign | package_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| licences_company_id_foreign | company_id | companies.id |
| licences_package_id_foreign | package_id | packages.id |

---

## log_time_for

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `log_time_for` | enum('project','task') | NO | project |  |  |
| `auto_timer_stop` | enum('yes','no') | NO | no |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `approval_required` | tinyint(1) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| log_time_for_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| log_time_for_company_id_foreign | company_id | companies.id |

---

## ltm_translations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `status` | int | NO | 0 |  |  |
| `locale` | varchar(191) | NO | NULL |  |  |
| `group` | varchar(191) | NO | NULL |  |  |
| `key` | varchar(191) | NO | NULL |  |  |
| `value` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## message_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `allow_client_admin` | enum('yes','no') | NO | no |  |  |
| `allow_client_employee` | enum('yes','no') | NO | no |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| message_settings_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| message_settings_company_id_foreign | company_id | companies.id |

---

## migrations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `migration` | varchar(191) | NO | NULL |  |  |
| `batch` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## module_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `module_name` | varchar(191) | NO | NULL |  |  |
| `status` | enum('active','deactive') | NO | NULL |  |  |
| `type` | enum('admin','employee','client') | NO | admin |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| module_settings_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| module_settings_company_id_foreign | company_id | companies.id |

---

## modules

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `module_name` | varchar(191) | NO | NULL |  |  |
| `description` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## mollie_invoices

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `package_id` | int unsigned | NO | NULL | MUL |  |
| `transaction_id` | varchar(191) | YES | NULL |  |  |
| `amount` | varchar(191) | YES | NULL |  |  |
| `package_type` | varchar(191) | YES | NULL |  |  |
| `pay_date` | date | YES | NULL |  |  |
| `next_pay_date` | date | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| mollie_invoices_company_id_foreign | company_id | NO | BTREE |
| mollie_invoices_package_id_foreign | package_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| mollie_invoices_company_id_foreign | company_id | companies.id |
| mollie_invoices_package_id_foreign | package_id | packages.id |

---

## mollie_subscriptions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `customer_id` | varchar(191) | YES | NULL |  |  |
| `subscription_id` | varchar(191) | YES | NULL |  |  |
| `ends_at` | timestamp | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| mollie_subscriptions_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| mollie_subscriptions_company_id_foreign | company_id | companies.id |

---

## notes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `notes_title` | varchar(191) | NO | NULL |  |  |
| `notes_type` | tinyint(1) | NO | 0 |  |  |
| `client_id` | int unsigned | YES | NULL | MUL |  |
| `ask_password` | tinyint(1) | NO | 0 |  |  |
| `note_details` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `is_client_show` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| notes_client_id_foreign | client_id | NO | BTREE |
| notes_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| notes_client_id_foreign | client_id | users.id |
| notes_company_id_foreign | company_id | companies.id |

---

## notice_views

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `notice_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `read` | tinyint(1) | NO | 0 |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| notice_views_company_id_foreign | company_id | NO | BTREE |
| notice_views_notice_id_foreign | notice_id | NO | BTREE |
| notice_views_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| notice_views_company_id_foreign | company_id | companies.id |
| notice_views_notice_id_foreign | notice_id | notices.id |
| notice_views_user_id_foreign | user_id | users.id |

---

## notices

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `to` | varchar(191) | NO | employee |  |  |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `heading` | varchar(191) | NO | NULL |  |  |
| `description` | mediumtext | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `attachment` | varchar(191) | YES | NULL |  |  |
| `department_id` | int unsigned | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| notices_company_id_foreign | company_id | NO | BTREE |
| notices_department_id_foreign | department_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| notices_company_id_foreign | company_id | companies.id |
| notices_department_id_foreign | department_id | teams.id |

---

## notifications

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | char(36) | NO | NULL | PRI |  |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `type` | varchar(191) | NO | NULL |  |  |
| `notifiable_type` | varchar(191) | NO | NULL | MUL |  |
| `notifiable_id` | bigint unsigned | NO | NULL |  |  |
| `data` | text | NO | NULL |  |  |
| `read_at` | timestamp | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| notifications_company_id_foreign | company_id | NO | BTREE |
| notifications_notifiable_type_notifiable_id_index | notifiable_type | NO | BTREE |
| notifications_notifiable_type_notifiable_id_index | notifiable_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| notifications_company_id_foreign | company_id | companies.id |

---

## offline_invoice_payments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `invoice_id` | int unsigned | NO | NULL | MUL |  |
| `client_id` | int unsigned | NO | NULL | MUL |  |
| `payment_method_id` | int unsigned | NO | NULL | MUL |  |
| `slip` | varchar(191) | NO | NULL |  |  |
| `description` | longtext | NO | NULL |  |  |
| `status` | enum('pending','approve','reject') | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| offline_invoice_payments_client_id_foreign | client_id | NO | BTREE |
| offline_invoice_payments_invoice_id_foreign | invoice_id | NO | BTREE |
| offline_invoice_payments_payment_method_id_foreign | payment_method_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| offline_invoice_payments_client_id_foreign | client_id | users.id |
| offline_invoice_payments_invoice_id_foreign | invoice_id | invoices.id |
| offline_invoice_payments_payment_method_id_foreign | payment_method_id | offline_payment_methods.id |

---

## offline_invoices

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `package_id` | int unsigned | NO | NULL | MUL |  |
| `package_type` | varchar(191) | YES | NULL |  |  |
| `offline_method_id` | int unsigned | YES | NULL | MUL |  |
| `transaction_id` | varchar(191) | YES | NULL |  |  |
| `amount` | decimal(12,2) unsigned | NO | NULL |  |  |
| `pay_date` | date | NO | NULL |  |  |
| `next_pay_date` | date | YES | NULL |  |  |
| `status` | enum('paid','unpaid','pending') | NO | pending |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| offline_invoices_company_id_foreign | company_id | NO | BTREE |
| offline_invoices_offline_method_id_foreign | offline_method_id | NO | BTREE |
| offline_invoices_package_id_foreign | package_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| offline_invoices_company_id_foreign | company_id | companies.id |
| offline_invoices_offline_method_id_foreign | offline_method_id | offline_payment_methods.id |
| offline_invoices_package_id_foreign | package_id | packages.id |

---

## offline_payment_methods

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `description` | longtext | YES | NULL |  |  |
| `status` | enum('yes','no') | YES | yes |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| offline_payment_methods_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| offline_payment_methods_company_id_foreign | company_id | companies.id |

---

## offline_plan_changes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `package_id` | int unsigned | NO | NULL | MUL |  |
| `package_type` | varchar(191) | NO | NULL |  |  |
| `invoice_id` | bigint unsigned | NO | NULL | MUL |  |
| `offline_method_id` | int unsigned | NO | NULL | MUL |  |
| `file_name` | varchar(191) | YES | NULL |  |  |
| `status` | enum('verified','pending','rejected') | NO | pending |  |  |
| `description` | mediumtext | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| offline_plan_changes_company_id_foreign | company_id | NO | BTREE |
| offline_plan_changes_invoice_id_foreign | invoice_id | NO | BTREE |
| offline_plan_changes_offline_method_id_foreign | offline_method_id | NO | BTREE |
| offline_plan_changes_package_id_foreign | package_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| offline_plan_changes_company_id_foreign | company_id | companies.id |
| offline_plan_changes_invoice_id_foreign | invoice_id | offline_invoices.id |
| offline_plan_changes_offline_method_id_foreign | offline_method_id | offline_payment_methods.id |
| offline_plan_changes_package_id_foreign | package_id | packages.id |

---

## package_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `status` | enum('active','inactive') | NO | inactive |  |  |
| `no_of_days` | int | YES | 30 |  |  |
| `modules` | varchar(1000) | YES | NULL |  |  |
| `trial_message` | text | YES | NULL |  |  |
| `notification_before` | int | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## packages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(255) | NO | NULL |  |  |
| `description` | varchar(1000) | YES | NULL |  |  |
| `max_storage_size` | varchar(255) | YES | -1 |  |  |
| `max_file_size` | int unsigned | YES | NULL |  |  |
| `annual_price` | decimal(10,0) unsigned | YES | NULL |  |  |
| `monthly_price` | decimal(10,0) unsigned | YES | NULL |  |  |
| `billing_cycle` | tinyint unsigned | YES | NULL |  |  |
| `max_employees` | int unsigned | NO | 0 |  |  |
| `sort` | int | YES | NULL |  |  |
| `module_in_package` | varchar(1000) | NO | NULL |  |  |
| `stripe_annual_plan_id` | varchar(191) | YES | NULL |  |  |
| `razorpay_annual_plan_id` | varchar(191) | YES | NULL |  |  |
| `razorpay_monthly_plan_id` | varchar(191) | YES | NULL |  |  |
| `stripe_monthly_plan_id` | varchar(191) | YES | NULL |  |  |
| `paystack_monthly_plan_id` | varchar(191) | YES | NULL |  |  |
| `paystack_annual_plan_id` | varchar(191) | YES | NULL |  |  |
| `default` | enum('yes','no','trial') | YES | no |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `is_private` | tinyint(1) | NO | NULL |  |  |
| `storage_unit` | enum('gb','mb') | NO | mb |  |  |
| `is_recommended` | tinyint(1) | NO | 0 |  |  |
| `is_free` | tinyint(1) | NO | 0 |  |  |
| `is_auto_renew` | tinyint(1) | NO | 0 |  |  |
| `monthly_status` | varchar(191) | YES | 1 |  |  |
| `annual_status` | varchar(191) | YES | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| packages_currency_id_foreign | currency_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| packages_currency_id_foreign | currency_id | global_currencies.id |

---

## password_resets

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `email` | varchar(191) | NO | NULL | MUL |  |
| `token` | varchar(191) | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| password_resets_email_index | email | NO | BTREE |
| password_resets_token_index | token | NO | BTREE |

---

## payfast_invoices

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `package_id` | int unsigned | YES | NULL | MUL |  |
| `m_payment_id` | varchar(191) | YES | NULL |  |  |
| `pf_payment_id` | varchar(191) | YES | NULL |  |  |
| `payfast_plan` | varchar(191) | YES | NULL |  |  |
| `amount` | varchar(191) | YES | NULL |  |  |
| `pay_date` | date | YES | NULL |  |  |
| `next_pay_date` | date | YES | NULL |  |  |
| `signature` | varchar(191) | YES | NULL |  |  |
| `token` | varchar(191) | YES | NULL |  |  |
| `status` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| payfast_invoices_company_id_foreign | company_id | NO | BTREE |
| payfast_invoices_package_id_foreign | package_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| payfast_invoices_company_id_foreign | company_id | companies.id |
| payfast_invoices_package_id_foreign | package_id | packages.id |

---

## payfast_subscriptions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `payfast_plan` | varchar(191) | YES | NULL |  |  |
| `quantity` | int | YES | NULL |  |  |
| `payfast_status` | enum('active','inactive') | NO | inactive |  |  |
| `ends_at` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| payfast_subscriptions_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| payfast_subscriptions_company_id_foreign | company_id | companies.id |

---

## payment_gateway_credentials

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `paypal_client_id` | varchar(191) | YES | NULL |  |  |
| `paypal_secret` | varchar(191) | YES | NULL |  |  |
| `paypal_status` | enum('active','deactive') | NO | deactive |  |  |
| `stripe_client_id` | varchar(191) | YES | NULL |  |  |
| `stripe_secret` | varchar(191) | YES | NULL |  |  |
| `stripe_webhook_secret` | varchar(191) | YES | NULL |  |  |
| `stripe_status` | enum('active','deactive') | NO | deactive |  |  |
| `razorpay_key` | varchar(191) | YES | NULL |  |  |
| `razorpay_secret` | varchar(191) | YES | NULL |  |  |
| `razorpay_webhook_secret` | varchar(191) | YES | NULL |  |  |
| `razorpay_status` | enum('active','deactive') | NO | deactive |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `paypal_mode` | enum('sandbox','live') | NO | sandbox |  |  |
| `paystack_client_id` | varchar(191) | YES | NULL |  |  |
| `paystack_secret` | varchar(191) | YES | NULL |  |  |
| `paystack_status` | enum('active','inactive') | YES | inactive |  |  |
| `paystack_merchant_email` | varchar(191) | YES | NULL |  |  |
| `paystack_payment_url` | varchar(191) | YES | https://api.paystack.co |  |  |
| `mollie_api_key` | varchar(191) | NO | NULL |  |  |
| `mollie_status` | enum('active','inactive') | NO | inactive |  |  |
| `authorize_api_login_id` | varchar(191) | YES | NULL |  |  |
| `authorize_transaction_key` | varchar(191) | YES | NULL |  |  |
| `authorize_environment` | varchar(191) | YES | NULL |  |  |
| `authorize_status` | enum('active','inactive') | NO | inactive |  |  |
| `payfast_key` | varchar(191) | YES | NULL |  |  |
| `payfast_secret` | varchar(191) | YES | NULL |  |  |
| `payfast_status` | enum('active','inactive') | NO | inactive |  |  |
| `payfast_salt_passphrase` | varchar(191) | YES | NULL |  |  |
| `payfast_mode` | enum('sandbox','live') | NO | sandbox |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| payment_gateway_credentials_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| payment_gateway_credentials_company_id_foreign | company_id | companies.id |

---

## payments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `project_id` | int unsigned | YES | NULL | MUL |  |
| `invoice_id` | int unsigned | YES | NULL | MUL |  |
| `amount` | double | NO | NULL |  |  |
| `gateway` | varchar(191) | YES | NULL |  |  |
| `transaction_id` | varchar(191) | YES | NULL | UNI |  |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `plan_id` | varchar(191) | YES | NULL | UNI |  |
| `customer_id` | varchar(191) | YES | NULL |  |  |
| `event_id` | varchar(191) | YES | NULL | UNI |  |
| `status` | enum('complete','pending') | NO | complete |  |  |
| `paid_on` | datetime | YES | NULL |  |  |
| `remarks` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `offline_method_id` | int unsigned | YES | NULL | MUL |  |
| `bill` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| payments_company_id_foreign | company_id | NO | BTREE |
| payments_currency_id_foreign | currency_id | NO | BTREE |
| payments_event_id_unique | event_id | YES | BTREE |
| payments_invoice_id_foreign | invoice_id | NO | BTREE |
| payments_offline_method_id_foreign | offline_method_id | NO | BTREE |
| payments_plan_id_unique | plan_id | YES | BTREE |
| payments_project_id_foreign | project_id | NO | BTREE |
| payments_transaction_id_unique | transaction_id | YES | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| payments_company_id_foreign | company_id | companies.id |
| payments_currency_id_foreign | currency_id | currencies.id |
| payments_invoice_id_foreign | invoice_id | invoices.id |
| payments_offline_method_id_foreign | offline_method_id | offline_payment_methods.id |
| payments_project_id_foreign | project_id | projects.id |

---

## paypal_invoices

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `package_id` | int unsigned | YES | NULL | MUL |  |
| `sub_total` | double | YES | NULL |  |  |
| `total` | double | YES | NULL |  |  |
| `transaction_id` | varchar(191) | YES | NULL |  |  |
| `remarks` | varchar(191) | YES | NULL |  |  |
| `billing_frequency` | varchar(191) | YES | NULL |  |  |
| `billing_interval` | int | YES | NULL |  |  |
| `paid_on` | datetime | YES | NULL |  |  |
| `next_pay_date` | datetime | YES | NULL |  |  |
| `recurring` | enum('yes','no') | YES | no |  |  |
| `status` | enum('paid','unpaid','pending') | YES | pending |  |  |
| `plan_id` | varchar(191) | YES | NULL |  |  |
| `event_id` | varchar(191) | YES | NULL |  |  |
| `end_on` | datetime | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| paypal_invoices_company_id_foreign | company_id | NO | BTREE |
| paypal_invoices_currency_id_foreign | currency_id | NO | BTREE |
| paypal_invoices_package_id_foreign | package_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| paypal_invoices_company_id_foreign | company_id | companies.id |
| paypal_invoices_package_id_foreign | package_id | packages.id |

---

## payroll_cycles

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `cycle` | varchar(191) | YES | NULL |  |  |
| `status` | enum('active','inactive') | NO | active |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## payroll_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `tds_salary` | varchar(191) | NO | 0 |  |  |
| `tds_status` | tinyint(1) | NO | NULL |  |  |
| `finance_month` | varchar(191) | NO | 04 |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `semi_monthly_start` | int | YES | 1 |  |  |
| `semi_monthly_end` | int | YES | 30 |  |  |
| `extra_fields` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| payroll_settings_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| payroll_settings_company_id_foreign | company_id | companies.id |

---

## paystack_invoices

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `package_id` | int unsigned | NO | NULL | MUL |  |
| `transaction_id` | varchar(191) | YES | NULL |  |  |
| `amount` | varchar(191) | YES | NULL |  |  |
| `pay_date` | date | YES | NULL |  |  |
| `next_pay_date` | date | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| paystack_invoices_company_id_foreign | company_id | NO | BTREE |
| paystack_invoices_package_id_foreign | package_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| paystack_invoices_company_id_foreign | company_id | companies.id |
| paystack_invoices_package_id_foreign | package_id | packages.id |

---

## paystack_subscriptions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `subscription_id` | varchar(191) | YES | NULL |  |  |
| `customer_id` | varchar(191) | YES | NULL |  |  |
| `token` | varchar(191) | NO | NULL |  |  |
| `plan_id` | varchar(191) | NO | NULL |  |  |
| `status` | enum('active','inactive') | NO | active |  |  |
| `ends_at` | timestamp | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| paystack_subscriptions_company_id_foreign | company_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| paystack_subscriptions_company_id_foreign | company_id | companies.id |

---

## permission_role

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `permission_id` | int unsigned | NO | NULL | PRI |  |
| `role_id` | int unsigned | NO | NULL | PRI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| permission_role_role_id_foreign | role_id | NO | BTREE |
| PRIMARY | permission_id | YES | BTREE |
| PRIMARY | role_id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| permission_role_permission_id_foreign | permission_id | permissions.id |
| permission_role_role_id_foreign | role_id | roles.id |

---

## permissions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(191) | NO | NULL | UNI |  |
| `display_name` | varchar(191) | YES | NULL |  |  |
| `description` | varchar(191) | YES | NULL |  |  |
| `module_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| permissions_module_id_foreign | module_id | NO | BTREE |
| permissions_name_unique | name | YES | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| permissions_module_id_foreign | module_id | modules.id |

---

## pinned

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `project_id` | int unsigned | YES | NULL | MUL |  |
| `task_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| pinned_company_id_foreign | company_id | NO | BTREE |
| pinned_project_id_foreign | project_id | NO | BTREE |
| pinned_task_id_foreign | task_id | NO | BTREE |
| pinned_user_id_foreign | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| pinned_company_id_foreign | company_id | companies.id |
| pinned_project_id_foreign | project_id | projects.id |
| pinned_task_id_foreign | task_id | tasks.id |
| pinned_user_id_foreign | user_id | users.id |

---

## product_category

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `category_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| product_category_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| product_category_company_id_foreign | company_id | companies.id |

---

## product_sub_category

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `category_id` | bigint unsigned | NO | NULL | MUL |  |
| `category_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| product_sub_category_category_id_foreign | category_id | NO | BTREE |
| product_sub_category_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| product_sub_category_category_id_foreign | category_id | product_category.id |
| product_sub_category_company_id_foreign | company_id | companies.id |

---

## products

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `price` | varchar(191) | NO | NULL |  |  |
| `taxes` | varchar(191) | YES | NULL |  |  |
| `allow_purchase` | tinyint(1) | NO | 0 |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `category_id` | bigint unsigned | YES | NULL | MUL |  |
| `sub_category_id` | bigint unsigned | YES | NULL | MUL |  |
| `hsn_sac_code` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| products_category_id_foreign | category_id | NO | BTREE |
| products_company_id_foreign | company_id | NO | BTREE |
| products_sub_category_id_foreign | sub_category_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| products_category_id_foreign | category_id | product_category.id |
| products_company_id_foreign | company_id | companies.id |
| products_sub_category_id_foreign | sub_category_id | product_sub_category.id |

---

## project_activity

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `project_id` | int unsigned | NO | NULL | MUL |  |
| `activity` | text | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_activity_company_id_foreign | company_id | NO | BTREE |
| project_activity_project_id_foreign | project_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_activity_company_id_foreign | company_id | companies.id |
| project_activity_project_id_foreign | project_id | projects.id |

---

## project_category

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `category_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_category_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_category_company_id_foreign | company_id | companies.id |

---

## project_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `project_id` | int unsigned | NO | NULL | MUL |  |
| `filename` | varchar(191) | NO | NULL |  |  |
| `hashname` | varchar(191) | YES | NULL |  |  |
| `size` | varchar(191) | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `google_url` | varchar(191) | YES | NULL |  |  |
| `dropbox_link` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `external_link_name` | varchar(191) | YES | NULL |  |  |
| `external_link` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_files_company_id_foreign | company_id | NO | BTREE |
| project_files_project_id_foreign | project_id | NO | BTREE |
| project_files_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_files_company_id_foreign | company_id | companies.id |
| project_files_project_id_foreign | project_id | projects.id |
| project_files_user_id_foreign | user_id | users.id |

---

## project_members

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `project_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `hourly_rate` | double(8,2) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_members_company_id_foreign | company_id | NO | BTREE |
| project_members_project_id_foreign | project_id | NO | BTREE |
| project_members_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_members_company_id_foreign | company_id | companies.id |
| project_members_project_id_foreign | project_id | projects.id |
| project_members_user_id_foreign | user_id | users.id |

---

## project_milestones

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `project_id` | int unsigned | YES | NULL | MUL |  |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `milestone_title` | varchar(191) | NO | NULL |  |  |
| `summary` | mediumtext | NO | NULL |  |  |
| `cost` | double(15,2) | NO | NULL |  |  |
| `status` | enum('complete','incomplete') | NO | incomplete |  |  |
| `due_date` | date | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `invoice_created` | tinyint(1) | NO | NULL |  |  |
| `invoice_id` | int | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_milestones_company_id_foreign | company_id | NO | BTREE |
| project_milestones_currency_id_foreign | currency_id | NO | BTREE |
| project_milestones_project_id_foreign | project_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_milestones_company_id_foreign | company_id | companies.id |
| project_milestones_currency_id_foreign | currency_id | currencies.id |
| project_milestones_project_id_foreign | project_id | projects.id |

---

## project_notes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `project_id` | int unsigned | YES | NULL | MUL |  |
| `notes_title` | varchar(191) | NO | NULL |  |  |
| `notes_type` | tinyint(1) | NO | 0 |  |  |
| `client_id` | int unsigned | YES | NULL | MUL |  |
| `ask_password` | tinyint(1) | NO | 0 |  |  |
| `note_details` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `is_client_show` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_notes_client_id_foreign | client_id | NO | BTREE |
| project_notes_company_id_foreign | company_id | NO | BTREE |
| project_notes_project_id_foreign | project_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_notes_client_id_foreign | client_id | users.id |
| project_notes_company_id_foreign | company_id | companies.id |
| project_notes_project_id_foreign | project_id | projects.id |

---

## project_ratings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `project_id` | int unsigned | NO | NULL | MUL |  |
| `rating` | double | NO | 0 |  |  |
| `comment` | text | YES | NULL |  |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_ratings_company_id_foreign | company_id | NO | BTREE |
| project_ratings_project_id_foreign | project_id | NO | BTREE |
| project_ratings_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_ratings_company_id_foreign | company_id | companies.id |
| project_ratings_project_id_foreign | project_id | projects.id |
| project_ratings_user_id_foreign | user_id | users.id |

---

## project_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `send_reminder` | enum('yes','no') | NO | NULL |  |  |
| `remind_time` | int | NO | NULL |  |  |
| `remind_type` | varchar(191) | NO | NULL |  |  |
| `remind_to` | varchar(191) | NO | ["admins","members"] |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_settings_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_settings_company_id_foreign | company_id | companies.id |

---

## project_template_members

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `project_template_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_template_members_project_template_id_foreign | project_template_id | NO | BTREE |
| project_template_members_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_template_members_project_template_id_foreign | project_template_id | project_templates.id |
| project_template_members_user_id_foreign | user_id | users.id |

---

## project_template_sub_tasks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `project_template_task_id` | int unsigned | NO | NULL | MUL |  |
| `title` | text | NO | NULL |  |  |
| `start_date` | datetime | YES | NULL |  |  |
| `due_date` | datetime | YES | NULL |  |  |
| `status` | enum('incomplete','complete') | NO | incomplete |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_template_sub_tasks_project_template_task_id_foreign | project_template_task_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_template_sub_tasks_project_template_task_id_foreign | project_template_task_id | project_template_tasks.id |

---

## project_template_task_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `project_template_task_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_template_task_users_project_template_task_id_foreign | project_template_task_id | NO | BTREE |
| project_template_task_users_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_template_task_users_project_template_task_id_foreign | project_template_task_id | project_template_tasks.id |
| project_template_task_users_user_id_foreign | user_id | users.id |

---

## project_template_tasks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `heading` | varchar(191) | NO | NULL |  |  |
| `description` | mediumtext | YES | NULL |  |  |
| `project_template_id` | int unsigned | NO | NULL | MUL |  |
| `priority` | enum('low','medium','high') | NO | medium |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `project_template_task_category_id` | int unsigned | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_template_tasks_project_template_id_foreign | project_template_id | NO | BTREE |
| project_template_tasks_project_template_task_category_id_foreign | project_template_task_category_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_template_tasks_project_template_id_foreign | project_template_id | project_templates.id |
| project_template_tasks_project_template_task_category_id_foreign | project_template_task_category_id | task_category.id |

---

## project_templates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `project_name` | varchar(191) | NO | NULL |  |  |
| `category_id` | int unsigned | YES | NULL | MUL |  |
| `client_id` | int unsigned | YES | NULL | MUL |  |
| `project_summary` | mediumtext | YES | NULL |  |  |
| `notes` | longtext | YES | NULL |  |  |
| `feedback` | mediumtext | YES | NULL |  |  |
| `client_view_task` | enum('enable','disable') | NO | disable |  |  |
| `allow_client_notification` | enum('enable','disable') | NO | disable |  |  |
| `manual_timelog` | enum('enable','disable') | NO | disable |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_templates_category_id_foreign | category_id | NO | BTREE |
| project_templates_client_id_foreign | client_id | NO | BTREE |
| project_templates_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_templates_category_id_foreign | category_id | project_category.id |
| project_templates_client_id_foreign | client_id | users.id |
| project_templates_company_id_foreign | company_id | companies.id |

---

## project_time_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `project_id` | int unsigned | YES | NULL | MUL |  |
| `task_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `start_time` | datetime | NO | NULL |  |  |
| `end_time` | datetime | YES | NULL |  |  |
| `memo` | text | NO | NULL |  |  |
| `total_hours` | varchar(191) | YES | NULL |  |  |
| `total_minutes` | varchar(191) | YES | NULL |  |  |
| `edited_by_user` | int unsigned | YES | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `hourly_rate` | int | NO | NULL |  |  |
| `earnings` | int | NO | NULL |  |  |
| `approved` | tinyint(1) | NO | 1 |  |  |
| `approved_by` | int unsigned | YES | NULL | MUL |  |
| `invoice_id` | int unsigned | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_time_logs_approved_by_foreign | approved_by | NO | BTREE |
| project_time_logs_company_id_foreign | company_id | NO | BTREE |
| project_time_logs_edited_by_user_foreign | edited_by_user | NO | BTREE |
| project_time_logs_invoice_id_foreign | invoice_id | NO | BTREE |
| project_time_logs_project_id_foreign | project_id | NO | BTREE |
| project_time_logs_task_id_foreign | task_id | NO | BTREE |
| project_time_logs_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_time_logs_approved_by_foreign | approved_by | users.id |
| project_time_logs_company_id_foreign | company_id | companies.id |
| project_time_logs_edited_by_user_foreign | edited_by_user | users.id |
| project_time_logs_invoice_id_foreign | invoice_id | invoices.id |
| project_time_logs_project_id_foreign | project_id | projects.id |
| project_time_logs_task_id_foreign | task_id | tasks.id |
| project_time_logs_user_id_foreign | user_id | users.id |

---

## project_user_notes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `project_notes_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| project_user_notes_company_id_foreign | company_id | NO | BTREE |
| project_user_notes_project_notes_id_foreign | project_notes_id | NO | BTREE |
| project_user_notes_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| project_user_notes_company_id_foreign | company_id | companies.id |
| project_user_notes_project_notes_id_foreign | project_notes_id | project_notes.id |
| project_user_notes_user_id_foreign | user_id | users.id |

---

## projects

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `project_name` | varchar(191) | NO | NULL |  |  |
| `project_summary` | mediumtext | YES | NULL |  |  |
| `project_admin` | int unsigned | YES | NULL | MUL |  |
| `start_date` | date | NO | NULL |  |  |
| `deadline` | date | YES | NULL |  |  |
| `notes` | longtext | YES | NULL |  |  |
| `category_id` | int unsigned | YES | NULL | MUL |  |
| `client_id` | int unsigned | YES | NULL | MUL |  |
| `feedback` | mediumtext | YES | NULL |  |  |
| `read_only` | enum('enable','disable') | NO | disable |  |  |
| `manual_timelog` | enum('enable','disable') | NO | disable |  |  |
| `client_view_task` | enum('enable','disable') | NO | disable |  |  |
| `allow_client_notification` | enum('enable','disable') | NO | disable |  |  |
| `completion_percent` | tinyint | NO | NULL |  |  |
| `calculate_task_progress` | enum('true','false') | NO | true |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `deleted_at` | timestamp | YES | NULL |  |  |
| `project_budget` | double(20,2) | YES | NULL |  |  |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `hours_allocated` | double(8,2) | YES | NULL |  |  |
| `status` | enum('not started','in progress','on hold','canceled','finished','under review') | NO | in progress |  |  |
| `visible_rating_employee` | tinyint(1) | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| projects_category_id_foreign | category_id | NO | BTREE |
| projects_client_id_foreign | client_id | NO | BTREE |
| projects_company_id_foreign | company_id | NO | BTREE |
| projects_currency_id_foreign | currency_id | NO | BTREE |
| projects_project_admin_foreign | project_admin | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| projects_category_id_foreign | category_id | project_category.id |
| projects_client_id_foreign | client_id | users.id |
| projects_company_id_foreign | company_id | companies.id |
| projects_currency_id_foreign | currency_id | currencies.id |
| projects_project_admin_foreign | project_admin | users.id |

---

## proposal_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `tax_id` | int unsigned | YES | NULL | MUL |  |
| `proposal_id` | int unsigned | NO | NULL | MUL |  |
| `item_name` | varchar(191) | NO | NULL |  |  |
| `type` | enum('item','discount','tax') | NO | item |  |  |
| `quantity` | double(16,2) | NO | NULL |  |  |
| `unit_price` | double(16,2) | NO | NULL |  |  |
| `amount` | double(16,2) | NO | NULL |  |  |
| `item_summary` | text | YES | NULL |  |  |
| `taxes` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `hsn_sac_code` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| proposal_items_proposal_id_foreign | proposal_id | NO | BTREE |
| proposal_items_tax_id_foreign | tax_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| proposal_items_proposal_id_foreign | proposal_id | proposals.id |
| proposal_items_tax_id_foreign | tax_id | taxes.id |

---

## proposal_signs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `proposal_id` | int unsigned | NO | NULL | MUL |  |
| `full_name` | varchar(191) | NO | NULL |  |  |
| `email` | varchar(191) | NO | NULL |  |  |
| `signature` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| proposal_signs_company_id_foreign | company_id | NO | BTREE |
| proposal_signs_proposal_id_foreign | proposal_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| proposal_signs_company_id_foreign | company_id | companies.id |
| proposal_signs_proposal_id_foreign | proposal_id | proposals.id |

---

## proposals

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `lead_id` | int unsigned | NO | NULL | MUL |  |
| `valid_till` | date | NO | NULL |  |  |
| `sub_total` | double(16,2) | NO | NULL |  |  |
| `total` | double(16,2) | NO | NULL |  |  |
| `currency_id` | int unsigned | YES | NULL | MUL |  |
| `status` | enum('declined','accepted','waiting','draft') | NO | waiting |  |  |
| `note` | mediumtext | YES | NULL |  |  |
| `description` | mediumtext | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `discount` | varchar(191) | NO | NULL |  |  |
| `invoice_convert` | tinyint(1) | NO | 0 |  |  |
| `discount_type` | varchar(191) | NO | NULL |  |  |
| `client_comment` | text | YES | NULL |  |  |
| `signature_approval` | tinyint(1) | NO | 1 |  |  |
| `send_status` | tinyint(1) | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| proposals_company_id_foreign | company_id | NO | BTREE |
| proposals_currency_id_foreign | currency_id | NO | BTREE |
| proposals_lead_id_foreign | lead_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| proposals_company_id_foreign | company_id | companies.id |
| proposals_currency_id_foreign | currency_id | currencies.id |
| proposals_lead_id_foreign | lead_id | leads.id |

---

## purpose_consent

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| purpose_consent_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| purpose_consent_company_id_foreign | company_id | companies.id |

---

## purpose_consent_leads

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `lead_id` | int unsigned | NO | NULL | MUL |  |
| `purpose_consent_id` | int unsigned | NO | NULL | MUL |  |
| `status` | enum('agree','disagree') | NO | agree |  |  |
| `ip` | varchar(191) | YES | NULL |  |  |
| `updated_by_id` | int unsigned | YES | NULL | MUL |  |
| `additional_description` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| purpose_consent_leads_lead_id_foreign | lead_id | NO | BTREE |
| purpose_consent_leads_purpose_consent_id_foreign | purpose_consent_id | NO | BTREE |
| purpose_consent_leads_updated_by_id_foreign | updated_by_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| purpose_consent_leads_lead_id_foreign | lead_id | leads.id |
| purpose_consent_leads_purpose_consent_id_foreign | purpose_consent_id | purpose_consent.id |
| purpose_consent_leads_updated_by_id_foreign | updated_by_id | users.id |

---

## purpose_consent_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `client_id` | int unsigned | NO | NULL | MUL |  |
| `purpose_consent_id` | int unsigned | NO | NULL | MUL |  |
| `status` | enum('agree','disagree') | NO | agree |  |  |
| `ip` | varchar(191) | YES | NULL |  |  |
| `updated_by_id` | int unsigned | NO | NULL | MUL |  |
| `additional_description` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| purpose_consent_users_client_id_foreign | client_id | NO | BTREE |
| purpose_consent_users_purpose_consent_id_foreign | purpose_consent_id | NO | BTREE |
| purpose_consent_users_updated_by_id_foreign | updated_by_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| purpose_consent_users_client_id_foreign | client_id | users.id |
| purpose_consent_users_purpose_consent_id_foreign | purpose_consent_id | purpose_consent.id |
| purpose_consent_users_updated_by_id_foreign | updated_by_id | users.id |

---

## push_notification_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `onesignal_app_id` | text | YES | NULL |  |  |
| `onesignal_rest_api_key` | text | YES | NULL |  |  |
| `notification_logo` | varchar(191) | YES | NULL |  |  |
| `status` | enum('active','inactive') | NO | inactive |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## push_subscriptions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `endpoint` | varchar(191) | NO | NULL | UNI |  |
| `public_key` | varchar(191) | YES | NULL |  |  |
| `auth_token` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| push_subscriptions_endpoint_unique | endpoint | YES | BTREE |
| push_subscriptions_user_id_index | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| push_subscriptions_user_id_foreign | user_id | users.id |

---

## pusher_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `pusher_app_id` | varchar(191) | YES | NULL |  |  |
| `pusher_app_key` | varchar(191) | YES | NULL |  |  |
| `pusher_app_secret` | varchar(191) | YES | NULL |  |  |
| `pusher_cluster` | varchar(191) | YES | NULL |  |  |
| `force_tls` | tinyint(1) | NO | NULL |  |  |
| `status` | tinyint(1) | NO | NULL |  |  |
| `message_status` | tinyint(1) | NO | 0 |  |  |
| `taskboard_status` | tinyint(1) | NO | 0 |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| pusher_settings_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| pusher_settings_company_id_foreign | company_id | companies.id |

---

## quotation_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `quotation_id` | int unsigned | NO | NULL | MUL |  |
| `item_name` | varchar(191) | NO | NULL |  |  |
| `quantity` | int | NO | NULL |  |  |
| `unit_price` | int | NO | NULL |  |  |
| `amount` | double(8,2) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `hsn_sac_code` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| quotation_items_quotation_id_foreign | quotation_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| quotation_items_quotation_id_foreign | quotation_id | quotations.id |

---

## quotations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `business_name` | varchar(191) | NO | NULL |  |  |
| `client_name` | varchar(191) | NO | NULL |  |  |
| `client_email` | varchar(191) | NO | NULL |  |  |
| `phone` | varchar(191) | YES | NULL |  |  |
| `address` | text | YES | NULL |  |  |
| `sub_total` | double(8,2) | NO | NULL |  |  |
| `total` | double(8,2) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## razorpay_invoices

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `currency_id` | int | YES | NULL |  |  |
| `invoice_id` | varchar(191) | NO | NULL |  |  |
| `subscription_id` | varchar(191) | NO | NULL |  |  |
| `order_id` | varchar(191) | YES | NULL |  |  |
| `package_id` | int unsigned | NO | NULL | MUL |  |
| `transaction_id` | varchar(191) | NO | NULL |  |  |
| `amount` | decimal(12,2) unsigned | NO | NULL |  |  |
| `pay_date` | date | NO | NULL |  |  |
| `next_pay_date` | date | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| razorpay_invoices_company_id_foreign | company_id | NO | BTREE |
| razorpay_invoices_package_id_foreign | package_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| razorpay_invoices_company_id_foreign | company_id | companies.id |
| razorpay_invoices_package_id_foreign | package_id | packages.id |

---

## razorpay_subscriptions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL |  |  |
| `subscription_id` | varchar(191) | YES | NULL |  |  |
| `customer_id` | varchar(191) | YES | NULL |  |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `razorpay_id` | varchar(191) | NO | NULL |  |  |
| `razorpay_plan` | varchar(191) | NO | NULL |  |  |
| `quantity` | int | NO | NULL |  |  |
| `trial_ends_at` | timestamp | YES | NULL |  |  |
| `ends_at` | timestamp | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## removal_requests

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `description` | varchar(191) | NO | NULL |  |  |
| `user_id` | int unsigned | YES | NULL | MUL |  |
| `status` | enum('pending','approved','rejected') | NO | pending |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| removal_requests_company_id_foreign | company_id | NO | BTREE |
| removal_requests_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| removal_requests_company_id_foreign | company_id | companies.id |
| removal_requests_user_id_foreign | user_id | users.id |

---

## removal_requests_lead

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `description` | varchar(191) | NO | NULL |  |  |
| `lead_id` | int unsigned | YES | NULL | MUL |  |
| `status` | enum('pending','approved','rejected') | NO | pending |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| removal_requests_lead_company_id_foreign | company_id | NO | BTREE |
| removal_requests_lead_lead_id_foreign | lead_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| removal_requests_lead_company_id_foreign | company_id | companies.id |
| removal_requests_lead_lead_id_foreign | lead_id | leads.id |

---

## rest_api_application_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(255) | NO | NULL |  |  |
| `app_key` | int | NO | NULL | UNI |  |
| `app_secret` | varchar(60) | YES | NULL |  |  |
| `authorized_employee_id` | int unsigned | YES | NULL | MUL |  |
| `status` | enum('enabled','disabled') | NO | enabled |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| rest_api_application_settings_app_key_unique | app_key | YES | BTREE |
| rest_api_application_settings_authorized_employee_id_foreign | authorized_employee_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| rest_api_application_settings_authorized_employee_id_foreign | authorized_employee_id | users.id |

---

## rest_api_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `purchase_code` | varchar(191) | YES | NULL |  |  |
| `supported_until` | timestamp | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `fcm_key` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## role_user

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `user_id` | int unsigned | NO | NULL | PRI |  |
| `role_id` | int unsigned | NO | NULL | PRI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | user_id | YES | BTREE |
| PRIMARY | role_id | YES | BTREE |
| role_user_role_id_foreign | role_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| role_user_role_id_foreign | role_id | roles.id |
| role_user_user_id_foreign | user_id | users.id |

---

## roles

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `display_name` | varchar(191) | YES | NULL |  |  |
| `description` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| roles_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| roles_company_id_foreign | company_id | companies.id |

---

## salary_components

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `component_name` | varchar(191) | NO | NULL |  |  |
| `component_type` | enum('earning','deduction') | NO | NULL |  |  |
| `component_value` | varchar(191) | NO | NULL |  |  |
| `value_type` | enum('fixed','percent') | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `weekly_value` | double | NO | 0 |  |  |
| `biweekly_value` | double | NO | 0 |  |  |
| `semimonthly_value` | double | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| salary_components_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| salary_components_company_id_foreign | company_id | companies.id |

---

## salary_group_components

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `salary_group_id` | bigint unsigned | NO | NULL | MUL |  |
| `salary_component_id` | bigint unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| salary_group_components_company_id_foreign | company_id | NO | BTREE |
| salary_group_components_salary_component_id_foreign | salary_component_id | NO | BTREE |
| salary_group_components_salary_group_id_foreign | salary_group_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| salary_group_components_company_id_foreign | company_id | companies.id |
| salary_group_components_salary_component_id_foreign | salary_component_id | salary_components.id |
| salary_group_components_salary_group_id_foreign | salary_group_id | salary_groups.id |

---

## salary_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `group_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| salary_groups_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| salary_groups_company_id_foreign | company_id | companies.id |

---

## salary_payment_methods

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `payment_method` | varchar(191) | NO | NULL |  |  |
| `default` | tinyint(1) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| salary_payment_methods_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| salary_payment_methods_company_id_foreign | company_id | companies.id |

---

## salary_slips

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `salary_group_id` | bigint unsigned | YES | NULL | MUL |  |
| `basic_salary` | varchar(191) | NO | 0 |  |  |
| `net_salary` | varchar(191) | NO | 0 |  |  |
| `month` | varchar(191) | NO | NULL |  |  |
| `year` | varchar(191) | NO | NULL |  |  |
| `paid_on` | date | YES | NULL |  |  |
| `status` | enum('generated','review','locked','paid') | NO | generated |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `salary_json` | text | YES | NULL |  |  |
| `extra_json` | text | YES | NULL |  |  |
| `expense_claims` | varchar(191) | NO | 0 |  |  |
| `pay_days` | int | NO | NULL |  |  |
| `salary_payment_method_id` | bigint unsigned | YES | NULL | MUL |  |
| `tds` | double(16,2) | NO | NULL |  |  |
| `monthly_salary` | double(16,2) | NO | NULL |  |  |
| `gross_salary` | double(16,2) | NO | NULL |  |  |
| `total_deductions` | double(16,2) | NO | NULL |  |  |
| `salary_from` | datetime | YES | NULL |  |  |
| `salary_to` | datetime | YES | NULL |  |  |
| `payroll_cycle_id` | bigint unsigned | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| salary_slips_company_id_foreign | company_id | NO | BTREE |
| salary_slips_payroll_cycle_id_foreign | payroll_cycle_id | NO | BTREE |
| salary_slips_salary_group_id_foreign | salary_group_id | NO | BTREE |
| salary_slips_salary_payment_method_id_foreign | salary_payment_method_id | NO | BTREE |
| salary_slips_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| salary_slips_company_id_foreign | company_id | companies.id |
| salary_slips_payroll_cycle_id_foreign | payroll_cycle_id | payroll_cycles.id |
| salary_slips_salary_group_id_foreign | salary_group_id | salary_groups.id |
| salary_slips_salary_payment_method_id_foreign | salary_payment_method_id | salary_payment_methods.id |
| salary_slips_user_id_foreign | user_id | users.id |

---

## salary_tds

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `salary_from` | double(16,2) | NO | NULL |  |  |
| `salary_to` | double(16,2) | NO | NULL |  |  |
| `salary_percent` | double(5,2) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| salary_tds_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| salary_tds_company_id_foreign | company_id | companies.id |

---

## seo_details

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `language_setting_id` | int unsigned | YES | NULL | MUL |  |
| `page_name` | varchar(191) | NO | NULL |  |  |
| `seo_title` | varchar(191) | YES | NULL |  |  |
| `seo_keywords` | text | YES | NULL |  |  |
| `seo_description` | varchar(191) | YES | NULL |  |  |
| `seo_author` | varchar(191) | YES | NULL |  |  |
| `og_image` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| seo_details_language_setting_id_foreign | language_setting_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| seo_details_language_setting_id_foreign | language_setting_id | language_settings.id |

---

## sign_up_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `language_setting_id` | int unsigned | YES | NULL | MUL |  |
| `message` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| sign_up_settings_language_setting_id_foreign | language_setting_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| sign_up_settings_language_setting_id_foreign | language_setting_id | language_settings.id |

---

## skills

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(200) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| skills_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| skills_company_id_foreign | company_id | companies.id |

---

## slack_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `slack_webhook` | text | YES | NULL |  |  |
| `slack_logo` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| slack_settings_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| slack_settings_company_id_foreign | company_id | companies.id |

---

## smtp_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `mail_driver` | varchar(191) | NO | smtp |  |  |
| `mail_host` | varchar(191) | NO | smtp.gmail.com |  |  |
| `mail_port` | varchar(191) | NO | 587 |  |  |
| `mail_username` | varchar(191) | NO | youremail@gmail.com |  |  |
| `mail_password` | varchar(191) | NO | your password |  |  |
| `mail_from_name` | varchar(191) | NO | your name |  |  |
| `mail_from_email` | varchar(191) | NO | from@email.com |  |  |
| `mail_encryption` | enum('tls','ssl') | YES | tls |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `verified` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## social_auth_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `facebook_client_id` | varchar(191) | YES | NULL |  |  |
| `facebook_secret_id` | varchar(191) | YES | NULL |  |  |
| `facebook_status` | enum('enable','disable') | NO | disable |  |  |
| `google_client_id` | varchar(191) | YES | NULL |  |  |
| `google_secret_id` | varchar(191) | YES | NULL |  |  |
| `google_status` | enum('enable','disable') | NO | disable |  |  |
| `twitter_client_id` | varchar(191) | YES | NULL |  |  |
| `twitter_secret_id` | varchar(191) | YES | NULL |  |  |
| `twitter_status` | enum('enable','disable') | NO | disable |  |  |
| `linkedin_client_id` | varchar(191) | YES | NULL |  |  |
| `linkedin_secret_id` | varchar(191) | YES | NULL |  |  |
| `linkedin_status` | enum('enable','disable') | NO | disable |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## socials

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | int unsigned | YES | NULL |  |  |
| `social_id` | text | NO | NULL |  |  |
| `social_service` | text | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## sticky_notes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `note_text` | mediumtext | NO | NULL |  |  |
| `colour` | enum('blue','yellow','red','gray','purple','green') | NO | blue |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| sticky_notes_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| sticky_notes_user_id_foreign | user_id | users.id |

---

## storage_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `filesystem` | varchar(191) | NO | local |  |  |
| `auth_keys` | text | YES | NULL |  |  |
| `status` | enum('enabled','disabled') | NO | disabled |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## stripe_invoices

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `invoice_id` | varchar(255) | YES | NULL |  |  |
| `package_id` | int unsigned | NO | NULL | MUL |  |
| `transaction_id` | varchar(255) | YES | NULL |  |  |
| `amount` | decimal(12,2) unsigned | NO | NULL |  |  |
| `pay_date` | date | NO | NULL |  |  |
| `next_pay_date` | date | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| stripe_invoices_company_id_foreign | company_id | NO | BTREE |
| stripe_invoices_package_id_foreign | package_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| stripe_invoices_company_id_foreign | company_id | companies.id |
| stripe_invoices_package_id_foreign | package_id | packages.id |

---

## stripe_setting

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `api_key` | varchar(191) | YES | NULL |  |  |
| `api_secret` | varchar(191) | YES | NULL |  |  |
| `webhook_key` | varchar(191) | YES | NULL |  |  |
| `paypal_client_id` | varchar(191) | YES | NULL |  |  |
| `paypal_secret` | varchar(191) | YES | NULL |  |  |
| `paypal_status` | enum('active','inactive') | NO | inactive |  |  |
| `stripe_status` | enum('active','inactive') | NO | inactive |  |  |
| `razorpay_key` | varchar(191) | YES | NULL |  |  |
| `razorpay_secret` | varchar(191) | YES | NULL |  |  |
| `razorpay_webhook_secret` | varchar(191) | YES | NULL |  |  |
| `razorpay_status` | enum('active','deactive') | NO | deactive |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `paypal_mode` | enum('sandbox','live') | NO | NULL |  |  |
| `paystack_client_id` | varchar(191) | YES | NULL |  |  |
| `paystack_secret` | varchar(191) | YES | NULL |  |  |
| `paystack_status` | enum('active','inactive') | YES | inactive |  |  |
| `paystack_merchant_email` | varchar(191) | YES | NULL |  |  |
| `paystack_payment_url` | varchar(191) | YES | https://api.paystack.co |  |  |
| `mollie_api_key` | varchar(191) | NO | NULL |  |  |
| `mollie_status` | enum('active','inactive') | NO | inactive |  |  |
| `authorize_api_login_id` | varchar(191) | YES | NULL |  |  |
| `authorize_transaction_key` | varchar(191) | YES | NULL |  |  |
| `authorize_signature_key` | varchar(191) | YES | NULL |  |  |
| `authorize_environment` | varchar(191) | YES | NULL |  |  |
| `authorize_status` | enum('active','inactive') | NO | inactive |  |  |
| `payfast_key` | varchar(191) | YES | NULL |  |  |
| `payfast_secret` | varchar(191) | YES | NULL |  |  |
| `payfast_status` | enum('active','inactive') | NO | inactive |  |  |
| `payfast_salt_passphrase` | varchar(191) | YES | NULL |  |  |
| `payfast_mode` | enum('sandbox','live') | NO | sandbox |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## sub_task_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `sub_task_id` | int unsigned | NO | NULL | MUL |  |
| `filename` | varchar(191) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `google_url` | varchar(191) | YES | NULL |  |  |
| `hashname` | varchar(191) | YES | NULL |  |  |
| `size` | varchar(191) | YES | NULL |  |  |
| `dropbox_link` | varchar(191) | YES | NULL |  |  |
| `external_link` | varchar(191) | YES | NULL |  |  |
| `external_link_name` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| sub_task_files_company_id_foreign | company_id | NO | BTREE |
| sub_task_files_sub_task_id_foreign | sub_task_id | NO | BTREE |
| sub_task_files_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| sub_task_files_company_id_foreign | company_id | companies.id |
| sub_task_files_sub_task_id_foreign | sub_task_id | sub_tasks.id |
| sub_task_files_user_id_foreign | user_id | users.id |

---

## sub_tasks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `task_id` | int unsigned | NO | NULL | MUL |  |
| `title` | text | NO | NULL |  |  |
| `due_date` | datetime | YES | NULL |  |  |
| `start_date` | date | YES | NULL |  |  |
| `status` | enum('incomplete','complete') | NO | incomplete |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| sub_tasks_task_id_foreign | task_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| sub_tasks_task_id_foreign | task_id | tasks.id |

---

## subscription_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscription_id` | bigint unsigned | NO | NULL | MUL |  |
| `stripe_id` | varchar(191) | NO | NULL | MUL |  |
| `stripe_plan` | varchar(191) | NO | NULL |  |  |
| `quantity` | int | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| subscription_items_stripe_id_index | stripe_id | NO | BTREE |
| subscription_items_subscription_id_stripe_plan_unique | subscription_id | YES | BTREE |
| subscription_items_subscription_id_stripe_plan_unique | stripe_plan | YES | BTREE |

---

## subscriptions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL |  |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `stripe_id` | varchar(191) | NO | NULL |  |  |
| `stripe_plan` | varchar(191) | NO | NULL |  |  |
| `quantity` | int | NO | NULL |  |  |
| `trial_ends_at` | timestamp | YES | NULL |  |  |
| `ends_at` | timestamp | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `stripe_status` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## super_admin_payroll_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `purchase_code` | varchar(191) | YES | NULL |  |  |
| `supported_until` | datetime | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## support_ticket_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `support_ticket_reply_id` | bigint unsigned | NO | NULL | MUL |  |
| `filename` | varchar(191) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `google_url` | varchar(191) | YES | NULL |  |  |
| `hashname` | varchar(191) | YES | NULL |  |  |
| `size` | varchar(191) | YES | NULL |  |  |
| `dropbox_link` | varchar(191) | YES | NULL |  |  |
| `external_link` | varchar(191) | YES | NULL |  |  |
| `external_link_name` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| support_ticket_files_support_ticket_reply_id_foreign | support_ticket_reply_id | NO | BTREE |
| support_ticket_files_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| support_ticket_files_support_ticket_reply_id_foreign | support_ticket_reply_id | support_ticket_replies.id |
| support_ticket_files_user_id_foreign | user_id | users.id |

---

## support_ticket_replies

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `support_ticket_id` | bigint unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `message` | longtext | NO | NULL |  |  |
| `deleted_at` | timestamp | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| support_ticket_replies_support_ticket_id_foreign | support_ticket_id | NO | BTREE |
| support_ticket_replies_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| support_ticket_replies_support_ticket_id_foreign | support_ticket_id | support_tickets.id |
| support_ticket_replies_user_id_foreign | user_id | users.id |

---

## support_ticket_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `type` | varchar(191) | NO | NULL | UNI |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| support_ticket_types_type_unique | type | YES | BTREE |

---

## support_tickets

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `created_by` | int unsigned | NO | NULL | MUL |  |
| `subject` | text | NO | NULL |  |  |
| `description` | longtext | NO | NULL |  |  |
| `status` | enum('open','pending','resolved','closed') | NO | open |  |  |
| `priority` | enum('low','medium','high','urgent') | NO | medium |  |  |
| `agent_id` | int unsigned | YES | NULL | MUL |  |
| `support_ticket_type_id` | bigint unsigned | YES | NULL | MUL |  |
| `deleted_at` | timestamp | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| support_tickets_agent_id_foreign | agent_id | NO | BTREE |
| support_tickets_created_by_foreign | created_by | NO | BTREE |
| support_tickets_support_ticket_type_id_foreign | support_ticket_type_id | NO | BTREE |
| support_tickets_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| support_tickets_agent_id_foreign | agent_id | users.id |
| support_tickets_created_by_foreign | created_by | users.id |
| support_tickets_support_ticket_type_id_foreign | support_ticket_type_id | support_ticket_types.id |
| support_tickets_user_id_foreign | user_id | users.id |

---

## task_category

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `category_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| task_category_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| task_category_company_id_foreign | company_id | companies.id |

---

## task_comment_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `task_id` | int unsigned | NO | NULL | MUL |  |
| `comment_id` | int unsigned | YES | NULL | MUL |  |
| `filename` | varchar(191) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `google_url` | varchar(191) | YES | NULL |  |  |
| `hashname` | varchar(191) | YES | NULL |  |  |
| `size` | varchar(191) | YES | NULL |  |  |
| `dropbox_link` | varchar(191) | YES | NULL |  |  |
| `external_link` | varchar(191) | YES | NULL |  |  |
| `external_link_name` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| task_comment_files_comment_id_foreign | comment_id | NO | BTREE |
| task_comment_files_company_id_foreign | company_id | NO | BTREE |
| task_comment_files_task_id_foreign | task_id | NO | BTREE |
| task_comment_files_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| task_comment_files_comment_id_foreign | comment_id | task_comments.id |
| task_comment_files_company_id_foreign | company_id | companies.id |
| task_comment_files_task_id_foreign | task_id | tasks.id |
| task_comment_files_user_id_foreign | user_id | users.id |

---

## task_comments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `comment` | longtext | NO | NULL |  |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `task_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| task_comments_task_id_foreign | task_id | NO | BTREE |
| task_comments_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| task_comments_task_id_foreign | task_id | tasks.id |
| task_comments_user_id_foreign | user_id | users.id |

---

## task_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `task_id` | int unsigned | NO | NULL | MUL |  |
| `filename` | varchar(191) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `google_url` | varchar(191) | YES | NULL |  |  |
| `hashname` | varchar(191) | YES | NULL |  |  |
| `size` | varchar(191) | YES | NULL |  |  |
| `dropbox_link` | varchar(191) | YES | NULL |  |  |
| `external_link` | varchar(191) | YES | NULL |  |  |
| `external_link_name` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| task_files_company_id_foreign | company_id | NO | BTREE |
| task_files_task_id_foreign | task_id | NO | BTREE |
| task_files_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| task_files_company_id_foreign | company_id | companies.id |
| task_files_task_id_foreign | task_id | tasks.id |
| task_files_user_id_foreign | user_id | users.id |

---

## task_history

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `task_id` | int unsigned | NO | NULL | MUL |  |
| `sub_task_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `details` | text | NO | NULL |  |  |
| `board_column_id` | int unsigned | YES | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| task_history_board_column_id_foreign | board_column_id | NO | BTREE |
| task_history_sub_task_id_foreign | sub_task_id | NO | BTREE |
| task_history_task_id_foreign | task_id | NO | BTREE |
| task_history_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| task_history_board_column_id_foreign | board_column_id | taskboard_columns.id |
| task_history_sub_task_id_foreign | sub_task_id | sub_tasks.id |
| task_history_task_id_foreign | task_id | tasks.id |
| task_history_user_id_foreign | user_id | users.id |

---

## task_label_list

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `label_name` | varchar(191) | NO | NULL |  |  |
| `color` | varchar(191) | YES | NULL |  |  |
| `description` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| task_label_list_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| task_label_list_company_id_foreign | company_id | companies.id |

---

## task_labels

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `label_id` | int unsigned | NO | NULL | MUL |  |
| `task_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| task_labels_label_id_foreign | label_id | NO | BTREE |
| task_tags_task_id_foreign | task_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| task_labels_label_id_foreign | label_id | task_label_list.id |
| task_tags_task_id_foreign | task_id | tasks.id |

---

## task_notes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `task_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int | YES | NULL |  |  |
| `note` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| task_notes_company_id_foreign | company_id | NO | BTREE |
| task_notes_task_id_foreign | task_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| task_notes_company_id_foreign | company_id | companies.id |
| task_notes_task_id_foreign | task_id | tasks.id |

---

## task_request_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `task_id` | bigint unsigned | NO | NULL | MUL |  |
| `filename` | varchar(191) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `google_url` | varchar(191) | YES | NULL |  |  |
| `hashname` | varchar(191) | YES | NULL |  |  |
| `size` | varchar(191) | YES | NULL |  |  |
| `dropbox_link` | varchar(191) | YES | NULL |  |  |
| `external_link` | varchar(191) | YES | NULL |  |  |
| `external_link_name` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| task_request_files_company_id_foreign | company_id | NO | BTREE |
| task_request_files_task_id_foreign | task_id | NO | BTREE |
| task_request_files_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| task_request_files_company_id_foreign | company_id | companies.id |
| task_request_files_task_id_foreign | task_id | task_requests.id |
| task_request_files_user_id_foreign | user_id | users.id |

---

## task_requests

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `heading` | varchar(191) | NO | NULL |  |  |
| `description` | mediumtext | YES | NULL |  |  |
| `start_date` | date | YES | NULL |  |  |
| `due_date` | date | YES | NULL |  |  |
| `project_id` | int unsigned | NO | NULL | MUL |  |
| `task_category_id` | int unsigned | YES | NULL | MUL |  |
| `priority` | enum('low','medium','high') | NO | medium |  |  |
| `column_priority` | int | NO | NULL |  |  |
| `created_by` | int unsigned | YES | NULL | MUL |  |
| `dependent_task_id` | bigint unsigned | YES | NULL | MUL |  |
| `billable` | tinyint(1) | NO | 1 |  |  |
| `request_status` | enum('pending','approve','rejected') | NO | pending |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| task_requests_company_id_foreign | company_id | NO | BTREE |
| task_requests_created_by_foreign | created_by | NO | BTREE |
| task_requests_dependent_task_id_foreign | dependent_task_id | NO | BTREE |
| task_requests_project_id_foreign | project_id | NO | BTREE |
| task_requests_task_category_id_foreign | task_category_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| task_requests_company_id_foreign | company_id | companies.id |
| task_requests_created_by_foreign | created_by | users.id |
| task_requests_dependent_task_id_foreign | dependent_task_id | task_requests.id |
| task_requests_project_id_foreign | project_id | projects.id |
| task_requests_task_category_id_foreign | task_category_id | task_category.id |

---

## task_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `task_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| task_users_task_id_foreign | task_id | NO | BTREE |
| task_users_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| task_users_task_id_foreign | task_id | tasks.id |
| task_users_user_id_foreign | user_id | users.id |

---

## taskboard_columns

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `column_name` | varchar(191) | NO | NULL |  |  |
| `slug` | varchar(191) | YES | NULL |  |  |
| `label_color` | varchar(191) | NO | NULL |  |  |
| `priority` | int | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| taskboard_columns_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| taskboard_columns_company_id_foreign | company_id | companies.id |

---

## tasks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `heading` | varchar(191) | NO | NULL |  |  |
| `description` | mediumtext | YES | NULL |  |  |
| `due_date` | date | YES | NULL |  |  |
| `start_date` | date | YES | NULL |  |  |
| `project_id` | int unsigned | YES | NULL | MUL |  |
| `task_category_id` | int unsigned | YES | NULL | MUL |  |
| `priority` | enum('low','medium','high') | NO | medium |  |  |
| `status` | enum('incomplete','completed') | NO | incomplete |  |  |
| `board_column_id` | int unsigned | YES | NULL | MUL |  |
| `column_priority` | int | NO | NULL |  |  |
| `completed_on` | datetime | YES | NULL |  |  |
| `created_by` | int unsigned | YES | NULL | MUL |  |
| `recurring_task_id` | int unsigned | YES | NULL | MUL |  |
| `dependent_task_id` | int unsigned | YES | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `milestone_id` | int unsigned | YES | NULL | MUL |  |
| `is_private` | tinyint(1) | NO | 1 |  |  |
| `billable` | tinyint(1) | NO | 1 |  |  |
| `estimate_hours` | int | NO | NULL |  |  |
| `estimate_minutes` | int | NO | NULL |  |  |
| `hash` | varchar(64) | YES | NULL |  |  |
| `event_id` | text | YES | NULL |  |  |
| `task_request_id` | bigint unsigned | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| tasks_board_column_id_foreign | board_column_id | NO | BTREE |
| tasks_company_id_foreign | company_id | NO | BTREE |
| tasks_created_by_foreign | created_by | NO | BTREE |
| tasks_dependent_task_id_foreign | dependent_task_id | NO | BTREE |
| tasks_milestone_id_foreign | milestone_id | NO | BTREE |
| tasks_project_id_foreign | project_id | NO | BTREE |
| tasks_recurring_task_id_foreign | recurring_task_id | NO | BTREE |
| tasks_task_category_id_foreign | task_category_id | NO | BTREE |
| tasks_task_request_id_foreign | task_request_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| tasks_board_column_id_foreign | board_column_id | taskboard_columns.id |
| tasks_company_id_foreign | company_id | companies.id |
| tasks_created_by_foreign | created_by | users.id |
| tasks_dependent_task_id_foreign | dependent_task_id | tasks.id |
| tasks_milestone_id_foreign | milestone_id | project_milestones.id |
| tasks_project_id_foreign | project_id | projects.id |
| tasks_recurring_task_id_foreign | recurring_task_id | tasks.id |
| tasks_task_category_id_foreign | task_category_id | task_category.id |
| tasks_task_request_id_foreign | task_request_id | task_requests.id |

---

## taxes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `tax_name` | varchar(191) | NO | NULL |  |  |
| `rate_percent` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `deleted_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| taxes_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| taxes_company_id_foreign | company_id | companies.id |

---

## teams

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `team_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| teams_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| teams_company_id_foreign | company_id | companies.id |

---

## testimonials

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `language_setting_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `comment` | text | YES | NULL |  |  |
| `rating` | double(8,2) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| testimonials_language_setting_id_foreign | language_setting_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| testimonials_language_setting_id_foreign | language_setting_id | language_settings.id |

---

## theme_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `panel` | varchar(191) | NO | NULL |  |  |
| `header_color` | varchar(191) | NO | NULL |  |  |
| `sidebar_color` | varchar(191) | NO | NULL |  |  |
| `sidebar_text_color` | varchar(191) | NO | NULL |  |  |
| `link_color` | varchar(191) | NO | #ffffff |  |  |
| `user_css` | longtext | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `enable_rounded_theme` | tinyint(1) | NO | 0 |  |  |
| `login_background` | varchar(191) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| theme_settings_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| theme_settings_company_id_foreign | company_id | companies.id |

---

## ticket_agent_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `agent_id` | int unsigned | NO | NULL | MUL |  |
| `group_id` | int unsigned | YES | NULL | MUL |  |
| `status` | enum('enabled','disabled') | NO | enabled |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| ticket_agent_groups_agent_id_foreign | agent_id | NO | BTREE |
| ticket_agent_groups_company_id_foreign | company_id | NO | BTREE |
| ticket_agent_groups_group_id_foreign | group_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| ticket_agent_groups_agent_id_foreign | agent_id | users.id |
| ticket_agent_groups_company_id_foreign | company_id | companies.id |
| ticket_agent_groups_group_id_foreign | group_id | ticket_groups.id |

---

## ticket_channels

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `channel_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| ticket_channels_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| ticket_channels_company_id_foreign | company_id | companies.id |

---

## ticket_custom_forms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `field_display_name` | varchar(191) | NO | NULL |  |  |
| `field_name` | varchar(191) | NO | NULL |  |  |
| `field_type` | varchar(191) | NO | text |  |  |
| `field_order` | int | NO | NULL |  |  |
| `status` | enum('active','inactive') | NO | active |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `required` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| ticket_custom_forms_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| ticket_custom_forms_company_id_foreign | company_id | companies.id |

---

## ticket_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `ticket_reply_id` | int unsigned | NO | NULL | MUL |  |
| `filename` | varchar(191) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `google_url` | varchar(191) | YES | NULL |  |  |
| `hashname` | varchar(191) | YES | NULL |  |  |
| `size` | varchar(191) | YES | NULL |  |  |
| `dropbox_link` | varchar(191) | YES | NULL |  |  |
| `external_link` | varchar(191) | YES | NULL |  |  |
| `external_link_name` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| ticket_files_company_id_foreign | company_id | NO | BTREE |
| ticket_files_ticket_reply_id_foreign | ticket_reply_id | NO | BTREE |
| ticket_files_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| ticket_files_company_id_foreign | company_id | companies.id |
| ticket_files_ticket_reply_id_foreign | ticket_reply_id | ticket_replies.id |
| ticket_files_user_id_foreign | user_id | users.id |

---

## ticket_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `group_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| ticket_groups_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| ticket_groups_company_id_foreign | company_id | companies.id |

---

## ticket_replies

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `ticket_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `message` | mediumtext | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `deleted_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| ticket_replies_company_id_foreign | company_id | NO | BTREE |
| ticket_replies_ticket_id_foreign | ticket_id | NO | BTREE |
| ticket_replies_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| ticket_replies_company_id_foreign | company_id | companies.id |
| ticket_replies_ticket_id_foreign | ticket_id | tickets.id |
| ticket_replies_user_id_foreign | user_id | users.id |

---

## ticket_reply_templates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `reply_heading` | mediumtext | NO | NULL |  |  |
| `reply_text` | mediumtext | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| ticket_reply_templates_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| ticket_reply_templates_company_id_foreign | company_id | companies.id |

---

## ticket_tag_list

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `tag_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## ticket_tags

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `tag_id` | int unsigned | NO | NULL | MUL |  |
| `ticket_id` | int unsigned | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| ticket_tags_tag_id_foreign | tag_id | NO | BTREE |
| ticket_tags_ticket_id_foreign | ticket_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| ticket_tags_tag_id_foreign | tag_id | ticket_tag_list.id |
| ticket_tags_ticket_id_foreign | ticket_id | tickets.id |

---

## ticket_types

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `type` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| ticket_types_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| ticket_types_company_id_foreign | company_id | companies.id |

---

## tickets

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `subject` | text | NO | NULL |  |  |
| `status` | enum('open','pending','resolved','closed') | NO | open |  |  |
| `priority` | enum('low','medium','high','urgent') | NO | medium |  |  |
| `agent_id` | int unsigned | YES | NULL | MUL |  |
| `channel_id` | int unsigned | YES | NULL | MUL |  |
| `type_id` | int unsigned | YES | NULL | MUL |  |
| `close_date` | date | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `deleted_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| tickets_agent_id_foreign | agent_id | NO | BTREE |
| tickets_channel_id_foreign | channel_id | NO | BTREE |
| tickets_company_id_foreign | company_id | NO | BTREE |
| tickets_type_id_foreign | type_id | NO | BTREE |
| tickets_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| tickets_agent_id_foreign | agent_id | users.id |
| tickets_channel_id_foreign | channel_id | ticket_channels.id |
| tickets_company_id_foreign | company_id | companies.id |
| tickets_type_id_foreign | type_id | ticket_types.id |
| tickets_user_id_foreign | user_id | users.id |

---

## tr_front_details

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `language_setting_id` | int unsigned | YES | NULL | MUL |  |
| `header_title` | varchar(200) | NO | NULL |  |  |
| `header_description` | text | NO | NULL |  |  |
| `image` | varchar(200) | NO | NULL |  |  |
| `feature_title` | varchar(191) | YES | NULL |  |  |
| `feature_description` | varchar(191) | YES | NULL |  |  |
| `price_title` | varchar(191) | YES | NULL |  |  |
| `price_description` | varchar(191) | YES | NULL |  |  |
| `task_management_title` | varchar(191) | YES | NULL |  |  |
| `task_management_detail` | text | YES | NULL |  |  |
| `manage_bills_title` | varchar(191) | YES | NULL |  |  |
| `manage_bills_detail` | text | YES | NULL |  |  |
| `teamates_title` | varchar(191) | YES | NULL |  |  |
| `teamates_detail` | text | YES | NULL |  |  |
| `favourite_apps_title` | varchar(191) | YES | NULL |  |  |
| `favourite_apps_detail` | text | YES | NULL |  |  |
| `cta_title` | varchar(191) | YES | NULL |  |  |
| `cta_detail` | text | YES | NULL |  |  |
| `client_title` | varchar(191) | YES | NULL |  |  |
| `client_detail` | text | YES | NULL |  |  |
| `testimonial_title` | varchar(191) | YES | NULL |  |  |
| `testimonial_detail` | text | YES | NULL |  |  |
| `faq_title` | varchar(191) | YES | NULL |  |  |
| `faq_detail` | text | YES | NULL |  |  |
| `footer_copyright_text` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| tr_front_details_language_setting_id_foreign | language_setting_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| tr_front_details_language_setting_id_foreign | language_setting_id | language_settings.id |

---

## universal_search

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `searchable_id` | int | NO | NULL |  |  |
| `module_type` | enum('ticket','invoice','notice','proposal','task','creditNote','client','employee','project','estimate','lead') | YES | NULL |  |  |
| `title` | varchar(191) | NO | NULL |  |  |
| `route_name` | varchar(191) | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| universal_search_company_id_foreign | company_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| universal_search_company_id_foreign | company_id | companies.id |

---

## user_activities

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `activity` | text | NO | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| user_activities_company_id_foreign | company_id | NO | BTREE |
| user_activities_user_id_foreign | user_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| user_activities_company_id_foreign | company_id | companies.id |
| user_activities_user_id_foreign | user_id | users.id |

---

## users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | YES | NULL | MUL |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `email` | varchar(191) | NO | NULL | UNI |  |
| `password` | varchar(191) | NO | NULL |  |  |
| `remember_token` | varchar(100) | YES | NULL |  |  |
| `image` | varchar(191) | YES | NULL |  |  |
| `mobile` | varchar(191) | YES | NULL |  |  |
| `gender` | enum('male','female','others') | NO | male |  |  |
| `locale` | varchar(191) | NO | en |  |  |
| `status` | enum('active','deactive') | NO | active |  |  |
| `login` | enum('enable','disable') | NO | enable |  |  |
| `onesignal_player_id` | text | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |
| `super_admin` | enum('0','1') | NO | 0 |  |  |
| `email_verification_code` | varchar(40) | YES | NULL |  |  |
| `social_token` | varchar(191) | YES | NULL |  |  |
| `email_notifications` | tinyint(1) | NO | 1 |  |  |
| `country_id` | int unsigned | YES | NULL | MUL |  |
| `authorize_id` | varchar(191) | YES | NULL |  |  |
| `authorize_payment_id` | varchar(191) | YES | NULL |  |  |
| `card_brand` | varchar(191) | YES | NULL |  |  |
| `card_last_four` | varchar(191) | YES | NULL |  |  |
| `last_login` | datetime | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| users_company_id_foreign | company_id | NO | BTREE |
| users_country_id_foreign | country_id | NO | BTREE |
| users_email_unique | email | YES | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| users_company_id_foreign | company_id | companies.id |
| users_country_id_foreign | country_id | countries.id |

---

## users_chat

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `user_one` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `message` | varchar(191) | YES | NULL |  |  |
| `from` | int unsigned | YES | NULL | MUL |  |
| `to` | int unsigned | YES | NULL | MUL |  |
| `message_seen` | enum('yes','no') | NO | no |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| users_chat_from_foreign | from | NO | BTREE |
| users_chat_to_foreign | to | NO | BTREE |
| users_chat_user_id_foreign | user_id | NO | BTREE |
| users_chat_user_one_foreign | user_one | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| users_chat_from_foreign | from | users.id |
| users_chat_to_foreign | to | users.id |
| users_chat_user_id_foreign | user_id | users.id |
| users_chat_user_one_foreign | user_one | users.id |

---

## users_chat_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `company_id` | int unsigned | NO | NULL | MUL |  |
| `user_id` | int unsigned | NO | NULL | MUL |  |
| `users_chat_id` | int unsigned | NO | NULL | MUL |  |
| `filename` | varchar(191) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `google_url` | varchar(191) | YES | NULL |  |  |
| `hashname` | varchar(191) | YES | NULL |  |  |
| `size` | varchar(191) | YES | NULL |  |  |
| `external_link` | varchar(191) | YES | NULL |  |  |
| `external_link_name` | varchar(191) | YES | NULL |  |  |
| `created_at` | timestamp | YES | NULL |  |  |
| `updated_at` | timestamp | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| users_chat_files_company_id_foreign | company_id | NO | BTREE |
| users_chat_files_user_id_foreign | user_id | NO | BTREE |
| users_chat_files_users_chat_id_foreign | users_chat_id | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| users_chat_files_company_id_foreign | company_id | companies.id |
| users_chat_files_users_chat_id_foreign | users_chat_id | users_chat.id |
| users_chat_files_user_id_foreign | user_id | users.id |

---

