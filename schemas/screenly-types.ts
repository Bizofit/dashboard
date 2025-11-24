// SCREENLY Database TypeScript Interfaces
// Generated: 11/22/2025, 12:50:35 PM
// Database Type: postgres
// Total Tables: 51

export interface AdminSettings {
  id: number;
  settings_key: string;
  settings_data: any;
  updated_at?: Date | string;
  created_at?: Date | string;
}

export interface ApiKeys {
  id: number;
  user_id: number;
  name: string;
  key_hash: string;
  key_prefix: string;
  is_active?: boolean;
  last_used_at?: Date | string;
  expires_at?: Date | string;
  permissions?: any;
  rate_limit?: number;
  usage_count?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ApiUsageTracking {
  id: string;
  user_id: number;
  campaign_id?: string;
  company_id?: string;
  api_provider: string;
  endpoint?: string;
  method?: string;
  request_size?: number;
  response_size?: number;
  cost?: number;
  tokens_used?: number;
  credits_used?: number;
  status: string;
  response_time_ms?: number;
  error_message?: string;
  request_type?: string;
  metadata?: any;
  created_at: Date | string;
}

export interface AppliedMigrations {
  id: number;
  filename: string;
  applied_at?: Date | string;
}

export interface BrandingSettings {
  id: number;
  application_name?: string;
  company_name?: string;
  logo_url?: string;
  favicon_url?: string;
  apple_touch_icon_url?: string;
  theme_color?: string;
  site_name?: string;
  title?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  primary_color?: string;
  secondary_color?: string;
  tertiary_color?: string;
  og_image?: string;
}

export interface CandidateApplications {
  id: number;
  candidate_id: number;
  requisition_id: number;
  screening_project_id?: number;
  application_status?: string;
  current_stage_id?: number;
  source?: string;
  applied_at: Date | string;
  cover_letter?: string;
  application_notes?: string;
  referral_source?: string;
  company_id: string;
  created_at: Date | string;
  updated_at: Date | string;
  stage_entered_at?: Date | string;
  days_in_current_stage?: number;
  application_source?: string;
  overall_rating?: number;
  recommendation?: string;
  rejection_reason?: string;
  rejected_at?: Date | string;
  last_contact_date?: Date | string;
  last_contact_type?: string;
  next_follow_up_date?: Date | string;
  communication_notes?: string;
  referrer_id?: number;
  rejected_by?: number;
  created_by?: number;
  updated_by?: number;
}

export interface CandidateComments {
  id: number;
  candidate_id: number;
  requisition_id: number;
  user_id: number;
  comment_text: string;
  comment_type?: string;
  is_private?: boolean;
  rating?: number;
  created_at: Date | string;
  updated_at: Date | string;
  company_id: string;
}

export interface CandidateProfiles {
  id: number;
  candidate_id: number;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  years_of_experience?: number;
  extracted_summary?: string;
  professional_title?: string;
  work_experience_evidence?: any;
  raw_skills_extraction?: any;
  education_background?: any;
  ai_analysis_insights?: any;
  parsing_metadata?: any;
  company_id?: string;
  created_by?: number;
  updated_by?: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface CandidateShares {
  id: number;
  candidate_id: number;
  project_id: number;
  share_token: string;
  created_by: number;
  expires_at?: Date | string;
  access_count?: number;
  last_accessed_at?: Date | string;
  is_active?: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface CandidateSkillProficiencies {
  id: number;
  candidate_id: number;
  skill_name: string;
  proficiency_score: number;
  evidence_strength: number;
  evidence_text?: string;
  years_experience?: number;
  last_used_year?: number;
  skill_category: string;
  company_id?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface CandidateStageHistory {
  id: number;
  candidate_id: number;
  screening_project_id: number;
  previous_stage?: string;
  new_stage: string;
  moved_by?: number;
  moved_at: Date | string;
  notes?: string;
  feedback?: any;
  duration_in_previous_stage?: number;
  automated_move?: boolean;
  move_reason?: string;
  created_at: Date | string;
  application_id?: number;
  stage_id?: number;
  requisition_id?: number;
  entered_at?: Date | string;
  exited_at?: Date | string;
  days_in_stage?: number;
  stage_outcome?: string;
  stage_rating?: number;
  interviewer_id?: number;
  interview_feedback?: string;
  feedback_summary?: string;
  strengths_noted?: string;
  concerns_noted?: string;
  recommendation?: string;
  decision_made_by?: number;
  decision_notes?: string;
  next_steps?: string;
  company_id?: string;
  updated_at?: Date | string;
}

export interface Candidates {
  id: number;
  job_description_id: number;
  name: string;
  email?: string;
  title?: string;
  resume_filename: string;
  resume_content: string;
  extracted_skills: any;
  overall_score: number;
  verdict: string;
  flags?: any;
  analysis_notes: any;
  created_at: Date | string;
  parsing_confidence?: any;
  ml_parsed_data?: any;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  salary_range?: string;
  work_mode?: string;
  visa_status?: string;
  notice_period?: string;
  ready_to_relocate?: boolean;
  additional_details_complete?: boolean;
  recruiter_notes?: string;
  created_by?: number;
  company_id?: string;
  skill_summary_vector?: string;
  search_keywords?: any;
  primary_skills?: string;
  skill_experience_updated_at?: Date | string;
  enhanced_scoring_data?: string;
  job_specific_score?: number;
  location_score?: number;
  standard_score?: number;
  enhanced_score?: number;
  expected_salary?: number;
  scoring_metadata?: any;
  years_of_experience?: number;
  updated_at?: Date | string;
  parsing_version?: string;
  last_auto_parsed?: Date | string;
  auto_parsing_enabled?: boolean;
  api_source?: string;
  external_job_id?: string;
  external_candidate_id?: string;
  api_synced_at?: Date | string;
  api_metadata?: any;
  availability?: string;
  preferred_salary_range?: string;
  preferred_work_type?: string;
  remote_work_preference?: boolean;
  work_authorization?: string;
  giglancer_id?: string;
  skill_summary?: any;
  comprehensive_score?: number;
  skill_diversity_index?: number;
  experience_level?: string;
  primary_domain?: string;
  last_reprocessed_at?: Date | string;
  reprocessing_reason?: string;
}

export interface ContactEnrichmentCache {
  id: string;
  cache_key: string;
  input_data: any;
  apollo_result?: any;
  pdl_result?: any;
  enrichment_quality?: string;
  confidence?: number;
  completeness?: number;
  hit_count?: number;
  last_hit: Date | string;
  ttl: Date | string;
  original_cost?: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface GeneratedQuestions {
  id: number;
  job_description_id: number;
  question_type: string;
  question_id: string;
  question: string;
  expected_duration: number;
  skills_assessed: any;
  difficulty_level: string;
  experience_level: string;
  is_active?: boolean;
  created_at: Date | string;
}

export interface HiringTeamMembers {
  id: number;
  requisition_id: number;
  user_id: number;
  role: string;
  permissions?: any;
  can_view_all_candidates?: boolean;
  can_advance_candidates?: boolean;
  can_reject_candidates?: boolean;
  can_add_feedback?: boolean;
  notification_preferences?: any;
  added_at: Date | string;
  added_by: number;
  last_active_at?: Date | string;
  is_active?: boolean;
  company_id: string;
}

export interface IntegrationSettings {
  id: number;
  service: string;
  config: any;
  is_active?: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface InterviewNotifications {
  id: number;
  interview_id: number;
  type: string;
  status: string;
  email: string;
  subject: string;
  content: string;
  sent_at?: Date | string;
  error_message?: string;
  created_at: Date | string;
}

export interface InterviewQuestions {
  id: number;
  interview_id: number;
  question_order: number;
  question_data: any;
  created_at: Date | string;
}

export interface InterviewResponses {
  id: number;
  interview_id: number;
  question_id: number;
  video_url?: string;
  audio_url?: string;
  duration: number;
  transcript?: string;
  analysis?: any;
  score?: number;
  analysis_complete?: boolean;
  created_at: Date | string;
}

export interface InterviewSchedules {
  id: number;
  candidate_id: number;
  requisition_id: number;
  interviewer_id: number;
  interview_type: string;
  scheduled_at: Date | string;
  duration_minutes?: number;
  location?: string;
  meeting_link?: string;
  status?: string;
  feedback?: string;
  rating?: number;
  recommendation?: string;
  company_id: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface InterviewShares {
  id: number;
  interview_id: number;
  share_token: string;
  created_by: number;
  expires_at?: Date | string;
  access_count?: number;
  last_accessed_at?: Date | string;
  is_active?: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface Interviews {
  id: number;
  candidate_id: number;
  job_description_id: number;
  screening_project_id: number;
  status: string;
  scheduled_at?: Date | string;
  started_at?: Date | string;
  completed_at?: Date | string;
  duration?: number;
  overall_score?: number;
  config: any;
  invite_token: string;
  invite_sent_at?: Date | string;
  reminder_sent_at?: Date | string;
  recording_url?: string;
  analysis_complete?: boolean;
  cheating_detected?: boolean;
  created_at: Date | string;
}

export interface JobDescriptions {
  id: number;
  title: string;
  department: string;
  description: string;
  skill_matrix: any;
  created_at: Date | string;
  experience_level?: string;
  location?: string;
  created_by?: number;
  company_id?: string;
  required_experience_years?: number;
  work_mode?: string;
  generate_questions?: boolean;
  workflow_type?: string;
  min_salary?: number;
  max_salary?: number;
  required_education?: string;
  hiring_urgency?: string;
  experience_required?: string;
  remote_work_allowed?: boolean;
  salary_currency?: string;
  visa_requirements?: string;
  work_type?: string;
  enable_candidate_notifications?: boolean;
  is_published?: boolean;
  published_at?: Date | string;
}

export interface JobOffers {
  id: number;
  application_id: number;
  candidate_id: number;
  requisition_id: number;
  offer_letter_number?: string;
  job_title: string;
  base_salary: number;
  bonus_amount?: number;
  equity_percentage?: number;
  benefits_summary?: string;
  start_date?: string;
  offer_expiry_date?: string;
  status?: string;
  sent_at?: Date | string;
  response_due_date?: Date | string;
  candidate_response_date?: Date | string;
  final_decision_date?: Date | string;
  negotiation_rounds?: number;
  candidate_counter_offer?: any;
  final_agreed_terms?: any;
  rejection_reason?: string;
  requires_approval?: boolean;
  approved_by?: number;
  approval_notes?: string;
  approved_at?: Date | string;
  offer_letter_url?: string;
  signed_offer_url?: string;
  company_id: string;
  created_by: number;
  updated_by?: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface JobPostings {
  id: number;
  requisition_id: number;
  job_description_id?: number;
  title: string;
  department: string;
  location?: string;
  remote_option?: string;
  employment_type?: string;
  experience_level?: string;
  job_summary?: string;
  responsibilities?: string;
  qualifications?: string;
  preferred_skills?: string;
  benefits?: string;
  salary_min?: number;
  salary_max?: number;
  salary_display_type?: string;
  status?: string;
  is_public?: boolean;
  published_at?: Date | string;
  closing_date?: Date | string;
  application_deadline?: Date | string;
  slug?: string;
  meta_description?: string;
  external_job_board_urls?: any;
  application_method?: string;
  external_application_url?: string;
  application_instructions?: string;
  require_cover_letter?: boolean;
  required_documents?: any;
  view_count?: number;
  application_count?: number;
  last_viewed_at?: Date | string;
  company_id: string;
  created_by: number;
  updated_by?: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface JobRequisitions {
  id: number;
  req_number: string;
  title: string;
  department: string;
  hiring_manager_id?: number;
  recruiter_id?: number;
  requestor_id: number;
  job_description_id?: number;
  positions_to_fill: number;
  employment_type?: string;
  priority?: string;
  target_start_date?: string;
  budget_min?: number;
  budget_max?: number;
  annual_budget?: number;
  approval_status?: string;
  approved_by?: number;
  approved_at?: Date | string;
  rejection_reason?: string;
  status?: string;
  filled_positions?: number;
  pipeline_status?: string;
  target_hire_date?: string;
  actual_hire_date?: string;
  justification?: string;
  company_id: string;
  created_by: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface MigrationHistory {
  id: number;
  migration_name: string;
  applied_at?: Date | string;
  version?: string;
  description?: string;
}

export interface MlModels {
  id: number;
  name: string;
  version: string;
  model_type: string;
  training_data: any;
  performance: any;
  is_active?: boolean;
  created_at: Date | string;
}

export interface ParsingFeedback {
  id: number;
  candidate_id: number;
  field_name: string;
  extracted_value?: string;
  corrected_value: string;
  confidence: number;
  feedback_type: string;
  resume_context?: string;
  user_id?: string;
  created_at: Date | string;
}

export interface Payments {
  id: number;
  user_id: number;
  payment_provider: string;
  provider_payment_id: string;
  provider_transaction_id?: string;
  amount: number;
  currency: string;
  status: string;
  subscription_plan: string;
  billing_period?: string;
  payment_method?: string;
  payer_email?: string;
  payer_name?: string;
  provider_response?: any;
  failure_reason?: string;
  processed_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PipelineStages {
  id: number;
  name: string;
  stage_type: string;
  order_sequence: number;
  is_default?: boolean;
  is_active?: boolean;
  stage_config?: any;
  require_feedback?: boolean;
  auto_advance?: boolean;
  notification_settings?: any;
  company_id: string;
  created_by: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface PublicAssessmentHistory {
  id: number;
  candidate_id?: number;
  session_id?: number;
  assessment_type: string;
  started_at?: Date | string;
  completed_at?: Date | string;
  duration_seconds?: number;
  assessment_id?: number;
  user_feedback?: any;
  completion_rate?: number;
  page_views?: number;
  time_spent_seconds?: number;
}

export interface PublicAssessments {
  id: number;
  candidate_id?: number;
  resume_upload_id?: number;
  assessment_type?: string;
  assessment_version?: string;
  overall_score?: number;
  ats_compatibility_score?: number;
  keyword_optimization_score?: number;
  format_score?: number;
  experience_relevance_score?: number;
  analysis_results?: any;
  skill_extraction?: any;
  improvement_suggestions?: any;
  ats_flags?: any;
  modern_resume_score?: number;
  readability_score?: number;
  career_level?: string;
  predicted_salary_range?: any;
  role_recommendations?: any;
  completed_at?: Date | string;
  created_at?: Date | string;
}

export interface PublicCandidates {
  id: number;
  google_id?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  profile_image_url?: string;
  phone_number?: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  years_experience?: number;
  desired_salary_min?: number;
  desired_salary_max?: number;
  current_job_title?: string;
  profile_visibility?: string;
  allow_recruiter_contact?: boolean;
  is_active?: boolean;
  email_verified?: boolean;
  profile_completed?: boolean;
  created_at?: Date | string;
  updated_at?: Date | string;
  last_login_at?: Date | string;
  password_hash?: string;
  email_verification_token?: string;
  email_verification_expires?: Date | string;
  password_reset_token?: string;
  password_reset_expires?: Date | string;
}

export interface PublicJobApplications {
  id: number;
  candidate_id: number;
  job_id: number;
  resume_upload_id?: number;
  cover_letter?: string;
  application_status?: string;
  match_score?: number;
  skills_match_score?: number;
  experience_match_score?: number;
  recruiter_notes?: string;
  recruiter_rating?: string;
  viewed_by_recruiter?: boolean;
  recruiter_viewed_at?: Date | string;
  converted_to_main_candidate?: boolean;
  main_candidate_id?: number;
  applied_at?: Date | string;
  updated_at?: Date | string;
}

export interface PublicJobs {
  id: number;
  title: string;
  company_name: string;
  location?: string;
  job_type?: string;
  experience_level?: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  benefits?: string;
  salary_min?: number;
  salary_max?: number;
  currency?: string;
  required_skills?: any;
  preferred_skills?: any;
  is_active?: boolean;
  is_featured?: boolean;
  applications_count?: number;
  company_size?: string;
  industry?: string;
  remote_allowed?: boolean;
  source_system?: string;
  external_job_id?: string;
  posted_at?: Date | string;
  expires_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PublicResumeUploads {
  id: number;
  candidate_id?: number;
  session_id?: number;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  file_type: string;
  processing_status?: string;
  parsing_completed?: boolean;
  ai_analysis_completed?: boolean;
  parsed_text?: string;
  structured_data?: any;
  error_message?: string;
  retry_count?: number;
  uploaded_at?: Date | string;
  processed_at?: Date | string;
}

export interface PublicSessions {
  id: number;
  session_token: string;
  candidate_id?: number;
  ip_address?: string;
  user_agent?: string;
  browser_fingerprint?: string;
  is_authenticated?: boolean;
  assessment_started?: boolean;
  assessment_completed?: boolean;
  requests_count?: number;
  last_request_at?: Date | string;
  expires_at: Date | string;
  created_at?: Date | string;
}

export interface ScreeningProjects {
  id: number;
  job_description_id: number;
  name: string;
  status: string;
  total_candidates?: number;
  processed_candidates?: number;
  created_at: Date | string;
  created_by?: number;
  company_id?: string;
  scoring_module: string;
  scoring_config?: any;
  pipeline_template?: string;
}

export interface Sessions {
  sid: string;
  sess: any;
  expire: Date | string;
}

export interface SourcedCandidates {
  id: string;
  campaign_id?: string;
  user_id: number;
  company_id?: string;
  source_type: string;
  source_id?: string;
  source_url?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  current_title?: string;
  current_company?: string;
  location?: string;
  experience_years?: number;
  skills?: any;
  industries?: any;
  seniority?: string;
  profile_data: any;
  data_quality_score?: number;
  profile_completeness_score?: number;
  contact_info_quality?: string;
  match_score?: number;
  apollo_cost?: number;
  pdl_cost?: number;
  total_cost?: number;
  deduplication_hash?: string;
  is_duplicate?: boolean;
  duplicate_of_id?: string;
  added_to_pipeline?: boolean;
  pipeline_stage?: string;
  candidate_id?: number;
  created_at: Date | string;
  updated_at: Date | string;
  contacted_at?: Date | string;
  last_activity_at?: Date | string;
  source_channel: string;
  enriched_profile: any;
  contact_attempts?: number;
  last_contact_date?: Date | string;
  response_status?: string;
  engagement_score?: number;
  enrichment_cost?: number;
  apollo_data?: any;
  pdl_data?: any;
  hr_feedback?: string;
  last_enriched_at?: Date | string;
  giglancer_data?: any;
  processing_status?: string;
  processing_error?: string;
  processing_attempts?: number;
  last_processed_at?: Date | string;
  matched_to_job_id?: number;
  parsed_resume_data?: any;
  skill_scoring_results?: any;
  ai_analysis?: any;
  resume_text?: string;
  processing_metadata?: any;
  overall_skill_score?: number;
  marketability?: string;
  ai_processed?: boolean;
  resume_file_path?: string;
}

export interface SourcingAgentConfigs {
  id: string;
  user_id: number;
  company_id?: string;
  agent_name: string;
  agent_type: string;
  is_active?: boolean;
  schedule_type: string;
  cron_expression?: string;
  interval_minutes?: number;
  triggers: any;
  actions: any;
  conditions?: any;
  last_executed_at?: Date | string;
  next_execution_at?: Date | string;
  execution_count?: number;
  success_rate?: number;
  avg_execution_time?: number;
  max_daily_cost?: number;
  current_daily_cost?: number;
  last_cost_reset?: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface SourcingCampaigns {
  id: string;
  user_id: number;
  company_id?: string;
  name: string;
  description?: string;
  status: string;
  job_requirements: any;
  apollo_search_query?: any;
  pdl_search_query?: any;
  target_candidate_count?: number;
  max_cost_per_candidate?: number;
  enable_auto_enrichment?: boolean;
  enable_deduplication?: boolean;
  candidates_found?: number;
  candidates_enriched?: number;
  total_cost_spent?: number;
  avg_cost_per_candidate?: number;
  auto_add_to_pipeline?: boolean;
  target_pipeline_stage?: string;
  auto_contact_enabled?: boolean;
  contact_template?: string;
  created_at: Date | string;
  updated_at: Date | string;
  last_run_at?: Date | string;
  next_run_at?: Date | string;
}

export interface SubscriptionPlanFeatures {
  id: number;
  plan_id?: string;
  feature_key: string;
  feature_value: string;
  feature_type?: string;
  created_at?: Date | string;
}

export interface SubscriptionPlans {
  id: number;
  plan_id: string;
  name: string;
  description?: string;
  price: number;
  interval: string;
  is_active?: boolean;
  is_featured?: boolean;
  paypal_plan_id?: string;
  stripe_price_id?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SubscriptionUsage {
  id: number;
  user_id: number;
  feature_key: string;
  usage_count?: number;
  period_start?: Date | string;
  period_end?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TokenUsage {
  id: number;
  service: string;
  endpoint: string;
  tokens_used: number;
  cost?: any;
  timestamp: Date | string;
  user_id?: number;
  created_at?: Date | string;
}

export interface TrainingJobs {
  id: number;
  model_id?: number;
  status: string;
  training_data_count?: number;
  accuracy?: number;
  logs?: string;
  started_at?: Date | string;
  completed_at?: Date | string;
  created_at: Date | string;
}

export interface UserFeedback {
  id: number;
  candidate_id: number;
  job_description_id: number;
  original_score: number;
  feedback_score: number;
  feedback_verdict: string;
  feedback?: string;
  created_at: Date | string;
}

export interface Users {
  id: number;
  google_id?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  profile_image_url?: string;
  is_active?: boolean;
  last_login_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  password_hash?: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  subscription_plan?: string;
  subscription_status?: string;
  subscription_current_period_end?: Date | string;
  subscription_cancel_at_period_end?: boolean;
  usage_count?: number;
  monthly_usage_reset?: Date | string;
  role: string;
  phone_number?: string;
  work_email?: string;
  company_name?: string;
  company_id?: string;
  paypal_subscription_id?: string;
  payment_provider?: string;
  paypal_plan_id?: string;
}

export interface WorkExperience {
  id: number;
  candidate_id: number;
  company_name: string;
  job_title: string;
  start_date?: string;
  end_date?: string;
  duration?: string;
  description?: string;
  technologies?: any;
  is_current_job?: boolean;
  location?: string;
  employment_type?: string;
  extraction_confidence?: number;
  raw_text?: string;
  created_at: Date | string;
}

