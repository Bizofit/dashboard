// BIZOFORCE Database TypeScript Interfaces
// Generated: 11/22/2025, 12:50:32 PM
// Database Type: mysql
// Total Tables: 732

export interface FmSlider {
  id: number;
  name: string;
  data: string;
  time: Date | string;
  authorid: string;
  url?: string;
  urlanchor?: string;
}

export interface GwgoActionschedulerActions {
  action_id: number;
  hook: string;
  status: string;
  scheduled_date_gmt?: Date | string;
  scheduled_date_local?: Date | string;
  args?: string;
  schedule?: string;
  group_id: number;
  attempts: number;
  last_attempt_gmt?: Date | string;
  last_attempt_local?: Date | string;
  claim_id: number;
  extended_args?: string;
  priority: number;
}

export interface GwgoActionschedulerClaims {
  claim_id: number;
  date_created_gmt: Date | string;
}

export interface GwgoActionschedulerGroups {
  group_id: number;
  slug: string;
}

export interface GwgoActionschedulerLogs {
  log_id: number;
  action_id: number;
  message: string;
  log_date_gmt?: Date | string;
  log_date_local?: Date | string;
}

export interface GwgoAdminColumns {
  id: number;
  list_id: string;
  list_key: string;
  title: string;
  columns?: string;
  settings?: string;
  date_created: Date | string;
  date_modified: Date | string;
}

export interface GwgoAioseoCache {
  id: number;
  key: string;
  value: string;
  expiration?: Date | string;
  created: Date | string;
  updated: Date | string;
}

export interface GwgoAioseoNotifications {
  id: number;
  slug: string;
  title: string;
  content: string;
  type: string;
  level: string;
  notification_id?: number;
  notification_name?: string;
  start?: Date | string;
  end?: Date | string;
  button1_label?: string;
  button1_action?: string;
  button2_label?: string;
  button2_action?: string;
  dismissed: number;
  created: Date | string;
  updated: Date | string;
}

export interface GwgoAioseoPosts {
  id: number;
  post_id: number;
  title?: string;
  description?: string;
  keywords?: string;
  keyphrases?: string;
  page_analysis?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_object_type?: string;
  og_image_type?: string;
  og_image_custom_url?: string;
  og_image_custom_fields?: string;
  og_custom_image_width?: number;
  og_custom_image_height?: number;
  og_video?: string;
  og_custom_url?: string;
  og_article_section?: string;
  og_article_tags?: string;
  twitter_use_og?: number;
  twitter_card?: string;
  twitter_image_type?: string;
  twitter_image_custom_url?: string;
  twitter_image_custom_fields?: string;
  twitter_title?: string;
  twitter_description?: string;
  seo_score: number;
  schema_type?: string;
  schema_type_options?: string;
  pillar_content?: number;
  robots_default: number;
  robots_noindex: number;
  robots_noarchive: number;
  robots_nosnippet: number;
  robots_nofollow: number;
  robots_noimageindex: number;
  robots_noodp: number;
  robots_notranslate: number;
  robots_max_snippet?: number;
  robots_max_videopreview?: number;
  robots_max_imagepreview?: string;
  tabs?: string;
  images?: string;
  priority?: string;
  frequency?: string;
  videos?: string;
  video_thumbnail?: string;
  video_scan_date?: Date | string;
  local_seo?: string;
  breadcrumb_settings?: string;
  created: Date | string;
  updated: Date | string;
}

export interface GwgoAioseoSeoAnalyzerResults {
  id: number;
  data: string;
  score?: string;
  competitor_url?: string;
  created: Date | string;
  updated: Date | string;
}

export interface GwgoCategorymeta {
  meta_id: number;
  category_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoCkyBanners {
  banner_id: number;
  name: string;
  slug: string;
  status: number;
  settings: string;
  banner_default: number;
  contents: string;
  date_created: Date | string;
  date_modified: Date | string;
}

export interface GwgoCkyCookieCategories {
  category_id: number;
  name: string;
  slug: string;
  description: string;
  prior_consent: number;
  visibility: number;
  priority: number;
  sell_personal_data: number;
  meta?: string;
  date_created: Date | string;
  date_modified: Date | string;
}

export interface GwgoCkyCookies {
  cookie_id: number;
  name: string;
  slug: string;
  description: string;
  duration: string;
  domain: string;
  category: number;
  type: string;
  discovered: number;
  url_pattern?: string;
  meta?: string;
  date_created: Date | string;
  date_modified: Date | string;
}

export interface GwgoCliScripts {
  id: number;
  cliscript_title: string;
  cliscript_category: string;
  cliscript_type?: number;
  cliscript_status: string;
  cliscript_description: string;
  cliscript_key: string;
  type: number;
}

export interface GwgoCommentmeta {
  meta_id: number;
  comment_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoComments {
  comment_ID: number;
  comment_post_ID: number;
  comment_author: string;
  comment_author_email: string;
  comment_author_url: string;
  comment_author_IP: string;
  comment_date: Date | string;
  comment_date_gmt: Date | string;
  comment_content: string;
  comment_karma: number;
  comment_approved: string;
  comment_agent: string;
  comment_type: string;
  comment_parent: number;
  user_id: number;
}

export interface GwgoCompanyFaqs {
  id: number;
  post_id: number;
  faqs: string;
  created_at: Date | string;
}

export interface GwgoCpkWpcsvExportQueue {
  id: number;
  export_id: string;
  post_id: number;
  done: number;
  msg?: string;
}

export interface GwgoCpkWpcsvLog {
  id: number;
  category: string;
  msg: string;
  data?: string;
  created: Date | string;
}

export interface GwgoEEvents {
  id: number;
  event_data?: string;
  created_at: Date | string;
}

export interface GwgoFrmtFormEntry {
  entry_id: number;
  entry_type: string;
  draft_id?: string;
  form_id: number;
  is_spam: number;
  date_created: Date | string;
}

export interface GwgoFrmtFormEntryMeta {
  meta_id: number;
  entry_id: number;
  meta_key?: string;
  meta_value?: string;
  date_created: Date | string;
  date_updated: Date | string;
}

export interface GwgoFrmtFormReports {
  report_id: number;
  report_value: string;
  status: string;
  date_created: Date | string;
  date_updated: Date | string;
}

export interface GwgoFrmtFormViews {
  view_id: number;
  form_id: number;
  page_id: number;
  ip?: string;
  count: number;
  date_created: Date | string;
  date_updated: Date | string;
}

export interface GwgoLinks {
  link_id: number;
  link_url: string;
  link_name: string;
  link_image: string;
  link_target: string;
  link_description: string;
  link_visible: string;
  link_owner: number;
  link_rating: number;
  link_updated: Date | string;
  link_rel: string;
  link_notes: string;
  link_rss: string;
}

export interface GwgoListingsRatingsAndReviews {
  listing_id: number;
  service_id: number;
  rating: number;
  rev_number: number;
  rate_times_num: number;
  mq: number;
}

export interface GwgoMailsterActionBounces {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
  hard: number;
  text: string;
}

export interface GwgoMailsterActionClicks {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
  link_id: number;
}

export interface GwgoMailsterActionErrors {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
  text: string;
}

export interface GwgoMailsterActionOpens {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
}

export interface GwgoMailsterActionSent {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
}

export interface GwgoMailsterActionUnsubs {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
  text: string;
}

export interface GwgoMailsterActions {
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  count: number;
  type: number;
  link_id: number;
}

export interface GwgoMailsterFormFields {
  ID: number;
  form_id: number;
  field_id: string;
  name: string;
  error_msg: string;
  required: number;
  position: number;
}

export interface GwgoMailsterForms {
  ID: number;
  name: string;
  submit: string;
  asterisk?: number;
  userschoice?: number;
  precheck?: number;
  dropdown?: number;
  prefill?: number;
  inline?: number;
  overwrite?: number;
  addlists?: number;
  style?: string;
  custom_style?: string;
  doubleoptin?: number;
  subject?: string;
  headline?: string;
  content?: string;
  link?: string;
  resend?: number;
  resend_count?: number;
  resend_time?: number;
  template: string;
  vcard?: number;
  vcard_content?: string;
  confirmredirect?: string;
  redirect?: string;
  added?: number;
  updated?: number;
}

export interface GwgoMailsterFormsLists {
  form_id: number;
  list_id: number;
  added: number;
}

export interface GwgoMailsterFormsTags {
  form_id: number;
  tag_id: number;
  added: number;
}

export interface GwgoMailsterLinks {
  ID: number;
  link: string;
  i: number;
}

export interface GwgoMailsterLists {
  ID: number;
  parent_id: number;
  name: string;
  slug: string;
  description: string;
  added: number;
  updated: number;
}

export interface GwgoMailsterListsSubscribers {
  list_id: number;
  subscriber_id: number;
  added: number;
}

export interface GwgoMailsterLogs {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  subject: string;
  receivers: string;
  html: string;
  text: string;
  raw: string;
  message_id: string;
}

export interface GwgoMailsterQueue {
  ID: number;
  subscriber_id: number;
  campaign_id: number;
  requeued: number;
  added: number;
  timestamp: number;
  sent: number;
  priority: number;
  count: number;
  error: number;
  ignore_status: number;
  options: string;
  tags: string;
  i: number;
}

export interface GwgoMailsterSubscriberFields {
  ID: number;
  subscriber_id: number;
  meta_key: string;
  meta_value: string;
}

export interface GwgoMailsterSubscriberMeta {
  ID: number;
  subscriber_id?: number;
  campaign_id: number;
  meta_key: string;
  meta_value: string;
}

export interface GwgoMailsterSubscribers {
  ID: number;
  hash: string;
  email: string;
  wp_id: number;
  status: number;
  added: number;
  updated: number;
  signup: number;
  confirm: number;
  ip_signup: string;
  ip_confirm: string;
  rating: number;
}

export interface GwgoMailsterTags {
  ID: number;
  name: string;
  added: number;
  updated: number;
}

export interface GwgoMailsterTagsSubscribers {
  tag_id: number;
  subscriber_id: number;
  added: number;
}

export interface GwgoMdfQueryCache {
  mkey: string;
  mvalue: string;
}

export interface GwgoMdfStatBuffer {
  id: number;
  hash: string;
  user_ip: string;
  post_type: string;
  type: string;
  filter_id: number;
  key_id: string;
  value: string;
  time: number;
}

export interface GwgoMdfStatTmp {
  id: number;
  user_ip: string;
  post_type: string;
  tax_data: string;
  meta_data: string;
  hash: string;
  time: number;
  is_collected: number;
}

export interface GwgoMwaiFilemeta {
  meta_id: number;
  file_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoMwaiFiles {
  id: number;
  refId: string;
  envId?: string;
  userId?: string;
  type?: string;
  status?: string;
  purpose?: string;
  created: Date | string;
  updated: Date | string;
  expires?: Date | string;
  path?: string;
  url?: string;
}

export interface GwgoMyCREDLog {
  id: number;
  ref: string;
  ref_id?: number;
  user_id?: number;
  creds?: number;
  ctype?: string;
  time?: number;
  entry?: string;
  data?: string;
}

export interface GwgoNf3ActionMeta {
  id: number;
  parent_id: number;
  key: string;
  value?: string;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoNf3Actions {
  id: number;
  title?: string;
  key?: string;
  type?: string;
  active?: number;
  parent_id: number;
  created_at: Date | string;
  updated_at?: Date | string;
  label?: string;
}

export interface GwgoNf3Chunks {
  id: number;
  name?: string;
  value?: string;
}

export interface GwgoNf3FieldMeta {
  id: number;
  parent_id: number;
  key: string;
  value?: string;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoNf3Fields {
  id: number;
  label?: string;
  key?: string;
  type?: string;
  parent_id: number;
  created_at: Date | string;
  updated_at?: Date | string;
  field_label?: string;
  field_key?: string;
  order?: number;
  required?: any;
  default_value?: string;
  label_pos?: string;
  personally_identifiable?: any;
}

export interface GwgoNf3FormMeta {
  id: number;
  parent_id: number;
  key: string;
  value?: string;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoNf3Forms {
  id: number;
  title?: string;
  key?: string;
  created_at: Date | string;
  updated_at?: Date | string;
  views?: number;
  subs?: number;
  form_title?: string;
  default_label_pos?: string;
  show_title?: any;
  clear_complete?: any;
  hide_complete?: any;
  logged_in?: any;
  seq_num?: number;
}

export interface GwgoNf3ObjectMeta {
  id: number;
  parent_id: number;
  key: string;
  value?: string;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoNf3Objects {
  id: number;
  type?: string;
  title?: string;
  created_at: Date | string;
  updated_at?: Date | string;
  object_title?: string;
}

export interface GwgoNf3Relationships {
  id: number;
  child_id: number;
  child_type: string;
  parent_id: number;
  parent_type: string;
  created_at: Date | string;
  updated_at?: Date | string;
}

export interface GwgoNf3Upgrades {
  id: number;
  cache?: string;
  stage: number;
  maintenance?: any;
}

export interface GwgoNxsLog {
  id: number;
  date: Date | string;
  act: string;
  nt: string;
  type: string;
  msg: string;
  extInfo: string;
}

export interface GwgoOptions {
  option_id: number;
  option_name?: string;
  option_value: string;
  autoload: string;
}

export interface GwgoPmxeExports {
  id: number;
  attch_id: number;
  options?: string;
  scheduled: string;
  registered_on: Date | string;
  friendly_name: string;
  exported: number;
  canceled: number;
  canceled_on: Date | string;
  settings_update_on: Date | string;
  last_activity: Date | string;
  processing: number;
  executing: number;
  triggered: number;
  iteration: number;
  parent_id: number;
  export_post_type: string;
  client_mode_enabled: number;
}

export interface GwgoPmxeGoogleCats {
  id: number;
  name: string;
  parent_id: number;
  parent_name: string;
  level: number;
}

export interface GwgoPmxePosts {
  id: number;
  post_id: number;
  export_id: number;
  iteration: number;
}

export interface GwgoPmxeTemplates {
  id: number;
  name: string;
  options?: string;
}

export interface GwgoPmxiFiles {
  id: number;
  import_id: number;
  name?: string;
  path?: string;
  registered_on: Date | string;
}

export interface GwgoPmxiHistory {
  id: number;
  import_id: number;
  type: string;
  time_run?: string;
  date: Date | string;
  summary?: string;
}

export interface GwgoPmxiImages {
  id: number;
  attachment_id: number;
  image_url: string;
  image_filename: string;
}

export interface GwgoPmxiImports {
  id: number;
  parent_import_id: number;
  name?: string;
  friendly_name: string;
  type: string;
  feed_type: string;
  path?: string;
  xpath?: string;
  options?: string;
  registered_on: Date | string;
  root_element?: string;
  processing: number;
  executing: number;
  triggered: number;
  queue_chunk_number: number;
  first_import: Date | string;
  count: number;
  imported: number;
  created: number;
  updated: number;
  skipped: number;
  deleted: number;
  canceled: number;
  canceled_on: Date | string;
  failed: number;
  failed_on: Date | string;
  settings_update_on: Date | string;
  last_activity: Date | string;
  iteration: number;
}

export interface GwgoPmxiPosts {
  id: number;
  post_id: number;
  import_id: number;
  unique_key?: string;
  product_key?: string;
  iteration: number;
  specified: number;
}

export interface GwgoPmxiTemplates {
  id: number;
  options?: string;
  scheduled: string;
  name: string;
  title?: string;
  content?: string;
  is_keep_linebreaks: number;
  is_leave_html: number;
  fix_characters: number;
  meta?: string;
}

export interface GwgoPostmeta {
  meta_id: number;
  post_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoPosts {
  ID: number;
  post_author: number;
  post_date: Date | string;
  post_date_gmt: Date | string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: Date | string;
  post_modified_gmt: Date | string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: number;
  company_listing_id: number;
  is_giglancer_company: number;
}

export interface GwgoPpsCountries {
  id: number;
  name: string;
  iso_code_2?: string;
  iso_code_3?: string;
}

export interface GwgoPpsPopup {
  id: number;
  label: string;
  active: number;
  original_id: number;
  params: string;
  html: string;
  css: string;
  img_preview?: string;
  show_on: number;
  show_to: number;
  show_pages: number;
  type_id: number;
  views: number;
  unique_views: number;
  actions: number;
  date_created: Date | string;
  sort_order: number;
  show_in_admin_area: number;
}

export interface GwgoPpsPopupShowCategories {
  popup_id: number;
  term_id: number;
  not_show: number;
}

export interface GwgoProductBrandmeta {
  meta_id: number;
  product_brand_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoProductCatmeta {
  meta_id: number;
  product_cat_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoPtsModules {
  id: number;
  code: string;
  active: number;
  type_id: number;
  label?: string;
  ex_plug_dir?: string;
}

export interface GwgoPtsModulesType {
  id: number;
  label: string;
}

export interface GwgoPtsTables {
  id: number;
  unique_id: string;
  label: string;
  original_id: number;
  params?: string;
  html?: string;
  css: string;
  img?: string;
  sort_order: number;
  is_base: number;
  is_pro: number;
  date_created: Date | string;
}

export interface GwgoPtsUsageStat {
  id: number;
  code: string;
  visits: number;
  spent_time: number;
  modify_timestamp: Date | string;
}

export interface GwgoPumSubscribers {
  ID: number;
  email_hash: string;
  popup_id: number;
  user_id: number;
  email: string;
  name: string;
  fname: string;
  lname: string;
  uuid: string;
  consent: string;
  consent_args: string;
  created: Date | string;
}

export interface GwgoPvCommission {
  id: number;
  product_id: number;
  order_id: number;
  vendor_id: number;
  total_due: number;
  qty: number;
  total_shipping: number;
  tax: number;
  status: string;
  time: Date | string;
}

export interface GwgoPvcDaily {
  id: number;
  time: Date | string;
  postnum: string;
  postcount: number;
}

export interface GwgoPvcTotal {
  id: number;
  postnum: string;
  postcount: number;
}

export interface GwgoRedirection404 {
  id: number;
  created: Date | string;
  url: string;
  domain?: string;
  agent?: string;
  referrer?: string;
  http_code: number;
  request_method?: string;
  request_data?: string;
  ip?: string;
}

export interface GwgoRedirectionGroups {
  id: number;
  name: string;
  tracking: number;
  module_id: number;
  status: string;
  position: number;
}

export interface GwgoRedirectionItems {
  id: number;
  url: string;
  match_url?: string;
  match_data?: string;
  regex: number;
  position: number;
  last_count: number;
  last_access: Date | string;
  group_id: number;
  status: string;
  action_type: string;
  action_code: number;
  action_data?: string;
  match_type: string;
  title?: string;
}

export interface GwgoRedirectionLogs {
  id: number;
  created: Date | string;
  url: string;
  domain?: string;
  sent_to?: string;
  agent?: string;
  referrer?: string;
  http_code: number;
  request_method?: string;
  request_data?: string;
  redirect_by?: string;
  redirection_id?: number;
  ip?: string;
}

export interface GwgoResponsiveThumbnailSlider {
  id: number;
  title: string;
  image_name: string;
  createdon: Date | string;
  custom_link?: string;
  post_id?: number;
}

export interface GwgoReviewxCriterias {
  review_id: number;
  criteria_id: string;
  rating: number;
  is_automated: number;
}

export interface GwgoReviewxImportHistory {
  batch_id: number;
  file_name: string;
  import_date: Date | string;
  status: string;
}

export interface GwgoReviewxProcessJobs {
  id: number;
  process_name: string;
  process_meta: number;
}

export interface GwgoReviewxReminderEmail {
  id: number;
  order_id: number;
  customer_email: string;
  order_items: number;
  order_status: string;
  order_date: Date | string;
  status: string;
  max_delivery: number;
  total_delivery: number;
  processed_email?: string;
  scheduled_at: Date | string;
  is_subscribe: number;
}

export interface GwgoRichWebVideoSliderEffectsData {
  id: number;
  slider_vid_name: string;
  slider_Vid_type: string;
}

export interface GwgoRichWebVideoSliderFontFamily {
  id: number;
  Font_family: string;
}

export interface GwgoRichWebVideoSliderId {
  id: number;
  Slider_ID: number;
}

export interface GwgoRichWebVideoSliderManager {
  id: number;
  Slider_Title: string;
  Slider_Type: string;
  Slider_Video_Quantity: number;
}

export interface GwgoRichWebVideoSliderVideos {
  id: number;
  Rich_Web_VSlider_Vid_Title: string;
  Rich_Web_VSlider_Add_Desc: string;
  Rich_Web_VSldier_Add_Img: string;
  Rich_Web_VSldier_Add_Vid: string;
  Rich_Web_VSldier_Add_Src: string;
  Rich_Web_VSldier_Add_Link: string;
  Rich_Web_VSldier_Add_ONT: string;
  Slider_ID: number;
}

export interface GwgoRichWebVsEffect10Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_ASSl_L_Show: string;
  Rich_Web_ASSl_LT_Show: string;
  Rich_Web_ASSl_LT: string;
  Rich_Web_ASSl_L_BgC: string;
  Rich_Web_ASSl_L_T: string;
  Rich_Web_ASSl_LT_T: string;
  Rich_Web_ASSl_LT_FS: string;
  Rich_Web_ASSl_LT_FF: string;
  Rich_Web_ASSl_LT_C: string;
  Rich_Web_ASSl_L_T1_C: string;
  Rich_Web_ASSl_L_T2_C: string;
  Rich_Web_ASSl_L_T3_C: string;
  Rich_Web_ASSl_LT_T2_BC: string;
  Rich_Web_ASSl_L_C: string;
  Rich_Web_ASSl_LT_T2_AnC: string;
  Rich_Web_ASSl_LT_T3_BgC: string;
  Rich_Web_ASSl_L_S: string;
  Rich_Web_ASSl_Loading_Show: string;
}

export interface GwgoRichWebVsEffect1Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VS_ContSl_L_Show: string;
  Rich_Web_VS_ContSl_LT_Show: string;
  Rich_Web_VS_ContSl_LT: string;
  Rich_Web_VS_ContSl_L_BgC: string;
  Rich_Web_VS_ContSl_L_T: string;
  Rich_Web_VS_ContSl_LT_T: string;
  Rich_Web_VS_ContSl_LT_FS: string;
  Rich_Web_VS_ContSl_LT_FF: string;
  Rich_Web_VS_ContSl_LT_C: string;
  Rich_Web_VS_ContSl_L_T1_C: string;
  Rich_Web_VS_ContSl_L_T2_C: string;
  Rich_Web_VS_ContSl_L_T3_C: string;
  Rich_Web_VS_ContSl_LT_T2_BC: string;
  Rich_Web_VS_ContSl_L_C: string;
  Rich_Web_VS_ContSl_LT_T2_AnC: string;
  Rich_Web_VS_ContSl_LT_T3_BgC: string;
  Rich_Web_VS_ContSl_L_S: string;
  Rich_Web_VS_ContSl_Loading_Show: string;
}

export interface GwgoRichWebVsEffect2Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_SlickSl_L_Show: string;
  Rich_Web_SlickSl_LT_Show: string;
  Rich_Web_SlickSl_LT: string;
  Rich_Web_SlickSl_L_BgC: string;
  Rich_Web_SlickSl_L_T: string;
  Rich_Web_SlickSl_LT_T: string;
  Rich_Web_SlickSl_LT_FS: string;
  Rich_Web_SlickSl_LT_FF: string;
  Rich_Web_SlickSl_LT_C: string;
  Rich_Web_SlickSl_L_T1_C: string;
  Rich_Web_SlickSl_L_T2_C: string;
  Rich_Web_SlickSl_L_T3_C: string;
  Rich_Web_SlickSl_LT_T2_BC: string;
  Rich_Web_SlickSl_L_C: string;
  Rich_Web_SlickSl_LT_T2_AnC: string;
  Rich_Web_SlickSl_LT_T3_BgC: string;
  Rich_Web_SlickSl_L_S: string;
  Rich_Web_SlickSl_Loading_Show: string;
}

export interface GwgoRichWebVsEffect3Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_ThumbSl_L_Show: string;
  Rich_Web_ThumbSl_LT_Show: string;
  Rich_Web_ThumbSl_LT: string;
  Rich_Web_ThumbSl_L_BgC: string;
  Rich_Web_ThumbSl_L_T: string;
  Rich_Web_ThumbSl_LT_T: string;
  Rich_Web_ThumbSl_LT_FS: string;
  Rich_Web_ThumbSl_LT_FF: string;
  Rich_Web_ThumbSl_LT_C: string;
  Rich_Web_ThumbSl_L_T1_C: string;
  Rich_Web_ThumbSl_L_T2_C: string;
  Rich_Web_ThumbSl_L_T3_C: string;
  Rich_Web_ThumbSl_LT_T2_BC: string;
  Rich_Web_ThumbSl_L_C: string;
  Rich_Web_ThumbSl_LT_T2_AnC: string;
  Rich_Web_ThumbSl_LT_T3_BgC: string;
  Rich_Web_ThumbSl_L_S: string;
  Rich_Web_ThumbSl_Loading_Show: string;
}

export interface GwgoRichWebVsEffect4Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VCCP_L_Show: string;
  Rich_Web_VCCP_LT_Show: string;
  Rich_Web_VCCP_LT: string;
  Rich_Web_VCCP_L_BgC: string;
  Rich_Web_VCCP_L_T: string;
  Rich_Web_VCCP_LT_T: string;
  Rich_Web_VCCP_LT_FS: string;
  Rich_Web_VCCP_LT_FF: string;
  Rich_Web_VCCP_LT_C: string;
  Rich_Web_VCCP_L_T1_C: string;
  Rich_Web_VCCP_L_T2_C: string;
  Rich_Web_VCCP_L_T3_C: string;
  Rich_Web_VCCP_LT_T2_BC: string;
  Rich_Web_VCCP_L_C: string;
  Rich_Web_VCCP_LT_T2_AnC: string;
  Rich_Web_VCCP_LT_T3_BgC: string;
  Rich_Web_VCCP_L_S: string;
  Rich_Web_VCCP_Loading_Show: string;
}

export interface GwgoRichWebVsEffect5Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_SimpleVS_L_Show: string;
  Rich_Web_SimpleVS_LT_Show: string;
  Rich_Web_SimpleVS_LT: string;
  Rich_Web_SimpleVS_L_BgC: string;
  Rich_Web_SimpleVS_L_T: string;
  Rich_Web_SimpleVS_LT_T: string;
  Rich_Web_SimpleVS_LT_FS: string;
  Rich_Web_SimpleVS_LT_FF: string;
  Rich_Web_SimpleVS_LT_C: string;
  Rich_Web_SimpleVS_L_T1_C: string;
  Rich_Web_SimpleVS_L_T2_C: string;
  Rich_Web_SimpleVS_L_T3_C: string;
  Rich_Web_SimpleVS_LT_T2_BC: string;
  Rich_Web_SimpleVS_L_C: string;
  Rich_Web_SimpleVS_LT_T2_AnC: string;
  Rich_Web_SimpleVS_LT_T3_BgC: string;
  Rich_Web_SimpleVS_L_S: string;
  Rich_Web_SimpleVS_Loading_Show: string;
}

export interface GwgoRichWebVsEffect6Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSVT_L_Show: string;
  Rich_Web_VSVT_LT_Show: string;
  Rich_Web_VSVT_LT: string;
  Rich_Web_VSVT_L_BgC: string;
  Rich_Web_VSVT_L_T: string;
  Rich_Web_VSVT_LT_T: string;
  Rich_Web_VSVT_LT_FS: string;
  Rich_Web_VSVT_LT_FF: string;
  Rich_Web_VSVT_LT_C: string;
  Rich_Web_VSVT_L_T1_C: string;
  Rich_Web_VSVT_L_T2_C: string;
  Rich_Web_VSVT_L_T3_C: string;
  Rich_Web_VSVT_LT_T2_BC: string;
  Rich_Web_VSVT_L_C: string;
  Rich_Web_VSVT_LT_T2_AnC: string;
  Rich_Web_VSVT_LT_T3_BgC: string;
  Rich_Web_VSVT_L_S: string;
  Rich_Web_VSVT_Loading_Show: string;
}

export interface GwgoRichWebVsEffect7Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_HSL_L_Show: string;
  Rich_Web_HSL_LT_Show: string;
  Rich_Web_HSL_LT: string;
  Rich_Web_HSL_L_BgC: string;
  Rich_Web_HSL_L_T: string;
  Rich_Web_HSL_LT_T: string;
  Rich_Web_HSL_LT_FS: string;
  Rich_Web_HSL_LT_FF: string;
  Rich_Web_HSL_LT_C: string;
  Rich_Web_HSL_L_T1_C: string;
  Rich_Web_HSL_L_T2_C: string;
  Rich_Web_HSL_L_T3_C: string;
  Rich_Web_HSL_LT_T2_BC: string;
  Rich_Web_HSL_L_C: string;
  Rich_Web_HSL_LT_T2_AnC: string;
  Rich_Web_HSL_LT_T3_BgC: string;
  Rich_Web_HSL_L_S: string;
  Rich_Web_HSL_Loading_Show: string;
}

export interface GwgoRichWebVsEffect8Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_RichSl_L_Show: string;
  Rich_Web_RichSl_LT_Show: string;
  Rich_Web_RichSl_LT: string;
  Rich_Web_RichSl_L_BgC: string;
  Rich_Web_RichSl_L_T: string;
  Rich_Web_RichSl_LT_T: string;
  Rich_Web_RichSl_LT_FS: string;
  Rich_Web_RichSl_LT_FF: string;
  Rich_Web_RichSl_LT_C: string;
  Rich_Web_RichSl_L_T1_C: string;
  Rich_Web_RichSl_L_T2_C: string;
  Rich_Web_RichSl_L_T3_C: string;
  Rich_Web_RichSl_LT_T2_BC: string;
  Rich_Web_RichSl_L_C: string;
  Rich_Web_RichSl_LT_T2_AnC: string;
  Rich_Web_RichSl_LT_T3_BgC: string;
  Rich_Web_RichSl_L_S: string;
  Rich_Web_RichSl_Loading_Show: string;
}

export interface GwgoRichWebVsEffect9Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_TSL_L_Show: string;
  Rich_Web_TSL_LT_Show: string;
  Rich_Web_TSL_LT: string;
  Rich_Web_TSL_L_BgC: string;
  Rich_Web_TSL_L_T: string;
  Rich_Web_TSL_LT_T: string;
  Rich_Web_TSL_LT_FS: string;
  Rich_Web_TSL_LT_FF: string;
  Rich_Web_TSL_LT_C: string;
  Rich_Web_TSL_L_T1_C: string;
  Rich_Web_TSL_L_T2_C: string;
  Rich_Web_TSL_L_T3_C: string;
  Rich_Web_TSL_LT_T2_BC: string;
  Rich_Web_TSL_L_C: string;
  Rich_Web_TSL_LT_T2_AnC: string;
  Rich_Web_TSL_LT_T3_BgC: string;
  Rich_Web_TSL_L_S: string;
  Rich_Web_TSL_Loading_Show: string;
}

