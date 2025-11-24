// GIGLANCER Database TypeScript Interfaces
// Generated: 11/22/2025, 12:50:34 PM
// Database Type: mysql
// Total Tables: 162

export interface Activities {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  other_user_id?: number;
  foreign_id?: number;
  class: string;
  from_status_id: number;
  to_status_id: number;
  activity_type: string;
  model_id: number;
  model_class?: string;
  amount: number;
}

export interface ApnsDevices {
  pid: number;
  appname: string;
  appversion?: string;
  deviceuid: string;
  devicetoken: string;
  devicename: string;
  devicemodel: string;
  deviceversion: string;
  pushbadge?: string;
  pushalert?: string;
  pushsound?: string;
  development: string;
  status: string;
  created_at: Date | string;
  updated_at: Date | string;
  user_id: number;
}

export interface Attachments {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  class: string;
  foreign_id: number;
  filename: string;
  dir: string;
  mimetype?: string;
  filesize?: number;
  height?: number;
  width?: number;
  thumb?: number;
  description?: string;
  original_filename?: string;
}

export interface BidStatuses {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  bid_count: number;
}

export interface Bids {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  project_bid_id: number;
  project_id: number;
  screening_candidate_id?: number;
  amount: number;
  description?: string;
  visa_status?: string;
  ready_to_relocate?: string;
  years_of_exp?: number;
  duration: number;
  winner_selected_date?: Date | string;
  bid_status_id: number;
  is_notifiy?: number;
  is_withdrawn: number;
  is_freelancer_withdrawn: number;
  total_escrow_amount: number;
  amount_in_escrow: number;
  paid_escrow_amount: number;
  total_invoice_requested_amount: number;
  site_commission_from_employer: number;
  total_invoice_got_paid: number;
  site_commission_from_freelancer: number;
  development_start_date?: Date | string;
  development_end_date?: Date | string;
  is_offered_rejected: number;
  message_count: number;
  milestone_count: number;
  credit_purchase_log_id: number;
  is_reached_response_end_date_for_freelancer: number;
  is_screening_completed: number;
}

export interface Certifications {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  title: string;
  conferring_organization: string;
  description: string;
  year: string;
}

export interface Cities {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  country_id: number;
  state_id: number;
  name: string;
  slug: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  dma_id?: number;
  county?: string;
  code?: string;
  is_active: number;
  project_count: number;
  quote_service_count: number;
  user_profile_count: number;
  user_freelancer_count: number;
  language_id?: number;
}

export interface Contacts {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  first_name: string;
  last_name?: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  ip_id?: number;
}

export interface ContestStatuses {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  name?: string;
  slug?: string;
  message?: string;
  contest_count: number;
}

