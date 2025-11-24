// WORK Database TypeScript Interfaces
// Generated: 11/22/2025, 12:50:35 PM
// Database Type: mysql
// Total Tables: 226

export interface AcceptEstimates {
  id: number;
  company_id?: number;
  estimate_id: number;
  full_name: string;
  email: string;
  signature: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface AttendanceSettings {
  id: number;
  company_id?: number;
  office_start_time: Date | string;
  office_end_time: Date | string;
  halfday_mark_time?: Date | string;
  late_mark_duration: number;
  clockin_in_day: number;
  employee_clock_in_out: string;
  office_open_days: string;
  ip_address?: string;
  radius?: number;
  radius_check: string;
  ip_check: string;
  alert_after?: number;
  alert_after_status: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Attendances {
  id: number;
  company_id?: number;
  user_id: number;
  clock_in_time: Date | string;
  clock_out_time?: Date | string;
  clock_in_ip: string;
  clock_out_ip: string;
  working_from: string;
  late: string;
  half_day: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface AuthorizeInvoices {
  id: number;
  company_id: number;
  package_id: number;
  transaction_id?: string;
  amount?: string;
  pay_date?: Date | string;
  next_pay_date?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface AuthorizeSubscriptions {
  id: number;
  company_id?: number;
  subscription_id: string;
  plan_id?: number;
  plan_type?: string;
  ends_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ClientCategories {
  id: number;
  company_id?: number;
  category_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ClientContacts {
  id: number;
  company_id?: number;
  user_id: number;
  contact_name: string;
  phone?: string;
  email?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ClientDetails {
  id: number;
  company_id?: number;
  user_id: number;
  name?: string;
  email?: string;
  image?: string;
  mobile?: string;
  company_name?: string;
  address?: string;
  shipping_address?: string;
  office_phone?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  website?: string;
  note?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  skype?: string;
  gst_number?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  email_notifications: number;
  country_id?: number;
  category_id?: number;
  sub_category_id?: number;
}

export interface ClientDocs {
  id: number;
  company_id?: number;
  user_id: number;
  name: string;
  filename: string;
  hashname: string;
  size?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ClientSubCategories {
  id: number;
  company_id?: number;
  category_id: number;
  category_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ClientUserNotes {
  id: number;
  company_id?: number;
  user_id: number;
  note_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Companies {
  id: number;
  company_name: string;
  company_email: string;
  company_phone: string;
  logo?: string;
  login_background?: string;
  address: string;
  website?: string;
  currency_id?: number;
  package_id?: number;
  package_type: string;
  timezone: string;
  date_format: string;
  date_picker_format?: string;
  moment_format?: string;
  time_format: string;
  week_start: number;
  locale: string;
  latitude?: number;
  longitude?: number;
  leaves_start_from: string;
  active_theme: string;
  status: string;
  task_self: string;
  last_updated_by?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  stripe_id?: string;
  card_brand?: string;
  card_last_four?: string;
  trial_ends_at?: Date | string;
  licence_expire_on?: Date | string;
  rounded_theme: number;
  last_login?: Date | string;
  default_task_status?: number;
  show_update_popup: number;
  dashboard_clock: number;
  ticket_form_google_captcha: number;
  lead_form_google_captcha: number;
  rtl: number;
}

export interface ContractDiscussions {
  id: number;
  company_id?: number;
  contract_id: number;
  from: number;
  message: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ContractFiles {
  id: number;
  company_id: number;
  user_id: number;
  contract_id: number;
  filename: string;
  description?: string;
  google_url?: string;
  hashname?: string;
  size?: string;
  dropbox_link?: string;
  external_link?: string;
  external_link_name?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ContractRenews {
  id: number;
  company_id?: number;
  renewed_by: number;
  contract_id: number;
  start_date: Date | string;
  end_date: Date | string;
  amount: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ContractSigns {
  id: number;
  company_id?: number;
  contract_id: number;
  full_name: string;
  email: string;
  signature: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ContractTypes {
  id: number;
  company_id?: number;
  name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Contracts {
  id: number;
  company_id?: number;
  client_id: number;
  subject: string;
  amount: string;
  original_amount: number;
  contract_type_id?: number;
  start_date: Date | string;
  original_start_date: Date | string;
  end_date?: Date | string;
  original_end_date?: Date | string;
  description?: string;
  contract_name?: string;
  company_logo?: string;
  alternate_address?: string;
  mobile?: string;
  office_phone?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  contract_detail?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  send_status: number;
  event_id?: string;
}

export interface Conversation {
  id: number;
  user_one: number;
  user_two: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ConversationReply {
  id: number;
  conversation_id: number;
  reply: string;
  user_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Countries {
  id: number;
  iso: string;
  name: string;
  nicename: string;
  iso3?: string;
  numcode?: number;
  phonecode: number;
}

export interface CreditNoteItems {
  id: number;
  credit_note_id: number;
  item_name: string;
  type: string;
  quantity: number;
  unit_price: number;
  amount: number;
  taxes?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  hsn_sac_code?: string;
}

export interface CreditNotes {
  id: number;
  company_id?: number;
  project_id?: number;
  cn_number: string;
  invoice_id?: number;
  issue_date: Date | string;
  due_date: Date | string;
  discount: number;
  discount_type: string;
  sub_total: number;
  total: number;
  currency_id?: number;
  status: string;
  recurring: string;
  billing_frequency?: string;
  billing_interval?: number;
  billing_cycle?: number;
  file?: string;
  file_original_name?: string;
  note?: string;
  deleted_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  client_id?: number;
}

export interface CreditNotesInvoice {
  id: number;
  credit_notes_id: number;
  invoice_id: number;
  date: Date | string;
  credit_amount: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Currencies {
  id: number;
  company_id?: number;
  currency_name: string;
  currency_symbol?: string;
  currency_code: string;
  exchange_rate?: number;
  is_cryptocurrency: string;
  usd_price?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  currency_position: string;
  status: string;
}

export interface CurrencyFormatSettings {
  id: number;
  company_id?: number;
  currency_position: string;
  no_of_decimal: number;
  thousand_separator?: string;
  decimal_separator?: string;
  sample_data?: string;
}

export interface CustomFieldGroups {
  id: number;
  company_id?: number;
  name: string;
  model?: string;
}

export interface CustomFields {
  id: number;
  custom_field_group_id?: number;
  label: string;
  name: string;
  type: string;
  required: string;
  values?: string;
  show_employee: number;
}

export interface CustomFieldsData {
  id: number;
  custom_field_id: number;
  model_id: number;
  model?: string;
  value: string;
}

export interface DashboardWidgets {
  id: number;
  company_id?: number;
  widget_name: string;
  status: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  dashboard_type?: string;
}

export interface Designations {
  id: number;
  company_id?: number;
  name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Devices {
  id: number;
  user_id: number;
  device_id: number;
  registration_id: string;
  details?: string;
  type?: string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface DiscussionCategories {
  id: number;
  company_id?: number;
  order: number;
  name: string;
  color: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface DiscussionFiles {
  id: number;
  company_id: number;
  user_id: number;
  discussion_id?: number;
  discussion_reply_id?: number;
  filename: string;
  description?: string;
  google_url?: string;
  hashname?: string;
  size?: string;
  dropbox_link?: string;
  external_link_name?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface DiscussionReplies {
  id: number;
  company_id?: number;
  discussion_id: number;
  user_id: number;
  body: string;
  deleted_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Discussions {
  id: number;
  company_id?: number;
  discussion_category_id?: number;
  project_id?: number;
  title: string;
  color?: string;
  user_id: number;
  pinned: number;
  closed: number;
  deleted_at?: Date | string;
  last_reply_at: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  best_answer_id?: number;
  last_reply_by_id?: number;
}

export interface EmailNotificationSettings {
  id: number;
  company_id?: number;
  setting_name: string;
  send_email: string;
  send_slack: string;
  send_push: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface EmployeeDetails {
  id: number;
  company_id?: number;
  user_id: number;
  employee_id?: string;
  address?: string;
  hourly_rate?: number;
  slack_username?: string;
  department_id?: number;
  designation_id?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  joining_date: Date | string;
  last_date?: Date | string;
  attendance_reminder?: Date | string;
}

export interface EmployeeDocs {
  id: number;
  company_id?: number;
  user_id: number;
  name: string;
  filename: string;
  hashname: string;
  size?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface EmployeeFaqCategories {
  id: number;
  company_id?: number;
  name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface EmployeeFaqFiles {
  id: number;
  company_id?: number;
  user_id: number;
  employee_faq_id: number;
  filename: string;
  description?: string;
  google_url?: string;
  hashname?: string;
  size?: string;
  dropbox_link?: string;
  external_link?: string;
  external_link_name?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface EmployeeFaqs {
  id: number;
  company_id?: number;
  title: string;
  description: string;
  employee_faq_category_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface EmployeeLeaveQuotas {
  id: number;
  company_id?: number;
  user_id: number;
  leave_type_id: number;
  no_of_leaves: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface EmployeeMonthlySalaries {
  id: number;
  company_id?: number;
  user_id: number;
  amount: string;
  type: string;
  date?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  allow_generate_payroll: string;
}

export interface EmployeePayrollCycle {
  id: number;
  company_id?: number;
  payroll_cycle_id?: number;
  user_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface EmployeeSalaryGroups {
  id: number;
  company_id?: number;
  salary_group_id: number;
  user_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface EmployeeSkills {
  id: number;
  user_id: number;
  skill_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface EmployeeTeams {
  id: number;
  team_id: number;
  user_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface EstimateItems {
  id: number;
  estimate_id: number;
  item_name: string;
  item_summary?: string;
  type: string;
  quantity: number;
  unit_price: number;
  amount: number;
  taxes?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  hsn_sac_code?: string;
}

export interface Estimates {
  id: number;
  company_id?: number;
  client_id: number;
  estimate_number?: string;
  valid_till: Date | string;
  sub_total: number;
  total: number;
  currency_id?: number;
  status: string;
  note?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  discount: string;
  discount_type: string;
  deleted_at?: Date | string;
  send_status: number;
}

export interface EventAttendees {
  id: number;
  user_id: number;
  event_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface EventCategories {
  id: number;
  company_id?: number;
  category_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface EventTypes {
  id: number;
  company_id?: number;
  name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Events {
  id: number;
  company_id?: number;
  event_name: string;
  label_color: string;
  where: string;
  description: string;
  start_date_time: Date | string;
  end_date_time: Date | string;
  repeat: string;
  repeat_every?: number;
  repeat_cycles?: number;
  repeat_type: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  category_id?: number;
  event_type_id?: number;
  event_unique_id?: string;
  event_id?: string;
}

export interface Expenses {
  id: number;
  company_id?: number;
  item_name: string;
  purchase_date: Date | string;
  purchase_from?: string;
  price: number;
  currency_id: number;
  project_id?: number;
  bill?: string;
  user_id: number;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  can_claim: number;
  category_id?: number;
  expenses_recurring_id?: number;
  created_by?: number;
  description?: string;
}

export interface ExpensesCategory {
  id: number;
  company_id?: number;
  category_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ExpensesCategoryRoles {
  id: number;
  company_id: number;
  expenses_category_id?: number;
  role_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ExpensesRecurring {
  id: number;
  company_id?: number;
  category_id?: number;
  currency_id?: number;
  project_id?: number;
  user_id?: number;
  created_by?: number;
  item_name: string;
  day_of_month?: number;
  day_of_week?: number;
  payment_method?: string;
  rotation: string;
  billing_cycle?: number;
  unlimited_recurring: number;
  price: number;
  bill?: string;
  status: string;
  description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface FailedJobs {
  id: number;
  connection: string;
  queue: string;
  payload: string;
  exception: string;
  failed_at: Date | string;
}

export interface FaqCategories {
  id: number;
  name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface FaqFiles {
  id: number;
  user_id: number;
  faq_id: number;
  filename: string;
  description?: string;
  google_url?: string;
  hashname?: string;
  size?: string;
  dropbox_link?: string;
  external_link?: string;
  external_link_name?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Faqs {
  id: number;
  title: string;
  description: string;
  faq_category_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  image?: string;
}

export interface Features {
  id: number;
  language_setting_id?: number;
  title: string;
  description?: string;
  image?: string;
  icon?: string;
  type: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  front_feature_id?: number;
}

export interface FileStorage {
  id: number;
  company_id?: number;
  path: string;
  name: string;
  type?: string;
  size: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface FileStorageSettings {
  id: number;
  company_id?: number;
  filesystem: string;
  auth_keys?: string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface FooterMenu {
  id: number;
  language_setting_id?: number;
  name: string;
  slug: string;
  description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  video_link?: string;
  video_embed?: string;
  file_name?: string;
  hash_name?: string;
  external_link?: string;
  type?: string;
  status?: string;
}

export interface FrontClients {
  id: number;
  language_setting_id?: number;
  title?: string;
  image?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface FrontDetails {
  id: number;
  get_started_show: string;
  sign_in_show: string;
  address?: string;
  phone?: string;
  email?: string;
  social_links?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  primary_color?: string;
  custom_css?: string;
  custom_css_theme_two?: string;
  locale?: string;
  contact_html?: string;
}

export interface FrontFaqs {
  id: number;
  language_setting_id?: number;
  question: string;
  answer: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface FrontFeatures {
  id: number;
  language_setting_id?: number;
  title?: string;
  description?: string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface FrontMenuButtons {
  id: number;
  language_setting_id?: number;
  home?: string;
  feature?: string;
  price?: string;
  contact?: string;
  get_start?: string;
  login?: string;
  contact_submit?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface FrontWidgets {
  id: number;
  name: string;
  widget_code: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface GdprSettings {
  id: number;
  company_id?: number;
  enable_gdpr: number;
  show_customer_area: number;
  show_customer_footer: number;
  top_information_block?: string;
  enable_export: number;
  data_removal: number;
  lead_removal_public_form: number;
  terms_customer_footer: number;
  terms?: string;
  policy?: string;
  public_lead_edit: number;
  consent_customer: number;
  consent_leads: number;
  consent_block?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface GlobalCurrencies {
  id: number;
  currency_name: string;
  currency_symbol: string;
  currency_code: string;
  exchange_rate?: number;
  usd_price?: number;
  is_cryptocurrency: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;
  currency_position: string;
  status: string;
}

export interface GlobalSettings {
  id: number;
  currency_id?: number;
  timezone: string;
  locale: string;
  company_name: string;
  company_email: string;
  company_phone?: string;
  logo?: string;
  login_background?: string;
  address: string;
  website?: string;
  last_updated_by?: number;
  front_design: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  google_map_key: string;
  currency_converter_key: string;
  google_captcha_version: string;
  google_recaptcha_key?: string;
  google_recaptcha_secret?: string;
  purchase_code?: string;
  supported_until?: Date | string;
  hide_cron_message: number;
  week_start: number;
  system_update: number;
  email_verification: number;
  logo_background_color: string;
  currency_key_version: string;
  show_review_modal: number;
  logo_front?: string;
  login_ui: number;
  active_theme: string;
  auth_css?: string;
  auth_css_theme_two?: string;
  new_company_locale?: string;
  frontend_disable: number;
  google_recaptcha_status: number;
  setup_homepage: string;
  custom_homepage_url?: string;
  app_debug: number;
  expired_message?: string;
  show_update_popup: number;
  favicon?: string;
  enable_register: number;
  last_cron_run?: Date | string;
  rtl: number;
  registration_open: number;
  google_calendar_status: string;
  google_client_id?: string;
  google_client_secret?: string;
}

export interface GoogleAccounts {
  id: number;
  user_id: number;
  company_id?: number;
  google_id?: string;
  name?: string;
  token?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface GoogleCalendarModules {
  id: number;
  user_id: number;
  company_id?: number;
  lead_status: number;
  leave_status: number;
  invoice_status: number;
  contract_status: number;
  task_status: number;
  event_status: number;
  holiday_status: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Holidays {
  id: number;
  company_id?: number;
  date: Date | string;
  occassion?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  event_id?: string;
}

export interface InvoiceItems {
  id: number;
  invoice_id: number;
  item_name: string;
  item_summary?: string;
  type: string;
  quantity: number;
  unit_price: number;
  amount: number;
  taxes?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  hsn_sac_code?: string;
}

export interface InvoiceRecurring {
  id: number;
  company_id?: number;
  currency_id?: number;
  project_id?: number;
  client_id?: number;
  user_id?: number;
  created_by?: number;
  issue_date: Date | string;
  due_date: Date | string;
  sub_total: number;
  total: number;
  discount: number;
  discount_type: string;
  status: string;
  file?: string;
  file_original_name?: string;
  note?: string;
  show_shipping_address: string;
  day_of_month?: number;
  day_of_week?: number;
  payment_method?: string;
  rotation: string;
  billing_cycle?: number;
  unlimited_recurring: number;
  client_can_stop: number;
  deleted_at?: Date | string;
  shipping_address?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface InvoiceRecurringItems {
  id: number;
  invoice_recurring_id: number;
  item_name: string;
  quantity: number;
  unit_price: number;
  amount: number;
  taxes?: string;
  type: string;
  item_summary?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  hsn_sac_code?: string;
}

export interface InvoiceSettings {
  id: number;
  company_id?: number;
  invoice_prefix: string;
  invoice_digit: number;
  estimate_prefix: string;
  estimate_digit: number;
  credit_note_prefix: string;
  credit_note_digit: number;
  template: string;
  due_after: number;
  invoice_terms: string;
  estimate_terms?: string;
  gst_number?: string;
  show_gst?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  logo?: string;
  hsn_sac_code_show: number;
  locale?: string;
  send_reminder: number;
}

export interface Invoices {
  id: number;
  company_id?: number;
  project_id?: number;
  client_id?: number;
  invoice_number: string;
  issue_date: Date | string;
  due_date: Date | string;
  sub_total: number;
  discount: number;
  discount_type: string;
  total: number;
  currency_id?: number;
  status: string;
  recurring: string;
  billing_cycle?: number;
  billing_interval?: number;
  billing_frequency?: string;
  file?: string;
  file_original_name?: string;
  note?: string;
  credit_note: number;
  show_shipping_address: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;
  estimate_id?: number;
  send_status: number;
  invoice_recurring_id?: number;
  created_by?: number;
  event_id?: string;
}

export interface Issues {
  id: number;
  description: string;
  user_id?: number;
  project_id?: number;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Jobs {
  id: number;
  queue: string;
  payload: string;
  attempts: number;
  reserved_at?: number;
  available_at: number;
  created_at: number;
}

export interface LanguageSettings {
  id: number;
  language_code: string;
  language_name: string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface LeadAgents {
  id: number;
  company_id: number;
  user_id: number;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface LeadCategory {
  id: number;
  category_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  company_id?: number;
}

export interface LeadCustomForms {
  id: number;
  company_id: number;
  field_display_name: string;
  field_name: string;
  field_order: number;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  required: number;
}

export interface LeadFiles {
  id: number;
  company_id?: number;
  lead_id: number;
  user_id: number;
  filename: string;
  hashname: string;
  size: string;
  description?: string;
  google_url?: string;
  dropbox_link?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface LeadFollowUp {
  id: number;
  lead_id: number;
  remark?: string;
  next_follow_up_date?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  event_id?: string;
}

export interface LeadSources {
  id: number;
  company_id?: number;
  type: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface LeadStatus {
  id: number;
  company_id?: number;
  type: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  priority: number;
  default: number;
  label_color: string;
}

export interface Leads {
  id: number;
  company_id?: number;
  client_id?: number;
  source_id?: number;
  status_id?: number;
  column_priority: number;
  agent_id?: number;
  company_name?: string;
  website?: string;
  address?: string;
  office_phone?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  client_name: string;
  client_email: string;
  mobile?: string;
  note?: string;
  next_follow_up: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  value?: number;
  currency_id?: number;
  category_id?: number;
}

export interface LeaveTypes {
  id: number;
  company_id?: number;
  type_name: string;
  color: string;
  no_of_leaves: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  paid?: number;
}

export interface Leaves {
  id: number;
  company_id?: number;
  user_id: number;
  leave_type_id: number;
  duration: string;
  leave_date: Date | string;
  reason: string;
  status: string;
  reject_reason?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  paid: number;
  event_id?: string;
}

export interface Licences {
  id: number;
  company_id?: number;
  license_number: string;
  package_id?: number;
  company_name: string;
  email: string;
  contact_person?: string;
  billing_name?: string;
  billing_address?: string;
  tax_number?: string;
  expire_date?: Date | string;
  last_payment_date?: Date | string;
  next_payment_date?: Date | string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface LogTimeFor {
  id: number;
  company_id?: number;
  log_time_for: string;
  auto_timer_stop: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  approval_required: number;
}

export interface LtmTranslations {
  id: number;
  status: number;
  locale: string;
  group: string;
  key: string;
  value?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface MessageSettings {
  id: number;
  company_id?: number;
  allow_client_admin: string;
  allow_client_employee: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Migrations {
  id: number;
  migration: string;
  batch: number;
}

export interface ModuleSettings {
  id: number;
  company_id?: number;
  module_name: string;
  status: string;
  type: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Modules {
  id: number;
  module_name: string;
  description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface MollieInvoices {
  id: number;
  company_id: number;
  package_id: number;
  transaction_id?: string;
  amount?: string;
  package_type?: string;
  pay_date?: Date | string;
  next_pay_date?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface MollieSubscriptions {
  id: number;
  company_id?: number;
  customer_id?: string;
  subscription_id?: string;
  ends_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Notes {
  id: number;
  company_id?: number;
  notes_title: string;
  notes_type: number;
  client_id?: number;
  ask_password: number;
  note_details: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  is_client_show: number;
}

export interface NoticeViews {
  id: number;
  company_id: number;
  notice_id: number;
  user_id: number;
  read: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Notices {
  id: number;
  to: string;
  company_id?: number;
  heading: string;
  description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  attachment?: string;
  department_id?: number;
}

export interface Notifications {
  id: string;
  company_id?: number;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: string;
  read_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface OfflineInvoicePayments {
  id: number;
  invoice_id: number;
  client_id: number;
  payment_method_id: number;
  slip: string;
  description: string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface OfflineInvoices {
  id: number;
  company_id: number;
  package_id: number;
  package_type?: string;
  offline_method_id?: number;
  transaction_id?: string;
  amount: number;
  pay_date: Date | string;
  next_pay_date?: Date | string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface OfflinePaymentMethods {
  id: number;
  company_id?: number;
  name: string;
  description?: string;
  status?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface OfflinePlanChanges {
  id: number;
  company_id: number;
  package_id: number;
  package_type: string;
  invoice_id: number;
  offline_method_id: number;
  file_name?: string;
  status: string;
  description: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PackageSettings {
  id: number;
  status: string;
  no_of_days?: number;
  modules?: string;
  trial_message?: string;
  notification_before?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Packages {
  id: number;
  currency_id?: number;
  name: string;
  description?: string;
  max_storage_size?: string;
  max_file_size?: number;
  annual_price?: number;
  monthly_price?: number;
  billing_cycle?: number;
  max_employees: number;
  sort?: number;
  module_in_package: string;
  stripe_annual_plan_id?: string;
  razorpay_annual_plan_id?: string;
  razorpay_monthly_plan_id?: string;
  stripe_monthly_plan_id?: string;
  paystack_monthly_plan_id?: string;
  paystack_annual_plan_id?: string;
  default?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  is_private: number;
  storage_unit: string;
  is_recommended: number;
  is_free: number;
  is_auto_renew: number;
  monthly_status?: string;
  annual_status?: string;
}

export interface PasswordResets {
  email: string;
  token: string;
  created_at?: Date | string;
}

export interface PayfastInvoices {
  id: number;
  company_id?: number;
  package_id?: number;
  m_payment_id?: string;
  pf_payment_id?: string;
  payfast_plan?: string;
  amount?: string;
  pay_date?: Date | string;
  next_pay_date?: Date | string;
  signature?: string;
  token?: string;
  status?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PayfastSubscriptions {
  id: number;
  company_id?: number;
  payfast_plan?: string;
  quantity?: number;
  payfast_status: string;
  ends_at?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PaymentGatewayCredentials {
  id: number;
  company_id?: number;
  paypal_client_id?: string;
  paypal_secret?: string;
  paypal_status: string;
  stripe_client_id?: string;
  stripe_secret?: string;
  stripe_webhook_secret?: string;
  stripe_status: string;
  razorpay_key?: string;
  razorpay_secret?: string;
  razorpay_webhook_secret?: string;
  razorpay_status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  paypal_mode: string;
  paystack_client_id?: string;
  paystack_secret?: string;
  paystack_status?: string;
  paystack_merchant_email?: string;
  paystack_payment_url?: string;
  mollie_api_key: string;
  mollie_status: string;
  authorize_api_login_id?: string;
  authorize_transaction_key?: string;
  authorize_environment?: string;
  authorize_status: string;
  payfast_key?: string;
  payfast_secret?: string;
  payfast_status: string;
  payfast_salt_passphrase?: string;
  payfast_mode: string;
}

export interface Payments {
  id: number;
  company_id?: number;
  project_id?: number;
  invoice_id?: number;
  amount: number;
  gateway?: string;
  transaction_id?: string;
  currency_id?: number;
  plan_id?: string;
  customer_id?: string;
  event_id?: string;
  status: string;
  paid_on?: Date | string;
  remarks?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  offline_method_id?: number;
  bill?: string;
}

export interface PaypalInvoices {
  id: number;
  company_id?: number;
  currency_id?: number;
  package_id?: number;
  sub_total?: number;
  total?: number;
  transaction_id?: string;
  remarks?: string;
  billing_frequency?: string;
  billing_interval?: number;
  paid_on?: Date | string;
  next_pay_date?: Date | string;
  recurring?: string;
  status?: string;
  plan_id?: string;
  event_id?: string;
  end_on?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PayrollCycles {
  id: number;
  cycle?: string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PayrollSettings {
  id: number;
  company_id?: number;
  tds_salary: string;
  tds_status: number;
  finance_month: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  semi_monthly_start?: number;
  semi_monthly_end?: number;
  extra_fields?: string;
}

export interface PaystackInvoices {
  id: number;
  company_id: number;
  package_id: number;
  transaction_id?: string;
  amount?: string;
  pay_date?: Date | string;
  next_pay_date?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PaystackSubscriptions {
  id: number;
  company_id: number;
  subscription_id?: string;
  customer_id?: string;
  token: string;
  plan_id: string;
  status: string;
  ends_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PermissionRole {
  permission_id: number;
  role_id: number;
}

export interface Permissions {
  id: number;
  name: string;
  display_name?: string;
  description?: string;
  module_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Pinned {
  id: number;
  company_id: number;
  project_id?: number;
  task_id?: number;
  user_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ProductCategory {
  id: number;
  company_id: number;
  category_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ProductSubCategory {
  id: number;
  company_id: number;
  category_id: number;
  category_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Products {
  id: number;
  company_id?: number;
  name: string;
  price: string;
  taxes?: string;
  allow_purchase: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  description?: string;
  category_id?: number;
  sub_category_id?: number;
  hsn_sac_code?: string;
}

export interface ProjectActivity {
  id: number;
  company_id?: number;
  project_id: number;
  activity: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ProjectCategory {
  id: number;
  company_id?: number;
  category_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ProjectFiles {
  id: number;
  company_id?: number;
  user_id: number;
  project_id: number;
  filename: string;
  hashname?: string;
  size?: string;
  description?: string;
  google_url?: string;
  dropbox_link?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  external_link_name?: string;
  external_link?: string;
}

export interface ProjectMembers {
  id: number;
  company_id?: number;
  user_id: number;
  project_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  hourly_rate: number;
}

export interface ProjectMilestones {
  id: number;
  company_id?: number;
  project_id?: number;
  currency_id?: number;
  milestone_title: string;
  summary: string;
  cost: number;
  status: string;
  due_date?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  invoice_created: number;
  invoice_id?: number;
}

export interface ProjectNotes {
  id: number;
  company_id?: number;
  project_id?: number;
  notes_title: string;
  notes_type: number;
  client_id?: number;
  ask_password: number;
  note_details: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  is_client_show: number;
}

export interface ProjectRatings {
  id: number;
  company_id: number;
  project_id: number;
  rating: number;
  comment?: string;
  user_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ProjectSettings {
  id: number;
  company_id?: number;
  send_reminder: string;
  remind_time: number;
  remind_type: string;
  remind_to: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ProjectTemplateMembers {
  id: number;
  user_id: number;
  project_template_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ProjectTemplateSubTasks {
  id: number;
  project_template_task_id: number;
  title: string;
  start_date?: Date | string;
  due_date?: Date | string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ProjectTemplateTaskUsers {
  id: number;
  project_template_task_id: number;
  user_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ProjectTemplateTasks {
  id: number;
  heading: string;
  description?: string;
  project_template_id: number;
  priority: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  project_template_task_category_id?: number;
}

export interface ProjectTemplates {
  id: number;
  company_id?: number;
  project_name: string;
  category_id?: number;
  client_id?: number;
  project_summary?: string;
  notes?: string;
  feedback?: string;
  client_view_task: string;
  allow_client_notification: string;
  manual_timelog: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ProjectTimeLogs {
  id: number;
  company_id?: number;
  project_id?: number;
  task_id?: number;
  user_id: number;
  start_time: Date | string;
  end_time?: Date | string;
  memo: string;
  total_hours?: string;
  total_minutes?: string;
  edited_by_user?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  hourly_rate: number;
  earnings: number;
  approved: number;
  approved_by?: number;
  invoice_id?: number;
}

export interface ProjectUserNotes {
  id: number;
  company_id?: number;
  user_id: number;
  project_notes_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Projects {
  id: number;
  company_id?: number;
  project_name: string;
  project_summary?: string;
  project_admin?: number;
  start_date: Date | string;
  deadline?: Date | string;
  notes?: string;
  category_id?: number;
  client_id?: number;
  feedback?: string;
  read_only: string;
  manual_timelog: string;
  client_view_task: string;
  allow_client_notification: string;
  completion_percent: number;
  calculate_task_progress: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;
  project_budget?: number;
  currency_id?: number;
  hours_allocated?: number;
  status: string;
  visible_rating_employee: number;
}

export interface ProposalItems {
  id: number;
  tax_id?: number;
  proposal_id: number;
  item_name: string;
  type: string;
  quantity: number;
  unit_price: number;
  amount: number;
  item_summary?: string;
  taxes?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  hsn_sac_code?: string;
}

export interface ProposalSigns {
  id: number;
  company_id?: number;
  proposal_id: number;
  full_name: string;
  email: string;
  signature: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Proposals {
  id: number;
  company_id?: number;
  lead_id: number;
  valid_till: Date | string;
  sub_total: number;
  total: number;
  currency_id?: number;
  status: string;
  note?: string;
  description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  discount: string;
  invoice_convert: number;
  discount_type: string;
  client_comment?: string;
  signature_approval: number;
  send_status: number;
}

export interface PurposeConsent {
  id: number;
  company_id?: number;
  name: string;
  description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PurposeConsentLeads {
  id: number;
  lead_id: number;
  purpose_consent_id: number;
  status: string;
  ip?: string;
  updated_by_id?: number;
  additional_description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PurposeConsentUsers {
  id: number;
  client_id: number;
  purpose_consent_id: number;
  status: string;
  ip?: string;
  updated_by_id: number;
  additional_description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PushNotificationSettings {
  id: number;
  onesignal_app_id?: string;
  onesignal_rest_api_key?: string;
  notification_logo?: string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PushSubscriptions {
  id: number;
  user_id: number;
  endpoint: string;
  public_key?: string;
  auth_token?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface PusherSettings {
  id: number;
  company_id: number;
  pusher_app_id?: string;
  pusher_app_key?: string;
  pusher_app_secret?: string;
  pusher_cluster?: string;
  force_tls: number;
  status: number;
  message_status: number;
  taskboard_status: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface QuotationItems {
  id: number;
  quotation_id: number;
  item_name: string;
  quantity: number;
  unit_price: number;
  amount: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  hsn_sac_code?: string;
}

export interface Quotations {
  id: number;
  business_name: string;
  client_name: string;
  client_email: string;
  phone?: string;
  address?: string;
  sub_total: number;
  total: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface RazorpayInvoices {
  id: number;
  company_id: number;
  currency_id?: number;
  invoice_id: string;
  subscription_id: string;
  order_id?: string;
  package_id: number;
  transaction_id: string;
  amount: number;
  pay_date: Date | string;
  next_pay_date?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface RazorpaySubscriptions {
  id: number;
  company_id: number;
  subscription_id?: string;
  customer_id?: string;
  name: string;
  razorpay_id: string;
  razorpay_plan: string;
  quantity: number;
  trial_ends_at?: Date | string;
  ends_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface RemovalRequests {
  id: number;
  company_id?: number;
  name: string;
  description: string;
  user_id?: number;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface RemovalRequestsLead {
  id: number;
  company_id?: number;
  name: string;
  description: string;
  lead_id?: number;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface RestApiApplicationSettings {
  id: number;
  name: string;
  app_key: number;
  app_secret?: string;
  authorized_employee_id?: number;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface RestApiSettings {
  id: number;
  purchase_code?: string;
  supported_until?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  fcm_key?: string;
}

export interface RoleUser {
  user_id: number;
  role_id: number;
}

export interface Roles {
  id: number;
  company_id?: number;
  name: string;
  display_name?: string;
  description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SalaryComponents {
  id: number;
  company_id?: number;
  component_name: string;
  component_type: string;
  component_value: string;
  value_type: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  weekly_value: number;
  biweekly_value: number;
  semimonthly_value: number;
}

export interface SalaryGroupComponents {
  id: number;
  company_id?: number;
  salary_group_id: number;
  salary_component_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SalaryGroups {
  id: number;
  company_id?: number;
  group_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SalaryPaymentMethods {
  id: number;
  company_id?: number;
  payment_method: string;
  default: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SalarySlips {
  id: number;
  company_id?: number;
  user_id: number;
  salary_group_id?: number;
  basic_salary: string;
  net_salary: string;
  month: string;
  year: string;
  paid_on?: Date | string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  salary_json?: string;
  extra_json?: string;
  expense_claims: string;
  pay_days: number;
  salary_payment_method_id?: number;
  tds: number;
  monthly_salary: number;
  gross_salary: number;
  total_deductions: number;
  salary_from?: Date | string;
  salary_to?: Date | string;
  payroll_cycle_id?: number;
}

export interface SalaryTds {
  id: number;
  company_id?: number;
  salary_from: number;
  salary_to: number;
  salary_percent: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SeoDetails {
  id: number;
  language_setting_id?: number;
  page_name: string;
  seo_title?: string;
  seo_keywords?: string;
  seo_description?: string;
  seo_author?: string;
  og_image?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SignUpSettings {
  id: number;
  language_setting_id?: number;
  message?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Skills {
  id: number;
  company_id?: number;
  name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SlackSettings {
  id: number;
  company_id?: number;
  slack_webhook?: string;
  slack_logo?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SmtpSettings {
  id: number;
  mail_driver: string;
  mail_host: string;
  mail_port: string;
  mail_username: string;
  mail_password: string;
  mail_from_name: string;
  mail_from_email: string;
  mail_encryption?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  verified: number;
}

export interface SocialAuthSettings {
  id: number;
  facebook_client_id?: string;
  facebook_secret_id?: string;
  facebook_status: string;
  google_client_id?: string;
  google_secret_id?: string;
  google_status: string;
  twitter_client_id?: string;
  twitter_secret_id?: string;
  twitter_status: string;
  linkedin_client_id?: string;
  linkedin_secret_id?: string;
  linkedin_status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Socials {
  id: number;
  user_id?: number;
  social_id: string;
  social_service: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface StickyNotes {
  id: number;
  user_id: number;
  note_text: string;
  colour: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface StorageSettings {
  id: number;
  filesystem: string;
  auth_keys?: string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface StripeInvoices {
  id: number;
  company_id: number;
  invoice_id?: string;
  package_id: number;
  transaction_id?: string;
  amount: number;
  pay_date: Date | string;
  next_pay_date?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface StripeSetting {
  id: number;
  api_key?: string;
  api_secret?: string;
  webhook_key?: string;
  paypal_client_id?: string;
  paypal_secret?: string;
  paypal_status: string;
  stripe_status: string;
  razorpay_key?: string;
  razorpay_secret?: string;
  razorpay_webhook_secret?: string;
  razorpay_status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  paypal_mode: string;
  paystack_client_id?: string;
  paystack_secret?: string;
  paystack_status?: string;
  paystack_merchant_email?: string;
  paystack_payment_url?: string;
  mollie_api_key: string;
  mollie_status: string;
  authorize_api_login_id?: string;
  authorize_transaction_key?: string;
  authorize_signature_key?: string;
  authorize_environment?: string;
  authorize_status: string;
  payfast_key?: string;
  payfast_secret?: string;
  payfast_status: string;
  payfast_salt_passphrase?: string;
  payfast_mode: string;
}

export interface SubTaskFiles {
  id: number;
  company_id: number;
  user_id: number;
  sub_task_id: number;
  filename: string;
  description?: string;
  google_url?: string;
  hashname?: string;
  size?: string;
  dropbox_link?: string;
  external_link?: string;
  external_link_name?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SubTasks {
  id: number;
  task_id: number;
  title: string;
  due_date?: Date | string;
  start_date?: Date | string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  description?: string;
}

export interface SubscriptionItems {
  id: number;
  subscription_id: number;
  stripe_id: string;
  stripe_plan: string;
  quantity: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Subscriptions {
  id: number;
  company_id: number;
  name: string;
  stripe_id: string;
  stripe_plan: string;
  quantity: number;
  trial_ends_at?: Date | string;
  ends_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  stripe_status?: string;
}

export interface SuperAdminPayrollSettings {
  id: number;
  purchase_code?: string;
  supported_until?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SupportTicketFiles {
  id: number;
  user_id: number;
  support_ticket_reply_id: number;
  filename: string;
  description?: string;
  google_url?: string;
  hashname?: string;
  size?: string;
  dropbox_link?: string;
  external_link?: string;
  external_link_name?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SupportTicketReplies {
  id: number;
  support_ticket_id: number;
  user_id: number;
  message: string;
  deleted_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SupportTicketTypes {
  id: number;
  type: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface SupportTickets {
  id: number;
  user_id: number;
  created_by: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  agent_id?: number;
  support_ticket_type_id?: number;
  deleted_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TaskCategory {
  id: number;
  company_id?: number;
  category_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TaskCommentFiles {
  id: number;
  company_id: number;
  user_id: number;
  task_id: number;
  comment_id?: number;
  filename: string;
  description?: string;
  google_url?: string;
  hashname?: string;
  size?: string;
  dropbox_link?: string;
  external_link?: string;
  external_link_name?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TaskComments {
  id: number;
  comment: string;
  user_id: number;
  task_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TaskFiles {
  id: number;
  company_id: number;
  user_id: number;
  task_id: number;
  filename: string;
  description?: string;
  google_url?: string;
  hashname?: string;
  size?: string;
  dropbox_link?: string;
  external_link?: string;
  external_link_name?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TaskHistory {
  id: number;
  task_id: number;
  sub_task_id?: number;
  user_id: number;
  details: string;
  board_column_id?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TaskLabelList {
  id: number;
  company_id?: number;
  label_name: string;
  color?: string;
  description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TaskLabels {
  id: number;
  label_id: number;
  task_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TaskNotes {
  id: number;
  company_id: number;
  task_id: number;
  user_id?: number;
  note?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TaskRequestFiles {
  id: number;
  company_id: number;
  user_id: number;
  task_id: number;
  filename: string;
  description?: string;
  google_url?: string;
  hashname?: string;
  size?: string;
  dropbox_link?: string;
  external_link?: string;
  external_link_name?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TaskRequests {
  id: number;
  company_id: number;
  heading: string;
  description?: string;
  start_date?: Date | string;
  due_date?: Date | string;
  project_id: number;
  task_category_id?: number;
  priority: string;
  column_priority: number;
  created_by?: number;
  dependent_task_id?: number;
  billable: number;
  request_status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TaskUsers {
  id: number;
  task_id: number;
  user_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TaskboardColumns {
  id: number;
  company_id?: number;
  column_name: string;
  slug?: string;
  label_color: string;
  priority: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Tasks {
  id: number;
  company_id?: number;
  heading: string;
  description?: string;
  due_date?: Date | string;
  start_date?: Date | string;
  project_id?: number;
  task_category_id?: number;
  priority: string;
  status: string;
  board_column_id?: number;
  column_priority: number;
  completed_on?: Date | string;
  created_by?: number;
  recurring_task_id?: number;
  dependent_task_id?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  milestone_id?: number;
  is_private: number;
  billable: number;
  estimate_hours: number;
  estimate_minutes: number;
  hash?: string;
  event_id?: string;
  task_request_id?: number;
}

export interface Taxes {
  id: number;
  company_id?: number;
  tax_name: string;
  rate_percent: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;
}

export interface Teams {
  id: number;
  company_id?: number;
  team_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Testimonials {
  id: number;
  language_setting_id?: number;
  name: string;
  comment?: string;
  rating?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ThemeSettings {
  id: number;
  company_id?: number;
  panel: string;
  header_color: string;
  sidebar_color: string;
  sidebar_text_color: string;
  link_color: string;
  user_css?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  enable_rounded_theme: number;
  login_background?: string;
}

export interface TicketAgentGroups {
  id: number;
  company_id?: number;
  agent_id: number;
  group_id?: number;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TicketChannels {
  id: number;
  company_id?: number;
  channel_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TicketCustomForms {
  id: number;
  company_id: number;
  field_display_name: string;
  field_name: string;
  field_type: string;
  field_order: number;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  required: number;
}

export interface TicketFiles {
  id: number;
  company_id: number;
  user_id: number;
  ticket_reply_id: number;
  filename: string;
  description?: string;
  google_url?: string;
  hashname?: string;
  size?: string;
  dropbox_link?: string;
  external_link?: string;
  external_link_name?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TicketGroups {
  id: number;
  company_id?: number;
  group_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TicketReplies {
  id: number;
  company_id?: number;
  ticket_id: number;
  user_id: number;
  message: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;
}

export interface TicketReplyTemplates {
  id: number;
  company_id?: number;
  reply_heading: string;
  reply_text: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TicketTagList {
  id: number;
  tag_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TicketTags {
  id: number;
  tag_id: number;
  ticket_id: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface TicketTypes {
  id: number;
  company_id?: number;
  type: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Tickets {
  id: number;
  company_id?: number;
  user_id: number;
  subject: string;
  status: string;
  priority: string;
  agent_id?: number;
  channel_id?: number;
  type_id?: number;
  close_date?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;
}

export interface TrFrontDetails {
  id: number;
  language_setting_id?: number;
  header_title: string;
  header_description: string;
  image: string;
  feature_title?: string;
  feature_description?: string;
  price_title?: string;
  price_description?: string;
  task_management_title?: string;
  task_management_detail?: string;
  manage_bills_title?: string;
  manage_bills_detail?: string;
  teamates_title?: string;
  teamates_detail?: string;
  favourite_apps_title?: string;
  favourite_apps_detail?: string;
  cta_title?: string;
  cta_detail?: string;
  client_title?: string;
  client_detail?: string;
  testimonial_title?: string;
  testimonial_detail?: string;
  faq_title?: string;
  faq_detail?: string;
  footer_copyright_text?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface UniversalSearch {
  id: number;
  company_id?: number;
  searchable_id: number;
  module_type?: string;
  title: string;
  route_name: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface UserActivities {
  id: number;
  company_id?: number;
  user_id: number;
  activity: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Users {
  id: number;
  company_id?: number;
  name: string;
  email: string;
  password: string;
  remember_token?: string;
  image?: string;
  mobile?: string;
  gender: string;
  locale: string;
  status: string;
  login: string;
  onesignal_player_id?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  super_admin: string;
  email_verification_code?: string;
  social_token?: string;
  email_notifications: number;
  country_id?: number;
  authorize_id?: string;
  authorize_payment_id?: string;
  card_brand?: string;
  card_last_four?: string;
  last_login?: Date | string;
}

export interface UsersChat {
  id: number;
  user_one: number;
  user_id: number;
  message?: string;
  from?: number;
  to?: number;
  message_seen: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface UsersChatFiles {
  id: number;
  company_id: number;
  user_id: number;
  users_chat_id: number;
  filename: string;
  description?: string;
  google_url?: string;
  hashname?: string;
  size?: string;
  external_link?: string;
  external_link_name?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