export interface GwgoSbInfiniteScroll {
  id: number;
  status?: number;
  title?: string;
  pagination_type?: string;
  content_selector?: string;
  navigation_selector?: string;
  next_selector?: string;
  body_class?: string;
  item_selector?: string;
  buffer_pixels?: number;
  scrolltop?: number;
  scrollto?: string;
  loading_message?: string;
  finished_message?: string;
  loading_wrapper_class?: string;
  loading_image?: string;
  load_more_button_text?: string;
  load_more_button_class?: string;
  animation?: string;
  onstart?: string;
  onfinish?: string;
  miscellaneous?: string;
}

export interface GwgoSignups {
  signup_id: number;
  domain: string;
  path: string;
  title: string;
  user_login: string;
  user_email: string;
  registered: Date | string;
  activated: Date | string;
  active: number;
  activation_key: string;
  meta?: string;
}

export interface GwgoSimpleviews {
  post_id: number;
  view?: number;
  view_datetime: Date | string;
}

export interface GwgoSnippets {
  id: number;
  name: string;
  description: string;
  code: string;
  tags: string;
  scope: string;
  condition_id: number;
  priority: number;
  active: number;
  modified: Date | string;
  revision: number;
  cloud_id?: string;
}

export interface GwgoTermRelationships {
  object_id: number;
  term_taxonomy_id: number;
  term_order: number;
}

export interface GwgoTermTaxonomy {
  term_taxonomy_id: number;
  term_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
}