export interface ContestTypes {
  id: number;
  resource_id?: number;
  name?: string;
  description?: string;
  next?: number;
  contest_count?: number;
  form_field_count?: number;
  contest_user_count?: number;
  minimum_prize?: number;
  blind_fee?: number;
  private_fee?: number;
  featured_fee?: number;
  highlight_fee?: number;
  site_revenue?: number;
  is_watermarked?: number;
  is_active?: number;
  is_template?: number;
  is_blind?: number;
  is_featured?: number;
  is_highlight?: number;
  is_private?: number;
  maximum_entries_allowed?: number;
  maximum_entries_allowed_per_user?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ContestTypesPricingDays {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  contest_type_id?: number;
  pricing_day_id?: number;
  price?: number;
}

export interface ContestTypesPricingPackages {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  contest_type_id?: number;
  pricing_package_id?: number;
  price?: number;
  participant_commision?: number;
  maximum_entry_allowed?: number;
}

export interface ContestUserDownloads {
  id: number;
  created_at?: Date | string;
  user_id?: number;
  contest_user_id?: number;
  ip_id?: number;
}

export interface ContestUserStatuses {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  name?: string;
  description?: string;
  slug?: string;
  contest_user_count: number;
}

export interface ContestUsers {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  user_id?: number;
  contest_owner_user_id?: number;
  contest_id?: number;
  description?: string;
  copyright_note?: string;
  entry_no?: number;
  contest_user_status_id?: number;
  contest_user_total_ratings?: number;
  contest_user_rating_count?: number;
  average_rating?: number;
  site_revenue?: number;
  zazpay_gateway_id?: number;
  view_count: number;
  flag_count: number;
  message_count: number;
}

export interface Contests {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  user_id?: number;
  referred_by_user_id?: number;
  contest_type_id?: number;
  contest_status_id?: number;
  is_send_payment_notification?: number;
  resource_id?: number;
  pricing_package_id?: number;
  pricing_day_id?: number;
  name?: string;
  slug?: string;
  description?: string;
  maximum_entry_allowed?: number;
  maximum_entry_allowed_per_user?: number;
  reason_for_cancelation?: string;
  prize?: number;
  creation_cost?: number;
  actual_end_date?: Date | string;
  end_date?: Date | string;
  start_date?: Date | string;
  refund_request_date?: Date | string;
  canceled_by_admin_date?: Date | string;
  winner_selected_date?: Date | string;
  judging_date?: Date | string;
  pending_action_to_admin_date?: Date | string;
  change_requested_date?: Date | string;
  change_completed_date?: Date | string;
  paid_to_participant_date?: Date | string;
  completed_date?: Date | string;
  files_expectation_date?: Date | string;
  partcipant_count?: number;
  contest_user_count?: number;
  contest_user_won_count?: number;
  contest_user_eliminated_count?: number;
  contest_user_withdrawn_count?: number;
  contest_user_active_count?: number;
  message_count?: number;
  total_site_revenue?: number;
  winner_user_id?: number;
  payment_gateway_id?: number;
  last_contest_user_entry_no?: number;
  is_system_flagged?: number;
  is_user_flagged?: number;
  is_admin_complete?: number;
  admin_suspend?: number;
  is_winner_selected_by_admin?: number;
  is_pending_action_to_admin?: number;
  is_blind?: number;
  is_private?: number;
  is_featured?: number;
  is_highlight?: number;
  blind_contest_fee?: number;
  private_contest_fee?: number;
  featured_contest_fee?: number;
  highlight_contest_fee?: number;
  detected_suspicious_words?: string;
  reason_for_calcelation?: string;
  site_commision?: number;
  is_paid?: number;
  is_uploaded_entry_design?: number;
  admin_commission_amount?: number;
  affiliate_commission_amount?: number;
  zazpay_gateway_id?: number;
  zazpay_payment_id?: number;
  zazpay_pay_key?: string;
  zazpay_revised_amount?: number;
  upgrade?: string;
  participant_count: number;
  view_count: number;
  follower_count: number;
  flag_count: number;
  is_notification_sent: number;
  paypal_pay_key?: string;
}

export interface Countries {
  id: number;
  iso_alpha2?: string;
  iso_alpha3?: string;
  iso_numeric?: number;
  fips_code?: string;
  name?: string;
  capital?: string;
  areainsqkm?: number;
  population?: number;
  continent?: string;
  tld?: string;
  currency?: string;
  currencyname?: string;
  phone?: string;
  postalcodeformat?: string;
  postalcoderegex?: string;
  languages?: string;
  geonameid?: number;
  neighbours?: string;
  equivalentfipscode?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Coupons {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  coupon_code: string;
  max_number_of_time_can_use: number;
  max_number_of_time_can_use_per_user: number;
  coupon_used_count: number;
  discount: number;
  discount_type_id: number;
  min_amount: number;
  coupon_expiry_date: Date | string;
  is_active: number;
}

export interface CreditPurchaseLogs {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  credit_purchase_plan_id: number;
  credit_count: number;
  price: number;
  discount_percentage: number;
  original_price: number;
  payment_gateway_id?: number;
  gateway_id?: number;
  is_payment_completed: number;
  coupon_id?: number;
  is_active: number;
  used_credit_count: number;
  paypal_pay_key?: string;
  expiry_date?: Date | string;
}

export interface CreditPurchasePlans {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  no_of_credits: number;
  price: number;
  discount_percentage: number;
  original_price: number;
  is_active: number;
  day_limit?: number;
  is_welcome_plan: number;
}

export interface DefaultReview {
  id: number;
  user_id: number;
  rating: number;
  message?: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface DiscountTypes {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
}

export interface DisputeClosedTypes {
  id: number;
  name?: string;
  dispute_open_type_id?: number;
  project_role_id?: number;
  reason?: string;
  resolve_type?: string;
  action_list: string;
}

export interface DisputeOpenTypes {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  name?: string;
  project_role_id?: number;
  is_active?: number;
}

export interface DisputeStatuses {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  name?: string;
}

export interface Educations {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  country_id: number;
  title: string;
  from_year: string;
  to_year: string;
}

export interface EmailTemplates {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  from_email: string;
  reply_to: string;
  name: string;
  description: string;
  subject: string;
  text_email_content?: string;
  html_email_content?: string;
  notification_content?: string;
  email_variables: string;
  is_html: number;
  is_notify?: number;
  display_name?: string;
}

export interface ExamAnswers {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  user_id?: number;
  exam_id?: number;
  question_id?: number;
  exams_user_id?: number;
  user_answer?: string;
  total_mark?: number;
}

export interface ExamAttends {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  exam_id?: number;
  user_id?: number;
  exams_user_id?: number;
  user_login_ip_id?: string;
}

export interface ExamCategories {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  name: string;
  exam_count: number;
}

export interface ExamLevels {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  exam_count: number;
}

export interface ExamStatuses {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  exams_user_count: number;
}

export interface Exams {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  question_display_type_id: number;
  topics_covered: string;
  instructions: string;
  splash_content?: string;
  title?: string;
  slug: string;
  duration: number;
  fee: number;
  pass_mark_percentage: number;
  exams_question_count?: number;
  exams_user_count: number;
  exam_level_id?: number;
  is_active?: number;
  is_recommended: number;
  additional_time_to_expire?: number;
  total_fee_received: number;
  exams_user_passed_count: number;
  view_count: number;
  parent_exam_id?: number;
  exam_category_id?: number;
}

export interface ExamsQuestions {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  exam_id: number;
  question_id: number;
  display_order?: number;
}

export interface ExamsUsers {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  exam_id?: number;
  user_id?: number;
  fee_paid?: number;
  total_mark?: number;
  total_mark_mean?: number;
  total_mark_standard_deviation?: number;
  exam_status_id: number;
  no_of_times?: number;
  exam_started_date?: Date | string;
  exam_end_date?: Date | string;
  exam_level_id?: number;
  allow_duration: number;
  total_question_count: number;
  pass_mark_percentage: number;
  payment_gateway_id?: number;
  zazpay_gateway_id?: number;
  zazpay_payment_id?: number;
  zazpay_pay_key?: string;
  zazpay_revised_amount?: number;
  taken_time: number;
  percentile_rank?: number;
  paypal_pay_key?: string;
}

export interface FlagCategories {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  class?: string;
  flag_count: number;
  is_active: number;
}

export interface Flags {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  class: string;
  foreign_id: number;
  flag_category_id: number;
  message: string;
  ip_id: number;
}

export interface Followers {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  foreign_id?: number;
  class: string;
  ip_id: number;
}

export interface FormFieldGroups {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  name?: string;
  slug?: string;
  foreign_id?: number;
  info?: string;
  field_order?: number;
  class?: string;
  is_deletable?: number;
  is_editable?: number;
}

export interface FormFieldSubmissions {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  form_field_id: number;
  foreign_id: number;
  class: string;
  response?: string;
}

export interface FormFields {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  name?: string;
  label?: string;
  info?: string;
  length?: number;
  options?: string;
  class?: string;
  input_type_id: number;
  foreign_id?: number;
  form_field_group_id?: number;
  is_required: number;
  is_active: number;
  display_order: number;
  depends_on?: string;
  depends_value?: string;
}

export interface HireRequests {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  requested_user_id?: number;
  foreign_id?: number;
  class: string;
  message: string;
}

export interface InputTypes {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name?: string;
  value?: string;
}

export interface Ips {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  ip?: string;
  host: string;
  city_id?: number;
  state_id?: number;
  country_id?: number;
  timezone_id?: number;
  latitude?: number;
  longitude?: number;
}

export interface JobApplies {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  job_id?: number;
  user_id?: number;
  job_apply_status_id: number;
  cover_letter: string;
  total_resume_rating: number;
  resume_rating_count: number;
  ip_id?: number;
}

export interface JobAppliesPortfolios {
  id: number;
  job_apply_id: number;
  portfolio_id: number;
}

export interface JobApplyClicks {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  job_id: number;
  ip_id?: number;
}

export interface JobApplyStatuses {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  slug: string;
}

export interface JobCategories {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  slug: string;
  job_count: number;
  is_active: number;
  active_job_count: number;
}

export interface JobStatuses {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  slug: string;
  job_count: number;
}

export interface JobTypes {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  slug: string;
  is_active: number;
}

export interface Jobs {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  job_status_id?: number;
  job_type_id?: number;
  job_category_id?: number;
  title: string;
  slug: string;
  description: string;
  address: string;
  address1?: string;
  city_id?: number;
  state_id?: number;
  country_id?: number;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  salary_from?: number;
  salary_to?: number;
  salary_type_id?: number;
  is_show_salary: number;
  last_date_to_apply?: Date | string;
  no_of_opening?: number;
  company_name: string;
  ip_id?: number;
  apply_via: string;
  job_url?: string;
  featured_fee: number;
  urgent_fee: number;
  zazpay_revised_amount?: number;
  payment_gateway_id?: number;
  zazpay_gateway_id?: number;
  zazpay_payment_id?: number;
  zazpay_pay_key?: string;
  job_apply_click_count: number;
  job_apply_count: number;
  is_featured: number;
  is_urgent: number;
  is_paid?: number;
  company_website?: string;
  view_count: number;
  flag_count: number;
  full_address?: string;
  total_listing_fee: number;
  is_notification_sent: number;
  paypal_pay_key?: string;
  job_open_date?: Date | string;
  minimum_experience?: number;
  maximum_experience?: number;
}

export interface JobsSkills {
  id: number;
  job_id: number;
  skill_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Languages {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  iso2: string;
  iso3: string;
  is_active: number;
}

export interface MessageContents {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  subject: string;
  message: string;
}

export interface Messages {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  user_id?: number;
  other_user_id?: number;
  parent_id?: number;
  message_content_id: number;
  foreign_id: number;
  class: string;
  root?: string;
  freshness_ts?: string;
  depth: number;
  materialized_path?: string;
  path?: string;
  size?: number;
  is_sender: number;
  is_read?: number;
  is_deleted?: number;
  is_private?: number;
  is_child_replied?: number;
  model_id: number;
}

export interface MilestoneStatuses {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  slug: string;
  is_active: string;
  milestone_count: number;
  status_order: number;
}

export interface Milestones {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  project_id?: number;
  user_id?: number;
  amount?: number;
  description?: string;
  milestone_status_id?: number;
  bid_id?: number;
  completed_date?: Date | string;
  escrow_amount_requested_date?: Date | string;
  escrow_amount_released_date?: Date | string;
  escrow_amount_paid_date?: Date | string;
  site_commission_from_employer: number;
  site_commission_from_freelancer: number;
  payment_gateway_id?: number;
  paypal_pay_key?: string;
  deadline_date?: Date | string;
  zazpay_gateway_id?: number;
}

export interface MoneyTransferAccounts {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  account: string;
  is_active: number;
  is_primary: number;
}

export interface OauthAccessTokens {
  access_token: string;
  client_id?: string;
  user_id?: string;
  expires?: Date | string;
  scope?: string;
}

export interface OauthAuthorizationCodes {
  authorization_code: string;
  client_id?: string;
  user_id?: string;
  redirect_uri?: string;
  expires?: Date | string;
  scope?: string;
}

export interface OauthClients {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id: string;
  client_name: string;
  client_id: string;
  client_secret: string;
  redirect_uri?: string;
  grant_types: string;
  scope?: string;
  client_url?: string;
  logo_url?: string;
  tos_url?: string;
  policy_url?: string;
}

export interface OauthJwt {
  client_id: string;
  subject?: string;
  public_key?: string;
}

export interface OauthRefreshTokens {
  refresh_token: string;
  client_id?: string;
  user_id?: string;
  expires?: Date | string;
  scope?: string;
}

export interface OauthScopes {
  scope: string;
  is_default?: number;
}

export interface Pages {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  parent_id?: number;
  title: string;
  title_es?: string;
  content?: string;
  content_es?: string;
  template?: string;
  draft?: number;
  lft?: number;
  rght?: number;
  level: number;
  meta_keywords?: string;
  description_meta_tag?: string;
  url?: string;
  slug: string;
  is_default: number;
}

export interface PaymentGatewaySettings {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  payment_gateway_id: number;
  name: string;
  type: string;
  options: string;
  test_mode_value?: string;
  live_mode_value?: string;
  label: string;
  description: string;
}

export interface PaymentGateways {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  name: string;
  slug?: string;
  description: string;
  is_test_mode: number;
  is_active: number;
  display_name: string;
}

export interface Portfolios {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  user_id?: number;
  description: string;
  message_count?: number;
  follower_count?: number;
  view_count: number;
  flag_count: number;
  title: string;
  is_admin_suspend: number;
}

export interface PricingDays {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  no_of_days?: number;
  global_price?: number;
  is_active?: number;
}

export interface PricingPackages {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  name?: string;
  description?: string;
  global_price?: number;
  participant_commision?: number;
  maximum_entry_allowed?: number;
  features?: string;
  is_active?: number;
}

export interface PrivacyAnalyticsEvents {
  id: number;
  session_id: string;
  user_id?: number;
  event_type: number;
  event_data?: any;
  page_url?: string;
  page_title?: string;
  referrer?: string;
  user_agent_hash?: string;
  ip_address_hash?: string;
  created_at?: Date | string;
  anonymized_at?: Date | string;
}

export interface PrivacyAuditLog {
  id: number;
  session_id?: string;
  user_id?: number;
  action_type: string;
  action_details?: any;
  ip_address?: string;
  user_agent?: string;
  timestamp?: Date | string;
}

export interface PrivacyComplianceLog {
  id: number;
  compliance_type: string;
  compliance_action: string;
  affected_records?: number;
  execution_details?: any;
  executed_at?: Date | string;
  execution_status?: string;
}

export interface PrivacyCookiePreferences {
  id: number;
  session_id: string;
  user_id?: number;
  cookie_category: string;
  is_enabled?: number;
  preference_details?: any;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PrivacyDataRequests {
  id: number;
  session_id?: string;
  user_id?: number;
  request_type: string;
  request_status?: string;
  contact_email?: string;
  request_details?: any;
  submitted_at?: Date | string;
  processed_at?: Date | string;
  expires_at?: Date | string;
  contact_reference?: string;
}

export interface PrivacyRetentionPolicy {
  id: number;
  data_type: string;
  retention_days: number;
  anonymization_days: number;
  auto_cleanup?: number;
  policy_details?: any;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PrivacyUserJourney {
  id: number;
  session_id: string;
  user_id?: number;
  journey_step: string;
  step_data?: any;
  timestamp?: Date | string;
  duration_seconds?: number;
}

export interface ProjectBidInvoiceItems {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  project_bid_invoice_id: number;
  description: string;
  amount: number;
}

export interface ProjectBidInvoices {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  project_id?: number;
  bid_id?: number;
  amount: number;
  site_fee: number;
  paid_on?: Date | string;
  pay_key?: string;
  zazpay_pay_key?: string;
  zazpay_payment_id?: number;
  zazpay_gateway_id?: number;
  zazpay_revised_amount?: number;
  site_commission_from_employer?: number;
  site_commission_from_freelancer?: number;
  user_id?: number;
  is_paid: number;
  payment_gateway_id?: number;
  paypal_pay_key?: string;
}

export interface ProjectBids {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  project_id?: number;
  amount: number;
  duration?: number;
  total_bid_amount?: number;
  closed_date?: Date | string;
  is_closed: number;
  is_active: number;
  bidding_start_date?: Date | string;
  bidding_end_date?: Date | string;
  site_commission_from_employer: number;
  site_commission_from_freelancer: number;
  total_paid_amount: number;
  lowest_bid_amount: number;
  bid_count: number;
}

export interface ProjectCategories {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  project_count?: number;
  is_active: number;
  active_project_count: number;
  icon_class?: string;
}

export interface ProjectDisputes {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  user_id?: number;
  project_id?: number;
  dispute_open_type_id?: number;
  reason?: string;
  dispute_status_id?: number;
  resolved_date?: Date | string;
  favour_role_id?: number;
  last_replied_user_id?: number;
  last_replied_date?: Date | string;
  dispute_closed_type_id?: number;
  message_count?: number;
  expected_rating?: number;
  bid_id: number;
}

export interface ProjectRanges {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  min_amount: number;
  max_amount: number;
  is_active: number;
  project_count: number;
  active_project_count: number;
  user_id: number;
}

export interface ProjectStatuses {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  project_count: number;
  is_active: number;
}

export interface Projects {
  id: number;
  screening_job_description_id?: number;
  screening_project_id?: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  project_status_id: number;
  project_range_id: number;
  name: string;
  slug: string;
  description?: string;
  seo_title?: string;
  seo_description?: string;
  employment_type?: string;
  work_mode?: string;
  hiring_org?: string;
  years_of_exp?: number;
  job_location?: string;
  total_listing_fee: number;
  cancelled_date?: Date | string;
  ip_id?: number;
  freelancer_user_id?: number;
  bid_duration: number;
  is_featured: number;
  is_private: number;
  is_hidded_bid: number;
  is_pre_paid: number;
  is_urgent: number;
  is_active: number;
  is_dispute: number;
  is_cancel_request_freelancer: number;
  is_cancel_request_employer: number;
  funded_date?: Date | string;
  last_reopened_date?: Date | string;
  payment_completed_date?: Date | string;
  listing_fee: number;
  is_paid: number;
  is_reopened: number;
  zazpay_gateway_id?: number;
  zazpay_payment_id?: number;
  zazpay_pay_key?: string;
  zazpay_revised_amount?: number;
  is_notification_sent: number;
  project_type_id: number;
  site_commission_from_employer: number;
  site_commission_from_freelancer: number;
  total_paid_amount: number;
  additional_descriptions?: string;
  mutual_cancel_note?: string;
  project_rating_count: number;
  flag_count: number;
  message_count: number;
  follower_count: number;
  total_ratings: number;
  milestone_count: number;
  view_count: number;
  project_bid_invoice_count: number;
  payment_gateway_id?: number;
  paypal_pay_key?: string;
}

export interface ProjectsProjectCategories {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  project_category_id: number;
  project_id: number;
}

export interface ProviderUsers {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  provider_id: number;
  foreign_id?: string;
  access_token: string;
  access_token_secret?: string;
  is_connected: number;
  profile_picture_url?: string;
}

export interface Providers {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name?: string;
  slug: string;
  secret_key?: string;
  api_key?: string;
  icon_class?: string;
  button_class?: string;
  is_active: number;
  position?: number;
}

export interface Publications {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  title: string;
  publisher: string;
  description: string;
}

export interface QuestionAnswerOptions {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  question_id: number;
  option_text: string;
  is_correct_answer?: number;
}

export interface QuestionCategories {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name?: string;
  question_count: number;
}

export interface QuestionDisplayTypes {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name?: string;
}

export interface Questions {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  question_category_id: number;
  question: string;
  info_tip?: string;
  is_active?: number;
  exams_question_count?: number;
}

export interface QuoteBids {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  quote_request_id: number;
  quote_service_id?: number;
  quote_status_id: number;
  is_direct_send: number;
  quote_amount?: number;
  quote_type?: string;
  price_note?: string;
  quote_last_update_on?: Date | string;
  hired_on?: Date | string;
  completed_on?: Date | string;
  requestor_received_message_count: number;
  provider_received_message_count: number;
  requestor_unread_message_count: number;
  provider_unread_message_count: number;
  is_provider_readed: number;
  is_requestor_readed: number;
  used_credit_count: number;
  user_id?: number;
  service_provider_user_id?: number;
  escrow_amount: number;
  site_commission: number;
  is_paid_to_escrow: number;
  is_escrow_amount_released: number;
  coupon_id: number;
  last_new_quote_remainder_notify_date_to_freelancer?: Date | string;
  credit_purchase_log_id?: number;
  private_note_of_incomplete?: string;
  is_first_level_quote_request: number;
  is_show_bid_to_requestor: number;
  closed_on?: Date | string;
}

export interface QuoteCategories {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  parent_category_id?: number;
  name: string;
  slug: string;
  form_field_count: number;
  quote_request_count: number;
  is_active: number;
  credit_point_for_sending_quote: number;
  description?: string;
  is_featured: number;
}

export interface QuoteCategoriesQuoteServices {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  quote_category_id: number;
  quote_service_id: number;
}

export interface QuoteFaqAnswers {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  quote_service_id: number;
  quote_faq_question_template_id?: number;
  quote_user_faq_question_id?: number;
  answer: string;
}

export interface QuoteFaqQuestionTemplates {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  question: string;
  is_active?: number;
}

export interface QuoteRequestFormFields {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  quote_form_field_id: number;
  quote_request_id: number;
  response?: string;
}

export interface QuoteRequests {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  quote_category_id?: number;
  user_id?: number;
  quote_service_id?: number;
  title: string;
  description: string;
  best_day_time_for_work: string;
  full_address?: string;
  address?: string;
  city_id?: number;
  state_id?: number;
  country_id?: number;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  phone_no?: string;
  quote_bid_count: number;
  is_archived: number;
  is_send_request_to_other_service_providers: number;
  quote_bid_new_count: number;
  quote_bid_discussion_count: number;
  quote_bid_hired_count: number;
  quote_bid_completed_count: number;
  is_request_for_buy: number;
  last_new_quote_remainder_notify_date?: Date | string;
  is_quote_bid_sent: number;
  radius?: string;
  is_first_level_quote_request_sent: number;
  is_updated_bid_visibility_to_requestor: number;
  quote_bid_pending_discussion_count: number;
  quote_bid_closed_count: number;
  quote_bid_not_completed_count: number;
}

export interface QuoteServiceAudios {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  quote_service_id: number;
  embed_code: string;
}

export interface QuoteServicePhotos {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  quote_service_id: number;
  caption?: string;
}

export interface QuoteServiceVideos {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  quote_service_id: number;
  embed_code: string;
  video_url?: string;
}

export interface QuoteServices {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  business_name: string;
  slug: string;
  how_does_your_service_stand_out: string;
  full_address: string;
  address: string;
  city_id: number;
  state_id: number;
  country_id: number;
  zip_code?: string;
  latitude: number;
  longitude: number;
  website_url?: string;
  phone_number: string;
  is_service_provider_travel_to_customer_place: number;
  service_provider_travels_upto?: number;
  is_customer_travel_to_me: number;
  is_over_phone_or_internet: number;
  is_active: number;
  quote_service_photo_count: number;
  quote_service_audio_count: number;
  quote_service_video_count: number;
  quote_faq_answer_count?: number;
  quote_bid_count: number;
  quote_service_flag_count: number;
  under_discussion_count: number;
  hired_count: number;
  completed_count: number;
  year_founded?: number;
  number_of_employees?: number;
  what_do_you_enjoy_about_the_work_you_do: string;
  view_count: number;
  flag_count: number;
  total_rating: number;
  review_count: number;
  quote_bid_new_count: number;
  quote_bid_discussion_count: number;
  quote_bid_hired_count: number;
  quote_bid_completed_count: number;
  is_admin_suspend: number;
  quote_bid_not_completed_count: number;
  quote_bid_closed_count: number;
}

export interface QuoteStatuses {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
}

export interface QuoteUserFaqQuestions {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  user_id?: number;
  question?: string;
}

export interface Resources {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  name?: string;
  description?: string;
  folder_name?: string;
  contest_count?: number;
  contest_user_count?: number;
  revenue?: number;
  class_name?: string;
}

export interface ResumeDownloads {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  job_apply_id?: number;
  ip_id?: number;
}

export interface ResumeExtractions {
  id: number;
  user_id: number;
  attachment_id: number;
  user_profile_url: string;
  old_profile_score: number;
  new_profile_score: number;
  extraction_attempt1: number;
  extraction_attempt2: number;
  extraction_attempt3: number;
  extraction_time?: Date | string;
  is_resume_extracted: number;
  is_apply_job_resume_uploaded: number;
  is_historical_resume: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface ResumeRatings {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  job_id: number;
  job_apply_id: number;
  rating: number;
  comment: string;
}

export interface Reviews {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  to_user_id?: number;
  foreign_id: number;
  class: string;
  rating: number;
  message?: string;
  ip_id: number;
  is_freelancer?: number;
  model_id?: number;
  model_class?: string;
}

export interface Roles {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  is_active: number;
}

export interface SalaryTypes {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  is_active: number;
}

export interface ScreeningCandidates {
  id: number;
  project_id: number;
  bid_id: number;
  user_id: number;
  name: string;
  email?: string;
  phone?: string;
  title?: string;
  resume_filename: string;
  resume_content: string;
  extracted_skills: string;
  overall_score: number;
  verdict: string;
  flags: string;
  analysis_notes: string;
  years_of_experience?: number;
  location?: string;
  linkedin_url?: string;
  salary_range?: string;
  work_mode?: string;
  visa_status?: string;
  notice_period?: string;
  ready_to_relocate?: number;
  additional_details_complete: number;
  recruiter_notes?: string;
  parsing_confidence?: string;
  ml_parsed_data?: string;
  created_at: Date | string;
}

export interface ScreeningProjects {
  id: number;
  project_id: number;
  name: string;
  status: string;
  total_candidates?: number;
  processed_candidates?: number;
  created_at: Date | string;
}

export interface SeoGeneratedPages {
  id: number;
  page_url: string;
  template_id?: number;
  generated_title?: string;
  generated_description?: string;
  generated_keywords?: string;
  generated_schema?: any;
  last_generated?: Date | string;
}

export interface SeoStaticPages {
  id: number;
  page_url: string;
  page_name: string;
  title?: string;
  description?: string;
  keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  is_indexable?: number;
  robots_directive?: string;
  custom_schema?: any;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SeoTemplates {
  id: number;
  template_name: string;
  page_pattern: string;
  title_template: string;
  description_template: string;
  keywords_template?: string;
  og_title_template?: string;
  og_description_template?: string;
  schema_template?: any;
  is_indexable?: number;
  robots_directive?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SeoTrackingConfigs {
  id: number;
  platform_name: string;
  platform_key: string;
  tracking_id?: string;
  script_type: string;
  is_active: number;
  config_data?: any;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface SeoVariables {
  id: number;
  variable_name: string;
  variable_description?: string;
  data_source?: string;
  source_column?: string;
  formatting_rules?: any;
}

export interface SessionCookieConsent {
  id: number;
  session_id: string;
  user_id?: number;
  functional_cookies?: number;
  analytics_cookies?: number;
  marketing_cookies?: number;
  preferences_cookies?: number;
  consent_given_at?: Date | string;
  consent_updated_at?: Date | string;
  expires_at?: Date | string;
  ip_address?: string;
  user_agent?: string;
  consent_version?: string;
  is_active?: number;
}

export interface SettingCategories {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  description: string;
}

export interface Settings {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  setting_category_id: number;
  name: string;
  value?: string;
  description?: string;
  type: string;
  label: string;
  position: number;
  option_values?: string;
  is_send_to_frontend: number;
}

export interface SkillInfo {
  id: number;
  skill_id: number;
  title: string;
  description: string;
  why_hire_dev_label?: string;
  why_hire_side_label?: string;
  why_hire_label1?: string;
  why_hire_description1?: string;
  why_hire_label2?: string;
  why_hire_description2?: string;
  why_hire_label3?: string;
  why_hire_description3?: string;
  why_hire_label4?: string;
  why_hire_description4?: string;
  tech_stack_title?: string;
  common_projects_title?: string;
  common_project_title1?: string;
  common_project_description1?: string;
  common_project_title2?: string;
  common_project_description2?: string;
  common_project_title3?: string;
  common_project_description3?: string;
  common_project_title4?: string;
  common_project_description4?: string;
  seo_title?: string;
  seo_description?: string;
  is_active: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface SkillInfoFaqs {
  id: number;
  skill_info_id: number;
  question: string;
  answer: string;
  is_active: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface SkillInfoTechStack {
  id: number;
  skill_info_id: number;
  skill_id: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface Skills {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  slug: string;
  project_count: number;
  user_count: number;
  open_project_count: number;
  is_active: number;
  active_job_count: number;
  job_count: number;
}

export interface SkillsPortfolios {
  id: number;
  portfolio_id: number;
  skill_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SkillsProjects {
  id: number;
  project_id: number;
  skill_id: number;
  weight?: number;
}

export interface SkillsUsers {
  id: number;
  user_id?: number;
  skill_id?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface States {
  id: number;
  country_id: number;
  name: string;
  code?: string;
  adm1code?: string;
  is_active: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SubscriptionFeatures {
  id: number;
  plan_id: string;
  feature_name: string;
  feature_limit: string;
  description?: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface SubscriptionPayments {
  id: number;
  subscription_id: number;
  user_id: number;
  payment_method: string;
  payment_id: string;
  transaction_id?: string;
  amount: number;
  currency: string;
  status: string;
  payment_date: Date | string;
  response_data?: any;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface SubscriptionPlans {
  id: string;
  name: string;
  price: number;
  currency: string;
  billing_cycle: string;
  is_popular?: number;
  paypal_plan_id?: string;
  status: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface SubscriptionUsage {
  id: number;
  subscription_id: number;
  user_id: number;
  job_posts: number;
  resume_downloads: number;
  profile_views: number;
  screenly_access: number;
  candidate_screening: number;
  reset_date: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface SubscriptionUsageLogs {
  id: number;
  subscription_id: number;
  user_id: number;
  usage_type: string;
  usage_count: number;
  created_at: Date | string;
}

export interface TempSkills {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  slug: string;
  project_count: number;
  user_count: number;
  open_project_count: number;
  is_active: number;
  active_job_count: number;
  job_count: number;
}

export interface TempSkillsProjects {
  id: number;
  project_id: number;
  skill_id: number;
  weight: number;
}

export interface TempSkillsUsers {
  id: number;
  user_id: number;
  skill_id: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface Timezones {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  code: string;
  name: string;
  gmt_offset: string;
  dst_offset: string;
  raw_offset: string;
  hasdst: number;
}

export interface Transactions {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  to_user_id?: number;
  foreign_id: number;
  class: string;
  transaction_type: string;
  payment_gateway_id?: number;
  amount: number;
  site_revenue_from_freelancer?: number;
  coupon_id?: number;
  site_revenue_from_employer: number;
  model_id?: number;
  model_class?: string;
  zazpay_gateway_id?: number;
}

export interface UploadHosters {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  upload_service_id?: number;
  upload_service_type_id?: number;
  total_upload_count?: number;
  total_upload_error_count?: number;
  total_upload_filesize?: number;
  is_active?: number;
}

export interface UploadServiceSettings {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  upload_service_id?: number;
  name?: string;
  value?: string;
}

export interface UploadServiceTypes {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  name?: string;
  slug?: string;
}

export interface UploadServices {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  name?: string;
  slug?: string;
  total_quota?: number;
  total_upload_count?: number;
  total_upload_filesize?: number;
  total_upload_error_count?: number;
}

export interface UploadStatuses {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  name?: string;
}

export interface Uploads {
  id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  upload_service_type_id?: number;
  upload_service_id?: number;
  user_id?: number;
  contest_user_id?: number;
  upload_status_id?: number;
  video_url?: string;
  vimeo_video_id?: string;
  youtube_video_id?: string;
  vimeo_thumbnail_url?: string;
  youtube_thumbnail_url?: string;
  video_title?: string;
  filesize?: number;
  failure_message?: string;
  soundcloud_audio_id?: string;
  audio_url?: string;
}

export interface UserCashWithdrawals {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  withdrawal_status_id: number;
  amount: number;
  remark?: string;
  money_transfer_account_id: number;
  withdrawal_fee: number;
}

export interface UserLogins {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  ip_id?: number;
  user_agent: string;
}

export interface UserSubscriptions {
  id: number;
  user_id: number;
  plan_id: string;
  status: string;
  start_date: Date | string;
  end_date: Date | string;
  paypal_subscription_id?: string;
  paypal_order_id?: string;
  amount_paid?: number;
  currency?: string;
  billing_cycle: string;
  auto_renew?: number;
  cancelled_at?: Date | string;
  cancellation_reason?: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface Users {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  role_id: number;
  username: string;
  email: string;
  password: string;
  bid_count: number;
  won_bid_count: number;
  user_login_count: number;
  project_count: number;
  project_flag_count: number;
  job_flag_count: number;
  quote_service_flag_count: number;
  portfolio_flag_count: number;
  available_wallet_amount?: number;
  ip_id?: number;
  last_login_ip_id?: number;
  last_logged_in_time?: Date | string;
  is_agree_terms_conditions: number;
  is_active: number;
  is_email_confirmed: number;
  total_amount_withdrawn: number;
  job_count: number;
  job_apply_count: number;
  portfolio_count: number;
  portfolio_favorite_count: number;
  quote_service_count: number;
  quote_request_count: number;
  quote_bid_count: number;
  exams_user_count: number;
  exams_user_passed_count: number;
  zazpay_receiver_account_id?: number;
  available_credit_count: number;
  total_credit_bought: number;
  first_name?: string;
  last_name?: string;
  gender_id?: number;
  quote_credit_purchase_log_count: number;
  contest_count: number;
  contest_user_count: number;
  total_site_revenue_as_employer: number;
  total_site_revenue_as_freelancer: number;
  total_earned_amount_as_freelancer: number;
  view_count: number;
  follower_count: number;
  flag_count: number;
  total_rating_as_employer: number;
  review_count_as_employer: number;
  total_rating_as_freelancer: number;
  review_count_as_freelancer: number;
  education_count: number;
  work_profile_count: number;
  certificate_count: number;
  publication_count: number;
  address?: string;
  address1?: string;
  city_id?: number;
  state_id?: number;
  country_id?: number;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  full_address?: string;
  expired_balance_credit_points: number;
  is_made_deposite: number;
  hourly_rate?: number;
  total_spend_amount_as_employer: number;
  project_completed_count: number;
  project_failed_count: number;
  designation?: string;
  about_me?: string;
  blocked_amount?: number;
  is_have_unreaded_activity: number;
  availability?: string;
  experience_level?: string;
  work_mode?: string;
  availability_to_join?: number;
  current_company?: string;
  bizoforce_company_id?: number;
  bizoforce_company_name?: string;
  bizoforce_company_website?: string;
  how_soon_join?: string;
  linkedin_url?: string;
  schedule_day?: string;
  schedule_start_time?: string;
  schedule_end_time?: string;
  profile_score: number;
  profile_step: string;
  is_apply_job_resume_uploaded: number;
  is_resume_extracted: number;
}

export interface Vaults {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  masked_cc: string;
  credit_card_type: string;
  vault_key?: string;
  vault_id?: number;
  user_id?: number;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  phone?: string;
  is_primary?: number;
  credit_card_expire?: string;
  expire_month?: number;
  expire_year?: number;
  cvv2?: string;
  first_name?: string;
  last_name?: string;
  payment_type: number;
}

export interface Views {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  foreign_id: number;
  class: string;
  ip_id: number;
}

export interface WalletTransactionLogs {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  foreign_id: number;
  class: string;
  amount: number;
  status?: string;
  payment_type?: string;
}

export interface Wallets {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  amount: number;
  payment_gateway_id: number;
  gateway_id?: number;
  is_payment_completed: number;
  paypal_pay_key?: string;
}

export interface WorkProfiles {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  title: string;
  description?: string;
  from_month_year: string;
  to_month_year?: string;
  company?: string;
  currently_working?: number;
}

export interface ZazpayIpnLogs {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  ip?: number;
  post_variable?: string;
}

export interface ZazpayPaymentGateways {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  zazpay_gateway_name?: string;
  zazpay_gateway_id?: number;
  zazpay_payment_group_id: number;
  zazpay_gateway_details?: string;
  days_after_amount_paid?: number;
  is_marketplace_supported?: number;
}

export interface ZazpayPaymentGatewaysUsers {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  zazpay_payment_gateway_id: number;
}

export interface ZazpayPaymentGroups {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  zazpay_group_id: number;
  name?: string;
  thumb_url?: string;
}

export interface ZazpayTransactionLogs {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  user_id?: number;
  amount: number;
  payment_id?: number;
  class?: string;
  foreign_id?: number;
  zazpay_pay_key?: string;
  merchant_id?: number;
  gateway_id?: number;
  gateway_name?: string;
  status?: string;
  payment_type?: string;
  buyer_id?: number;
  buyer_email?: string;
  buyer_address?: string;
}