export interface GwgoTermmeta {
  meta_id: number;
  term_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoTerms {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  order_no: number;
}

export interface GwgoThumbnailSlider {
  id: number;
  title: string;
  image_name: string;
  createdon: Date | string;
  custom_link?: string;
  post_id?: number;
}

export interface GwgoTmTaskmeta {
  meta_id: number;
  task_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoTmTasks {
  id: number;
  user_id: number;
  type: string;
  class_identifier?: string;
  attempts?: number;
  description?: string;
  time_created: Date | string;
  last_locked_at?: number;
  status?: string;
}

export interface GwgoUsermeta {
  umeta_id: number;
  user_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoUsers {
  ID: number;
  user_login: string;
  user_pass: string;
  user_nicename: string;
  user_email: string;
  user_url: string;
  user_registered: Date | string;
  user_activation_key: string;
  user_status: number;
  display_name: string;
  signup_step: string;
  signup_progress: string;
}

export interface GwgoWcAdminNoteActions {
  action_id: number;
  note_id: number;
  name: string;
  label: string;
  query: string;
  status: string;
  is_primary: number;
  actioned_text: string;
}

export interface GwgoWcAdminNotes {
  note_id: number;
  name: string;
  type: string;
  locale: string;
  title: string;
  content: string;
  icon: string;
  content_data?: string;
  status: string;
  source: string;
  date_created: Date | string;
  date_reminder?: Date | string;
  is_snoozable: number;
  layout: string;
  image?: string;
  is_deleted: number;
}

export interface GwgoWcCategoryLookup {
  category_tree_id: number;
  category_id: number;
}

export interface GwgoWcCustomerLookup {
  customer_id: number;
  user_id?: number;
  username: string;
  first_name: string;
  last_name: string;
  email?: string;
  date_last_active?: Date | string;
  date_registered?: Date | string;
  country: string;
  postcode: string;
  city: string;
  state: string;
}

export interface GwgoWcDownloadLog {
  download_log_id: number;
  timestamp: Date | string;
  permission_id: number;
  user_id?: number;
  user_ip_address?: string;
}

export interface GwgoWcOrderCouponLookup {
  order_id: number;
  coupon_id: number;
  date_created: Date | string;
  discount_amount: number;
}

export interface GwgoWcOrderProductLookup {
  order_item_id: number;
  order_id: number;
  product_id: number;
  variation_id: number;
  customer_id?: number;
  date_created: Date | string;
  product_qty: number;
  product_net_revenue: number;
  product_gross_revenue: number;
  coupon_amount: number;
  tax_amount: number;
  shipping_amount: number;
  shipping_tax_amount: number;
}

export interface GwgoWcOrderStats {
  order_id: number;
  parent_id: number;
  date_created: Date | string;
  date_created_gmt: Date | string;
  num_items_sold: number;
  total_sales: number;
  tax_total: number;
  shipping_total: number;
  net_total: number;
  returning_customer?: number;
  status: string;
  customer_id: number;
}

export interface GwgoWcOrderTaxLookup {
  order_id: number;
  tax_rate_id: number;
  date_created: Date | string;
  shipping_tax: number;
  order_tax: number;
  total_tax: number;
}

export interface GwgoWcProductMetaLookup {
  product_id: number;
  sku?: string;
  virtual?: number;
  downloadable?: number;
  min_price?: number;
  max_price?: number;
  onsale?: number;
  stock_quantity?: number;
  stock_status?: string;
  rating_count?: number;
  average_rating?: number;
  total_sales?: number;
  tax_status?: string;
  tax_class?: string;
}

export interface GwgoWcReservedStock {
  order_id: number;
  product_id: number;
  stock_quantity: number;
  timestamp: Date | string;
  expires: Date | string;
}

export interface GwgoWcTaxRateClasses {
  tax_rate_class_id: number;
  name: string;
  slug: string;
}

export interface GwgoWcWebhooks {
  webhook_id: number;
  status: string;
  name: string;
  user_id: number;
  delivery_url: string;
  secret: string;
  topic: string;
  date_created: Date | string;
  date_created_gmt: Date | string;
  date_modified: Date | string;
  date_modified_gmt: Date | string;
  api_version: number;
  failure_count: number;
  pending_delivery: number;
}

export interface GwgoWcvFeedback {
  id: number;
  rating: number;
  order_id: number;
  vendor_id: number;
  product_id: number;
  customer_id: number;
  rating_title?: string;
  comments?: string;
  postdate: Date | string;
}

export interface GwgoWoocommerceApiKeys {
  key_id: number;
  user_id: number;
  description?: string;
  permissions: string;
  consumer_key: string;
  consumer_secret: string;
  nonces?: string;
  truncated_key: string;
  last_access?: Date | string;
}

export interface GwgoWoocommerceAttributeTaxonomies {
  attribute_id: number;
  attribute_name: string;
  attribute_label?: string;
  attribute_type: string;
  attribute_orderby: string;
  attribute_public: number;
}

export interface GwgoWoocommerceDownloadableProductPermissions {
  permission_id: number;
  download_id: string;
  product_id: number;
  order_id: number;
  order_key: string;
  user_email: string;
  user_id?: number;
  downloads_remaining?: string;
  access_granted: Date | string;
  access_expires?: Date | string;
  download_count: number;
}

export interface GwgoWoocommerceLog {
  log_id: number;
  timestamp: Date | string;
  level: number;
  source: string;
  message: string;
  context?: string;
}

export interface GwgoWoocommerceOrderItemmeta {
  meta_id: number;
  order_item_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoWoocommerceOrderItems {
  order_item_id: number;
  order_item_name: string;
  order_item_type: string;
  order_id: number;
}

export interface GwgoWoocommercePaymentTokenmeta {
  meta_id: number;
  payment_token_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoWoocommercePaymentTokens {
  token_id: number;
  gateway_id: string;
  token: string;
  user_id: number;
  type: string;
  is_default: number;
}

export interface GwgoWoocommerceSessions {
  session_id: number;
  session_key: string;
  session_value: string;
  session_expiry: number;
}

export interface GwgoWoocommerceShippingZoneLocations {
  location_id: number;
  zone_id: number;
  location_code: string;
  location_type: string;
}

export interface GwgoWoocommerceShippingZoneMethods {
  zone_id: number;
  instance_id: number;
  method_id: string;
  method_order: number;
  is_enabled: number;
}

export interface GwgoWoocommerceShippingZones {
  zone_id: number;
  zone_name: string;
  zone_order: number;
}

export interface GwgoWoocommerceTaxRateLocations {
  location_id: number;
  location_code: string;
  tax_rate_id: number;
  location_type: string;
}

export interface GwgoWoocommerceTaxRates {
  tax_rate_id: number;
  tax_rate_country: string;
  tax_rate_state: string;
  tax_rate: string;
  tax_rate_name: string;
  tax_rate_priority: number;
  tax_rate_compound: number;
  tax_rate_shipping: number;
  tax_rate_order: number;
  tax_rate_class: string;
}

export interface GwgoWowMwp {
  id: number;
  title: string;
  param?: string;
}

export interface GwgoWp125Ads {
  id: number;
  slot: number;
  name: string;
  clicks: number;
  start_date: string;
  end_date: string;
  status: number;
  target: string;
  image_url: string;
  pre_exp_email: number;
}

export interface GwgoWpaieFileManager {
  file_id: number;
  file_name: string;
  absolute_path: string;
  file_path: string;
  file_type: string;
  file_info: string;
  imported_ids: string;
  upload_time: Date | string;
}

export interface GwgoWpbdpFees {
  id: number;
  label: string;
  amount: number;
  days: number;
  images: number;
  categories: Buffer;
  extra_data?: Buffer;
  weight: number;
  sticky: number;
  enabled: number;
  tag: string;
  description?: string;
}

export interface GwgoWpbdpFormFields {
  id: number;
  label: string;
  description?: string;
  field_type: string;
  association: string;
  validators?: string;
  weight: number;
  display_flags?: string;
  field_data?: Buffer;
  shortname: string;
  tag: string;
}

export interface GwgoWpbdpListingClaims {
  id: number;
  listing_id: number;
  status: string;
  user_id: number;
  user_comment?: string;
  answer?: string;
  payment_id: number;
  created_on: Date | string;
  processed_on?: Date | string;
  data?: Buffer;
}

export interface GwgoWpbdpListingFees {
  id: number;
  listing_id: number;
  category_id: number;
  expires_on?: Date | string;
  email_sent: number;
  fee_id?: number;
  fee_days: number;
  fee_images: number;
  recurring: number;
  recurring_id?: string;
  recurring_data?: Buffer;
  sticky: number;
}

export interface GwgoWpbdpListings {
  listing_id: number;
  fee_id?: number;
  fee_price?: number;
  fee_days?: number;
  fee_images?: number;
  expiration_date?: Date | string;
  is_recurring: number;
  is_sticky: number;
  subscription_id?: string;
  subscription_data?: Buffer;
  listing_status: string;
  flags: string;
}

export interface GwgoWpbdpLogs {
  id: number;
  object_id?: number;
  rel_object_id?: number;
  object_type?: string;
  created_at: Date | string;
  log_type?: string;
  actor?: string;
  message?: string;
  data?: Buffer;
}

export interface GwgoWpbdpPayments {
  id: number;
  listing_id: number;
  gateway?: string;
  amount: number;
  status: string;
  created_on: Date | string;
  processed_on?: Date | string;
  processed_by: string;
  payerinfo?: Buffer;
  extra_data?: Buffer;
  currency_code: string;
  notes?: Buffer;
  tag?: string;
  parent_id: number;
  payment_key?: string;
  payment_type?: string;
  payment_items?: Buffer;
  data?: Buffer;
  context?: string;
  payer_email?: string;
  payer_first_name?: string;
  payer_last_name?: string;
  payer_data?: Buffer;
  gateway_tx_id?: string;
  created_at: Date | string;
  is_test?: number;
}

export interface GwgoWpbdpPaymentsItems {
  id: number;
  payment_id: number;
  amount: number;
  item_type: string;
  description: string;
  rel_id_1?: number;
  rel_id_2?: number;
  data?: Buffer;
}

export interface GwgoWpbdpPlans {
  id: number;
  label: string;
  amount: number;
  days: number;
  images: number;
  sticky: number;
  recurring: number;
  pricing_model: string;
  pricing_details?: Buffer;
  supported_categories: string;
  weight: number;
  enabled: number;
  description?: string;
  extra_data?: Buffer;
  tag: string;
}

export interface GwgoWpbdpRatings {
  id: number;
  listing_id: number;
  rating: number;
  user_id: number;
  user_name?: string;
  ip_address: string;
  comment?: string;
  created_on: Date | string;
  approved: number;
  user_email?: string;
}

export interface GwgoWpbdpRegionmeta {
  meta_id: number;
  region_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoWpbdpSubmitState {
  id: string;
  state: Buffer;
  updated_on: Date | string;
}

export interface GwgoWpbdpXFeaturedLevels {
  id: string;
  name: string;
  weight: number;
  description?: string;
  cost: number;
  form_fields?: Buffer;
  extra_data?: Buffer;
}

export interface GwgoWpbdpZipcodes {
  zip: string;
  latitude: number;
  longitude: number;
  country: string;
  city?: string;
  state?: string;
}

export interface GwgoWpbdpZipcodesListings {
  listing_id: number;
  zip?: string;
  latitude?: number;
  longitude?: number;
}

export interface GwgoWpfmBackup {
  id: number;
  backup_name?: string;
  backup_date?: string;
}

export interface GwgoWpformsPaymentMeta {
  id: number;
  payment_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface GwgoWpformsPayments {
  id: number;
  form_id: number;
  status: string;
  subtotal_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  entry_id: number;
  gateway: string;
  type: string;
  mode: string;
  transaction_id: string;
  customer_id: string;
  subscription_id: string;
  subscription_status: string;
  title: string;
  date_created_gmt: Date | string;
  date_updated_gmt: Date | string;
  is_published: number;
}

export interface GwgoWpformsTasksMeta {
  id: number;
  action: string;
  data: string;
  date: Date | string;
}

export interface GwgoWpmailsmtpDebugEvents {
  id: number;
  content?: string;
  initiator?: string;
  event_type: number;
  created_at: Date | string;
}

export interface GwgoWpmailsmtpTasksMeta {
  id: number;
  action: string;
  data: string;
  date: Date | string;
}

export interface GwgoWtIewActionHistory {
  id: number;
  template_type: string;
  item_type: string;
  file_name: string;
  created_at: number;
  status: number;
  status_text: string;
  offset: number;
  total: number;
  data: string;
}

export interface GwgoWtIewMappingTemplate {
  id: number;
  template_type: string;
  item_type: string;
  name: string;
  data: string;
}

export interface GwgoYoastIndexable {
  id: number;
  permalink?: string;
  permalink_hash?: string;
  object_id?: number;
  object_type: string;
  object_sub_type?: string;
  author_id?: number;
  post_parent?: number;
  title?: string;
  description?: string;
  breadcrumb_title?: string;
  post_status?: string;
  is_public?: number;
  is_protected?: number;
  has_public_posts?: number;
  number_of_pages?: number;
  canonical?: string;
  primary_focus_keyword?: string;
  primary_focus_keyword_score?: number;
  readability_score?: number;
  is_cornerstone?: number;
  is_robots_noindex?: number;
  is_robots_nofollow?: number;
  is_robots_noarchive?: number;
  is_robots_noimageindex?: number;
  is_robots_nosnippet?: number;
  twitter_title?: string;
  twitter_image?: string;
  twitter_description?: string;
  twitter_image_id?: string;
  twitter_image_source?: string;
  open_graph_title?: string;
  open_graph_description?: string;
  open_graph_image?: string;
  open_graph_image_id?: string;
  open_graph_image_source?: string;
  open_graph_image_meta?: string;
  link_count?: number;
  incoming_link_count?: number;
  prominent_words_version?: number;
  created_at?: Date | string;
  updated_at: Date | string;
  blog_id: number;
  language?: string;
  region?: string;
  schema_page_type?: string;
  schema_article_type?: string;
  has_ancestors?: number;
  estimated_reading_time_minutes?: number;
  version?: number;
  object_last_modified?: Date | string;
  object_published_at?: Date | string;
  inclusive_language_score?: number;
}

export interface GwgoYoastIndexableHierarchy {
  indexable_id: number;
  ancestor_id: number;
  depth?: number;
  blog_id: number;
}

export interface GwgoYoastMigrations {
  id: number;
  version?: string;
}

export interface GwgoYoastPrimaryTerm {
  id: number;
  post_id?: number;
  term_id?: number;
  taxonomy: string;
  created_at?: Date | string;
  updated_at: Date | string;
  blog_id: number;
}

export interface GwgoYoastSeoLinks {
  id: number;
  url: string;
  post_id: number;
  target_post_id: number;
  type: string;
  indexable_id?: number;
  target_indexable_id?: number;
  height?: number;
  width?: number;
  size?: number;
  language?: string;
  region?: string;
}

export interface GwgoYoastSeoMeta {
  object_id: number;
  internal_link_count?: number;
  incoming_link_count?: number;
}

export interface MdfCharts {
  id: number;
  user_id: number;
  post_id: number;
  service: number;
  meta_key: string;
  value: string;
  is_approoved: number;
}

export interface MdfGoogleCatcher {
  id: number;
  listing_id: number;
  bizz_name: string;
  site_title: string;
  link: string;
  description: string;
  meta_keys: string;
  focus_keys: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  address: string;
}

export interface MdfQueryCache {
  mkey: string;
  mvalue: string;
}

export interface SibModelContact {
  id: number;
  email?: string;
  info?: string;
  code?: string;
  is_activate?: number;
  extra?: string;
}

export interface SmackuciEvents {
  id: number;
  revision: number;
  name?: string;
  original_file_name?: string;
  friendly_name?: string;
  import_type?: string;
  filetype?: string;
  filepath?: string;
  eventKey?: string;
  registered_on: Date | string;
  parent_node?: string;
  processing: number;
  executing: number;
  triggered: number;
  event_started_at: Date | string;
  count: number;
  processed: number;
  created: number;
  updated: number;
  skipped: number;
  deleted: number;
  is_terminated: number;
  terminated_on: Date | string;
  last_activity: Date | string;
  siteid: number;
  month?: string;
  year?: string;
}

export interface SmackuciHistory {
  id: number;
  event_id: number;
  time_taken?: string;
  date: Date | string;
  summary?: string;
}

export interface WpActionschedulerActions {
  action_id: number;
  hook: string;
  status: string;
  scheduled_date_gmt?: Date | string;
  scheduled_date_local?: Date | string;
  args?: string;
  schedule?: string;
  group_id: number;
  attempts: number;
  last_attempt_gmt?: Date | string;
  last_attempt_local?: Date | string;
  claim_id: number;
  extended_args?: string;
  priority: number;
}

export interface WpActionschedulerClaims {
  claim_id: number;
  date_created_gmt: Date | string;
}

export interface WpActionschedulerGroups {
  group_id: number;
  slug: string;
}

export interface WpActionschedulerLogs {
  log_id: number;
  action_id: number;
  message: string;
  log_date_gmt?: Date | string;
  log_date_local?: Date | string;
}

export interface WpAdminColumns {
  id: number;
  list_id: string;
  list_key: string;
  title: string;
  columns?: string;
  settings?: string;
  date_created: Date | string;
  date_modified: Date | string;
}

export interface WpAioseoCache {
  id: number;
  key: string;
  value: string;
  expiration?: Date | string;
  created: Date | string;
  updated: Date | string;
}

export interface WpAioseoNotifications {
  id: number;
  slug: string;
  title: string;
  content: string;
  type: string;
  level: string;
  notification_id?: number;
  notification_name?: string;
  start?: Date | string;
  end?: Date | string;
  button1_label?: string;
  button1_action?: string;
  button2_label?: string;
  button2_action?: string;
  dismissed: number;
  created: Date | string;
  updated: Date | string;
}

export interface WpAioseoPosts {
  id: number;
  post_id: number;
  title?: string;
  description?: string;
  keywords?: string;
  keyphrases?: string;
  page_analysis?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_object_type?: string;
  og_image_type?: string;
  og_image_custom_url?: string;
  og_image_custom_fields?: string;
  og_custom_image_width?: number;
  og_custom_image_height?: number;
  og_video?: string;
  og_custom_url?: string;
  og_article_section?: string;
  og_article_tags?: string;
  twitter_use_og?: number;
  twitter_card?: string;
  twitter_image_type?: string;
  twitter_image_custom_url?: string;
  twitter_image_custom_fields?: string;
  twitter_title?: string;
  twitter_description?: string;
  seo_score: number;
  schema_type?: string;
  schema_type_options?: string;
  pillar_content?: number;
  robots_default: number;
  robots_noindex: number;
  robots_noarchive: number;
  robots_nosnippet: number;
  robots_nofollow: number;
  robots_noimageindex: number;
  robots_noodp: number;
  robots_notranslate: number;
  robots_max_snippet?: number;
  robots_max_videopreview?: number;
  robots_max_imagepreview?: string;
  tabs?: string;
  images?: string;
  priority?: string;
  frequency?: string;
  videos?: string;
  video_thumbnail?: string;
  video_scan_date?: Date | string;
  local_seo?: string;
  breadcrumb_settings?: string;
  created: Date | string;
  updated: Date | string;
}

export interface WpAioseoSeoAnalyzerResults {
  id: number;
  data: string;
  score?: string;
  competitor_url?: string;
  created: Date | string;
  updated: Date | string;
}

export interface WpCategorymeta {
  meta_id: number;
  category_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpCkyBanners {
  banner_id: number;
  name: string;
  slug: string;
  status: number;
  settings: string;
  banner_default: number;
  contents: string;
  date_created: Date | string;
  date_modified: Date | string;
}

export interface WpCkyCookieCategories {
  category_id: number;
  name: string;
  slug: string;
  description: string;
  prior_consent: number;
  visibility: number;
  priority: number;
  sell_personal_data: number;
  meta?: string;
  date_created: Date | string;
  date_modified: Date | string;
}

export interface WpCkyCookies {
  cookie_id: number;
  name: string;
  slug: string;
  description: string;
  duration: string;
  domain: string;
  category: number;
  type: string;
  discovered: number;
  url_pattern?: string;
  meta?: string;
  date_created: Date | string;
  date_modified: Date | string;
}

export interface WpCliScripts {
  id: number;
  cliscript_title: string;
  cliscript_category: string;
  cliscript_type?: number;
  cliscript_status: string;
  cliscript_description: string;
  cliscript_key: string;
  type: number;
}

export interface WpCommentmeta {
  meta_id: number;
  comment_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpComments {
  comment_ID: number;
  comment_post_ID: number;
  comment_author: string;
  comment_author_email: string;
  comment_author_url: string;
  comment_author_IP: string;
  comment_date: Date | string;
  comment_date_gmt: Date | string;
  comment_content: string;
  comment_karma: number;
  comment_approved: string;
  comment_agent: string;
  comment_type: string;
  comment_parent: number;
  user_id: number;
}

export interface WpCompanyFaqs {
  id: number;
  post_id: number;
  faqs: string;
  created_at: Date | string;
}

export interface WpCpkWpcsvExportQueue {
  id: number;
  export_id: string;
  post_id: number;
  done: number;
  msg?: string;
}

export interface WpCpkWpcsvLog {
  id: number;
  category: string;
  msg: string;
  data?: string;
  created: Date | string;
}

export interface WpEEvents {
  id: number;
  event_data?: string;
  created_at: Date | string;
}

export interface WpFrmtFormEntry {
  entry_id: number;
  entry_type: string;
  draft_id?: string;
  form_id: number;
  is_spam: number;
  date_created: Date | string;
}

export interface WpFrmtFormEntryMeta {
  meta_id: number;
  entry_id: number;
  meta_key?: string;
  meta_value?: string;
  date_created: Date | string;
  date_updated: Date | string;
}

export interface WpFrmtFormReports {
  report_id: number;
  report_value: string;
  status: string;
  date_created: Date | string;
  date_updated: Date | string;
}

export interface WpFrmtFormViews {
  view_id: number;
  form_id: number;
  page_id: number;
  ip?: string;
  count: number;
  date_created: Date | string;
  date_updated: Date | string;
}

export interface WpLinks {
  link_id: number;
  link_url: string;
  link_name: string;
  link_image: string;
  link_target: string;
  link_description: string;
  link_visible: string;
  link_owner: number;
  link_rating: number;
  link_updated: Date | string;
  link_rel: string;
  link_notes: string;
  link_rss: string;
}

export interface WpListingsRatingsAndReviews {
  listing_id: number;
  service_id: number;
  rating: number;
  rev_number: number;
  rate_times_num: number;
  mq: number;
}

export interface WpMailsterActionBounces {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
  hard: number;
  text: string;
}

export interface WpMailsterActionClicks {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
  link_id: number;
}

export interface WpMailsterActionErrors {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
  text: string;
}

export interface WpMailsterActionOpens {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
}

export interface WpMailsterActionSent {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
}

export interface WpMailsterActionUnsubs {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
  text: string;
}

export interface WpMailsterActions {
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  count: number;
  type: number;
  link_id: number;
}

export interface WpMailsterFormFields {
  ID: number;
  form_id: number;
  field_id: string;
  name: string;
  error_msg: string;
  required: number;
  position: number;
}

export interface WpMailsterForms {
  ID: number;
  name: string;
  submit: string;
  asterisk?: number;
  userschoice?: number;
  precheck?: number;
  dropdown?: number;
  prefill?: number;
  inline?: number;
  overwrite?: number;
  addlists?: number;
  style?: string;
  custom_style?: string;
  doubleoptin?: number;
  subject?: string;
  headline?: string;
  content?: string;
  link?: string;
  resend?: number;
  resend_count?: number;
  resend_time?: number;
  template: string;
  vcard?: number;
  vcard_content?: string;
  confirmredirect?: string;
  redirect?: string;
  added?: number;
  updated?: number;
}

export interface WpMailsterFormsLists {
  form_id: number;
  list_id: number;
  added: number;
}

export interface WpMailsterFormsTags {
  form_id: number;
  tag_id: number;
  added: number;
}

export interface WpMailsterLinks {
  ID: number;
  link: string;
  i: number;
}

export interface WpMailsterLists {
  ID: number;
  parent_id: number;
  name: string;
  slug: string;
  description: string;
  added: number;
  updated: number;
}

export interface WpMailsterListsSubscribers {
  list_id: number;
  subscriber_id: number;
  added: number;
}

export interface WpMailsterLogs {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  subject: string;
  receivers: string;
  html: string;
  text: string;
  raw: string;
  message_id: string;
}

export interface WpMailsterQueue {
  ID: number;
  subscriber_id: number;
  campaign_id: number;
  requeued: number;
  added: number;
  timestamp: number;
  sent: number;
  priority: number;
  count: number;
  error: number;
  ignore_status: number;
  options: string;
  tags: string;
  i: number;
}

export interface WpMailsterSubscriberFields {
  ID: number;
  subscriber_id: number;
  meta_key: string;
  meta_value: string;
}

export interface WpMailsterSubscriberMeta {
  ID: number;
  subscriber_id?: number;
  campaign_id: number;
  meta_key: string;
  meta_value: string;
}

export interface WpMailsterSubscribers {
  ID: number;
  hash: string;
  email: string;
  wp_id: number;
  status: number;
  added: number;
  updated: number;
  signup: number;
  confirm: number;
  ip_signup: string;
  ip_confirm: string;
  rating: number;
}

export interface WpMailsterTags {
  ID: number;
  name: string;
  added: number;
  updated: number;
}

export interface WpMailsterTagsSubscribers {
  tag_id: number;
  subscriber_id: number;
  added: number;
}

export interface WpMdfQueryCache {
  mkey: string;
  mvalue: string;
}

export interface WpMdfStatBuffer {
  id: number;
  hash: string;
  user_ip: string;
  post_type: string;
  type: string;
  filter_id: number;
  key_id: string;
  value: string;
  time: number;
}

export interface WpMdfStatTmp {
  id: number;
  user_ip: string;
  post_type: string;
  tax_data: string;
  meta_data: string;
  hash: string;
  time: number;
  is_collected: number;
}

export interface WpMwaiFilemeta {
  meta_id: number;
  file_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpMwaiFiles {
  id: number;
  refId: string;
  envId?: string;
  userId?: string;
  type?: string;
  status?: string;
  purpose?: string;
  created: Date | string;
  updated: Date | string;
  expires?: Date | string;
  path?: string;
  url?: string;
}

export interface WpMyCREDLog {
  id: number;
  ref: string;
  ref_id?: number;
  user_id?: number;
  creds?: number;
  ctype?: string;
  time?: number;
  entry?: string;
  data?: string;
}

export interface WpNf3ActionMeta {
  id: number;
  parent_id: number;
  key: string;
  value?: string;
  meta_key?: string;
  meta_value?: string;
}

export interface WpNf3Actions {
  id: number;
  title?: string;
  key?: string;
  type?: string;
  active?: number;
  parent_id: number;
  created_at: Date | string;
  updated_at?: Date | string;
  label?: string;
}

export interface WpNf3Chunks {
  id: number;
  name?: string;
  value?: string;
}

export interface WpNf3FieldMeta {
  id: number;
  parent_id: number;
  key: string;
  value?: string;
  meta_key?: string;
  meta_value?: string;
}

export interface WpNf3Fields {
  id: number;
  label?: string;
  key?: string;
  type?: string;
  parent_id: number;
  created_at: Date | string;
  updated_at?: Date | string;
  field_label?: string;
  field_key?: string;
  order?: number;
  required?: any;
  default_value?: string;
  label_pos?: string;
  personally_identifiable?: any;
}

export interface WpNf3FormMeta {
  id: number;
  parent_id: number;
  key: string;
  value?: string;
  meta_key?: string;
  meta_value?: string;
}

export interface WpNf3Forms {
  id: number;
  title?: string;
  key?: string;
  created_at: Date | string;
  updated_at?: Date | string;
  views?: number;
  subs?: number;
  form_title?: string;
  default_label_pos?: string;
  show_title?: any;
  clear_complete?: any;
  hide_complete?: any;
  logged_in?: any;
  seq_num?: number;
}

export interface WpNf3ObjectMeta {
  id: number;
  parent_id: number;
  key: string;
  value?: string;
  meta_key?: string;
  meta_value?: string;
}

export interface WpNf3Objects {
  id: number;
  type?: string;
  title?: string;
  created_at: Date | string;
  updated_at?: Date | string;
  object_title?: string;
}

export interface WpNf3Relationships {
  id: number;
  child_id: number;
  child_type: string;
  parent_id: number;
  parent_type: string;
  created_at: Date | string;
  updated_at?: Date | string;
}

export interface WpNf3Upgrades {
  id: number;
  cache?: string;
  stage: number;
  maintenance?: any;
}

export interface WpNxsLog {
  id: number;
  date: Date | string;
  act: string;
  nt: string;
  type: string;
  msg: string;
  extInfo: string;
}

export interface WpOptions {
  option_id: number;
  option_name?: string;
  option_value: string;
  autoload: string;
}

export interface WpPmxeExports {
  id: number;
  attch_id: number;
  options?: string;
  scheduled: string;
  registered_on: Date | string;
  friendly_name: string;
  exported: number;
  canceled: number;
  canceled_on: Date | string;
  settings_update_on: Date | string;
  last_activity: Date | string;
  processing: number;
  executing: number;
  triggered: number;
  iteration: number;
  parent_id: number;
  export_post_type: string;
  client_mode_enabled: number;
}

export interface WpPmxeGoogleCats {
  id: number;
  name: string;
  parent_id: number;
  parent_name: string;
  level: number;
}

export interface WpPmxePosts {
  id: number;
  post_id: number;
  export_id: number;
  iteration: number;
}

export interface WpPmxeTemplates {
  id: number;
  name: string;
  options?: string;
}

export interface WpPmxiFiles {
  id: number;
  import_id: number;
  name?: string;
  path?: string;
  registered_on: Date | string;
}

export interface WpPmxiHistory {
  id: number;
  import_id: number;
  type: string;
  time_run?: string;
  date: Date | string;
  summary?: string;
}

export interface WpPmxiImages {
  id: number;
  attachment_id: number;
  image_url: string;
  image_filename: string;
}

export interface WpPmxiImports {
  id: number;
  parent_import_id: number;
  name?: string;
  friendly_name: string;
  type: string;
  feed_type: string;
  path?: string;
  xpath?: string;
  options?: string;
  registered_on: Date | string;
  root_element?: string;
  processing: number;
  executing: number;
  triggered: number;
  queue_chunk_number: number;
  first_import: Date | string;
  count: number;
  imported: number;
  created: number;
  updated: number;
  skipped: number;
  deleted: number;
  canceled: number;
  canceled_on: Date | string;
  failed: number;
  failed_on: Date | string;
  settings_update_on: Date | string;
  last_activity: Date | string;
  iteration: number;
}

export interface WpPmxiPosts {
  id: number;
  post_id: number;
  import_id: number;
  unique_key?: string;
  product_key?: string;
  iteration: number;
  specified: number;
}

export interface WpPmxiTemplates {
  id: number;
  options?: string;
  scheduled: string;
  name: string;
  title?: string;
  content?: string;
  is_keep_linebreaks: number;
  is_leave_html: number;
  fix_characters: number;
  meta?: string;
}

export interface WpPostmeta {
  meta_id: number;
  post_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpPosts {
  ID: number;
  post_author: number;
  post_date: Date | string;
  post_date_gmt: Date | string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: Date | string;
  post_modified_gmt: Date | string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: number;
  company_listing_id: number;
  is_giglancer_company: number;
}

export interface WpPpsCountries {
  id: number;
  name: string;
  iso_code_2?: string;
  iso_code_3?: string;
}

export interface WpPpsPopup {
  id: number;
  label: string;
  active: number;
  original_id: number;
  params: string;
  html: string;
  css: string;
  img_preview?: string;
  show_on: number;
  show_to: number;
  show_pages: number;
  type_id: number;
  views: number;
  unique_views: number;
  actions: number;
  date_created: Date | string;
  sort_order: number;
  show_in_admin_area: number;
}

export interface WpPpsPopupShowCategories {
  popup_id: number;
  term_id: number;
  not_show: number;
}

export interface WpProductBrandmeta {
  meta_id: number;
  product_brand_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpProductCatmeta {
  meta_id: number;
  product_cat_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpPtsModules {
  id: number;
  code: string;
  active: number;
  type_id: number;
  label?: string;
  ex_plug_dir?: string;
}

export interface WpPtsModulesType {
  id: number;
  label: string;
}

export interface WpPtsTables {
  id: number;
  unique_id: string;
  label: string;
  original_id: number;
  params?: string;
  html?: string;
  css: string;
  img?: string;
  sort_order: number;
  is_base: number;
  is_pro: number;
  date_created: Date | string;
}

export interface WpPtsUsageStat {
  id: number;
  code: string;
  visits: number;
  spent_time: number;
  modify_timestamp: Date | string;
}

export interface WpPumSubscribers {
  ID: number;
  email_hash: string;
  popup_id: number;
  user_id: number;
  email: string;
  name: string;
  fname: string;
  lname: string;
  uuid: string;
  consent: string;
  consent_args: string;
  created: Date | string;
}

export interface WpPvCommission {
  id: number;
  product_id: number;
  order_id: number;
  vendor_id: number;
  total_due: number;
  qty: number;
  total_shipping: number;
  tax: number;
  status: string;
  time: Date | string;
}

export interface WpPvcDaily {
  id: number;
  time: Date | string;
  postnum: string;
  postcount: number;
}

export interface WpPvcTotal {
  id: number;
  postnum: string;
  postcount: number;
}

export interface WpRedirection404 {
  id: number;
  created: Date | string;
  url: string;
  domain?: string;
  agent?: string;
  referrer?: string;
  http_code: number;
  request_method?: string;
  request_data?: string;
  ip?: string;
}

export interface WpRedirectionGroups {
  id: number;
  name: string;
  tracking: number;
  module_id: number;
  status: string;
  position: number;
}

export interface WpRedirectionItems {
  id: number;
  url: string;
  match_url?: string;
  match_data?: string;
  regex: number;
  position: number;
  last_count: number;
  last_access: Date | string;
  group_id: number;
  status: string;
  action_type: string;
  action_code: number;
  action_data?: string;
  match_type: string;
  title?: string;
}

export interface WpRedirectionLogs {
  id: number;
  created: Date | string;
  url: string;
  domain?: string;
  sent_to?: string;
  agent?: string;
  referrer?: string;
  http_code: number;
  request_method?: string;
  request_data?: string;
  redirect_by?: string;
  redirection_id?: number;
  ip?: string;
}

export interface WpResponsiveThumbnailSlider {
  id: number;
  title: string;
  image_name: string;
  createdon: Date | string;
  custom_link?: string;
  post_id?: number;
}

export interface WpReviewxCriterias {
  review_id: number;
  criteria_id: string;
  rating: number;
  is_automated: number;
}

export interface WpReviewxImportHistory {
  batch_id: number;
  file_name: string;
  import_date: Date | string;
  status: string;
}

export interface WpReviewxProcessJobs {
  id: number;
  process_name: string;
  process_meta: number;
}

export interface WpReviewxReminderEmail {
  id: number;
  order_id: number;
  customer_email: string;
  order_items: number;
  order_status: string;
  order_date: Date | string;
  status: string;
  max_delivery: number;
  total_delivery: number;
  processed_email?: string;
  scheduled_at: Date | string;
  is_subscribe: number;
}

export interface WpRichWebVideoSliderEffectsData {
  id: number;
  slider_vid_name: string;
  slider_Vid_type: string;
}

export interface WpRichWebVideoSliderFontFamily {
  id: number;
  Font_family: string;
}

export interface WpRichWebVideoSliderId {
  id: number;
  Slider_ID: number;
}

export interface WpRichWebVideoSliderManager {
  id: number;
  Slider_Title: string;
  Slider_Type: string;
  Slider_Video_Quantity: number;
}

export interface WpRichWebVideoSliderVideos {
  id: number;
  Rich_Web_VSlider_Vid_Title: string;
  Rich_Web_VSlider_Add_Desc: string;
  Rich_Web_VSldier_Add_Img: string;
  Rich_Web_VSldier_Add_Vid: string;
  Rich_Web_VSldier_Add_Src: string;
  Rich_Web_VSldier_Add_Link: string;
  Rich_Web_VSldier_Add_ONT: string;
  Slider_ID: number;
}

export interface WpRichWebVsEffect10Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_ASSl_L_Show: string;
  Rich_Web_ASSl_LT_Show: string;
  Rich_Web_ASSl_LT: string;
  Rich_Web_ASSl_L_BgC: string;
  Rich_Web_ASSl_L_T: string;
  Rich_Web_ASSl_LT_T: string;
  Rich_Web_ASSl_LT_FS: string;
  Rich_Web_ASSl_LT_FF: string;
  Rich_Web_ASSl_LT_C: string;
  Rich_Web_ASSl_L_T1_C: string;
  Rich_Web_ASSl_L_T2_C: string;
  Rich_Web_ASSl_L_T3_C: string;
  Rich_Web_ASSl_LT_T2_BC: string;
  Rich_Web_ASSl_L_C: string;
  Rich_Web_ASSl_LT_T2_AnC: string;
  Rich_Web_ASSl_LT_T3_BgC: string;
  Rich_Web_ASSl_L_S: string;
  Rich_Web_ASSl_Loading_Show: string;
}

export interface WpRichWebVsEffect1Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VS_ContSl_L_Show: string;
  Rich_Web_VS_ContSl_LT_Show: string;
  Rich_Web_VS_ContSl_LT: string;
  Rich_Web_VS_ContSl_L_BgC: string;
  Rich_Web_VS_ContSl_L_T: string;
  Rich_Web_VS_ContSl_LT_T: string;
  Rich_Web_VS_ContSl_LT_FS: string;
  Rich_Web_VS_ContSl_LT_FF: string;
  Rich_Web_VS_ContSl_LT_C: string;
  Rich_Web_VS_ContSl_L_T1_C: string;
  Rich_Web_VS_ContSl_L_T2_C: string;
  Rich_Web_VS_ContSl_L_T3_C: string;
  Rich_Web_VS_ContSl_LT_T2_BC: string;
  Rich_Web_VS_ContSl_L_C: string;
  Rich_Web_VS_ContSl_LT_T2_AnC: string;
  Rich_Web_VS_ContSl_LT_T3_BgC: string;
  Rich_Web_VS_ContSl_L_S: string;
  Rich_Web_VS_ContSl_Loading_Show: string;
}

export interface WpRichWebVsEffect2Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_SlickSl_L_Show: string;
  Rich_Web_SlickSl_LT_Show: string;
  Rich_Web_SlickSl_LT: string;
  Rich_Web_SlickSl_L_BgC: string;
  Rich_Web_SlickSl_L_T: string;
  Rich_Web_SlickSl_LT_T: string;
  Rich_Web_SlickSl_LT_FS: string;
  Rich_Web_SlickSl_LT_FF: string;
  Rich_Web_SlickSl_LT_C: string;
  Rich_Web_SlickSl_L_T1_C: string;
  Rich_Web_SlickSl_L_T2_C: string;
  Rich_Web_SlickSl_L_T3_C: string;
  Rich_Web_SlickSl_LT_T2_BC: string;
  Rich_Web_SlickSl_L_C: string;
  Rich_Web_SlickSl_LT_T2_AnC: string;
  Rich_Web_SlickSl_LT_T3_BgC: string;
  Rich_Web_SlickSl_L_S: string;
  Rich_Web_SlickSl_Loading_Show: string;
}

export interface WpRichWebVsEffect3Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_ThumbSl_L_Show: string;
  Rich_Web_ThumbSl_LT_Show: string;
  Rich_Web_ThumbSl_LT: string;
  Rich_Web_ThumbSl_L_BgC: string;
  Rich_Web_ThumbSl_L_T: string;
  Rich_Web_ThumbSl_LT_T: string;
  Rich_Web_ThumbSl_LT_FS: string;
  Rich_Web_ThumbSl_LT_FF: string;
  Rich_Web_ThumbSl_LT_C: string;
  Rich_Web_ThumbSl_L_T1_C: string;
  Rich_Web_ThumbSl_L_T2_C: string;
  Rich_Web_ThumbSl_L_T3_C: string;
  Rich_Web_ThumbSl_LT_T2_BC: string;
  Rich_Web_ThumbSl_L_C: string;
  Rich_Web_ThumbSl_LT_T2_AnC: string;
  Rich_Web_ThumbSl_LT_T3_BgC: string;
  Rich_Web_ThumbSl_L_S: string;
  Rich_Web_ThumbSl_Loading_Show: string;
}

export interface WpRichWebVsEffect4Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VCCP_L_Show: string;
  Rich_Web_VCCP_LT_Show: string;
  Rich_Web_VCCP_LT: string;
  Rich_Web_VCCP_L_BgC: string;
  Rich_Web_VCCP_L_T: string;
  Rich_Web_VCCP_LT_T: string;
  Rich_Web_VCCP_LT_FS: string;
  Rich_Web_VCCP_LT_FF: string;
  Rich_Web_VCCP_LT_C: string;
  Rich_Web_VCCP_L_T1_C: string;
  Rich_Web_VCCP_L_T2_C: string;
  Rich_Web_VCCP_L_T3_C: string;
  Rich_Web_VCCP_LT_T2_BC: string;
  Rich_Web_VCCP_L_C: string;
  Rich_Web_VCCP_LT_T2_AnC: string;
  Rich_Web_VCCP_LT_T3_BgC: string;
  Rich_Web_VCCP_L_S: string;
  Rich_Web_VCCP_Loading_Show: string;
}

export interface WpRichWebVsEffect5Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_SimpleVS_L_Show: string;
  Rich_Web_SimpleVS_LT_Show: string;
  Rich_Web_SimpleVS_LT: string;
  Rich_Web_SimpleVS_L_BgC: string;
  Rich_Web_SimpleVS_L_T: string;
  Rich_Web_SimpleVS_LT_T: string;
  Rich_Web_SimpleVS_LT_FS: string;
  Rich_Web_SimpleVS_LT_FF: string;
  Rich_Web_SimpleVS_LT_C: string;
  Rich_Web_SimpleVS_L_T1_C: string;
  Rich_Web_SimpleVS_L_T2_C: string;
  Rich_Web_SimpleVS_L_T3_C: string;
  Rich_Web_SimpleVS_LT_T2_BC: string;
  Rich_Web_SimpleVS_L_C: string;
  Rich_Web_SimpleVS_LT_T2_AnC: string;
  Rich_Web_SimpleVS_LT_T3_BgC: string;
  Rich_Web_SimpleVS_L_S: string;
  Rich_Web_SimpleVS_Loading_Show: string;
}

export interface WpRichWebVsEffect6Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSVT_L_Show: string;
  Rich_Web_VSVT_LT_Show: string;
  Rich_Web_VSVT_LT: string;
  Rich_Web_VSVT_L_BgC: string;
  Rich_Web_VSVT_L_T: string;
  Rich_Web_VSVT_LT_T: string;
  Rich_Web_VSVT_LT_FS: string;
  Rich_Web_VSVT_LT_FF: string;
  Rich_Web_VSVT_LT_C: string;
  Rich_Web_VSVT_L_T1_C: string;
  Rich_Web_VSVT_L_T2_C: string;
  Rich_Web_VSVT_L_T3_C: string;
  Rich_Web_VSVT_LT_T2_BC: string;
  Rich_Web_VSVT_L_C: string;
  Rich_Web_VSVT_LT_T2_AnC: string;
  Rich_Web_VSVT_LT_T3_BgC: string;
  Rich_Web_VSVT_L_S: string;
  Rich_Web_VSVT_Loading_Show: string;
}

export interface WpRichWebVsEffect7Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_HSL_L_Show: string;
  Rich_Web_HSL_LT_Show: string;
  Rich_Web_HSL_LT: string;
  Rich_Web_HSL_L_BgC: string;
  Rich_Web_HSL_L_T: string;
  Rich_Web_HSL_LT_T: string;
  Rich_Web_HSL_LT_FS: string;
  Rich_Web_HSL_LT_FF: string;
  Rich_Web_HSL_LT_C: string;
  Rich_Web_HSL_L_T1_C: string;
  Rich_Web_HSL_L_T2_C: string;
  Rich_Web_HSL_L_T3_C: string;
  Rich_Web_HSL_LT_T2_BC: string;
  Rich_Web_HSL_L_C: string;
  Rich_Web_HSL_LT_T2_AnC: string;
  Rich_Web_HSL_LT_T3_BgC: string;
  Rich_Web_HSL_L_S: string;
  Rich_Web_HSL_Loading_Show: string;
}

export interface WpRichWebVsEffect8Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_RichSl_L_Show: string;
  Rich_Web_RichSl_LT_Show: string;
  Rich_Web_RichSl_LT: string;
  Rich_Web_RichSl_L_BgC: string;
  Rich_Web_RichSl_L_T: string;
  Rich_Web_RichSl_LT_T: string;
  Rich_Web_RichSl_LT_FS: string;
  Rich_Web_RichSl_LT_FF: string;
  Rich_Web_RichSl_LT_C: string;
  Rich_Web_RichSl_L_T1_C: string;
  Rich_Web_RichSl_L_T2_C: string;
  Rich_Web_RichSl_L_T3_C: string;
  Rich_Web_RichSl_LT_T2_BC: string;
  Rich_Web_RichSl_L_C: string;
  Rich_Web_RichSl_LT_T2_AnC: string;
  Rich_Web_RichSl_LT_T3_BgC: string;
  Rich_Web_RichSl_L_S: string;
  Rich_Web_RichSl_Loading_Show: string;
}

export interface WpRichWebVsEffect9Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_TSL_L_Show: string;
  Rich_Web_TSL_LT_Show: string;
  Rich_Web_TSL_LT: string;
  Rich_Web_TSL_L_BgC: string;
  Rich_Web_TSL_L_T: string;
  Rich_Web_TSL_LT_T: string;
  Rich_Web_TSL_LT_FS: string;
  Rich_Web_TSL_LT_FF: string;
  Rich_Web_TSL_LT_C: string;
  Rich_Web_TSL_L_T1_C: string;
  Rich_Web_TSL_L_T2_C: string;
  Rich_Web_TSL_L_T3_C: string;
  Rich_Web_TSL_LT_T2_BC: string;
  Rich_Web_TSL_L_C: string;
  Rich_Web_TSL_LT_T2_AnC: string;
  Rich_Web_TSL_LT_T3_BgC: string;
  Rich_Web_TSL_L_S: string;
  Rich_Web_TSL_Loading_Show: string;
}

export interface WpSbInfiniteScroll {
  id: number;
  status?: number;
  title?: string;
  pagination_type?: string;
  content_selector?: string;
  navigation_selector?: string;
  next_selector?: string;
  body_class?: string;
  item_selector?: string;
  buffer_pixels?: number;
  scrolltop?: number;
  scrollto?: string;
  loading_message?: string;
  finished_message?: string;
  loading_wrapper_class?: string;
  loading_image?: string;
  load_more_button_text?: string;
  load_more_button_class?: string;
  animation?: string;
  onstart?: string;
  onfinish?: string;
  miscellaneous?: string;
}

export interface WpSignups {
  signup_id: number;
  domain: string;
  path: string;
  title: string;
  user_login: string;
  user_email: string;
  registered: Date | string;
  activated: Date | string;
  active: number;
  activation_key: string;
  meta?: string;
}

export interface WpSimpleviews {
  post_id: number;
  view?: number;
  view_datetime: Date | string;
}

export interface WpSnippets {
  id: number;
  name: string;
  description: string;
  code: string;
  tags: string;
  scope: string;
  condition_id: number;
  priority: number;
  active: number;
  modified: Date | string;
  revision: number;
  cloud_id?: string;
}

export interface WpTermRelationships {
  object_id: number;
  term_taxonomy_id: number;
  term_order: number;
}

export interface WpTermTaxonomy {
  term_taxonomy_id: number;
  term_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
}

export interface WpTermmeta {
  meta_id: number;
  term_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpTerms {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  order_no: number;
}

export interface WpThumbnailSlider {
  id: number;
  title: string;
  image_name: string;
  createdon: Date | string;
  custom_link?: string;
  post_id?: number;
}

export interface WpTmTaskmeta {
  meta_id: number;
  task_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpTmTasks {
  id: number;
  user_id: number;
  type: string;
  class_identifier?: string;
  attempts?: number;
  description?: string;
  time_created: Date | string;
  last_locked_at?: number;
  status?: string;
}

export interface WpUsermeta {
  umeta_id: number;
  user_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpUsers {
  ID: number;
  user_login: string;
  user_pass: string;
  user_nicename: string;
  user_email: string;
  user_url: string;
  user_registered: Date | string;
  user_activation_key: string;
  user_status: number;
  display_name: string;
  signup_step: string;
  signup_progress: string;
}

export interface WpWcAdminNoteActions {
  action_id: number;
  note_id: number;
  name: string;
  label: string;
  query: string;
  status: string;
  is_primary: number;
  actioned_text: string;
}

export interface WpWcAdminNotes {
  note_id: number;
  name: string;
  type: string;
  locale: string;
  title: string;
  content: string;
  icon: string;
  content_data?: string;
  status: string;
  source: string;
  date_created: Date | string;
  date_reminder?: Date | string;
  is_snoozable: number;
  layout: string;
  image?: string;
  is_deleted: number;
}

export interface WpWcCategoryLookup {
  category_tree_id: number;
  category_id: number;
}

export interface WpWcCustomerLookup {
  customer_id: number;
  user_id?: number;
  username: string;
  first_name: string;
  last_name: string;
  email?: string;
  date_last_active?: Date | string;
  date_registered?: Date | string;
  country: string;
  postcode: string;
  city: string;
  state: string;
}

export interface WpWcDownloadLog {
  download_log_id: number;
  timestamp: Date | string;
  permission_id: number;
  user_id?: number;
  user_ip_address?: string;
}

export interface WpWcOrderCouponLookup {
  order_id: number;
  coupon_id: number;
  date_created: Date | string;
  discount_amount: number;
}

export interface WpWcOrderProductLookup {
  order_item_id: number;
  order_id: number;
  product_id: number;
  variation_id: number;
  customer_id?: number;
  date_created: Date | string;
  product_qty: number;
  product_net_revenue: number;
  product_gross_revenue: number;
  coupon_amount: number;
  tax_amount: number;
  shipping_amount: number;
  shipping_tax_amount: number;
}

export interface WpWcOrderStats {
  order_id: number;
  parent_id: number;
  date_created: Date | string;
  date_created_gmt: Date | string;
  num_items_sold: number;
  total_sales: number;
  tax_total: number;
  shipping_total: number;
  net_total: number;
  returning_customer?: number;
  status: string;
  customer_id: number;
}

export interface WpWcOrderTaxLookup {
  order_id: number;
  tax_rate_id: number;
  date_created: Date | string;
  shipping_tax: number;
  order_tax: number;
  total_tax: number;
}

export interface WpWcProductMetaLookup {
  product_id: number;
  sku?: string;
  virtual?: number;
  downloadable?: number;
  min_price?: number;
  max_price?: number;
  onsale?: number;
  stock_quantity?: number;
  stock_status?: string;
  rating_count?: number;
  average_rating?: number;
  total_sales?: number;
  tax_status?: string;
  tax_class?: string;
}

export interface WpWcReservedStock {
  order_id: number;
  product_id: number;
  stock_quantity: number;
  timestamp: Date | string;
  expires: Date | string;
}

export interface WpWcTaxRateClasses {
  tax_rate_class_id: number;
  name: string;
  slug: string;
}

export interface WpWcWebhooks {
  webhook_id: number;
  status: string;
  name: string;
  user_id: number;
  delivery_url: string;
  secret: string;
  topic: string;
  date_created: Date | string;
  date_created_gmt: Date | string;
  date_modified: Date | string;
  date_modified_gmt: Date | string;
  api_version: number;
  failure_count: number;
  pending_delivery: number;
}

export interface WpWcvFeedback {
  id: number;
  rating: number;
  order_id: number;
  vendor_id: number;
  product_id: number;
  customer_id: number;
  rating_title?: string;
  comments?: string;
  postdate: Date | string;
}

export interface WpWcvReportsCache {
  id: number;
  report_key: string;
  report_data: string;
  report_date: Date | string;
  created_at?: Date | string;
}

export interface WpWoocommerceApiKeys {
  key_id: number;
  user_id: number;
  description?: string;
  permissions: string;
  consumer_key: string;
  consumer_secret: string;
  nonces?: string;
  truncated_key: string;
  last_access?: Date | string;
}

export interface WpWoocommerceAttributeTaxonomies {
  attribute_id: number;
  attribute_name: string;
  attribute_label?: string;
  attribute_type: string;
  attribute_orderby: string;
  attribute_public: number;
}

export interface WpWoocommerceDownloadableProductPermissions {
  permission_id: number;
  download_id: string;
  product_id: number;
  order_id: number;
  order_key: string;
  user_email: string;
  user_id?: number;
  downloads_remaining?: string;
  access_granted: Date | string;
  access_expires?: Date | string;
  download_count: number;
}

export interface WpWoocommerceLog {
  log_id: number;
  timestamp: Date | string;
  level: number;
  source: string;
  message: string;
  context?: string;
}

export interface WpWoocommerceOrderItemmeta {
  meta_id: number;
  order_item_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpWoocommerceOrderItems {
  order_item_id: number;
  order_item_name: string;
  order_item_type: string;
  order_id: number;
}

export interface WpWoocommercePaymentTokenmeta {
  meta_id: number;
  payment_token_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpWoocommercePaymentTokens {
  token_id: number;
  gateway_id: string;
  token: string;
  user_id: number;
  type: string;
  is_default: number;
}

export interface WpWoocommerceSessions {
  session_id: number;
  session_key: string;
  session_value: string;
  session_expiry: number;
}

export interface WpWoocommerceShippingZoneLocations {
  location_id: number;
  zone_id: number;
  location_code: string;
  location_type: string;
}

export interface WpWoocommerceShippingZoneMethods {
  zone_id: number;
  instance_id: number;
  method_id: string;
  method_order: number;
  is_enabled: number;
}

export interface WpWoocommerceShippingZones {
  zone_id: number;
  zone_name: string;
  zone_order: number;
}

export interface WpWoocommerceTaxRateLocations {
  location_id: number;
  location_code: string;
  tax_rate_id: number;
  location_type: string;
}

export interface WpWoocommerceTaxRates {
  tax_rate_id: number;
  tax_rate_country: string;
  tax_rate_state: string;
  tax_rate: string;
  tax_rate_name: string;
  tax_rate_priority: number;
  tax_rate_compound: number;
  tax_rate_shipping: number;
  tax_rate_order: number;
  tax_rate_class: string;
}

export interface WpWowMwp {
  id: number;
  title: string;
  param?: string;
}

export interface WpWp125Ads {
  id: number;
  slot: number;
  name: string;
  clicks: number;
  start_date: string;
  end_date: string;
  status: number;
  target: string;
  image_url: string;
  pre_exp_email: number;
}

export interface WpWpaieFileManager {
  file_id: number;
  file_name: string;
  absolute_path: string;
  file_path: string;
  file_type: string;
  file_info: string;
  imported_ids: string;
  upload_time: Date | string;
}

export interface WpWpbdpFees {
  id: number;
  label: string;
  amount: number;
  days: number;
  images: number;
  categories: Buffer;
  extra_data?: Buffer;
  weight: number;
  sticky: number;
  enabled: number;
  tag: string;
  description?: string;
}

export interface WpWpbdpFormFields {
  id: number;
  label: string;
  description?: string;
  field_type: string;
  association: string;
  validators?: string;
  weight: number;
  display_flags?: string;
  field_data?: Buffer;
  shortname: string;
  tag: string;
}

export interface WpWpbdpListingClaims {
  id: number;
  listing_id: number;
  status: string;
  user_id: number;
  user_comment?: string;
  answer?: string;
  payment_id: number;
  created_on: Date | string;
  processed_on?: Date | string;
  data?: Buffer;
}

export interface WpWpbdpListingFees {
  id: number;
  listing_id: number;
  category_id: number;
  expires_on?: Date | string;
  email_sent: number;
  fee_id?: number;
  fee_days: number;
  fee_images: number;
  recurring: number;
  recurring_id?: string;
  recurring_data?: Buffer;
  sticky: number;
}

export interface WpWpbdpListings {
  listing_id: number;
  fee_id?: number;
  fee_price?: number;
  fee_days?: number;
  fee_images?: number;
  expiration_date?: Date | string;
  is_recurring: number;
  is_sticky: number;
  subscription_id?: string;
  subscription_data?: Buffer;
  listing_status: string;
  flags: string;
}

export interface WpWpbdpLogs {
  id: number;
  object_id?: number;
  rel_object_id?: number;
  object_type?: string;
  created_at: Date | string;
  log_type?: string;
  actor?: string;
  message?: string;
  data?: Buffer;
}

export interface WpWpbdpPayments {
  id: number;
  listing_id: number;
  gateway?: string;
  amount: number;
  status: string;
  created_on: Date | string;
  processed_on?: Date | string;
  processed_by: string;
  payerinfo?: Buffer;
  extra_data?: Buffer;
  currency_code: string;
  notes?: Buffer;
  tag?: string;
  parent_id: number;
  payment_key?: string;
  payment_type?: string;
  payment_items?: Buffer;
  data?: Buffer;
  context?: string;
  payer_email?: string;
  payer_first_name?: string;
  payer_last_name?: string;
  payer_data?: Buffer;
  gateway_tx_id?: string;
  created_at: Date | string;
  is_test?: number;
}

export interface WpWpbdpPaymentsItems {
  id: number;
  payment_id: number;
  amount: number;
  item_type: string;
  description: string;
  rel_id_1?: number;
  rel_id_2?: number;
  data?: Buffer;
}

export interface WpWpbdpPlans {
  id: number;
  label: string;
  amount: number;
  days: number;
  images: number;
  sticky: number;
  recurring: number;
  pricing_model: string;
  pricing_details?: Buffer;
  supported_categories: string;
  weight: number;
  enabled: number;
  description?: string;
  extra_data?: Buffer;
  tag: string;
}

export interface WpWpbdpRatings {
  id: number;
  listing_id: number;
  rating: number;
  user_id: number;
  user_name?: string;
  ip_address: string;
  comment?: string;
  created_on: Date | string;
  approved: number;
  user_email?: string;
}

export interface WpWpbdpRegionmeta {
  meta_id: number;
  region_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpWpbdpSubmitState {
  id: string;
  state: Buffer;
  updated_on: Date | string;
}

export interface WpWpbdpXFeaturedLevels {
  id: string;
  name: string;
  weight: number;
  description?: string;
  cost: number;
  form_fields?: Buffer;
  extra_data?: Buffer;
}

export interface WpWpbdpZipcodes {
  zip: string;
  latitude: number;
  longitude: number;
  country: string;
  city?: string;
  state?: string;
}

export interface WpWpbdpZipcodesListings {
  listing_id: number;
  zip?: string;
  latitude?: number;
  longitude?: number;
}

export interface WpWpfmBackup {
  id: number;
  backup_name?: string;
  backup_date?: string;
}

export interface WpWpformsPaymentMeta {
  id: number;
  payment_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpWpformsPayments {
  id: number;
  form_id: number;
  status: string;
  subtotal_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  entry_id: number;
  gateway: string;
  type: string;
  mode: string;
  transaction_id: string;
  customer_id: string;
  subscription_id: string;
  subscription_status: string;
  title: string;
  date_created_gmt: Date | string;
  date_updated_gmt: Date | string;
  is_published: number;
}

export interface WpWpformsTasksMeta {
  id: number;
  action: string;
  data: string;
  date: Date | string;
}

export interface WpWpmailsmtpDebugEvents {
  id: number;
  content?: string;
  initiator?: string;
  event_type: number;
  created_at: Date | string;
}

export interface WpWpmailsmtpTasksMeta {
  id: number;
  action: string;
  data: string;
  date: Date | string;
}

export interface WpWtIewActionHistory {
  id: number;
  template_type: string;
  item_type: string;
  file_name: string;
  created_at: number;
  status: number;
  status_text: string;
  offset: number;
  total: number;
  data: string;
}

export interface WpWtIewMappingTemplate {
  id: number;
  template_type: string;
  item_type: string;
  name: string;
  data: string;
}

export interface WpYoastIndexable {
  id: number;
  permalink?: string;
  permalink_hash?: string;
  object_id?: number;
  object_type: string;
  object_sub_type?: string;
  author_id?: number;
  post_parent?: number;
  title?: string;
  description?: string;
  breadcrumb_title?: string;
  post_status?: string;
  is_public?: number;
  is_protected?: number;
  has_public_posts?: number;
  number_of_pages?: number;
  canonical?: string;
  primary_focus_keyword?: string;
  primary_focus_keyword_score?: number;
  readability_score?: number;
  is_cornerstone?: number;
  is_robots_noindex?: number;
  is_robots_nofollow?: number;
  is_robots_noarchive?: number;
  is_robots_noimageindex?: number;
  is_robots_nosnippet?: number;
  twitter_title?: string;
  twitter_image?: string;
  twitter_description?: string;
  twitter_image_id?: string;
  twitter_image_source?: string;
  open_graph_title?: string;
  open_graph_description?: string;
  open_graph_image?: string;
  open_graph_image_id?: string;
  open_graph_image_source?: string;
  open_graph_image_meta?: string;
  link_count?: number;
  incoming_link_count?: number;
  prominent_words_version?: number;
  created_at?: Date | string;
  updated_at: Date | string;
  blog_id: number;
  language?: string;
  region?: string;
  schema_page_type?: string;
  schema_article_type?: string;
  has_ancestors?: number;
  estimated_reading_time_minutes?: number;
  version?: number;
  object_last_modified?: Date | string;
  object_published_at?: Date | string;
  inclusive_language_score?: number;
}

export interface WpYoastIndexableHierarchy {
  indexable_id: number;
  ancestor_id: number;
  depth?: number;
  blog_id: number;
}

export interface WpYoastMigrations {
  id: number;
  version?: string;
}

export interface WpYoastPrimaryTerm {
  id: number;
  post_id?: number;
  term_id?: number;
  taxonomy: string;
  created_at?: Date | string;
  updated_at: Date | string;
  blog_id: number;
}

export interface WpYoastSeoLinks {
  id: number;
  url: string;
  post_id: number;
  target_post_id: number;
  type: string;
  indexable_id?: number;
  target_indexable_id?: number;
  height?: number;
  width?: number;
  size?: number;
  language?: string;
  region?: string;
}

export interface WpYoastSeoMeta {
  object_id: number;
  internal_link_count?: number;
  incoming_link_count?: number;
}

export interface WpblogCommentmeta {
  meta_id: number;
  comment_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpblogComments {
  comment_ID: number;
  comment_post_ID: number;
  comment_author: string;
  comment_author_email: string;
  comment_author_url: string;
  comment_author_IP: string;
  comment_date: Date | string;
  comment_date_gmt: Date | string;
  comment_content: string;
  comment_karma: number;
  comment_approved: string;
  comment_agent: string;
  comment_type: string;
  comment_parent: number;
  user_id: number;
}

export interface WpblogGksSliders {
  id: number;
  title?: string;
  corder?: string;
  options?: string;
  extoptions?: string;
  css?: string;
}

export interface WpblogGksSlides {
  id: number;
  sid: number;
  title?: string;
  description?: string;
  url?: string;
  cover?: string;
  pics?: string;
  categories?: string;
  cdate: Date | string;
  details?: string;
}

export interface WpblogGmedia {
  ID: number;
  author: number;
  date: Date | string;
  description: string;
  title: string;
  gmuid: string;
  link: string;
  modified: Date | string;
  mime_type: string;
  status: string;
  post_id?: number;
}

export interface WpblogGmediaLog {
  log: string;
  ID: number;
  log_author: number;
  log_date: Date | string;
  log_data?: string;
  ip_address: string;
}

export interface WpblogGmediaMeta {
  meta_id: number;
  gmedia_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpblogGmediaTerm {
  term_id: number;
  name: string;
  taxonomy: string;
  description: string;
  global: number;
  count: number;
  status: string;
}

export interface WpblogGmediaTermMeta {
  meta_id: number;
  gmedia_term_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpblogGmediaTermRelationships {
  gmedia_id: number;
  gmedia_term_id: number;
  term_order: number;
  gmedia_order: number;
}

export interface WpblogLinks {
  link_id: number;
  link_url: string;
  link_name: string;
  link_image: string;
  link_target: string;
  link_description: string;
  link_visible: string;
  link_owner: number;
  link_rating: number;
  link_updated: Date | string;
  link_rel: string;
  link_notes: string;
  link_rss: string;
}

export interface WpblogMailsterActions {
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  count: number;
  type: number;
  link_id: number;
}

export interface WpblogMailsterFormFields {
  form_id: number;
  field_id: string;
  name: string;
  error_msg: string;
  required: number;
  position: number;
}

export interface WpblogMailsterForms {
  ID: number;
  name: string;
  submit: string;
  asterisk?: number;
  userschoice?: number;
  precheck?: number;
  dropdown?: number;
  prefill?: number;
  inline?: number;
  overwrite?: number;
  addlists?: number;
  style?: string;
  custom_style?: string;
  doubleoptin?: number;
  subject?: string;
  headline?: string;
  content?: string;
  link?: string;
  resend?: number;
  resend_count?: number;
  resend_time?: number;
  template: string;
  vcard?: number;
  vcard_content?: string;
  confirmredirect?: string;
  redirect?: string;
  added?: number;
  updated?: number;
}

export interface WpblogMailsterFormsLists {
  form_id: number;
  list_id: number;
  added: number;
}

export interface WpblogMailsterLinks {
  ID: number;
  link: string;
  i: number;
}

export interface WpblogMailsterLists {
  ID: number;
  parent_id: number;
  name: string;
  slug: string;
  description: string;
  added: number;
  updated: number;
}

export interface WpblogMailsterListsSubscribers {
  list_id: number;
  subscriber_id: number;
  added: number;
}

export interface WpblogMailsterQueue {
  subscriber_id: number;
  campaign_id: number;
  requeued: number;
  added: number;
  timestamp: number;
  sent: number;
  priority: number;
  count: number;
  error: number;
  ignore_status: number;
  options: string;
}

export interface WpblogMailsterSubscriberFields {
  subscriber_id: number;
  meta_key: string;
  meta_value: string;
}

export interface WpblogMailsterSubscriberMeta {
  subscriber_id: number;
  campaign_id: number;
  meta_key: string;
  meta_value: string;
}

export interface WpblogMailsterSubscribers {
  ID: number;
  hash: string;
  email: string;
  wp_id: number;
  status: number;
  added: number;
  updated: number;
  signup: number;
  confirm: number;
  ip_signup: string;
  ip_confirm: string;
  rating: number;
}

export interface WpblogNextend2ImageStorage {
  id: number;
  hash: string;
  image: string;
  value: string;
}

export interface WpblogNextend2SectionStorage {
  id: number;
  application: string;
  section: string;
  referencekey: string;
  value: string;
  system: number;
  editable: number;
}

export interface WpblogNextend2Smartslider3Generators {
  id: number;
  group: string;
  type: string;
  params: string;
}

export interface WpblogNextend2Smartslider3Sliders {
  id: number;
  alias?: string;
  title: string;
  type: string;
  params: string;
  time: Date | string;
  thumbnail: string;
  ordering: number;
}

export interface WpblogNextend2Smartslider3SlidersXref {
  group_id: number;
  slider_id: number;
  ordering: number;
}

export interface WpblogNextend2Smartslider3Slides {
  id: number;
  title: string;
  slider: number;
  publish_up: Date | string;
  publish_down: Date | string;
  published: number;
  first: number;
  slide?: string;
  description: string;
  thumbnail: string;
  params: string;
  ordering: number;
  generator_id: number;
}

export interface WpblogOptions {
  option_id: number;
  option_name?: string;
  option_value: string;
  autoload: string;
}

export interface WpblogOrigincodeVideogalleryGalleries {
  id: number;
  name: string;
  sl_height?: number;
  sl_width?: number;
  pause_on_hover?: string;
  videogallery_list_effects_s?: string;
  description?: string;
  param?: string;
  sl_position: string;
  ordering: number;
  published?: string;
  origincode_sl_effects: string;
  display_type?: number;
  content_per_page?: number;
  autoslide?: string;
}

export interface WpblogOrigincodeVideoorigincodeGalleryVideos {
  id: number;
  name?: string;
  videogallery_id?: string;
  description?: string;
  image_url?: string;
  sl_url?: string;
  sl_type: string;
  link_target: string;
  ordering: number;
  published?: number;
  published_in_sl_width?: number;
  thumb_url?: string;
  show_controls?: string;
  show_info?: string;
}

export interface WpblogPostmeta {
  meta_id: number;
  post_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpblogPosts {
  ID: number;
  post_author: number;
  post_date: Date | string;
  post_date_gmt: Date | string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: Date | string;
  post_modified_gmt: Date | string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: number;
}

export interface WpblogPushEncryptionKeys {
  id: number;
  token_id: number;
  user_public_key: string;
  user_auth_token: string;
}

export interface WpblogPushExcludedCategories {
  user_id: number;
  category_id: number;
}

export interface WpblogPushLogs {
  id: number;
  type: number;
  text?: string;
  timestamp: Date | string;
}

export interface WpblogPushNotifications {
  id: number;
  notification?: string;
  hits?: number;
  created_at: Date | string;
}

export interface WpblogPushSent {
  user_id: number;
  post_id: number;
  timestamp: Date | string;
}

export interface WpblogPushSubscribers {
  id: number;
  gcm_regid?: string;
  notifications?: string;
  created_at: Date | string;
}

export interface WpblogPushTokens {
  id: number;
  token?: string;
  os?: string;
  lang?: string;
  timestamp: Date | string;
  user_id?: number;
  active?: number;
  activation_code?: string;
}

export interface WpblogPushViewed {
  user_id: number;
  post_id: number;
  timestamp: Date | string;
}

export interface WpblogResponsiveVideoGalleryPlusResponsiveLightbox {
  id: number;
  vtype: string;
  vid: string;
  video_url?: string;
  embed_url: string;
  HdnMediaSelection: string;
  image_name: string;
  videotitle: string;
  videotitleurl?: string;
  video_description?: string;
  video_order: number;
  open_link_in: number;
  enable_light_box_video_desc: number;
  createdon: Date | string;
  slider_id: number;
}

export interface WpblogRichWebPhotoSliderInstal {
  id: number;
  SL_Img_Title: string;
  Sl_Img_Description: string;
  Sl_Img_Url: string;
  Sl_Link_Url: string;
  Sl_Link_NewTab: string;
  Sl_Number: number;
}

export interface WpblogRichWebPhotoSliderInstalVideo {
  id: number;
  Sl_Video_Url: string;
  Sl_Number: number;
}

export interface WpblogRichWebPhotoSliderManager {
  id: number;
  Slider_Title: string;
  Slider_Type: string;
  Slider_IMGS_Quantity: number;
}

export interface WpblogRichWebSliderEffect4 {
  id: number;
  rich_web_slider_ID: string;
  rich_web_slider_name: string;
  rich_web_slider_type: string;
  Rich_Web_Sl_CT_W: string;
  Rich_Web_Sl_CT_H: string;
  Rich_Web_Sl_CT_BW: string;
  Rich_Web_Sl_CT_BS: string;
  Rich_Web_Sl_CT_BC: string;
  Rich_Web_Sl_CT_BxSShow: string;
  Rich_Web_Sl_CT_BxSType: string;
  Rich_Web_Sl_CT_BxS: string;
  Rich_Web_Sl_CT_BxC: string;
  Rich_Web_Sl_CT_TDABgC: string;
  Rich_Web_Sl_CT_TDAPos: string;
  Rich_Web_Sl_CT_LBgC: string;
  Rich_Web_Sl_CT_TFS: string;
  Rich_Web_Sl_CT_TFF: string;
  Rich_Web_Sl_CT_TCC: string;
  Rich_Web_Sl_CT_TC: string;
  Rich_Web_Sl_CT_ArBgC: string;
  Rich_Web_Sl_CT_ArBR: string;
  Rich_Web_Sl_CT_ArType: string;
  Rich_Web_Sl_CT_ArHBC: string;
  Rich_Web_Sl_CT_ArHBR: string;
  Rich_Web_Sl_CT_ArText: string;
  Rich_Web_Sl_CT_ArLeft: string;
  Rich_Web_Sl_CT_ArRight: string;
  Rich_Web_Sl_CT_ArTextC: string;
  Rich_Web_Sl_CT_ArTextFS: string;
  Rich_Web_Sl_CT_ArTextFF: string;
}

export interface WpblogRichWebSliderEffect9 {
  id: number;
  rich_web_slider_ID: string;
  rich_web_slider_name: string;
  rich_web_slider_type: string;
  Rich_Web_AcSL_W: string;
  Rich_Web_AcSL_H: string;
  Rich_Web_AcSL_BW: string;
  Rich_Web_AcSL_BS: string;
  Rich_Web_AcSL_BC: string;
  Rich_Web_AcSL_BSh: string;
  Rich_Web_AcSL_BShC: string;
  Rich_Web_AcSL_Img_W: string;
  Rich_Web_AcSL_Img_BSh: string;
  Rich_Web_AcSL_Img_BShC: string;
  Rich_Web_AcSL_Title_FS: string;
  Rich_Web_AcSL_Title_FF: string;
  Rich_Web_AcSL_Title_C: string;
  Rich_Web_AcSL_Title_TSh: string;
  Rich_Web_AcSL_Title_TShC: string;
  Rich_Web_AcSL_Title_BgC: string;
  Rich_Web_AcSL_Link_FS: string;
  Rich_Web_AcSL_Link_FF: string;
  Rich_Web_AcSL_Link_C: string;
  Rich_Web_AcSL_Link_TSh: string;
  Rich_Web_AcSL_Link_TShC: string;
  Rich_Web_AcSL_Link_BgC: string;
  Rich_Web_AcSL_Link_Text: string;
}

export interface WpblogRichWebSliderEffectsData {
  id: number;
  slider_name: string;
  slider_type: string;
}

export interface WpblogRichWebSliderFontFamily {
  id: number;
  Font_family: string;
}

export interface WpblogRichWebSliderId {
  id: number;
  Slider_ID: number;
}

export interface WpblogRichWebVideoSliderEffectsData {
  id: number;
  slider_vid_name: string;
  slider_Vid_type: string;
}

export interface WpblogRichWebVideoSliderFontFamily {
  id: number;
  Font_family: string;
}

export interface WpblogRichWebVideoSliderId {
  id: number;
  Slider_ID: number;
}

export interface WpblogRichWebVideoSliderManager {
  id: number;
  Slider_Title: string;
  Slider_Type: string;
  Slider_Video_Quantity: number;
}

export interface WpblogRichWebVideoSliderVideos {
  id: number;
  Rich_Web_VSlider_Vid_Title: string;
  Rich_Web_VSlider_Add_Desc: string;
  Rich_Web_VSldier_Add_Img: string;
  Rich_Web_VSldier_Add_Vid: string;
  Rich_Web_VSldier_Add_Src: string;
  Rich_Web_VSldier_Add_Link: string;
  Rich_Web_VSldier_Add_ONT: string;
  Slider_ID: number;
}

export interface WpblogRichWebVsEffect1 {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSlider_Option_Name: string;
  Rich_Web_VSlider_Option_Type: string;
  Rich_Web_VS_CP_CE: string;
  Rich_Web_VS_CP_EE: string;
  Rich_Web_VS_CP_S: string;
  Rich_Web_VS_CP_BlC: string;
  Rich_Web_VS_CP_BlR: string;
  Rich_Web_VS_CP_AS: string;
  Rich_Web_VS_CP_PT: string;
  Rich_Web_VS_CP_SS: string;
  Rich_Web_VS_CS_AP: string;
  Rich_Web_VS_CS_HP: string;
  Rich_Web_VS_CS_RS: string;
  Rich_Web_VS_CS_BSC: string;
  Rich_Web_VS_CP_BW: string;
  Rich_Web_VS_CP_BS: string;
  Rich_Web_VS_CS_BC: string;
  Rich_Web_VS_CP_BR: string;
  Rich_Web_VS_CS_CN: string;
  Rich_Web_VS_CS_NPB: string;
  Rich_Web_VS_CP_NO: string;
  Rich_Web_VS_CS_NT: string;
  Rich_Web_VS_CP_NT: string;
  Rich_Web_VS_CP_AT: string;
  Rich_Web_VS_CP_CapS: string;
  Rich_Web_VS_CP_CapEs: string;
  Rich_Web_VS_CP_CapO: string;
  Rich_Web_VS_CP_CapE: string;
  Rich_Web_VS_CP_TFS: string;
  Rich_Web_VS_CP_TFF: string;
  Rich_Web_VS_CS_TBgC: string;
  Rich_Web_VS_CS_TC: string;
  Rich_Web_VS_CP_DFS: string;
  Rich_Web_VS_CP_DFF: string;
  Rich_Web_VS_CS_DBgC: string;
  Rich_Web_VS_CS_DC: string;
  Rich_Web_VS_CP_TiT: string;
  Rich_Web_VS_CS_TiBgC: string;
  Rich_Web_VS_CS_TiC: string;
  Rich_Web_VS_CP_TiO: string;
  Rich_Web_VS_CP_TiD: string;
  Rich_Web_VS_CP_TiP: string;
  Rich_Web_VS_CP_TiS: string;
  Rich_Web_VS_CP_TiBS: string;
  Rich_Web_VS_CP_TiBC: string;
  Rich_Web_VS_CP_TiBSt: string;
  Rich_Web_VS_CP_TiPos: string;
  Rich_Web_VS_SL_Width: string;
  Rich_Web_VS_SL_Height: string;
  Rich_Web_VS_TitDesc_Type: string;
}

export interface WpblogRichWebVsEffect10 {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSlider_Option_Name: string;
  Rich_Web_VSlider_Option_Type: string;
  Rich_Web_GO_NS1_Width: string;
  Rich_Web_GO_NS1_Height: string;
  Rich_Web_GO_NS1_Autoplay: string;
  Rich_Web_GO_NS1_PTime: string;
  Rich_Web_GO_NS1_BW: string;
  Rich_Web_GO_NS1_BType: string;
  Rich_Web_GO_NS1_BC: string;
  Rich_Web_GO_NS1_BSh: string;
  Rich_Web_GO_NS1_BSh_Type: string;
  Rich_Web_GO_NS1_BSh_Col: string;
  Rich_Web_TO_NS1_Show: string;
  Rich_Web_TO_NS1_FSize: string;
  Rich_Web_TO_NS1_FFamily: string;
  Rich_Web_TO_NS1_Col: string;
  Rich_Web_TO_NS1_Num_Show: string;
  Rich_Web_TO_NS1_Num_FSize: string;
  Rich_Web_TO_NS1_Num_FFamily: string;
  Rich_Web_TO_NS1_Num_Col: string;
  Rich_Web_PO_NS1_Show: string;
  Rich_Web_PO_NS1_Width: string;
  Rich_Web_PO_NS1_Height: string;
  Rich_Web_PO_NS1_PB: string;
  Rich_Web_PO_NS1_Col: string;
  Rich_Web_PO_NS1_Cur_Col: string;
  Rich_Web_IO_NS1_FSize: string;
  Rich_Web_IO_NS1_Col: string;
  Rich_Web_PO_NS1_Hov_Col: string;
  Rich_Web_IO_NS1_Cur_Col: string;
  Rich_Web_IO_NS1_BgCol: string;
  Rich_Web_IO_NS1_Icon_Type: string;
  Rich_Web_DO_NS1_Show: string;
  Rich_Web_DO_NS1_FSize: string;
  Rich_Web_DO_NS1_FFamily: string;
  Rich_Web_DO_NS1_Col: string;
  Rich_Web_PIO_NS1_BgCol: string;
  Rich_Web_PIO_NS1_Col: string;
  Rich_Web_PIO_NS1_HovBgCol: string;
  Rich_Web_PIO_NS1_HovCol: string;
  Rich_Web_IO_NS1_Show: string;
  Rich_Web_IO_NS1_HovBgCol: string;
  Rich_Web_IO_NS1_Arrow_Type: string;
  Rich_Web_IO_NS1_Width: string;
  Rich_Web_IO_NS1_Height: string;
  Rich_Web_IO_NS1_Image_Type: string;
  Rich_Web_GO_NS1_Align: string;
}

export interface WpblogRichWebVsEffect10Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_ASSl_L_Show: string;
  Rich_Web_ASSl_LT_Show: string;
  Rich_Web_ASSl_LT: string;
  Rich_Web_ASSl_L_BgC: string;
  Rich_Web_ASSl_L_T: string;
  Rich_Web_ASSl_LT_T: string;
  Rich_Web_ASSl_LT_FS: string;
  Rich_Web_ASSl_LT_FF: string;
  Rich_Web_ASSl_LT_C: string;
  Rich_Web_ASSl_L_T1_C: string;
  Rich_Web_ASSl_L_T2_C: string;
  Rich_Web_ASSl_L_T3_C: string;
  Rich_Web_ASSl_LT_T2_BC: string;
  Rich_Web_ASSl_L_C: string;
  Rich_Web_ASSl_LT_T2_AnC: string;
  Rich_Web_ASSl_LT_T3_BgC: string;
  Rich_Web_ASSl_L_S: string;
  Rich_Web_ASSl_Loading_Show: string;
}

export interface WpblogRichWebVsEffect1Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VS_ContSl_L_Show: string;
  Rich_Web_VS_ContSl_LT_Show: string;
  Rich_Web_VS_ContSl_LT: string;
  Rich_Web_VS_ContSl_L_BgC: string;
  Rich_Web_VS_ContSl_L_T: string;
  Rich_Web_VS_ContSl_LT_T: string;
  Rich_Web_VS_ContSl_LT_FS: string;
  Rich_Web_VS_ContSl_LT_FF: string;
  Rich_Web_VS_ContSl_LT_C: string;
  Rich_Web_VS_ContSl_L_T1_C: string;
  Rich_Web_VS_ContSl_L_T2_C: string;
  Rich_Web_VS_ContSl_L_T3_C: string;
  Rich_Web_VS_ContSl_LT_T2_BC: string;
  Rich_Web_VS_ContSl_L_C: string;
  Rich_Web_VS_ContSl_LT_T2_AnC: string;
  Rich_Web_VS_ContSl_LT_T3_BgC: string;
  Rich_Web_VS_ContSl_L_S: string;
  Rich_Web_VS_ContSl_Loading_Show: string;
}

export interface WpblogRichWebVsEffect2 {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSlider_Option_Name: string;
  Rich_Web_VSlider_Option_Type: string;
  Rich_Web_VS_SS_ED: string;
  Rich_Web_VS_SS_PT: string;
  Rich_Web_VS_SS_AP: string;
  Rich_Web_VS_SS_Eff: string;
  Rich_Web_VS_SS_W: string;
  Rich_Web_VS_SS_H: string;
  Rich_Web_VS_SS_BW: string;
  Rich_Web_VS_SS_BS: string;
  Rich_Web_VS_SS_BC: string;
  Rich_Web_VS_SS_TShow: string;
  Rich_Web_VS_SS_TFS: string;
  Rich_Web_VS_SS_TFF: string;
  Rich_Web_VS_SS_TC: string;
  Rich_Web_VS_SS_TBgC: string;
  Rich_Web_VS_SS_TPos: string;
  Rich_Web_VS_SS_NShow: string;
  Rich_Web_VS_SS_NC: string;
  Rich_Web_VS_SS_NBgC: string;
  Rich_Web_VS_SS_NS: string;
  Rich_Web_VS_SS_NPos: string;
  Rich_Web_VS_SS_PagShow: string;
  Rich_Web_VS_SS_PagW: string;
  Rich_Web_VS_SS_PagH: string;
  Rich_Web_VS_SS_PagPB: string;
  Rich_Web_VS_SS_PagBgC: string;
  Rich_Web_VS_SS_PagBW: string;
  Rich_Web_VS_SS_PagBS: string;
  Rich_Web_VS_SS_PagBC: string;
  Rich_Web_VS_SS_PagBR: string;
  Rich_Web_VS_SS_PagHC: string;
  Rich_Web_VS_SS_PagCC: string;
  Rich_Web_VS_SS_PagPos: string;
  Rich_Web_VS_SS_PIBgC: string;
  Rich_Web_VS_SS_PIC: string;
  Rich_Web_VS_SS_PIHBgC: string;
  Rich_Web_VS_SS_PIHC: string;
  Rich_Web_VS_SS_CIBgC: string;
  Rich_Web_VS_SS_CIC: string;
  Rich_Web_VS_SS_CIHBgC: string;
  Rich_Web_VS_SS_CIHC: string;
}

export interface WpblogRichWebVsEffect2Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_SlickSl_L_Show: string;
  Rich_Web_SlickSl_LT_Show: string;
  Rich_Web_SlickSl_LT: string;
  Rich_Web_SlickSl_L_BgC: string;
  Rich_Web_SlickSl_L_T: string;
  Rich_Web_SlickSl_LT_T: string;
  Rich_Web_SlickSl_LT_FS: string;
  Rich_Web_SlickSl_LT_FF: string;
  Rich_Web_SlickSl_LT_C: string;
  Rich_Web_SlickSl_L_T1_C: string;
  Rich_Web_SlickSl_L_T2_C: string;
  Rich_Web_SlickSl_L_T3_C: string;
  Rich_Web_SlickSl_LT_T2_BC: string;
  Rich_Web_SlickSl_L_C: string;
  Rich_Web_SlickSl_LT_T2_AnC: string;
  Rich_Web_SlickSl_LT_T3_BgC: string;
  Rich_Web_SlickSl_L_S: string;
  Rich_Web_SlickSl_Loading_Show: string;
}

export interface WpblogRichWebVsEffect3 {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSlider_Option_Name: string;
  Rich_Web_VSlider_Option_Type: string;
  Rich_Web_VS_TS_W: string;
  Rich_Web_VS_TS_H: string;
  Rich_Web_VS_TS_BW: string;
  Rich_Web_VS_TS_BS: string;
  Rich_Web_VS_TS_BC: string;
  Rich_Web_VS_TS_BoxShShow: string;
  Rich_Web_VS_TS_BoxShType: string;
  Rich_Web_VS_TS_BoxSh: string;
  Rich_Web_VS_TS_BoxShC: string;
  Rich_Web_VS_TS_IBgC: string;
  Rich_Web_VS_TS_IBW: string;
  Rich_Web_VS_TS_IBS: string;
  Rich_Web_VS_TS_IBC: string;
  Rich_Web_VS_TS_IBR: string;
  Rich_Web_VS_TS_TPos: string;
  Rich_Web_VS_TS_TBgC: string;
  Rich_Web_VS_TS_TBW: string;
  Rich_Web_VS_TS_TBS: string;
  Rich_Web_VS_TS_TBC: string;
  Rich_Web_VS_TS_TIH: string;
  Rich_Web_VS_TS_TIPB: string;
  Rich_Web_VS_TS_TIBW: string;
  Rich_Web_VS_TS_TIBS: string;
  Rich_Web_VS_TS_TIBC: string;
  Rich_Web_VS_TS_TIBR: string;
  Rich_Web_VS_TS_TIBoxShShow: string;
  Rich_Web_VS_TS_TIBoxShType: string;
  Rich_Web_VS_TS_TIBoxSh: string;
  Rich_Web_VS_TS_TIBoxShC: string;
  Rich_Web_VS_TS_TICBC: string;
  Rich_Web_VS_TS_TICBS: string;
  Rich_Web_VS_TS_TICBoxShC: string;
  Rich_Web_VS_TS_TIHBC: string;
  Rich_Web_VS_TS_TIHBS: string;
  Rich_Web_VS_TS_TIHBoxShC: string;
  Rich_Web_VS_TS_CS: string;
  Rich_Web_VS_TS_PT: string;
  Rich_Web_VS_TS_AP: string;
  Rich_Web_VS_TS_PIBgC: string;
  Rich_Web_VS_TS_PIC: string;
  Rich_Web_VS_TS_PIHBgC: string;
  Rich_Web_VS_TS_PIHC: string;
}

export interface WpblogRichWebVsEffect3Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_ThumbSl_L_Show: string;
  Rich_Web_ThumbSl_LT_Show: string;
  Rich_Web_ThumbSl_LT: string;
  Rich_Web_ThumbSl_L_BgC: string;
  Rich_Web_ThumbSl_L_T: string;
  Rich_Web_ThumbSl_LT_T: string;
  Rich_Web_ThumbSl_LT_FS: string;
  Rich_Web_ThumbSl_LT_FF: string;
  Rich_Web_ThumbSl_LT_C: string;
  Rich_Web_ThumbSl_L_T1_C: string;
  Rich_Web_ThumbSl_L_T2_C: string;
  Rich_Web_ThumbSl_L_T3_C: string;
  Rich_Web_ThumbSl_LT_T2_BC: string;
  Rich_Web_ThumbSl_L_C: string;
  Rich_Web_ThumbSl_LT_T2_AnC: string;
  Rich_Web_ThumbSl_LT_T3_BgC: string;
  Rich_Web_ThumbSl_L_S: string;
  Rich_Web_ThumbSl_Loading_Show: string;
}

export interface WpblogRichWebVsEffect4 {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSlider_Option_Name: string;
  Rich_Web_VSlider_Option_Type: string;
  Rich_Web_VC_Car_Bg_Color: string;
  Rich_Web_VC_Car_Border_Width: string;
  Rich_Web_VC_Car_Border_Style: string;
  Rich_Web_VC_Car_Border_Color: string;
  Rich_Web_VC_Car_Box_Shadow: string;
  Rich_Web_VC_Car_Shadow_Color: string;
  Rich_Web_VC_Car_Count_Imgs: string;
  Rich_Web_VC_Car_Imgs_Hover_Type: string;
  Rich_Web_VC_Car_PBImgs: string;
  Rich_Web_VC_Car_Icons_Type: string;
  Rich_Web_VC_Car_Icons_Size: string;
  Rich_Web_VC_Overlay_Bg_Color: string;
  Rich_Web_VC_Popup_Bg_Color: string;
  Rich_Web_VC_Popup_Border_Width: string;
  Rich_Web_VC_Popup_Border_Style: string;
  Rich_Web_VC_Popup_Border_Color: string;
  Rich_Web_VC_Popup_Box_Shadow: string;
  Rich_Web_VC_Popup_Shadow_Color: string;
  Rich_Web_VC_Title_Font_Size: string;
  Rich_Web_VC_Title_Font_Family: string;
  Rich_Web_VC_Title_Color: string;
  Rich_Web_VC_Title_Text_Align: string;
  Rich_Web_VC_Desc_Bg_Color: string;
  Rich_Web_VC_Desc_Font_Size: string;
  Rich_Web_VC_Desc_Font_Family: string;
  Rich_Web_VC_Desc_Color: string;
  Rich_Web_VC_Desc_Text_Align: string;
  Rich_Web_VC_Link_Font_Size: string;
  Rich_Web_VC_Link_Font_Family: string;
  Rich_Web_VC_Link_Color: string;
  Rich_Web_VC_Link_Bg_Color: string;
  Rich_Web_VC_Link_Border_Color: string;
  Rich_Web_VC_Link_Border_Width: string;
  Rich_Web_VC_Link_Border_Style: string;
  Rich_Web_VC_Link_Hov_Bg_Color: string;
  Rich_Web_VC_Link_Hov_Color: string;
  Rich_Web_VC_Link_Hov_Border_Color: string;
  Rich_Web_VC_Popup_Icons_Size: string;
  Rich_Web_VC_Popup_Icons_Color: string;
  Rich_Web_VC_Popup_Icons_Type: string;
  Rich_Web_VC_Link_Text: string;
  Rich_Web_VC_Link_Border_Radius: string;
}

export interface WpblogRichWebVsEffect4Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VCCP_L_Show: string;
  Rich_Web_VCCP_LT_Show: string;
  Rich_Web_VCCP_LT: string;
  Rich_Web_VCCP_L_BgC: string;
  Rich_Web_VCCP_L_T: string;
  Rich_Web_VCCP_LT_T: string;
  Rich_Web_VCCP_LT_FS: string;
  Rich_Web_VCCP_LT_FF: string;
  Rich_Web_VCCP_LT_C: string;
  Rich_Web_VCCP_L_T1_C: string;
  Rich_Web_VCCP_L_T2_C: string;
  Rich_Web_VCCP_L_T3_C: string;
  Rich_Web_VCCP_LT_T2_BC: string;
  Rich_Web_VCCP_L_C: string;
  Rich_Web_VCCP_LT_T2_AnC: string;
  Rich_Web_VCCP_LT_T3_BgC: string;
  Rich_Web_VCCP_L_S: string;
  Rich_Web_VCCP_Loading_Show: string;
}

export interface WpblogRichWebVsEffect5 {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSlider_Option_Name: string;
  Rich_Web_VSlider_Option_Type: string;
  Rich_Web_SVS_W: string;
  Rich_Web_SVS_PT: string;
  Rich_Web_SVS_CS: string;
  Rich_Web_SVS_BW: string;
  Rich_Web_SVS_BS: string;
  Rich_Web_SVS_BC: string;
  Rich_Web_SVS_BoxShShow: string;
  Rich_Web_SVS_BoxShType: string;
  Rich_Web_SVS_BoxSh: string;
  Rich_Web_SVS_BoxShC: string;
  Rich_Web_SVS_Nav_Show: string;
  Rich_Web_SVS_Nav_W: string;
  Rich_Web_SVS_Nav_H: string;
  Rich_Web_SVS_Nav_BW: string;
  Rich_Web_SVS_Nav_BS: string;
  Rich_Web_SVS_Nav_BC: string;
  Rich_Web_SVS_Nav_BR: string;
  Rich_Web_SVS_Nav_PB: string;
  Rich_Web_SVS_Nav_C: string;
  Rich_Web_SVS_Nav_CC: string;
  Rich_Web_SVS_Nav_HC: string;
  Rich_Web_SVS_Nav_Pos: string;
  Rich_Web_SVS_T_Show: string;
  Rich_Web_SVS_TBgC: string;
  Rich_Web_SVS_TC: string;
  Rich_Web_SVS_TFS: string;
  Rich_Web_SVS_TFF: string;
  Rich_Web_SVS_D_Show: string;
  Rich_Web_SVS_DC: string;
  Rich_Web_SVS_DFS: string;
  Rich_Web_SVS_DFF: string;
  Rich_Web_SVS_LC: string;
  Rich_Web_SVS_LFS: string;
  Rich_Web_SVS_LFF: string;
  Rich_Web_SVS_LHC: string;
  Rich_Web_SVS_Arr_Show: string;
  Rich_Web_SVS_Arr_Type: string;
  Rich_Web_SVS_Arr_S: string;
  Rich_Web_SVS_Arr_C: string;
  Rich_Web_SVS_Arr_BgC: string;
  Rich_Web_SVS_Arr_BW: string;
  Rich_Web_SVS_Arr_BS: string;
  Rich_Web_SVS_Arr_BC: string;
  Rich_Web_SVS_Arr_BR: string;
  Rich_Web_SVS_PIC: string;
  Rich_Web_SVS_PIBgC: string;
  Rich_Web_SVS_PIBR: string;
  Rich_Web_SVS_PIHC: string;
  Rich_Web_SVS_PIHBgC: string;
  Rich_Web_SVS_Eff: string;
  Rich_Web_SVS_LText: string;
  Rich_Web_SVS_AP: string;
}

export interface WpblogRichWebVsEffect5Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_SimpleVS_L_Show: string;
  Rich_Web_SimpleVS_LT_Show: string;
  Rich_Web_SimpleVS_LT: string;
  Rich_Web_SimpleVS_L_BgC: string;
  Rich_Web_SimpleVS_L_T: string;
  Rich_Web_SimpleVS_LT_T: string;
  Rich_Web_SimpleVS_LT_FS: string;
  Rich_Web_SimpleVS_LT_FF: string;
  Rich_Web_SimpleVS_LT_C: string;
  Rich_Web_SimpleVS_L_T1_C: string;
  Rich_Web_SimpleVS_L_T2_C: string;
  Rich_Web_SimpleVS_L_T3_C: string;
  Rich_Web_SimpleVS_LT_T2_BC: string;
  Rich_Web_SimpleVS_L_C: string;
  Rich_Web_SimpleVS_LT_T2_AnC: string;
  Rich_Web_SimpleVS_LT_T3_BgC: string;
  Rich_Web_SimpleVS_L_S: string;
  Rich_Web_SimpleVS_Loading_Show: string;
}

export interface WpblogRichWebVsEffect6 {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSlider_Option_Name: string;
  Rich_Web_VSlider_Option_Type: string;
  Rich_Web_VTVS_AP: string;
  Rich_Web_VTVS_APS: string;
  Rich_Web_VTVS_APEff: string;
  Rich_Web_VTVS_CS: string;
  Rich_Web_VTVS_PT: string;
  Rich_Web_VTVS_ArrSt: string;
  Rich_Web_VTVS_BgC: string;
  Rich_Web_VTVS_H: string;
  Rich_Web_VTVS_BW: string;
  Rich_Web_VTVS_BS: string;
  Rich_Web_VTVS_BC: string;
  Rich_Web_VTVS_BoxShShow: string;
  Rich_Web_VTVS_BoxShType: string;
  Rich_Web_VTVS_BoxSh: string;
  Rich_Web_VTVS_BoxShC: string;
  Rich_Web_VTVS_TShow: string;
  Rich_Web_VTVS_TFS: string;
  Rich_Web_VTVS_TFF: string;
  Rich_Web_VTVS_TC: string;
  Rich_Web_VTVS_TBgC: string;
  Rich_Web_VTVS_TPos: string;
  Rich_Web_VTVS_Th_BW: string;
  Rich_Web_VTVS_Th_BS: string;
  Rich_Web_VTVS_Th_BC: string;
  Rich_Web_VTVS_Th_BR: string;
  Rich_Web_VTVS_Th_HBC: string;
  Rich_Web_VTVS_LC: string;
  Rich_Web_VTVS_LBgC: string;
  Rich_Web_VTVS_LFS: string;
  Rich_Web_VTVS_LHC: string;
  Rich_Web_VTVS_LHBgC: string;
  Rich_Web_VTVS_LPos: string;
  Rich_Web_VTVS_LType: string;
  Rich_Web_VTVS_PC: string;
  Rich_Web_VTVS_PBgC: string;
  Rich_Web_VTVS_PFS: string;
  Rich_Web_VTVS_PHC: string;
  Rich_Web_VTVS_PHBgC: string;
  Rich_Web_VTVS_PPos: string;
  Rich_Web_VTVS_PType: string;
  Rich_Web_VTVS_ArrShow: string;
  Rich_Web_VTVS_ArrType: string;
  Rich_Web_VTVS_ArrFS: string;
  Rich_Web_VTVS_ArrPos: string;
  Rich_Web_VTVS_ArrC: string;
}

export interface WpblogRichWebVsEffect6Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSVT_L_Show: string;
  Rich_Web_VSVT_LT_Show: string;
  Rich_Web_VSVT_LT: string;
  Rich_Web_VSVT_L_BgC: string;
  Rich_Web_VSVT_L_T: string;
  Rich_Web_VSVT_LT_T: string;
  Rich_Web_VSVT_LT_FS: string;
  Rich_Web_VSVT_LT_FF: string;
  Rich_Web_VSVT_LT_C: string;
  Rich_Web_VSVT_L_T1_C: string;
  Rich_Web_VSVT_L_T2_C: string;
  Rich_Web_VSVT_L_T3_C: string;
  Rich_Web_VSVT_LT_T2_BC: string;
  Rich_Web_VSVT_L_C: string;
  Rich_Web_VSVT_LT_T2_AnC: string;
  Rich_Web_VSVT_LT_T3_BgC: string;
  Rich_Web_VSVT_L_S: string;
  Rich_Web_VSVT_Loading_Show: string;
}

export interface WpblogRichWebVsEffect7 {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSlider_Option_Name: string;
  Rich_Web_VSlider_Option_Type: string;
  Rich_Web_VS_HPS_Loop: string;
  Rich_Web_VS_HPS_Cols: string;
  Rich_Web_VS_HPS_Speed: string;
  Rich_Web_VS_HPS_AP: string;
  Rich_Web_VS_HPS_EH: string;
  Rich_Web_VS_HPS_PB: string;
  Rich_Web_VS_HPS_Car: string;
  Rich_Web_VS_HPS_NP_Show: string;
  Rich_Web_VS_HPS_NP_NText: string;
  Rich_Web_VS_HPS_NP_PText: string;
  Rich_Web_VS_HPS_NP_C: string;
  Rich_Web_VS_HPS_NP_BgC: string;
  Rich_Web_VS_HPS_NP_FS: string;
  Rich_Web_VS_HPS_NP_FF: string;
  Rich_Web_VS_HPS_NP_BW: string;
  Rich_Web_VS_HPS_NP_BS: string;
  Rich_Web_VS_HPS_NP_BC: string;
  Rich_Web_VS_HPS_NP_BR: string;
  Rich_Web_VS_HPS_NP_HC: string;
  Rich_Web_VS_HPS_NP_HBgC: string;
  Rich_Web_VS_HPS_Cols_BgC: string;
  Rich_Web_VS_HPS_Cols_BoxShC: string;
  Rich_Web_VS_HPS_Cols_VSEff: string;
  Rich_Web_VS_HPS_Cols_StShC: string;
  Rich_Web_VS_HPS_Cols_VHEff: string;
  Rich_Web_VS_HPS_Cols_HShC: string;
  Rich_Web_VS_HPS_TC: string;
  Rich_Web_VS_HPS_TFS: string;
  Rich_Web_VS_HPS_TFF: string;
  Rich_Web_VS_HPS_DShow: string;
  Rich_Web_VS_HPS_DC: string;
  Rich_Web_VS_HPS_DFS: string;
  Rich_Web_VS_HPS_DFF: string;
  Rich_Web_VS_HPS_LText: string;
  Rich_Web_VS_HPS_LC: string;
  Rich_Web_VS_HPS_LFS: string;
  Rich_Web_VS_HPS_LFF: string;
  Rich_Web_VS_HPS_LHC: string;
  Rich_Web_VS_HPS_PText: string;
  Rich_Web_VS_HPS_PBgC: string;
  Rich_Web_VS_HPS_PC: string;
  Rich_Web_VS_HPS_PFS: string;
  Rich_Web_VS_HPS_PFF: string;
  Rich_Web_VS_HPS_PHC: string;
  Rich_Web_VS_HPS_PHBgC: string;
  Rich_Web_VS_HPS_Pop_OvC: string;
  Rich_Web_VS_HPS_Pop_BW: string;
  Rich_Web_VS_HPS_Pop_BS: string;
  Rich_Web_VS_HPS_Pop_BC: string;
  Rich_Web_VS_HPS_Pop_BoxShShow: string;
  Rich_Web_VS_HPS_Pop_BoxShType: string;
  Rich_Web_VS_HPS_Pop_BoxSh: string;
  Rich_Web_VS_HPS_Pop_BoxShC: string;
  Rich_Web_VS_HPS_Pop_CIType: string;
  Rich_Web_VS_HPS_Pop_CIS: string;
  Rich_Web_VS_HPS_Pop_CIC: string;
}

export interface WpblogRichWebVsEffect7Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_HSL_L_Show: string;
  Rich_Web_HSL_LT_Show: string;
  Rich_Web_HSL_LT: string;
  Rich_Web_HSL_L_BgC: string;
  Rich_Web_HSL_L_T: string;
  Rich_Web_HSL_LT_T: string;
  Rich_Web_HSL_LT_FS: string;
  Rich_Web_HSL_LT_FF: string;
  Rich_Web_HSL_LT_C: string;
  Rich_Web_HSL_L_T1_C: string;
  Rich_Web_HSL_L_T2_C: string;
  Rich_Web_HSL_L_T3_C: string;
  Rich_Web_HSL_LT_T2_BC: string;
  Rich_Web_HSL_L_C: string;
  Rich_Web_HSL_LT_T2_AnC: string;
  Rich_Web_HSL_LT_T3_BgC: string;
  Rich_Web_HSL_L_S: string;
  Rich_Web_HSL_Loading_Show: string;
}

export interface WpblogRichWebVsEffect8 {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSlider_Option_Name: string;
  Rich_Web_VSlider_Option_Type: string;
  Rich_Web_RVVS_Sh: string;
  Rich_Web_RVVS_ShT: string;
  Rich_Web_RVVS_ShC: string;
  Rich_Web_RVVS_NI_BW: string;
  Rich_Web_RVVS_NI_BC: string;
  Rich_Web_RVVS_NI_BgC: string;
  Rich_Web_RVVS_NI_HBgC: string;
  Rich_Web_RVVS_NI_HBC: string;
  Rich_Web_RVVS_NI_CBgC: string;
  Rich_Web_RVVS_NI_CBC: string;
  Rich_Web_RVVS_NT_FF: string;
  Rich_Web_RVVS_NT_C: string;
  Rich_Web_RVVS_ND_FF: string;
  Rich_Web_RVVS_ND_C: string;
  Rich_Web_RVVS_NImg_BW: string;
  Rich_Web_RVVS_NImg_BR: string;
  Rich_Web_RVVS_NImg_BSh: string;
  Rich_Web_RVVS_NImg_ShC: string;
  Rich_Web_RVVS_NImg_ShT: string;
  Rich_Web_RVVS_NScroll_BgC: string;
  Rich_Web_RVVS_NScroll_HBgC: string;
  Rich_Web_RVVS_NScroll_C: string;
  Rich_Web_RVVS_IT_FF: string;
  Rich_Web_RVVS_IT_C: string;
  Rich_Web_RVVS_ID_FF: string;
  Rich_Web_RVVS_ID_C: string;
  Rich_Web_RVVS_PlIc_FS: string;
  Rich_Web_RVVS_PlIc_C: string;
  Rich_Web_RVVS_PlIc_BgC: string;
  Rich_Web_RVVS_PlIc_HBgC: string;
  Rich_Web_RVVS_DelIc_C: string;
  Rich_Web_RVVS_DelIc_T: string;
  Rich_Web_RVVS_DelIc_FS: string;
  Rich_Web_RVVS_DelIc_BgC: string;
  Rich_Web_RVVS_DelIc_HBgC: string;
  Rich_Web_RVVS_NT_FS: string;
  Rich_Web_RVVS_ND_FS: string;
  Rich_Web_RVVS_IT_FS: string;
  Rich_Web_RVVS_ID_FS: string;
  Rich_Web_RVVS_NT_HC: string;
  Rich_Web_RVVS_NT_CC: string;
  Rich_Web_RVVS_ND_HC: string;
  Rich_Web_RVVS_ND_CC: string;
}

export interface WpblogRichWebVsEffect8Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_RichSl_L_Show: string;
  Rich_Web_RichSl_LT_Show: string;
  Rich_Web_RichSl_LT: string;
  Rich_Web_RichSl_L_BgC: string;
  Rich_Web_RichSl_L_T: string;
  Rich_Web_RichSl_LT_T: string;
  Rich_Web_RichSl_LT_FS: string;
  Rich_Web_RichSl_LT_FF: string;
  Rich_Web_RichSl_LT_C: string;
  Rich_Web_RichSl_L_T1_C: string;
  Rich_Web_RichSl_L_T2_C: string;
  Rich_Web_RichSl_L_T3_C: string;
  Rich_Web_RichSl_LT_T2_BC: string;
  Rich_Web_RichSl_L_C: string;
  Rich_Web_RichSl_LT_T2_AnC: string;
  Rich_Web_RichSl_LT_T3_BgC: string;
  Rich_Web_RichSl_L_S: string;
  Rich_Web_RichSl_Loading_Show: string;
}

export interface WpblogRichWebVsEffect9 {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSlider_Option_Name: string;
  Rich_Web_VSlider_Option_Type: string;
  Rich_Web_MS_W: string;
  Rich_Web_MS_SSh: string;
  Rich_Web_MS_SShChT: string;
  Rich_Web_MS_BSh: string;
  Rich_Web_MS_ShC: string;
  Rich_Web_MS_ShT: string;
  Rich_Web_MS_BgC: string;
  Rich_Web_MS_Type: string;
  Rich_Web_MS_Autoplay: string;
  Rich_Web_MS_N_BW: string;
  Rich_Web_MS_N_BS: string;
  Rich_Web_MS_N_BC: string;
  Rich_Web_MS_NI_FS: string;
  Rich_Web_MS_NI_FF: string;
  Rich_Web_MS_NI_C: string;
  Rich_Web_MS_NI_HC: string;
  Rich_Web_MS_NI_CC: string;
  Rich_Web_MS_NIC_C: string;
  Rich_Web_MS_Img_BW: string;
  Rich_Web_MS_Img_BS: string;
  Rich_Web_MS_Img_BC: string;
  Rich_Web_MS_Img_BSh: string;
  Rich_Web_MS_Img_ShC: string;
  Rich_Web_MS_Img_ShT: string;
  Rich_Web_MS_T_FS: string;
  Rich_Web_MS_T_FF: string;
  Rich_Web_MS_T_C: string;
  Rich_Web_MS_T_TA: string;
  Rich_Web_MS_T_TSh: string;
  Rich_Web_MS_T_TShC: string;
  Rich_Web_MS_D_FS: string;
  Rich_Web_MS_D_FF: string;
  Rich_Web_MS_D_C: string;
  Rich_Web_MS_D_TA: string;
  Rich_Web_MS_D_TSh: string;
  Rich_Web_MS_D_TShC: string;
  Rich_Web_MS_Ic_T: string;
  Rich_Web_MS_Ic_S: string;
  Rich_Web_MS_Ic_C: string;
  Rich_Web_MS_startAt: string;
  Rich_Web_MS_Sl1EfT: string;
  Rich_Web_MS_NI_CCC: string;
  Rich_Web_MS_PlIc_T: string;
  Rich_Web_MS_PlIc_S: string;
  Rich_Web_MS_PlIc_BgC: string;
  Rich_Web_MS_PlIc_C: string;
  Rich_Web_MS_PlIc_HBgC: string;
  Rich_Web_MS_PlIc_HC: string;
}

export interface WpblogRichWebVsEffect9Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_TSL_L_Show: string;
  Rich_Web_TSL_LT_Show: string;
  Rich_Web_TSL_LT: string;
  Rich_Web_TSL_L_BgC: string;
  Rich_Web_TSL_L_T: string;
  Rich_Web_TSL_LT_T: string;
  Rich_Web_TSL_LT_FS: string;
  Rich_Web_TSL_LT_FF: string;
  Rich_Web_TSL_LT_C: string;
  Rich_Web_TSL_L_T1_C: string;
  Rich_Web_TSL_L_T2_C: string;
  Rich_Web_TSL_L_T3_C: string;
  Rich_Web_TSL_LT_T2_BC: string;
  Rich_Web_TSL_L_C: string;
  Rich_Web_TSL_LT_T2_AnC: string;
  Rich_Web_TSL_LT_T3_BgC: string;
  Rich_Web_TSL_L_S: string;
  Rich_Web_TSL_Loading_Show: string;
}

export interface WpblogSibModelForms {
  id: number;
  title?: string;
  html?: string;
  css?: string;
  dependTheme: number;
  listID?: string;
  templateID: number;
  confirmID: number;
  isDopt: number;
  isOpt: number;
  redirectInEmail?: string;
  redirectInForm?: string;
  successMsg?: string;
  errorMsg?: string;
  existMsg?: string;
  invalidMsg?: string;
  requiredMsg?: string;
  attributes?: string;
  date: Date | string;
  isDefault: number;
  gCaptcha: number;
  gCaptcha_secret?: string;
  gCaptcha_site?: string;
  termAccept: number;
  termsURL?: string;
}

export interface WpblogSibModelUsers {
  id: number;
  email?: string;
  code?: string;
  listIDs?: string;
  redirectUrl?: string;
  info?: string;
  frmid?: number;
  user_added_date: Date | string;
}

export interface WpblogTermRelationships {
  object_id: number;
  term_taxonomy_id: number;
  term_order: number;
}

export interface WpblogTermTaxonomy {
  term_taxonomy_id: number;
  term_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
}

export interface WpblogTermmeta {
  meta_id: number;
  term_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpblogTerms {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
}

export interface WpblogTotalsoftGalleryvDbt {
  id: number;
  TotalSoftGalleryV_SetName: string;
  TotalSoftGalleryV_SetType: string;
}

export interface WpblogTotalsoftGalleryvId {
  id: number;
  GalleryV_ID: string;
}

export interface WpblogTotalsoftGalleryvManager {
  id: number;
  TotalSoftGallery_Video_Gallery_Title: string;
  TotalSoftGallery_Video_Option: string;
  TotalSoftGallery_Video_ShowType: string;
  TotalSoftGallery_Video_PerPage: string;
  TotalSoftGallery_LoadMore: string;
}

export interface WpblogTotalsoftGalleryvVideos {
  id: number;
  TotalSoftGallery_Video_VT: string;
  TotalSoftGallery_Video_VDesc: string;
  TotalSoftGallery_Video_VLink: string;
  TotalSoftGallery_Video_VONT: string;
  TotalSoftGallery_Video_VURL: string;
  TotalSoftGallery_Video_IURL: string;
  TotalSoftGallery_Video_Video: string;
  GalleryV_ID: string;
}

export interface WpblogTotalsoftNewPlugin {
  id: number;
  New_Plugin_Name: string;
  Our_Plugin_Name: string;
  Dismiss: string;
}

export interface WpblogUsermeta {
  umeta_id: number;
  user_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpblogUsers {
  ID: number;
  user_login: string;
  user_pass: string;
  user_nicename: string;
  user_email: string;
  user_url: string;
  user_registered: Date | string;
  user_activation_key: string;
  user_status: number;
  display_name: string;
}

export interface WpblogWonderpluginCarousel {
  id: number;
  name: string;
  data: string;
  time: Date | string;
  authorid: string;
}

export interface WpblogWonderpluginSlider {
  id: number;
  name: string;
  data: string;
  time: Date | string;
  authorid: string;
}

export interface WpblogWpforoAccesses {
  accessid: number;
  access: string;
  title: string;
  cans: string;
}

export interface WpblogWpforoActivity {
  id: number;
  type: string;
  itemid: number;
  itemtype: string;
  itemid_second: number;
  userid: number;
  name: string;
  email: string;
  date: number;
  content?: string;
  permalink: string;
  new: number;
}

export interface WpblogWpforoForums {
  forumid: number;
  title: string;
  slug: string;
  description?: string;
  parentid: number;
  icon?: string;
  last_topicid: number;
  last_postid: number;
  last_userid: number;
  last_post_date: Date | string;
  topics: number;
  posts: number;
  permissions?: string;
  meta_key?: string;
  meta_desc?: string;
  status: number;
  is_cat: number;
  cat_layout: number;
  order: number;
  color: string;
}

export interface WpblogWpforoLanguages {
  langid: number;
  name: string;
}

export interface WpblogWpforoLikes {
  likeid: number;
  userid: number;
  postid: number;
  post_userid: number;
}

export interface WpblogWpforoPhrases {
  phraseid: number;
  langid: number;
  phrase_key?: string;
  phrase_value: string;
  package: string;
}

export interface WpblogWpforoPostRevisions {
  revisionid: number;
  userid: number;
  textareaid: string;
  postid: number;
  body?: string;
  created: number;
  version: number;
  email: string;
  url?: string;
}

export interface WpblogWpforoPosts {
  postid: number;
  parentid: number;
  forumid: number;
  topicid: number;
  userid: number;
  title?: string;
  body?: string;
  created: Date | string;
  modified: Date | string;
  likes: number;
  votes: number;
  is_answer: number;
  is_first_post: number;
  status: number;
  name: string;
  email: string;
  private: number;
  root?: number;
}

export interface WpblogWpforoProfiles {
  userid: number;
  title: string;
  username: string;
  groupid: number;
  posts: number;
  questions: number;
  answers: number;
  comments: number;
  site?: string;
  icq?: string;
  aim?: string;
  yahoo?: string;
  msn?: string;
  facebook?: string;
  twitter?: string;
  gtalk?: string;
  skype?: string;
  avatar?: string;
  signature?: string;
  about?: string;
  occupation?: string;
  location?: string;
  last_login: Date | string;
  online_time?: number;
  rank: number;
  like: number;
  status?: string;
  timezone?: string;
  is_email_confirmed: number;
  secondary_groups?: string;
  fields?: string;
}

export interface WpblogWpforoSubscribes {
  subid: number;
  itemid: number;
  type: string;
  confirmkey: string;
  userid: number;
  active: number;
  user_name: string;
  user_email: string;
}

export interface WpblogWpforoTags {
  tagid: number;
  tag: string;
  prefix: number;
  count: number;
}

export interface WpblogWpforoTopics {
  topicid: number;
  forumid: number;
  first_postid: number;
  userid: number;
  title: string;
  slug: string;
  created: Date | string;
  modified: Date | string;
  last_post: number;
  posts: number;
  votes: number;
  answers: number;
  views: number;
  meta_key?: string;
  meta_desc?: string;
  type: number;
  solved: number;
  closed: number;
  has_attach: number;
  private: number;
  status: number;
  name: string;
  email: string;
  prefix: string;
  tags?: string;
}

export interface WpblogWpforoUsergroups {
  groupid: number;
  name: string;
  cans: string;
  description?: string;
  utitle: string;
  role: string;
  access: string;
  color: string;
  visible: number;
  secondary: number;
}

export interface WpblogWpforoViews {
  vid: number;
  userid: number;
  topicid: number;
  created: number;
}

export interface WpblogWpforoVisits {
  id: number;
  userid: number;
  name: string;
  ip: string;
  time: number;
  forumid: number;
  topicid: number;
}

export interface WpblogWpforoVotes {
  voteid: number;
  userid: number;
  postid: number;
  reaction: number;
  post_userid: number;
}

export interface WpblogWpufTransaction {
  id: number;
  user_id?: number;
  status: string;
  cost?: string;
  post_id?: string;
  pack_id?: number;
  payer_first_name?: string;
  payer_last_name?: string;
  payer_email?: string;
  payment_type?: string;
  payer_address?: string;
  transaction_id?: string;
  created: Date | string;
}

export interface WpblogYoastIndexable {
  id: number;
  permalink?: string;
  permalink_hash?: string;
  object_id?: number;
  object_type: string;
  object_sub_type?: string;
  author_id?: number;
  post_parent?: number;
  title?: string;
  description?: string;
  breadcrumb_title?: string;
  post_status?: string;
  is_public?: number;
  is_protected?: number;
  has_public_posts?: number;
  number_of_pages?: number;
  canonical?: string;
  primary_focus_keyword?: string;
  primary_focus_keyword_score?: number;
  readability_score?: number;
  is_cornerstone?: number;
  is_robots_noindex?: number;
  is_robots_nofollow?: number;
  is_robots_noarchive?: number;
  is_robots_noimageindex?: number;
  is_robots_nosnippet?: number;
  twitter_title?: string;
  twitter_image?: string;
  twitter_description?: string;
  twitter_image_id?: string;
  twitter_image_source?: string;
  open_graph_title?: string;
  open_graph_description?: string;
  open_graph_image?: string;
  open_graph_image_id?: string;
  open_graph_image_source?: string;
  open_graph_image_meta?: string;
  link_count?: number;
  incoming_link_count?: number;
  prominent_words_version?: number;
  created_at?: Date | string;
  updated_at: Date | string;
  blog_id: number;
  language?: string;
  region?: string;
  schema_page_type?: string;
  schema_article_type?: string;
  has_ancestors?: number;
  estimated_reading_time_minutes?: number;
}

export interface WpblogYoastIndexableHierarchy {
  indexable_id: number;
  ancestor_id: number;
  depth?: number;
  blog_id: number;
}

export interface WpblogYoastMigrations {
  id: number;
  version?: string;
}

export interface WpblogYoastPrimaryTerm {
  id: number;
  post_id?: number;
  term_id?: number;
  taxonomy: string;
  created_at?: Date | string;
  updated_at: Date | string;
  blog_id: number;
}

export interface WpblogYoastSeoLinks {
  id: number;
  url: string;
  post_id: number;
  target_post_id: number;
  type: string;
  indexable_id?: number;
  target_indexable_id?: number;
  height?: number;
  width?: number;
  size?: number;
  language?: string;
  region?: string;
}

export interface WpblogYoastSeoMeta {
  object_id: number;
  internal_link_count?: number;
  incoming_link_count?: number;
}

export interface WpleadsActionschedulerActions {
  action_id: number;
  hook: string;
  status: string;
  scheduled_date_gmt?: Date | string;
  scheduled_date_local?: Date | string;
  priority: number;
  args?: string;
  schedule?: string;
  group_id: number;
  attempts: number;
  last_attempt_gmt?: Date | string;
  last_attempt_local?: Date | string;
  claim_id: number;
  extended_args?: string;
}

export interface WpleadsActionschedulerClaims {
  claim_id: number;
  date_created_gmt?: Date | string;
}

export interface WpleadsActionschedulerGroups {
  group_id: number;
  slug: string;
}

export interface WpleadsActionschedulerLogs {
  log_id: number;
  action_id: number;
  message: string;
  log_date_gmt?: Date | string;
  log_date_local?: Date | string;
}

export interface WpleadsBalaEmailNotifications {
  id: number;
  user_id: number;
  post_id: number;
}

export interface WpleadsCommentmeta {
  meta_id: number;
  comment_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpleadsComments {
  comment_ID: number;
  comment_post_ID: number;
  comment_author: string;
  comment_author_email: string;
  comment_author_url: string;
  comment_author_IP: string;
  comment_date: Date | string;
  comment_date_gmt: Date | string;
  comment_content: string;
  comment_karma: number;
  comment_approved: string;
  comment_agent: string;
  comment_type: string;
  comment_parent: number;
  user_id: number;
}

export interface WpleadsCpkWpcsvExportQueue {
  id: number;
  export_id: string;
  post_id: number;
  done: number;
  msg?: string;
}

export interface WpleadsCpkWpcsvLog {
  id: number;
  category: string;
  msg: string;
  data?: string;
  created: Date | string;
}

export interface WpleadsEsignDocumentUsers {
  id: number;
  user_id: number;
  document_id: number;
  signer_name: string;
  signer_email: string;
  company_name: string;
}

export interface WpleadsEsignDocuments {
  document_id: number;
  user_id: number;
  post_id: number;
  document_title: string;
  document_content: string;
  notify: number;
  add_signature: number;
  document_type: string;
  document_status: string;
  document_checksum: string;
  document_uri?: string;
  ip_address: string;
  date_created: Date | string;
  last_modified: Date | string;
}

export interface WpleadsEsignDocumentsEvents {
  id: number;
  document_id: number;
  event: string;
  event_data: string;
  date: Date | string;
  ip_address: string;
}

export interface WpleadsEsignDocumentsFieldsData {
  id: number;
  field_id: string;
  recipient_id: number;
  document_id: number;
  value: string;
  created_at: Date | string;
}

export interface WpleadsEsignDocumentsMeta {
  id: number;
  document_id: number;
  meta_key: string;
  meta_value: string;
}

export interface WpleadsEsignDocumentsSignatures {
  id: number;
  document_id: number;
  signature_id: number;
  ip_address: string;
  sign_date: Date | string;
  signer_type?: string;
}

export interface WpleadsEsignDocumentsSignerFieldData {
  id: number;
  signature_id: number;
  document_id: number;
  input_fields: string;
  date_created: Date | string;
  date_modified: Date | string;
}

export interface WpleadsEsignDocumentsStandAloneDocs {
  document_id: number;
  page_id: number;
  date_created: Date | string;
  date_modified: Date | string;
}

export interface WpleadsEsignInvitations {
  invitation_id: number;
  user_id: number;
  document_id: number;
  invite_hash: string;
  invite_message: string;
  invite_sent: number;
  sender_ip: string;
  invite_sent_date: Date | string;
}

export interface WpleadsEsignSettings {
  setting_id: number;
  user_id: number;
  setting_name: string;
  setting_value: string;
}

export interface WpleadsEsignSignatures {
  signature_id: number;
  user_id: number;
  signature_type: string;
  signature_hash: string;
  signature_salt: string;
  signature_data: string;
  signature_added: Date | string;
}

export interface WpleadsEsignUsers {
  user_id: number;
  wp_user_id?: number;
  uuid: string;
  user_email: string;
  user_title: string;
  first_name: string;
  last_name: string;
  is_admin: number;
  is_signer: number;
  is_sa: number;
  is_inactive: number;
}

export interface WpleadsLinks {
  link_id: number;
  link_url: string;
  link_name: string;
  link_image: string;
  link_target: string;
  link_description: string;
  link_visible: string;
  link_owner: number;
  link_rating: number;
  link_updated: Date | string;
  link_rel: string;
  link_notes: string;
  link_rss: string;
}

export interface WpleadsMailsterActionBounces {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
  hard: number;
  text: string;
}

export interface WpleadsMailsterActionClicks {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
  link_id: number;
}

export interface WpleadsMailsterActionErrors {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
  text: string;
}

export interface WpleadsMailsterActionOpens {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
}

export interface WpleadsMailsterActionSent {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
}

export interface WpleadsMailsterActionUnsubs {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  i: number;
  count: number;
  text: string;
}

export interface WpleadsMailsterFormActions {
  ID: number;
  form_id: number;
  post_id: number;
  subscriber_id?: number;
  timestamp: number;
  type: number;
}

export interface WpleadsMailsterFormFields {
  ID: number;
  form_id: number;
  field_id: string;
  name: string;
  error_msg: string;
  required: number;
  position: number;
}

export interface WpleadsMailsterForms {
  ID: number;
  name: string;
  submit: string;
  asterisk?: number;
  userschoice?: number;
  precheck?: number;
  dropdown?: number;
  prefill?: number;
  inline?: number;
  overwrite?: number;
  addlists?: number;
  style?: string;
  custom_style?: string;
  doubleoptin?: number;
  subject?: string;
  headline?: string;
  content?: string;
  link?: string;
  resend?: number;
  resend_count?: number;
  resend_time?: number;
  template: string;
  vcard?: number;
  vcard_content?: string;
  confirmredirect?: string;
  redirect?: string;
  added?: number;
  updated?: number;
}

export interface WpleadsMailsterFormsLists {
  form_id: number;
  list_id: number;
  added: number;
}

export interface WpleadsMailsterFormsTags {
  form_id: number;
  tag_id: number;
  added: number;
}

export interface WpleadsMailsterLinks {
  ID: number;
  link: string;
  i: number;
}

export interface WpleadsMailsterLists {
  ID: number;
  parent_id: number;
  name: string;
  slug: string;
  description: string;
  added: number;
  updated: number;
}

export interface WpleadsMailsterListsSubscribers {
  list_id: number;
  subscriber_id: number;
  added: number;
}

export interface WpleadsMailsterLogs {
  ID: number;
  subscriber_id?: number;
  campaign_id?: number;
  timestamp: number;
  subject: string;
  receivers: string;
  html: string;
  text: string;
  raw: string;
  message_id: string;
}

export interface WpleadsMailsterQueue {
  ID: number;
  subscriber_id: number;
  campaign_id: number;
  requeued: number;
  added: number;
  timestamp: number;
  sent: number;
  priority: number;
  count: number;
  error: number;
  ignore_status: number;
  options: string;
  tags: string;
  i: number;
}

export interface WpleadsMailsterSubscriberFields {
  ID: number;
  subscriber_id: number;
  meta_key: string;
  meta_value: string;
}

export interface WpleadsMailsterSubscriberMeta {
  ID: number;
  subscriber_id?: number;
  campaign_id: number;
  meta_key: string;
  meta_value: string;
}

export interface WpleadsMailsterSubscribers {
  ID: number;
  hash: string;
  email: string;
  wp_id: number;
  status: number;
  added: number;
  updated: number;
  signup: number;
  confirm: number;
  ip_signup: string;
  ip_confirm: string;
  rating: number;
}

export interface WpleadsMailsterTags {
  ID: number;
  name: string;
  added: number;
  updated: number;
}

export interface WpleadsMailsterTagsSubscribers {
  tag_id: number;
  subscriber_id: number;
  added: number;
}

export interface WpleadsMailsterWorkflows {
  ID: number;
  subscriber_id?: number;
  workflow_id?: number;
  trigger: string;
  step?: string;
  added?: number;
  timestamp?: number;
  finished: number;
  try: number;
  error?: string;
  context?: string;
}

export interface WpleadsMyCREDLog {
  id: number;
  ref: string;
  ref_id?: number;
  user_id?: number;
  creds?: number;
  ctype?: string;
  time?: number;
  entry?: string;
  data?: string;
}

export interface WpleadsMymailTempImport {
  ID: number;
  data: string;
  identifier: string;
}

export interface WpleadsOptions {
  option_id: number;
  option_name?: string;
  option_value: string;
  autoload: string;
}

export interface WpleadsPostmeta {
  meta_id: number;
  post_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpleadsPosts {
  ID: number;
  post_author: number;
  post_date: Date | string;
  post_date_gmt: Date | string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: Date | string;
  post_modified_gmt: Date | string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: number;
}

export interface WpleadsPpsCountries {
  id: number;
  name: string;
  iso_code_2?: string;
  iso_code_3?: string;
}

export interface WpleadsPpsModules {
  id: number;
  code: string;
  active: number;
  type_id: number;
  label?: string;
  ex_plug_dir?: string;
}

export interface WpleadsPpsModulesType {
  id: number;
  label: string;
}

export interface WpleadsPpsPopup {
  id: number;
  label: string;
  active: number;
  original_id: number;
  params: string;
  html: string;
  css: string;
  img_preview?: string;
  show_on: number;
  show_to: number;
  show_pages: number;
  type_id: number;
  views: number;
  unique_views: number;
  actions: number;
  date_created: Date | string;
  sort_order: number;
  show_in_admin_area: number;
}

export interface WpleadsPpsPopupShowCategories {
  popup_id: number;
  term_id: number;
  not_show: number;
}

export interface WpleadsPpsPopupShowPages {
  popup_id: number;
  post_id: number;
  not_show: number;
}

export interface WpleadsPpsStatistics {
  id: number;
  popup_id: number;
  type: number;
  sm_id: number;
  is_unique: number;
  date_created: Date | string;
}

export interface WpleadsPpsSubscribers {
  id: number;
  username?: string;
  email: string;
  hash: string;
  activated: number;
  popup_id: number;
  date_created: Date | string;
  all_data: string;
}

export interface WpleadsPpsUsageStat {
  id: number;
  code: string;
  visits: number;
  spent_time: number;
  modify_timestamp: Date | string;
}

export interface WpleadsProjectAffiliatePayouts {
  id: number;
  pid?: number;
  uid?: number;
  datemade?: number;
  paidon?: number;
  moneymade?: string;
  paid: number;
  comment: string;
}

export interface WpleadsProjectAffiliateRequests {
  id: number;
  uid?: number;
  datemade?: number;
  paidon?: number;
  amount?: string;
  paid: number;
  methoddetails: string;
}

export interface WpleadsProjectAffiliateUsers {
  id: number;
  owner_id?: number;
  affiliate_id?: number;
  datemade?: number;
}

export interface WpleadsProjectBiddingIntervals {
  id: number;
  bidding_interval_name: string;
  low_limit: number;
  high_limit: string;
}

export interface WpleadsProjectBids {
  id: number;
  date_made: number;
  bid: number;
  pid: number;
  uid: number;
  winner: number;
  paid: number;
  reserved1: string;
  date_choosen: number;
  description: string;
  days_done: string;
}

export interface WpleadsProjectBillsSite {
  id: number;
  uid: number;
  pid: number;
  datemade: number;
  amount: number;
  paiddate: number;
  paid: number;
}

export interface WpleadsProjectCoupons {
  id: number;
  coupon_name: string;
  coupon_solid_reduction: string;
  coupon_percent_reduction: string;
  ending: string;
  coupon_code: string;
  datemprojecte: string;
  featured_free: number;
  pause: number;
}

export interface WpleadsProjectCustomFields {
  id: number;
  name: string;
  tp: string;
  ordr: number;
  cate: string;
  pause: number;
  is_mandatory: number;
}

export interface WpleadsProjectCustomOptions {
  id: number;
  valval: string;
  ordr: number;
  custid: number;
}

export interface WpleadsProjectCustomRelations {
  id: number;
  custid: number;
  catid: number;
}

export interface WpleadsProjectDisputes {
  id: number;
  uid: number;
  pid: number;
  closed: number;
  solved: number;
  datemade: number;
  dateclosed: number;
  datesolved: number;
  content: string;
  subject: string;
  uid2: number;
  uid1: number;
  oid: number;
  reason: number;
}

export interface WpleadsProjectDisputesMessages {
  id: number;
  uid: number;
  receiver: number;
  description: string;
  disputeid: number;
  rd: number;
  pid: number;
  datemade: number;
  readdate: number;
  file_attached: number;
}

export interface WpleadsProjectDisputesOffers {
  id: number;
  disputeid: number;
  sender: number;
  receiver: number;
  description: string;
  answer: number;
  rd: number;
  datemade: number;
  readdate: number;
  amount?: string;
}

export interface WpleadsProjectEmailAlerts {
  id: number;
  uid: number;
  catid: number;
}

export interface WpleadsProjectEmailAlertsLocs {
  id: number;
  uid: number;
  catid: number;
}

export interface WpleadsProjectEscrow {
  id: number;
  fromid: number;
  toid: number;
  pid: number;
  amount: number;
  datemade: number;
  releasedate: number;
  released: number;
}

export interface WpleadsProjectEscrows {
  id: number;
  fromid: number;
  toid: number;
  oid: number;
  amount: number;
  datemade: number;
  releasedate: number;
  released: number;
  method: string;
}

export interface WpleadsProjectFreelancerSkills {
  id: number;
  uid: number;
  catid: number;
}

export interface WpleadsProjectMarketplacePayments {
  id: number;
  fromid: number;
  toid: number;
  oid: number;
  amount: number;
  datemade: number;
  releasedate: number;
  released: number;
  method: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
}

export interface WpleadsProjectMarketplacePaymentsCommissions {
  id: number;
  oid: number;
  amount: number;
  datemade: number;
  releasedate: number;
  released: number;
}

export interface WpleadsProjectMarketplacePaymentsFreelancers {
  id: number;
  oid: number;
  uid: number;
  amount: number;
  datemade: number;
  releasedate: number;
  released: number;
}

export interface WpleadsProjectMessageBoard {
  id: number;
  uid: number;
  content: string;
  rd: number;
  pid: number;
  datemade: number;
}

export interface WpleadsProjectMilestone {
  id: number;
  owner: number;
  pid: number;
  uid: number;
  description_content: string;
  datemade: number;
  completion_date: number;
  date_released: number;
  amount: string;
  released: number;
}

export interface WpleadsProjectNotifications {
  id: number;
  uid: number;
  related_id: number;
  notification_type: number;
  description: string;
  rd: number;
  datemade: number;
  readdate: number;
}

export interface WpleadsProjectOrders {
  id: number;
  buyer: number;
  freelancer: number;
  pid: number;
  datemade: number;
  done_freelancer: number;
  done_buyer: number;
  order_status: number;
  marked_done_freelancer: number;
  marked_done_buyer: number;
  order_net_amount: number;
  order_total_amount: number;
  completion_date: number;
  cancelled_date: number;
}

export interface WpleadsProjectPacks {
  id: number;
  pack_name: string;
  projects_number: number;
  pack_cost: string;
  datemprojecte: string;
  featured_free: number;
  pause: number;
}

export interface WpleadsProjectPaymentTransactions {
  id: number;
  uid: number;
  reason: string;
  datemade: number;
  amount: number;
  tp: number;
  uid2: number;
  pid_related: string;
}

export interface WpleadsProjectPm {
  id: number;
  owner: number;
  user: number;
  content: string;
  subject: string;
  rd: number;
  parent: number;
  pid: number;
  datemade: number;
  readdate: number;
  initiator: number;
  attached: number;
  show_to_source: number;
  show_to_destination: number;
  file_attached: string;
  approved: number;
  approved_on: number;
  threadid: number;
}

export interface WpleadsProjectPmThreads {
  id: number;
  user1: number;
  user2: number;
  datemade: number;
  lastupdate: number;
  pid: number;
  show_to_user1: number;
  show_to_user2: number;
  admin_approved: number;
  message_title: string;
  user1_last_type: number;
  user2_last_type: number;
}

export interface WpleadsProjectPmWk {
  id: number;
  owner: number;
  user: number;
  content: string;
  subject: string;
  rd: number;
  parent: number;
  pid: number;
  datemade: number;
  readdate: number;
  initiator: number;
  attached: number;
  approved: number;
  approved_on: number;
  show_to_source: number;
  show_to_destination: number;
  file_attached: string;
}

export interface WpleadsProjectRatings {
  id: number;
  pid: number;
  fromuser: number;
  touser: number;
  comment: string;
  grade: number;
  datemade: number;
  awarded: number;
}

export interface WpleadsProjectTransactions {
  id: number;
  pid: number;
  datemprojecte: number;
  uid: number;
  payment_date: string;
  txn_id: string;
  item_name: string;
  mc_currency: string;
  last_name: string;
  first_name: string;
  payer_email: string;
  projectdress_country: string;
  projectdress_state: string;
  projectdress_country_code: string;
  projectdress_zip: string;
  projectdress_street: string;
  mc_fee: string;
  mc_gross: string;
}

export interface WpleadsProjectUserCustomFields {
  id: number;
  name: string;
  tp: string;
  ordr: number;
  cate: string;
  pause: number;
}

export interface WpleadsProjectUserCustomOptions {
  id: number;
  valval: string;
  ordr: number;
  custid: number;
}

export interface WpleadsProjectUserCustomRelations {
  id: number;
  custid: number;
  catid: string;
}

export interface WpleadsProjectWithdraw {
  id: number;
  datemade: number;
  done: number;
  datedone: number;
  payeremail: string;
  uid: number;
  amount: number;
  methods: string;
  rejected: string;
}

export interface WpleadsProjectWorkspace {
  id: number;
  pid: number;
  project_owner: string;
  freelancer1: number;
  freelancer2: number;
  freelancer3: number;
  freelancer4: number;
  freelancer5: number;
  datemade: number;
  last_updated: number;
}

export interface WpleadsProjectWorkspacePm {
  id: number;
  owner: number;
  user: number;
  content: string;
  subject: string;
  workspace_id: number;
  pid: number;
  datemade: number;
  readdate: number;
  attached: number;
}

export interface WpleadsProjectWorkspacePmReads {
  id: number;
  workspace_pm_id: number;
  read_message: number;
  receiver_user: number;
  read_date: number;
}

export interface WpleadsRedirection404 {
  id: number;
  created: Date | string;
  url: string;
  domain?: string;
  agent?: string;
  referrer?: string;
  http_code: number;
  request_method?: string;
  request_data?: string;
  ip?: string;
}

export interface WpleadsRedirectionGroups {
  id: number;
  name: string;
  tracking: number;
  module_id: number;
  status: string;
  position: number;
}

export interface WpleadsRedirectionItems {
  id: number;
  url: string;
  match_url?: string;
  match_data?: string;
  regex: number;
  position: number;
  last_count: number;
  last_access: Date | string;
  group_id: number;
  status: string;
  action_type: string;
  action_code: number;
  action_data?: string;
  match_type: string;
  title?: string;
}

export interface WpleadsRedirectionLogs {
  id: number;
  created: Date | string;
  url: string;
  domain?: string;
  sent_to?: string;
  agent?: string;
  referrer?: string;
  http_code: number;
  request_method?: string;
  request_data?: string;
  redirect_by?: string;
  redirection_id?: number;
  ip?: string;
}

export interface WpleadsSibModelForms {
  id: number;
  title?: string;
  html?: string;
  css?: string;
  dependTheme: number;
  listID?: string;
  templateID: number;
  confirmID: number;
  isDopt: number;
  isOpt: number;
  redirectInEmail?: string;
  redirectInForm?: string;
  successMsg?: string;
  errorMsg?: string;
  existMsg?: string;
  invalidMsg?: string;
  attributes?: string;
  date: Date | string;
  isDefault: number;
  gCaptcha: number;
  gCaptcha_secret?: string;
  gCaptcha_site?: string;
  termAccept: number;
  termsURL?: string;
  requiredMsg?: string;
}

export interface WpleadsSibModelUsers {
  id: number;
  email?: string;
  code?: string;
  listIDs?: string;
  redirectUrl?: string;
  info?: string;
  frmid?: number;
  user_added_date: Date | string;
}

export interface WpleadsTermRelationships {
  object_id: number;
  term_taxonomy_id: number;
  term_order: number;
}

export interface WpleadsTermTaxonomy {
  term_taxonomy_id: number;
  term_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
}

export interface WpleadsTermmeta {
  meta_id: number;
  term_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpleadsTerms {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
}

export interface WpleadsUsermeta {
  umeta_id: number;
  user_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpleadsUsers {
  ID: number;
  user_login: string;
  user_pass: string;
  user_nicename: string;
  user_email: string;
  user_url: string;
  user_registered: Date | string;
  user_activation_key: string;
  user_status: number;
  display_name: string;
}

export interface WpleadsWfblockediplog {
  IP: Buffer;
  countryCode: string;
  blockCount: number;
  unixday: number;
  blockType: string;
}

export interface WpleadsWfblocks7 {
  id: number;
  type: number;
  IP: Buffer;
  blockedTime: number;
  reason: string;
  lastAttempt?: number;
  blockedHits?: number;
  expiration: number;
  parameters?: string;
}

export interface WpleadsWfconfig {
  name: string;
  val?: Buffer;
  autoload: string;
}

export interface WpleadsWfcrawlers {
  IP: Buffer;
  patternSig: Buffer;
  status: string;
  lastUpdate: number;
  PTR?: string;
}

export interface WpleadsWffilechanges {
  filenameHash: string;
  file: string;
  md5: string;
}

export interface WpleadsWffilemods {
  filenameMD5: Buffer;
  filename: string;
  real_path: string;
  knownFile: number;
  oldMD5: Buffer;
  newMD5: Buffer;
  SHAC: Buffer;
  stoppedOnSignature: string;
  stoppedOnPosition: number;
  isSafeFile: string;
}

export interface WpleadsWfhits {
  id: number;
  attackLogTime: number;
  ctime: number;
  IP?: Buffer;
  jsRun?: number;
  statusCode: number;
  isGoogle: number;
  userID: number;
  newVisit: number;
  URL?: string;
  referer?: string;
  UA?: string;
  action: string;
  actionDescription?: string;
  actionData?: string;
}

export interface WpleadsWfhoover {
  id: number;
  owner?: string;
  host?: string;
  path?: string;
  hostKey?: Buffer;
}

export interface WpleadsWfissues {
  id: number;
  time: number;
  lastUpdated: number;
  status: string;
  type: string;
  severity: number;
  ignoreP: string;
  ignoreC: string;
  shortMsg: string;
  longMsg?: string;
  data?: string;
}

export interface WpleadsWfknownfilelist {
  id: number;
  path: string;
  wordpress_path: string;
}

export interface WpleadsWflivetraffichuman {
  IP: Buffer;
  identifier: Buffer;
  expiration: number;
}

export interface WpleadsWflocs {
  IP: Buffer;
  ctime: number;
  failed: number;
  city?: string;
  region?: string;
  countryName?: string;
  countryCode?: string;
  lat?: number;
  lon?: number;
}

export interface WpleadsWflogins {
  id: number;
  hitID?: number;
  ctime: number;
  fail: number;
  action: string;
  username: string;
  userID: number;
  IP?: Buffer;
  UA?: string;
}

export interface WpleadsWfls2faSecrets {
  id: number;
  user_id: number;
  secret: Buffer;
  recovery: Buffer;
  ctime: number;
  vtime: number;
  mode: string;
}

export interface WpleadsWflsRoleCounts {
  serialized_roles: Buffer;
  two_factor_inactive: number;
  user_count: number;
}

export interface WpleadsWflsSettings {
  name: string;
  value?: Buffer;
  autoload: string;
}

export interface WpleadsWfnotifications {
  id: string;
  new: number;
  category: string;
  priority: number;
  ctime: number;
  html: string;
  links: string;
}

export interface WpleadsWfpendingissues {
  id: number;
  time: number;
  lastUpdated: number;
  status: string;
  type: string;
  severity: number;
  ignoreP: string;
  ignoreC: string;
  shortMsg: string;
  longMsg?: string;
  data?: string;
}

export interface WpleadsWfreversecache {
  IP: Buffer;
  host: string;
  lastUpdate: number;
}

export interface WpleadsWfsecurityevents {
  id: number;
  type: string;
  data: string;
  event_time: number;
  state: string;
  state_timestamp: Date | string;
}

export interface WpleadsWfsnipcache {
  id: number;
  IP: string;
  expiration: Date | string;
  body: string;
  count: number;
  type: number;
}

export interface WpleadsWfstatus {
  id: number;
  ctime: number;
  level: number;
  type: string;
  msg: string;
}

export interface WpleadsWftrafficrates {
  eMin: number;
  IP: Buffer;
  hitType: string;
  hits: number;
}

export interface WpleadsWfwaffailures {
  id: number;
  throwable: string;
  rule_id?: number;
  timestamp: Date | string;
}

export interface WpleadsWpcClientCategories {
  id: number;
  parent_id: number;
  name?: string;
  type: string;
  cat_order?: number;
}

export interface WpleadsWpcClientChains {
  id: number;
  subject?: string;
}

export interface WpleadsWpcClientClientsPage {
  id: number;
  pagename: string;
  template: string;
  users: string;
}

export interface WpleadsWpcClientComments {
  id: number;
  user_id: number;
  page_id: number;
  time: string;
  comment: string;
  sent_from?: number;
  sent_to?: number;
  new_flag?: number;
}

export interface WpleadsWpcClientFileCategories {
  cat_id: number;
  cat_name?: string;
  folder_name?: string;
  cat_order?: number;
  parent_id: number;
}

export interface WpleadsWpcClientFiles {
  id: number;
  order_id?: number;
  user_id: number;
  page_id: number;
  time: string;
  last_download?: string;
  size: number;
  filename: string;
  name: string;
  title?: string;
  description?: string;
  cat_id?: number;
  protect_url?: number;
  external?: number;
}

export interface WpleadsWpcClientFilesDownloadLog {
  id: number;
  file_id: number;
  client_id: number;
  download_date?: string;
}

export interface WpleadsWpcClientGroupClients {
  group_id: number;
  client_id: number;
}

export interface WpleadsWpcClientGroups {
  group_id: number;
  group_name: string;
  auto_select?: string;
  auto_add_files?: string;
  auto_add_pps?: string;
  auto_add_manual?: string;
  auto_add_self?: string;
  auto_add_to_manager: number;
  notification: number;
}

export interface WpleadsWpcClientLoginRedirects {
  rul_type: string;
  rul_value: string;
  rul_url?: string;
  rul_url_logout?: string;
  rul_order: number;
  rul_first_url?: string;
}

export interface WpleadsWpcClientMessages {
  id: number;
  chain_id: number;
  author_id: number;
  content: string;
  date: string;
}

export interface WpleadsWpcClientObjectsAssigns {
  id: number;
  object_type: string;
  object_id?: number;
  assign_type: string;
  assign_id?: number;
}

export interface WpleadsWpcClientPayments {
  id: number;
  order_id?: string;
  order_status?: string;
  function?: string;
  payment_method?: string;
  payment_type?: string;
  client_id?: number;
  amount?: string;
  currency?: string;
  data?: string;
  transaction_id?: string;
  transaction_status?: string;
  time_created?: string;
  time_paid?: string;
  subscription_id?: string;
  subscription_status?: string;
  next_payment_date?: string;
}

export interface WpleadsWpcClientPortalPageCategories {
  cat_id: number;
  cat_name?: string;
}

export interface WpleadsWpcTempIds {
  block_key?: string;
  id: number;
}

export interface WpleadsWpformsLogs {
  id: number;
  title: string;
  message: string;
  types: string;
  create_at: Date | string;
  form_id?: number;
  entry_id?: number;
  user_id?: number;
}

export interface WpleadsWpformsPaymentMeta {
  id: number;
  payment_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpleadsWpformsPayments {
  id: number;
  form_id: number;
  status: string;
  subtotal_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  entry_id: number;
  gateway: string;
  type: string;
  mode: string;
  transaction_id: string;
  customer_id: string;
  subscription_id: string;
  subscription_status: string;
  title: string;
  date_created_gmt: Date | string;
  date_updated_gmt: Date | string;
  is_published: number;
}

export interface WpleadsWpformsTasksMeta {
  id: number;
  action: string;
  data: string;
  date: Date | string;
}

export interface WpleadsWpforoAccesses {
  accessid: number;
  access: string;
  title: string;
  cans: string;
}

export interface WpleadsWpforoActivity {
  id: number;
  type: string;
  itemid: number;
  itemtype: string;
  itemid_second: number;
  userid: number;
  name: string;
  email: string;
  date: number;
  content?: string;
  permalink: string;
  new: number;
}

export interface WpleadsWpforoForums {
  forumid: number;
  title: string;
  slug: string;
  description?: string;
  parentid: number;
  icon?: string;
  last_topicid: number;
  last_postid: number;
  last_userid: number;
  last_post_date: Date | string;
  topics: number;
  posts: number;
  permissions?: string;
  meta_key?: string;
  meta_desc?: string;
  status: number;
  is_cat: number;
  cat_layout: number;
  order: number;
  color: string;
}

export interface WpleadsWpforoLanguages {
  langid: number;
  name: string;
}

export interface WpleadsWpforoLikes {
  likeid: number;
  userid: number;
  postid: number;
  post_userid: number;
}

export interface WpleadsWpforoPhrases {
  phraseid: number;
  langid: number;
  phrase_key?: string;
  phrase_value: string;
  package: string;
}

export interface WpleadsWpforoPostRevisions {
  revisionid: number;
  userid: number;
  textareaid: string;
  postid: number;
  body?: string;
  created: number;
  version: number;
  email: string;
  url?: string;
}

export interface WpleadsWpforoPostmeta {
  metaid: number;
  postid: number;
  metakey: string;
  metavalue?: string;
  forumid: number;
  topicid: number;
  is_first_post: number;
  status: number;
  private: number;
}

export interface WpleadsWpforoPosts {
  postid: number;
  parentid: number;
  forumid: number;
  topicid: number;
  userid: number;
  title?: string;
  body?: string;
  created: Date | string;
  modified: Date | string;
  likes: number;
  votes: number;
  is_answer: number;
  is_first_post: number;
  status: number;
  name: string;
  email: string;
  private: number;
  root?: number;
}

export interface WpleadsWpforoProfiles {
  userid: number;
  title: string;
  username: string;
  groupid: number;
  posts: number;
  questions: number;
  answers: number;
  comments: number;
  site?: string;
  icq?: string;
  aim?: string;
  yahoo?: string;
  msn?: string;
  facebook?: string;
  twitter?: string;
  gtalk?: string;
  skype?: string;
  avatar?: string;
  signature?: string;
  about?: string;
  occupation?: string;
  location?: string;
  last_login: Date | string;
  online_time?: number;
  rank: number;
  like: number;
  status?: string;
  timezone?: string;
  is_email_confirmed: number;
  secondary_groups?: string;
  fields?: string;
}

export interface WpleadsWpforoSubscribes {
  subid: number;
  itemid: number;
  type: string;
  confirmkey: string;
  userid: number;
  active: number;
  user_name: string;
  user_email: string;
}

export interface WpleadsWpforoTags {
  tagid: number;
  tag: string;
  prefix: number;
  count: number;
}

export interface WpleadsWpforoTopics {
  topicid: number;
  forumid: number;
  first_postid: number;
  userid: number;
  title: string;
  slug: string;
  created: Date | string;
  modified: Date | string;
  last_post: number;
  posts: number;
  votes: number;
  answers: number;
  views: number;
  meta_key?: string;
  meta_desc?: string;
  type: number;
  solved: number;
  closed: number;
  has_attach: number;
  private: number;
  status: number;
  name: string;
  email: string;
  prefix: string;
  tags?: string;
}

export interface WpleadsWpforoUsergroups {
  groupid: number;
  name: string;
  cans: string;
  description?: string;
  utitle: string;
  role: string;
  access: string;
  color: string;
  visible: number;
  secondary: number;
}

export interface WpleadsWpforoViews {
  vid: number;
  userid: number;
  topicid: number;
  created: number;
}

export interface WpleadsWpforoVisits {
  id: number;
  userid: number;
  name: string;
  ip: string;
  time: number;
  forumid: number;
  topicid: number;
}

export interface WpleadsWpforoVotes {
  voteid: number;
  userid: number;
  postid: number;
  reaction: number;
  post_userid: number;
}

export interface WpleadsWpmailsmtpDebugEvents {
  id: number;
  content?: string;
  initiator?: string;
  event_type: number;
  created_at: Date | string;
}

export interface WpleadsWpmailsmtpTasksMeta {
  id: number;
  action: string;
  data: string;
  date: Date | string;
}

export interface WpleadsWpmmSubscribers {
  id_subscriber: number;
  email: string;
  insert_date: Date | string;
}

export interface WpleadsWsluserscontacts {
  id: number;
  user_id: number;
  provider: string;
  identifier: string;
  full_name: string;
  email: string;
  profile_url: string;
  photo_url: string;
}

export interface WpleadsWslusersprofiles {
  id: number;
  user_id: number;
  provider: string;
  object_sha: string;
  identifier: string;
  profileurl: string;
  websiteurl: string;
  photourl: string;
  displayname: string;
  description: string;
  firstname: string;
  lastname: string;
  gender: string;
  language: string;
  age: string;
  birthday: number;
  birthmonth: number;
  birthyear: number;
  email: string;
  emailverified: string;
  phone: string;
  address: string;
  country: string;
  region: string;
  city: string;
  zip: string;
}

export interface WpleadsYoastIndexable {
  id: number;
  permalink?: string;
  permalink_hash?: string;
  object_id?: number;
  object_type: string;
  object_sub_type?: string;
  author_id?: number;
  post_parent?: number;
  title?: string;
  description?: string;
  breadcrumb_title?: string;
  post_status?: string;
  is_public?: number;
  is_protected?: number;
  has_public_posts?: number;
  number_of_pages?: number;
  canonical?: string;
  primary_focus_keyword?: string;
  primary_focus_keyword_score?: number;
  readability_score?: number;
  is_cornerstone?: number;
  is_robots_noindex?: number;
  is_robots_nofollow?: number;
  is_robots_noarchive?: number;
  is_robots_noimageindex?: number;
  is_robots_nosnippet?: number;
  twitter_title?: string;
  twitter_image?: string;
  twitter_description?: string;
  twitter_image_id?: string;
  twitter_image_source?: string;
  open_graph_title?: string;
  open_graph_description?: string;
  open_graph_image?: string;
  open_graph_image_id?: string;
  open_graph_image_source?: string;
  open_graph_image_meta?: string;
  link_count?: number;
  incoming_link_count?: number;
  prominent_words_version?: number;
  created_at?: Date | string;
  updated_at: Date | string;
  blog_id: number;
  language?: string;
  region?: string;
  schema_page_type?: string;
  schema_article_type?: string;
  has_ancestors?: number;
  estimated_reading_time_minutes?: number;
  version?: number;
  object_last_modified?: Date | string;
  object_published_at?: Date | string;
  inclusive_language_score?: number;
}

export interface WpleadsYoastIndexableHierarchy {
  indexable_id: number;
  ancestor_id: number;
  depth?: number;
  blog_id: number;
}

export interface WpleadsYoastMigrations {
  id: number;
  version?: string;
}

export interface WpleadsYoastPrimaryTerm {
  id: number;
  post_id?: number;
  term_id?: number;
  taxonomy: string;
  created_at?: Date | string;
  updated_at: Date | string;
  blog_id: number;
}

export interface WpleadsYoastSeoLinks {
  id: number;
  url: string;
  post_id: number;
  target_post_id: number;
  type: string;
  indexable_id?: number;
  target_indexable_id?: number;
  height?: number;
  width?: number;
  size?: number;
  language?: string;
  region?: string;
}

export interface WpleadsYoastSeoMeta {
  object_id: number;
  internal_link_count?: number;
  incoming_link_count?: number;
}

export interface WploginCommentmeta {
  meta_id: number;
  comment_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WploginComments {
  comment_ID: number;
  comment_post_ID: number;
  comment_author: string;
  comment_author_email: string;
  comment_author_url: string;
  comment_author_IP: string;
  comment_date: Date | string;
  comment_date_gmt: Date | string;
  comment_content: string;
  comment_karma: number;
  comment_approved: string;
  comment_agent: string;
  comment_type: string;
  comment_parent: number;
  user_id: number;
}

export interface WploginLinks {
  link_id: number;
  link_url: string;
  link_name: string;
  link_image: string;
  link_target: string;
  link_description: string;
  link_visible: string;
  link_owner: number;
  link_rating: number;
  link_updated: Date | string;
  link_rel: string;
  link_notes: string;
  link_rss: string;
}

export interface WploginOptions {
  option_id: number;
  option_name: string;
  option_value: string;
  autoload: string;
}

export interface WploginPostmeta {
  meta_id: number;
  post_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WploginPosts {
  ID: number;
  post_author: number;
  post_date: Date | string;
  post_date_gmt: Date | string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: Date | string;
  post_modified_gmt: Date | string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: number;
}

export interface WploginRedirection404 {
  id: number;
  created: Date | string;
  url: string;
  domain?: string;
  agent?: string;
  referrer?: string;
  http_code: number;
  request_method?: string;
  request_data?: string;
  ip?: string;
}

export interface WploginRedirectionGroups {
  id: number;
  name: string;
  tracking: number;
  module_id: number;
  status: string;
  position: number;
}

export interface WploginRedirectionItems {
  id: number;
  url: string;
  match_url?: string;
  match_data?: string;
  regex: number;
  position: number;
  last_count: number;
  last_access: Date | string;
  group_id: number;
  status: string;
  action_type: string;
  action_code: number;
  action_data?: string;
  match_type: string;
  title?: string;
}

export interface WploginRedirectionLogs {
  id: number;
  created: Date | string;
  url: string;
  domain?: string;
  sent_to?: string;
  agent?: string;
  referrer?: string;
  http_code: number;
  request_method?: string;
  request_data?: string;
  redirect_by?: string;
  redirection_id?: number;
  ip?: string;
}

export interface WploginRichWebVideoSliderEffectsData {
  id: number;
  slider_vid_name: string;
  slider_Vid_type: string;
}

export interface WploginRichWebVideoSliderFontFamily {
  id: number;
  Font_family: string;
}

export interface WploginRichWebVideoSliderId {
  id: number;
  Slider_ID: number;
}

export interface WploginRichWebVideoSliderManager {
  id: number;
  Slider_Title: string;
  Slider_Type: string;
  Slider_Video_Quantity: number;
}

export interface WploginRichWebVideoSliderVideos {
  id: number;
  Rich_Web_VSlider_Vid_Title: string;
  Rich_Web_VSlider_Add_Desc: string;
  Rich_Web_VSldier_Add_Img: string;
  Rich_Web_VSldier_Add_Vid: string;
  Rich_Web_VSldier_Add_Src: string;
  Rich_Web_VSldier_Add_Link: string;
  Rich_Web_VSldier_Add_ONT: string;
  Slider_ID: number;
}

export interface WploginRichWebVsEffect10Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_ASSl_L_Show: string;
  Rich_Web_ASSl_LT_Show: string;
  Rich_Web_ASSl_LT: string;
  Rich_Web_ASSl_L_BgC: string;
  Rich_Web_ASSl_L_T: string;
  Rich_Web_ASSl_LT_T: string;
  Rich_Web_ASSl_LT_FS: string;
  Rich_Web_ASSl_LT_FF: string;
  Rich_Web_ASSl_LT_C: string;
  Rich_Web_ASSl_L_T1_C: string;
  Rich_Web_ASSl_L_T2_C: string;
  Rich_Web_ASSl_L_T3_C: string;
  Rich_Web_ASSl_LT_T2_BC: string;
  Rich_Web_ASSl_L_C: string;
  Rich_Web_ASSl_LT_T2_AnC: string;
  Rich_Web_ASSl_LT_T3_BgC: string;
  Rich_Web_ASSl_L_S: string;
  Rich_Web_ASSl_Loading_Show: string;
}

export interface WploginRichWebVsEffect1Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VS_ContSl_L_Show: string;
  Rich_Web_VS_ContSl_LT_Show: string;
  Rich_Web_VS_ContSl_LT: string;
  Rich_Web_VS_ContSl_L_BgC: string;
  Rich_Web_VS_ContSl_L_T: string;
  Rich_Web_VS_ContSl_LT_T: string;
  Rich_Web_VS_ContSl_LT_FS: string;
  Rich_Web_VS_ContSl_LT_FF: string;
  Rich_Web_VS_ContSl_LT_C: string;
  Rich_Web_VS_ContSl_L_T1_C: string;
  Rich_Web_VS_ContSl_L_T2_C: string;
  Rich_Web_VS_ContSl_L_T3_C: string;
  Rich_Web_VS_ContSl_LT_T2_BC: string;
  Rich_Web_VS_ContSl_L_C: string;
  Rich_Web_VS_ContSl_LT_T2_AnC: string;
  Rich_Web_VS_ContSl_LT_T3_BgC: string;
  Rich_Web_VS_ContSl_L_S: string;
  Rich_Web_VS_ContSl_Loading_Show: string;
}

export interface WploginRichWebVsEffect2Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_SlickSl_L_Show: string;
  Rich_Web_SlickSl_LT_Show: string;
  Rich_Web_SlickSl_LT: string;
  Rich_Web_SlickSl_L_BgC: string;
  Rich_Web_SlickSl_L_T: string;
  Rich_Web_SlickSl_LT_T: string;
  Rich_Web_SlickSl_LT_FS: string;
  Rich_Web_SlickSl_LT_FF: string;
  Rich_Web_SlickSl_LT_C: string;
  Rich_Web_SlickSl_L_T1_C: string;
  Rich_Web_SlickSl_L_T2_C: string;
  Rich_Web_SlickSl_L_T3_C: string;
  Rich_Web_SlickSl_LT_T2_BC: string;
  Rich_Web_SlickSl_L_C: string;
  Rich_Web_SlickSl_LT_T2_AnC: string;
  Rich_Web_SlickSl_LT_T3_BgC: string;
  Rich_Web_SlickSl_L_S: string;
  Rich_Web_SlickSl_Loading_Show: string;
}

export interface WploginRichWebVsEffect3Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_ThumbSl_L_Show: string;
  Rich_Web_ThumbSl_LT_Show: string;
  Rich_Web_ThumbSl_LT: string;
  Rich_Web_ThumbSl_L_BgC: string;
  Rich_Web_ThumbSl_L_T: string;
  Rich_Web_ThumbSl_LT_T: string;
  Rich_Web_ThumbSl_LT_FS: string;
  Rich_Web_ThumbSl_LT_FF: string;
  Rich_Web_ThumbSl_LT_C: string;
  Rich_Web_ThumbSl_L_T1_C: string;
  Rich_Web_ThumbSl_L_T2_C: string;
  Rich_Web_ThumbSl_L_T3_C: string;
  Rich_Web_ThumbSl_LT_T2_BC: string;
  Rich_Web_ThumbSl_L_C: string;
  Rich_Web_ThumbSl_LT_T2_AnC: string;
  Rich_Web_ThumbSl_LT_T3_BgC: string;
  Rich_Web_ThumbSl_L_S: string;
  Rich_Web_ThumbSl_Loading_Show: string;
}

export interface WploginRichWebVsEffect4Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VCCP_L_Show: string;
  Rich_Web_VCCP_LT_Show: string;
  Rich_Web_VCCP_LT: string;
  Rich_Web_VCCP_L_BgC: string;
  Rich_Web_VCCP_L_T: string;
  Rich_Web_VCCP_LT_T: string;
  Rich_Web_VCCP_LT_FS: string;
  Rich_Web_VCCP_LT_FF: string;
  Rich_Web_VCCP_LT_C: string;
  Rich_Web_VCCP_L_T1_C: string;
  Rich_Web_VCCP_L_T2_C: string;
  Rich_Web_VCCP_L_T3_C: string;
  Rich_Web_VCCP_LT_T2_BC: string;
  Rich_Web_VCCP_L_C: string;
  Rich_Web_VCCP_LT_T2_AnC: string;
  Rich_Web_VCCP_LT_T3_BgC: string;
  Rich_Web_VCCP_L_S: string;
  Rich_Web_VCCP_Loading_Show: string;
}

export interface WploginRichWebVsEffect5Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_SimpleVS_L_Show: string;
  Rich_Web_SimpleVS_LT_Show: string;
  Rich_Web_SimpleVS_LT: string;
  Rich_Web_SimpleVS_L_BgC: string;
  Rich_Web_SimpleVS_L_T: string;
  Rich_Web_SimpleVS_LT_T: string;
  Rich_Web_SimpleVS_LT_FS: string;
  Rich_Web_SimpleVS_LT_FF: string;
  Rich_Web_SimpleVS_LT_C: string;
  Rich_Web_SimpleVS_L_T1_C: string;
  Rich_Web_SimpleVS_L_T2_C: string;
  Rich_Web_SimpleVS_L_T3_C: string;
  Rich_Web_SimpleVS_LT_T2_BC: string;
  Rich_Web_SimpleVS_L_C: string;
  Rich_Web_SimpleVS_LT_T2_AnC: string;
  Rich_Web_SimpleVS_LT_T3_BgC: string;
  Rich_Web_SimpleVS_L_S: string;
  Rich_Web_SimpleVS_Loading_Show: string;
}

export interface WploginRichWebVsEffect6Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_VSVT_L_Show: string;
  Rich_Web_VSVT_LT_Show: string;
  Rich_Web_VSVT_LT: string;
  Rich_Web_VSVT_L_BgC: string;
  Rich_Web_VSVT_L_T: string;
  Rich_Web_VSVT_LT_T: string;
  Rich_Web_VSVT_LT_FS: string;
  Rich_Web_VSVT_LT_FF: string;
  Rich_Web_VSVT_LT_C: string;
  Rich_Web_VSVT_L_T1_C: string;
  Rich_Web_VSVT_L_T2_C: string;
  Rich_Web_VSVT_L_T3_C: string;
  Rich_Web_VSVT_LT_T2_BC: string;
  Rich_Web_VSVT_L_C: string;
  Rich_Web_VSVT_LT_T2_AnC: string;
  Rich_Web_VSVT_LT_T3_BgC: string;
  Rich_Web_VSVT_L_S: string;
  Rich_Web_VSVT_Loading_Show: string;
}

export interface WploginRichWebVsEffect7Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_HSL_L_Show: string;
  Rich_Web_HSL_LT_Show: string;
  Rich_Web_HSL_LT: string;
  Rich_Web_HSL_L_BgC: string;
  Rich_Web_HSL_L_T: string;
  Rich_Web_HSL_LT_T: string;
  Rich_Web_HSL_LT_FS: string;
  Rich_Web_HSL_LT_FF: string;
  Rich_Web_HSL_LT_C: string;
  Rich_Web_HSL_L_T1_C: string;
  Rich_Web_HSL_L_T2_C: string;
  Rich_Web_HSL_L_T3_C: string;
  Rich_Web_HSL_LT_T2_BC: string;
  Rich_Web_HSL_L_C: string;
  Rich_Web_HSL_LT_T2_AnC: string;
  Rich_Web_HSL_LT_T3_BgC: string;
  Rich_Web_HSL_L_S: string;
  Rich_Web_HSL_Loading_Show: string;
}

export interface WploginRichWebVsEffect8Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_RichSl_L_Show: string;
  Rich_Web_RichSl_LT_Show: string;
  Rich_Web_RichSl_LT: string;
  Rich_Web_RichSl_L_BgC: string;
  Rich_Web_RichSl_L_T: string;
  Rich_Web_RichSl_LT_T: string;
  Rich_Web_RichSl_LT_FS: string;
  Rich_Web_RichSl_LT_FF: string;
  Rich_Web_RichSl_LT_C: string;
  Rich_Web_RichSl_L_T1_C: string;
  Rich_Web_RichSl_L_T2_C: string;
  Rich_Web_RichSl_L_T3_C: string;
  Rich_Web_RichSl_LT_T2_BC: string;
  Rich_Web_RichSl_L_C: string;
  Rich_Web_RichSl_LT_T2_AnC: string;
  Rich_Web_RichSl_LT_T3_BgC: string;
  Rich_Web_RichSl_L_S: string;
  Rich_Web_RichSl_Loading_Show: string;
}

export interface WploginRichWebVsEffect9Loader {
  id: number;
  RW_VS_ID: string;
  Rich_Web_TSL_L_Show: string;
  Rich_Web_TSL_LT_Show: string;
  Rich_Web_TSL_LT: string;
  Rich_Web_TSL_L_BgC: string;
  Rich_Web_TSL_L_T: string;
  Rich_Web_TSL_LT_T: string;
  Rich_Web_TSL_LT_FS: string;
  Rich_Web_TSL_LT_FF: string;
  Rich_Web_TSL_LT_C: string;
  Rich_Web_TSL_L_T1_C: string;
  Rich_Web_TSL_L_T2_C: string;
  Rich_Web_TSL_L_T3_C: string;
  Rich_Web_TSL_LT_T2_BC: string;
  Rich_Web_TSL_L_C: string;
  Rich_Web_TSL_LT_T2_AnC: string;
  Rich_Web_TSL_LT_T3_BgC: string;
  Rich_Web_TSL_L_S: string;
  Rich_Web_TSL_Loading_Show: string;
}

export interface WploginSibModelForms {
  id: number;
  title?: string;
  html?: string;
  css?: string;
  dependTheme: number;
  listID?: string;
  templateID: number;
  confirmID: number;
  isDopt: number;
  isOpt: number;
  redirectInEmail?: string;
  redirectInForm?: string;
  successMsg?: string;
  errorMsg?: string;
  existMsg?: string;
  invalidMsg?: string;
  requiredMsg?: string;
  attributes?: string;
  date: Date | string;
  isDefault: number;
  gCaptcha: number;
  gCaptcha_secret?: string;
  gCaptcha_site?: string;
  selectCaptchaType: number;
  cCaptcha_secret?: string;
  cCaptcha_site?: string;
  cCaptchaStyle?: string;
  cCaptchaType: number;
  termAccept: number;
  termsURL?: string;
}

export interface WploginSibModelUsers {
  id: number;
  email?: string;
  code?: string;
  listIDs?: string;
  redirectUrl?: string;
  info?: string;
  frmid?: number;
  user_added_date: Date | string;
  doi_sent: number;
}

export interface WploginTermRelationships {
  object_id: number;
  term_taxonomy_id: number;
  term_order: number;
}

export interface WploginTermTaxonomy {
  term_taxonomy_id: number;
  term_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
}

export interface WploginTermmeta {
  meta_id: number;
  term_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WploginTerms {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
}

export interface WploginUsermeta {
  umeta_id: number;
  user_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WploginUsers {
  ID: number;
  user_login: string;
  user_pass: string;
  user_nicename: string;
  user_email: string;
  user_url: string;
  user_registered: Date | string;
  user_activation_key: string;
  user_status: number;
  display_name: string;
}

export interface WpstagCommentmeta {
  meta_id: number;
  comment_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpstagComments {
  comment_ID: number;
  comment_post_ID: number;
  comment_author: string;
  comment_author_email: string;
  comment_author_url: string;
  comment_author_IP: string;
  comment_date: Date | string;
  comment_date_gmt: Date | string;
  comment_content: string;
  comment_karma: number;
  comment_approved: string;
  comment_agent: string;
  comment_type: string;
  comment_parent: number;
  user_id: number;
}

export interface WpstagLinks {
  link_id: number;
  link_url: string;
  link_name: string;
  link_image: string;
  link_target: string;
  link_description: string;
  link_visible: string;
  link_owner: number;
  link_rating: number;
  link_updated: Date | string;
  link_rel: string;
  link_notes: string;
  link_rss: string;
}

export interface WpstagOptions {
  option_id: number;
  option_name: string;
  option_value: string;
  autoload: string;
}

export interface WpstagPostmeta {
  meta_id: number;
  post_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpstagPosts {
  ID: number;
  post_author: number;
  post_date: Date | string;
  post_date_gmt: Date | string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: Date | string;
  post_modified_gmt: Date | string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: number;
}

export interface WpstagTermRelationships {
  object_id: number;
  term_taxonomy_id: number;
  term_order: number;
}

export interface WpstagTermTaxonomy {
  term_taxonomy_id: number;
  term_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
}

export interface WpstagTermmeta {
  meta_id: number;
  term_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WpstagTerms {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
}

export interface WptestCommentmeta {
  meta_id: number;
  comment_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WptestComments {
  comment_ID: number;
  comment_post_ID: number;
  comment_author: string;
  comment_author_email: string;
  comment_author_url: string;
  comment_author_IP: string;
  comment_date: Date | string;
  comment_date_gmt: Date | string;
  comment_content: string;
  comment_karma: number;
  comment_approved: string;
  comment_agent: string;
  comment_type: string;
  comment_parent: number;
  user_id: number;
}

export interface WptestLinks {
  link_id: number;
  link_url: string;
  link_name: string;
  link_image: string;
  link_target: string;
  link_description: string;
  link_visible: string;
  link_owner: number;
  link_rating: number;
  link_updated: Date | string;
  link_rel: string;
  link_notes: string;
  link_rss: string;
}

export interface WptestOptions {
  option_id: number;
  option_name: string;
  option_value: string;
  autoload: string;
}

export interface WptestPostmeta {
  meta_id: number;
  post_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WptestPosts {
  ID: number;
  post_author: number;
  post_date: Date | string;
  post_date_gmt: Date | string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: Date | string;
  post_modified_gmt: Date | string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: number;
}

export interface WptestTermRelationships {
  object_id: number;
  term_taxonomy_id: number;
  term_order: number;
}

export interface WptestTermTaxonomy {
  term_taxonomy_id: number;
  term_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
}

export interface WptestTermmeta {
  meta_id: number;
  term_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WptestTerms {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
}

export interface WptestUsermeta {
  umeta_id: number;
  user_id: number;
  meta_key?: string;
  meta_value?: string;
}

export interface WptestUsers {
  ID: number;
  user_login: string;
  user_pass: string;
  user_nicename: string;
  user_email: string;
  user_url: string;
  user_registered: Date | string;
  user_activation_key: string;
  user_status: number;
  display_name: string;
}

