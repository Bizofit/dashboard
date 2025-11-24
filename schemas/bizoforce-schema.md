# BIZOFORCE Database Schema

**Database Type:** mysql
**Total Tables:** 732
**Generated:** 11/22/2025, 12:50:32 PM

---

## Table of Contents

1. [fm_slider](#fm-slider)
2. [gwgo_actionscheduler_actions](#gwgo-actionscheduler-actions)
3. [gwgo_actionscheduler_claims](#gwgo-actionscheduler-claims)
4. [gwgo_actionscheduler_groups](#gwgo-actionscheduler-groups)
5. [gwgo_actionscheduler_logs](#gwgo-actionscheduler-logs)
6. [gwgo_admin_columns](#gwgo-admin-columns)
7. [gwgo_aioseo_cache](#gwgo-aioseo-cache)
8. [gwgo_aioseo_notifications](#gwgo-aioseo-notifications)
9. [gwgo_aioseo_posts](#gwgo-aioseo-posts)
10. [gwgo_aioseo_seo_analyzer_results](#gwgo-aioseo-seo-analyzer-results)
11. [gwgo_categorymeta](#gwgo-categorymeta)
12. [gwgo_cky_banners](#gwgo-cky-banners)
13. [gwgo_cky_cookie_categories](#gwgo-cky-cookie-categories)
14. [gwgo_cky_cookies](#gwgo-cky-cookies)
15. [gwgo_cli_scripts](#gwgo-cli-scripts)
16. [gwgo_commentmeta](#gwgo-commentmeta)
17. [gwgo_comments](#gwgo-comments)
18. [gwgo_company_faqs](#gwgo-company-faqs)
19. [gwgo_cpk_wpcsv_export_queue](#gwgo-cpk-wpcsv-export-queue)
20. [gwgo_cpk_wpcsv_log](#gwgo-cpk-wpcsv-log)
21. [gwgo_e_events](#gwgo-e-events)
22. [gwgo_frmt_form_entry](#gwgo-frmt-form-entry)
23. [gwgo_frmt_form_entry_meta](#gwgo-frmt-form-entry-meta)
24. [gwgo_frmt_form_reports](#gwgo-frmt-form-reports)
25. [gwgo_frmt_form_views](#gwgo-frmt-form-views)
26. [gwgo_links](#gwgo-links)
27. [gwgo_listings_ratings_and_reviews](#gwgo-listings-ratings-and-reviews)
28. [gwgo_mailster_action_bounces](#gwgo-mailster-action-bounces)
29. [gwgo_mailster_action_clicks](#gwgo-mailster-action-clicks)
30. [gwgo_mailster_action_errors](#gwgo-mailster-action-errors)
31. [gwgo_mailster_action_opens](#gwgo-mailster-action-opens)
32. [gwgo_mailster_action_sent](#gwgo-mailster-action-sent)
33. [gwgo_mailster_action_unsubs](#gwgo-mailster-action-unsubs)
34. [gwgo_mailster_actions](#gwgo-mailster-actions)
35. [gwgo_mailster_form_fields](#gwgo-mailster-form-fields)
36. [gwgo_mailster_forms](#gwgo-mailster-forms)
37. [gwgo_mailster_forms_lists](#gwgo-mailster-forms-lists)
38. [gwgo_mailster_forms_tags](#gwgo-mailster-forms-tags)
39. [gwgo_mailster_links](#gwgo-mailster-links)
40. [gwgo_mailster_lists](#gwgo-mailster-lists)
41. [gwgo_mailster_lists_subscribers](#gwgo-mailster-lists-subscribers)
42. [gwgo_mailster_logs](#gwgo-mailster-logs)
43. [gwgo_mailster_queue](#gwgo-mailster-queue)
44. [gwgo_mailster_subscriber_fields](#gwgo-mailster-subscriber-fields)
45. [gwgo_mailster_subscriber_meta](#gwgo-mailster-subscriber-meta)
46. [gwgo_mailster_subscribers](#gwgo-mailster-subscribers)
47. [gwgo_mailster_tags](#gwgo-mailster-tags)
48. [gwgo_mailster_tags_subscribers](#gwgo-mailster-tags-subscribers)
49. [gwgo_mdf_query_cache](#gwgo-mdf-query-cache)
50. [gwgo_mdf_stat_buffer](#gwgo-mdf-stat-buffer)
51. [gwgo_mdf_stat_tmp](#gwgo-mdf-stat-tmp)
52. [gwgo_mwai_filemeta](#gwgo-mwai-filemeta)
53. [gwgo_mwai_files](#gwgo-mwai-files)
54. [gwgo_myCRED_log](#gwgo-mycred-log)
55. [gwgo_nf3_action_meta](#gwgo-nf3-action-meta)
56. [gwgo_nf3_actions](#gwgo-nf3-actions)
57. [gwgo_nf3_chunks](#gwgo-nf3-chunks)
58. [gwgo_nf3_field_meta](#gwgo-nf3-field-meta)
59. [gwgo_nf3_fields](#gwgo-nf3-fields)
60. [gwgo_nf3_form_meta](#gwgo-nf3-form-meta)
61. [gwgo_nf3_forms](#gwgo-nf3-forms)
62. [gwgo_nf3_object_meta](#gwgo-nf3-object-meta)
63. [gwgo_nf3_objects](#gwgo-nf3-objects)
64. [gwgo_nf3_relationships](#gwgo-nf3-relationships)
65. [gwgo_nf3_upgrades](#gwgo-nf3-upgrades)
66. [gwgo_nxs_log](#gwgo-nxs-log)
67. [gwgo_options](#gwgo-options)
68. [gwgo_pmxe_exports](#gwgo-pmxe-exports)
69. [gwgo_pmxe_google_cats](#gwgo-pmxe-google-cats)
70. [gwgo_pmxe_posts](#gwgo-pmxe-posts)
71. [gwgo_pmxe_templates](#gwgo-pmxe-templates)
72. [gwgo_pmxi_files](#gwgo-pmxi-files)
73. [gwgo_pmxi_history](#gwgo-pmxi-history)
74. [gwgo_pmxi_images](#gwgo-pmxi-images)
75. [gwgo_pmxi_imports](#gwgo-pmxi-imports)
76. [gwgo_pmxi_posts](#gwgo-pmxi-posts)
77. [gwgo_pmxi_templates](#gwgo-pmxi-templates)
78. [gwgo_postmeta](#gwgo-postmeta)
79. [gwgo_posts](#gwgo-posts)
80. [gwgo_pps_countries](#gwgo-pps-countries)
81. [gwgo_pps_popup](#gwgo-pps-popup)
82. [gwgo_pps_popup_show_categories](#gwgo-pps-popup-show-categories)
83. [gwgo_product_brandmeta](#gwgo-product-brandmeta)
84. [gwgo_product_catmeta](#gwgo-product-catmeta)
85. [gwgo_pts_modules](#gwgo-pts-modules)
86. [gwgo_pts_modules_type](#gwgo-pts-modules-type)
87. [gwgo_pts_tables](#gwgo-pts-tables)
88. [gwgo_pts_usage_stat](#gwgo-pts-usage-stat)
89. [gwgo_pum_subscribers](#gwgo-pum-subscribers)
90. [gwgo_pv_commission](#gwgo-pv-commission)
91. [gwgo_pvc_daily](#gwgo-pvc-daily)
92. [gwgo_pvc_total](#gwgo-pvc-total)
93. [gwgo_redirection_404](#gwgo-redirection-404)
94. [gwgo_redirection_groups](#gwgo-redirection-groups)
95. [gwgo_redirection_items](#gwgo-redirection-items)
96. [gwgo_redirection_logs](#gwgo-redirection-logs)
97. [gwgo_responsive_thumbnail_slider](#gwgo-responsive-thumbnail-slider)
98. [gwgo_reviewx_criterias](#gwgo-reviewx-criterias)
99. [gwgo_reviewx_import_history](#gwgo-reviewx-import-history)
100. [gwgo_reviewx_process_jobs](#gwgo-reviewx-process-jobs)
101. [gwgo_reviewx_reminder_email](#gwgo-reviewx-reminder-email)
102. [gwgo_rich_web_video_slider_effects_data](#gwgo-rich-web-video-slider-effects-data)
103. [gwgo_rich_web_video_slider_font_family](#gwgo-rich-web-video-slider-font-family)
104. [gwgo_rich_web_video_slider_id](#gwgo-rich-web-video-slider-id)
105. [gwgo_rich_web_video_slider_manager](#gwgo-rich-web-video-slider-manager)
106. [gwgo_rich_web_video_slider_videos](#gwgo-rich-web-video-slider-videos)
107. [gwgo_rich_web_vs_effect_10_loader](#gwgo-rich-web-vs-effect-10-loader)
108. [gwgo_rich_web_vs_effect_1_loader](#gwgo-rich-web-vs-effect-1-loader)
109. [gwgo_rich_web_vs_effect_2_loader](#gwgo-rich-web-vs-effect-2-loader)
110. [gwgo_rich_web_vs_effect_3_loader](#gwgo-rich-web-vs-effect-3-loader)
111. [gwgo_rich_web_vs_effect_4_loader](#gwgo-rich-web-vs-effect-4-loader)
112. [gwgo_rich_web_vs_effect_5_loader](#gwgo-rich-web-vs-effect-5-loader)
113. [gwgo_rich_web_vs_effect_6_loader](#gwgo-rich-web-vs-effect-6-loader)
114. [gwgo_rich_web_vs_effect_7_loader](#gwgo-rich-web-vs-effect-7-loader)
115. [gwgo_rich_web_vs_effect_8_loader](#gwgo-rich-web-vs-effect-8-loader)
116. [gwgo_rich_web_vs_effect_9_loader](#gwgo-rich-web-vs-effect-9-loader)
117. [gwgo_sb_infinite_scroll](#gwgo-sb-infinite-scroll)
118. [gwgo_signups](#gwgo-signups)
119. [gwgo_simpleviews](#gwgo-simpleviews)
120. [gwgo_snippets](#gwgo-snippets)
121. [gwgo_term_relationships](#gwgo-term-relationships)
122. [gwgo_term_taxonomy](#gwgo-term-taxonomy)
123. [gwgo_termmeta](#gwgo-termmeta)
124. [gwgo_terms](#gwgo-terms)
125. [gwgo_thumbnail_slider](#gwgo-thumbnail-slider)
126. [gwgo_tm_taskmeta](#gwgo-tm-taskmeta)
127. [gwgo_tm_tasks](#gwgo-tm-tasks)
128. [gwgo_usermeta](#gwgo-usermeta)
129. [gwgo_users](#gwgo-users)
130. [gwgo_wc_admin_note_actions](#gwgo-wc-admin-note-actions)
131. [gwgo_wc_admin_notes](#gwgo-wc-admin-notes)
132. [gwgo_wc_category_lookup](#gwgo-wc-category-lookup)
133. [gwgo_wc_customer_lookup](#gwgo-wc-customer-lookup)
134. [gwgo_wc_download_log](#gwgo-wc-download-log)
135. [gwgo_wc_order_coupon_lookup](#gwgo-wc-order-coupon-lookup)
136. [gwgo_wc_order_product_lookup](#gwgo-wc-order-product-lookup)
137. [gwgo_wc_order_stats](#gwgo-wc-order-stats)
138. [gwgo_wc_order_tax_lookup](#gwgo-wc-order-tax-lookup)
139. [gwgo_wc_product_meta_lookup](#gwgo-wc-product-meta-lookup)
140. [gwgo_wc_reserved_stock](#gwgo-wc-reserved-stock)
141. [gwgo_wc_tax_rate_classes](#gwgo-wc-tax-rate-classes)
142. [gwgo_wc_webhooks](#gwgo-wc-webhooks)
143. [gwgo_wcv_feedback](#gwgo-wcv-feedback)
144. [gwgo_woocommerce_api_keys](#gwgo-woocommerce-api-keys)
145. [gwgo_woocommerce_attribute_taxonomies](#gwgo-woocommerce-attribute-taxonomies)
146. [gwgo_woocommerce_downloadable_product_permissions](#gwgo-woocommerce-downloadable-product-permissions)
147. [gwgo_woocommerce_log](#gwgo-woocommerce-log)
148. [gwgo_woocommerce_order_itemmeta](#gwgo-woocommerce-order-itemmeta)
149. [gwgo_woocommerce_order_items](#gwgo-woocommerce-order-items)
150. [gwgo_woocommerce_payment_tokenmeta](#gwgo-woocommerce-payment-tokenmeta)
151. [gwgo_woocommerce_payment_tokens](#gwgo-woocommerce-payment-tokens)
152. [gwgo_woocommerce_sessions](#gwgo-woocommerce-sessions)
153. [gwgo_woocommerce_shipping_zone_locations](#gwgo-woocommerce-shipping-zone-locations)
154. [gwgo_woocommerce_shipping_zone_methods](#gwgo-woocommerce-shipping-zone-methods)
155. [gwgo_woocommerce_shipping_zones](#gwgo-woocommerce-shipping-zones)
156. [gwgo_woocommerce_tax_rate_locations](#gwgo-woocommerce-tax-rate-locations)
157. [gwgo_woocommerce_tax_rates](#gwgo-woocommerce-tax-rates)
158. [gwgo_wow_mwp](#gwgo-wow-mwp)
159. [gwgo_wp125_ads](#gwgo-wp125-ads)
160. [gwgo_wpaie_file_manager](#gwgo-wpaie-file-manager)
161. [gwgo_wpbdp_fees](#gwgo-wpbdp-fees)
162. [gwgo_wpbdp_form_fields](#gwgo-wpbdp-form-fields)
163. [gwgo_wpbdp_listing_claims](#gwgo-wpbdp-listing-claims)
164. [gwgo_wpbdp_listing_fees](#gwgo-wpbdp-listing-fees)
165. [gwgo_wpbdp_listings](#gwgo-wpbdp-listings)
166. [gwgo_wpbdp_logs](#gwgo-wpbdp-logs)
167. [gwgo_wpbdp_payments](#gwgo-wpbdp-payments)
168. [gwgo_wpbdp_payments_items](#gwgo-wpbdp-payments-items)
169. [gwgo_wpbdp_plans](#gwgo-wpbdp-plans)
170. [gwgo_wpbdp_ratings](#gwgo-wpbdp-ratings)
171. [gwgo_wpbdp_regionmeta](#gwgo-wpbdp-regionmeta)
172. [gwgo_wpbdp_submit_state](#gwgo-wpbdp-submit-state)
173. [gwgo_wpbdp_x_featured_levels](#gwgo-wpbdp-x-featured-levels)
174. [gwgo_wpbdp_zipcodes](#gwgo-wpbdp-zipcodes)
175. [gwgo_wpbdp_zipcodes_listings](#gwgo-wpbdp-zipcodes-listings)
176. [gwgo_wpfm_backup](#gwgo-wpfm-backup)
177. [gwgo_wpforms_payment_meta](#gwgo-wpforms-payment-meta)
178. [gwgo_wpforms_payments](#gwgo-wpforms-payments)
179. [gwgo_wpforms_tasks_meta](#gwgo-wpforms-tasks-meta)
180. [gwgo_wpmailsmtp_debug_events](#gwgo-wpmailsmtp-debug-events)
181. [gwgo_wpmailsmtp_tasks_meta](#gwgo-wpmailsmtp-tasks-meta)
182. [gwgo_wt_iew_action_history](#gwgo-wt-iew-action-history)
183. [gwgo_wt_iew_mapping_template](#gwgo-wt-iew-mapping-template)
184. [gwgo_yoast_indexable](#gwgo-yoast-indexable)
185. [gwgo_yoast_indexable_hierarchy](#gwgo-yoast-indexable-hierarchy)
186. [gwgo_yoast_migrations](#gwgo-yoast-migrations)
187. [gwgo_yoast_primary_term](#gwgo-yoast-primary-term)
188. [gwgo_yoast_seo_links](#gwgo-yoast-seo-links)
189. [gwgo_yoast_seo_meta](#gwgo-yoast-seo-meta)
190. [mdf_charts](#mdf-charts)
191. [mdf_google_catcher](#mdf-google-catcher)
192. [mdf_query_cache](#mdf-query-cache)
193. [sib_model_contact](#sib-model-contact)
194. [smackuci_events](#smackuci-events)
195. [smackuci_history](#smackuci-history)
196. [wp_actionscheduler_actions](#wp-actionscheduler-actions)
197. [wp_actionscheduler_claims](#wp-actionscheduler-claims)
198. [wp_actionscheduler_groups](#wp-actionscheduler-groups)
199. [wp_actionscheduler_logs](#wp-actionscheduler-logs)
200. [wp_admin_columns](#wp-admin-columns)
201. [wp_aioseo_cache](#wp-aioseo-cache)
202. [wp_aioseo_notifications](#wp-aioseo-notifications)
203. [wp_aioseo_posts](#wp-aioseo-posts)
204. [wp_aioseo_seo_analyzer_results](#wp-aioseo-seo-analyzer-results)
205. [wp_categorymeta](#wp-categorymeta)
206. [wp_cky_banners](#wp-cky-banners)
207. [wp_cky_cookie_categories](#wp-cky-cookie-categories)
208. [wp_cky_cookies](#wp-cky-cookies)
209. [wp_cli_scripts](#wp-cli-scripts)
210. [wp_commentmeta](#wp-commentmeta)
211. [wp_comments](#wp-comments)
212. [wp_company_faqs](#wp-company-faqs)
213. [wp_cpk_wpcsv_export_queue](#wp-cpk-wpcsv-export-queue)
214. [wp_cpk_wpcsv_log](#wp-cpk-wpcsv-log)
215. [wp_e_events](#wp-e-events)
216. [wp_frmt_form_entry](#wp-frmt-form-entry)
217. [wp_frmt_form_entry_meta](#wp-frmt-form-entry-meta)
218. [wp_frmt_form_reports](#wp-frmt-form-reports)
219. [wp_frmt_form_views](#wp-frmt-form-views)
220. [wp_links](#wp-links)
221. [wp_listings_ratings_and_reviews](#wp-listings-ratings-and-reviews)
222. [wp_mailster_action_bounces](#wp-mailster-action-bounces)
223. [wp_mailster_action_clicks](#wp-mailster-action-clicks)
224. [wp_mailster_action_errors](#wp-mailster-action-errors)
225. [wp_mailster_action_opens](#wp-mailster-action-opens)
226. [wp_mailster_action_sent](#wp-mailster-action-sent)
227. [wp_mailster_action_unsubs](#wp-mailster-action-unsubs)
228. [wp_mailster_actions](#wp-mailster-actions)
229. [wp_mailster_form_fields](#wp-mailster-form-fields)
230. [wp_mailster_forms](#wp-mailster-forms)
231. [wp_mailster_forms_lists](#wp-mailster-forms-lists)
232. [wp_mailster_forms_tags](#wp-mailster-forms-tags)
233. [wp_mailster_links](#wp-mailster-links)
234. [wp_mailster_lists](#wp-mailster-lists)
235. [wp_mailster_lists_subscribers](#wp-mailster-lists-subscribers)
236. [wp_mailster_logs](#wp-mailster-logs)
237. [wp_mailster_queue](#wp-mailster-queue)
238. [wp_mailster_subscriber_fields](#wp-mailster-subscriber-fields)
239. [wp_mailster_subscriber_meta](#wp-mailster-subscriber-meta)
240. [wp_mailster_subscribers](#wp-mailster-subscribers)
241. [wp_mailster_tags](#wp-mailster-tags)
242. [wp_mailster_tags_subscribers](#wp-mailster-tags-subscribers)
243. [wp_mdf_query_cache](#wp-mdf-query-cache)
244. [wp_mdf_stat_buffer](#wp-mdf-stat-buffer)
245. [wp_mdf_stat_tmp](#wp-mdf-stat-tmp)
246. [wp_mwai_filemeta](#wp-mwai-filemeta)
247. [wp_mwai_files](#wp-mwai-files)
248. [wp_myCRED_log](#wp-mycred-log)
249. [wp_nf3_action_meta](#wp-nf3-action-meta)
250. [wp_nf3_actions](#wp-nf3-actions)
251. [wp_nf3_chunks](#wp-nf3-chunks)
252. [wp_nf3_field_meta](#wp-nf3-field-meta)
253. [wp_nf3_fields](#wp-nf3-fields)
254. [wp_nf3_form_meta](#wp-nf3-form-meta)
255. [wp_nf3_forms](#wp-nf3-forms)
256. [wp_nf3_object_meta](#wp-nf3-object-meta)
257. [wp_nf3_objects](#wp-nf3-objects)
258. [wp_nf3_relationships](#wp-nf3-relationships)
259. [wp_nf3_upgrades](#wp-nf3-upgrades)
260. [wp_nxs_log](#wp-nxs-log)
261. [wp_options](#wp-options)
262. [wp_pmxe_exports](#wp-pmxe-exports)
263. [wp_pmxe_google_cats](#wp-pmxe-google-cats)
264. [wp_pmxe_posts](#wp-pmxe-posts)
265. [wp_pmxe_templates](#wp-pmxe-templates)
266. [wp_pmxi_files](#wp-pmxi-files)
267. [wp_pmxi_history](#wp-pmxi-history)
268. [wp_pmxi_images](#wp-pmxi-images)
269. [wp_pmxi_imports](#wp-pmxi-imports)
270. [wp_pmxi_posts](#wp-pmxi-posts)
271. [wp_pmxi_templates](#wp-pmxi-templates)
272. [wp_postmeta](#wp-postmeta)
273. [wp_posts](#wp-posts)
274. [wp_pps_countries](#wp-pps-countries)
275. [wp_pps_popup](#wp-pps-popup)
276. [wp_pps_popup_show_categories](#wp-pps-popup-show-categories)
277. [wp_product_brandmeta](#wp-product-brandmeta)
278. [wp_product_catmeta](#wp-product-catmeta)
279. [wp_pts_modules](#wp-pts-modules)
280. [wp_pts_modules_type](#wp-pts-modules-type)
281. [wp_pts_tables](#wp-pts-tables)
282. [wp_pts_usage_stat](#wp-pts-usage-stat)
283. [wp_pum_subscribers](#wp-pum-subscribers)
284. [wp_pv_commission](#wp-pv-commission)
285. [wp_pvc_daily](#wp-pvc-daily)
286. [wp_pvc_total](#wp-pvc-total)
287. [wp_redirection_404](#wp-redirection-404)
288. [wp_redirection_groups](#wp-redirection-groups)
289. [wp_redirection_items](#wp-redirection-items)
290. [wp_redirection_logs](#wp-redirection-logs)
291. [wp_responsive_thumbnail_slider](#wp-responsive-thumbnail-slider)
292. [wp_reviewx_criterias](#wp-reviewx-criterias)
293. [wp_reviewx_import_history](#wp-reviewx-import-history)
294. [wp_reviewx_process_jobs](#wp-reviewx-process-jobs)
295. [wp_reviewx_reminder_email](#wp-reviewx-reminder-email)
296. [wp_rich_web_video_slider_effects_data](#wp-rich-web-video-slider-effects-data)
297. [wp_rich_web_video_slider_font_family](#wp-rich-web-video-slider-font-family)
298. [wp_rich_web_video_slider_id](#wp-rich-web-video-slider-id)
299. [wp_rich_web_video_slider_manager](#wp-rich-web-video-slider-manager)
300. [wp_rich_web_video_slider_videos](#wp-rich-web-video-slider-videos)
301. [wp_rich_web_vs_effect_10_loader](#wp-rich-web-vs-effect-10-loader)
302. [wp_rich_web_vs_effect_1_loader](#wp-rich-web-vs-effect-1-loader)
303. [wp_rich_web_vs_effect_2_loader](#wp-rich-web-vs-effect-2-loader)
304. [wp_rich_web_vs_effect_3_loader](#wp-rich-web-vs-effect-3-loader)
305. [wp_rich_web_vs_effect_4_loader](#wp-rich-web-vs-effect-4-loader)
306. [wp_rich_web_vs_effect_5_loader](#wp-rich-web-vs-effect-5-loader)
307. [wp_rich_web_vs_effect_6_loader](#wp-rich-web-vs-effect-6-loader)
308. [wp_rich_web_vs_effect_7_loader](#wp-rich-web-vs-effect-7-loader)
309. [wp_rich_web_vs_effect_8_loader](#wp-rich-web-vs-effect-8-loader)
310. [wp_rich_web_vs_effect_9_loader](#wp-rich-web-vs-effect-9-loader)
311. [wp_sb_infinite_scroll](#wp-sb-infinite-scroll)
312. [wp_signups](#wp-signups)
313. [wp_simpleviews](#wp-simpleviews)
314. [wp_snippets](#wp-snippets)
315. [wp_term_relationships](#wp-term-relationships)
316. [wp_term_taxonomy](#wp-term-taxonomy)
317. [wp_termmeta](#wp-termmeta)
318. [wp_terms](#wp-terms)
319. [wp_thumbnail_slider](#wp-thumbnail-slider)
320. [wp_tm_taskmeta](#wp-tm-taskmeta)
321. [wp_tm_tasks](#wp-tm-tasks)
322. [wp_usermeta](#wp-usermeta)
323. [wp_users](#wp-users)
324. [wp_wc_admin_note_actions](#wp-wc-admin-note-actions)
325. [wp_wc_admin_notes](#wp-wc-admin-notes)
326. [wp_wc_category_lookup](#wp-wc-category-lookup)
327. [wp_wc_customer_lookup](#wp-wc-customer-lookup)
328. [wp_wc_download_log](#wp-wc-download-log)
329. [wp_wc_order_coupon_lookup](#wp-wc-order-coupon-lookup)
330. [wp_wc_order_product_lookup](#wp-wc-order-product-lookup)
331. [wp_wc_order_stats](#wp-wc-order-stats)
332. [wp_wc_order_tax_lookup](#wp-wc-order-tax-lookup)
333. [wp_wc_product_meta_lookup](#wp-wc-product-meta-lookup)
334. [wp_wc_reserved_stock](#wp-wc-reserved-stock)
335. [wp_wc_tax_rate_classes](#wp-wc-tax-rate-classes)
336. [wp_wc_webhooks](#wp-wc-webhooks)
337. [wp_wcv_feedback](#wp-wcv-feedback)
338. [wp_wcv_reports_cache](#wp-wcv-reports-cache)
339. [wp_woocommerce_api_keys](#wp-woocommerce-api-keys)
340. [wp_woocommerce_attribute_taxonomies](#wp-woocommerce-attribute-taxonomies)
341. [wp_woocommerce_downloadable_product_permissions](#wp-woocommerce-downloadable-product-permissions)
342. [wp_woocommerce_log](#wp-woocommerce-log)
343. [wp_woocommerce_order_itemmeta](#wp-woocommerce-order-itemmeta)
344. [wp_woocommerce_order_items](#wp-woocommerce-order-items)
345. [wp_woocommerce_payment_tokenmeta](#wp-woocommerce-payment-tokenmeta)
346. [wp_woocommerce_payment_tokens](#wp-woocommerce-payment-tokens)
347. [wp_woocommerce_sessions](#wp-woocommerce-sessions)
348. [wp_woocommerce_shipping_zone_locations](#wp-woocommerce-shipping-zone-locations)
349. [wp_woocommerce_shipping_zone_methods](#wp-woocommerce-shipping-zone-methods)
350. [wp_woocommerce_shipping_zones](#wp-woocommerce-shipping-zones)
351. [wp_woocommerce_tax_rate_locations](#wp-woocommerce-tax-rate-locations)
352. [wp_woocommerce_tax_rates](#wp-woocommerce-tax-rates)
353. [wp_wow_mwp](#wp-wow-mwp)
354. [wp_wp125_ads](#wp-wp125-ads)
355. [wp_wpaie_file_manager](#wp-wpaie-file-manager)
356. [wp_wpbdp_fees](#wp-wpbdp-fees)
357. [wp_wpbdp_form_fields](#wp-wpbdp-form-fields)
358. [wp_wpbdp_listing_claims](#wp-wpbdp-listing-claims)
359. [wp_wpbdp_listing_fees](#wp-wpbdp-listing-fees)
360. [wp_wpbdp_listings](#wp-wpbdp-listings)
361. [wp_wpbdp_logs](#wp-wpbdp-logs)
362. [wp_wpbdp_payments](#wp-wpbdp-payments)
363. [wp_wpbdp_payments_items](#wp-wpbdp-payments-items)
364. [wp_wpbdp_plans](#wp-wpbdp-plans)
365. [wp_wpbdp_ratings](#wp-wpbdp-ratings)
366. [wp_wpbdp_regionmeta](#wp-wpbdp-regionmeta)
367. [wp_wpbdp_submit_state](#wp-wpbdp-submit-state)
368. [wp_wpbdp_x_featured_levels](#wp-wpbdp-x-featured-levels)
369. [wp_wpbdp_zipcodes](#wp-wpbdp-zipcodes)
370. [wp_wpbdp_zipcodes_listings](#wp-wpbdp-zipcodes-listings)
371. [wp_wpfm_backup](#wp-wpfm-backup)
372. [wp_wpforms_payment_meta](#wp-wpforms-payment-meta)
373. [wp_wpforms_payments](#wp-wpforms-payments)
374. [wp_wpforms_tasks_meta](#wp-wpforms-tasks-meta)
375. [wp_wpmailsmtp_debug_events](#wp-wpmailsmtp-debug-events)
376. [wp_wpmailsmtp_tasks_meta](#wp-wpmailsmtp-tasks-meta)
377. [wp_wt_iew_action_history](#wp-wt-iew-action-history)
378. [wp_wt_iew_mapping_template](#wp-wt-iew-mapping-template)
379. [wp_yoast_indexable](#wp-yoast-indexable)
380. [wp_yoast_indexable_hierarchy](#wp-yoast-indexable-hierarchy)
381. [wp_yoast_migrations](#wp-yoast-migrations)
382. [wp_yoast_primary_term](#wp-yoast-primary-term)
383. [wp_yoast_seo_links](#wp-yoast-seo-links)
384. [wp_yoast_seo_meta](#wp-yoast-seo-meta)
385. [wpblog_commentmeta](#wpblog-commentmeta)
386. [wpblog_comments](#wpblog-comments)
387. [wpblog_gks_sliders](#wpblog-gks-sliders)
388. [wpblog_gks_slides](#wpblog-gks-slides)
389. [wpblog_gmedia](#wpblog-gmedia)
390. [wpblog_gmedia_log](#wpblog-gmedia-log)
391. [wpblog_gmedia_meta](#wpblog-gmedia-meta)
392. [wpblog_gmedia_term](#wpblog-gmedia-term)
393. [wpblog_gmedia_term_meta](#wpblog-gmedia-term-meta)
394. [wpblog_gmedia_term_relationships](#wpblog-gmedia-term-relationships)
395. [wpblog_links](#wpblog-links)
396. [wpblog_mailster_actions](#wpblog-mailster-actions)
397. [wpblog_mailster_form_fields](#wpblog-mailster-form-fields)
398. [wpblog_mailster_forms](#wpblog-mailster-forms)
399. [wpblog_mailster_forms_lists](#wpblog-mailster-forms-lists)
400. [wpblog_mailster_links](#wpblog-mailster-links)
401. [wpblog_mailster_lists](#wpblog-mailster-lists)
402. [wpblog_mailster_lists_subscribers](#wpblog-mailster-lists-subscribers)
403. [wpblog_mailster_queue](#wpblog-mailster-queue)
404. [wpblog_mailster_subscriber_fields](#wpblog-mailster-subscriber-fields)
405. [wpblog_mailster_subscriber_meta](#wpblog-mailster-subscriber-meta)
406. [wpblog_mailster_subscribers](#wpblog-mailster-subscribers)
407. [wpblog_nextend2_image_storage](#wpblog-nextend2-image-storage)
408. [wpblog_nextend2_section_storage](#wpblog-nextend2-section-storage)
409. [wpblog_nextend2_smartslider3_generators](#wpblog-nextend2-smartslider3-generators)
410. [wpblog_nextend2_smartslider3_sliders](#wpblog-nextend2-smartslider3-sliders)
411. [wpblog_nextend2_smartslider3_sliders_xref](#wpblog-nextend2-smartslider3-sliders-xref)
412. [wpblog_nextend2_smartslider3_slides](#wpblog-nextend2-smartslider3-slides)
413. [wpblog_options](#wpblog-options)
414. [wpblog_origincode_videogallery_galleries](#wpblog-origincode-videogallery-galleries)
415. [wpblog_origincode_videoorigincode_gallery_videos](#wpblog-origincode-videoorigincode-gallery-videos)
416. [wpblog_postmeta](#wpblog-postmeta)
417. [wpblog_posts](#wpblog-posts)
418. [wpblog_push_encryption_keys](#wpblog-push-encryption-keys)
419. [wpblog_push_excluded_categories](#wpblog-push-excluded-categories)
420. [wpblog_push_logs](#wpblog-push-logs)
421. [wpblog_push_notifications](#wpblog-push-notifications)
422. [wpblog_push_sent](#wpblog-push-sent)
423. [wpblog_push_subscribers](#wpblog-push-subscribers)
424. [wpblog_push_tokens](#wpblog-push-tokens)
425. [wpblog_push_viewed](#wpblog-push-viewed)
426. [wpblog_responsive_video_gallery_plus_responsive_lightbox](#wpblog-responsive-video-gallery-plus-responsive-lightbox)
427. [wpblog_rich_web_photo_slider_instal](#wpblog-rich-web-photo-slider-instal)
428. [wpblog_rich_web_photo_slider_instal_video](#wpblog-rich-web-photo-slider-instal-video)
429. [wpblog_rich_web_photo_slider_manager](#wpblog-rich-web-photo-slider-manager)
430. [wpblog_rich_web_slider_effect4](#wpblog-rich-web-slider-effect4)
431. [wpblog_rich_web_slider_effect9](#wpblog-rich-web-slider-effect9)
432. [wpblog_rich_web_slider_effects_data](#wpblog-rich-web-slider-effects-data)
433. [wpblog_rich_web_slider_font_family](#wpblog-rich-web-slider-font-family)
434. [wpblog_rich_web_slider_id](#wpblog-rich-web-slider-id)
435. [wpblog_rich_web_video_slider_effects_data](#wpblog-rich-web-video-slider-effects-data)
436. [wpblog_rich_web_video_slider_font_family](#wpblog-rich-web-video-slider-font-family)
437. [wpblog_rich_web_video_slider_id](#wpblog-rich-web-video-slider-id)
438. [wpblog_rich_web_video_slider_manager](#wpblog-rich-web-video-slider-manager)
439. [wpblog_rich_web_video_slider_videos](#wpblog-rich-web-video-slider-videos)
440. [wpblog_rich_web_vs_effect_1](#wpblog-rich-web-vs-effect-1)
441. [wpblog_rich_web_vs_effect_10](#wpblog-rich-web-vs-effect-10)
442. [wpblog_rich_web_vs_effect_10_loader](#wpblog-rich-web-vs-effect-10-loader)
443. [wpblog_rich_web_vs_effect_1_loader](#wpblog-rich-web-vs-effect-1-loader)
444. [wpblog_rich_web_vs_effect_2](#wpblog-rich-web-vs-effect-2)
445. [wpblog_rich_web_vs_effect_2_loader](#wpblog-rich-web-vs-effect-2-loader)
446. [wpblog_rich_web_vs_effect_3](#wpblog-rich-web-vs-effect-3)
447. [wpblog_rich_web_vs_effect_3_loader](#wpblog-rich-web-vs-effect-3-loader)
448. [wpblog_rich_web_vs_effect_4](#wpblog-rich-web-vs-effect-4)
449. [wpblog_rich_web_vs_effect_4_loader](#wpblog-rich-web-vs-effect-4-loader)
450. [wpblog_rich_web_vs_effect_5](#wpblog-rich-web-vs-effect-5)
451. [wpblog_rich_web_vs_effect_5_loader](#wpblog-rich-web-vs-effect-5-loader)
452. [wpblog_rich_web_vs_effect_6](#wpblog-rich-web-vs-effect-6)
453. [wpblog_rich_web_vs_effect_6_loader](#wpblog-rich-web-vs-effect-6-loader)
454. [wpblog_rich_web_vs_effect_7](#wpblog-rich-web-vs-effect-7)
455. [wpblog_rich_web_vs_effect_7_loader](#wpblog-rich-web-vs-effect-7-loader)
456. [wpblog_rich_web_vs_effect_8](#wpblog-rich-web-vs-effect-8)
457. [wpblog_rich_web_vs_effect_8_loader](#wpblog-rich-web-vs-effect-8-loader)
458. [wpblog_rich_web_vs_effect_9](#wpblog-rich-web-vs-effect-9)
459. [wpblog_rich_web_vs_effect_9_loader](#wpblog-rich-web-vs-effect-9-loader)
460. [wpblog_sib_model_forms](#wpblog-sib-model-forms)
461. [wpblog_sib_model_users](#wpblog-sib-model-users)
462. [wpblog_term_relationships](#wpblog-term-relationships)
463. [wpblog_term_taxonomy](#wpblog-term-taxonomy)
464. [wpblog_termmeta](#wpblog-termmeta)
465. [wpblog_terms](#wpblog-terms)
466. [wpblog_totalsoft_galleryv_dbt](#wpblog-totalsoft-galleryv-dbt)
467. [wpblog_totalsoft_galleryv_id](#wpblog-totalsoft-galleryv-id)
468. [wpblog_totalsoft_galleryv_manager](#wpblog-totalsoft-galleryv-manager)
469. [wpblog_totalsoft_galleryv_videos](#wpblog-totalsoft-galleryv-videos)
470. [wpblog_totalsoft_new_plugin](#wpblog-totalsoft-new-plugin)
471. [wpblog_usermeta](#wpblog-usermeta)
472. [wpblog_users](#wpblog-users)
473. [wpblog_wonderplugin_carousel](#wpblog-wonderplugin-carousel)
474. [wpblog_wonderplugin_slider](#wpblog-wonderplugin-slider)
475. [wpblog_wpforo_accesses](#wpblog-wpforo-accesses)
476. [wpblog_wpforo_activity](#wpblog-wpforo-activity)
477. [wpblog_wpforo_forums](#wpblog-wpforo-forums)
478. [wpblog_wpforo_languages](#wpblog-wpforo-languages)
479. [wpblog_wpforo_likes](#wpblog-wpforo-likes)
480. [wpblog_wpforo_phrases](#wpblog-wpforo-phrases)
481. [wpblog_wpforo_post_revisions](#wpblog-wpforo-post-revisions)
482. [wpblog_wpforo_posts](#wpblog-wpforo-posts)
483. [wpblog_wpforo_profiles](#wpblog-wpforo-profiles)
484. [wpblog_wpforo_subscribes](#wpblog-wpforo-subscribes)
485. [wpblog_wpforo_tags](#wpblog-wpforo-tags)
486. [wpblog_wpforo_topics](#wpblog-wpforo-topics)
487. [wpblog_wpforo_usergroups](#wpblog-wpforo-usergroups)
488. [wpblog_wpforo_views](#wpblog-wpforo-views)
489. [wpblog_wpforo_visits](#wpblog-wpforo-visits)
490. [wpblog_wpforo_votes](#wpblog-wpforo-votes)
491. [wpblog_wpuf_transaction](#wpblog-wpuf-transaction)
492. [wpblog_yoast_indexable](#wpblog-yoast-indexable)
493. [wpblog_yoast_indexable_hierarchy](#wpblog-yoast-indexable-hierarchy)
494. [wpblog_yoast_migrations](#wpblog-yoast-migrations)
495. [wpblog_yoast_primary_term](#wpblog-yoast-primary-term)
496. [wpblog_yoast_seo_links](#wpblog-yoast-seo-links)
497. [wpblog_yoast_seo_meta](#wpblog-yoast-seo-meta)
498. [wpleads_actionscheduler_actions](#wpleads-actionscheduler-actions)
499. [wpleads_actionscheduler_claims](#wpleads-actionscheduler-claims)
500. [wpleads_actionscheduler_groups](#wpleads-actionscheduler-groups)
501. [wpleads_actionscheduler_logs](#wpleads-actionscheduler-logs)
502. [wpleads_bala_email_notifications](#wpleads-bala-email-notifications)
503. [wpleads_commentmeta](#wpleads-commentmeta)
504. [wpleads_comments](#wpleads-comments)
505. [wpleads_cpk_wpcsv_export_queue](#wpleads-cpk-wpcsv-export-queue)
506. [wpleads_cpk_wpcsv_log](#wpleads-cpk-wpcsv-log)
507. [wpleads_esign_document_users](#wpleads-esign-document-users)
508. [wpleads_esign_documents](#wpleads-esign-documents)
509. [wpleads_esign_documents_events](#wpleads-esign-documents-events)
510. [wpleads_esign_documents_fields_data](#wpleads-esign-documents-fields-data)
511. [wpleads_esign_documents_meta](#wpleads-esign-documents-meta)
512. [wpleads_esign_documents_signatures](#wpleads-esign-documents-signatures)
513. [wpleads_esign_documents_signer_field_data](#wpleads-esign-documents-signer-field-data)
514. [wpleads_esign_documents_stand_alone_docs](#wpleads-esign-documents-stand-alone-docs)
515. [wpleads_esign_invitations](#wpleads-esign-invitations)
516. [wpleads_esign_settings](#wpleads-esign-settings)
517. [wpleads_esign_signatures](#wpleads-esign-signatures)
518. [wpleads_esign_users](#wpleads-esign-users)
519. [wpleads_links](#wpleads-links)
520. [wpleads_mailster_action_bounces](#wpleads-mailster-action-bounces)
521. [wpleads_mailster_action_clicks](#wpleads-mailster-action-clicks)
522. [wpleads_mailster_action_errors](#wpleads-mailster-action-errors)
523. [wpleads_mailster_action_opens](#wpleads-mailster-action-opens)
524. [wpleads_mailster_action_sent](#wpleads-mailster-action-sent)
525. [wpleads_mailster_action_unsubs](#wpleads-mailster-action-unsubs)
526. [wpleads_mailster_form_actions](#wpleads-mailster-form-actions)
527. [wpleads_mailster_form_fields](#wpleads-mailster-form-fields)
528. [wpleads_mailster_forms](#wpleads-mailster-forms)
529. [wpleads_mailster_forms_lists](#wpleads-mailster-forms-lists)
530. [wpleads_mailster_forms_tags](#wpleads-mailster-forms-tags)
531. [wpleads_mailster_links](#wpleads-mailster-links)
532. [wpleads_mailster_lists](#wpleads-mailster-lists)
533. [wpleads_mailster_lists_subscribers](#wpleads-mailster-lists-subscribers)
534. [wpleads_mailster_logs](#wpleads-mailster-logs)
535. [wpleads_mailster_queue](#wpleads-mailster-queue)
536. [wpleads_mailster_subscriber_fields](#wpleads-mailster-subscriber-fields)
537. [wpleads_mailster_subscriber_meta](#wpleads-mailster-subscriber-meta)
538. [wpleads_mailster_subscribers](#wpleads-mailster-subscribers)
539. [wpleads_mailster_tags](#wpleads-mailster-tags)
540. [wpleads_mailster_tags_subscribers](#wpleads-mailster-tags-subscribers)
541. [wpleads_mailster_workflows](#wpleads-mailster-workflows)
542. [wpleads_myCRED_log](#wpleads-mycred-log)
543. [wpleads_mymail_temp_import](#wpleads-mymail-temp-import)
544. [wpleads_options](#wpleads-options)
545. [wpleads_postmeta](#wpleads-postmeta)
546. [wpleads_posts](#wpleads-posts)
547. [wpleads_pps_countries](#wpleads-pps-countries)
548. [wpleads_pps_modules](#wpleads-pps-modules)
549. [wpleads_pps_modules_type](#wpleads-pps-modules-type)
550. [wpleads_pps_popup](#wpleads-pps-popup)
551. [wpleads_pps_popup_show_categories](#wpleads-pps-popup-show-categories)
552. [wpleads_pps_popup_show_pages](#wpleads-pps-popup-show-pages)
553. [wpleads_pps_statistics](#wpleads-pps-statistics)
554. [wpleads_pps_subscribers](#wpleads-pps-subscribers)
555. [wpleads_pps_usage_stat](#wpleads-pps-usage-stat)
556. [wpleads_project_affiliate_payouts](#wpleads-project-affiliate-payouts)
557. [wpleads_project_affiliate_requests](#wpleads-project-affiliate-requests)
558. [wpleads_project_affiliate_users](#wpleads-project-affiliate-users)
559. [wpleads_project_bidding_intervals](#wpleads-project-bidding-intervals)
560. [wpleads_project_bids](#wpleads-project-bids)
561. [wpleads_project_bills_site](#wpleads-project-bills-site)
562. [wpleads_project_coupons](#wpleads-project-coupons)
563. [wpleads_project_custom_fields](#wpleads-project-custom-fields)
564. [wpleads_project_custom_options](#wpleads-project-custom-options)
565. [wpleads_project_custom_relations](#wpleads-project-custom-relations)
566. [wpleads_project_disputes](#wpleads-project-disputes)
567. [wpleads_project_disputes_messages](#wpleads-project-disputes-messages)
568. [wpleads_project_disputes_offers](#wpleads-project-disputes-offers)
569. [wpleads_project_email_alerts](#wpleads-project-email-alerts)
570. [wpleads_project_email_alerts_locs](#wpleads-project-email-alerts-locs)
571. [wpleads_project_escrow](#wpleads-project-escrow)
572. [wpleads_project_escrows](#wpleads-project-escrows)
573. [wpleads_project_freelancer_skills](#wpleads-project-freelancer-skills)
574. [wpleads_project_marketplace_payments](#wpleads-project-marketplace-payments)
575. [wpleads_project_marketplace_payments_commissions](#wpleads-project-marketplace-payments-commissions)
576. [wpleads_project_marketplace_payments_freelancers](#wpleads-project-marketplace-payments-freelancers)
577. [wpleads_project_message_board](#wpleads-project-message-board)
578. [wpleads_project_milestone](#wpleads-project-milestone)
579. [wpleads_project_notifications](#wpleads-project-notifications)
580. [wpleads_project_orders](#wpleads-project-orders)
581. [wpleads_project_packs](#wpleads-project-packs)
582. [wpleads_project_payment_transactions](#wpleads-project-payment-transactions)
583. [wpleads_project_pm](#wpleads-project-pm)
584. [wpleads_project_pm_threads](#wpleads-project-pm-threads)
585. [wpleads_project_pm_wk](#wpleads-project-pm-wk)
586. [wpleads_project_ratings](#wpleads-project-ratings)
587. [wpleads_project_transactions](#wpleads-project-transactions)
588. [wpleads_project_user_custom_fields](#wpleads-project-user-custom-fields)
589. [wpleads_project_user_custom_options](#wpleads-project-user-custom-options)
590. [wpleads_project_user_custom_relations](#wpleads-project-user-custom-relations)
591. [wpleads_project_withdraw](#wpleads-project-withdraw)
592. [wpleads_project_workspace](#wpleads-project-workspace)
593. [wpleads_project_workspace_pm](#wpleads-project-workspace-pm)
594. [wpleads_project_workspace_pm_reads](#wpleads-project-workspace-pm-reads)
595. [wpleads_redirection_404](#wpleads-redirection-404)
596. [wpleads_redirection_groups](#wpleads-redirection-groups)
597. [wpleads_redirection_items](#wpleads-redirection-items)
598. [wpleads_redirection_logs](#wpleads-redirection-logs)
599. [wpleads_sib_model_forms](#wpleads-sib-model-forms)
600. [wpleads_sib_model_users](#wpleads-sib-model-users)
601. [wpleads_term_relationships](#wpleads-term-relationships)
602. [wpleads_term_taxonomy](#wpleads-term-taxonomy)
603. [wpleads_termmeta](#wpleads-termmeta)
604. [wpleads_terms](#wpleads-terms)
605. [wpleads_usermeta](#wpleads-usermeta)
606. [wpleads_users](#wpleads-users)
607. [wpleads_wfblockediplog](#wpleads-wfblockediplog)
608. [wpleads_wfblocks7](#wpleads-wfblocks7)
609. [wpleads_wfconfig](#wpleads-wfconfig)
610. [wpleads_wfcrawlers](#wpleads-wfcrawlers)
611. [wpleads_wffilechanges](#wpleads-wffilechanges)
612. [wpleads_wffilemods](#wpleads-wffilemods)
613. [wpleads_wfhits](#wpleads-wfhits)
614. [wpleads_wfhoover](#wpleads-wfhoover)
615. [wpleads_wfissues](#wpleads-wfissues)
616. [wpleads_wfknownfilelist](#wpleads-wfknownfilelist)
617. [wpleads_wflivetraffichuman](#wpleads-wflivetraffichuman)
618. [wpleads_wflocs](#wpleads-wflocs)
619. [wpleads_wflogins](#wpleads-wflogins)
620. [wpleads_wfls_2fa_secrets](#wpleads-wfls-2fa-secrets)
621. [wpleads_wfls_role_counts](#wpleads-wfls-role-counts)
622. [wpleads_wfls_settings](#wpleads-wfls-settings)
623. [wpleads_wfnotifications](#wpleads-wfnotifications)
624. [wpleads_wfpendingissues](#wpleads-wfpendingissues)
625. [wpleads_wfreversecache](#wpleads-wfreversecache)
626. [wpleads_wfsecurityevents](#wpleads-wfsecurityevents)
627. [wpleads_wfsnipcache](#wpleads-wfsnipcache)
628. [wpleads_wfstatus](#wpleads-wfstatus)
629. [wpleads_wftrafficrates](#wpleads-wftrafficrates)
630. [wpleads_wfwaffailures](#wpleads-wfwaffailures)
631. [wpleads_wpc_client_categories](#wpleads-wpc-client-categories)
632. [wpleads_wpc_client_chains](#wpleads-wpc-client-chains)
633. [wpleads_wpc_client_clients_page](#wpleads-wpc-client-clients-page)
634. [wpleads_wpc_client_comments](#wpleads-wpc-client-comments)
635. [wpleads_wpc_client_file_categories](#wpleads-wpc-client-file-categories)
636. [wpleads_wpc_client_files](#wpleads-wpc-client-files)
637. [wpleads_wpc_client_files_download_log](#wpleads-wpc-client-files-download-log)
638. [wpleads_wpc_client_group_clients](#wpleads-wpc-client-group-clients)
639. [wpleads_wpc_client_groups](#wpleads-wpc-client-groups)
640. [wpleads_wpc_client_login_redirects](#wpleads-wpc-client-login-redirects)
641. [wpleads_wpc_client_messages](#wpleads-wpc-client-messages)
642. [wpleads_wpc_client_objects_assigns](#wpleads-wpc-client-objects-assigns)
643. [wpleads_wpc_client_payments](#wpleads-wpc-client-payments)
644. [wpleads_wpc_client_portal_page_categories](#wpleads-wpc-client-portal-page-categories)
645. [wpleads_wpc_temp_ids](#wpleads-wpc-temp-ids)
646. [wpleads_wpforms_logs](#wpleads-wpforms-logs)
647. [wpleads_wpforms_payment_meta](#wpleads-wpforms-payment-meta)
648. [wpleads_wpforms_payments](#wpleads-wpforms-payments)
649. [wpleads_wpforms_tasks_meta](#wpleads-wpforms-tasks-meta)
650. [wpleads_wpforo_accesses](#wpleads-wpforo-accesses)
651. [wpleads_wpforo_activity](#wpleads-wpforo-activity)
652. [wpleads_wpforo_forums](#wpleads-wpforo-forums)
653. [wpleads_wpforo_languages](#wpleads-wpforo-languages)
654. [wpleads_wpforo_likes](#wpleads-wpforo-likes)
655. [wpleads_wpforo_phrases](#wpleads-wpforo-phrases)
656. [wpleads_wpforo_post_revisions](#wpleads-wpforo-post-revisions)
657. [wpleads_wpforo_postmeta](#wpleads-wpforo-postmeta)
658. [wpleads_wpforo_posts](#wpleads-wpforo-posts)
659. [wpleads_wpforo_profiles](#wpleads-wpforo-profiles)
660. [wpleads_wpforo_subscribes](#wpleads-wpforo-subscribes)
661. [wpleads_wpforo_tags](#wpleads-wpforo-tags)
662. [wpleads_wpforo_topics](#wpleads-wpforo-topics)
663. [wpleads_wpforo_usergroups](#wpleads-wpforo-usergroups)
664. [wpleads_wpforo_views](#wpleads-wpforo-views)
665. [wpleads_wpforo_visits](#wpleads-wpforo-visits)
666. [wpleads_wpforo_votes](#wpleads-wpforo-votes)
667. [wpleads_wpmailsmtp_debug_events](#wpleads-wpmailsmtp-debug-events)
668. [wpleads_wpmailsmtp_tasks_meta](#wpleads-wpmailsmtp-tasks-meta)
669. [wpleads_wpmm_subscribers](#wpleads-wpmm-subscribers)
670. [wpleads_wsluserscontacts](#wpleads-wsluserscontacts)
671. [wpleads_wslusersprofiles](#wpleads-wslusersprofiles)
672. [wpleads_yoast_indexable](#wpleads-yoast-indexable)
673. [wpleads_yoast_indexable_hierarchy](#wpleads-yoast-indexable-hierarchy)
674. [wpleads_yoast_migrations](#wpleads-yoast-migrations)
675. [wpleads_yoast_primary_term](#wpleads-yoast-primary-term)
676. [wpleads_yoast_seo_links](#wpleads-yoast-seo-links)
677. [wpleads_yoast_seo_meta](#wpleads-yoast-seo-meta)
678. [wplogin_commentmeta](#wplogin-commentmeta)
679. [wplogin_comments](#wplogin-comments)
680. [wplogin_links](#wplogin-links)
681. [wplogin_options](#wplogin-options)
682. [wplogin_postmeta](#wplogin-postmeta)
683. [wplogin_posts](#wplogin-posts)
684. [wplogin_redirection_404](#wplogin-redirection-404)
685. [wplogin_redirection_groups](#wplogin-redirection-groups)
686. [wplogin_redirection_items](#wplogin-redirection-items)
687. [wplogin_redirection_logs](#wplogin-redirection-logs)
688. [wplogin_rich_web_video_slider_effects_data](#wplogin-rich-web-video-slider-effects-data)
689. [wplogin_rich_web_video_slider_font_family](#wplogin-rich-web-video-slider-font-family)
690. [wplogin_rich_web_video_slider_id](#wplogin-rich-web-video-slider-id)
691. [wplogin_rich_web_video_slider_manager](#wplogin-rich-web-video-slider-manager)
692. [wplogin_rich_web_video_slider_videos](#wplogin-rich-web-video-slider-videos)
693. [wplogin_rich_web_vs_effect_10_loader](#wplogin-rich-web-vs-effect-10-loader)
694. [wplogin_rich_web_vs_effect_1_loader](#wplogin-rich-web-vs-effect-1-loader)
695. [wplogin_rich_web_vs_effect_2_loader](#wplogin-rich-web-vs-effect-2-loader)
696. [wplogin_rich_web_vs_effect_3_loader](#wplogin-rich-web-vs-effect-3-loader)
697. [wplogin_rich_web_vs_effect_4_loader](#wplogin-rich-web-vs-effect-4-loader)
698. [wplogin_rich_web_vs_effect_5_loader](#wplogin-rich-web-vs-effect-5-loader)
699. [wplogin_rich_web_vs_effect_6_loader](#wplogin-rich-web-vs-effect-6-loader)
700. [wplogin_rich_web_vs_effect_7_loader](#wplogin-rich-web-vs-effect-7-loader)
701. [wplogin_rich_web_vs_effect_8_loader](#wplogin-rich-web-vs-effect-8-loader)
702. [wplogin_rich_web_vs_effect_9_loader](#wplogin-rich-web-vs-effect-9-loader)
703. [wplogin_sib_model_forms](#wplogin-sib-model-forms)
704. [wplogin_sib_model_users](#wplogin-sib-model-users)
705. [wplogin_term_relationships](#wplogin-term-relationships)
706. [wplogin_term_taxonomy](#wplogin-term-taxonomy)
707. [wplogin_termmeta](#wplogin-termmeta)
708. [wplogin_terms](#wplogin-terms)
709. [wplogin_usermeta](#wplogin-usermeta)
710. [wplogin_users](#wplogin-users)
711. [wpstag_commentmeta](#wpstag-commentmeta)
712. [wpstag_comments](#wpstag-comments)
713. [wpstag_links](#wpstag-links)
714. [wpstag_options](#wpstag-options)
715. [wpstag_postmeta](#wpstag-postmeta)
716. [wpstag_posts](#wpstag-posts)
717. [wpstag_term_relationships](#wpstag-term-relationships)
718. [wpstag_term_taxonomy](#wpstag-term-taxonomy)
719. [wpstag_termmeta](#wpstag-termmeta)
720. [wpstag_terms](#wpstag-terms)
721. [wptest_commentmeta](#wptest-commentmeta)
722. [wptest_comments](#wptest-comments)
723. [wptest_links](#wptest-links)
724. [wptest_options](#wptest-options)
725. [wptest_postmeta](#wptest-postmeta)
726. [wptest_posts](#wptest-posts)
727. [wptest_term_relationships](#wptest-term-relationships)
728. [wptest_term_taxonomy](#wptest-term-taxonomy)
729. [wptest_termmeta](#wptest-termmeta)
730. [wptest_terms](#wptest-terms)
731. [wptest_usermeta](#wptest-usermeta)
732. [wptest_users](#wptest-users)

---

## fm_slider

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `name` | tinytext | NO | NULL |  |  |
| `data` | mediumtext | NO | NULL |  |  |
| `time` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `authorid` | tinytext | NO | NULL |  |  |
| `url` | tinytext | YES | NULL |  |  |
| `urlanchor` | tinytext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_actionscheduler_actions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `action_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `hook` | varchar(191) | NO | NULL | MUL |  |
| `status` | varchar(20) | NO | NULL | MUL |  |
| `scheduled_date_gmt` | datetime | YES | 0000-00-00 00:00:00 | MUL |  |
| `scheduled_date_local` | datetime | YES | 0000-00-00 00:00:00 |  |  |
| `args` | varchar(191) | YES | NULL | MUL |  |
| `schedule` | longtext | YES | NULL |  |  |
| `group_id` | bigint unsigned | NO | 0 | MUL |  |
| `attempts` | int | NO | 0 |  |  |
| `last_attempt_gmt` | datetime | YES | 0000-00-00 00:00:00 | MUL |  |
| `last_attempt_local` | datetime | YES | 0000-00-00 00:00:00 |  |  |
| `claim_id` | bigint unsigned | NO | 0 | MUL |  |
| `extended_args` | varchar(8000) | YES | NULL |  |  |
| `priority` | tinyint unsigned | NO | 10 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| args | args | NO | BTREE |
| claim_id | claim_id | NO | BTREE |
| claim_id_status_priority_scheduled_date_gmt | claim_id | NO | BTREE |
| claim_id_status_priority_scheduled_date_gmt | status | NO | BTREE |
| claim_id_status_priority_scheduled_date_gmt | priority | NO | BTREE |
| claim_id_status_priority_scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |
| claim_id_status_scheduled_date_gmt | claim_id | NO | BTREE |
| claim_id_status_scheduled_date_gmt | status | NO | BTREE |
| claim_id_status_scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |
| group_id | group_id | NO | BTREE |
| hook | hook | NO | BTREE |
| hook_status_scheduled_date_gmt | hook | NO | BTREE |
| hook_status_scheduled_date_gmt | status | NO | BTREE |
| hook_status_scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |
| last_attempt_gmt | last_attempt_gmt | NO | BTREE |
| PRIMARY | action_id | YES | BTREE |
| scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |
| status | status | NO | BTREE |
| status_claim_id | status | NO | BTREE |
| status_claim_id | claim_id | NO | BTREE |
| status_last_attempt_gmt | status | NO | BTREE |
| status_last_attempt_gmt | last_attempt_gmt | NO | BTREE |
| status_scheduled_date_gmt | status | NO | BTREE |
| status_scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |

---

## gwgo_actionscheduler_claims

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `claim_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `date_created_gmt` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| date_created_gmt | date_created_gmt | NO | BTREE |
| PRIMARY | claim_id | YES | BTREE |

---

## gwgo_actionscheduler_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `group_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `slug` | varchar(255) | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | group_id | YES | BTREE |
| slug | slug | NO | BTREE |

---

## gwgo_actionscheduler_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `log_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `action_id` | bigint unsigned | NO | NULL | MUL |  |
| `message` | text | NO | NULL |  |  |
| `log_date_gmt` | datetime | YES | 0000-00-00 00:00:00 | MUL |  |
| `log_date_local` | datetime | YES | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| action_id | action_id | NO | BTREE |
| log_date_gmt | log_date_gmt | NO | BTREE |
| PRIMARY | log_id | YES | BTREE |

---

## gwgo_admin_columns

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `list_id` | varchar(20) | NO | NULL | UNI |  |
| `list_key` | varchar(100) | NO | NULL |  |  |
| `title` | varchar(255) | NO | NULL |  |  |
| `columns` | mediumtext | YES | NULL |  |  |
| `settings` | mediumtext | YES | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| list_id | list_id | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_aioseo_cache

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `key` | varchar(80) | NO | NULL | UNI |  |
| `value` | longtext | NO | NULL |  |  |
| `expiration` | datetime | YES | NULL | MUL |  |
| `created` | datetime | NO | NULL |  |  |
| `updated` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ndx_aioseo_cache_expiration | expiration | NO | BTREE |
| ndx_aioseo_cache_key | key | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_aioseo_notifications

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `slug` | varchar(13) | NO | NULL | UNI |  |
| `title` | text | NO | NULL |  |  |
| `content` | longtext | NO | NULL |  |  |
| `type` | varchar(64) | NO | NULL | MUL |  |
| `level` | text | NO | NULL |  |  |
| `notification_id` | bigint unsigned | YES | NULL |  |  |
| `notification_name` | varchar(255) | YES | NULL |  |  |
| `start` | datetime | YES | NULL | MUL |  |
| `end` | datetime | YES | NULL |  |  |
| `button1_label` | varchar(255) | YES | NULL |  |  |
| `button1_action` | varchar(255) | YES | NULL |  |  |
| `button2_label` | varchar(255) | YES | NULL |  |  |
| `button2_action` | varchar(255) | YES | NULL |  |  |
| `dismissed` | tinyint(1) | NO | 0 | MUL |  |
| `created` | datetime | NO | NULL |  |  |
| `updated` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ndx_aioseo_notifications_dates | start | NO | BTREE |
| ndx_aioseo_notifications_dates | end | NO | BTREE |
| ndx_aioseo_notifications_dismissed | dismissed | NO | BTREE |
| ndx_aioseo_notifications_slug | slug | YES | BTREE |
| ndx_aioseo_notifications_type | type | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_aioseo_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint unsigned | NO | NULL | MUL |  |
| `title` | text | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `keywords` | mediumtext | YES | NULL |  |  |
| `keyphrases` | longtext | YES | NULL |  |  |
| `page_analysis` | longtext | YES | NULL |  |  |
| `canonical_url` | text | YES | NULL |  |  |
| `og_title` | text | YES | NULL |  |  |
| `og_description` | text | YES | NULL |  |  |
| `og_object_type` | varchar(64) | YES | default |  |  |
| `og_image_type` | varchar(64) | YES | default |  |  |
| `og_image_custom_url` | text | YES | NULL |  |  |
| `og_image_custom_fields` | text | YES | NULL |  |  |
| `og_custom_image_width` | int | YES | NULL |  |  |
| `og_custom_image_height` | int | YES | NULL |  |  |
| `og_video` | varchar(255) | YES | NULL |  |  |
| `og_custom_url` | text | YES | NULL |  |  |
| `og_article_section` | text | YES | NULL |  |  |
| `og_article_tags` | text | YES | NULL |  |  |
| `twitter_use_og` | tinyint(1) | YES | 1 |  |  |
| `twitter_card` | varchar(64) | YES | default |  |  |
| `twitter_image_type` | varchar(64) | YES | default |  |  |
| `twitter_image_custom_url` | text | YES | NULL |  |  |
| `twitter_image_custom_fields` | text | YES | NULL |  |  |
| `twitter_title` | text | YES | NULL |  |  |
| `twitter_description` | text | YES | NULL |  |  |
| `seo_score` | int | NO | 0 |  |  |
| `schema_type` | varchar(20) | YES | NULL |  |  |
| `schema_type_options` | longtext | YES | NULL |  |  |
| `pillar_content` | tinyint(1) | YES | NULL | MUL |  |
| `robots_default` | tinyint(1) | NO | 1 |  |  |
| `robots_noindex` | tinyint(1) | NO | 0 |  |  |
| `robots_noarchive` | tinyint(1) | NO | 0 |  |  |
| `robots_nosnippet` | tinyint(1) | NO | 0 |  |  |
| `robots_nofollow` | tinyint(1) | NO | 0 |  |  |
| `robots_noimageindex` | tinyint(1) | NO | 0 |  |  |
| `robots_noodp` | tinyint(1) | NO | 0 |  |  |
| `robots_notranslate` | tinyint(1) | NO | 0 |  |  |
| `robots_max_snippet` | int | YES | NULL |  |  |
| `robots_max_videopreview` | int | YES | NULL |  |  |
| `robots_max_imagepreview` | varchar(20) | YES | none |  |  |
| `tabs` | mediumtext | YES | NULL |  |  |
| `images` | longtext | YES | NULL |  |  |
| `priority` | tinytext | YES | NULL |  |  |
| `frequency` | tinytext | YES | NULL |  |  |
| `videos` | longtext | YES | NULL |  |  |
| `video_thumbnail` | text | YES | NULL |  |  |
| `video_scan_date` | datetime | YES | NULL |  |  |
| `local_seo` | longtext | YES | NULL |  |  |
| `breadcrumb_settings` | longtext | YES | NULL |  |  |
| `created` | datetime | NO | NULL |  |  |
| `updated` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ndx_aioseo_posts_pillar_content | pillar_content | NO | BTREE |
| ndx_aioseo_posts_post_id | post_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_aioseo_seo_analyzer_results

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `data` | text | NO | NULL |  |  |
| `score` | varchar(255) | YES | NULL |  |  |
| `competitor_url` | varchar(255) | YES | NULL | MUL |  |
| `created` | datetime | NO | NULL |  |  |
| `updated` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ndx_aioseo_seo_analyzer_results_competitor_url | competitor_url | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_categorymeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint | NO | NULL | PRI | auto_increment |
| `category_id` | bigint | NO | 0 |  |  |
| `meta_key` | varchar(255) | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_id | meta_id | YES | BTREE |

---

## gwgo_cky_banners

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `banner_id` | bigint | NO | NULL | PRI | auto_increment |
| `name` | varchar(190) | NO | NULL |  |  |
| `slug` | varchar(190) | NO | NULL |  |  |
| `status` | int | NO | 0 |  |  |
| `settings` | longtext | NO | NULL |  |  |
| `banner_default` | int | NO | 0 |  |  |
| `contents` | longtext | NO | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | banner_id | YES | BTREE |

---

## gwgo_cky_cookie_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `category_id` | bigint | NO | NULL | PRI | auto_increment |
| `name` | text | NO | NULL |  |  |
| `slug` | varchar(190) | NO | NULL | UNI |  |
| `description` | longtext | NO | NULL |  |  |
| `prior_consent` | int | NO | 0 |  |  |
| `visibility` | int | NO | 1 |  |  |
| `priority` | int | NO | 0 |  |  |
| `sell_personal_data` | int | NO | 0 |  |  |
| `meta` | longtext | YES | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | category_id | YES | BTREE |
| slug | slug | YES | BTREE |

---

## gwgo_cky_cookies

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `cookie_id` | bigint | NO | NULL | PRI | auto_increment |
| `name` | varchar(190) | NO | NULL |  |  |
| `slug` | varchar(190) | NO | NULL |  |  |
| `description` | longtext | NO | NULL |  |  |
| `duration` | text | NO | NULL |  |  |
| `domain` | varchar(190) | NO | NULL |  |  |
| `category` | bigint | NO | NULL |  |  |
| `type` | text | NO | NULL |  |  |
| `discovered` | int | NO | 0 |  |  |
| `url_pattern` | varchar(190) | YES | NULL |  |  |
| `meta` | longtext | YES | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | cookie_id | YES | BTREE |

---

## gwgo_cli_scripts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `cliscript_title` | text | NO | NULL |  |  |
| `cliscript_category` | varchar(100) | NO | NULL |  |  |
| `cliscript_type` | int | YES | 0 |  |  |
| `cliscript_status` | varchar(100) | NO | NULL |  |  |
| `cliscript_description` | longtext | NO | NULL |  |  |
| `cliscript_key` | varchar(100) | NO | NULL |  |  |
| `type` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_commentmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_id | comment_id | NO | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## gwgo_comments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `comment_ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_post_ID` | bigint unsigned | NO | 0 | MUL |  |
| `comment_author` | text | NO | NULL |  |  |
| `comment_author_email` | varchar(100) | NO | NULL | MUL |  |
| `comment_author_url` | varchar(200) | NO | NULL |  |  |
| `comment_author_IP` | varchar(100) | NO | NULL |  |  |
| `comment_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `comment_date_gmt` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `comment_content` | mediumtext | NO | NULL |  |  |
| `comment_karma` | int | NO | 0 |  |  |
| `comment_approved` | varchar(20) | NO | 1 | MUL |  |
| `comment_agent` | varchar(255) | NO | NULL |  |  |
| `comment_type` | varchar(20) | NO | comment | MUL |  |
| `comment_parent` | bigint unsigned | NO | 0 | MUL |  |
| `user_id` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_approved_date_gmt | comment_approved | NO | BTREE |
| comment_approved_date_gmt | comment_date_gmt | NO | BTREE |
| comment_author_email | comment_author_email | NO | BTREE |
| comment_date_gmt | comment_date_gmt | NO | BTREE |
| comment_parent | comment_parent | NO | BTREE |
| comment_post_ID | comment_post_ID | NO | BTREE |
| PRIMARY | comment_ID | YES | BTREE |
| woo_idx_comment_type | comment_type | NO | BTREE |

---

## gwgo_company_faqs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | mediumint | NO | NULL | PRI | auto_increment |
| `post_id` | bigint | NO | NULL | UNI |  |
| `faqs` | longtext | NO | NULL |  |  |
| `created_at` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| post_id | post_id | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_cpk_wpcsv_export_queue

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `export_id` | varchar(30) | NO | NULL |  |  |
| `post_id` | int | NO | NULL |  |  |
| `done` | tinyint(1) | NO | 0 |  |  |
| `msg` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_cpk_wpcsv_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `category` | varchar(255) | NO | NULL |  |  |
| `msg` | varchar(255) | NO | NULL |  |  |
| `data` | text | YES | NULL |  |  |
| `created` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_e_events

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `event_data` | text | YES | NULL |  |  |
| `created_at` | datetime | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| created_at_index | created_at | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_frmt_form_entry

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `entry_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `entry_type` | varchar(191) | NO | NULL | MUL |  |
| `draft_id` | varchar(12) | YES | NULL |  |  |
| `form_id` | bigint unsigned | NO | NULL | MUL |  |
| `is_spam` | tinyint(1) | NO | 0 | MUL |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| entry_form_id | form_id | NO | BTREE |
| entry_is_spam | is_spam | NO | BTREE |
| entry_type | entry_type | NO | BTREE |
| PRIMARY | entry_id | YES | BTREE |

---

## gwgo_frmt_form_entry_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `entry_id` | bigint unsigned | NO | NULL | MUL |  |
| `meta_key` | varchar(191) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_updated` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_entry_id | entry_id | NO | BTREE |
| meta_key | meta_key | NO | BTREE |
| meta_key_object | entry_id | NO | BTREE |
| meta_key_object | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## gwgo_frmt_form_reports

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `report_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `report_value` | longtext | NO | NULL |  |  |
| `status` | varchar(200) | NO | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_updated` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | report_id | YES | BTREE |

---

## gwgo_frmt_form_views

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `view_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `form_id` | bigint unsigned | NO | NULL | MUL |  |
| `page_id` | bigint unsigned | NO | NULL |  |  |
| `ip` | varchar(191) | YES | NULL | MUL |  |
| `count` | mediumint unsigned | NO | 1 |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_updated` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | view_id | YES | BTREE |
| view_form_id | form_id | NO | BTREE |
| view_form_object | form_id | NO | BTREE |
| view_form_object | view_id | NO | BTREE |
| view_form_object_ip | form_id | NO | BTREE |
| view_form_object_ip | view_id | NO | BTREE |
| view_form_object_ip | ip | NO | BTREE |
| view_ip | ip | NO | BTREE |

---

## gwgo_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `link_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `link_url` | varchar(255) | NO | NULL |  |  |
| `link_name` | varchar(255) | NO | NULL |  |  |
| `link_image` | varchar(255) | NO | NULL |  |  |
| `link_target` | varchar(25) | NO | NULL |  |  |
| `link_description` | varchar(255) | NO | NULL |  |  |
| `link_visible` | varchar(20) | NO | Y | MUL |  |
| `link_owner` | bigint unsigned | NO | 1 |  |  |
| `link_rating` | int | NO | 0 |  |  |
| `link_updated` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `link_rel` | varchar(255) | NO | NULL |  |  |
| `link_notes` | mediumtext | NO | NULL |  |  |
| `link_rss` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| link_visible | link_visible | NO | BTREE |
| PRIMARY | link_id | YES | BTREE |

---

## gwgo_listings_ratings_and_reviews

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `listing_id` | int | NO | NULL |  |  |
| `service_id` | int | NO | NULL |  |  |
| `rating` | float | NO | 0 |  |  |
| `rev_number` | int | NO | 0 |  |  |
| `rate_times_num` | int | NO | 0 |  |  |
| `mq` | int | NO | 0 |  |  |

---

## gwgo_mailster_action_bounces

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `hard` | tinyint(1) | NO | 0 |  |  |
| `text` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | hard | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## gwgo_mailster_action_clicks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `link_id` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | link_id | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## gwgo_mailster_action_errors

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `text` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## gwgo_mailster_action_opens

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## gwgo_mailster_action_sent

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## gwgo_mailster_action_unsubs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `text` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## gwgo_mailster_actions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `type` | tinyint(1) | NO | 0 | MUL |  |
| `link_id` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | type | YES | BTREE |
| id | link_id | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |
| type | type | NO | BTREE |

---

## gwgo_mailster_form_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `form_id` | bigint unsigned | NO | NULL | MUL |  |
| `field_id` | varchar(191) | NO | NULL |  |  |
| `name` | longtext | NO | NULL |  |  |
| `error_msg` | longtext | NO | NULL |  |  |
| `required` | tinyint unsigned | NO | NULL |  |  |
| `position` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | form_id | YES | BTREE |
| id | field_id | YES | BTREE |
| PRIMARY | ID | YES | BTREE |

---

## gwgo_mailster_forms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(191) | NO | NULL |  |  |
| `submit` | varchar(191) | NO | NULL |  |  |
| `asterisk` | tinyint(1) | YES | 1 |  |  |
| `userschoice` | tinyint(1) | YES | 0 |  |  |
| `precheck` | tinyint(1) | YES | 0 |  |  |
| `dropdown` | tinyint(1) | YES | 0 |  |  |
| `prefill` | tinyint(1) | YES | 0 |  |  |
| `inline` | tinyint(1) | YES | 0 |  |  |
| `overwrite` | tinyint(1) | YES | 0 |  |  |
| `addlists` | tinyint(1) | YES | 0 |  |  |
| `style` | longtext | YES | NULL |  |  |
| `custom_style` | longtext | YES | NULL |  |  |
| `doubleoptin` | tinyint(1) | YES | 1 |  |  |
| `subject` | longtext | YES | NULL |  |  |
| `headline` | longtext | YES | NULL |  |  |
| `content` | longtext | YES | NULL |  |  |
| `link` | longtext | YES | NULL |  |  |
| `resend` | tinyint(1) | YES | 0 |  |  |
| `resend_count` | int | YES | 2 |  |  |
| `resend_time` | int | YES | 48 |  |  |
| `template` | varchar(191) | NO | NULL |  |  |
| `vcard` | tinyint(1) | YES | 0 |  |  |
| `vcard_content` | longtext | YES | NULL |  |  |
| `confirmredirect` | varchar(2083) | YES | NULL |  |  |
| `redirect` | varchar(2083) | YES | NULL |  |  |
| `added` | int unsigned | YES | NULL |  |  |
| `updated` | int unsigned | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |

---

## gwgo_mailster_forms_lists

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `form_id` | bigint unsigned | NO | NULL | PRI |  |
| `list_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| form_id | form_id | NO | BTREE |
| id | form_id | YES | BTREE |
| id | list_id | YES | BTREE |
| list_id | list_id | NO | BTREE |

---

## gwgo_mailster_forms_tags

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `form_id` | bigint unsigned | NO | NULL | PRI |  |
| `tag_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| form_id | form_id | NO | BTREE |
| id | form_id | YES | BTREE |
| id | tag_id | YES | BTREE |
| list_id | tag_id | NO | BTREE |

---

## gwgo_mailster_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `link` | varchar(2083) | NO | NULL |  |  |
| `i` | tinyint unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |

---

## gwgo_mailster_lists

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `parent_id` | bigint unsigned | NO | NULL |  |  |
| `name` | varchar(191) | NO | NULL | UNI |  |
| `slug` | varchar(191) | NO | NULL | UNI |  |
| `description` | longtext | NO | NULL |  |  |
| `added` | int unsigned | NO | NULL |  |  |
| `updated` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| slug | slug | YES | BTREE |

---

## gwgo_mailster_lists_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `list_id` | bigint unsigned | NO | NULL | PRI |  |
| `subscriber_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | list_id | YES | BTREE |
| id | subscriber_id | YES | BTREE |
| list_id | list_id | NO | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## gwgo_mailster_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL |  |  |
| `campaign_id` | bigint unsigned | YES | NULL |  |  |
| `timestamp` | int | NO | 0 |  |  |
| `subject` | longtext | NO | NULL |  |  |
| `receivers` | longtext | NO | NULL |  |  |
| `html` | longtext | NO | NULL |  |  |
| `text` | longtext | NO | NULL |  |  |
| `raw` | longtext | NO | NULL |  |  |
| `message_id` | varchar(191) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |

---

## gwgo_mailster_queue

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | NO | 0 | MUL |  |
| `campaign_id` | bigint unsigned | NO | 0 | MUL |  |
| `requeued` | tinyint unsigned | NO | 0 | MUL |  |
| `added` | int unsigned | NO | 0 |  |  |
| `timestamp` | int | NO | 0 | MUL |  |
| `sent` | int unsigned | NO | 0 |  |  |
| `priority` | tinyint unsigned | NO | 0 | MUL |  |
| `count` | tinyint unsigned | NO | 0 | MUL |  |
| `error` | tinyint unsigned | NO | 0 | MUL |  |
| `ignore_status` | tinyint unsigned | NO | 0 | MUL |  |
| `options` | varchar(191) | NO | NULL |  |  |
| `tags` | longtext | NO | NULL |  |  |
| `i` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| count | count | NO | BTREE |
| error | error | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | requeued | YES | BTREE |
| id | options | YES | BTREE |
| id | i | YES | BTREE |
| ignore_status | ignore_status | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| priority | priority | NO | BTREE |
| requeued | requeued | NO | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |
| timestamp | timestamp | NO | BTREE |

---

## gwgo_mailster_subscriber_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | NO | NULL | MUL |  |
| `meta_key` | varchar(191) | NO | NULL | MUL |  |
| `meta_value` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | subscriber_id | YES | BTREE |
| id | meta_key | YES | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## gwgo_mailster_subscriber_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | NO | NULL | MUL |  |
| `meta_key` | varchar(191) | NO | NULL | MUL |  |
| `meta_value` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | meta_key | YES | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## gwgo_mailster_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `hash` | varchar(32) | NO | NULL | UNI |  |
| `email` | varchar(191) | NO | NULL | UNI |  |
| `wp_id` | bigint unsigned | NO | 0 | MUL |  |
| `status` | int unsigned | NO | 0 | MUL |  |
| `added` | int unsigned | NO | 0 |  |  |
| `updated` | int unsigned | NO | 0 |  |  |
| `signup` | int unsigned | NO | 0 |  |  |
| `confirm` | int unsigned | NO | 0 |  |  |
| `ip_signup` | varchar(45) | NO | NULL |  |  |
| `ip_confirm` | varchar(45) | NO | NULL |  |  |
| `rating` | decimal(3,2) unsigned | NO | 0.25 | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| email | email | YES | BTREE |
| hash | hash | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| rating | rating | NO | BTREE |
| status | status | NO | BTREE |
| wp_id | wp_id | NO | BTREE |

---

## gwgo_mailster_tags

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(191) | NO | NULL | UNI |  |
| `added` | int unsigned | NO | NULL |  |  |
| `updated` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | YES | BTREE |
| PRIMARY | ID | YES | BTREE |

---

## gwgo_mailster_tags_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `tag_id` | bigint unsigned | NO | NULL | PRI |  |
| `subscriber_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | tag_id | YES | BTREE |
| id | subscriber_id | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |
| tag_id | tag_id | NO | BTREE |

---

## gwgo_mdf_query_cache

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `mkey` | text | NO | NULL |  |  |
| `mvalue` | text | NO | NULL |  |  |

---

## gwgo_mdf_stat_buffer

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `hash` | text | NO | NULL |  |  |
| `user_ip` | text | NO | NULL |  |  |
| `post_type` | text | NO | NULL |  |  |
| `type` | text | NO | NULL |  |  |
| `filter_id` | int | NO | NULL |  |  |
| `key_id` | text | NO | NULL |  |  |
| `value` | text | NO | NULL |  |  |
| `time` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_mdf_stat_tmp

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_ip` | text | NO | NULL |  |  |
| `post_type` | text | NO | NULL |  |  |
| `tax_data` | text | NO | NULL |  |  |
| `meta_data` | text | NO | NULL |  |  |
| `hash` | text | NO | NULL |  |  |
| `time` | int | NO | NULL |  |  |
| `is_collected` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_mwai_filemeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint | NO | NULL | PRI | auto_increment |
| `file_id` | bigint | NO | NULL |  |  |
| `meta_key` | varchar(255) | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | meta_id | YES | BTREE |

---

## gwgo_mwai_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `refId` | varchar(64) | NO | NULL | UNI |  |
| `envId` | varchar(128) | YES | NULL |  |  |
| `userId` | varchar(64) | YES | NULL |  |  |
| `type` | varchar(32) | YES | NULL |  |  |
| `status` | varchar(32) | YES | NULL |  |  |
| `purpose` | varchar(32) | YES | NULL |  |  |
| `created` | datetime | NO | NULL |  |  |
| `updated` | datetime | NO | NULL |  |  |
| `expires` | datetime | YES | NULL |  |  |
| `path` | text | YES | NULL |  |  |
| `url` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| unique_file_id | refId | YES | BTREE |

---

## gwgo_myCRED_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `ref` | varchar(256) | NO | NULL |  |  |
| `ref_id` | int | YES | NULL |  |  |
| `user_id` | int | YES | NULL |  |  |
| `creds` | bigint | YES | NULL |  |  |
| `ctype` | varchar(64) | YES | mycred_default |  |  |
| `time` | bigint | YES | NULL |  |  |
| `entry` | longtext | YES | NULL |  |  |
| `data` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_nf3_action_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `parent_id` | int | NO | NULL |  |  |
| `key` | longtext | NO | NULL |  |  |
| `value` | longtext | YES | NULL |  |  |
| `meta_key` | longtext | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_nf3_actions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `title` | longtext | YES | NULL |  |  |
| `key` | longtext | YES | NULL |  |  |
| `type` | longtext | YES | NULL |  |  |
| `active` | tinyint(1) | YES | 1 |  |  |
| `parent_id` | int | NO | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `updated_at` | datetime | YES | NULL |  |  |
| `label` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_nf3_chunks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | YES | NULL |  |  |
| `value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_nf3_field_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `parent_id` | int | NO | NULL |  |  |
| `key` | longtext | NO | NULL |  |  |
| `value` | longtext | YES | NULL |  |  |
| `meta_key` | longtext | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_nf3_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `label` | longtext | YES | NULL |  |  |
| `key` | longtext | YES | NULL |  |  |
| `type` | longtext | YES | NULL |  |  |
| `parent_id` | int | NO | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `updated_at` | datetime | YES | NULL |  |  |
| `field_label` | longtext | YES | NULL |  |  |
| `field_key` | longtext | YES | NULL |  |  |
| `order` | int | YES | NULL |  |  |
| `required` | bit(1) | YES | NULL |  |  |
| `default_value` | longtext | YES | NULL |  |  |
| `label_pos` | varchar(15) | YES | NULL |  |  |
| `personally_identifiable` | bit(1) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_nf3_form_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `parent_id` | int | NO | NULL |  |  |
| `key` | longtext | NO | NULL |  |  |
| `value` | longtext | YES | NULL |  |  |
| `meta_key` | longtext | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_nf3_forms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `title` | longtext | YES | NULL |  |  |
| `key` | longtext | YES | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `updated_at` | datetime | YES | NULL |  |  |
| `views` | int | YES | NULL |  |  |
| `subs` | int | YES | NULL |  |  |
| `form_title` | longtext | YES | NULL |  |  |
| `default_label_pos` | varchar(15) | YES | NULL |  |  |
| `show_title` | bit(1) | YES | NULL |  |  |
| `clear_complete` | bit(1) | YES | NULL |  |  |
| `hide_complete` | bit(1) | YES | NULL |  |  |
| `logged_in` | bit(1) | YES | NULL |  |  |
| `seq_num` | int | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_nf3_object_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `parent_id` | int | NO | NULL |  |  |
| `key` | longtext | NO | NULL |  |  |
| `value` | longtext | YES | NULL |  |  |
| `meta_key` | longtext | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_nf3_objects

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `type` | longtext | YES | NULL |  |  |
| `title` | longtext | YES | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `updated_at` | datetime | YES | NULL |  |  |
| `object_title` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_nf3_relationships

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `child_id` | int | NO | NULL |  |  |
| `child_type` | longtext | NO | NULL |  |  |
| `parent_id` | int | NO | NULL |  |  |
| `parent_type` | longtext | NO | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `updated_at` | datetime | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_nf3_upgrades

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI |  |
| `cache` | longtext | YES | NULL |  |  |
| `stage` | int | NO | 0 |  |  |
| `maintenance` | bit(1) | YES | b'0' |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_nxs_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | mediumint | NO | NULL | PRI | auto_increment |
| `date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `act` | varchar(255) | NO | NULL |  |  |
| `nt` | varchar(255) | NO | NULL |  |  |
| `type` | varchar(255) | NO | NULL |  |  |
| `msg` | text | NO | NULL |  |  |
| `extInfo` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_options

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `option_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `option_name` | varchar(191) | YES | NULL | UNI |  |
| `option_value` | longtext | NO | NULL |  |  |
| `autoload` | varchar(20) | NO | yes | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| autoload | autoload | NO | BTREE |
| option_name | option_name | YES | BTREE |
| PRIMARY | option_id | YES | BTREE |

---

## gwgo_pmxe_exports

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `attch_id` | bigint | NO | 0 |  |  |
| `options` | longtext | YES | NULL |  |  |
| `scheduled` | varchar(64) | NO | NULL |  |  |
| `registered_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `friendly_name` | text | NO | NULL |  |  |
| `exported` | bigint | NO | 0 |  |  |
| `canceled` | tinyint(1) | NO | 0 |  |  |
| `canceled_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `settings_update_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `last_activity` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `processing` | tinyint(1) | NO | 0 |  |  |
| `executing` | tinyint(1) | NO | 0 |  |  |
| `triggered` | tinyint(1) | NO | 0 |  |  |
| `iteration` | bigint | NO | 0 |  |  |
| `parent_id` | bigint | NO | 0 |  |  |
| `export_post_type` | text | NO | NULL |  |  |
| `client_mode_enabled` | tinyint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_pmxe_google_cats

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI |  |
| `name` | varchar(200) | NO | NULL |  |  |
| `parent_id` | int | NO | NULL |  |  |
| `parent_name` | varchar(200) | NO | NULL |  |  |
| `level` | tinyint | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_pmxe_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint unsigned | NO | NULL |  |  |
| `export_id` | bigint unsigned | NO | NULL |  |  |
| `iteration` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_pmxe_templates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | NO | NULL |  |  |
| `options` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_pmxi_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `import_id` | bigint unsigned | NO | NULL |  |  |
| `name` | text | YES | NULL |  |  |
| `path` | text | YES | NULL |  |  |
| `registered_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_pmxi_history

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `import_id` | bigint unsigned | NO | NULL |  |  |
| `type` | enum('manual','processing','trigger','continue','') | NO | NULL |  |  |
| `time_run` | text | YES | NULL |  |  |
| `date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `summary` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_pmxi_images

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `attachment_id` | bigint unsigned | NO | NULL |  |  |
| `image_url` | varchar(600) | NO | NULL |  |  |
| `image_filename` | varchar(600) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_pmxi_imports

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `parent_import_id` | bigint | NO | 0 |  |  |
| `name` | text | YES | NULL |  |  |
| `friendly_name` | varchar(255) | NO | NULL |  |  |
| `type` | varchar(32) | NO | NULL |  |  |
| `feed_type` | enum('xml','csv','zip','gz','') | NO | NULL |  |  |
| `path` | text | YES | NULL |  |  |
| `xpath` | text | YES | NULL |  |  |
| `options` | longtext | YES | NULL |  |  |
| `registered_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `root_element` | varchar(255) | YES | NULL |  |  |
| `processing` | tinyint(1) | NO | 0 |  |  |
| `executing` | tinyint(1) | NO | 0 |  |  |
| `triggered` | tinyint(1) | NO | 0 |  |  |
| `queue_chunk_number` | bigint | NO | 0 |  |  |
| `first_import` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `count` | bigint | NO | 0 |  |  |
| `imported` | bigint | NO | 0 |  |  |
| `created` | bigint | NO | 0 |  |  |
| `updated` | bigint | NO | 0 |  |  |
| `skipped` | bigint | NO | 0 |  |  |
| `deleted` | bigint | NO | 0 |  |  |
| `canceled` | tinyint(1) | NO | 0 |  |  |
| `canceled_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `failed` | tinyint(1) | NO | 0 |  |  |
| `failed_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `settings_update_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `last_activity` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `iteration` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_pmxi_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint unsigned | NO | NULL | MUL |  |
| `import_id` | bigint unsigned | NO | NULL | MUL |  |
| `unique_key` | text | YES | NULL |  |  |
| `product_key` | text | YES | NULL |  |  |
| `iteration` | bigint | NO | 0 |  |  |
| `specified` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| import_id | import_id | NO | BTREE |
| post_id | post_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_pmxi_templates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `options` | longtext | YES | NULL |  |  |
| `scheduled` | varchar(64) | NO | NULL |  |  |
| `name` | varchar(200) | NO | NULL |  |  |
| `title` | text | YES | NULL |  |  |
| `content` | longtext | YES | NULL |  |  |
| `is_keep_linebreaks` | tinyint(1) | NO | 0 |  |  |
| `is_leave_html` | tinyint(1) | NO | 0 |  |  |
| `fix_characters` | tinyint(1) | NO | 0 |  |  |
| `meta` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_postmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| post_id | post_id | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## gwgo_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_author` | bigint unsigned | NO | 0 | MUL |  |
| `post_date` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `post_date_gmt` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `post_content` | longtext | NO | NULL |  |  |
| `post_title` | mediumtext | NO | NULL |  |  |
| `post_excerpt` | mediumtext | NO | NULL |  |  |
| `post_status` | varchar(20) | NO | publish |  |  |
| `comment_status` | varchar(20) | NO | open |  |  |
| `ping_status` | varchar(20) | NO | open |  |  |
| `post_password` | varchar(255) | NO | NULL |  |  |
| `post_name` | varchar(200) | NO | NULL | MUL |  |
| `to_ping` | mediumtext | NO | NULL |  |  |
| `pinged` | mediumtext | NO | NULL |  |  |
| `post_modified` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `post_modified_gmt` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `post_content_filtered` | longtext | NO | NULL |  |  |
| `post_parent` | bigint unsigned | NO | 0 | MUL |  |
| `guid` | varchar(255) | NO | NULL |  |  |
| `menu_order` | int | NO | 0 |  |  |
| `post_type` | varchar(20) | NO | post | MUL |  |
| `post_mime_type` | varchar(100) | NO | NULL |  |  |
| `comment_count` | bigint | NO | 0 |  |  |
| `company_listing_id` | bigint | NO | NULL |  |  |
| `is_giglancer_company` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| post_author | post_author | NO | BTREE |
| post_name | post_name | NO | BTREE |
| post_parent | post_parent | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| type_status_date | post_type | NO | BTREE |
| type_status_date | post_status | NO | BTREE |
| type_status_date | post_date | NO | BTREE |
| type_status_date | ID | NO | BTREE |

---

## gwgo_pps_countries

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `name` | varchar(128) | NO | NULL |  |  |
| `iso_code_2` | varchar(2) | YES | NULL |  |  |
| `iso_code_3` | varchar(3) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_pps_popup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `label` | varchar(255) | NO | NULL |  |  |
| `active` | tinyint(1) | NO | NULL |  |  |
| `original_id` | int | NO | 0 |  |  |
| `params` | text | NO | NULL |  |  |
| `html` | text | NO | NULL |  |  |
| `css` | text | NO | NULL |  |  |
| `img_preview` | varchar(128) | YES | NULL |  |  |
| `show_on` | tinyint(1) | NO | 0 |  |  |
| `show_to` | tinyint(1) | NO | 0 |  |  |
| `show_pages` | tinyint(1) | NO | 0 |  |  |
| `type_id` | tinyint(1) | NO | 1 |  |  |
| `views` | int | NO | 0 |  |  |
| `unique_views` | int | NO | 0 |  |  |
| `actions` | int | NO | 0 |  |  |
| `date_created` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `sort_order` | mediumint | NO | 0 |  |  |
| `show_in_admin_area` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_pps_popup_show_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `popup_id` | int | NO | NULL |  |  |
| `term_id` | int | NO | NULL |  |  |
| `not_show` | tinyint(1) | NO | 0 |  |  |

---

## gwgo_product_brandmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint | NO | NULL | PRI | auto_increment |
| `product_brand_id` | bigint | NO | 0 |  |  |
| `meta_key` | varchar(255) | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_id | meta_id | YES | BTREE |

---

## gwgo_product_catmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint | NO | NULL | PRI | auto_increment |
| `product_cat_id` | bigint | NO | 0 |  |  |
| `meta_key` | varchar(255) | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_id | meta_id | YES | BTREE |

---

## gwgo_pts_modules

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | smallint | NO | NULL | PRI | auto_increment |
| `code` | varchar(32) | NO | NULL | UNI |  |
| `active` | tinyint(1) | NO | 0 |  |  |
| `type_id` | tinyint(1) | NO | 0 |  |  |
| `label` | varchar(64) | YES | NULL |  |  |
| `ex_plug_dir` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| code | code | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_pts_modules_type

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | smallint | NO | NULL | PRI | auto_increment |
| `label` | varchar(32) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_pts_tables

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `unique_id` | varchar(8) | NO | NULL |  |  |
| `label` | varchar(128) | NO | NULL |  |  |
| `original_id` | int | NO | 0 |  |  |
| `params` | mediumtext | YES | NULL |  |  |
| `html` | mediumtext | YES | NULL |  |  |
| `css` | text | NO | NULL |  |  |
| `img` | varchar(64) | YES | NULL |  |  |
| `sort_order` | mediumint | NO | 0 |  |  |
| `is_base` | tinyint(1) | NO | 1 |  |  |
| `is_pro` | tinyint(1) | NO | 0 |  |  |
| `date_created` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_pts_usage_stat

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `code` | varchar(64) | NO | NULL | UNI |  |
| `visits` | int | NO | 0 |  |  |
| `spent_time` | int | NO | 0 |  |  |
| `modify_timestamp` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| code | code | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_pum_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint | NO | NULL | PRI | auto_increment |
| `email_hash` | varchar(32) | NO | NULL | MUL |  |
| `popup_id` | bigint | NO | NULL | MUL |  |
| `user_id` | bigint | NO | NULL | MUL |  |
| `email` | varchar(191) | NO | NULL | MUL |  |
| `name` | varchar(255) | NO | NULL |  |  |
| `fname` | varchar(255) | NO | NULL |  |  |
| `lname` | varchar(255) | NO | NULL |  |  |
| `uuid` | varchar(255) | NO | NULL |  |  |
| `consent` | varchar(255) | NO | NULL |  |  |
| `consent_args` | longtext | NO | NULL |  |  |
| `created` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| email | email | NO | BTREE |
| email_hash | email_hash | NO | BTREE |
| popup_id | popup_id | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## gwgo_pv_commission

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `product_id` | bigint | NO | NULL |  |  |
| `order_id` | bigint | NO | NULL |  |  |
| `vendor_id` | bigint | NO | NULL |  |  |
| `total_due` | decimal(20,2) | NO | NULL |  |  |
| `qty` | bigint | NO | NULL |  |  |
| `total_shipping` | decimal(20,2) | NO | NULL |  |  |
| `tax` | decimal(20,2) | NO | NULL |  |  |
| `status` | varchar(20) | NO | due |  |  |
| `time` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_pvc_daily

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `time` | date | NO | 0000-00-00 |  |  |
| `postnum` | varchar(255) | NO | NULL |  |  |
| `postcount` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_pvc_total

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `postnum` | varchar(255) | NO | NULL |  |  |
| `postcount` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_redirection_404

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `created` | datetime | NO | NULL | MUL |  |
| `url` | mediumtext | NO | NULL |  |  |
| `domain` | varchar(255) | YES | NULL |  |  |
| `agent` | varchar(255) | YES | NULL |  |  |
| `referrer` | varchar(255) | YES | NULL | MUL |  |
| `http_code` | int unsigned | NO | 0 |  |  |
| `request_method` | varchar(10) | YES | NULL |  |  |
| `request_data` | mediumtext | YES | NULL |  |  |
| `ip` | varchar(45) | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| created | created | NO | BTREE |
| ip | ip | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| referrer | referrer | NO | BTREE |

---

## gwgo_redirection_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(50) | NO | NULL |  |  |
| `tracking` | int | NO | 1 |  |  |
| `module_id` | int unsigned | NO | 0 | MUL |  |
| `status` | enum('enabled','disabled') | NO | enabled | MUL |  |
| `position` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| module_id | module_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| status | status | NO | BTREE |

---

## gwgo_redirection_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `url` | mediumtext | NO | NULL | MUL |  |
| `match_url` | varchar(2000) | YES | NULL | MUL |  |
| `match_data` | text | YES | NULL |  |  |
| `regex` | int unsigned | NO | 0 | MUL |  |
| `position` | int unsigned | NO | 0 |  |  |
| `last_count` | int unsigned | NO | 0 |  |  |
| `last_access` | datetime | NO | 1970-01-01 00:00:00 |  |  |
| `group_id` | int | NO | 0 | MUL |  |
| `status` | enum('enabled','disabled') | NO | enabled | MUL |  |
| `action_type` | varchar(20) | NO | NULL |  |  |
| `action_code` | int unsigned | NO | NULL |  |  |
| `action_data` | mediumtext | YES | NULL |  |  |
| `match_type` | varchar(20) | NO | NULL |  |  |
| `title` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| group | group_id | NO | BTREE |
| group_idpos | group_id | NO | BTREE |
| group_idpos | position | NO | BTREE |
| match_url | match_url | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| regex | regex | NO | BTREE |
| status | status | NO | BTREE |
| url | url | NO | BTREE |

---

## gwgo_redirection_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `created` | datetime | NO | NULL | MUL |  |
| `url` | mediumtext | NO | NULL |  |  |
| `domain` | varchar(255) | YES | NULL |  |  |
| `sent_to` | mediumtext | YES | NULL |  |  |
| `agent` | mediumtext | YES | NULL |  |  |
| `referrer` | mediumtext | YES | NULL |  |  |
| `http_code` | int unsigned | NO | 0 |  |  |
| `request_method` | varchar(10) | YES | NULL |  |  |
| `request_data` | mediumtext | YES | NULL |  |  |
| `redirect_by` | varchar(50) | YES | NULL |  |  |
| `redirection_id` | int unsigned | YES | NULL | MUL |  |
| `ip` | varchar(45) | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| created | created | NO | BTREE |
| ip | ip | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| redirection_id | redirection_id | NO | BTREE |

---

## gwgo_responsive_thumbnail_slider

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `title` | varchar(1000) | NO | NULL |  |  |
| `image_name` | varchar(500) | NO | NULL |  |  |
| `createdon` | datetime | NO | NULL |  |  |
| `custom_link` | varchar(1000) | YES | NULL |  |  |
| `post_id` | int unsigned | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_reviewx_criterias

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `review_id` | int | NO | NULL |  |  |
| `criteria_id` | varchar(20) | NO | NULL |  |  |
| `rating` | int | NO | NULL |  |  |
| `is_automated` | int | NO | NULL |  |  |

---

## gwgo_reviewx_import_history

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `batch_id` | int | NO | NULL | PRI |  |
| `file_name` | varchar(255) | NO | NULL |  |  |
| `import_date` | date | NO | NULL |  |  |
| `status` | varchar(20) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | batch_id | YES | BTREE |

---

## gwgo_reviewx_process_jobs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `process_name` | varchar(20) | NO | NULL |  |  |
| `process_meta` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_reviewx_reminder_email

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `order_id` | int | NO | NULL |  |  |
| `customer_email` | varchar(100) | NO | NULL |  |  |
| `order_items` | int | NO | NULL |  |  |
| `order_status` | varchar(20) | NO | NULL |  |  |
| `order_date` | date | NO | NULL |  |  |
| `status` | varchar(50) | NO | NULL |  |  |
| `max_delivery` | int | NO | NULL |  |  |
| `total_delivery` | int | NO | 0 |  |  |
| `processed_email` | text | YES | NULL |  |  |
| `scheduled_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `is_subscribe` | int | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_video_slider_effects_data

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `slider_vid_name` | varchar(255) | NO | NULL |  |  |
| `slider_Vid_type` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_video_slider_font_family

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Font_family` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_video_slider_id

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Slider_ID` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_video_slider_manager

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Slider_Title` | varchar(255) | NO | NULL |  |  |
| `Slider_Type` | varchar(255) | NO | NULL |  |  |
| `Slider_Video_Quantity` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_video_slider_videos

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Rich_Web_VSlider_Vid_Title` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Add_Desc` | longtext | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Img` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Vid` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Src` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Link` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_ONT` | varchar(255) | NO | NULL |  |  |
| `Slider_ID` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_vs_effect_10_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_vs_effect_1_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_vs_effect_2_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_vs_effect_3_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_vs_effect_4_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_vs_effect_5_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_vs_effect_6_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_vs_effect_7_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_vs_effect_8_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_rich_web_vs_effect_9_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_sb_infinite_scroll

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `status` | int | YES | NULL |  |  |
| `title` | varchar(1000) | YES | NULL |  |  |
| `pagination_type` | varchar(30) | YES | NULL |  |  |
| `content_selector` | varchar(1000) | YES | NULL |  |  |
| `navigation_selector` | varchar(1000) | YES | NULL |  |  |
| `next_selector` | varchar(1000) | YES | NULL |  |  |
| `body_class` | varchar(1000) | YES | NULL |  |  |
| `item_selector` | varchar(1000) | YES | NULL |  |  |
| `buffer_pixels` | int | YES | NULL |  |  |
| `scrolltop` | int | YES | NULL |  |  |
| `scrollto` | varchar(1000) | YES | NULL |  |  |
| `loading_message` | varchar(1000) | YES | NULL |  |  |
| `finished_message` | varchar(1000) | YES | NULL |  |  |
| `loading_wrapper_class` | varchar(1000) | YES | NULL |  |  |
| `loading_image` | varchar(1000) | YES | NULL |  |  |
| `load_more_button_text` | varchar(1000) | YES | NULL |  |  |
| `load_more_button_class` | varchar(1000) | YES | NULL |  |  |
| `animation` | varchar(50) | YES | NULL |  |  |
| `onstart` | longtext | YES | NULL |  |  |
| `onfinish` | longtext | YES | NULL |  |  |
| `miscellaneous` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_signups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `signup_id` | bigint | NO | NULL | PRI | auto_increment |
| `domain` | varchar(200) | NO | NULL | MUL |  |
| `path` | varchar(100) | NO | NULL |  |  |
| `title` | longtext | NO | NULL |  |  |
| `user_login` | varchar(60) | NO | NULL | MUL |  |
| `user_email` | varchar(100) | NO | NULL | MUL |  |
| `registered` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `activated` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `active` | tinyint(1) | NO | 0 |  |  |
| `activation_key` | varchar(50) | NO | NULL | MUL |  |
| `meta` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| activation_key | activation_key | NO | BTREE |
| domain_path | domain | NO | BTREE |
| domain_path | path | NO | BTREE |
| PRIMARY | signup_id | YES | BTREE |
| user_email | user_email | NO | BTREE |
| user_login_email | user_login | NO | BTREE |
| user_login_email | user_email | NO | BTREE |

---

## gwgo_simpleviews

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `post_id` | int | NO | NULL | PRI |  |
| `view` | int | YES | NULL |  |  |
| `view_datetime` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | post_id | YES | BTREE |

---

## gwgo_snippets

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `name` | tinytext | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `code` | longtext | NO | NULL |  |  |
| `tags` | longtext | NO | NULL |  |  |
| `scope` | varchar(15) | NO | global | MUL |  |
| `condition_id` | bigint | NO | 0 |  |  |
| `priority` | smallint | NO | 10 |  |  |
| `active` | tinyint(1) | NO | 0 | MUL |  |
| `modified` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `revision` | bigint | NO | 1 |  |  |
| `cloud_id` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| active | active | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| scope | scope | NO | BTREE |

---

## gwgo_term_relationships

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `object_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_taxonomy_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_order` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | object_id | YES | BTREE |
| PRIMARY | term_taxonomy_id | YES | BTREE |
| term_taxonomy_id | term_taxonomy_id | NO | BTREE |

---

## gwgo_term_taxonomy

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_taxonomy_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `taxonomy` | varchar(32) | NO | NULL | MUL |  |
| `description` | longtext | NO | NULL |  |  |
| `parent` | bigint unsigned | NO | 0 |  |  |
| `count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | term_taxonomy_id | YES | BTREE |
| taxonomy | taxonomy | NO | BTREE |
| term_id_taxonomy | term_id | YES | BTREE |
| term_id_taxonomy | taxonomy | YES | BTREE |

---

## gwgo_termmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |
| term_id | term_id | NO | BTREE |

---

## gwgo_terms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | NO | NULL | MUL |  |
| `slug` | varchar(200) | NO | NULL | MUL |  |
| `term_group` | bigint | NO | 0 |  |  |
| `order_no` | bigint | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | NO | BTREE |
| PRIMARY | term_id | YES | BTREE |
| slug | slug | NO | BTREE |

---

## gwgo_thumbnail_slider

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `title` | varchar(1000) | NO | NULL |  |  |
| `image_name` | varchar(500) | NO | NULL |  |  |
| `createdon` | datetime | NO | NULL |  |  |
| `custom_link` | varchar(1000) | YES | NULL |  |  |
| `post_id` | int unsigned | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_tm_taskmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint | NO | NULL | PRI | auto_increment |
| `task_id` | bigint | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |
| task_id | task_id | NO | BTREE |

---

## gwgo_tm_tasks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | bigint | NO | NULL | MUL |  |
| `type` | varchar(300) | NO | NULL |  |  |
| `class_identifier` | varchar(300) | YES | 0 |  |  |
| `attempts` | int | YES | 0 |  |  |
| `description` | varchar(300) | YES | NULL |  |  |
| `time_created` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `last_locked_at` | bigint | YES | 0 |  |  |
| `status` | varchar(300) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## gwgo_usermeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `umeta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | umeta_id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## gwgo_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_login` | varchar(60) | NO | NULL | MUL |  |
| `user_pass` | varchar(255) | NO | NULL |  |  |
| `user_nicename` | varchar(50) | NO | NULL | MUL |  |
| `user_email` | varchar(100) | NO | NULL | MUL |  |
| `user_url` | varchar(100) | NO | NULL |  |  |
| `user_registered` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `user_activation_key` | varchar(255) | NO | NULL |  |  |
| `user_status` | int | NO | 0 |  |  |
| `display_name` | varchar(250) | NO | NULL |  |  |
| `signup_step` | enum('','register_company','register_product_service','digital_marketing_report','leads_dashboard','estimate_project','download_app','done') | NO | NULL |  |  |
| `signup_progress` | varchar(8) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |
| user_email | user_email | NO | BTREE |
| user_login_key | user_login | NO | BTREE |
| user_nicename | user_nicename | NO | BTREE |

---

## gwgo_wc_admin_note_actions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `action_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `note_id` | bigint unsigned | NO | NULL | MUL |  |
| `name` | varchar(255) | NO | NULL |  |  |
| `label` | varchar(255) | NO | NULL |  |  |
| `query` | longtext | NO | NULL |  |  |
| `status` | varchar(255) | NO | NULL |  |  |
| `is_primary` | tinyint(1) | NO | 0 |  |  |
| `actioned_text` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| note_id | note_id | NO | BTREE |
| PRIMARY | action_id | YES | BTREE |

---

## gwgo_wc_admin_notes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `note_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(255) | NO | NULL |  |  |
| `type` | varchar(20) | NO | NULL |  |  |
| `locale` | varchar(20) | NO | NULL |  |  |
| `title` | longtext | NO | NULL |  |  |
| `content` | longtext | NO | NULL |  |  |
| `icon` | varchar(200) | NO | info |  |  |
| `content_data` | longtext | YES | NULL |  |  |
| `status` | varchar(200) | NO | NULL |  |  |
| `source` | varchar(200) | NO | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_reminder` | datetime | YES | NULL |  |  |
| `is_snoozable` | tinyint(1) | NO | 0 |  |  |
| `layout` | varchar(20) | NO | NULL |  |  |
| `image` | varchar(200) | YES | NULL |  |  |
| `is_deleted` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | note_id | YES | BTREE |

---

## gwgo_wc_category_lookup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `category_tree_id` | bigint unsigned | NO | NULL | PRI |  |
| `category_id` | bigint unsigned | NO | NULL | PRI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | category_tree_id | YES | BTREE |
| PRIMARY | category_id | YES | BTREE |

---

## gwgo_wc_customer_lookup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `customer_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | bigint unsigned | YES | NULL | UNI |  |
| `username` | varchar(60) | NO | NULL |  |  |
| `first_name` | varchar(255) | NO | NULL |  |  |
| `last_name` | varchar(255) | NO | NULL |  |  |
| `email` | varchar(100) | YES | NULL | MUL |  |
| `date_last_active` | timestamp | YES | NULL |  |  |
| `date_registered` | timestamp | YES | NULL |  |  |
| `country` | char(2) | NO | NULL |  |  |
| `postcode` | varchar(20) | NO | NULL |  |  |
| `city` | varchar(100) | NO | NULL |  |  |
| `state` | varchar(100) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| email | email | NO | BTREE |
| PRIMARY | customer_id | YES | BTREE |
| user_id | user_id | YES | BTREE |

---

## gwgo_wc_download_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `download_log_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `timestamp` | datetime | NO | NULL | MUL |  |
| `permission_id` | bigint unsigned | NO | NULL | MUL |  |
| `user_id` | bigint unsigned | YES | NULL |  |  |
| `user_ip_address` | varchar(100) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| permission_id | permission_id | NO | BTREE |
| PRIMARY | download_log_id | YES | BTREE |
| timestamp | timestamp | NO | BTREE |

---

## gwgo_wc_order_coupon_lookup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `order_id` | bigint unsigned | NO | NULL | PRI |  |
| `coupon_id` | bigint | NO | NULL | PRI |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `discount_amount` | double | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| coupon_id | coupon_id | NO | BTREE |
| date_created | date_created | NO | BTREE |
| PRIMARY | order_id | YES | BTREE |
| PRIMARY | coupon_id | YES | BTREE |

---

## gwgo_wc_order_product_lookup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `order_item_id` | bigint unsigned | NO | NULL | PRI |  |
| `order_id` | bigint unsigned | NO | NULL | MUL |  |
| `product_id` | bigint unsigned | NO | NULL | MUL |  |
| `variation_id` | bigint unsigned | NO | NULL |  |  |
| `customer_id` | bigint unsigned | YES | NULL | MUL |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `product_qty` | int | NO | NULL |  |  |
| `product_net_revenue` | double | NO | 0 |  |  |
| `product_gross_revenue` | double | NO | 0 |  |  |
| `coupon_amount` | double | NO | 0 |  |  |
| `tax_amount` | double | NO | 0 |  |  |
| `shipping_amount` | double | NO | 0 |  |  |
| `shipping_tax_amount` | double | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| customer_id | customer_id | NO | BTREE |
| date_created | date_created | NO | BTREE |
| order_id | order_id | NO | BTREE |
| PRIMARY | order_item_id | YES | BTREE |
| product_id | product_id | NO | BTREE |

---

## gwgo_wc_order_stats

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `order_id` | bigint unsigned | NO | NULL | PRI |  |
| `parent_id` | bigint unsigned | NO | 0 |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `date_created_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `num_items_sold` | int | NO | 0 |  |  |
| `total_sales` | double | NO | 0 |  |  |
| `tax_total` | double | NO | 0 |  |  |
| `shipping_total` | double | NO | 0 |  |  |
| `net_total` | double | NO | 0 |  |  |
| `returning_customer` | tinyint(1) | YES | NULL |  |  |
| `status` | varchar(200) | NO | NULL | MUL |  |
| `customer_id` | bigint unsigned | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| customer_id | customer_id | NO | BTREE |
| date_created | date_created | NO | BTREE |
| PRIMARY | order_id | YES | BTREE |
| status | status | NO | BTREE |

---

## gwgo_wc_order_tax_lookup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `order_id` | bigint unsigned | NO | NULL | PRI |  |
| `tax_rate_id` | bigint unsigned | NO | NULL | PRI |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `shipping_tax` | double | NO | 0 |  |  |
| `order_tax` | double | NO | 0 |  |  |
| `total_tax` | double | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| date_created | date_created | NO | BTREE |
| PRIMARY | order_id | YES | BTREE |
| PRIMARY | tax_rate_id | YES | BTREE |
| tax_rate_id | tax_rate_id | NO | BTREE |

---

## gwgo_wc_product_meta_lookup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `product_id` | bigint | NO | NULL | PRI |  |
| `sku` | varchar(100) | YES | NULL |  |  |
| `virtual` | tinyint(1) | YES | 0 | MUL |  |
| `downloadable` | tinyint(1) | YES | 0 | MUL |  |
| `min_price` | decimal(19,4) | YES | NULL | MUL |  |
| `max_price` | decimal(19,4) | YES | NULL |  |  |
| `onsale` | tinyint(1) | YES | 0 | MUL |  |
| `stock_quantity` | double | YES | NULL | MUL |  |
| `stock_status` | varchar(100) | YES | instock | MUL |  |
| `rating_count` | bigint | YES | 0 |  |  |
| `average_rating` | decimal(3,2) | YES | 0.00 |  |  |
| `total_sales` | bigint | YES | 0 |  |  |
| `tax_status` | varchar(100) | YES | taxable |  |  |
| `tax_class` | varchar(100) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| downloadable | downloadable | NO | BTREE |
| min_max_price | min_price | NO | BTREE |
| min_max_price | max_price | NO | BTREE |
| onsale | onsale | NO | BTREE |
| PRIMARY | product_id | YES | BTREE |
| stock_quantity | stock_quantity | NO | BTREE |
| stock_status | stock_status | NO | BTREE |
| virtual | virtual | NO | BTREE |

---

## gwgo_wc_reserved_stock

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `order_id` | bigint | NO | NULL | PRI |  |
| `product_id` | bigint | NO | NULL | PRI |  |
| `stock_quantity` | double | NO | 0 |  |  |
| `timestamp` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `expires` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | order_id | YES | BTREE |
| PRIMARY | product_id | YES | BTREE |

---

## gwgo_wc_tax_rate_classes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `tax_rate_class_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | NO | NULL |  |  |
| `slug` | varchar(200) | NO | NULL | UNI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | tax_rate_class_id | YES | BTREE |
| slug | slug | YES | BTREE |

---

## gwgo_wc_webhooks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `webhook_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `status` | varchar(200) | NO | NULL |  |  |
| `name` | text | NO | NULL |  |  |
| `user_id` | bigint unsigned | NO | NULL | MUL |  |
| `delivery_url` | text | NO | NULL |  |  |
| `secret` | text | NO | NULL |  |  |
| `topic` | varchar(200) | NO | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_created_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_modified_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `api_version` | smallint | NO | NULL |  |  |
| `failure_count` | smallint | NO | 0 |  |  |
| `pending_delivery` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | webhook_id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## gwgo_wcv_feedback

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `rating` | bigint | NO | NULL |  |  |
| `order_id` | bigint | NO | NULL |  |  |
| `vendor_id` | bigint | NO | NULL |  |  |
| `product_id` | bigint | NO | NULL |  |  |
| `customer_id` | bigint | NO | NULL |  |  |
| `rating_title` | varchar(255) | YES | NULL |  |  |
| `comments` | longtext | YES | NULL |  |  |
| `postdate` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_woocommerce_api_keys

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `key_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | bigint unsigned | NO | NULL |  |  |
| `description` | varchar(200) | YES | NULL |  |  |
| `permissions` | varchar(10) | NO | NULL |  |  |
| `consumer_key` | char(64) | NO | NULL | MUL |  |
| `consumer_secret` | char(43) | NO | NULL | MUL |  |
| `nonces` | longtext | YES | NULL |  |  |
| `truncated_key` | char(7) | NO | NULL |  |  |
| `last_access` | datetime | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| consumer_key | consumer_key | NO | BTREE |
| consumer_secret | consumer_secret | NO | BTREE |
| PRIMARY | key_id | YES | BTREE |

---

## gwgo_woocommerce_attribute_taxonomies

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `attribute_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `attribute_name` | varchar(200) | NO | NULL | MUL |  |
| `attribute_label` | varchar(200) | YES | NULL |  |  |
| `attribute_type` | varchar(20) | NO | NULL |  |  |
| `attribute_orderby` | varchar(20) | NO | NULL |  |  |
| `attribute_public` | int | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| attribute_name | attribute_name | NO | BTREE |
| PRIMARY | attribute_id | YES | BTREE |

---

## gwgo_woocommerce_downloadable_product_permissions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `permission_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `download_id` | varchar(36) | NO | NULL | MUL |  |
| `product_id` | bigint unsigned | NO | NULL | MUL |  |
| `order_id` | bigint unsigned | NO | 0 | MUL |  |
| `order_key` | varchar(200) | NO | NULL |  |  |
| `user_email` | varchar(200) | NO | NULL |  |  |
| `user_id` | bigint unsigned | YES | NULL | MUL |  |
| `downloads_remaining` | varchar(9) | YES | NULL |  |  |
| `access_granted` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `access_expires` | datetime | YES | NULL |  |  |
| `download_count` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| download_order_key_product | product_id | NO | BTREE |
| download_order_key_product | order_id | NO | BTREE |
| download_order_key_product | order_key | NO | BTREE |
| download_order_key_product | download_id | NO | BTREE |
| download_order_product | download_id | NO | BTREE |
| download_order_product | order_id | NO | BTREE |
| download_order_product | product_id | NO | BTREE |
| order_id | order_id | NO | BTREE |
| PRIMARY | permission_id | YES | BTREE |
| user_order_remaining_expires | user_id | NO | BTREE |
| user_order_remaining_expires | order_id | NO | BTREE |
| user_order_remaining_expires | downloads_remaining | NO | BTREE |
| user_order_remaining_expires | access_expires | NO | BTREE |

---

## gwgo_woocommerce_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `log_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `timestamp` | datetime | NO | NULL |  |  |
| `level` | smallint | NO | NULL | MUL |  |
| `source` | varchar(200) | NO | NULL |  |  |
| `message` | longtext | NO | NULL |  |  |
| `context` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| level | level | NO | BTREE |
| PRIMARY | log_id | YES | BTREE |

---

## gwgo_woocommerce_order_itemmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `order_item_id` | bigint unsigned | NO | NULL | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| order_item_id | order_item_id | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## gwgo_woocommerce_order_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `order_item_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `order_item_name` | longtext | NO | NULL |  |  |
| `order_item_type` | varchar(200) | NO | NULL |  |  |
| `order_id` | bigint unsigned | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| order_id | order_id | NO | BTREE |
| PRIMARY | order_item_id | YES | BTREE |

---

## gwgo_woocommerce_payment_tokenmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `payment_token_id` | bigint unsigned | NO | NULL | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| payment_token_id | payment_token_id | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## gwgo_woocommerce_payment_tokens

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `token_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `gateway_id` | varchar(200) | NO | NULL |  |  |
| `token` | text | NO | NULL |  |  |
| `user_id` | bigint unsigned | NO | 0 | MUL |  |
| `type` | varchar(200) | NO | NULL |  |  |
| `is_default` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | token_id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## gwgo_woocommerce_sessions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `session_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `session_key` | char(32) | NO | NULL | UNI |  |
| `session_value` | longtext | NO | NULL |  |  |
| `session_expiry` | bigint unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | session_id | YES | BTREE |
| session_key | session_key | YES | BTREE |

---

## gwgo_woocommerce_shipping_zone_locations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `location_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `zone_id` | bigint unsigned | NO | NULL |  |  |
| `location_code` | varchar(200) | NO | NULL |  |  |
| `location_type` | varchar(40) | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| location_id | location_id | NO | BTREE |
| location_type | location_type | NO | BTREE |
| location_type_code | location_type | NO | BTREE |
| location_type_code | location_code | NO | BTREE |
| PRIMARY | location_id | YES | BTREE |

---

## gwgo_woocommerce_shipping_zone_methods

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `zone_id` | bigint unsigned | NO | NULL |  |  |
| `instance_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `method_id` | varchar(200) | NO | NULL |  |  |
| `method_order` | bigint unsigned | NO | NULL |  |  |
| `is_enabled` | tinyint(1) | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | instance_id | YES | BTREE |

---

## gwgo_woocommerce_shipping_zones

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `zone_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `zone_name` | varchar(200) | NO | NULL |  |  |
| `zone_order` | bigint unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | zone_id | YES | BTREE |

---

## gwgo_woocommerce_tax_rate_locations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `location_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `location_code` | varchar(200) | NO | NULL |  |  |
| `tax_rate_id` | bigint unsigned | NO | NULL | MUL |  |
| `location_type` | varchar(40) | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| location_type | location_type | NO | BTREE |
| location_type_code | location_type | NO | BTREE |
| location_type_code | location_code | NO | BTREE |
| PRIMARY | location_id | YES | BTREE |
| tax_rate_id | tax_rate_id | NO | BTREE |

---

## gwgo_woocommerce_tax_rates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `tax_rate_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `tax_rate_country` | varchar(2) | NO | NULL | MUL |  |
| `tax_rate_state` | varchar(200) | NO | NULL | MUL |  |
| `tax_rate` | varchar(8) | NO | NULL |  |  |
| `tax_rate_name` | varchar(200) | NO | NULL |  |  |
| `tax_rate_priority` | bigint unsigned | NO | NULL | MUL |  |
| `tax_rate_compound` | int | NO | 0 |  |  |
| `tax_rate_shipping` | int | NO | 1 |  |  |
| `tax_rate_order` | bigint unsigned | NO | NULL |  |  |
| `tax_rate_class` | varchar(200) | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | tax_rate_id | YES | BTREE |
| tax_rate_class | tax_rate_class | NO | BTREE |
| tax_rate_country | tax_rate_country | NO | BTREE |
| tax_rate_priority | tax_rate_priority | NO | BTREE |
| tax_rate_state | tax_rate_state | NO | BTREE |

---

## gwgo_wow_mwp

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | mediumint | NO | NULL | PRI | auto_increment |
| `title` | varchar(200) | NO | NULL |  |  |
| `param` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## gwgo_wp125_ads

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `slot` | int | NO | NULL |  |  |
| `name` | text | NO | NULL |  |  |
| `clicks` | int | NO | NULL |  |  |
| `start_date` | varchar(12) | NO | NULL |  |  |
| `end_date` | varchar(12) | NO | NULL |  |  |
| `status` | int | NO | NULL |  |  |
| `target` | text | NO | NULL |  |  |
| `image_url` | text | NO | NULL |  |  |
| `pre_exp_email` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpaie_file_manager

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `file_id` | int | NO | NULL | PRI | auto_increment |
| `file_name` | tinytext | NO | NULL |  |  |
| `absolute_path` | text | NO | NULL |  |  |
| `file_path` | text | NO | NULL |  |  |
| `file_type` | text | NO | NULL |  |  |
| `file_info` | varchar(200) | NO | NULL |  |  |
| `imported_ids` | text | NO | NULL |  |  |
| `upload_time` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | file_id | YES | BTREE |

---

## gwgo_wpbdp_fees

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `label` | varchar(255) | NO | NULL |  |  |
| `amount` | decimal(10,2) | NO | 0.00 |  |  |
| `days` | smallint unsigned | NO | 0 |  |  |
| `images` | smallint unsigned | NO | 0 |  |  |
| `categories` | blob | NO | NULL |  |  |
| `extra_data` | blob | YES | NULL |  |  |
| `weight` | int | NO | 0 |  |  |
| `sticky` | tinyint(1) | NO | 0 |  |  |
| `enabled` | tinyint(1) | NO | 1 |  |  |
| `tag` | varchar(255) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpbdp_form_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `label` | varchar(255) | NO | NULL |  |  |
| `description` | varchar(255) | YES | NULL |  |  |
| `field_type` | varchar(100) | NO | NULL | MUL |  |
| `association` | varchar(100) | NO | NULL |  |  |
| `validators` | text | YES | NULL |  |  |
| `weight` | int | NO | 0 |  |  |
| `display_flags` | text | YES | NULL |  |  |
| `field_data` | blob | YES | NULL |  |  |
| `shortname` | varchar(255) | NO | NULL |  |  |
| `tag` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| field_type | field_type | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpbdp_listing_claims

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `listing_id` | bigint | NO | NULL |  |  |
| `status` | varchar(20) | NO | pending |  |  |
| `user_id` | bigint | NO | NULL |  |  |
| `user_comment` | text | YES | NULL |  |  |
| `answer` | text | YES | NULL |  |  |
| `payment_id` | bigint | NO | 0 |  |  |
| `created_on` | datetime | NO | NULL |  |  |
| `processed_on` | datetime | YES | NULL |  |  |
| `data` | blob | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpbdp_listing_fees

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `listing_id` | bigint | NO | NULL | MUL |  |
| `category_id` | bigint | NO | NULL |  |  |
| `expires_on` | timestamp | YES | NULL | MUL |  |
| `email_sent` | tinyint(1) | NO | 0 |  |  |
| `fee_id` | bigint | YES | NULL |  |  |
| `fee_days` | smallint unsigned | NO | NULL |  |  |
| `fee_images` | smallint unsigned | NO | 0 |  |  |
| `recurring` | tinyint(1) | NO | 0 |  |  |
| `recurring_id` | varchar(255) | YES | NULL |  |  |
| `recurring_data` | blob | YES | NULL |  |  |
| `sticky` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| expires_and_email | expires_on | NO | BTREE |
| expires_and_email | email_sent | NO | BTREE |
| listing_cat | listing_id | NO | BTREE |
| listing_cat | category_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpbdp_listings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `listing_id` | bigint | NO | NULL | PRI |  |
| `fee_id` | bigint | YES | NULL |  |  |
| `fee_price` | decimal(10,2) | YES | 0.00 |  |  |
| `fee_days` | smallint unsigned | YES | 0 |  |  |
| `fee_images` | smallint unsigned | YES | 0 |  |  |
| `expiration_date` | timestamp | YES | NULL |  |  |
| `is_recurring` | tinyint(1) | NO | 0 |  |  |
| `is_sticky` | tinyint(1) | NO | 0 |  |  |
| `subscription_id` | varchar(255) | YES | NULL |  |  |
| `subscription_data` | longblob | YES | NULL |  |  |
| `listing_status` | varchar(255) | NO | unknown |  |  |
| `flags` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | listing_id | YES | BTREE |

---

## gwgo_wpbdp_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `object_id` | bigint | YES | 0 |  |  |
| `rel_object_id` | bigint | YES | 0 |  |  |
| `object_type` | varchar(20) | YES | NULL |  |  |
| `created_at` | datetime | NO | NULL |  |  |
| `log_type` | varchar(255) | YES | NULL |  |  |
| `actor` | varchar(255) | YES | NULL |  |  |
| `message` | text | YES | NULL |  |  |
| `data` | longblob | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpbdp_payments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `listing_id` | bigint | NO | NULL | MUL |  |
| `gateway` | varchar(255) | YES | NULL |  |  |
| `amount` | decimal(10,2) | NO | 0.00 |  |  |
| `status` | varchar(255) | NO | NULL | MUL |  |
| `created_on` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `processed_on` | timestamp | YES | NULL |  |  |
| `processed_by` | varchar(255) | NO | gateway |  |  |
| `payerinfo` | blob | YES | NULL |  |  |
| `extra_data` | longblob | YES | NULL |  |  |
| `currency_code` | varchar(3) | NO | USD |  |  |
| `notes` | longblob | YES | NULL |  |  |
| `tag` | varchar(255) | YES | NULL |  |  |
| `parent_id` | bigint | NO | 0 |  |  |
| `payment_key` | varchar(255) | YES | NULL |  |  |
| `payment_type` | varchar(255) | YES | NULL |  |  |
| `payment_items` | longblob | YES | NULL |  |  |
| `data` | longblob | YES | NULL |  |  |
| `context` | varchar(255) | YES | NULL |  |  |
| `payer_email` | varchar(255) | YES | NULL |  |  |
| `payer_first_name` | varchar(255) | YES | NULL |  |  |
| `payer_last_name` | varchar(255) | YES | NULL |  |  |
| `payer_data` | blob | YES | NULL |  |  |
| `gateway_tx_id` | varchar(255) | YES | NULL |  |  |
| `created_at` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `is_test` | tinyint(1) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| listing_id | listing_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| status | status | NO | BTREE |

---

## gwgo_wpbdp_payments_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `payment_id` | bigint | NO | NULL |  |  |
| `amount` | decimal(10,2) | NO | 0.00 |  |  |
| `item_type` | varchar(100) | NO | charge |  |  |
| `description` | varchar(255) | NO | Charge |  |  |
| `rel_id_1` | bigint | YES | NULL |  |  |
| `rel_id_2` | bigint | YES | NULL |  |  |
| `data` | longblob | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpbdp_plans

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `label` | varchar(255) | NO | NULL |  |  |
| `amount` | decimal(10,2) | NO | 0.00 |  |  |
| `days` | smallint unsigned | NO | 0 |  |  |
| `images` | smallint unsigned | NO | 0 |  |  |
| `sticky` | tinyint(1) | NO | 0 |  |  |
| `recurring` | tinyint(1) | NO | 0 |  |  |
| `pricing_model` | varchar(100) | NO | flat |  |  |
| `pricing_details` | blob | YES | NULL |  |  |
| `supported_categories` | text | NO | NULL |  |  |
| `weight` | int | NO | 0 |  |  |
| `enabled` | tinyint(1) | NO | 1 |  |  |
| `description` | text | YES | NULL |  |  |
| `extra_data` | longblob | YES | NULL |  |  |
| `tag` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpbdp_ratings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | mediumint | NO | NULL | PRI | auto_increment |
| `listing_id` | bigint | NO | NULL | MUL |  |
| `rating` | tinyint unsigned | NO | 0 |  |  |
| `user_id` | bigint | NO | 0 |  |  |
| `user_name` | varchar(255) | YES | NULL |  |  |
| `ip_address` | varchar(255) | NO | NULL |  |  |
| `comment` | text | YES | NULL |  |  |
| `created_on` | datetime | NO | NULL |  |  |
| `approved` | tinyint unsigned | NO | 1 |  |  |
| `user_email` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| listing_id | listing_id | NO | BTREE |
| listing_id_index | listing_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpbdp_regionmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `region_id` | bigint unsigned | NO | NULL |  |  |
| `meta_key` | varchar(255) | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | meta_id | YES | BTREE |

---

## gwgo_wpbdp_submit_state

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | varchar(64) | NO | NULL | PRI |  |
| `state` | longblob | NO | NULL |  |  |
| `updated_on` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpbdp_x_featured_levels

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | varchar(255) | NO | NULL | PRI |  |
| `name` | varchar(255) | NO | NULL |  |  |
| `weight` | int | NO | 0 |  |  |
| `description` | text | YES | NULL |  |  |
| `cost` | decimal(10,2) | NO | 0.00 |  |  |
| `form_fields` | blob | YES | NULL |  |  |
| `extra_data` | blob | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpbdp_zipcodes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `zip` | varchar(10) | NO | NULL | MUL |  |
| `latitude` | float | NO | NULL |  |  |
| `longitude` | float | NO | NULL |  |  |
| `country` | varchar(2) | NO | NULL |  |  |
| `city` | varchar(100) | YES | NULL |  |  |
| `state` | varchar(100) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| zip | zip | NO | BTREE |

---

## gwgo_wpbdp_zipcodes_listings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `listing_id` | bigint | NO | 0 | PRI |  |
| `zip` | varchar(10) | YES | NULL |  |  |
| `latitude` | float | YES | NULL |  |  |
| `longitude` | float | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | listing_id | YES | BTREE |

---

## gwgo_wpfm_backup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `backup_name` | text | YES | NULL |  |  |
| `backup_date` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpforms_payment_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `payment_id` | bigint | NO | NULL | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| meta_value | meta_value | NO | BTREE |
| payment_id | payment_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpforms_payments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `form_id` | bigint | NO | NULL | MUL |  |
| `status` | varchar(10) | NO | NULL | MUL |  |
| `subtotal_amount` | decimal(26,8) | NO | 0.00000000 |  |  |
| `discount_amount` | decimal(26,8) | NO | 0.00000000 |  |  |
| `total_amount` | decimal(26,8) | NO | 0.00000000 | MUL |  |
| `currency` | varchar(3) | NO | NULL |  |  |
| `entry_id` | bigint | NO | 0 |  |  |
| `gateway` | varchar(20) | NO | NULL |  |  |
| `type` | varchar(12) | NO | NULL | MUL |  |
| `mode` | varchar(4) | NO | NULL |  |  |
| `transaction_id` | varchar(40) | NO | NULL | MUL |  |
| `customer_id` | varchar(40) | NO | NULL | MUL |  |
| `subscription_id` | varchar(40) | NO | NULL | MUL |  |
| `subscription_status` | varchar(10) | NO | NULL | MUL |  |
| `title` | varchar(255) | NO | NULL | MUL |  |
| `date_created_gmt` | datetime | NO | NULL |  |  |
| `date_updated_gmt` | datetime | NO | NULL |  |  |
| `is_published` | tinyint(1) | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| customer_id | customer_id | NO | BTREE |
| form_id | form_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| status | status | NO | BTREE |
| subscription_id | subscription_id | NO | BTREE |
| subscription_status | subscription_status | NO | BTREE |
| title | title | NO | BTREE |
| total_amount | total_amount | NO | BTREE |
| transaction_id | transaction_id | NO | BTREE |
| type | type | NO | BTREE |

---

## gwgo_wpforms_tasks_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `action` | varchar(255) | NO | NULL |  |  |
| `data` | longtext | NO | NULL |  |  |
| `date` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpmailsmtp_debug_events

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `content` | text | YES | NULL |  |  |
| `initiator` | text | YES | NULL |  |  |
| `event_type` | tinyint unsigned | NO | 0 |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_wpmailsmtp_tasks_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `action` | varchar(255) | NO | NULL |  |  |
| `data` | longtext | NO | NULL |  |  |
| `date` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_wt_iew_action_history

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `template_type` | varchar(255) | NO | NULL |  |  |
| `item_type` | varchar(255) | NO | NULL |  |  |
| `file_name` | varchar(255) | NO | NULL |  |  |
| `created_at` | int | NO | 0 |  |  |
| `status` | int | NO | 0 |  |  |
| `status_text` | varchar(255) | NO | NULL |  |  |
| `offset` | int | NO | 0 |  |  |
| `total` | int | NO | 0 |  |  |
| `data` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_wt_iew_mapping_template

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `template_type` | varchar(255) | NO | NULL |  |  |
| `item_type` | varchar(255) | NO | NULL |  |  |
| `name` | varchar(255) | NO | NULL |  |  |
| `data` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## gwgo_yoast_indexable

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `permalink` | longtext | YES | NULL |  |  |
| `permalink_hash` | varchar(40) | YES | NULL | MUL |  |
| `object_id` | bigint | YES | NULL | MUL |  |
| `object_type` | varchar(32) | NO | NULL | MUL |  |
| `object_sub_type` | varchar(32) | YES | NULL |  |  |
| `author_id` | bigint | YES | NULL |  |  |
| `post_parent` | bigint | YES | NULL | MUL |  |
| `title` | text | YES | NULL |  |  |
| `description` | mediumtext | YES | NULL |  |  |
| `breadcrumb_title` | text | YES | NULL |  |  |
| `post_status` | varchar(20) | YES | NULL |  |  |
| `is_public` | tinyint(1) | YES | NULL |  |  |
| `is_protected` | tinyint(1) | YES | 0 |  |  |
| `has_public_posts` | tinyint(1) | YES | NULL |  |  |
| `number_of_pages` | int unsigned | YES | NULL |  |  |
| `canonical` | longtext | YES | NULL |  |  |
| `primary_focus_keyword` | varchar(191) | YES | NULL |  |  |
| `primary_focus_keyword_score` | int | YES | NULL |  |  |
| `readability_score` | int | YES | NULL |  |  |
| `is_cornerstone` | tinyint(1) | YES | 0 |  |  |
| `is_robots_noindex` | tinyint(1) | YES | 0 |  |  |
| `is_robots_nofollow` | tinyint(1) | YES | 0 |  |  |
| `is_robots_noarchive` | tinyint(1) | YES | 0 |  |  |
| `is_robots_noimageindex` | tinyint(1) | YES | 0 |  |  |
| `is_robots_nosnippet` | tinyint(1) | YES | 0 |  |  |
| `twitter_title` | text | YES | NULL |  |  |
| `twitter_image` | longtext | YES | NULL |  |  |
| `twitter_description` | longtext | YES | NULL |  |  |
| `twitter_image_id` | varchar(191) | YES | NULL |  |  |
| `twitter_image_source` | text | YES | NULL |  |  |
| `open_graph_title` | text | YES | NULL |  |  |
| `open_graph_description` | longtext | YES | NULL |  |  |
| `open_graph_image` | longtext | YES | NULL |  |  |
| `open_graph_image_id` | varchar(191) | YES | NULL |  |  |
| `open_graph_image_source` | text | YES | NULL |  |  |
| `open_graph_image_meta` | mediumtext | YES | NULL |  |  |
| `link_count` | int | YES | NULL |  |  |
| `incoming_link_count` | int | YES | NULL |  |  |
| `prominent_words_version` | int unsigned | YES | NULL | MUL |  |
| `created_at` | datetime | YES | NULL |  |  |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `blog_id` | bigint | NO | 1 |  |  |
| `language` | varchar(32) | YES | NULL |  |  |
| `region` | varchar(32) | YES | NULL |  |  |
| `schema_page_type` | varchar(64) | YES | NULL |  |  |
| `schema_article_type` | varchar(64) | YES | NULL |  |  |
| `has_ancestors` | tinyint(1) | YES | 0 |  |  |
| `estimated_reading_time_minutes` | int | YES | NULL |  |  |
| `version` | int | YES | 1 |  |  |
| `object_last_modified` | datetime | YES | NULL |  |  |
| `object_published_at` | datetime | YES | NULL | MUL |  |
| `inclusive_language_score` | int | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| object_id_and_type | object_id | NO | BTREE |
| object_id_and_type | object_type | NO | BTREE |
| object_type_and_sub_type | object_type | NO | BTREE |
| object_type_and_sub_type | object_sub_type | NO | BTREE |
| permalink_hash_and_object_type | permalink_hash | NO | BTREE |
| permalink_hash_and_object_type | object_type | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| prominent_words | prominent_words_version | NO | BTREE |
| prominent_words | object_type | NO | BTREE |
| prominent_words | object_sub_type | NO | BTREE |
| prominent_words | post_status | NO | BTREE |
| published_sitemap_index | object_published_at | NO | BTREE |
| published_sitemap_index | is_robots_noindex | NO | BTREE |
| published_sitemap_index | object_type | NO | BTREE |
| published_sitemap_index | object_sub_type | NO | BTREE |
| subpages | post_parent | NO | BTREE |
| subpages | object_type | NO | BTREE |
| subpages | post_status | NO | BTREE |
| subpages | object_id | NO | BTREE |

---

## gwgo_yoast_indexable_hierarchy

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `indexable_id` | int unsigned | NO | NULL | PRI |  |
| `ancestor_id` | int unsigned | NO | NULL | PRI |  |
| `depth` | int unsigned | YES | NULL | MUL |  |
| `blog_id` | bigint | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ancestor_id | ancestor_id | NO | BTREE |
| depth | depth | NO | BTREE |
| indexable_id | indexable_id | NO | BTREE |
| PRIMARY | indexable_id | YES | BTREE |
| PRIMARY | ancestor_id | YES | BTREE |

---

## gwgo_yoast_migrations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `version` | varchar(191) | YES | NULL | UNI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_wp_yoast_migrations_version | version | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_yoast_primary_term

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint | YES | NULL | MUL |  |
| `term_id` | bigint | YES | NULL |  |  |
| `taxonomy` | varchar(32) | NO | NULL |  |  |
| `created_at` | datetime | YES | NULL |  |  |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `blog_id` | bigint | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| post_taxonomy | post_id | NO | BTREE |
| post_taxonomy | taxonomy | NO | BTREE |
| post_term | post_id | NO | BTREE |
| post_term | term_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_yoast_seo_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `url` | varchar(255) | NO | NULL |  |  |
| `post_id` | bigint unsigned | NO | NULL | MUL |  |
| `target_post_id` | bigint unsigned | NO | NULL |  |  |
| `type` | varchar(8) | NO | NULL |  |  |
| `indexable_id` | int unsigned | YES | NULL | MUL |  |
| `target_indexable_id` | int unsigned | YES | NULL |  |  |
| `height` | int unsigned | YES | NULL |  |  |
| `width` | int unsigned | YES | NULL |  |  |
| `size` | int unsigned | YES | NULL |  |  |
| `language` | varchar(32) | YES | NULL |  |  |
| `region` | varchar(32) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| indexable_link_direction | indexable_id | NO | BTREE |
| indexable_link_direction | type | NO | BTREE |
| link_direction | post_id | NO | BTREE |
| link_direction | type | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## gwgo_yoast_seo_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `object_id` | bigint unsigned | NO | NULL | PRI |  |
| `internal_link_count` | int unsigned | YES | NULL |  |  |
| `incoming_link_count` | int unsigned | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| object_id | object_id | YES | BTREE |

---

## mdf_charts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL |  |  |
| `post_id` | int | NO | NULL | MUL |  |
| `service` | int | NO | NULL |  |  |
| `meta_key` | varchar(50) | NO | NULL |  |  |
| `value` | text | NO | NULL |  |  |
| `is_approoved` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| bizoforce_post_user | post_id | NO | BTREE |
| bizoforce_post_user | user_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## mdf_google_catcher

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `listing_id` | int | NO | NULL |  |  |
| `bizz_name` | text | NO | NULL |  |  |
| `site_title` | text | NO | NULL |  |  |
| `link` | text | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `meta_keys` | text | NO | NULL |  |  |
| `focus_keys` | text | NO | NULL |  |  |
| `contact_name` | text | NO | NULL |  |  |
| `contact_phone` | text | NO | NULL |  |  |
| `contact_email` | text | NO | NULL |  |  |
| `address` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## mdf_query_cache

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `mkey` | text | NO | NULL |  |  |
| `mvalue` | text | NO | NULL |  |  |

---

## sib_model_contact

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `email` | varchar(255) | YES | NULL |  |  |
| `info` | text | YES | NULL |  |  |
| `code` | varchar(100) | YES | NULL |  |  |
| `is_activate` | int | YES | NULL |  |  |
| `extra` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## smackuci_events

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `revision` | bigint | NO | 0 |  |  |
| `name` | varchar(255) | YES | NULL |  |  |
| `original_file_name` | varchar(255) | YES | NULL |  |  |
| `friendly_name` | varchar(255) | YES | NULL |  |  |
| `import_type` | varchar(32) | YES | NULL |  |  |
| `filetype` | text | YES | NULL |  |  |
| `filepath` | text | YES | NULL |  |  |
| `eventKey` | varchar(32) | YES | NULL |  |  |
| `registered_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `parent_node` | varchar(255) | YES | NULL |  |  |
| `processing` | tinyint(1) | NO | 0 |  |  |
| `executing` | tinyint(1) | NO | 0 |  |  |
| `triggered` | tinyint(1) | NO | 0 |  |  |
| `event_started_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `count` | bigint | NO | 0 |  |  |
| `processed` | bigint | NO | 0 |  |  |
| `created` | bigint | NO | 0 |  |  |
| `updated` | bigint | NO | 0 |  |  |
| `skipped` | bigint | NO | 0 |  |  |
| `deleted` | bigint | NO | 0 |  |  |
| `is_terminated` | tinyint(1) | NO | 0 |  |  |
| `terminated_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `last_activity` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `siteid` | int | NO | 1 |  |  |
| `month` | varchar(60) | YES | NULL |  |  |
| `year` | varchar(60) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## smackuci_history

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `event_id` | bigint | NO | NULL |  |  |
| `time_taken` | text | YES | NULL |  |  |
| `date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `summary` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_actionscheduler_actions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `action_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `hook` | varchar(191) | NO | NULL | MUL |  |
| `status` | varchar(20) | NO | NULL | MUL |  |
| `scheduled_date_gmt` | datetime | YES | 0000-00-00 00:00:00 | MUL |  |
| `scheduled_date_local` | datetime | YES | 0000-00-00 00:00:00 |  |  |
| `args` | varchar(191) | YES | NULL | MUL |  |
| `schedule` | longtext | YES | NULL |  |  |
| `group_id` | bigint unsigned | NO | 0 | MUL |  |
| `attempts` | int | NO | 0 |  |  |
| `last_attempt_gmt` | datetime | YES | 0000-00-00 00:00:00 | MUL |  |
| `last_attempt_local` | datetime | YES | 0000-00-00 00:00:00 |  |  |
| `claim_id` | bigint unsigned | NO | 0 | MUL |  |
| `extended_args` | varchar(8000) | YES | NULL |  |  |
| `priority` | tinyint unsigned | NO | 10 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| args | args | NO | BTREE |
| claim_id | claim_id | NO | BTREE |
| claim_id_status_priority_scheduled_date_gmt | claim_id | NO | BTREE |
| claim_id_status_priority_scheduled_date_gmt | status | NO | BTREE |
| claim_id_status_priority_scheduled_date_gmt | priority | NO | BTREE |
| claim_id_status_priority_scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |
| claim_id_status_scheduled_date_gmt | claim_id | NO | BTREE |
| claim_id_status_scheduled_date_gmt | status | NO | BTREE |
| claim_id_status_scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |
| group_id | group_id | NO | BTREE |
| hook | hook | NO | BTREE |
| hook_status_scheduled_date_gmt | hook | NO | BTREE |
| hook_status_scheduled_date_gmt | status | NO | BTREE |
| hook_status_scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |
| last_attempt_gmt | last_attempt_gmt | NO | BTREE |
| PRIMARY | action_id | YES | BTREE |
| scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |
| status | status | NO | BTREE |
| status_claim_id | status | NO | BTREE |
| status_claim_id | claim_id | NO | BTREE |
| status_last_attempt_gmt | status | NO | BTREE |
| status_last_attempt_gmt | last_attempt_gmt | NO | BTREE |
| status_scheduled_date_gmt | status | NO | BTREE |
| status_scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |

---

## wp_actionscheduler_claims

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `claim_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `date_created_gmt` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| date_created_gmt | date_created_gmt | NO | BTREE |
| PRIMARY | claim_id | YES | BTREE |

---

## wp_actionscheduler_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `group_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `slug` | varchar(255) | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | group_id | YES | BTREE |
| slug | slug | NO | BTREE |

---

## wp_actionscheduler_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `log_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `action_id` | bigint unsigned | NO | NULL | MUL |  |
| `message` | text | NO | NULL |  |  |
| `log_date_gmt` | datetime | YES | 0000-00-00 00:00:00 | MUL |  |
| `log_date_local` | datetime | YES | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| action_id | action_id | NO | BTREE |
| log_date_gmt | log_date_gmt | NO | BTREE |
| PRIMARY | log_id | YES | BTREE |

---

## wp_admin_columns

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `list_id` | varchar(20) | NO | NULL | UNI |  |
| `list_key` | varchar(100) | NO | NULL |  |  |
| `title` | varchar(255) | NO | NULL |  |  |
| `columns` | mediumtext | YES | NULL |  |  |
| `settings` | mediumtext | YES | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| list_id | list_id | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_aioseo_cache

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `key` | varchar(80) | NO | NULL | UNI |  |
| `value` | longtext | NO | NULL |  |  |
| `expiration` | datetime | YES | NULL | MUL |  |
| `created` | datetime | NO | NULL |  |  |
| `updated` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ndx_aioseo_cache_expiration | expiration | NO | BTREE |
| ndx_aioseo_cache_key | key | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_aioseo_notifications

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `slug` | varchar(13) | NO | NULL | UNI |  |
| `title` | text | NO | NULL |  |  |
| `content` | longtext | NO | NULL |  |  |
| `type` | varchar(64) | NO | NULL | MUL |  |
| `level` | text | NO | NULL |  |  |
| `notification_id` | bigint unsigned | YES | NULL |  |  |
| `notification_name` | varchar(255) | YES | NULL |  |  |
| `start` | datetime | YES | NULL | MUL |  |
| `end` | datetime | YES | NULL |  |  |
| `button1_label` | varchar(255) | YES | NULL |  |  |
| `button1_action` | varchar(255) | YES | NULL |  |  |
| `button2_label` | varchar(255) | YES | NULL |  |  |
| `button2_action` | varchar(255) | YES | NULL |  |  |
| `dismissed` | tinyint(1) | NO | 0 | MUL |  |
| `created` | datetime | NO | NULL |  |  |
| `updated` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ndx_aioseo_notifications_dates | start | NO | BTREE |
| ndx_aioseo_notifications_dates | end | NO | BTREE |
| ndx_aioseo_notifications_dismissed | dismissed | NO | BTREE |
| ndx_aioseo_notifications_slug | slug | YES | BTREE |
| ndx_aioseo_notifications_type | type | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_aioseo_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint unsigned | NO | NULL | MUL |  |
| `title` | text | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `keywords` | mediumtext | YES | NULL |  |  |
| `keyphrases` | longtext | YES | NULL |  |  |
| `page_analysis` | longtext | YES | NULL |  |  |
| `canonical_url` | text | YES | NULL |  |  |
| `og_title` | text | YES | NULL |  |  |
| `og_description` | text | YES | NULL |  |  |
| `og_object_type` | varchar(64) | YES | default |  |  |
| `og_image_type` | varchar(64) | YES | default |  |  |
| `og_image_custom_url` | text | YES | NULL |  |  |
| `og_image_custom_fields` | text | YES | NULL |  |  |
| `og_custom_image_width` | int | YES | NULL |  |  |
| `og_custom_image_height` | int | YES | NULL |  |  |
| `og_video` | varchar(255) | YES | NULL |  |  |
| `og_custom_url` | text | YES | NULL |  |  |
| `og_article_section` | text | YES | NULL |  |  |
| `og_article_tags` | text | YES | NULL |  |  |
| `twitter_use_og` | tinyint(1) | YES | 1 |  |  |
| `twitter_card` | varchar(64) | YES | default |  |  |
| `twitter_image_type` | varchar(64) | YES | default |  |  |
| `twitter_image_custom_url` | text | YES | NULL |  |  |
| `twitter_image_custom_fields` | text | YES | NULL |  |  |
| `twitter_title` | text | YES | NULL |  |  |
| `twitter_description` | text | YES | NULL |  |  |
| `seo_score` | int | NO | 0 |  |  |
| `schema_type` | varchar(20) | YES | NULL |  |  |
| `schema_type_options` | longtext | YES | NULL |  |  |
| `pillar_content` | tinyint(1) | YES | NULL | MUL |  |
| `robots_default` | tinyint(1) | NO | 1 |  |  |
| `robots_noindex` | tinyint(1) | NO | 0 |  |  |
| `robots_noarchive` | tinyint(1) | NO | 0 |  |  |
| `robots_nosnippet` | tinyint(1) | NO | 0 |  |  |
| `robots_nofollow` | tinyint(1) | NO | 0 |  |  |
| `robots_noimageindex` | tinyint(1) | NO | 0 |  |  |
| `robots_noodp` | tinyint(1) | NO | 0 |  |  |
| `robots_notranslate` | tinyint(1) | NO | 0 |  |  |
| `robots_max_snippet` | int | YES | NULL |  |  |
| `robots_max_videopreview` | int | YES | NULL |  |  |
| `robots_max_imagepreview` | varchar(20) | YES | none |  |  |
| `tabs` | mediumtext | YES | NULL |  |  |
| `images` | longtext | YES | NULL |  |  |
| `priority` | tinytext | YES | NULL |  |  |
| `frequency` | tinytext | YES | NULL |  |  |
| `videos` | longtext | YES | NULL |  |  |
| `video_thumbnail` | text | YES | NULL |  |  |
| `video_scan_date` | datetime | YES | NULL |  |  |
| `local_seo` | longtext | YES | NULL |  |  |
| `breadcrumb_settings` | longtext | YES | NULL |  |  |
| `created` | datetime | NO | NULL |  |  |
| `updated` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ndx_aioseo_posts_pillar_content | pillar_content | NO | BTREE |
| ndx_aioseo_posts_post_id | post_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_aioseo_seo_analyzer_results

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `data` | text | NO | NULL |  |  |
| `score` | varchar(255) | YES | NULL |  |  |
| `competitor_url` | varchar(255) | YES | NULL | MUL |  |
| `created` | datetime | NO | NULL |  |  |
| `updated` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ndx_aioseo_seo_analyzer_results_competitor_url | competitor_url | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_categorymeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint | NO | NULL | PRI | auto_increment |
| `category_id` | bigint | NO | 0 |  |  |
| `meta_key` | varchar(255) | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_id | meta_id | YES | BTREE |

---

## wp_cky_banners

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `banner_id` | bigint | NO | NULL | PRI | auto_increment |
| `name` | varchar(190) | NO | NULL |  |  |
| `slug` | varchar(190) | NO | NULL |  |  |
| `status` | int | NO | 0 |  |  |
| `settings` | longtext | NO | NULL |  |  |
| `banner_default` | int | NO | 0 |  |  |
| `contents` | longtext | NO | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | banner_id | YES | BTREE |

---

## wp_cky_cookie_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `category_id` | bigint | NO | NULL | PRI | auto_increment |
| `name` | text | NO | NULL |  |  |
| `slug` | varchar(190) | NO | NULL | UNI |  |
| `description` | longtext | NO | NULL |  |  |
| `prior_consent` | int | NO | 0 |  |  |
| `visibility` | int | NO | 1 |  |  |
| `priority` | int | NO | 0 |  |  |
| `sell_personal_data` | int | NO | 0 |  |  |
| `meta` | longtext | YES | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | category_id | YES | BTREE |
| slug | slug | YES | BTREE |

---

## wp_cky_cookies

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `cookie_id` | bigint | NO | NULL | PRI | auto_increment |
| `name` | varchar(190) | NO | NULL |  |  |
| `slug` | varchar(190) | NO | NULL |  |  |
| `description` | longtext | NO | NULL |  |  |
| `duration` | text | NO | NULL |  |  |
| `domain` | varchar(190) | NO | NULL |  |  |
| `category` | bigint | NO | NULL |  |  |
| `type` | text | NO | NULL |  |  |
| `discovered` | int | NO | 0 |  |  |
| `url_pattern` | varchar(190) | YES | NULL |  |  |
| `meta` | longtext | YES | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | cookie_id | YES | BTREE |

---

## wp_cli_scripts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `cliscript_title` | text | NO | NULL |  |  |
| `cliscript_category` | varchar(100) | NO | NULL |  |  |
| `cliscript_type` | int | YES | 0 |  |  |
| `cliscript_status` | varchar(100) | NO | NULL |  |  |
| `cliscript_description` | longtext | NO | NULL |  |  |
| `cliscript_key` | varchar(100) | NO | NULL |  |  |
| `type` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_commentmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_id | comment_id | NO | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wp_comments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `comment_ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_post_ID` | bigint unsigned | NO | 0 | MUL |  |
| `comment_author` | text | NO | NULL |  |  |
| `comment_author_email` | varchar(100) | NO | NULL | MUL |  |
| `comment_author_url` | varchar(200) | NO | NULL |  |  |
| `comment_author_IP` | varchar(100) | NO | NULL |  |  |
| `comment_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `comment_date_gmt` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `comment_content` | mediumtext | NO | NULL |  |  |
| `comment_karma` | int | NO | 0 |  |  |
| `comment_approved` | varchar(20) | NO | 1 | MUL |  |
| `comment_agent` | varchar(255) | NO | NULL |  |  |
| `comment_type` | varchar(20) | NO | comment | MUL |  |
| `comment_parent` | bigint unsigned | NO | 0 | MUL |  |
| `user_id` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_approved_date_gmt | comment_approved | NO | BTREE |
| comment_approved_date_gmt | comment_date_gmt | NO | BTREE |
| comment_author_email | comment_author_email | NO | BTREE |
| comment_date_gmt | comment_date_gmt | NO | BTREE |
| comment_parent | comment_parent | NO | BTREE |
| comment_post_ID | comment_post_ID | NO | BTREE |
| PRIMARY | comment_ID | YES | BTREE |
| woo_idx_comment_type | comment_type | NO | BTREE |

---

## wp_company_faqs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | mediumint | NO | NULL | PRI | auto_increment |
| `post_id` | bigint | NO | NULL | UNI |  |
| `faqs` | longtext | NO | NULL |  |  |
| `created_at` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| post_id | post_id | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_cpk_wpcsv_export_queue

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `export_id` | varchar(30) | NO | NULL |  |  |
| `post_id` | int | NO | NULL |  |  |
| `done` | tinyint(1) | NO | 0 |  |  |
| `msg` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_cpk_wpcsv_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `category` | varchar(255) | NO | NULL |  |  |
| `msg` | varchar(255) | NO | NULL |  |  |
| `data` | text | YES | NULL |  |  |
| `created` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_e_events

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `event_data` | text | YES | NULL |  |  |
| `created_at` | datetime | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| created_at_index | created_at | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_frmt_form_entry

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `entry_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `entry_type` | varchar(191) | NO | NULL | MUL |  |
| `draft_id` | varchar(12) | YES | NULL |  |  |
| `form_id` | bigint unsigned | NO | NULL | MUL |  |
| `is_spam` | tinyint(1) | NO | 0 | MUL |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| entry_form_id | form_id | NO | BTREE |
| entry_is_spam | is_spam | NO | BTREE |
| entry_type | entry_type | NO | BTREE |
| PRIMARY | entry_id | YES | BTREE |

---

## wp_frmt_form_entry_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `entry_id` | bigint unsigned | NO | NULL | MUL |  |
| `meta_key` | varchar(191) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_updated` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_entry_id | entry_id | NO | BTREE |
| meta_key | meta_key | NO | BTREE |
| meta_key_object | entry_id | NO | BTREE |
| meta_key_object | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wp_frmt_form_reports

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `report_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `report_value` | longtext | NO | NULL |  |  |
| `status` | varchar(200) | NO | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_updated` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | report_id | YES | BTREE |

---

## wp_frmt_form_views

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `view_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `form_id` | bigint unsigned | NO | NULL | MUL |  |
| `page_id` | bigint unsigned | NO | NULL |  |  |
| `ip` | varchar(191) | YES | NULL | MUL |  |
| `count` | mediumint unsigned | NO | 1 |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_updated` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | view_id | YES | BTREE |
| view_form_id | form_id | NO | BTREE |
| view_form_object | form_id | NO | BTREE |
| view_form_object | view_id | NO | BTREE |
| view_form_object_ip | form_id | NO | BTREE |
| view_form_object_ip | view_id | NO | BTREE |
| view_form_object_ip | ip | NO | BTREE |
| view_ip | ip | NO | BTREE |

---

## wp_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `link_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `link_url` | varchar(255) | NO | NULL |  |  |
| `link_name` | varchar(255) | NO | NULL |  |  |
| `link_image` | varchar(255) | NO | NULL |  |  |
| `link_target` | varchar(25) | NO | NULL |  |  |
| `link_description` | varchar(255) | NO | NULL |  |  |
| `link_visible` | varchar(20) | NO | Y | MUL |  |
| `link_owner` | bigint unsigned | NO | 1 |  |  |
| `link_rating` | int | NO | 0 |  |  |
| `link_updated` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `link_rel` | varchar(255) | NO | NULL |  |  |
| `link_notes` | mediumtext | NO | NULL |  |  |
| `link_rss` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| link_visible | link_visible | NO | BTREE |
| PRIMARY | link_id | YES | BTREE |

---

## wp_listings_ratings_and_reviews

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `listing_id` | int | NO | NULL |  |  |
| `service_id` | int | NO | NULL |  |  |
| `rating` | float | NO | 0 |  |  |
| `rev_number` | int | NO | 0 |  |  |
| `rate_times_num` | int | NO | 0 |  |  |
| `mq` | int | NO | 0 |  |  |

---

## wp_mailster_action_bounces

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `hard` | tinyint(1) | NO | 0 |  |  |
| `text` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | hard | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wp_mailster_action_clicks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `link_id` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | link_id | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wp_mailster_action_errors

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `text` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wp_mailster_action_opens

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wp_mailster_action_sent

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wp_mailster_action_unsubs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `text` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wp_mailster_actions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `type` | tinyint(1) | NO | 0 | MUL |  |
| `link_id` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | type | YES | BTREE |
| id | link_id | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |
| type | type | NO | BTREE |

---

## wp_mailster_form_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `form_id` | bigint unsigned | NO | NULL | MUL |  |
| `field_id` | varchar(191) | NO | NULL |  |  |
| `name` | longtext | NO | NULL |  |  |
| `error_msg` | longtext | NO | NULL |  |  |
| `required` | tinyint unsigned | NO | NULL |  |  |
| `position` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | form_id | YES | BTREE |
| id | field_id | YES | BTREE |
| PRIMARY | ID | YES | BTREE |

---

## wp_mailster_forms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(191) | NO | NULL |  |  |
| `submit` | varchar(191) | NO | NULL |  |  |
| `asterisk` | tinyint(1) | YES | 1 |  |  |
| `userschoice` | tinyint(1) | YES | 0 |  |  |
| `precheck` | tinyint(1) | YES | 0 |  |  |
| `dropdown` | tinyint(1) | YES | 0 |  |  |
| `prefill` | tinyint(1) | YES | 0 |  |  |
| `inline` | tinyint(1) | YES | 0 |  |  |
| `overwrite` | tinyint(1) | YES | 0 |  |  |
| `addlists` | tinyint(1) | YES | 0 |  |  |
| `style` | longtext | YES | NULL |  |  |
| `custom_style` | longtext | YES | NULL |  |  |
| `doubleoptin` | tinyint(1) | YES | 1 |  |  |
| `subject` | longtext | YES | NULL |  |  |
| `headline` | longtext | YES | NULL |  |  |
| `content` | longtext | YES | NULL |  |  |
| `link` | longtext | YES | NULL |  |  |
| `resend` | tinyint(1) | YES | 0 |  |  |
| `resend_count` | int | YES | 2 |  |  |
| `resend_time` | int | YES | 48 |  |  |
| `template` | varchar(191) | NO | NULL |  |  |
| `vcard` | tinyint(1) | YES | 0 |  |  |
| `vcard_content` | longtext | YES | NULL |  |  |
| `confirmredirect` | varchar(2083) | YES | NULL |  |  |
| `redirect` | varchar(2083) | YES | NULL |  |  |
| `added` | int unsigned | YES | NULL |  |  |
| `updated` | int unsigned | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |

---

## wp_mailster_forms_lists

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `form_id` | bigint unsigned | NO | NULL | PRI |  |
| `list_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| form_id | form_id | NO | BTREE |
| id | form_id | YES | BTREE |
| id | list_id | YES | BTREE |
| list_id | list_id | NO | BTREE |

---

## wp_mailster_forms_tags

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `form_id` | bigint unsigned | NO | NULL | PRI |  |
| `tag_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| form_id | form_id | NO | BTREE |
| id | form_id | YES | BTREE |
| id | tag_id | YES | BTREE |
| list_id | tag_id | NO | BTREE |

---

## wp_mailster_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `link` | varchar(2083) | NO | NULL |  |  |
| `i` | tinyint unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |

---

## wp_mailster_lists

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `parent_id` | bigint unsigned | NO | NULL |  |  |
| `name` | varchar(191) | NO | NULL | UNI |  |
| `slug` | varchar(191) | NO | NULL | UNI |  |
| `description` | longtext | NO | NULL |  |  |
| `added` | int unsigned | NO | NULL |  |  |
| `updated` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| slug | slug | YES | BTREE |

---

## wp_mailster_lists_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `list_id` | bigint unsigned | NO | NULL | PRI |  |
| `subscriber_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | list_id | YES | BTREE |
| id | subscriber_id | YES | BTREE |
| list_id | list_id | NO | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wp_mailster_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL |  |  |
| `campaign_id` | bigint unsigned | YES | NULL |  |  |
| `timestamp` | int | NO | 0 |  |  |
| `subject` | longtext | NO | NULL |  |  |
| `receivers` | longtext | NO | NULL |  |  |
| `html` | longtext | NO | NULL |  |  |
| `text` | longtext | NO | NULL |  |  |
| `raw` | longtext | NO | NULL |  |  |
| `message_id` | varchar(191) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |

---

## wp_mailster_queue

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | NO | 0 | MUL |  |
| `campaign_id` | bigint unsigned | NO | 0 | MUL |  |
| `requeued` | tinyint unsigned | NO | 0 | MUL |  |
| `added` | int unsigned | NO | 0 |  |  |
| `timestamp` | int | NO | 0 | MUL |  |
| `sent` | int unsigned | NO | 0 |  |  |
| `priority` | tinyint unsigned | NO | 0 | MUL |  |
| `count` | tinyint unsigned | NO | 0 | MUL |  |
| `error` | tinyint unsigned | NO | 0 | MUL |  |
| `ignore_status` | tinyint unsigned | NO | 0 | MUL |  |
| `options` | varchar(191) | NO | NULL |  |  |
| `tags` | longtext | NO | NULL |  |  |
| `i` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| count | count | NO | BTREE |
| error | error | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | requeued | YES | BTREE |
| id | options | YES | BTREE |
| id | i | YES | BTREE |
| ignore_status | ignore_status | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| priority | priority | NO | BTREE |
| requeued | requeued | NO | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |
| timestamp | timestamp | NO | BTREE |

---

## wp_mailster_subscriber_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | NO | NULL | MUL |  |
| `meta_key` | varchar(191) | NO | NULL | MUL |  |
| `meta_value` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | subscriber_id | YES | BTREE |
| id | meta_key | YES | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wp_mailster_subscriber_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | NO | NULL | MUL |  |
| `meta_key` | varchar(191) | NO | NULL | MUL |  |
| `meta_value` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | meta_key | YES | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wp_mailster_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `hash` | varchar(32) | NO | NULL | UNI |  |
| `email` | varchar(191) | NO | NULL | UNI |  |
| `wp_id` | bigint unsigned | NO | 0 | MUL |  |
| `status` | int unsigned | NO | 0 | MUL |  |
| `added` | int unsigned | NO | 0 |  |  |
| `updated` | int unsigned | NO | 0 |  |  |
| `signup` | int unsigned | NO | 0 |  |  |
| `confirm` | int unsigned | NO | 0 |  |  |
| `ip_signup` | varchar(45) | NO | NULL |  |  |
| `ip_confirm` | varchar(45) | NO | NULL |  |  |
| `rating` | decimal(3,2) unsigned | NO | 0.25 | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| email | email | YES | BTREE |
| hash | hash | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| rating | rating | NO | BTREE |
| status | status | NO | BTREE |
| wp_id | wp_id | NO | BTREE |

---

## wp_mailster_tags

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(191) | NO | NULL | UNI |  |
| `added` | int unsigned | NO | NULL |  |  |
| `updated` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | YES | BTREE |
| PRIMARY | ID | YES | BTREE |

---

## wp_mailster_tags_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `tag_id` | bigint unsigned | NO | NULL | PRI |  |
| `subscriber_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | tag_id | YES | BTREE |
| id | subscriber_id | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |
| tag_id | tag_id | NO | BTREE |

---

## wp_mdf_query_cache

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `mkey` | text | NO | NULL |  |  |
| `mvalue` | text | NO | NULL |  |  |

---

## wp_mdf_stat_buffer

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `hash` | text | NO | NULL |  |  |
| `user_ip` | text | NO | NULL |  |  |
| `post_type` | text | NO | NULL |  |  |
| `type` | text | NO | NULL |  |  |
| `filter_id` | int | NO | NULL |  |  |
| `key_id` | text | NO | NULL |  |  |
| `value` | text | NO | NULL |  |  |
| `time` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_mdf_stat_tmp

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_ip` | text | NO | NULL |  |  |
| `post_type` | text | NO | NULL |  |  |
| `tax_data` | text | NO | NULL |  |  |
| `meta_data` | text | NO | NULL |  |  |
| `hash` | text | NO | NULL |  |  |
| `time` | int | NO | NULL |  |  |
| `is_collected` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_mwai_filemeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint | NO | NULL | PRI | auto_increment |
| `file_id` | bigint | NO | NULL |  |  |
| `meta_key` | varchar(255) | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | meta_id | YES | BTREE |

---

## wp_mwai_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `refId` | varchar(64) | NO | NULL | UNI |  |
| `envId` | varchar(128) | YES | NULL |  |  |
| `userId` | varchar(64) | YES | NULL |  |  |
| `type` | varchar(32) | YES | NULL |  |  |
| `status` | varchar(32) | YES | NULL |  |  |
| `purpose` | varchar(32) | YES | NULL |  |  |
| `created` | datetime | NO | NULL |  |  |
| `updated` | datetime | NO | NULL |  |  |
| `expires` | datetime | YES | NULL |  |  |
| `path` | text | YES | NULL |  |  |
| `url` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| unique_file_id | refId | YES | BTREE |

---

## wp_myCRED_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `ref` | varchar(256) | NO | NULL |  |  |
| `ref_id` | int | YES | NULL |  |  |
| `user_id` | int | YES | NULL |  |  |
| `creds` | bigint | YES | NULL |  |  |
| `ctype` | varchar(64) | YES | mycred_default |  |  |
| `time` | bigint | YES | NULL |  |  |
| `entry` | longtext | YES | NULL |  |  |
| `data` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_nf3_action_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `parent_id` | int | NO | NULL |  |  |
| `key` | longtext | NO | NULL |  |  |
| `value` | longtext | YES | NULL |  |  |
| `meta_key` | longtext | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_nf3_actions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `title` | longtext | YES | NULL |  |  |
| `key` | longtext | YES | NULL |  |  |
| `type` | longtext | YES | NULL |  |  |
| `active` | tinyint(1) | YES | 1 |  |  |
| `parent_id` | int | NO | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `updated_at` | datetime | YES | NULL |  |  |
| `label` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_nf3_chunks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | YES | NULL |  |  |
| `value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_nf3_field_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `parent_id` | int | NO | NULL |  |  |
| `key` | longtext | NO | NULL |  |  |
| `value` | longtext | YES | NULL |  |  |
| `meta_key` | longtext | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_nf3_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `label` | longtext | YES | NULL |  |  |
| `key` | longtext | YES | NULL |  |  |
| `type` | longtext | YES | NULL |  |  |
| `parent_id` | int | NO | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `updated_at` | datetime | YES | NULL |  |  |
| `field_label` | longtext | YES | NULL |  |  |
| `field_key` | longtext | YES | NULL |  |  |
| `order` | int | YES | NULL |  |  |
| `required` | bit(1) | YES | NULL |  |  |
| `default_value` | longtext | YES | NULL |  |  |
| `label_pos` | varchar(15) | YES | NULL |  |  |
| `personally_identifiable` | bit(1) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_nf3_form_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `parent_id` | int | NO | NULL |  |  |
| `key` | longtext | NO | NULL |  |  |
| `value` | longtext | YES | NULL |  |  |
| `meta_key` | longtext | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_nf3_forms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `title` | longtext | YES | NULL |  |  |
| `key` | longtext | YES | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `updated_at` | datetime | YES | NULL |  |  |
| `views` | int | YES | NULL |  |  |
| `subs` | int | YES | NULL |  |  |
| `form_title` | longtext | YES | NULL |  |  |
| `default_label_pos` | varchar(15) | YES | NULL |  |  |
| `show_title` | bit(1) | YES | NULL |  |  |
| `clear_complete` | bit(1) | YES | NULL |  |  |
| `hide_complete` | bit(1) | YES | NULL |  |  |
| `logged_in` | bit(1) | YES | NULL |  |  |
| `seq_num` | int | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_nf3_object_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `parent_id` | int | NO | NULL |  |  |
| `key` | longtext | NO | NULL |  |  |
| `value` | longtext | YES | NULL |  |  |
| `meta_key` | longtext | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_nf3_objects

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `type` | longtext | YES | NULL |  |  |
| `title` | longtext | YES | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `updated_at` | datetime | YES | NULL |  |  |
| `object_title` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_nf3_relationships

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `child_id` | int | NO | NULL |  |  |
| `child_type` | longtext | NO | NULL |  |  |
| `parent_id` | int | NO | NULL |  |  |
| `parent_type` | longtext | NO | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `updated_at` | datetime | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_nf3_upgrades

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI |  |
| `cache` | longtext | YES | NULL |  |  |
| `stage` | int | NO | 0 |  |  |
| `maintenance` | bit(1) | YES | b'0' |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_nxs_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | mediumint | NO | NULL | PRI | auto_increment |
| `date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `act` | varchar(255) | NO | NULL |  |  |
| `nt` | varchar(255) | NO | NULL |  |  |
| `type` | varchar(255) | NO | NULL |  |  |
| `msg` | text | NO | NULL |  |  |
| `extInfo` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_options

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `option_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `option_name` | varchar(191) | YES | NULL | UNI |  |
| `option_value` | longtext | NO | NULL |  |  |
| `autoload` | varchar(20) | NO | yes | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| autoload | autoload | NO | BTREE |
| option_name | option_name | YES | BTREE |
| PRIMARY | option_id | YES | BTREE |

---

## wp_pmxe_exports

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `attch_id` | bigint | NO | 0 |  |  |
| `options` | longtext | YES | NULL |  |  |
| `scheduled` | varchar(64) | NO | NULL |  |  |
| `registered_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `friendly_name` | text | NO | NULL |  |  |
| `exported` | bigint | NO | 0 |  |  |
| `canceled` | tinyint(1) | NO | 0 |  |  |
| `canceled_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `settings_update_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `last_activity` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `processing` | tinyint(1) | NO | 0 |  |  |
| `executing` | tinyint(1) | NO | 0 |  |  |
| `triggered` | tinyint(1) | NO | 0 |  |  |
| `iteration` | bigint | NO | 0 |  |  |
| `parent_id` | bigint | NO | 0 |  |  |
| `export_post_type` | text | NO | NULL |  |  |
| `client_mode_enabled` | tinyint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_pmxe_google_cats

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI |  |
| `name` | varchar(200) | NO | NULL |  |  |
| `parent_id` | int | NO | NULL |  |  |
| `parent_name` | varchar(200) | NO | NULL |  |  |
| `level` | tinyint | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_pmxe_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint unsigned | NO | NULL |  |  |
| `export_id` | bigint unsigned | NO | NULL |  |  |
| `iteration` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_pmxe_templates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | NO | NULL |  |  |
| `options` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_pmxi_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `import_id` | bigint unsigned | NO | NULL |  |  |
| `name` | text | YES | NULL |  |  |
| `path` | text | YES | NULL |  |  |
| `registered_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_pmxi_history

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `import_id` | bigint unsigned | NO | NULL |  |  |
| `type` | enum('manual','processing','trigger','continue','') | NO | NULL |  |  |
| `time_run` | text | YES | NULL |  |  |
| `date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `summary` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_pmxi_images

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `attachment_id` | bigint unsigned | NO | NULL |  |  |
| `image_url` | varchar(600) | NO | NULL |  |  |
| `image_filename` | varchar(600) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_pmxi_imports

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `parent_import_id` | bigint | NO | 0 |  |  |
| `name` | text | YES | NULL |  |  |
| `friendly_name` | varchar(255) | NO | NULL |  |  |
| `type` | varchar(32) | NO | NULL |  |  |
| `feed_type` | enum('xml','csv','zip','gz','') | NO | NULL |  |  |
| `path` | text | YES | NULL |  |  |
| `xpath` | text | YES | NULL |  |  |
| `options` | longtext | YES | NULL |  |  |
| `registered_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `root_element` | varchar(255) | YES | NULL |  |  |
| `processing` | tinyint(1) | NO | 0 |  |  |
| `executing` | tinyint(1) | NO | 0 |  |  |
| `triggered` | tinyint(1) | NO | 0 |  |  |
| `queue_chunk_number` | bigint | NO | 0 |  |  |
| `first_import` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `count` | bigint | NO | 0 |  |  |
| `imported` | bigint | NO | 0 |  |  |
| `created` | bigint | NO | 0 |  |  |
| `updated` | bigint | NO | 0 |  |  |
| `skipped` | bigint | NO | 0 |  |  |
| `deleted` | bigint | NO | 0 |  |  |
| `canceled` | tinyint(1) | NO | 0 |  |  |
| `canceled_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `failed` | tinyint(1) | NO | 0 |  |  |
| `failed_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `settings_update_on` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `last_activity` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `iteration` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_pmxi_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint unsigned | NO | NULL | MUL |  |
| `import_id` | bigint unsigned | NO | NULL | MUL |  |
| `unique_key` | text | YES | NULL |  |  |
| `product_key` | text | YES | NULL |  |  |
| `iteration` | bigint | NO | 0 |  |  |
| `specified` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| import_id | import_id | NO | BTREE |
| post_id | post_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_pmxi_templates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `options` | longtext | YES | NULL |  |  |
| `scheduled` | varchar(64) | NO | NULL |  |  |
| `name` | varchar(200) | NO | NULL |  |  |
| `title` | text | YES | NULL |  |  |
| `content` | longtext | YES | NULL |  |  |
| `is_keep_linebreaks` | tinyint(1) | NO | 0 |  |  |
| `is_leave_html` | tinyint(1) | NO | 0 |  |  |
| `fix_characters` | tinyint(1) | NO | 0 |  |  |
| `meta` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_postmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| bizoforce_meta_key_value | meta_key | NO | BTREE |
| bizoforce_meta_key_value | meta_value | NO | BTREE |
| bizoforce_post_meta_key | post_id | NO | BTREE |
| bizoforce_post_meta_key | meta_key | NO | BTREE |
| meta_key | meta_key | NO | BTREE |
| post_id | post_id | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wp_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_author` | bigint unsigned | NO | 0 | MUL |  |
| `post_date` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `post_date_gmt` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `post_content` | longtext | NO | NULL |  |  |
| `post_title` | mediumtext | NO | NULL |  |  |
| `post_excerpt` | mediumtext | NO | NULL |  |  |
| `post_status` | varchar(20) | NO | publish |  |  |
| `comment_status` | varchar(20) | NO | open |  |  |
| `ping_status` | varchar(20) | NO | open |  |  |
| `post_password` | varchar(255) | NO | NULL |  |  |
| `post_name` | varchar(200) | NO | NULL | MUL |  |
| `to_ping` | mediumtext | NO | NULL |  |  |
| `pinged` | mediumtext | NO | NULL |  |  |
| `post_modified` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `post_modified_gmt` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `post_content_filtered` | longtext | NO | NULL |  |  |
| `post_parent` | bigint unsigned | NO | 0 | MUL |  |
| `guid` | varchar(255) | NO | NULL |  |  |
| `menu_order` | int | NO | 0 |  |  |
| `post_type` | varchar(20) | NO | post | MUL |  |
| `post_mime_type` | varchar(100) | NO | NULL |  |  |
| `comment_count` | bigint | NO | 0 |  |  |
| `company_listing_id` | bigint | NO | NULL |  |  |
| `is_giglancer_company` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| bizoforce_author_type | post_author | NO | BTREE |
| bizoforce_author_type | post_type | NO | BTREE |
| bizoforce_author_type | post_status | NO | BTREE |
| bizoforce_type_status_date | post_type | NO | BTREE |
| bizoforce_type_status_date | post_status | NO | BTREE |
| bizoforce_type_status_date | post_date | NO | BTREE |
| post_author | post_author | NO | BTREE |
| post_name | post_name | NO | BTREE |
| post_parent | post_parent | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| type_status_date | post_type | NO | BTREE |
| type_status_date | post_status | NO | BTREE |
| type_status_date | post_date | NO | BTREE |
| type_status_date | ID | NO | BTREE |

---

## wp_pps_countries

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `name` | varchar(128) | NO | NULL |  |  |
| `iso_code_2` | varchar(2) | YES | NULL |  |  |
| `iso_code_3` | varchar(3) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_pps_popup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `label` | varchar(255) | NO | NULL |  |  |
| `active` | tinyint(1) | NO | NULL |  |  |
| `original_id` | int | NO | 0 |  |  |
| `params` | text | NO | NULL |  |  |
| `html` | text | NO | NULL |  |  |
| `css` | text | NO | NULL |  |  |
| `img_preview` | varchar(128) | YES | NULL |  |  |
| `show_on` | tinyint(1) | NO | 0 |  |  |
| `show_to` | tinyint(1) | NO | 0 |  |  |
| `show_pages` | tinyint(1) | NO | 0 |  |  |
| `type_id` | tinyint(1) | NO | 1 |  |  |
| `views` | int | NO | 0 |  |  |
| `unique_views` | int | NO | 0 |  |  |
| `actions` | int | NO | 0 |  |  |
| `date_created` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `sort_order` | mediumint | NO | 0 |  |  |
| `show_in_admin_area` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_pps_popup_show_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `popup_id` | int | NO | NULL |  |  |
| `term_id` | int | NO | NULL |  |  |
| `not_show` | tinyint(1) | NO | 0 |  |  |

---

## wp_product_brandmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint | NO | NULL | PRI | auto_increment |
| `product_brand_id` | bigint | NO | 0 |  |  |
| `meta_key` | varchar(255) | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_id | meta_id | YES | BTREE |

---

## wp_product_catmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint | NO | NULL | PRI | auto_increment |
| `product_cat_id` | bigint | NO | 0 |  |  |
| `meta_key` | varchar(255) | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_id | meta_id | YES | BTREE |

---

## wp_pts_modules

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | smallint | NO | NULL | PRI | auto_increment |
| `code` | varchar(32) | NO | NULL | UNI |  |
| `active` | tinyint(1) | NO | 0 |  |  |
| `type_id` | tinyint(1) | NO | 0 |  |  |
| `label` | varchar(64) | YES | NULL |  |  |
| `ex_plug_dir` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| code | code | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_pts_modules_type

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | smallint | NO | NULL | PRI | auto_increment |
| `label` | varchar(32) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_pts_tables

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `unique_id` | varchar(8) | NO | NULL |  |  |
| `label` | varchar(128) | NO | NULL |  |  |
| `original_id` | int | NO | 0 |  |  |
| `params` | mediumtext | YES | NULL |  |  |
| `html` | mediumtext | YES | NULL |  |  |
| `css` | text | NO | NULL |  |  |
| `img` | varchar(64) | YES | NULL |  |  |
| `sort_order` | mediumint | NO | 0 |  |  |
| `is_base` | tinyint(1) | NO | 1 |  |  |
| `is_pro` | tinyint(1) | NO | 0 |  |  |
| `date_created` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_pts_usage_stat

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `code` | varchar(64) | NO | NULL | UNI |  |
| `visits` | int | NO | 0 |  |  |
| `spent_time` | int | NO | 0 |  |  |
| `modify_timestamp` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| code | code | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_pum_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint | NO | NULL | PRI | auto_increment |
| `email_hash` | varchar(32) | NO | NULL | MUL |  |
| `popup_id` | bigint | NO | NULL | MUL |  |
| `user_id` | bigint | NO | NULL | MUL |  |
| `email` | varchar(191) | NO | NULL | MUL |  |
| `name` | varchar(255) | NO | NULL |  |  |
| `fname` | varchar(255) | NO | NULL |  |  |
| `lname` | varchar(255) | NO | NULL |  |  |
| `uuid` | varchar(255) | NO | NULL |  |  |
| `consent` | varchar(255) | NO | NULL |  |  |
| `consent_args` | longtext | NO | NULL |  |  |
| `created` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| email | email | NO | BTREE |
| email_hash | email_hash | NO | BTREE |
| popup_id | popup_id | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## wp_pv_commission

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `product_id` | bigint | NO | NULL |  |  |
| `order_id` | bigint | NO | NULL |  |  |
| `vendor_id` | bigint | NO | NULL |  |  |
| `total_due` | decimal(20,8) | NO | NULL |  |  |
| `qty` | bigint | NO | NULL |  |  |
| `total_shipping` | decimal(20,8) | NO | NULL |  |  |
| `tax` | decimal(20,8) | NO | NULL |  |  |
| `status` | varchar(20) | NO | due |  |  |
| `time` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_pvc_daily

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `time` | date | NO | 0000-00-00 |  |  |
| `postnum` | varchar(255) | NO | NULL |  |  |
| `postcount` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_pvc_total

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `postnum` | varchar(255) | NO | NULL |  |  |
| `postcount` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_redirection_404

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `created` | datetime | NO | NULL | MUL |  |
| `url` | mediumtext | NO | NULL |  |  |
| `domain` | varchar(255) | YES | NULL |  |  |
| `agent` | varchar(255) | YES | NULL |  |  |
| `referrer` | varchar(255) | YES | NULL | MUL |  |
| `http_code` | int unsigned | NO | 0 |  |  |
| `request_method` | varchar(10) | YES | NULL |  |  |
| `request_data` | mediumtext | YES | NULL |  |  |
| `ip` | varchar(45) | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| created | created | NO | BTREE |
| ip | ip | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| referrer | referrer | NO | BTREE |

---

## wp_redirection_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(50) | NO | NULL |  |  |
| `tracking` | int | NO | 1 |  |  |
| `module_id` | int unsigned | NO | 0 | MUL |  |
| `status` | enum('enabled','disabled') | NO | enabled | MUL |  |
| `position` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| module_id | module_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| status | status | NO | BTREE |

---

## wp_redirection_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `url` | mediumtext | NO | NULL | MUL |  |
| `match_url` | varchar(2000) | YES | NULL | MUL |  |
| `match_data` | text | YES | NULL |  |  |
| `regex` | int unsigned | NO | 0 | MUL |  |
| `position` | int unsigned | NO | 0 |  |  |
| `last_count` | int unsigned | NO | 0 |  |  |
| `last_access` | datetime | NO | 1970-01-01 00:00:00 |  |  |
| `group_id` | int | NO | 0 | MUL |  |
| `status` | enum('enabled','disabled') | NO | enabled | MUL |  |
| `action_type` | varchar(20) | NO | NULL |  |  |
| `action_code` | int unsigned | NO | NULL |  |  |
| `action_data` | mediumtext | YES | NULL |  |  |
| `match_type` | varchar(20) | NO | NULL |  |  |
| `title` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| group | group_id | NO | BTREE |
| group_idpos | group_id | NO | BTREE |
| group_idpos | position | NO | BTREE |
| match_url | match_url | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| regex | regex | NO | BTREE |
| status | status | NO | BTREE |
| url | url | NO | BTREE |

---

## wp_redirection_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `created` | datetime | NO | NULL | MUL |  |
| `url` | mediumtext | NO | NULL |  |  |
| `domain` | varchar(255) | YES | NULL |  |  |
| `sent_to` | mediumtext | YES | NULL |  |  |
| `agent` | mediumtext | YES | NULL |  |  |
| `referrer` | mediumtext | YES | NULL |  |  |
| `http_code` | int unsigned | NO | 0 |  |  |
| `request_method` | varchar(10) | YES | NULL |  |  |
| `request_data` | mediumtext | YES | NULL |  |  |
| `redirect_by` | varchar(50) | YES | NULL |  |  |
| `redirection_id` | int unsigned | YES | NULL | MUL |  |
| `ip` | varchar(45) | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| created | created | NO | BTREE |
| ip | ip | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| redirection_id | redirection_id | NO | BTREE |

---

## wp_responsive_thumbnail_slider

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `title` | varchar(1000) | NO | NULL |  |  |
| `image_name` | varchar(500) | NO | NULL |  |  |
| `createdon` | datetime | NO | NULL |  |  |
| `custom_link` | varchar(1000) | YES | NULL |  |  |
| `post_id` | int unsigned | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_reviewx_criterias

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `review_id` | int | NO | NULL |  |  |
| `criteria_id` | varchar(20) | NO | NULL |  |  |
| `rating` | int | NO | NULL |  |  |
| `is_automated` | int | NO | NULL |  |  |

---

## wp_reviewx_import_history

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `batch_id` | int | NO | NULL | PRI |  |
| `file_name` | varchar(255) | NO | NULL |  |  |
| `import_date` | date | NO | NULL |  |  |
| `status` | varchar(20) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | batch_id | YES | BTREE |

---

## wp_reviewx_process_jobs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `process_name` | varchar(20) | NO | NULL |  |  |
| `process_meta` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_reviewx_reminder_email

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `order_id` | int | NO | NULL |  |  |
| `customer_email` | varchar(100) | NO | NULL |  |  |
| `order_items` | int | NO | NULL |  |  |
| `order_status` | varchar(20) | NO | NULL |  |  |
| `order_date` | date | NO | NULL |  |  |
| `status` | varchar(50) | NO | NULL |  |  |
| `max_delivery` | int | NO | NULL |  |  |
| `total_delivery` | int | NO | 0 |  |  |
| `processed_email` | text | YES | NULL |  |  |
| `scheduled_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `is_subscribe` | int | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_video_slider_effects_data

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `slider_vid_name` | varchar(255) | NO | NULL |  |  |
| `slider_Vid_type` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_video_slider_font_family

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Font_family` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_video_slider_id

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Slider_ID` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_video_slider_manager

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Slider_Title` | varchar(255) | NO | NULL |  |  |
| `Slider_Type` | varchar(255) | NO | NULL |  |  |
| `Slider_Video_Quantity` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_video_slider_videos

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Rich_Web_VSlider_Vid_Title` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Add_Desc` | longtext | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Img` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Vid` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Src` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Link` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_ONT` | varchar(255) | NO | NULL |  |  |
| `Slider_ID` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_vs_effect_10_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_vs_effect_1_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_vs_effect_2_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_vs_effect_3_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_vs_effect_4_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_vs_effect_5_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_vs_effect_6_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_vs_effect_7_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_vs_effect_8_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_rich_web_vs_effect_9_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_sb_infinite_scroll

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `status` | int | YES | NULL |  |  |
| `title` | varchar(1000) | YES | NULL |  |  |
| `pagination_type` | varchar(30) | YES | NULL |  |  |
| `content_selector` | varchar(1000) | YES | NULL |  |  |
| `navigation_selector` | varchar(1000) | YES | NULL |  |  |
| `next_selector` | varchar(1000) | YES | NULL |  |  |
| `body_class` | varchar(1000) | YES | NULL |  |  |
| `item_selector` | varchar(1000) | YES | NULL |  |  |
| `buffer_pixels` | int | YES | NULL |  |  |
| `scrolltop` | int | YES | NULL |  |  |
| `scrollto` | varchar(1000) | YES | NULL |  |  |
| `loading_message` | varchar(1000) | YES | NULL |  |  |
| `finished_message` | varchar(1000) | YES | NULL |  |  |
| `loading_wrapper_class` | varchar(1000) | YES | NULL |  |  |
| `loading_image` | varchar(1000) | YES | NULL |  |  |
| `load_more_button_text` | varchar(1000) | YES | NULL |  |  |
| `load_more_button_class` | varchar(1000) | YES | NULL |  |  |
| `animation` | varchar(50) | YES | NULL |  |  |
| `onstart` | longtext | YES | NULL |  |  |
| `onfinish` | longtext | YES | NULL |  |  |
| `miscellaneous` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_signups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `signup_id` | bigint | NO | NULL | PRI | auto_increment |
| `domain` | varchar(200) | NO | NULL | MUL |  |
| `path` | varchar(100) | NO | NULL |  |  |
| `title` | longtext | NO | NULL |  |  |
| `user_login` | varchar(60) | NO | NULL | MUL |  |
| `user_email` | varchar(100) | NO | NULL | MUL |  |
| `registered` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `activated` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `active` | tinyint(1) | NO | 0 |  |  |
| `activation_key` | varchar(50) | NO | NULL | MUL |  |
| `meta` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| activation_key | activation_key | NO | BTREE |
| domain_path | domain | NO | BTREE |
| domain_path | path | NO | BTREE |
| PRIMARY | signup_id | YES | BTREE |
| user_email | user_email | NO | BTREE |
| user_login_email | user_login | NO | BTREE |
| user_login_email | user_email | NO | BTREE |

---

## wp_simpleviews

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `post_id` | int | NO | NULL | PRI |  |
| `view` | int | YES | NULL |  |  |
| `view_datetime` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | post_id | YES | BTREE |

---

## wp_snippets

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `name` | tinytext | NO | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `code` | longtext | NO | NULL |  |  |
| `tags` | longtext | NO | NULL |  |  |
| `scope` | varchar(15) | NO | global | MUL |  |
| `condition_id` | bigint | NO | 0 |  |  |
| `priority` | smallint | NO | 10 |  |  |
| `active` | tinyint(1) | NO | 0 | MUL |  |
| `modified` | datetime | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `revision` | bigint | NO | 1 |  |  |
| `cloud_id` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| active | active | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| scope | scope | NO | BTREE |

---

## wp_term_relationships

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `object_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_taxonomy_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_order` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| bizoforce_object_term | object_id | NO | BTREE |
| bizoforce_object_term | term_taxonomy_id | NO | BTREE |
| PRIMARY | object_id | YES | BTREE |
| PRIMARY | term_taxonomy_id | YES | BTREE |
| term_taxonomy_id | term_taxonomy_id | NO | BTREE |

---

## wp_term_taxonomy

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_taxonomy_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `taxonomy` | varchar(32) | NO | NULL | MUL |  |
| `description` | longtext | NO | NULL |  |  |
| `parent` | bigint unsigned | NO | 0 |  |  |
| `count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | term_taxonomy_id | YES | BTREE |
| taxonomy | taxonomy | NO | BTREE |
| term_id_taxonomy | term_id | YES | BTREE |
| term_id_taxonomy | taxonomy | YES | BTREE |

---

## wp_termmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |
| term_id | term_id | NO | BTREE |

---

## wp_terms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | NO | NULL | MUL |  |
| `slug` | varchar(200) | NO | NULL | MUL |  |
| `term_group` | bigint | NO | 0 |  |  |
| `order_no` | bigint | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | NO | BTREE |
| PRIMARY | term_id | YES | BTREE |
| slug | slug | NO | BTREE |

---

## wp_thumbnail_slider

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `title` | varchar(1000) | NO | NULL |  |  |
| `image_name` | varchar(500) | NO | NULL |  |  |
| `createdon` | datetime | NO | NULL |  |  |
| `custom_link` | varchar(1000) | YES | NULL |  |  |
| `post_id` | int unsigned | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_tm_taskmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint | NO | NULL | PRI | auto_increment |
| `task_id` | bigint | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |
| task_id | task_id | NO | BTREE |

---

## wp_tm_tasks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | bigint | NO | NULL | MUL |  |
| `type` | varchar(300) | NO | NULL |  |  |
| `class_identifier` | varchar(300) | YES | 0 |  |  |
| `attempts` | int | YES | 0 |  |  |
| `description` | varchar(300) | YES | NULL |  |  |
| `time_created` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `last_locked_at` | bigint | YES | 0 |  |  |
| `status` | varchar(300) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## wp_usermeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `umeta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | umeta_id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## wp_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_login` | varchar(60) | NO | NULL | MUL |  |
| `user_pass` | varchar(255) | NO | NULL |  |  |
| `user_nicename` | varchar(50) | NO | NULL | MUL |  |
| `user_email` | varchar(100) | NO | NULL | MUL |  |
| `user_url` | varchar(100) | NO | NULL |  |  |
| `user_registered` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `user_activation_key` | varchar(255) | NO | NULL |  |  |
| `user_status` | int | NO | 0 |  |  |
| `display_name` | varchar(250) | NO | NULL |  |  |
| `signup_step` | enum('','register_company','register_product_service','digital_marketing_report','leads_dashboard','estimate_project','download_app','done') | NO | NULL |  |  |
| `signup_progress` | varchar(8) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |
| user_email | user_email | NO | BTREE |
| user_login_key | user_login | NO | BTREE |
| user_nicename | user_nicename | NO | BTREE |

---

## wp_wc_admin_note_actions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `action_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `note_id` | bigint unsigned | NO | NULL | MUL |  |
| `name` | varchar(255) | NO | NULL |  |  |
| `label` | varchar(255) | NO | NULL |  |  |
| `query` | longtext | NO | NULL |  |  |
| `status` | varchar(255) | NO | NULL |  |  |
| `is_primary` | tinyint(1) | NO | 0 |  |  |
| `actioned_text` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| note_id | note_id | NO | BTREE |
| PRIMARY | action_id | YES | BTREE |

---

## wp_wc_admin_notes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `note_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(255) | NO | NULL |  |  |
| `type` | varchar(20) | NO | NULL |  |  |
| `locale` | varchar(20) | NO | NULL |  |  |
| `title` | longtext | NO | NULL |  |  |
| `content` | longtext | NO | NULL |  |  |
| `icon` | varchar(200) | NO | info |  |  |
| `content_data` | longtext | YES | NULL |  |  |
| `status` | varchar(200) | NO | NULL |  |  |
| `source` | varchar(200) | NO | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_reminder` | datetime | YES | NULL |  |  |
| `is_snoozable` | tinyint(1) | NO | 0 |  |  |
| `layout` | varchar(20) | NO | NULL |  |  |
| `image` | varchar(200) | YES | NULL |  |  |
| `is_deleted` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | note_id | YES | BTREE |

---

## wp_wc_category_lookup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `category_tree_id` | bigint unsigned | NO | NULL | PRI |  |
| `category_id` | bigint unsigned | NO | NULL | PRI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | category_tree_id | YES | BTREE |
| PRIMARY | category_id | YES | BTREE |

---

## wp_wc_customer_lookup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `customer_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | bigint unsigned | YES | NULL | UNI |  |
| `username` | varchar(60) | NO | NULL |  |  |
| `first_name` | varchar(255) | NO | NULL |  |  |
| `last_name` | varchar(255) | NO | NULL |  |  |
| `email` | varchar(100) | YES | NULL | MUL |  |
| `date_last_active` | timestamp | YES | NULL |  |  |
| `date_registered` | timestamp | YES | NULL |  |  |
| `country` | char(2) | NO | NULL |  |  |
| `postcode` | varchar(20) | NO | NULL |  |  |
| `city` | varchar(100) | NO | NULL |  |  |
| `state` | varchar(100) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| email | email | NO | BTREE |
| PRIMARY | customer_id | YES | BTREE |
| user_id | user_id | YES | BTREE |

---

## wp_wc_download_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `download_log_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `timestamp` | datetime | NO | NULL | MUL |  |
| `permission_id` | bigint unsigned | NO | NULL | MUL |  |
| `user_id` | bigint unsigned | YES | NULL |  |  |
| `user_ip_address` | varchar(100) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| permission_id | permission_id | NO | BTREE |
| PRIMARY | download_log_id | YES | BTREE |
| timestamp | timestamp | NO | BTREE |

### Foreign Keys

| Constraint | Column | References |
|------------|--------|------------|
| fk_wp_wc_download_log_permission_id | permission_id | wp_woocommerce_downloadable_product_permissions.permission_id |

---

## wp_wc_order_coupon_lookup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `order_id` | bigint unsigned | NO | NULL | PRI |  |
| `coupon_id` | bigint | NO | NULL | PRI |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `discount_amount` | double | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| coupon_id | coupon_id | NO | BTREE |
| date_created | date_created | NO | BTREE |
| PRIMARY | order_id | YES | BTREE |
| PRIMARY | coupon_id | YES | BTREE |

---

## wp_wc_order_product_lookup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `order_item_id` | bigint unsigned | NO | NULL | PRI |  |
| `order_id` | bigint unsigned | NO | NULL | MUL |  |
| `product_id` | bigint unsigned | NO | NULL | MUL |  |
| `variation_id` | bigint unsigned | NO | NULL |  |  |
| `customer_id` | bigint unsigned | YES | NULL | MUL |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `product_qty` | int | NO | NULL |  |  |
| `product_net_revenue` | double | NO | 0 |  |  |
| `product_gross_revenue` | double | NO | 0 |  |  |
| `coupon_amount` | double | NO | 0 |  |  |
| `tax_amount` | double | NO | 0 |  |  |
| `shipping_amount` | double | NO | 0 |  |  |
| `shipping_tax_amount` | double | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| customer_id | customer_id | NO | BTREE |
| date_created | date_created | NO | BTREE |
| order_id | order_id | NO | BTREE |
| PRIMARY | order_item_id | YES | BTREE |
| product_id | product_id | NO | BTREE |

---

## wp_wc_order_stats

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `order_id` | bigint unsigned | NO | NULL | PRI |  |
| `parent_id` | bigint unsigned | NO | 0 |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `date_created_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `num_items_sold` | int | NO | 0 |  |  |
| `total_sales` | double | NO | 0 |  |  |
| `tax_total` | double | NO | 0 |  |  |
| `shipping_total` | double | NO | 0 |  |  |
| `net_total` | double | NO | 0 |  |  |
| `returning_customer` | tinyint(1) | YES | NULL |  |  |
| `status` | varchar(200) | NO | NULL | MUL |  |
| `customer_id` | bigint unsigned | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| customer_id | customer_id | NO | BTREE |
| date_created | date_created | NO | BTREE |
| PRIMARY | order_id | YES | BTREE |
| status | status | NO | BTREE |

---

## wp_wc_order_tax_lookup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `order_id` | bigint unsigned | NO | NULL | PRI |  |
| `tax_rate_id` | bigint unsigned | NO | NULL | PRI |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `shipping_tax` | double | NO | 0 |  |  |
| `order_tax` | double | NO | 0 |  |  |
| `total_tax` | double | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| date_created | date_created | NO | BTREE |
| PRIMARY | order_id | YES | BTREE |
| PRIMARY | tax_rate_id | YES | BTREE |
| tax_rate_id | tax_rate_id | NO | BTREE |

---

## wp_wc_product_meta_lookup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `product_id` | bigint | NO | NULL | PRI |  |
| `sku` | varchar(100) | YES | NULL |  |  |
| `virtual` | tinyint(1) | YES | 0 | MUL |  |
| `downloadable` | tinyint(1) | YES | 0 | MUL |  |
| `min_price` | decimal(19,4) | YES | NULL | MUL |  |
| `max_price` | decimal(19,4) | YES | NULL |  |  |
| `onsale` | tinyint(1) | YES | 0 | MUL |  |
| `stock_quantity` | double | YES | NULL | MUL |  |
| `stock_status` | varchar(100) | YES | instock | MUL |  |
| `rating_count` | bigint | YES | 0 |  |  |
| `average_rating` | decimal(3,2) | YES | 0.00 |  |  |
| `total_sales` | bigint | YES | 0 |  |  |
| `tax_status` | varchar(100) | YES | taxable |  |  |
| `tax_class` | varchar(100) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| downloadable | downloadable | NO | BTREE |
| min_max_price | min_price | NO | BTREE |
| min_max_price | max_price | NO | BTREE |
| onsale | onsale | NO | BTREE |
| PRIMARY | product_id | YES | BTREE |
| stock_quantity | stock_quantity | NO | BTREE |
| stock_status | stock_status | NO | BTREE |
| virtual | virtual | NO | BTREE |

---

## wp_wc_reserved_stock

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `order_id` | bigint | NO | NULL | PRI |  |
| `product_id` | bigint | NO | NULL | PRI |  |
| `stock_quantity` | double | NO | 0 |  |  |
| `timestamp` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `expires` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | order_id | YES | BTREE |
| PRIMARY | product_id | YES | BTREE |

---

## wp_wc_tax_rate_classes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `tax_rate_class_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | NO | NULL |  |  |
| `slug` | varchar(200) | NO | NULL | UNI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | tax_rate_class_id | YES | BTREE |
| slug | slug | YES | BTREE |

---

## wp_wc_webhooks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `webhook_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `status` | varchar(200) | NO | NULL |  |  |
| `name` | text | NO | NULL |  |  |
| `user_id` | bigint unsigned | NO | NULL | MUL |  |
| `delivery_url` | text | NO | NULL |  |  |
| `secret` | text | NO | NULL |  |  |
| `topic` | varchar(200) | NO | NULL |  |  |
| `date_created` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_created_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `date_modified_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `api_version` | smallint | NO | NULL |  |  |
| `failure_count` | smallint | NO | 0 |  |  |
| `pending_delivery` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | webhook_id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## wp_wcv_feedback

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `rating` | bigint | NO | NULL |  |  |
| `order_id` | bigint | NO | NULL |  |  |
| `vendor_id` | bigint | NO | NULL |  |  |
| `product_id` | bigint | NO | NULL |  |  |
| `customer_id` | bigint | NO | NULL |  |  |
| `rating_title` | varchar(255) | YES | NULL |  |  |
| `comments` | longtext | YES | NULL |  |  |
| `postdate` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_wcv_reports_cache

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `report_key` | varchar(255) | NO | NULL | MUL |  |
| `report_data` | longtext | NO | NULL |  |  |
| `report_date` | date | NO | NULL | MUL |  |
| `created_at` | timestamp | YES | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| report_date_idx | report_date | NO | BTREE |
| report_key_idx | report_key | NO | BTREE |

---

## wp_woocommerce_api_keys

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `key_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | bigint unsigned | NO | NULL |  |  |
| `description` | varchar(200) | YES | NULL |  |  |
| `permissions` | varchar(10) | NO | NULL |  |  |
| `consumer_key` | char(64) | NO | NULL | MUL |  |
| `consumer_secret` | char(43) | NO | NULL | MUL |  |
| `nonces` | longtext | YES | NULL |  |  |
| `truncated_key` | char(7) | NO | NULL |  |  |
| `last_access` | datetime | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| consumer_key | consumer_key | NO | BTREE |
| consumer_secret | consumer_secret | NO | BTREE |
| PRIMARY | key_id | YES | BTREE |

---

## wp_woocommerce_attribute_taxonomies

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `attribute_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `attribute_name` | varchar(200) | NO | NULL | MUL |  |
| `attribute_label` | varchar(200) | YES | NULL |  |  |
| `attribute_type` | varchar(20) | NO | NULL |  |  |
| `attribute_orderby` | varchar(20) | NO | NULL |  |  |
| `attribute_public` | int | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| attribute_name | attribute_name | NO | BTREE |
| PRIMARY | attribute_id | YES | BTREE |

---

## wp_woocommerce_downloadable_product_permissions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `permission_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `download_id` | varchar(36) | NO | NULL | MUL |  |
| `product_id` | bigint unsigned | NO | NULL | MUL |  |
| `order_id` | bigint unsigned | NO | 0 | MUL |  |
| `order_key` | varchar(200) | NO | NULL |  |  |
| `user_email` | varchar(200) | NO | NULL |  |  |
| `user_id` | bigint unsigned | YES | NULL | MUL |  |
| `downloads_remaining` | varchar(9) | YES | NULL |  |  |
| `access_granted` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `access_expires` | datetime | YES | NULL |  |  |
| `download_count` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| download_order_key_product | product_id | NO | BTREE |
| download_order_key_product | order_id | NO | BTREE |
| download_order_key_product | order_key | NO | BTREE |
| download_order_key_product | download_id | NO | BTREE |
| download_order_product | download_id | NO | BTREE |
| download_order_product | order_id | NO | BTREE |
| download_order_product | product_id | NO | BTREE |
| order_id | order_id | NO | BTREE |
| PRIMARY | permission_id | YES | BTREE |
| user_order_remaining_expires | user_id | NO | BTREE |
| user_order_remaining_expires | order_id | NO | BTREE |
| user_order_remaining_expires | downloads_remaining | NO | BTREE |
| user_order_remaining_expires | access_expires | NO | BTREE |

---

## wp_woocommerce_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `log_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `timestamp` | datetime | NO | NULL |  |  |
| `level` | smallint | NO | NULL | MUL |  |
| `source` | varchar(200) | NO | NULL |  |  |
| `message` | longtext | NO | NULL |  |  |
| `context` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| level | level | NO | BTREE |
| PRIMARY | log_id | YES | BTREE |

---

## wp_woocommerce_order_itemmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `order_item_id` | bigint unsigned | NO | NULL | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| order_item_id | order_item_id | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wp_woocommerce_order_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `order_item_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `order_item_name` | longtext | NO | NULL |  |  |
| `order_item_type` | varchar(200) | NO | NULL |  |  |
| `order_id` | bigint unsigned | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| order_id | order_id | NO | BTREE |
| PRIMARY | order_item_id | YES | BTREE |

---

## wp_woocommerce_payment_tokenmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `payment_token_id` | bigint unsigned | NO | NULL | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| payment_token_id | payment_token_id | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wp_woocommerce_payment_tokens

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `token_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `gateway_id` | varchar(200) | NO | NULL |  |  |
| `token` | text | NO | NULL |  |  |
| `user_id` | bigint unsigned | NO | 0 | MUL |  |
| `type` | varchar(200) | NO | NULL |  |  |
| `is_default` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | token_id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## wp_woocommerce_sessions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `session_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `session_key` | char(32) | NO | NULL | UNI |  |
| `session_value` | longtext | NO | NULL |  |  |
| `session_expiry` | bigint unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | session_id | YES | BTREE |
| session_key | session_key | YES | BTREE |

---

## wp_woocommerce_shipping_zone_locations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `location_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `zone_id` | bigint unsigned | NO | NULL |  |  |
| `location_code` | varchar(200) | NO | NULL |  |  |
| `location_type` | varchar(40) | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| location_id | location_id | NO | BTREE |
| location_type | location_type | NO | BTREE |
| location_type_code | location_type | NO | BTREE |
| location_type_code | location_code | NO | BTREE |
| PRIMARY | location_id | YES | BTREE |

---

## wp_woocommerce_shipping_zone_methods

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `zone_id` | bigint unsigned | NO | NULL |  |  |
| `instance_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `method_id` | varchar(200) | NO | NULL |  |  |
| `method_order` | bigint unsigned | NO | NULL |  |  |
| `is_enabled` | tinyint(1) | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | instance_id | YES | BTREE |

---

## wp_woocommerce_shipping_zones

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `zone_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `zone_name` | varchar(200) | NO | NULL |  |  |
| `zone_order` | bigint unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | zone_id | YES | BTREE |

---

## wp_woocommerce_tax_rate_locations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `location_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `location_code` | varchar(200) | NO | NULL |  |  |
| `tax_rate_id` | bigint unsigned | NO | NULL | MUL |  |
| `location_type` | varchar(40) | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| location_type | location_type | NO | BTREE |
| location_type_code | location_type | NO | BTREE |
| location_type_code | location_code | NO | BTREE |
| PRIMARY | location_id | YES | BTREE |
| tax_rate_id | tax_rate_id | NO | BTREE |

---

## wp_woocommerce_tax_rates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `tax_rate_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `tax_rate_country` | varchar(2) | NO | NULL | MUL |  |
| `tax_rate_state` | varchar(200) | NO | NULL | MUL |  |
| `tax_rate` | varchar(8) | NO | NULL |  |  |
| `tax_rate_name` | varchar(200) | NO | NULL |  |  |
| `tax_rate_priority` | bigint unsigned | NO | NULL | MUL |  |
| `tax_rate_compound` | int | NO | 0 |  |  |
| `tax_rate_shipping` | int | NO | 1 |  |  |
| `tax_rate_order` | bigint unsigned | NO | NULL |  |  |
| `tax_rate_class` | varchar(200) | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | tax_rate_id | YES | BTREE |
| tax_rate_class | tax_rate_class | NO | BTREE |
| tax_rate_country | tax_rate_country | NO | BTREE |
| tax_rate_priority | tax_rate_priority | NO | BTREE |
| tax_rate_state | tax_rate_state | NO | BTREE |

---

## wp_wow_mwp

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | mediumint | NO | NULL | PRI | auto_increment |
| `title` | varchar(200) | NO | NULL |  |  |
| `param` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |

---

## wp_wp125_ads

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `slot` | int | NO | NULL |  |  |
| `name` | text | NO | NULL |  |  |
| `clicks` | int | NO | NULL |  |  |
| `start_date` | varchar(12) | NO | NULL |  |  |
| `end_date` | varchar(12) | NO | NULL |  |  |
| `status` | int | NO | NULL |  |  |
| `target` | text | NO | NULL |  |  |
| `image_url` | text | NO | NULL |  |  |
| `pre_exp_email` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_wpaie_file_manager

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `file_id` | int | NO | NULL | PRI | auto_increment |
| `file_name` | tinytext | NO | NULL |  |  |
| `absolute_path` | text | NO | NULL |  |  |
| `file_path` | text | NO | NULL |  |  |
| `file_type` | text | NO | NULL |  |  |
| `file_info` | varchar(200) | NO | NULL |  |  |
| `imported_ids` | text | NO | NULL |  |  |
| `upload_time` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | file_id | YES | BTREE |

---

## wp_wpbdp_fees

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `label` | varchar(255) | NO | NULL |  |  |
| `amount` | decimal(10,2) | NO | 0.00 |  |  |
| `days` | smallint unsigned | NO | 0 |  |  |
| `images` | smallint unsigned | NO | 0 |  |  |
| `categories` | blob | NO | NULL |  |  |
| `extra_data` | blob | YES | NULL |  |  |
| `weight` | int | NO | 0 |  |  |
| `sticky` | tinyint(1) | NO | 0 |  |  |
| `enabled` | tinyint(1) | NO | 1 |  |  |
| `tag` | varchar(255) | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_wpbdp_form_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `label` | varchar(255) | NO | NULL |  |  |
| `description` | varchar(255) | YES | NULL |  |  |
| `field_type` | varchar(100) | NO | NULL | MUL |  |
| `association` | varchar(100) | NO | NULL |  |  |
| `validators` | text | YES | NULL |  |  |
| `weight` | int | NO | 0 |  |  |
| `display_flags` | text | YES | NULL |  |  |
| `field_data` | blob | YES | NULL |  |  |
| `shortname` | varchar(255) | NO | NULL |  |  |
| `tag` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| field_type | field_type | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_wpbdp_listing_claims

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `listing_id` | bigint | NO | NULL |  |  |
| `status` | varchar(20) | NO | pending |  |  |
| `user_id` | bigint | NO | NULL |  |  |
| `user_comment` | text | YES | NULL |  |  |
| `answer` | text | YES | NULL |  |  |
| `payment_id` | bigint | NO | 0 |  |  |
| `created_on` | datetime | NO | NULL |  |  |
| `processed_on` | datetime | YES | NULL |  |  |
| `data` | blob | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_wpbdp_listing_fees

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `listing_id` | bigint | NO | NULL | MUL |  |
| `category_id` | bigint | NO | NULL |  |  |
| `expires_on` | timestamp | YES | NULL | MUL |  |
| `email_sent` | tinyint(1) | NO | 0 |  |  |
| `fee_id` | bigint | YES | NULL |  |  |
| `fee_days` | smallint unsigned | NO | NULL |  |  |
| `fee_images` | smallint unsigned | NO | 0 |  |  |
| `recurring` | tinyint(1) | NO | 0 |  |  |
| `recurring_id` | varchar(255) | YES | NULL |  |  |
| `recurring_data` | blob | YES | NULL |  |  |
| `sticky` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| expires_and_email | expires_on | NO | BTREE |
| expires_and_email | email_sent | NO | BTREE |
| listing_cat | listing_id | NO | BTREE |
| listing_cat | category_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_wpbdp_listings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `listing_id` | bigint | NO | NULL | PRI |  |
| `fee_id` | bigint | YES | NULL |  |  |
| `fee_price` | decimal(10,2) | YES | 0.00 |  |  |
| `fee_days` | smallint unsigned | YES | 0 |  |  |
| `fee_images` | smallint unsigned | YES | 0 |  |  |
| `expiration_date` | timestamp | YES | NULL |  |  |
| `is_recurring` | tinyint(1) | NO | 0 |  |  |
| `is_sticky` | tinyint(1) | NO | 0 |  |  |
| `subscription_id` | varchar(255) | YES | NULL |  |  |
| `subscription_data` | longblob | YES | NULL |  |  |
| `listing_status` | varchar(255) | NO | unknown |  |  |
| `flags` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | listing_id | YES | BTREE |

---

## wp_wpbdp_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `object_id` | bigint | YES | 0 |  |  |
| `rel_object_id` | bigint | YES | 0 |  |  |
| `object_type` | varchar(20) | YES | NULL |  |  |
| `created_at` | datetime | NO | NULL |  |  |
| `log_type` | varchar(255) | YES | NULL |  |  |
| `actor` | varchar(255) | YES | NULL |  |  |
| `message` | text | YES | NULL |  |  |
| `data` | longblob | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_wpbdp_payments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `listing_id` | bigint | NO | NULL | MUL |  |
| `gateway` | varchar(255) | YES | NULL |  |  |
| `amount` | decimal(10,2) | NO | 0.00 |  |  |
| `status` | varchar(255) | NO | NULL | MUL |  |
| `created_on` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `processed_on` | timestamp | YES | NULL |  |  |
| `processed_by` | varchar(255) | NO | gateway |  |  |
| `payerinfo` | blob | YES | NULL |  |  |
| `extra_data` | longblob | YES | NULL |  |  |
| `currency_code` | varchar(3) | NO | USD |  |  |
| `notes` | longblob | YES | NULL |  |  |
| `tag` | varchar(255) | YES | NULL |  |  |
| `parent_id` | bigint | NO | 0 |  |  |
| `payment_key` | varchar(255) | YES | NULL |  |  |
| `payment_type` | varchar(255) | YES | NULL |  |  |
| `payment_items` | longblob | YES | NULL |  |  |
| `data` | longblob | YES | NULL |  |  |
| `context` | varchar(255) | YES | NULL |  |  |
| `payer_email` | varchar(255) | YES | NULL |  |  |
| `payer_first_name` | varchar(255) | YES | NULL |  |  |
| `payer_last_name` | varchar(255) | YES | NULL |  |  |
| `payer_data` | blob | YES | NULL |  |  |
| `gateway_tx_id` | varchar(255) | YES | NULL |  |  |
| `created_at` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `is_test` | tinyint(1) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| listing_id | listing_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| status | status | NO | BTREE |

---

## wp_wpbdp_payments_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `payment_id` | bigint | NO | NULL |  |  |
| `amount` | decimal(10,2) | NO | 0.00 |  |  |
| `item_type` | varchar(100) | NO | charge |  |  |
| `description` | varchar(255) | NO | Charge |  |  |
| `rel_id_1` | bigint | YES | NULL |  |  |
| `rel_id_2` | bigint | YES | NULL |  |  |
| `data` | longblob | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_wpbdp_plans

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `label` | varchar(255) | NO | NULL |  |  |
| `amount` | decimal(10,2) | NO | 0.00 |  |  |
| `days` | smallint unsigned | NO | 0 |  |  |
| `images` | smallint unsigned | NO | 0 |  |  |
| `sticky` | tinyint(1) | NO | 0 |  |  |
| `recurring` | tinyint(1) | NO | 0 |  |  |
| `pricing_model` | varchar(100) | NO | flat |  |  |
| `pricing_details` | blob | YES | NULL |  |  |
| `supported_categories` | text | NO | NULL |  |  |
| `weight` | int | NO | 0 |  |  |
| `enabled` | tinyint(1) | NO | 1 |  |  |
| `description` | text | YES | NULL |  |  |
| `extra_data` | longblob | YES | NULL |  |  |
| `tag` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_wpbdp_ratings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | mediumint | NO | NULL | PRI | auto_increment |
| `listing_id` | bigint | NO | NULL | MUL |  |
| `rating` | tinyint unsigned | NO | 0 |  |  |
| `user_id` | bigint | NO | 0 |  |  |
| `user_name` | varchar(255) | YES | NULL |  |  |
| `ip_address` | varchar(255) | NO | NULL |  |  |
| `comment` | text | YES | NULL |  |  |
| `created_on` | datetime | NO | NULL |  |  |
| `approved` | tinyint unsigned | NO | 1 |  |  |
| `user_email` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| bizoforce_listing_id | listing_id | NO | BTREE |
| bizoforce_listing_rating | listing_id | NO | BTREE |
| bizoforce_listing_rating | rating | NO | BTREE |
| listing_id | listing_id | NO | BTREE |
| listing_id_index | listing_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_wpbdp_regionmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `region_id` | bigint unsigned | NO | NULL |  |  |
| `meta_key` | varchar(255) | YES | NULL |  |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | meta_id | YES | BTREE |

---

## wp_wpbdp_submit_state

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | varchar(64) | NO | NULL | PRI |  |
| `state` | longblob | NO | NULL |  |  |
| `updated_on` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_wpbdp_x_featured_levels

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | varchar(255) | NO | NULL | PRI |  |
| `name` | varchar(255) | NO | NULL |  |  |
| `weight` | int | NO | 0 |  |  |
| `description` | text | YES | NULL |  |  |
| `cost` | decimal(10,2) | NO | 0.00 |  |  |
| `form_fields` | blob | YES | NULL |  |  |
| `extra_data` | blob | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_wpbdp_zipcodes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `zip` | varchar(10) | NO | NULL | MUL |  |
| `latitude` | float | NO | NULL |  |  |
| `longitude` | float | NO | NULL |  |  |
| `country` | varchar(2) | NO | NULL |  |  |
| `city` | varchar(100) | YES | NULL |  |  |
| `state` | varchar(100) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| zip | zip | NO | BTREE |

---

## wp_wpbdp_zipcodes_listings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `listing_id` | bigint | NO | 0 | PRI |  |
| `zip` | varchar(10) | YES | NULL |  |  |
| `latitude` | float | YES | NULL |  |  |
| `longitude` | float | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | listing_id | YES | BTREE |

---

## wp_wpfm_backup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `backup_name` | text | YES | NULL |  |  |
| `backup_date` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_wpforms_payment_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `payment_id` | bigint | NO | NULL | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| meta_value | meta_value | NO | BTREE |
| payment_id | payment_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_wpforms_payments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `form_id` | bigint | NO | NULL | MUL |  |
| `status` | varchar(10) | NO | NULL | MUL |  |
| `subtotal_amount` | decimal(26,8) | NO | 0.00000000 |  |  |
| `discount_amount` | decimal(26,8) | NO | 0.00000000 |  |  |
| `total_amount` | decimal(26,8) | NO | 0.00000000 | MUL |  |
| `currency` | varchar(3) | NO | NULL |  |  |
| `entry_id` | bigint | NO | 0 |  |  |
| `gateway` | varchar(20) | NO | NULL |  |  |
| `type` | varchar(12) | NO | NULL | MUL |  |
| `mode` | varchar(4) | NO | NULL |  |  |
| `transaction_id` | varchar(40) | NO | NULL | MUL |  |
| `customer_id` | varchar(40) | NO | NULL | MUL |  |
| `subscription_id` | varchar(40) | NO | NULL | MUL |  |
| `subscription_status` | varchar(10) | NO | NULL | MUL |  |
| `title` | varchar(255) | NO | NULL | MUL |  |
| `date_created_gmt` | datetime | NO | NULL |  |  |
| `date_updated_gmt` | datetime | NO | NULL |  |  |
| `is_published` | tinyint(1) | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| customer_id | customer_id | NO | BTREE |
| form_id | form_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| status | status | NO | BTREE |
| subscription_id | subscription_id | NO | BTREE |
| subscription_status | subscription_status | NO | BTREE |
| title | title | NO | BTREE |
| total_amount | total_amount | NO | BTREE |
| transaction_id | transaction_id | NO | BTREE |
| type | type | NO | BTREE |

---

## wp_wpforms_tasks_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `action` | varchar(255) | NO | NULL |  |  |
| `data` | longtext | NO | NULL |  |  |
| `date` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_wpmailsmtp_debug_events

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `content` | text | YES | NULL |  |  |
| `initiator` | text | YES | NULL |  |  |
| `event_type` | tinyint unsigned | NO | 0 |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_wpmailsmtp_tasks_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `action` | varchar(255) | NO | NULL |  |  |
| `data` | longtext | NO | NULL |  |  |
| `date` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_wt_iew_action_history

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `template_type` | varchar(255) | NO | NULL |  |  |
| `item_type` | varchar(255) | NO | NULL |  |  |
| `file_name` | varchar(255) | NO | NULL |  |  |
| `created_at` | int | NO | 0 |  |  |
| `status` | int | NO | 0 |  |  |
| `status_text` | varchar(255) | NO | NULL |  |  |
| `offset` | int | NO | 0 |  |  |
| `total` | int | NO | 0 |  |  |
| `data` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_wt_iew_mapping_template

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `template_type` | varchar(255) | NO | NULL |  |  |
| `item_type` | varchar(255) | NO | NULL |  |  |
| `name` | varchar(255) | NO | NULL |  |  |
| `data` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wp_yoast_indexable

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `permalink` | longtext | YES | NULL |  |  |
| `permalink_hash` | varchar(40) | YES | NULL | MUL |  |
| `object_id` | bigint | YES | NULL | MUL |  |
| `object_type` | varchar(32) | NO | NULL | MUL |  |
| `object_sub_type` | varchar(32) | YES | NULL |  |  |
| `author_id` | bigint | YES | NULL |  |  |
| `post_parent` | bigint | YES | NULL | MUL |  |
| `title` | text | YES | NULL |  |  |
| `description` | mediumtext | YES | NULL |  |  |
| `breadcrumb_title` | text | YES | NULL |  |  |
| `post_status` | varchar(20) | YES | NULL |  |  |
| `is_public` | tinyint(1) | YES | NULL |  |  |
| `is_protected` | tinyint(1) | YES | 0 |  |  |
| `has_public_posts` | tinyint(1) | YES | NULL |  |  |
| `number_of_pages` | int unsigned | YES | NULL |  |  |
| `canonical` | longtext | YES | NULL |  |  |
| `primary_focus_keyword` | varchar(191) | YES | NULL |  |  |
| `primary_focus_keyword_score` | int | YES | NULL |  |  |
| `readability_score` | int | YES | NULL |  |  |
| `is_cornerstone` | tinyint(1) | YES | 0 |  |  |
| `is_robots_noindex` | tinyint(1) | YES | 0 |  |  |
| `is_robots_nofollow` | tinyint(1) | YES | 0 |  |  |
| `is_robots_noarchive` | tinyint(1) | YES | 0 |  |  |
| `is_robots_noimageindex` | tinyint(1) | YES | 0 |  |  |
| `is_robots_nosnippet` | tinyint(1) | YES | 0 |  |  |
| `twitter_title` | text | YES | NULL |  |  |
| `twitter_image` | longtext | YES | NULL |  |  |
| `twitter_description` | longtext | YES | NULL |  |  |
| `twitter_image_id` | varchar(191) | YES | NULL |  |  |
| `twitter_image_source` | text | YES | NULL |  |  |
| `open_graph_title` | text | YES | NULL |  |  |
| `open_graph_description` | longtext | YES | NULL |  |  |
| `open_graph_image` | longtext | YES | NULL |  |  |
| `open_graph_image_id` | varchar(191) | YES | NULL |  |  |
| `open_graph_image_source` | text | YES | NULL |  |  |
| `open_graph_image_meta` | mediumtext | YES | NULL |  |  |
| `link_count` | int | YES | NULL |  |  |
| `incoming_link_count` | int | YES | NULL |  |  |
| `prominent_words_version` | int unsigned | YES | NULL | MUL |  |
| `created_at` | datetime | YES | NULL |  |  |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `blog_id` | bigint | NO | 1 |  |  |
| `language` | varchar(32) | YES | NULL |  |  |
| `region` | varchar(32) | YES | NULL |  |  |
| `schema_page_type` | varchar(64) | YES | NULL |  |  |
| `schema_article_type` | varchar(64) | YES | NULL |  |  |
| `has_ancestors` | tinyint(1) | YES | 0 |  |  |
| `estimated_reading_time_minutes` | int | YES | NULL |  |  |
| `version` | int | YES | 1 |  |  |
| `object_last_modified` | datetime | YES | NULL |  |  |
| `object_published_at` | datetime | YES | NULL | MUL |  |
| `inclusive_language_score` | int | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| object_id_and_type | object_id | NO | BTREE |
| object_id_and_type | object_type | NO | BTREE |
| object_type_and_sub_type | object_type | NO | BTREE |
| object_type_and_sub_type | object_sub_type | NO | BTREE |
| permalink_hash_and_object_type | permalink_hash | NO | BTREE |
| permalink_hash_and_object_type | object_type | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| prominent_words | prominent_words_version | NO | BTREE |
| prominent_words | object_type | NO | BTREE |
| prominent_words | object_sub_type | NO | BTREE |
| prominent_words | post_status | NO | BTREE |
| published_sitemap_index | object_published_at | NO | BTREE |
| published_sitemap_index | is_robots_noindex | NO | BTREE |
| published_sitemap_index | object_type | NO | BTREE |
| published_sitemap_index | object_sub_type | NO | BTREE |
| subpages | post_parent | NO | BTREE |
| subpages | object_type | NO | BTREE |
| subpages | post_status | NO | BTREE |
| subpages | object_id | NO | BTREE |

---

## wp_yoast_indexable_hierarchy

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `indexable_id` | int unsigned | NO | NULL | PRI |  |
| `ancestor_id` | int unsigned | NO | NULL | PRI |  |
| `depth` | int unsigned | YES | NULL | MUL |  |
| `blog_id` | bigint | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ancestor_id | ancestor_id | NO | BTREE |
| depth | depth | NO | BTREE |
| indexable_id | indexable_id | NO | BTREE |
| PRIMARY | indexable_id | YES | BTREE |
| PRIMARY | ancestor_id | YES | BTREE |

---

## wp_yoast_migrations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `version` | varchar(191) | YES | NULL | UNI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_wp_yoast_migrations_version | version | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_yoast_primary_term

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint | YES | NULL | MUL |  |
| `term_id` | bigint | YES | NULL |  |  |
| `taxonomy` | varchar(32) | NO | NULL |  |  |
| `created_at` | datetime | YES | NULL |  |  |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `blog_id` | bigint | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| post_taxonomy | post_id | NO | BTREE |
| post_taxonomy | taxonomy | NO | BTREE |
| post_term | post_id | NO | BTREE |
| post_term | term_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_yoast_seo_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `url` | varchar(255) | NO | NULL |  |  |
| `post_id` | bigint unsigned | NO | NULL | MUL |  |
| `target_post_id` | bigint unsigned | NO | NULL |  |  |
| `type` | varchar(8) | NO | NULL |  |  |
| `indexable_id` | int unsigned | YES | NULL | MUL |  |
| `target_indexable_id` | int unsigned | YES | NULL |  |  |
| `height` | int unsigned | YES | NULL |  |  |
| `width` | int unsigned | YES | NULL |  |  |
| `size` | int unsigned | YES | NULL |  |  |
| `language` | varchar(32) | YES | NULL |  |  |
| `region` | varchar(32) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| indexable_link_direction | indexable_id | NO | BTREE |
| indexable_link_direction | type | NO | BTREE |
| link_direction | post_id | NO | BTREE |
| link_direction | type | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wp_yoast_seo_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `object_id` | bigint unsigned | NO | NULL | PRI |  |
| `internal_link_count` | int unsigned | YES | NULL |  |  |
| `incoming_link_count` | int unsigned | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| object_id | object_id | YES | BTREE |

---

## wpblog_commentmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_id | comment_id | NO | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wpblog_comments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `comment_ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_post_ID` | bigint unsigned | NO | 0 | MUL |  |
| `comment_author` | text | NO | NULL |  |  |
| `comment_author_email` | varchar(100) | NO | NULL | MUL |  |
| `comment_author_url` | varchar(200) | NO | NULL |  |  |
| `comment_author_IP` | varchar(100) | NO | NULL |  |  |
| `comment_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `comment_date_gmt` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `comment_content` | mediumtext | NO | NULL |  |  |
| `comment_karma` | int | NO | 0 |  |  |
| `comment_approved` | varchar(20) | NO | 1 | MUL |  |
| `comment_agent` | varchar(255) | NO | NULL |  |  |
| `comment_type` | varchar(20) | NO | comment |  |  |
| `comment_parent` | bigint unsigned | NO | 0 | MUL |  |
| `user_id` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_approved_date_gmt | comment_approved | NO | BTREE |
| comment_approved_date_gmt | comment_date_gmt | NO | BTREE |
| comment_author_email | comment_author_email | NO | BTREE |
| comment_date_gmt | comment_date_gmt | NO | BTREE |
| comment_parent | comment_parent | NO | BTREE |
| comment_post_ID | comment_post_ID | NO | BTREE |
| PRIMARY | comment_ID | YES | BTREE |

---

## wpblog_gks_sliders

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `title` | varchar(255) | YES | NULL |  |  |
| `corder` | text | YES | NULL |  |  |
| `options` | text | YES | NULL |  |  |
| `extoptions` | text | YES | NULL |  |  |
| `css` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_gks_slides

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `sid` | int | NO | NULL |  |  |
| `title` | varchar(255) | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `url` | text | YES | NULL |  |  |
| `cover` | text | YES | NULL |  |  |
| `pics` | text | YES | NULL |  |  |
| `categories` | text | YES | NULL |  |  |
| `cdate` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `details` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_gmedia

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `author` | bigint unsigned | NO | 0 | MUL |  |
| `date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `description` | longtext | NO | NULL |  |  |
| `title` | text | NO | NULL |  |  |
| `gmuid` | varchar(255) | NO | NULL | MUL |  |
| `link` | varchar(255) | NO | NULL |  |  |
| `modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `mime_type` | varchar(100) | NO | NULL | MUL |  |
| `status` | varchar(20) | NO | publish |  |  |
| `post_id` | bigint unsigned | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| author | author | NO | BTREE |
| gmuid | gmuid | NO | BTREE |
| post_id | post_id | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| type_status_date | mime_type | NO | BTREE |
| type_status_date | status | NO | BTREE |
| type_status_date | date | NO | BTREE |
| type_status_date | ID | NO | BTREE |

---

## wpblog_gmedia_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `log` | varchar(200) | NO | NULL | MUL |  |
| `ID` | bigint unsigned | NO | 0 | MUL |  |
| `log_author` | bigint unsigned | NO | 0 | MUL |  |
| `log_date` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `log_data` | longtext | YES | NULL |  |  |
| `ip_address` | varchar(45) | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ID | ID | NO | BTREE |
| ip_address | ip_address | NO | BTREE |
| log | log | NO | BTREE |
| log_author | log_author | NO | BTREE |
| log_date | log_date | NO | BTREE |

---

## wpblog_gmedia_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `gmedia_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| _hash | meta_value | NO | BTREE |
| gmedia_id | gmedia_id | NO | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wpblog_gmedia_term

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | NO | NULL | MUL |  |
| `taxonomy` | varchar(32) | NO | NULL | MUL |  |
| `description` | longtext | NO | NULL |  |  |
| `global` | bigint unsigned | NO | 0 |  |  |
| `count` | bigint | NO | 0 |  |  |
| `status` | varchar(20) | NO | publish |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | NO | BTREE |
| PRIMARY | term_id | YES | BTREE |
| taxonomy | taxonomy | NO | BTREE |

---

## wpblog_gmedia_term_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `gmedia_term_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| gmedia_term_id | gmedia_term_id | NO | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wpblog_gmedia_term_relationships

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `gmedia_id` | bigint unsigned | NO | 0 | PRI |  |
| `gmedia_term_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_order` | int | NO | 0 |  |  |
| `gmedia_order` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| gmedia_term_id | gmedia_term_id | NO | BTREE |
| PRIMARY | gmedia_id | YES | BTREE |
| PRIMARY | gmedia_term_id | YES | BTREE |

---

## wpblog_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `link_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `link_url` | varchar(255) | NO | NULL |  |  |
| `link_name` | varchar(255) | NO | NULL |  |  |
| `link_image` | varchar(255) | NO | NULL |  |  |
| `link_target` | varchar(25) | NO | NULL |  |  |
| `link_description` | varchar(255) | NO | NULL |  |  |
| `link_visible` | varchar(20) | NO | Y | MUL |  |
| `link_owner` | bigint unsigned | NO | 1 |  |  |
| `link_rating` | int | NO | 0 |  |  |
| `link_updated` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `link_rel` | varchar(255) | NO | NULL |  |  |
| `link_notes` | longtext | NO | NULL |  |  |
| `link_rss` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| link_visible | link_visible | NO | BTREE |
| PRIMARY | link_id | YES | BTREE |

---

## wpblog_mailster_actions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `type` | tinyint(1) | NO | 0 | MUL |  |
| `link_id` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | type | YES | BTREE |
| id | link_id | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |
| type | type | NO | BTREE |

---

## wpblog_mailster_form_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `form_id` | bigint unsigned | NO | NULL | PRI |  |
| `field_id` | varchar(191) | NO | NULL | PRI |  |
| `name` | varchar(191) | NO | NULL |  |  |
| `error_msg` | varchar(191) | NO | NULL |  |  |
| `required` | tinyint unsigned | NO | NULL |  |  |
| `position` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | form_id | YES | BTREE |
| id | field_id | YES | BTREE |

---

## wpblog_mailster_forms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint | NO | NULL | PRI | auto_increment |
| `name` | varchar(191) | NO | NULL |  |  |
| `submit` | varchar(191) | NO | NULL |  |  |
| `asterisk` | tinyint(1) | YES | 1 |  |  |
| `userschoice` | tinyint(1) | YES | 0 |  |  |
| `precheck` | tinyint(1) | YES | 0 |  |  |
| `dropdown` | tinyint(1) | YES | 0 |  |  |
| `prefill` | tinyint(1) | YES | 0 |  |  |
| `inline` | tinyint(1) | YES | 0 |  |  |
| `overwrite` | tinyint(1) | YES | 0 |  |  |
| `addlists` | tinyint(1) | YES | 0 |  |  |
| `style` | longtext | YES | NULL |  |  |
| `custom_style` | longtext | YES | NULL |  |  |
| `doubleoptin` | tinyint(1) | YES | 1 |  |  |
| `subject` | longtext | YES | NULL |  |  |
| `headline` | longtext | YES | NULL |  |  |
| `content` | longtext | YES | NULL |  |  |
| `link` | longtext | YES | NULL |  |  |
| `resend` | tinyint(1) | YES | 0 |  |  |
| `resend_count` | int | YES | 2 |  |  |
| `resend_time` | int | YES | 48 |  |  |
| `template` | varchar(191) | NO | NULL |  |  |
| `vcard` | tinyint(1) | YES | 0 |  |  |
| `vcard_content` | longtext | YES | NULL |  |  |
| `confirmredirect` | varchar(2083) | YES | NULL |  |  |
| `redirect` | varchar(2083) | YES | NULL |  |  |
| `added` | int unsigned | YES | NULL |  |  |
| `updated` | int unsigned | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |

---

## wpblog_mailster_forms_lists

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `form_id` | bigint unsigned | NO | NULL | PRI |  |
| `list_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| form_id | form_id | NO | BTREE |
| id | form_id | YES | BTREE |
| id | list_id | YES | BTREE |
| list_id | list_id | NO | BTREE |

---

## wpblog_mailster_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `link` | varchar(2083) | NO | NULL |  |  |
| `i` | tinyint unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |

---

## wpblog_mailster_lists

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint | NO | NULL | PRI | auto_increment |
| `parent_id` | bigint unsigned | NO | NULL |  |  |
| `name` | varchar(191) | NO | NULL | UNI |  |
| `slug` | varchar(191) | NO | NULL | UNI |  |
| `description` | longtext | NO | NULL |  |  |
| `added` | int unsigned | NO | NULL |  |  |
| `updated` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| slug | slug | YES | BTREE |

---

## wpblog_mailster_lists_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `list_id` | bigint unsigned | NO | NULL | PRI |  |
| `subscriber_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | list_id | YES | BTREE |
| id | subscriber_id | YES | BTREE |
| list_id | list_id | NO | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wpblog_mailster_queue

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `subscriber_id` | bigint unsigned | NO | 0 | PRI |  |
| `campaign_id` | bigint unsigned | NO | 0 | PRI |  |
| `requeued` | tinyint unsigned | NO | 0 | PRI |  |
| `added` | int unsigned | NO | 0 |  |  |
| `timestamp` | int unsigned | NO | 0 | MUL |  |
| `sent` | int unsigned | NO | 0 |  |  |
| `priority` | tinyint unsigned | NO | 0 | MUL |  |
| `count` | tinyint unsigned | NO | 0 | MUL |  |
| `error` | tinyint unsigned | NO | 0 | MUL |  |
| `ignore_status` | tinyint unsigned | NO | 0 | MUL |  |
| `options` | varchar(191) | NO | NULL | PRI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| count | count | NO | BTREE |
| error | error | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | requeued | YES | BTREE |
| id | options | YES | BTREE |
| ignore_status | ignore_status | NO | BTREE |
| priority | priority | NO | BTREE |
| requeued | requeued | NO | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |
| timestamp | timestamp | NO | BTREE |

---

## wpblog_mailster_subscriber_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `subscriber_id` | bigint unsigned | NO | NULL | PRI |  |
| `meta_key` | varchar(191) | NO | NULL | PRI |  |
| `meta_value` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | subscriber_id | YES | BTREE |
| id | meta_key | YES | BTREE |
| meta_key | meta_key | NO | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wpblog_mailster_subscriber_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `subscriber_id` | bigint unsigned | NO | NULL | PRI |  |
| `campaign_id` | bigint unsigned | NO | NULL | PRI |  |
| `meta_key` | varchar(191) | NO | NULL | PRI |  |
| `meta_value` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | meta_key | YES | BTREE |
| meta_key | meta_key | NO | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wpblog_mailster_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `hash` | varchar(32) | NO | NULL | UNI |  |
| `email` | varchar(191) | NO | NULL | UNI |  |
| `wp_id` | bigint unsigned | NO | 0 | MUL |  |
| `status` | int unsigned | NO | 0 | MUL |  |
| `added` | int unsigned | NO | 0 |  |  |
| `updated` | int unsigned | NO | 0 |  |  |
| `signup` | int unsigned | NO | 0 |  |  |
| `confirm` | int unsigned | NO | 0 |  |  |
| `ip_signup` | varchar(45) | NO | NULL |  |  |
| `ip_confirm` | varchar(45) | NO | NULL |  |  |
| `rating` | decimal(3,2) unsigned | NO | 0.25 | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| email | email | YES | BTREE |
| hash | hash | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| rating | rating | NO | BTREE |
| status | status | NO | BTREE |
| wp_id | wp_id | NO | BTREE |

---

## wpblog_nextend2_image_storage

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `hash` | varchar(32) | NO | NULL | UNI |  |
| `image` | text | NO | NULL |  |  |
| `value` | mediumtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| hash | hash | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpblog_nextend2_section_storage

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `application` | varchar(20) | NO | NULL | MUL |  |
| `section` | varchar(128) | NO | NULL |  |  |
| `referencekey` | varchar(128) | NO | NULL |  |  |
| `value` | mediumtext | NO | NULL |  |  |
| `system` | int | NO | 0 |  |  |
| `editable` | int | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| application | application | NO | BTREE |
| application | section | NO | BTREE |
| application | referencekey | NO | BTREE |
| application_2 | application | NO | BTREE |
| application_2 | section | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpblog_nextend2_smartslider3_generators

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `group` | varchar(254) | NO | NULL |  |  |
| `type` | varchar(254) | NO | NULL |  |  |
| `params` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_nextend2_smartslider3_sliders

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `alias` | varchar(255) | YES | NULL |  |  |
| `title` | varchar(100) | NO | NULL |  |  |
| `type` | varchar(30) | NO | NULL |  |  |
| `params` | mediumtext | NO | NULL |  |  |
| `time` | datetime | NO | NULL |  |  |
| `thumbnail` | varchar(255) | NO | NULL |  |  |
| `ordering` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_nextend2_smartslider3_sliders_xref

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `group_id` | int | NO | NULL | PRI |  |
| `slider_id` | int | NO | NULL | PRI |  |
| `ordering` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | group_id | YES | BTREE |
| PRIMARY | slider_id | YES | BTREE |

---

## wpblog_nextend2_smartslider3_slides

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `title` | varchar(200) | NO | NULL |  |  |
| `slider` | int | NO | NULL |  |  |
| `publish_up` | datetime | NO | NULL |  |  |
| `publish_down` | datetime | NO | NULL |  |  |
| `published` | tinyint(1) | NO | NULL |  |  |
| `first` | int | NO | NULL |  |  |
| `slide` | longtext | YES | NULL |  |  |
| `description` | text | NO | NULL |  |  |
| `thumbnail` | varchar(255) | NO | NULL |  |  |
| `params` | text | NO | NULL |  |  |
| `ordering` | int | NO | NULL |  |  |
| `generator_id` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_options

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `option_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `option_name` | varchar(191) | YES | NULL | UNI |  |
| `option_value` | longtext | NO | NULL |  |  |
| `autoload` | varchar(20) | NO | yes | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| autoload | autoload | NO | BTREE |
| option_name | option_name | YES | BTREE |
| PRIMARY | option_id | YES | BTREE |

---

## wpblog_origincode_videogallery_galleries

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | NO | NULL |  |  |
| `sl_height` | int unsigned | YES | NULL |  |  |
| `sl_width` | int unsigned | YES | NULL |  |  |
| `pause_on_hover` | text | YES | NULL |  |  |
| `videogallery_list_effects_s` | text | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `param` | text | YES | NULL |  |  |
| `sl_position` | text | NO | NULL |  |  |
| `ordering` | int | NO | NULL |  |  |
| `published` | text | YES | NULL |  |  |
| `origincode_sl_effects` | text | NO | NULL |  |  |
| `display_type` | int | YES | 2 |  |  |
| `content_per_page` | int | YES | 5 |  |  |
| `autoslide` | varchar(3) | YES | on |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpblog_origincode_videoorigincode_gallery_videos

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(100) | YES | NULL |  |  |
| `videogallery_id` | varchar(200) | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `image_url` | text | YES | NULL |  |  |
| `sl_url` | varchar(128) | YES | NULL |  |  |
| `sl_type` | text | NO | NULL |  |  |
| `link_target` | text | NO | NULL |  |  |
| `ordering` | int | NO | NULL |  |  |
| `published` | tinyint unsigned | YES | NULL |  |  |
| `published_in_sl_width` | tinyint unsigned | YES | NULL |  |  |
| `thumb_url` | text | YES | NULL |  |  |
| `show_controls` | varchar(3) | YES | on |  |  |
| `show_info` | varchar(3) | YES | on |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpblog_postmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| post_id | post_id | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wpblog_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_author` | bigint unsigned | NO | 0 | MUL |  |
| `post_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_date_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_content` | longtext | NO | NULL |  |  |
| `post_title` | mediumtext | NO | NULL |  |  |
| `post_excerpt` | mediumtext | NO | NULL |  |  |
| `post_status` | varchar(20) | NO | publish |  |  |
| `comment_status` | varchar(20) | NO | open |  |  |
| `ping_status` | varchar(20) | NO | open |  |  |
| `post_password` | varchar(255) | NO | NULL |  |  |
| `post_name` | varchar(200) | NO | NULL | MUL |  |
| `to_ping` | mediumtext | NO | NULL |  |  |
| `pinged` | mediumtext | NO | NULL |  |  |
| `post_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_modified_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_content_filtered` | longtext | NO | NULL |  |  |
| `post_parent` | bigint unsigned | NO | 0 | MUL |  |
| `guid` | varchar(255) | NO | NULL |  |  |
| `menu_order` | int | NO | 0 |  |  |
| `post_type` | varchar(20) | NO | post | MUL |  |
| `post_mime_type` | varchar(100) | NO | NULL |  |  |
| `comment_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| post_author | post_author | NO | BTREE |
| post_name | post_name | NO | BTREE |
| post_parent | post_parent | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| type_status_date | post_type | NO | BTREE |
| type_status_date | post_status | NO | BTREE |
| type_status_date | post_date | NO | BTREE |
| type_status_date | ID | NO | BTREE |

---

## wpblog_push_encryption_keys

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `token_id` | bigint unsigned | NO | NULL |  |  |
| `user_public_key` | varchar(88) | NO | NULL |  |  |
| `user_auth_token` | varchar(24) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_push_excluded_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `user_id` | bigint unsigned | NO | NULL | PRI |  |
| `category_id` | bigint unsigned | NO | NULL | PRI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | user_id | YES | BTREE |
| PRIMARY | category_id | YES | BTREE |

---

## wpblog_push_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `type` | int unsigned | NO | NULL |  |  |
| `text` | text | YES | NULL |  |  |
| `timestamp` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_push_notifications

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `notification` | text | YES | NULL |  |  |
| `hits` | int | YES | 0 |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_push_sent

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `user_id` | bigint unsigned | NO | NULL | PRI |  |
| `post_id` | bigint unsigned | NO | NULL | PRI |  |
| `timestamp` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | user_id | YES | BTREE |
| PRIMARY | post_id | YES | BTREE |

---

## wpblog_push_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `gcm_regid` | text | YES | NULL |  |  |
| `notifications` | text | YES | NULL |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_push_tokens

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `token` | varchar(1000) | YES | NULL |  |  |
| `os` | varchar(50) | YES | NULL |  |  |
| `lang` | varchar(2) | YES | NULL |  |  |
| `timestamp` | datetime | NO | NULL |  |  |
| `user_id` | bigint unsigned | YES | NULL |  |  |
| `active` | tinyint(1) | YES | NULL |  |  |
| `activation_code` | varchar(40) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_push_viewed

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `user_id` | bigint unsigned | NO | NULL | PRI |  |
| `post_id` | bigint unsigned | NO | NULL | PRI |  |
| `timestamp` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | user_id | YES | BTREE |
| PRIMARY | post_id | YES | BTREE |

---

## wpblog_responsive_video_gallery_plus_responsive_lightbox

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `vtype` | varchar(50) | NO | NULL |  |  |
| `vid` | varchar(500) | NO | NULL |  |  |
| `video_url` | varchar(1000) | YES | NULL |  |  |
| `embed_url` | varchar(300) | NO | NULL |  |  |
| `HdnMediaSelection` | varchar(500) | NO | NULL |  |  |
| `image_name` | varchar(500) | NO | NULL |  |  |
| `videotitle` | varchar(1000) | NO | NULL |  |  |
| `videotitleurl` | varchar(1000) | YES | NULL |  |  |
| `video_description` | text | YES | NULL |  |  |
| `video_order` | int | NO | 0 |  |  |
| `open_link_in` | tinyint(1) | NO | 1 |  |  |
| `enable_light_box_video_desc` | tinyint(1) | NO | 1 |  |  |
| `createdon` | datetime | NO | NULL |  |  |
| `slider_id` | int unsigned | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_photo_slider_instal

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `SL_Img_Title` | varchar(255) | NO | NULL |  |  |
| `Sl_Img_Description` | longtext | NO | NULL |  |  |
| `Sl_Img_Url` | varchar(255) | NO | NULL |  |  |
| `Sl_Link_Url` | varchar(255) | NO | NULL |  |  |
| `Sl_Link_NewTab` | varchar(255) | NO | NULL |  |  |
| `Sl_Number` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_photo_slider_instal_video

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Sl_Video_Url` | varchar(255) | NO | NULL |  |  |
| `Sl_Number` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_photo_slider_manager

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Slider_Title` | varchar(255) | NO | NULL |  |  |
| `Slider_Type` | varchar(255) | NO | NULL |  |  |
| `Slider_IMGS_Quantity` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_slider_effect4

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `rich_web_slider_ID` | varchar(255) | NO | NULL |  |  |
| `rich_web_slider_name` | varchar(255) | NO | NULL |  |  |
| `rich_web_slider_type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_W` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_H` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_BxSShow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_BxSType` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_BxS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_BxC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_TDABgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_TDAPos` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_LBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_TFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_TFF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_TCC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_TC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_ArBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_ArBR` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_ArType` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_ArHBC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_ArHBR` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_ArText` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_ArLeft` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_ArRight` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_ArTextC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_ArTextFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_Sl_CT_ArTextFF` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_slider_effect9

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `rich_web_slider_ID` | varchar(255) | NO | NULL |  |  |
| `rich_web_slider_name` | varchar(255) | NO | NULL |  |  |
| `rich_web_slider_type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_W` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_H` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_BSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_BShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Img_W` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Img_BSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Img_BShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Title_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Title_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Title_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Title_TSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Title_TShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Title_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Link_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Link_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Link_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Link_TSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Link_TShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Link_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_AcSL_Link_Text` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_slider_effects_data

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `slider_name` | varchar(255) | NO | NULL |  |  |
| `slider_type` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_slider_font_family

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Font_family` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_slider_id

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Slider_ID` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_video_slider_effects_data

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `slider_vid_name` | varchar(255) | NO | NULL |  |  |
| `slider_Vid_type` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_video_slider_font_family

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Font_family` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_video_slider_id

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Slider_ID` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_video_slider_manager

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Slider_Title` | varchar(255) | NO | NULL |  |  |
| `Slider_Type` | varchar(255) | NO | NULL |  |  |
| `Slider_Video_Quantity` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_video_slider_videos

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Rich_Web_VSlider_Vid_Title` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Add_Desc` | longtext | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Img` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Vid` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Src` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Link` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_ONT` | varchar(255) | NO | NULL |  |  |
| `Slider_ID` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_1

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Name` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_CE` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_EE` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_BlC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_BlR` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_AS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_PT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_SS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_AP` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_HP` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_RS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_BSC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_BR` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_CN` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_NPB` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_NO` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_NT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_NT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_AT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_CapS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_CapEs` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_CapO` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_CapE` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_TFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_TFF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_TBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_TC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_DFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_DFF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_DBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_DC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_TiT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_TiBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CS_TiC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_TiO` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_TiD` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_TiP` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_TiS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_TiBS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_TiBC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_TiBSt` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_CP_TiPos` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SL_Width` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SL_Height` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TitDesc_Type` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_10

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Name` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_GO_NS1_Width` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_GO_NS1_Height` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_GO_NS1_Autoplay` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_GO_NS1_PTime` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_GO_NS1_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_GO_NS1_BType` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_GO_NS1_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_GO_NS1_BSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_GO_NS1_BSh_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_GO_NS1_BSh_Col` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TO_NS1_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TO_NS1_FSize` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TO_NS1_FFamily` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TO_NS1_Col` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TO_NS1_Num_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TO_NS1_Num_FSize` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TO_NS1_Num_FFamily` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TO_NS1_Num_Col` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_PO_NS1_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_PO_NS1_Width` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_PO_NS1_Height` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_PO_NS1_PB` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_PO_NS1_Col` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_PO_NS1_Cur_Col` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_IO_NS1_FSize` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_IO_NS1_Col` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_PO_NS1_Hov_Col` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_IO_NS1_Cur_Col` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_IO_NS1_BgCol` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_IO_NS1_Icon_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_DO_NS1_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_DO_NS1_FSize` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_DO_NS1_FFamily` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_DO_NS1_Col` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_PIO_NS1_BgCol` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_PIO_NS1_Col` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_PIO_NS1_HovBgCol` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_PIO_NS1_HovCol` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_IO_NS1_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_IO_NS1_HovBgCol` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_IO_NS1_Arrow_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_IO_NS1_Width` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_IO_NS1_Height` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_IO_NS1_Image_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_GO_NS1_Align` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_10_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_1_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_2

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Name` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_ED` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_AP` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_Eff` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_W` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_H` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_TShow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_TFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_TFF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_TC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_TBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_TPos` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_NShow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_NC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_NBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_NS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_NPos` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PagShow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PagW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PagH` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PagPB` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PagBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PagBW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PagBS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PagBC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PagBR` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PagHC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PagCC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PagPos` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PIBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PIC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PIHBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_PIHC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_CIBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_CIC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_CIHBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_SS_CIHC` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_2_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_3

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Name` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_W` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_H` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_BoxShShow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_BoxShType` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_BoxSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_BoxShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_IBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_IBW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_IBS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_IBC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_IBR` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TPos` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TBW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TBS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TBC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TIH` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TIPB` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TIBW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TIBS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TIBC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TIBR` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TIBoxShShow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TIBoxShType` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TIBoxSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TIBoxShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TICBC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TICBS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TICBoxShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TIHBC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TIHBS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_TIHBoxShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_CS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_PT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_AP` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_PIBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_PIC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_PIHBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_TS_PIHC` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_3_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_4

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Name` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Car_Bg_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Car_Border_Width` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Car_Border_Style` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Car_Border_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Car_Box_Shadow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Car_Shadow_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Car_Count_Imgs` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Car_Imgs_Hover_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Car_PBImgs` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Car_Icons_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Car_Icons_Size` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Overlay_Bg_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Popup_Bg_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Popup_Border_Width` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Popup_Border_Style` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Popup_Border_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Popup_Box_Shadow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Popup_Shadow_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Title_Font_Size` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Title_Font_Family` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Title_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Title_Text_Align` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Desc_Bg_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Desc_Font_Size` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Desc_Font_Family` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Desc_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Desc_Text_Align` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Link_Font_Size` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Link_Font_Family` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Link_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Link_Bg_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Link_Border_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Link_Border_Width` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Link_Border_Style` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Link_Hov_Bg_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Link_Hov_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Link_Hov_Border_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Popup_Icons_Size` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Popup_Icons_Color` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Popup_Icons_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Link_Text` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VC_Link_Border_Radius` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_4_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_5

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Name` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_W` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_PT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_CS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_BoxShShow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_BoxShType` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_BoxSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_BoxShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Nav_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Nav_W` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Nav_H` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Nav_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Nav_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Nav_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Nav_BR` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Nav_PB` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Nav_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Nav_CC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Nav_HC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Nav_Pos` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_T_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_TBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_TC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_TFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_TFF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_D_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_DC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_DFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_DFF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_LC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_LFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_LFF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_LHC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Arr_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Arr_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Arr_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Arr_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Arr_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Arr_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Arr_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Arr_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Arr_BR` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_PIC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_PIBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_PIBR` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_PIHC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_PIHBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_Eff` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_LText` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SVS_AP` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_5_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_6

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Name` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_AP` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_APS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_APEff` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_CS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_PT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_ArrSt` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_H` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_BoxShShow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_BoxShType` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_BoxSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_BoxShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_TShow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_TFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_TFF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_TC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_TBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_TPos` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_Th_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_Th_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_Th_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_Th_BR` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_Th_HBC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_LC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_LBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_LFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_LHC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_LHBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_LPos` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_LType` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_PC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_PBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_PFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_PHC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_PHBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_PPos` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_PType` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_ArrShow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_ArrType` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_ArrFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_ArrPos` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VTVS_ArrC` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_6_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_7

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Name` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Loop` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Cols` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Speed` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_AP` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_EH` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_PB` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Car` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_NP_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_NP_NText` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_NP_PText` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_NP_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_NP_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_NP_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_NP_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_NP_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_NP_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_NP_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_NP_BR` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_NP_HC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_NP_HBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Cols_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Cols_BoxShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Cols_VSEff` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Cols_StShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Cols_VHEff` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Cols_HShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_TC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_TFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_TFF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_DShow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_DC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_DFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_DFF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_LText` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_LC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_LFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_LFF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_LHC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_PText` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_PBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_PC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_PFS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_PFF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_PHC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_PHBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Pop_OvC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Pop_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Pop_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Pop_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Pop_BoxShShow` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Pop_BoxShType` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Pop_BoxSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Pop_BoxShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Pop_CIType` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Pop_CIS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_HPS_Pop_CIC` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_7_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_8

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Name` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_Sh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_ShT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_ShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NI_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NI_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NI_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NI_HBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NI_HBC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NI_CBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NI_CBC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_ND_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_ND_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NImg_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NImg_BR` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NImg_BSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NImg_ShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NImg_ShT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NScroll_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NScroll_HBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NScroll_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_IT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_IT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_ID_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_ID_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_PlIc_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_PlIc_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_PlIc_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_PlIc_HBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_DelIc_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_DelIc_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_DelIc_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_DelIc_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_DelIc_HBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_ND_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_IT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_ID_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NT_HC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_NT_CC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_ND_HC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RVVS_ND_CC` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_8_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_9

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Name` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Option_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_W` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_SSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_SShChT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_BSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_ShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_ShT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_Type` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_Autoplay` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_N_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_N_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_N_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_NI_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_NI_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_NI_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_NI_HC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_NI_CC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_NIC_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_Img_BW` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_Img_BS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_Img_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_Img_BSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_Img_ShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_Img_ShT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_T_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_T_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_T_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_T_TA` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_T_TSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_T_TShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_D_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_D_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_D_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_D_TA` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_D_TSh` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_D_TShC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_Ic_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_Ic_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_Ic_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_startAt` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_Sl1EfT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_NI_CCC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_PlIc_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_PlIc_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_PlIc_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_PlIc_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_PlIc_HBgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_MS_PlIc_HC` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_rich_web_vs_effect_9_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_sib_model_forms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `title` | varchar(120) | YES | NULL |  |  |
| `html` | longtext | YES | NULL |  |  |
| `css` | longtext | YES | NULL |  |  |
| `dependTheme` | int | NO | 1 |  |  |
| `listID` | longtext | YES | NULL |  |  |
| `templateID` | int | NO | -1 |  |  |
| `confirmID` | int | NO | -1 |  |  |
| `isDopt` | int | NO | 0 |  |  |
| `isOpt` | int | NO | 0 |  |  |
| `redirectInEmail` | varchar(255) | YES | NULL |  |  |
| `redirectInForm` | varchar(255) | YES | NULL |  |  |
| `successMsg` | varchar(255) | YES | NULL |  |  |
| `errorMsg` | varchar(255) | YES | NULL |  |  |
| `existMsg` | varchar(255) | YES | NULL |  |  |
| `invalidMsg` | varchar(255) | YES | NULL |  |  |
| `requiredMsg` | varchar(255) | YES | NULL |  |  |
| `attributes` | varchar(255) | YES | NULL |  |  |
| `date` | date | NO | NULL |  |  |
| `isDefault` | int | NO | 0 |  |  |
| `gCaptcha` | int | NO | 0 |  |  |
| `gCaptcha_secret` | varchar(255) | YES | NULL |  |  |
| `gCaptcha_site` | varchar(255) | YES | NULL |  |  |
| `termAccept` | int | NO | 0 |  |  |
| `termsURL` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_sib_model_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `email` | varchar(255) | YES | NULL |  |  |
| `code` | varchar(100) | YES | NULL |  |  |
| `listIDs` | longtext | YES | NULL |  |  |
| `redirectUrl` | varchar(255) | YES | NULL |  |  |
| `info` | text | YES | NULL |  |  |
| `frmid` | int | YES | NULL |  |  |
| `user_added_date` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_term_relationships

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `object_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_taxonomy_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_order` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | object_id | YES | BTREE |
| PRIMARY | term_taxonomy_id | YES | BTREE |
| term_taxonomy_id | term_taxonomy_id | NO | BTREE |

---

## wpblog_term_taxonomy

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_taxonomy_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `taxonomy` | varchar(32) | NO | NULL | MUL |  |
| `description` | longtext | NO | NULL |  |  |
| `parent` | bigint unsigned | NO | 0 |  |  |
| `count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | term_taxonomy_id | YES | BTREE |
| taxonomy | taxonomy | NO | BTREE |
| term_id_taxonomy | term_id | YES | BTREE |
| term_id_taxonomy | taxonomy | YES | BTREE |

---

## wpblog_termmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |
| term_id | term_id | NO | BTREE |

---

## wpblog_terms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | NO | NULL | MUL |  |
| `slug` | varchar(200) | NO | NULL | MUL |  |
| `term_group` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | NO | BTREE |
| PRIMARY | term_id | YES | BTREE |
| slug | slug | NO | BTREE |

---

## wpblog_totalsoft_galleryv_dbt

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `TotalSoftGalleryV_SetName` | varchar(255) | NO | NULL |  |  |
| `TotalSoftGalleryV_SetType` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_totalsoft_galleryv_id

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `GalleryV_ID` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_totalsoft_galleryv_manager

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `TotalSoftGallery_Video_Gallery_Title` | varchar(255) | NO | NULL |  |  |
| `TotalSoftGallery_Video_Option` | varchar(255) | NO | NULL |  |  |
| `TotalSoftGallery_Video_ShowType` | varchar(255) | NO | NULL |  |  |
| `TotalSoftGallery_Video_PerPage` | varchar(255) | NO | NULL |  |  |
| `TotalSoftGallery_LoadMore` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_totalsoft_galleryv_videos

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `TotalSoftGallery_Video_VT` | varchar(255) | NO | NULL |  |  |
| `TotalSoftGallery_Video_VDesc` | longtext | NO | NULL |  |  |
| `TotalSoftGallery_Video_VLink` | varchar(255) | NO | NULL |  |  |
| `TotalSoftGallery_Video_VONT` | varchar(255) | NO | NULL |  |  |
| `TotalSoftGallery_Video_VURL` | varchar(255) | NO | NULL |  |  |
| `TotalSoftGallery_Video_IURL` | varchar(255) | NO | NULL |  |  |
| `TotalSoftGallery_Video_Video` | varchar(255) | NO | NULL |  |  |
| `GalleryV_ID` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_totalsoft_new_plugin

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `New_Plugin_Name` | varchar(255) | NO | NULL |  |  |
| `Our_Plugin_Name` | varchar(255) | NO | NULL |  |  |
| `Dismiss` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_usermeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `umeta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | umeta_id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## wpblog_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_login` | varchar(60) | NO | NULL | MUL |  |
| `user_pass` | varchar(255) | NO | NULL |  |  |
| `user_nicename` | varchar(50) | NO | NULL | MUL |  |
| `user_email` | varchar(100) | NO | NULL | MUL |  |
| `user_url` | varchar(100) | NO | NULL |  |  |
| `user_registered` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `user_activation_key` | varchar(255) | NO | NULL |  |  |
| `user_status` | int | NO | 0 |  |  |
| `display_name` | varchar(250) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |
| user_email | user_email | NO | BTREE |
| user_login_key | user_login | NO | BTREE |
| user_nicename | user_nicename | NO | BTREE |

---

## wpblog_wonderplugin_carousel

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `name` | tinytext | NO | NULL |  |  |
| `data` | mediumtext | NO | NULL |  |  |
| `time` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `authorid` | tinytext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_wonderplugin_slider

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `name` | tinytext | NO | NULL |  |  |
| `data` | mediumtext | NO | NULL |  |  |
| `time` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `authorid` | tinytext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_wpforo_accesses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `accessid` | int unsigned | NO | NULL | PRI | auto_increment |
| `access` | varchar(255) | NO | NULL | UNI |  |
| `title` | varchar(255) | NO | NULL |  |  |
| `cans` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| access | access | YES | BTREE |
| PRIMARY | accessid | YES | BTREE |

---

## wpblog_wpforo_activity

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `type` | varchar(60) | NO | NULL | MUL |  |
| `itemid` | bigint unsigned | NO | NULL |  |  |
| `itemtype` | varchar(60) | NO | NULL | MUL |  |
| `itemid_second` | bigint unsigned | NO | 0 |  |  |
| `userid` | bigint unsigned | NO | 0 |  |  |
| `name` | varchar(60) | NO | NULL |  |  |
| `email` | varchar(70) | NO | NULL |  |  |
| `date` | int unsigned | NO | 0 | MUL |  |
| `content` | text | YES | NULL |  |  |
| `permalink` | varchar(255) | NO | NULL |  |  |
| `new` | tinyint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| date | date | NO | BTREE |
| itemtype_userid_new | itemtype | NO | BTREE |
| itemtype_userid_new | userid | NO | BTREE |
| itemtype_userid_new | new | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| type | type | NO | BTREE |
| type_objid_objtype | type | NO | BTREE |
| type_objid_objtype | itemid | NO | BTREE |
| type_objid_objtype | itemtype | NO | BTREE |
| type_objid_objtype_userid | type | NO | BTREE |
| type_objid_objtype_userid | itemid | NO | BTREE |
| type_objid_objtype_userid | itemtype | NO | BTREE |
| type_objid_objtype_userid | userid | NO | BTREE |

---

## wpblog_wpforo_forums

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `forumid` | int unsigned | NO | NULL | PRI | auto_increment |
| `title` | varchar(255) | NO | NULL |  |  |
| `slug` | varchar(255) | NO | NULL | UNI |  |
| `description` | longtext | YES | NULL |  |  |
| `parentid` | int unsigned | NO | 0 | MUL |  |
| `icon` | varchar(255) | YES | NULL |  |  |
| `last_topicid` | int unsigned | NO | 0 |  |  |
| `last_postid` | int unsigned | NO | 0 | MUL |  |
| `last_userid` | int unsigned | NO | 0 |  |  |
| `last_post_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `topics` | int | NO | 0 |  |  |
| `posts` | int | NO | 0 |  |  |
| `permissions` | text | YES | NULL |  |  |
| `meta_key` | text | YES | NULL |  |  |
| `meta_desc` | text | YES | NULL |  |  |
| `status` | tinyint unsigned | NO | 0 | MUL |  |
| `is_cat` | tinyint unsigned | NO | 0 | MUL |  |
| `cat_layout` | tinyint unsigned | NO | 0 |  |  |
| `order` | int unsigned | NO | 0 | MUL |  |
| `color` | varchar(7) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| is_cat | is_cat | NO | BTREE |
| last_postid | last_postid | NO | BTREE |
| order | order | NO | BTREE |
| parentid | parentid | NO | BTREE |
| PRIMARY | forumid | YES | BTREE |
| status | status | NO | BTREE |
| UNIQUE SLUG | slug | YES | BTREE |

---

## wpblog_wpforo_languages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `langid` | int unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(255) | NO | NULL | UNI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | langid | YES | BTREE |
| UNIQUE language name | name | YES | BTREE |

---

## wpblog_wpforo_likes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `likeid` | int unsigned | NO | NULL | PRI | auto_increment |
| `userid` | int unsigned | NO | NULL | MUL |  |
| `postid` | int unsigned | NO | NULL |  |  |
| `post_userid` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | likeid | YES | BTREE |
| userid | userid | YES | BTREE |
| userid | postid | YES | BTREE |
| userid_2 | userid | YES | BTREE |
| userid_2 | postid | YES | BTREE |

---

## wpblog_wpforo_phrases

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `phraseid` | int unsigned | NO | NULL | PRI | auto_increment |
| `langid` | int unsigned | NO | NULL | MUL |  |
| `phrase_key` | text | YES | NULL | MUL |  |
| `phrase_value` | text | NO | NULL |  |  |
| `package` | varchar(255) | NO | wpforo |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| langid | langid | NO | BTREE |
| lng_and_key_uniq | langid | YES | BTREE |
| lng_and_key_uniq | phrase_key | YES | BTREE |
| phrase_key | phrase_key | NO | BTREE |
| PRIMARY | phraseid | YES | BTREE |

---

## wpblog_wpforo_post_revisions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `revisionid` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `userid` | bigint unsigned | NO | 0 | MUL |  |
| `textareaid` | varchar(50) | NO | NULL |  |  |
| `postid` | bigint unsigned | NO | 0 |  |  |
| `body` | longtext | YES | NULL |  |  |
| `created` | int unsigned | NO | 0 |  |  |
| `version` | smallint | NO | 0 |  |  |
| `email` | varchar(50) | NO | NULL |  |  |
| `url` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | revisionid | YES | BTREE |
| userid_textareaid_postid_email | userid | NO | BTREE |
| userid_textareaid_postid_email | textareaid | NO | BTREE |
| userid_textareaid_postid_email | postid | NO | BTREE |
| userid_textareaid_postid_email | email | NO | BTREE |
| userid_textareaid_postid_email | url | NO | BTREE |

---

## wpblog_wpforo_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `postid` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `parentid` | bigint unsigned | NO | 0 | MUL |  |
| `forumid` | int unsigned | NO | NULL | MUL |  |
| `topicid` | bigint unsigned | NO | NULL | MUL |  |
| `userid` | int unsigned | NO | NULL | MUL |  |
| `title` | varchar(255) | YES | NULL | MUL |  |
| `body` | longtext | YES | NULL | MUL |  |
| `created` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `likes` | int unsigned | NO | 0 |  |  |
| `votes` | int | NO | 0 |  |  |
| `is_answer` | tinyint unsigned | NO | 0 | MUL |  |
| `is_first_post` | tinyint unsigned | NO | 0 | MUL |  |
| `status` | tinyint unsigned | NO | 0 | MUL |  |
| `name` | varchar(50) | NO | NULL |  |  |
| `email` | varchar(50) | NO | NULL | MUL |  |
| `private` | tinyint unsigned | NO | 0 | MUL |  |
| `root` | bigint | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| body | body | NO | FULLTEXT |
| created | created | NO | BTREE |
| email | email | NO | BTREE |
| forumid | forumid | NO | BTREE |
| forumid_status | forumid | NO | BTREE |
| forumid_status | status | NO | BTREE |
| forumid_status_private | forumid | NO | BTREE |
| forumid_status_private | status | NO | BTREE |
| forumid_status_private | private | NO | BTREE |
| is_answer | is_answer | NO | BTREE |
| is_first_post | is_first_post | NO | BTREE |
| is_private | private | NO | BTREE |
| parentid | parentid | NO | BTREE |
| PRIMARY | postid | YES | BTREE |
| root | root | NO | BTREE |
| status | status | NO | BTREE |
| title | title | NO | FULLTEXT |
| title_plus_body | title | NO | FULLTEXT |
| title_plus_body | body | NO | FULLTEXT |
| topicid | topicid | NO | BTREE |
| topicid_parentid | topicid | NO | BTREE |
| topicid_parentid | parentid | NO | BTREE |
| topicid_solved | topicid | NO | BTREE |
| topicid_solved | is_answer | NO | BTREE |
| topicid_status | topicid | NO | BTREE |
| topicid_status | status | NO | BTREE |
| userid | userid | NO | BTREE |

---

## wpblog_wpforo_profiles

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `userid` | int unsigned | NO | NULL | PRI |  |
| `title` | varchar(255) | NO | member |  |  |
| `username` | varchar(255) | NO | NULL |  |  |
| `groupid` | int unsigned | NO | NULL | MUL |  |
| `posts` | int | NO | 0 | MUL |  |
| `questions` | int | NO | 0 |  |  |
| `answers` | int | NO | 0 |  |  |
| `comments` | int | NO | 0 |  |  |
| `site` | varchar(255) | YES | NULL |  |  |
| `icq` | varchar(255) | YES | NULL |  |  |
| `aim` | varchar(255) | YES | NULL |  |  |
| `yahoo` | varchar(255) | YES | NULL |  |  |
| `msn` | varchar(255) | YES | NULL |  |  |
| `facebook` | varchar(255) | YES | NULL |  |  |
| `twitter` | varchar(255) | YES | NULL |  |  |
| `gtalk` | varchar(255) | YES | NULL |  |  |
| `skype` | varchar(255) | YES | NULL |  |  |
| `avatar` | varchar(255) | YES | NULL |  |  |
| `signature` | text | YES | NULL |  |  |
| `about` | text | YES | NULL |  |  |
| `occupation` | text | YES | NULL |  |  |
| `location` | varchar(255) | YES | NULL |  |  |
| `last_login` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `online_time` | int unsigned | YES | NULL | MUL |  |
| `rank` | int unsigned | NO | 0 |  |  |
| `like` | int unsigned | NO | 0 |  |  |
| `status` | varchar(8) | YES | active | MUL |  |
| `timezone` | varchar(255) | YES | NULL |  |  |
| `is_email_confirmed` | tinyint(1) | NO | 0 | MUL |  |
| `secondary_groups` | varchar(255) | YES | NULL |  |  |
| `fields` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| groupid | groupid | NO | BTREE |
| is_email_confirmed | is_email_confirmed | NO | BTREE |
| online_time | online_time | NO | BTREE |
| posts | posts | NO | BTREE |
| PRIMARY | userid | YES | BTREE |
| status | status | NO | BTREE |

---

## wpblog_wpforo_subscribes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `subid` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `itemid` | bigint unsigned | NO | NULL | MUL |  |
| `type` | varchar(50) | NO | NULL |  |  |
| `confirmkey` | varchar(32) | NO | NULL | UNI |  |
| `userid` | bigint unsigned | NO | NULL | MUL |  |
| `active` | tinyint unsigned | NO | 0 |  |  |
| `user_name` | varchar(60) | NO | NULL |  |  |
| `user_email` | varchar(60) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| confirmkey | confirmkey | YES | BTREE |
| fld_group_unq | itemid | YES | BTREE |
| fld_group_unq | type | YES | BTREE |
| fld_group_unq | userid | YES | BTREE |
| fld_group_unq | user_email | YES | BTREE |
| itemid_2 | itemid | NO | BTREE |
| PRIMARY | subid | YES | BTREE |
| userid | userid | NO | BTREE |

---

## wpblog_wpforo_tags

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `tagid` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `tag` | varchar(255) | NO | NULL | UNI |  |
| `prefix` | tinyint unsigned | NO | 0 | MUL |  |
| `count` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| prefix | prefix | NO | BTREE |
| PRIMARY | tagid | YES | BTREE |
| tag | tag | YES | BTREE |

---

## wpblog_wpforo_topics

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `topicid` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `forumid` | int unsigned | NO | NULL | MUL |  |
| `first_postid` | bigint unsigned | NO | 0 | MUL |  |
| `userid` | int unsigned | NO | NULL | MUL |  |
| `title` | varchar(255) | NO | NULL | MUL |  |
| `slug` | varchar(255) | NO | NULL | MUL |  |
| `created` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `modified` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `last_post` | bigint unsigned | NO | 0 | MUL |  |
| `posts` | int | NO | 0 |  |  |
| `votes` | int | NO | 0 |  |  |
| `answers` | int | NO | 0 |  |  |
| `views` | int unsigned | NO | 0 |  |  |
| `meta_key` | text | YES | NULL |  |  |
| `meta_desc` | text | YES | NULL |  |  |
| `type` | tinyint | NO | 0 | MUL |  |
| `solved` | tinyint(1) | NO | 0 | MUL |  |
| `closed` | tinyint unsigned | NO | 0 |  |  |
| `has_attach` | tinyint unsigned | NO | 0 |  |  |
| `private` | tinyint unsigned | NO | 0 | MUL |  |
| `status` | tinyint unsigned | NO | 0 | MUL |  |
| `name` | varchar(50) | NO | NULL |  |  |
| `email` | varchar(50) | NO | NULL | MUL |  |
| `prefix` | varchar(100) | NO | NULL | MUL |  |
| `tags` | text | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| created | created | NO | BTREE |
| email | email | NO | BTREE |
| first_postid | first_postid | NO | BTREE |
| forumid | forumid | NO | BTREE |
| forumid_status | forumid | NO | BTREE |
| forumid_status | status | NO | BTREE |
| forumid_status_private | forumid | NO | BTREE |
| forumid_status_private | status | NO | BTREE |
| forumid_status_private | private | NO | BTREE |
| is_private | private | NO | BTREE |
| last_post | last_post | NO | BTREE |
| modified | modified | NO | BTREE |
| own_private | userid | NO | BTREE |
| own_private | private | NO | BTREE |
| prefix | prefix | NO | BTREE |
| PRIMARY | topicid | YES | BTREE |
| slug | slug | NO | BTREE |
| solved | solved | NO | BTREE |
| status | status | NO | BTREE |
| tags | tags | NO | BTREE |
| title | title | NO | FULLTEXT |
| type | type | NO | BTREE |

---

## wpblog_wpforo_usergroups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `groupid` | int unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(255) | NO | NULL | UNI |  |
| `cans` | longtext | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `utitle` | varchar(100) | NO | NULL |  |  |
| `role` | varchar(50) | NO | NULL |  |  |
| `access` | varchar(50) | NO | NULL |  |  |
| `color` | varchar(7) | NO | NULL |  |  |
| `visible` | tinyint unsigned | NO | 1 | MUL |  |
| `secondary` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | groupid | YES | BTREE |
| UNIQUE_GROUP_NAME | name | YES | BTREE |
| visible | visible | NO | BTREE |

---

## wpblog_wpforo_views

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `vid` | int unsigned | NO | NULL | PRI | auto_increment |
| `userid` | int unsigned | NO | NULL | MUL |  |
| `topicid` | int unsigned | NO | NULL | MUL |  |
| `created` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | vid | YES | BTREE |
| topicid | topicid | NO | BTREE |
| user_topic | userid | NO | BTREE |
| user_topic | topicid | NO | BTREE |
| userid | userid | NO | BTREE |
| userid_2 | userid | YES | BTREE |
| userid_2 | topicid | YES | BTREE |

---

## wpblog_wpforo_visits

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `userid` | bigint unsigned | NO | NULL | MUL |  |
| `name` | varchar(60) | NO | NULL |  |  |
| `ip` | varchar(60) | NO | NULL | MUL |  |
| `time` | int unsigned | NO | NULL | MUL |  |
| `forumid` | int unsigned | NO | NULL | MUL |  |
| `topicid` | bigint unsigned | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| forumid | forumid | NO | BTREE |
| ip | ip | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| time | time | NO | BTREE |
| time_forumid | time | NO | BTREE |
| time_forumid | forumid | NO | BTREE |
| time_topicid | time | NO | BTREE |
| time_topicid | topicid | NO | BTREE |
| topicid | topicid | NO | BTREE |
| unique_tracking | userid | YES | BTREE |
| unique_tracking | ip | YES | BTREE |
| unique_tracking | forumid | YES | BTREE |
| unique_tracking | topicid | YES | BTREE |
| userid | userid | NO | BTREE |

---

## wpblog_wpforo_votes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `voteid` | int unsigned | NO | NULL | PRI | auto_increment |
| `userid` | int unsigned | NO | NULL | MUL |  |
| `postid` | int unsigned | NO | NULL |  |  |
| `reaction` | tinyint | NO | 1 |  |  |
| `post_userid` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | voteid | YES | BTREE |
| unique_vote | userid | YES | BTREE |
| unique_vote | postid | YES | BTREE |
| unique_vote | reaction | YES | BTREE |

---

## wpblog_wpuf_transaction

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | mediumint | NO | NULL | PRI | auto_increment |
| `user_id` | bigint | YES | NULL |  |  |
| `status` | varchar(255) | NO | pending_payment |  |  |
| `cost` | varchar(255) | YES | NULL |  |  |
| `post_id` | varchar(20) | YES | NULL |  |  |
| `pack_id` | bigint | YES | NULL |  |  |
| `payer_first_name` | longtext | YES | NULL |  |  |
| `payer_last_name` | longtext | YES | NULL |  |  |
| `payer_email` | longtext | YES | NULL |  |  |
| `payment_type` | longtext | YES | NULL |  |  |
| `payer_address` | longtext | YES | NULL |  |  |
| `transaction_id` | longtext | YES | NULL |  |  |
| `created` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpblog_yoast_indexable

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `permalink` | longtext | YES | NULL |  |  |
| `permalink_hash` | varchar(40) | YES | NULL | MUL |  |
| `object_id` | bigint | YES | NULL | MUL |  |
| `object_type` | varchar(32) | NO | NULL | MUL |  |
| `object_sub_type` | varchar(32) | YES | NULL |  |  |
| `author_id` | bigint | YES | NULL |  |  |
| `post_parent` | bigint | YES | NULL | MUL |  |
| `title` | text | YES | NULL |  |  |
| `description` | mediumtext | YES | NULL |  |  |
| `breadcrumb_title` | text | YES | NULL |  |  |
| `post_status` | varchar(20) | YES | NULL |  |  |
| `is_public` | tinyint(1) | YES | NULL |  |  |
| `is_protected` | tinyint(1) | YES | 0 |  |  |
| `has_public_posts` | tinyint(1) | YES | NULL |  |  |
| `number_of_pages` | int unsigned | YES | NULL |  |  |
| `canonical` | longtext | YES | NULL |  |  |
| `primary_focus_keyword` | varchar(191) | YES | NULL |  |  |
| `primary_focus_keyword_score` | int | YES | NULL |  |  |
| `readability_score` | int | YES | NULL |  |  |
| `is_cornerstone` | tinyint(1) | YES | 0 |  |  |
| `is_robots_noindex` | tinyint(1) | YES | 0 |  |  |
| `is_robots_nofollow` | tinyint(1) | YES | 0 |  |  |
| `is_robots_noarchive` | tinyint(1) | YES | 0 |  |  |
| `is_robots_noimageindex` | tinyint(1) | YES | 0 |  |  |
| `is_robots_nosnippet` | tinyint(1) | YES | 0 |  |  |
| `twitter_title` | text | YES | NULL |  |  |
| `twitter_image` | longtext | YES | NULL |  |  |
| `twitter_description` | longtext | YES | NULL |  |  |
| `twitter_image_id` | varchar(191) | YES | NULL |  |  |
| `twitter_image_source` | text | YES | NULL |  |  |
| `open_graph_title` | text | YES | NULL |  |  |
| `open_graph_description` | longtext | YES | NULL |  |  |
| `open_graph_image` | longtext | YES | NULL |  |  |
| `open_graph_image_id` | varchar(191) | YES | NULL |  |  |
| `open_graph_image_source` | text | YES | NULL |  |  |
| `open_graph_image_meta` | mediumtext | YES | NULL |  |  |
| `link_count` | int | YES | NULL |  |  |
| `incoming_link_count` | int | YES | NULL |  |  |
| `prominent_words_version` | int unsigned | YES | NULL | MUL |  |
| `created_at` | datetime | YES | NULL |  |  |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `blog_id` | bigint | NO | 1 |  |  |
| `language` | varchar(32) | YES | NULL |  |  |
| `region` | varchar(32) | YES | NULL |  |  |
| `schema_page_type` | varchar(64) | YES | NULL |  |  |
| `schema_article_type` | varchar(64) | YES | NULL |  |  |
| `has_ancestors` | tinyint(1) | YES | 0 |  |  |
| `estimated_reading_time_minutes` | int | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| object_id_and_type | object_id | NO | BTREE |
| object_id_and_type | object_type | NO | BTREE |
| object_type_and_sub_type | object_type | NO | BTREE |
| object_type_and_sub_type | object_sub_type | NO | BTREE |
| permalink_hash_and_object_type | permalink_hash | NO | BTREE |
| permalink_hash_and_object_type | object_type | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| prominent_words | prominent_words_version | NO | BTREE |
| prominent_words | object_type | NO | BTREE |
| prominent_words | object_sub_type | NO | BTREE |
| prominent_words | post_status | NO | BTREE |
| subpages | post_parent | NO | BTREE |
| subpages | object_type | NO | BTREE |
| subpages | post_status | NO | BTREE |
| subpages | object_id | NO | BTREE |

---

## wpblog_yoast_indexable_hierarchy

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `indexable_id` | int unsigned | NO | NULL | PRI |  |
| `ancestor_id` | int unsigned | NO | NULL | PRI |  |
| `depth` | int unsigned | YES | NULL | MUL |  |
| `blog_id` | bigint | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ancestor_id | ancestor_id | NO | BTREE |
| depth | depth | NO | BTREE |
| indexable_id | indexable_id | NO | BTREE |
| PRIMARY | indexable_id | YES | BTREE |
| PRIMARY | ancestor_id | YES | BTREE |

---

## wpblog_yoast_migrations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `version` | varchar(191) | YES | NULL | UNI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_wpblog_yoast_migrations_version | version | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpblog_yoast_primary_term

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint | YES | NULL | MUL |  |
| `term_id` | bigint | YES | NULL |  |  |
| `taxonomy` | varchar(32) | NO | NULL |  |  |
| `created_at` | datetime | YES | NULL |  |  |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `blog_id` | bigint | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| post_taxonomy | post_id | NO | BTREE |
| post_taxonomy | taxonomy | NO | BTREE |
| post_term | post_id | NO | BTREE |
| post_term | term_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpblog_yoast_seo_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `url` | varchar(255) | NO | NULL |  |  |
| `post_id` | bigint unsigned | NO | NULL | MUL |  |
| `target_post_id` | bigint unsigned | NO | NULL |  |  |
| `type` | varchar(8) | NO | NULL |  |  |
| `indexable_id` | int unsigned | YES | NULL | MUL |  |
| `target_indexable_id` | int unsigned | YES | NULL |  |  |
| `height` | int unsigned | YES | NULL |  |  |
| `width` | int unsigned | YES | NULL |  |  |
| `size` | int unsigned | YES | NULL |  |  |
| `language` | varchar(32) | YES | NULL |  |  |
| `region` | varchar(32) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| indexable_link_direction | indexable_id | NO | BTREE |
| indexable_link_direction | type | NO | BTREE |
| link_direction | post_id | NO | BTREE |
| link_direction | type | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpblog_yoast_seo_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `object_id` | bigint unsigned | NO | NULL | PRI |  |
| `internal_link_count` | int unsigned | YES | NULL |  |  |
| `incoming_link_count` | int unsigned | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| object_id | object_id | YES | BTREE |

---

## wpleads_actionscheduler_actions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `action_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `hook` | varchar(191) | NO | NULL | MUL |  |
| `status` | varchar(20) | NO | NULL | MUL |  |
| `scheduled_date_gmt` | datetime | YES | 0000-00-00 00:00:00 | MUL |  |
| `scheduled_date_local` | datetime | YES | 0000-00-00 00:00:00 |  |  |
| `priority` | tinyint unsigned | NO | 10 |  |  |
| `args` | varchar(191) | YES | NULL | MUL |  |
| `schedule` | longtext | YES | NULL |  |  |
| `group_id` | bigint unsigned | NO | 0 | MUL |  |
| `attempts` | int | NO | 0 |  |  |
| `last_attempt_gmt` | datetime | YES | 0000-00-00 00:00:00 | MUL |  |
| `last_attempt_local` | datetime | YES | 0000-00-00 00:00:00 |  |  |
| `claim_id` | bigint unsigned | NO | 0 | MUL |  |
| `extended_args` | varchar(8000) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| args | args | NO | BTREE |
| claim_id_status_scheduled_date_gmt | claim_id | NO | BTREE |
| claim_id_status_scheduled_date_gmt | status | NO | BTREE |
| claim_id_status_scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |
| group_id | group_id | NO | BTREE |
| hook_status_scheduled_date_gmt | hook | NO | BTREE |
| hook_status_scheduled_date_gmt | status | NO | BTREE |
| hook_status_scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |
| last_attempt_gmt | last_attempt_gmt | NO | BTREE |
| PRIMARY | action_id | YES | BTREE |
| scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |
| status_scheduled_date_gmt | status | NO | BTREE |
| status_scheduled_date_gmt | scheduled_date_gmt | NO | BTREE |

---

## wpleads_actionscheduler_claims

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `claim_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `date_created_gmt` | datetime | YES | 0000-00-00 00:00:00 | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| date_created_gmt | date_created_gmt | NO | BTREE |
| PRIMARY | claim_id | YES | BTREE |

---

## wpleads_actionscheduler_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `group_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `slug` | varchar(255) | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | group_id | YES | BTREE |
| slug | slug | NO | BTREE |

---

## wpleads_actionscheduler_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `log_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `action_id` | bigint unsigned | NO | NULL | MUL |  |
| `message` | text | NO | NULL |  |  |
| `log_date_gmt` | datetime | YES | 0000-00-00 00:00:00 | MUL |  |
| `log_date_local` | datetime | YES | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| action_id | action_id | NO | BTREE |
| log_date_gmt | log_date_gmt | NO | BTREE |
| PRIMARY | log_id | YES | BTREE |

---

## wpleads_bala_email_notifications

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL |  |  |
| `post_id` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_commentmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_id | comment_id | NO | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wpleads_comments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `comment_ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_post_ID` | bigint unsigned | NO | 0 | MUL |  |
| `comment_author` | tinytext | NO | NULL |  |  |
| `comment_author_email` | varchar(100) | NO | NULL | MUL |  |
| `comment_author_url` | varchar(200) | NO | NULL |  |  |
| `comment_author_IP` | varchar(100) | NO | NULL |  |  |
| `comment_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `comment_date_gmt` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `comment_content` | text | NO | NULL |  |  |
| `comment_karma` | int | NO | 0 |  |  |
| `comment_approved` | varchar(20) | NO | 1 | MUL |  |
| `comment_agent` | varchar(255) | NO | NULL |  |  |
| `comment_type` | varchar(20) | NO | comment |  |  |
| `comment_parent` | bigint unsigned | NO | 0 | MUL |  |
| `user_id` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_approved_date_gmt | comment_approved | NO | BTREE |
| comment_approved_date_gmt | comment_date_gmt | NO | BTREE |
| comment_author_email | comment_author_email | NO | BTREE |
| comment_date_gmt | comment_date_gmt | NO | BTREE |
| comment_parent | comment_parent | NO | BTREE |
| comment_post_ID | comment_post_ID | NO | BTREE |
| PRIMARY | comment_ID | YES | BTREE |

---

## wpleads_cpk_wpcsv_export_queue

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `export_id` | varchar(30) | NO | NULL |  |  |
| `post_id` | int | NO | NULL |  |  |
| `done` | tinyint(1) | NO | 0 |  |  |
| `msg` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_cpk_wpcsv_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `category` | varchar(255) | NO | NULL |  |  |
| `msg` | varchar(255) | NO | NULL |  |  |
| `data` | text | YES | NULL |  |  |
| `created` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_esign_document_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL | MUL |  |
| `document_id` | int | NO | NULL | MUL |  |
| `signer_name` | varchar(64) | NO | NULL | MUL |  |
| `signer_email` | varchar(64) | NO | NULL | MUL |  |
| `company_name` | varchar(64) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| document_id | document_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| signer_email | signer_email | NO | BTREE |
| signer_name | signer_name | NO | BTREE |
| user_id | user_id | NO | BTREE |

---

## wpleads_esign_documents

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `document_id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL |  |  |
| `post_id` | int | NO | NULL |  |  |
| `document_title` | varchar(200) | NO | NULL | MUL |  |
| `document_content` | longtext | NO | NULL |  |  |
| `notify` | tinyint(1) | NO | 0 |  |  |
| `add_signature` | tinyint(1) | NO | 0 |  |  |
| `document_type` | enum('stand_alone','normal','esig_template','esig_gravity') | NO | normal | MUL |  |
| `document_status` | varchar(24) | NO | NULL | MUL |  |
| `document_checksum` | text | NO | NULL | MUL |  |
| `document_uri` | text | YES | NULL |  |  |
| `ip_address` | varchar(100) | NO | NULL |  |  |
| `date_created` | datetime | NO | NULL |  |  |
| `last_modified` | datetime | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| document_checksum | document_checksum | NO | BTREE |
| document_status | document_status | NO | BTREE |
| document_title | document_title | NO | BTREE |
| document_type | document_type | NO | BTREE |
| last_modified | last_modified | NO | BTREE |
| PRIMARY | document_id | YES | BTREE |

---

## wpleads_esign_documents_events

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `document_id` | int | NO | NULL | MUL |  |
| `event` | varchar(20) | NO | NULL | MUL |  |
| `event_data` | varchar(256) | NO | NULL | MUL |  |
| `date` | datetime | NO | NULL | MUL |  |
| `ip_address` | varchar(100) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| date | date | NO | BTREE |
| document_id | document_id | NO | BTREE |
| event | event | NO | BTREE |
| event_data | event_data | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_esign_documents_fields_data

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `field_id` | varchar(100) | NO | NULL | MUL |  |
| `recipient_id` | bigint | NO | NULL | MUL |  |
| `document_id` | bigint | NO | NULL | MUL |  |
| `value` | longtext | NO | NULL |  |  |
| `created_at` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| document_id | document_id | NO | BTREE |
| field_id | field_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| recipient_id | recipient_id | NO | BTREE |

---

## wpleads_esign_documents_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `document_id` | bigint unsigned | NO | NULL | MUL |  |
| `meta_key` | varchar(255) | NO | NULL | MUL |  |
| `meta_value` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| document_id | document_id | NO | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_esign_documents_signatures

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `document_id` | int | NO | NULL | MUL |  |
| `signature_id` | int | NO | NULL | MUL |  |
| `ip_address` | varchar(100) | NO | NULL |  |  |
| `sign_date` | datetime | NO | NULL |  |  |
| `signer_type` | varchar(55) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| document_id | document_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| signature_id | signature_id | NO | BTREE |

---

## wpleads_esign_documents_signer_field_data

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `signature_id` | int | NO | NULL |  |  |
| `document_id` | int | NO | NULL | MUL |  |
| `input_fields` | longtext | NO | NULL |  |  |
| `date_created` | datetime | NO | NULL |  |  |
| `date_modified` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| document_id | document_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_esign_documents_stand_alone_docs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `document_id` | int | NO | NULL | PRI |  |
| `page_id` | int | NO | NULL | MUL |  |
| `date_created` | datetime | NO | NULL |  |  |
| `date_modified` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| page_id | page_id | NO | BTREE |
| PRIMARY | document_id | YES | BTREE |

---

## wpleads_esign_invitations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `invitation_id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL |  |  |
| `document_id` | int | NO | NULL | MUL |  |
| `invite_hash` | text | NO | NULL | MUL |  |
| `invite_message` | longtext | NO | NULL |  |  |
| `invite_sent` | tinyint(1) | NO | 0 |  |  |
| `sender_ip` | varchar(100) | NO | NULL |  |  |
| `invite_sent_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| document_id | document_id | NO | BTREE |
| invite_hash | invite_hash | NO | BTREE |
| PRIMARY | invitation_id | YES | BTREE |

---

## wpleads_esign_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `setting_id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL |  |  |
| `setting_name` | varchar(55) | NO | NULL | MUL |  |
| `setting_value` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | setting_id | YES | BTREE |
| setting_name | setting_name | NO | BTREE |

---

## wpleads_esign_signatures

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `signature_id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL | MUL |  |
| `signature_type` | varchar(20) | NO | full | MUL |  |
| `signature_hash` | char(64) | NO | NULL |  |  |
| `signature_salt` | char(40) | NO | NULL |  |  |
| `signature_data` | longtext | NO | NULL |  |  |
| `signature_added` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | signature_id | YES | BTREE |
| signature_type | signature_type | NO | BTREE |
| user_id | user_id | NO | BTREE |

---

## wpleads_esign_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `user_id` | int | NO | NULL | PRI | auto_increment |
| `wp_user_id` | int | YES | NULL |  |  |
| `uuid` | char(36) | NO | NULL |  |  |
| `user_email` | varchar(100) | NO | NULL | MUL |  |
| `user_title` | varchar(55) | NO | NULL |  |  |
| `first_name` | varchar(45) | NO | NULL |  |  |
| `last_name` | varchar(65) | NO | NULL |  |  |
| `is_admin` | smallint | NO | NULL |  |  |
| `is_signer` | smallint | NO | NULL |  |  |
| `is_sa` | smallint | NO | NULL |  |  |
| `is_inactive` | smallint | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | user_id | YES | BTREE |
| user_email | user_email | NO | BTREE |

---

## wpleads_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `link_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `link_url` | varchar(255) | NO | NULL |  |  |
| `link_name` | varchar(255) | NO | NULL |  |  |
| `link_image` | varchar(255) | NO | NULL |  |  |
| `link_target` | varchar(25) | NO | NULL |  |  |
| `link_description` | varchar(255) | NO | NULL |  |  |
| `link_visible` | varchar(20) | NO | Y | MUL |  |
| `link_owner` | bigint unsigned | NO | 1 |  |  |
| `link_rating` | int | NO | 0 |  |  |
| `link_updated` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `link_rel` | varchar(255) | NO | NULL |  |  |
| `link_notes` | mediumtext | NO | NULL |  |  |
| `link_rss` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| link_visible | link_visible | NO | BTREE |
| PRIMARY | link_id | YES | BTREE |

---

## wpleads_mailster_action_bounces

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `hard` | tinyint(1) | NO | 0 |  |  |
| `text` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | hard | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wpleads_mailster_action_clicks

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `link_id` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | link_id | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wpleads_mailster_action_errors

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `text` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wpleads_mailster_action_opens

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wpleads_mailster_action_sent

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | timestamp | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wpleads_mailster_action_unsubs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | YES | NULL | MUL |  |
| `timestamp` | int | NO | 0 |  |  |
| `i` | int unsigned | NO | 0 |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `text` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | i | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wpleads_mailster_form_actions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `form_id` | bigint unsigned | NO | NULL |  |  |
| `post_id` | bigint unsigned | NO | NULL |  |  |
| `subscriber_id` | bigint unsigned | YES | NULL |  |  |
| `timestamp` | int | NO | 0 |  |  |
| `type` | tinyint unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |

---

## wpleads_mailster_form_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `form_id` | bigint unsigned | NO | NULL | MUL |  |
| `field_id` | varchar(191) | NO | NULL |  |  |
| `name` | longtext | NO | NULL |  |  |
| `error_msg` | longtext | NO | NULL |  |  |
| `required` | tinyint unsigned | NO | NULL |  |  |
| `position` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | form_id | YES | BTREE |
| id | field_id | YES | BTREE |
| PRIMARY | ID | YES | BTREE |

---

## wpleads_mailster_forms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(191) | NO | NULL |  |  |
| `submit` | varchar(191) | NO | NULL |  |  |
| `asterisk` | tinyint(1) | YES | 1 |  |  |
| `userschoice` | tinyint(1) | YES | 0 |  |  |
| `precheck` | tinyint(1) | YES | 0 |  |  |
| `dropdown` | tinyint(1) | YES | 0 |  |  |
| `prefill` | tinyint(1) | YES | 0 |  |  |
| `inline` | tinyint(1) | YES | 0 |  |  |
| `overwrite` | tinyint(1) | YES | 0 |  |  |
| `addlists` | tinyint(1) | YES | 0 |  |  |
| `style` | longtext | YES | NULL |  |  |
| `custom_style` | longtext | YES | NULL |  |  |
| `doubleoptin` | tinyint(1) | YES | 1 |  |  |
| `subject` | longtext | YES | NULL |  |  |
| `headline` | longtext | YES | NULL |  |  |
| `content` | longtext | YES | NULL |  |  |
| `link` | longtext | YES | NULL |  |  |
| `resend` | tinyint(1) | YES | 0 |  |  |
| `resend_count` | int | YES | 2 |  |  |
| `resend_time` | int | YES | 48 |  |  |
| `template` | varchar(191) | NO | NULL |  |  |
| `vcard` | tinyint(1) | YES | 0 |  |  |
| `vcard_content` | longtext | YES | NULL |  |  |
| `confirmredirect` | varchar(2083) | YES | NULL |  |  |
| `redirect` | varchar(2083) | YES | NULL |  |  |
| `added` | int unsigned | YES | NULL |  |  |
| `updated` | int unsigned | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |

---

## wpleads_mailster_forms_lists

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `form_id` | bigint unsigned | NO | NULL | PRI |  |
| `list_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| form_id | form_id | NO | BTREE |
| id | form_id | YES | BTREE |
| id | list_id | YES | BTREE |
| list_id | list_id | NO | BTREE |

---

## wpleads_mailster_forms_tags

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `form_id` | bigint unsigned | NO | NULL | PRI |  |
| `tag_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| form_id | form_id | NO | BTREE |
| id | form_id | YES | BTREE |
| id | tag_id | YES | BTREE |
| list_id | tag_id | NO | BTREE |

---

## wpleads_mailster_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `link` | varchar(2083) | NO | NULL |  |  |
| `i` | tinyint unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |

---

## wpleads_mailster_lists

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `parent_id` | bigint unsigned | NO | NULL |  |  |
| `name` | varchar(191) | NO | NULL | UNI |  |
| `slug` | varchar(191) | NO | NULL | UNI |  |
| `description` | longtext | NO | NULL |  |  |
| `added` | int unsigned | NO | NULL |  |  |
| `updated` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| slug | slug | YES | BTREE |

---

## wpleads_mailster_lists_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `list_id` | bigint unsigned | NO | NULL | PRI |  |
| `subscriber_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | list_id | YES | BTREE |
| id | subscriber_id | YES | BTREE |
| list_id | list_id | NO | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wpleads_mailster_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL |  |  |
| `campaign_id` | bigint unsigned | YES | NULL |  |  |
| `timestamp` | int | NO | 0 |  |  |
| `subject` | longtext | NO | NULL |  |  |
| `receivers` | longtext | NO | NULL |  |  |
| `html` | longtext | NO | NULL |  |  |
| `text` | longtext | NO | NULL |  |  |
| `raw` | longtext | NO | NULL |  |  |
| `message_id` | varchar(191) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |

---

## wpleads_mailster_queue

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | NO | 0 | MUL |  |
| `campaign_id` | bigint unsigned | NO | 0 | MUL |  |
| `requeued` | tinyint unsigned | NO | 0 | MUL |  |
| `added` | int unsigned | NO | 0 |  |  |
| `timestamp` | int | NO | 0 | MUL |  |
| `sent` | int unsigned | NO | 0 |  |  |
| `priority` | tinyint unsigned | NO | 0 | MUL |  |
| `count` | tinyint unsigned | NO | 0 | MUL |  |
| `error` | tinyint unsigned | NO | 0 | MUL |  |
| `ignore_status` | tinyint unsigned | NO | 0 | MUL |  |
| `options` | varchar(191) | NO | NULL |  |  |
| `tags` | longtext | NO | NULL |  |  |
| `i` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| count | count | NO | BTREE |
| error | error | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | requeued | YES | BTREE |
| id | options | YES | BTREE |
| id | i | YES | BTREE |
| ignore_status | ignore_status | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| priority | priority | NO | BTREE |
| requeued | requeued | NO | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |
| timestamp | timestamp | NO | BTREE |

---

## wpleads_mailster_subscriber_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | NO | NULL | MUL |  |
| `meta_key` | varchar(191) | NO | NULL | MUL |  |
| `meta_value` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | subscriber_id | YES | BTREE |
| id | meta_key | YES | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wpleads_mailster_subscriber_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `campaign_id` | bigint unsigned | NO | NULL | MUL |  |
| `meta_key` | varchar(191) | NO | NULL | MUL |  |
| `meta_value` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| campaign_id | campaign_id | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | campaign_id | YES | BTREE |
| id | meta_key | YES | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |

---

## wpleads_mailster_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `hash` | varchar(32) | NO | NULL | UNI |  |
| `email` | varchar(191) | NO | NULL | UNI |  |
| `wp_id` | bigint unsigned | NO | 0 | MUL |  |
| `status` | int unsigned | NO | 0 | MUL |  |
| `added` | int unsigned | NO | 0 |  |  |
| `updated` | int unsigned | NO | 0 |  |  |
| `signup` | int unsigned | NO | 0 |  |  |
| `confirm` | int unsigned | NO | 0 |  |  |
| `ip_signup` | varchar(45) | NO | NULL |  |  |
| `ip_confirm` | varchar(45) | NO | NULL |  |  |
| `rating` | decimal(3,2) unsigned | NO | 0.25 | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| email | email | YES | BTREE |
| hash | hash | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| rating | rating | NO | BTREE |
| status | status | NO | BTREE |
| wp_id | wp_id | NO | BTREE |

---

## wpleads_mailster_tags

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(191) | NO | NULL | UNI |  |
| `added` | int unsigned | NO | NULL |  |  |
| `updated` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | YES | BTREE |
| PRIMARY | ID | YES | BTREE |

---

## wpleads_mailster_tags_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `tag_id` | bigint unsigned | NO | NULL | PRI |  |
| `subscriber_id` | bigint unsigned | NO | NULL | PRI |  |
| `added` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | tag_id | YES | BTREE |
| id | subscriber_id | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |
| tag_id | tag_id | NO | BTREE |

---

## wpleads_mailster_workflows

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `subscriber_id` | bigint unsigned | YES | NULL | MUL |  |
| `workflow_id` | bigint unsigned | YES | NULL | MUL |  |
| `trigger` | varchar(40) | NO | NULL |  |  |
| `step` | varchar(40) | YES | NULL |  |  |
| `added` | int | YES | NULL |  |  |
| `timestamp` | int | YES | NULL |  |  |
| `finished` | int | NO | 0 | MUL |  |
| `try` | int | NO | 0 |  |  |
| `error` | varchar(190) | YES | NULL |  |  |
| `context` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| finished | finished | NO | BTREE |
| id | subscriber_id | YES | BTREE |
| id | workflow_id | YES | BTREE |
| id | finished | YES | BTREE |
| PRIMARY | ID | YES | BTREE |
| subscriber_id | subscriber_id | NO | BTREE |
| workflow_id | workflow_id | NO | BTREE |

---

## wpleads_myCRED_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `ref` | varchar(256) | NO | NULL |  |  |
| `ref_id` | int | YES | NULL |  |  |
| `user_id` | int | YES | NULL |  |  |
| `creds` | decimal(22,2) | YES | NULL |  |  |
| `ctype` | varchar(64) | YES | mycred_default |  |  |
| `time` | bigint | YES | NULL |  |  |
| `entry` | longtext | YES | NULL |  |  |
| `data` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_mymail_temp_import

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint | NO | NULL | PRI | auto_increment |
| `data` | longtext | NO | NULL |  |  |
| `identifier` | char(13) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |

---

## wpleads_options

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `option_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `option_name` | varchar(191) | YES | NULL | UNI |  |
| `option_value` | longtext | NO | NULL |  |  |
| `autoload` | varchar(20) | NO | yes | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| autoload | autoload | NO | BTREE |
| option_name | option_name | YES | BTREE |
| PRIMARY | option_id | YES | BTREE |

---

## wpleads_postmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| post_id | post_id | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wpleads_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_author` | bigint unsigned | NO | 0 | MUL |  |
| `post_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_date_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_content` | longtext | NO | NULL |  |  |
| `post_title` | text | NO | NULL |  |  |
| `post_excerpt` | text | NO | NULL |  |  |
| `post_status` | varchar(20) | NO | publish |  |  |
| `comment_status` | varchar(20) | NO | open |  |  |
| `ping_status` | varchar(20) | NO | open |  |  |
| `post_password` | varchar(255) | NO | NULL |  |  |
| `post_name` | varchar(200) | NO | NULL | MUL |  |
| `to_ping` | text | NO | NULL |  |  |
| `pinged` | text | NO | NULL |  |  |
| `post_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_modified_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_content_filtered` | longtext | NO | NULL |  |  |
| `post_parent` | bigint unsigned | NO | 0 | MUL |  |
| `guid` | varchar(255) | NO | NULL |  |  |
| `menu_order` | int | NO | 0 |  |  |
| `post_type` | varchar(20) | NO | post | MUL |  |
| `post_mime_type` | varchar(100) | NO | NULL |  |  |
| `comment_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| post_author | post_author | NO | BTREE |
| post_name | post_name | NO | BTREE |
| post_parent | post_parent | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| type_status_date | post_type | NO | BTREE |
| type_status_date | post_status | NO | BTREE |
| type_status_date | post_date | NO | BTREE |
| type_status_date | ID | NO | BTREE |

---

## wpleads_pps_countries

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `name` | varchar(128) | NO | NULL |  |  |
| `iso_code_2` | varchar(2) | YES | NULL |  |  |
| `iso_code_3` | varchar(3) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_pps_modules

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | smallint | NO | NULL | PRI | auto_increment |
| `code` | varchar(32) | NO | NULL | UNI |  |
| `active` | tinyint(1) | NO | 0 |  |  |
| `type_id` | tinyint(1) | NO | 0 |  |  |
| `label` | varchar(64) | YES | NULL |  |  |
| `ex_plug_dir` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| code | code | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_pps_modules_type

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | smallint | NO | NULL | PRI | auto_increment |
| `label` | varchar(32) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_pps_popup

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `label` | varchar(255) | NO | NULL |  |  |
| `active` | tinyint(1) | NO | NULL |  |  |
| `original_id` | int | NO | 0 |  |  |
| `params` | text | NO | NULL |  |  |
| `html` | text | NO | NULL |  |  |
| `css` | text | NO | NULL |  |  |
| `img_preview` | varchar(128) | YES | NULL |  |  |
| `show_on` | tinyint(1) | NO | 0 |  |  |
| `show_to` | tinyint(1) | NO | 0 |  |  |
| `show_pages` | tinyint(1) | NO | 0 |  |  |
| `type_id` | tinyint(1) | NO | 1 |  |  |
| `views` | int | NO | 0 |  |  |
| `unique_views` | int | NO | 0 |  |  |
| `actions` | int | NO | 0 |  |  |
| `date_created` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `sort_order` | mediumint | NO | 0 |  |  |
| `show_in_admin_area` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_pps_popup_show_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `popup_id` | int | NO | NULL |  |  |
| `term_id` | int | NO | NULL |  |  |
| `not_show` | tinyint(1) | NO | 0 |  |  |

---

## wpleads_pps_popup_show_pages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `popup_id` | int | NO | NULL |  |  |
| `post_id` | int | NO | NULL |  |  |
| `not_show` | tinyint(1) | NO | 0 |  |  |

---

## wpleads_pps_statistics

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `popup_id` | int | NO | 0 |  |  |
| `type` | tinyint | NO | 0 |  |  |
| `sm_id` | tinyint | NO | 0 |  |  |
| `is_unique` | tinyint(1) | NO | 0 |  |  |
| `date_created` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_pps_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `username` | varchar(128) | YES | NULL |  |  |
| `email` | varchar(128) | NO | NULL |  |  |
| `hash` | varchar(128) | NO | NULL |  |  |
| `activated` | tinyint(1) | NO | 0 |  |  |
| `popup_id` | int | NO | 0 |  |  |
| `date_created` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |
| `all_data` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_pps_usage_stat

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `code` | varchar(64) | NO | NULL | UNI |  |
| `visits` | int | NO | 0 |  |  |
| `spent_time` | int | NO | 0 |  |  |
| `modify_timestamp` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| code | code | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_affiliate_payouts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `pid` | bigint | YES | NULL |  |  |
| `uid` | bigint | YES | NULL |  |  |
| `datemade` | bigint | YES | NULL |  |  |
| `paidon` | bigint | YES | NULL |  |  |
| `moneymade` | varchar(255) | YES | NULL |  |  |
| `paid` | tinyint | NO | 0 |  |  |
| `comment` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_affiliate_requests

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `uid` | bigint | YES | NULL |  |  |
| `datemade` | bigint | YES | NULL |  |  |
| `paidon` | bigint | YES | NULL |  |  |
| `amount` | varchar(255) | YES | NULL |  |  |
| `paid` | tinyint | NO | 0 |  |  |
| `methoddetails` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_affiliate_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `owner_id` | int | YES | NULL |  |  |
| `affiliate_id` | int | YES | NULL |  |  |
| `datemade` | bigint | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_bidding_intervals

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `bidding_interval_name` | text | NO | NULL |  |  |
| `low_limit` | int | NO | NULL |  |  |
| `high_limit` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_bids

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `date_made` | bigint | NO | 0 |  |  |
| `bid` | double | NO | 0 |  |  |
| `pid` | bigint | NO | 0 |  |  |
| `uid` | bigint | NO | 0 |  |  |
| `winner` | tinyint | NO | 0 |  |  |
| `paid` | tinyint | NO | 0 |  |  |
| `reserved1` | varchar(255) | NO | 0 |  |  |
| `date_choosen` | bigint | NO | 0 |  |  |
| `description` | text | NO | NULL |  |  |
| `days_done` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_bills_site

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `uid` | bigint | NO | NULL |  |  |
| `pid` | bigint | NO | NULL |  |  |
| `datemade` | bigint | NO | NULL |  |  |
| `amount` | double | NO | NULL |  |  |
| `paiddate` | bigint | NO | NULL |  |  |
| `paid` | tinyint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_coupons

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `coupon_name` | varchar(255) | NO | NULL |  |  |
| `coupon_solid_reduction` | varchar(255) | NO | NULL |  |  |
| `coupon_percent_reduction` | varchar(255) | NO | NULL |  |  |
| `ending` | varchar(255) | NO | NULL |  |  |
| `coupon_code` | varchar(255) | NO | NULL |  |  |
| `datemprojecte` | varchar(255) | NO | NULL |  |  |
| `featured_free` | int | NO | 0 |  |  |
| `pause` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_custom_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `name` | varchar(255) | NO | NULL |  |  |
| `tp` | varchar(48) | NO | NULL |  |  |
| `ordr` | int | NO | NULL |  |  |
| `cate` | varchar(255) | NO | NULL |  |  |
| `pause` | int | NO | 1 |  |  |
| `is_mandatory` | int | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_custom_options

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `valval` | varchar(255) | NO | NULL |  |  |
| `ordr` | int | NO | NULL |  |  |
| `custid` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_custom_relations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `custid` | bigint | NO | NULL |  |  |
| `catid` | bigint | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_disputes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `uid` | bigint | NO | NULL |  |  |
| `pid` | bigint | NO | 0 |  |  |
| `closed` | bigint | NO | 0 |  |  |
| `solved` | bigint | NO | 0 |  |  |
| `datemade` | bigint | NO | 0 |  |  |
| `dateclosed` | bigint | NO | 0 |  |  |
| `datesolved` | bigint | NO | 0 |  |  |
| `content` | text | NO | NULL |  |  |
| `subject` | text | NO | NULL |  |  |
| `uid2` | bigint | NO | 0 |  |  |
| `uid1` | bigint | NO | 0 |  |  |
| `oid` | bigint | NO | 0 |  |  |
| `reason` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_disputes_messages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `uid` | int | NO | 0 |  |  |
| `receiver` | int | NO | 0 |  |  |
| `description` | text | NO | NULL |  |  |
| `disputeid` | int | NO | 0 |  |  |
| `rd` | tinyint | NO | 0 |  |  |
| `pid` | int | NO | 0 |  |  |
| `datemade` | int | NO | 0 |  |  |
| `readdate` | int | NO | 0 |  |  |
| `file_attached` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_disputes_offers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `disputeid` | int | NO | 0 |  |  |
| `sender` | int | NO | 0 |  |  |
| `receiver` | int | NO | 0 |  |  |
| `description` | text | NO | NULL |  |  |
| `answer` | tinyint | NO | 0 |  |  |
| `rd` | tinyint | NO | 0 |  |  |
| `datemade` | int | NO | 0 |  |  |
| `readdate` | int | NO | 0 |  |  |
| `amount` | varchar(40) | YES | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_email_alerts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `uid` | int | NO | NULL |  |  |
| `catid` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_email_alerts_locs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `uid` | int | NO | NULL |  |  |
| `catid` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_escrow

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `fromid` | int | NO | NULL |  |  |
| `toid` | int | NO | NULL |  |  |
| `pid` | int | NO | NULL |  |  |
| `amount` | double | NO | NULL |  |  |
| `datemade` | int | NO | NULL |  |  |
| `releasedate` | int | NO | NULL |  |  |
| `released` | tinyint | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_escrows

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `fromid` | bigint | NO | NULL |  |  |
| `toid` | bigint | NO | NULL |  |  |
| `oid` | bigint | NO | NULL |  |  |
| `amount` | double | NO | NULL |  |  |
| `datemade` | bigint | NO | NULL |  |  |
| `releasedate` | bigint | NO | NULL |  |  |
| `released` | tinyint | NO | 0 |  |  |
| `method` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_freelancer_skills

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `uid` | int | NO | NULL |  |  |
| `catid` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_marketplace_payments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `fromid` | bigint | NO | 0 |  |  |
| `toid` | bigint | NO | 0 |  |  |
| `oid` | bigint | NO | 0 |  |  |
| `amount` | double | NO | 0 |  |  |
| `datemade` | bigint | NO | 0 |  |  |
| `releasedate` | bigint | NO | 0 |  |  |
| `released` | tinyint | NO | 0 |  |  |
| `method` | varchar(255) | NO | 0 |  |  |
| `field1` | varchar(255) | NO | 0 |  |  |
| `field2` | varchar(255) | NO | 0 |  |  |
| `field3` | varchar(255) | NO | 0 |  |  |
| `field4` | varchar(255) | NO | 0 |  |  |
| `field5` | varchar(255) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_marketplace_payments_commissions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `oid` | bigint | NO | 0 |  |  |
| `amount` | double | NO | 0 |  |  |
| `datemade` | bigint | NO | 0 |  |  |
| `releasedate` | bigint | NO | 0 |  |  |
| `released` | tinyint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_marketplace_payments_freelancers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `oid` | bigint | NO | 0 |  |  |
| `uid` | bigint | NO | 0 |  |  |
| `amount` | double | NO | 0 |  |  |
| `datemade` | bigint | NO | 0 |  |  |
| `releasedate` | bigint | NO | 0 |  |  |
| `released` | tinyint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_message_board

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `uid` | int | NO | NULL |  |  |
| `content` | text | NO | NULL |  |  |
| `rd` | tinyint | NO | 0 |  |  |
| `pid` | int | NO | NULL |  |  |
| `datemade` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_milestone

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `owner` | int | NO | NULL |  |  |
| `pid` | int | NO | NULL |  |  |
| `uid` | int | NO | NULL |  |  |
| `description_content` | text | NO | NULL |  |  |
| `datemade` | bigint | NO | 0 |  |  |
| `completion_date` | bigint | NO | 0 |  |  |
| `date_released` | bigint | NO | 0 |  |  |
| `amount` | varchar(255) | NO | NULL |  |  |
| `released` | tinyint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_notifications

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `uid` | bigint | NO | 0 |  |  |
| `related_id` | bigint | NO | 0 |  |  |
| `notification_type` | tinyint | NO | 0 |  |  |
| `description` | text | NO | NULL |  |  |
| `rd` | tinyint | NO | 0 |  |  |
| `datemade` | int | NO | 0 |  |  |
| `readdate` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_orders

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `buyer` | bigint | NO | 0 |  |  |
| `freelancer` | bigint | NO | 0 |  |  |
| `pid` | bigint | NO | 0 |  |  |
| `datemade` | bigint | NO | 0 |  |  |
| `done_freelancer` | tinyint | NO | 0 |  |  |
| `done_buyer` | tinyint | NO | 0 |  |  |
| `order_status` | tinyint | NO | 0 |  |  |
| `marked_done_freelancer` | bigint | NO | 0 |  |  |
| `marked_done_buyer` | bigint | NO | 0 |  |  |
| `order_net_amount` | double | NO | 0 |  |  |
| `order_total_amount` | double | NO | 0 |  |  |
| `completion_date` | bigint | NO | 0 |  |  |
| `cancelled_date` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_packs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `pack_name` | varchar(255) | NO | NULL |  |  |
| `projects_number` | int | NO | 0 |  |  |
| `pack_cost` | varchar(255) | NO | NULL |  |  |
| `datemprojecte` | varchar(255) | NO | 0 |  |  |
| `featured_free` | int | NO | 0 |  |  |
| `pause` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_payment_transactions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `uid` | int | NO | NULL |  |  |
| `reason` | text | NO | NULL |  |  |
| `datemade` | int | NO | NULL |  |  |
| `amount` | double | NO | NULL |  |  |
| `tp` | tinyint | NO | 1 |  |  |
| `uid2` | int | NO | 0 |  |  |
| `pid_related` | varchar(255) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_pm

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `owner` | int | NO | 0 |  |  |
| `user` | int | NO | 0 |  |  |
| `content` | text | NO | NULL |  |  |
| `subject` | text | NO | NULL |  |  |
| `rd` | tinyint | NO | 0 |  |  |
| `parent` | bigint | NO | 0 |  |  |
| `pid` | int | NO | 0 |  |  |
| `datemade` | int | NO | 0 |  |  |
| `readdate` | int | NO | 0 |  |  |
| `initiator` | int | NO | 0 |  |  |
| `attached` | int | NO | 0 |  |  |
| `show_to_source` | tinyint | NO | 1 |  |  |
| `show_to_destination` | tinyint | NO | 1 |  |  |
| `file_attached` | text | NO | NULL |  |  |
| `approved` | tinyint | NO | 1 |  |  |
| `approved_on` | bigint | NO | 0 |  |  |
| `threadid` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_pm_threads

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `user1` | bigint | NO | 0 |  |  |
| `user2` | bigint | NO | 0 |  |  |
| `datemade` | bigint | NO | 0 |  |  |
| `lastupdate` | bigint | NO | 0 |  |  |
| `pid` | bigint | NO | 0 |  |  |
| `show_to_user1` | bigint | NO | 1 |  |  |
| `show_to_user2` | bigint | NO | 1 |  |  |
| `admin_approved` | bigint | NO | 1 |  |  |
| `message_title` | text | NO | NULL |  |  |
| `user1_last_type` | bigint | NO | 0 |  |  |
| `user2_last_type` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_pm_wk

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `owner` | int | NO | 0 |  |  |
| `user` | int | NO | 0 |  |  |
| `content` | text | NO | NULL |  |  |
| `subject` | text | NO | NULL |  |  |
| `rd` | tinyint | NO | 0 |  |  |
| `parent` | bigint | NO | 0 |  |  |
| `pid` | int | NO | 0 |  |  |
| `datemade` | int | NO | 0 |  |  |
| `readdate` | int | NO | 0 |  |  |
| `initiator` | int | NO | 0 |  |  |
| `attached` | int | NO | 0 |  |  |
| `approved` | tinyint | NO | 1 |  |  |
| `approved_on` | bigint | NO | 0 |  |  |
| `show_to_source` | tinyint | NO | 1 |  |  |
| `show_to_destination` | tinyint | NO | 1 |  |  |
| `file_attached` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_ratings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `pid` | bigint | NO | 0 |  |  |
| `fromuser` | bigint | NO | 0 |  |  |
| `touser` | bigint | NO | 0 |  |  |
| `comment` | text | NO | NULL |  |  |
| `grade` | tinyint | NO | 0 |  |  |
| `datemade` | bigint | NO | 0 |  |  |
| `awarded` | tinyint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_transactions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `pid` | bigint | NO | NULL |  |  |
| `datemprojecte` | int | NO | NULL |  |  |
| `uid` | int | NO | NULL |  |  |
| `payment_date` | varchar(255) | NO | NULL |  |  |
| `txn_id` | varchar(255) | NO | NULL |  |  |
| `item_name` | varchar(255) | NO | NULL |  |  |
| `mc_currency` | varchar(255) | NO | NULL |  |  |
| `last_name` | varchar(255) | NO | NULL |  |  |
| `first_name` | varchar(255) | NO | NULL |  |  |
| `payer_email` | varchar(255) | NO | NULL |  |  |
| `projectdress_country` | varchar(255) | NO | NULL |  |  |
| `projectdress_state` | varchar(255) | NO | NULL |  |  |
| `projectdress_country_code` | varchar(255) | NO | NULL |  |  |
| `projectdress_zip` | varchar(255) | NO | NULL |  |  |
| `projectdress_street` | varchar(255) | NO | NULL |  |  |
| `mc_fee` | varchar(255) | NO | NULL |  |  |
| `mc_gross` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_user_custom_fields

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `name` | varchar(255) | NO | NULL |  |  |
| `tp` | varchar(48) | NO | NULL |  |  |
| `ordr` | int | NO | NULL |  |  |
| `cate` | varchar(255) | NO | NULL |  |  |
| `pause` | int | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_user_custom_options

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `valval` | varchar(255) | NO | NULL |  |  |
| `ordr` | int | NO | NULL |  |  |
| `custid` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_user_custom_relations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `custid` | bigint | NO | NULL |  |  |
| `catid` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_withdraw

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `datemade` | int | NO | NULL |  |  |
| `done` | int | NO | NULL |  |  |
| `datedone` | int | NO | NULL |  |  |
| `payeremail` | varchar(255) | NO | NULL |  |  |
| `uid` | int | NO | NULL |  |  |
| `amount` | double | NO | NULL |  |  |
| `methods` | text | NO | NULL |  |  |
| `rejected` | varchar(255) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_workspace

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `pid` | bigint | NO | NULL |  |  |
| `project_owner` | varchar(48) | NO | NULL |  |  |
| `freelancer1` | bigint | NO | NULL |  |  |
| `freelancer2` | bigint | NO | 0 |  |  |
| `freelancer3` | bigint | NO | 0 |  |  |
| `freelancer4` | bigint | NO | 0 |  |  |
| `freelancer5` | bigint | NO | 0 |  |  |
| `datemade` | bigint | NO | NULL |  |  |
| `last_updated` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_workspace_pm

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `owner` | int | NO | 0 |  |  |
| `user` | int | NO | 0 |  |  |
| `content` | text | NO | NULL |  |  |
| `subject` | text | NO | NULL |  |  |
| `workspace_id` | bigint | NO | 0 |  |  |
| `pid` | bigint | NO | 0 |  |  |
| `datemade` | int | NO | 0 |  |  |
| `readdate` | int | NO | 0 |  |  |
| `attached` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_project_workspace_pm_reads

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `workspace_pm_id` | bigint | NO | NULL |  |  |
| `read_message` | int | NO | 0 |  |  |
| `receiver_user` | bigint | NO | 0 |  |  |
| `read_date` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_redirection_404

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `created` | datetime | NO | NULL | MUL |  |
| `url` | mediumtext | NO | NULL |  |  |
| `domain` | varchar(255) | YES | NULL |  |  |
| `agent` | varchar(255) | YES | NULL |  |  |
| `referrer` | varchar(255) | YES | NULL | MUL |  |
| `http_code` | int unsigned | NO | 0 |  |  |
| `request_method` | varchar(10) | YES | NULL |  |  |
| `request_data` | mediumtext | YES | NULL |  |  |
| `ip` | varchar(45) | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| created | created | NO | BTREE |
| ip | ip | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| referrer | referrer | NO | BTREE |

---

## wpleads_redirection_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(50) | NO | NULL |  |  |
| `tracking` | int | NO | 1 |  |  |
| `module_id` | int unsigned | NO | 0 | MUL |  |
| `status` | enum('enabled','disabled') | NO | enabled | MUL |  |
| `position` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| module_id | module_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| status | status | NO | BTREE |

---

## wpleads_redirection_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `url` | mediumtext | NO | NULL | MUL |  |
| `match_url` | varchar(2000) | YES | NULL | MUL |  |
| `match_data` | text | YES | NULL |  |  |
| `regex` | int unsigned | NO | 0 | MUL |  |
| `position` | int unsigned | NO | 0 |  |  |
| `last_count` | int unsigned | NO | 0 |  |  |
| `last_access` | datetime | NO | 1970-01-01 00:00:00 |  |  |
| `group_id` | int | NO | 0 | MUL |  |
| `status` | enum('enabled','disabled') | NO | enabled | MUL |  |
| `action_type` | varchar(20) | NO | NULL |  |  |
| `action_code` | int unsigned | NO | NULL |  |  |
| `action_data` | mediumtext | YES | NULL |  |  |
| `match_type` | varchar(20) | NO | NULL |  |  |
| `title` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| group | group_id | NO | BTREE |
| group_idpos | group_id | NO | BTREE |
| group_idpos | position | NO | BTREE |
| match_url | match_url | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| regex | regex | NO | BTREE |
| status | status | NO | BTREE |
| url | url | NO | BTREE |

---

## wpleads_redirection_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `created` | datetime | NO | NULL | MUL |  |
| `url` | mediumtext | NO | NULL |  |  |
| `domain` | varchar(255) | YES | NULL |  |  |
| `sent_to` | mediumtext | YES | NULL |  |  |
| `agent` | mediumtext | YES | NULL |  |  |
| `referrer` | mediumtext | YES | NULL |  |  |
| `http_code` | int unsigned | NO | 0 |  |  |
| `request_method` | varchar(10) | YES | NULL |  |  |
| `request_data` | mediumtext | YES | NULL |  |  |
| `redirect_by` | varchar(50) | YES | NULL |  |  |
| `redirection_id` | int unsigned | YES | NULL | MUL |  |
| `ip` | varchar(45) | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| created | created | NO | BTREE |
| ip | ip | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| redirection_id | redirection_id | NO | BTREE |

---

## wpleads_sib_model_forms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `title` | varchar(120) | YES | NULL |  |  |
| `html` | longtext | YES | NULL |  |  |
| `css` | longtext | YES | NULL |  |  |
| `dependTheme` | int | NO | 1 |  |  |
| `listID` | longtext | YES | NULL |  |  |
| `templateID` | int | NO | -1 |  |  |
| `confirmID` | int | NO | -1 |  |  |
| `isDopt` | int | NO | 0 |  |  |
| `isOpt` | int | NO | 0 |  |  |
| `redirectInEmail` | varchar(255) | YES | NULL |  |  |
| `redirectInForm` | varchar(255) | YES | NULL |  |  |
| `successMsg` | varchar(255) | YES | NULL |  |  |
| `errorMsg` | varchar(255) | YES | NULL |  |  |
| `existMsg` | varchar(255) | YES | NULL |  |  |
| `invalidMsg` | varchar(255) | YES | NULL |  |  |
| `attributes` | varchar(255) | YES | NULL |  |  |
| `date` | date | NO | NULL |  |  |
| `isDefault` | int | NO | 0 |  |  |
| `gCaptcha` | int | NO | 0 |  |  |
| `gCaptcha_secret` | varchar(255) | YES | NULL |  |  |
| `gCaptcha_site` | varchar(255) | YES | NULL |  |  |
| `termAccept` | int | NO | 0 |  |  |
| `termsURL` | varchar(255) | YES | NULL |  |  |
| `requiredMsg` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_sib_model_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `email` | varchar(255) | YES | NULL |  |  |
| `code` | varchar(100) | YES | NULL |  |  |
| `listIDs` | longtext | YES | NULL |  |  |
| `redirectUrl` | varchar(255) | YES | NULL |  |  |
| `info` | text | YES | NULL |  |  |
| `frmid` | int | YES | NULL |  |  |
| `user_added_date` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_term_relationships

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `object_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_taxonomy_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_order` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | object_id | YES | BTREE |
| PRIMARY | term_taxonomy_id | YES | BTREE |
| term_taxonomy_id | term_taxonomy_id | NO | BTREE |

---

## wpleads_term_taxonomy

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_taxonomy_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `taxonomy` | varchar(32) | NO | NULL | MUL |  |
| `description` | longtext | NO | NULL |  |  |
| `parent` | bigint unsigned | NO | 0 |  |  |
| `count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | term_taxonomy_id | YES | BTREE |
| taxonomy | taxonomy | NO | BTREE |
| term_id_taxonomy | term_id | YES | BTREE |
| term_id_taxonomy | taxonomy | YES | BTREE |

---

## wpleads_termmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |
| term_id | term_id | NO | BTREE |

---

## wpleads_terms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | NO | NULL | MUL |  |
| `slug` | varchar(200) | NO | NULL | MUL |  |
| `term_group` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | NO | BTREE |
| PRIMARY | term_id | YES | BTREE |
| slug | slug | NO | BTREE |

---

## wpleads_usermeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `umeta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | umeta_id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## wpleads_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_login` | varchar(60) | NO | NULL | MUL |  |
| `user_pass` | varchar(64) | NO | NULL |  |  |
| `user_nicename` | varchar(50) | NO | NULL | MUL |  |
| `user_email` | varchar(100) | NO | NULL |  |  |
| `user_url` | varchar(100) | NO | NULL |  |  |
| `user_registered` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `user_activation_key` | varchar(60) | NO | NULL |  |  |
| `user_status` | int | NO | 0 |  |  |
| `display_name` | varchar(250) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |
| user_login_key | user_login | NO | BTREE |
| user_nicename | user_nicename | NO | BTREE |

---

## wpleads_wfblockediplog

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `IP` | binary(16) | NO | 0x | PRI |  |
| `countryCode` | varchar(2) | NO | NULL |  |  |
| `blockCount` | int unsigned | NO | 0 |  |  |
| `unixday` | int unsigned | NO | NULL | PRI |  |
| `blockType` | varchar(50) | NO | generic | PRI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | IP | YES | BTREE |
| PRIMARY | unixday | YES | BTREE |
| PRIMARY | blockType | YES | BTREE |

---

## wpleads_wfblocks7

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `type` | int unsigned | NO | 0 | MUL |  |
| `IP` | binary(16) | NO | 0x | MUL |  |
| `blockedTime` | bigint | NO | NULL |  |  |
| `reason` | varchar(255) | NO | NULL |  |  |
| `lastAttempt` | int unsigned | YES | 0 |  |  |
| `blockedHits` | int unsigned | YES | 0 |  |  |
| `expiration` | bigint unsigned | NO | 0 | MUL |  |
| `parameters` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| expiration | expiration | NO | BTREE |
| IP | IP | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| type | type | NO | BTREE |

---

## wpleads_wfconfig

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `name` | varchar(100) | NO | NULL | PRI |  |
| `val` | longblob | YES | NULL |  |  |
| `autoload` | enum('no','yes') | NO | yes |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | name | YES | BTREE |

---

## wpleads_wfcrawlers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `IP` | binary(16) | NO | 0x | PRI |  |
| `patternSig` | binary(16) | NO | NULL | PRI |  |
| `status` | char(8) | NO | NULL |  |  |
| `lastUpdate` | int unsigned | NO | NULL |  |  |
| `PTR` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | IP | YES | BTREE |
| PRIMARY | patternSig | YES | BTREE |

---

## wpleads_wffilechanges

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `filenameHash` | char(64) | NO | NULL | PRI |  |
| `file` | varchar(1000) | NO | NULL |  |  |
| `md5` | char(32) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | filenameHash | YES | BTREE |

---

## wpleads_wffilemods

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `filenameMD5` | binary(16) | NO | NULL | PRI |  |
| `filename` | varchar(1000) | NO | NULL |  |  |
| `real_path` | text | NO | NULL |  |  |
| `knownFile` | tinyint unsigned | NO | NULL |  |  |
| `oldMD5` | binary(16) | NO | NULL |  |  |
| `newMD5` | binary(16) | NO | NULL |  |  |
| `SHAC` | binary(32) | NO | 0x |  |  |
| `stoppedOnSignature` | varchar(255) | NO | NULL |  |  |
| `stoppedOnPosition` | int unsigned | NO | 0 |  |  |
| `isSafeFile` | varchar(1) | NO | ? |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | filenameMD5 | YES | BTREE |

---

## wpleads_wfhits

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `attackLogTime` | double(17,6) unsigned | NO | NULL | MUL |  |
| `ctime` | double(17,6) unsigned | NO | NULL | MUL |  |
| `IP` | binary(16) | YES | NULL | MUL |  |
| `jsRun` | tinyint | YES | 0 |  |  |
| `statusCode` | int | NO | 200 |  |  |
| `isGoogle` | tinyint | NO | NULL |  |  |
| `userID` | int unsigned | NO | NULL |  |  |
| `newVisit` | tinyint unsigned | NO | NULL |  |  |
| `URL` | text | YES | NULL |  |  |
| `referer` | text | YES | NULL |  |  |
| `UA` | text | YES | NULL |  |  |
| `action` | varchar(64) | NO | NULL |  |  |
| `actionDescription` | text | YES | NULL |  |  |
| `actionData` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| attackLogTime | attackLogTime | NO | BTREE |
| k1 | ctime | NO | BTREE |
| k2 | IP | NO | BTREE |
| k2 | ctime | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_wfhoover

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `owner` | text | YES | NULL |  |  |
| `host` | text | YES | NULL |  |  |
| `path` | text | YES | NULL |  |  |
| `hostKey` | varbinary(124) | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| k2 | hostKey | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_wfissues

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `time` | int unsigned | NO | NULL |  |  |
| `lastUpdated` | int unsigned | NO | NULL | MUL |  |
| `status` | varchar(10) | NO | NULL | MUL |  |
| `type` | varchar(20) | NO | NULL |  |  |
| `severity` | tinyint unsigned | NO | NULL |  |  |
| `ignoreP` | char(32) | NO | NULL | MUL |  |
| `ignoreC` | char(32) | NO | NULL | MUL |  |
| `shortMsg` | varchar(255) | NO | NULL |  |  |
| `longMsg` | text | YES | NULL |  |  |
| `data` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ignoreC | ignoreC | NO | BTREE |
| ignoreP | ignoreP | NO | BTREE |
| lastUpdated | lastUpdated | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| status | status | NO | BTREE |

---

## wpleads_wfknownfilelist

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `path` | text | NO | NULL |  |  |
| `wordpress_path` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wflivetraffichuman

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `IP` | binary(16) | NO | 0x | PRI |  |
| `identifier` | binary(32) | NO | 0x | PRI |  |
| `expiration` | int unsigned | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| expiration | expiration | NO | BTREE |
| PRIMARY | IP | YES | BTREE |
| PRIMARY | identifier | YES | BTREE |

---

## wpleads_wflocs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `IP` | binary(16) | NO | 0x | PRI |  |
| `ctime` | int unsigned | NO | NULL |  |  |
| `failed` | tinyint unsigned | NO | NULL |  |  |
| `city` | varchar(255) | YES | NULL |  |  |
| `region` | varchar(255) | YES | NULL |  |  |
| `countryName` | varchar(255) | YES | NULL |  |  |
| `countryCode` | char(2) | YES | NULL |  |  |
| `lat` | float(10,7) | YES | 0.0000000 |  |  |
| `lon` | float(10,7) | YES | 0.0000000 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | IP | YES | BTREE |

---

## wpleads_wflogins

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `hitID` | int | YES | NULL | MUL |  |
| `ctime` | double(17,6) unsigned | NO | NULL |  |  |
| `fail` | tinyint unsigned | NO | NULL |  |  |
| `action` | varchar(40) | NO | NULL |  |  |
| `username` | varchar(255) | NO | NULL |  |  |
| `userID` | int unsigned | NO | NULL |  |  |
| `IP` | binary(16) | YES | NULL | MUL |  |
| `UA` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| hitID | hitID | NO | BTREE |
| k1 | IP | NO | BTREE |
| k1 | fail | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_wfls_2fa_secrets

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | bigint unsigned | NO | NULL | MUL |  |
| `secret` | tinyblob | NO | NULL |  |  |
| `recovery` | blob | NO | NULL |  |  |
| `ctime` | int unsigned | NO | NULL |  |  |
| `vtime` | int unsigned | NO | NULL |  |  |
| `mode` | enum('authenticator') | NO | authenticator |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## wpleads_wfls_role_counts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `serialized_roles` | varbinary(255) | NO | NULL | PRI |  |
| `two_factor_inactive` | tinyint(1) | NO | NULL | PRI |  |
| `user_count` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | serialized_roles | YES | HASH |
| PRIMARY | two_factor_inactive | YES | HASH |

---

## wpleads_wfls_settings

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `name` | varchar(191) | NO | NULL | PRI |  |
| `value` | longblob | YES | NULL |  |  |
| `autoload` | enum('no','yes') | NO | yes |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | name | YES | BTREE |

---

## wpleads_wfnotifications

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | varchar(32) | NO | NULL | PRI |  |
| `new` | tinyint unsigned | NO | 1 |  |  |
| `category` | varchar(255) | NO | NULL |  |  |
| `priority` | int | NO | 1000 |  |  |
| `ctime` | int unsigned | NO | NULL |  |  |
| `html` | text | NO | NULL |  |  |
| `links` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wfpendingissues

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `time` | int unsigned | NO | NULL |  |  |
| `lastUpdated` | int unsigned | NO | NULL | MUL |  |
| `status` | varchar(10) | NO | NULL | MUL |  |
| `type` | varchar(20) | NO | NULL |  |  |
| `severity` | tinyint unsigned | NO | NULL |  |  |
| `ignoreP` | char(32) | NO | NULL | MUL |  |
| `ignoreC` | char(32) | NO | NULL | MUL |  |
| `shortMsg` | varchar(255) | NO | NULL |  |  |
| `longMsg` | text | YES | NULL |  |  |
| `data` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ignoreC | ignoreC | NO | BTREE |
| ignoreP | ignoreP | NO | BTREE |
| lastUpdated | lastUpdated | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| status | status | NO | BTREE |

---

## wpleads_wfreversecache

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `IP` | binary(16) | NO | 0x | PRI |  |
| `host` | varchar(255) | NO | NULL |  |  |
| `lastUpdate` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | IP | YES | BTREE |

---

## wpleads_wfsecurityevents

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `type` | varchar(255) | NO | NULL |  |  |
| `data` | text | NO | NULL |  |  |
| `event_time` | double(14,4) | NO | NULL |  |  |
| `state` | enum('new','sending','sent') | NO | new |  |  |
| `state_timestamp` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wfsnipcache

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `IP` | varchar(45) | NO | NULL | MUL |  |
| `expiration` | timestamp | NO | CURRENT_TIMESTAMP | MUL | DEFAULT_GENERATED |
| `body` | varchar(255) | NO | NULL |  |  |
| `count` | int unsigned | NO | 0 |  |  |
| `type` | int unsigned | NO | 0 | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| expiration | expiration | NO | BTREE |
| IP | IP | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| type | type | NO | BTREE |

---

## wpleads_wfstatus

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `ctime` | double(17,6) unsigned | NO | NULL | MUL |  |
| `level` | tinyint unsigned | NO | NULL |  |  |
| `type` | char(5) | NO | NULL | MUL |  |
| `msg` | varchar(1000) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| k1 | ctime | NO | BTREE |
| k2 | type | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_wftrafficrates

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `eMin` | int unsigned | NO | NULL | PRI |  |
| `IP` | binary(16) | NO | 0x | PRI |  |
| `hitType` | enum('hit','404') | NO | hit | PRI |  |
| `hits` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | eMin | YES | BTREE |
| PRIMARY | IP | YES | BTREE |
| PRIMARY | hitType | YES | BTREE |

---

## wpleads_wfwaffailures

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `throwable` | text | NO | NULL |  |  |
| `rule_id` | int unsigned | YES | NULL |  |  |
| `timestamp` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpc_client_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `parent_id` | int | NO | 0 |  |  |
| `name` | text | YES | NULL |  |  |
| `type` | enum('file','portal_page','shutter','shutter_size','ticket_cats','ticket_types') | NO | NULL |  |  |
| `cat_order` | int | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpc_client_chains

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `subject` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpc_client_clients_page

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | mediumint | NO | NULL | PRI | auto_increment |
| `pagename` | tinytext | NO | NULL |  |  |
| `template` | tinytext | NO | NULL |  |  |
| `users` | tinytext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpc_client_comments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL |  |  |
| `page_id` | int | NO | NULL |  |  |
| `time` | text | NO | NULL |  |  |
| `comment` | text | NO | NULL |  |  |
| `sent_from` | int | YES | NULL |  |  |
| `sent_to` | int | YES | NULL |  |  |
| `new_flag` | int | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpc_client_file_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `cat_id` | int | NO | NULL | PRI | auto_increment |
| `cat_name` | text | YES | NULL |  |  |
| `folder_name` | text | YES | NULL |  |  |
| `cat_order` | int | YES | NULL |  |  |
| `parent_id` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | cat_id | YES | BTREE |

---

## wpleads_wpc_client_files

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `order_id` | int | YES | NULL |  |  |
| `user_id` | int | NO | NULL |  |  |
| `page_id` | int | NO | NULL |  |  |
| `time` | text | NO | NULL |  |  |
| `last_download` | text | YES | NULL |  |  |
| `size` | int | NO | NULL |  |  |
| `filename` | text | NO | NULL |  |  |
| `name` | text | NO | NULL |  |  |
| `title` | varchar(255) | YES | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `cat_id` | int | YES | NULL |  |  |
| `protect_url` | tinyint(1) | YES | NULL |  |  |
| `external` | tinyint(1) | YES | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpc_client_files_download_log

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `file_id` | int | NO | NULL |  |  |
| `client_id` | int | NO | NULL |  |  |
| `download_date` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpc_client_group_clients

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `group_id` | int | NO | NULL |  |  |
| `client_id` | int | NO | NULL |  |  |

---

## wpleads_wpc_client_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `group_id` | int | NO | NULL | PRI | auto_increment |
| `group_name` | varchar(255) | NO | NULL |  |  |
| `auto_select` | varchar(1) | YES | NULL |  |  |
| `auto_add_files` | varchar(1) | YES | NULL |  |  |
| `auto_add_pps` | varchar(1) | YES | NULL |  |  |
| `auto_add_manual` | varchar(1) | YES | NULL |  |  |
| `auto_add_self` | varchar(1) | YES | NULL |  |  |
| `auto_add_to_manager` | int | NO | 0 |  |  |
| `notification` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | group_id | YES | BTREE |

---

## wpleads_wpc_client_login_redirects

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `rul_type` | enum('user','circle','role','level','all') | NO | NULL | PRI |  |
| `rul_value` | varchar(255) | NO | NULL | PRI |  |
| `rul_url` | longtext | YES | NULL |  |  |
| `rul_url_logout` | longtext | YES | NULL |  |  |
| `rul_order` | int | NO | 0 |  |  |
| `rul_first_url` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| rul_type | rul_type | YES | BTREE |
| rul_type | rul_value | YES | BTREE |

---

## wpleads_wpc_client_messages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `chain_id` | int | NO | NULL |  |  |
| `author_id` | int | NO | NULL |  |  |
| `content` | text | NO | NULL |  |  |
| `date` | text | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpc_client_objects_assigns

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `object_type` | enum('file','file_category','portal_page','portal_page_category','post_category','portalhub','ez_hub','manager','feedback_wizard','invoice','accum_invoice','repeat_invoice','estimate','request_estimate','shutter','shutter_category','form','brand','campaign','shutter_order','chain','new_message','trash_chain','archive_chain','ticket','private_post','ams_service','ams_level') | NO | NULL |  |  |
| `object_id` | bigint | YES | NULL | MUL |  |
| `assign_type` | enum('circle','client','email_list') | NO | NULL |  |  |
| `assign_id` | bigint | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| assignid | assign_id | NO | BTREE |
| objectid | object_id | NO | BTREE |
| objectid_assignid | object_id | NO | BTREE |
| objectid_assignid | assign_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpc_client_payments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `order_id` | varchar(50) | YES | NULL |  |  |
| `order_status` | varchar(30) | YES | NULL |  |  |
| `function` | varchar(50) | YES | NULL |  |  |
| `payment_method` | varchar(50) | YES | NULL |  |  |
| `payment_type` | varchar(64) | YES | NULL |  |  |
| `client_id` | int | YES | NULL |  |  |
| `amount` | varchar(30) | YES | NULL |  |  |
| `currency` | varchar(10) | YES | NULL |  |  |
| `data` | text | YES | NULL |  |  |
| `transaction_id` | text | YES | NULL |  |  |
| `transaction_status` | text | YES | NULL |  |  |
| `time_created` | text | YES | NULL |  |  |
| `time_paid` | text | YES | NULL |  |  |
| `subscription_id` | varchar(50) | YES | NULL |  |  |
| `subscription_status` | varchar(50) | YES | NULL |  |  |
| `next_payment_date` | varchar(25) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpc_client_portal_page_categories

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `cat_id` | int | NO | NULL | PRI | auto_increment |
| `cat_name` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | cat_id | YES | BTREE |

---

## wpleads_wpc_temp_ids

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `block_key` | varchar(32) | YES | NULL |  |  |
| `id` | int | NO | 0 |  |  |

---

## wpleads_wpforms_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `title` | varchar(255) | NO | NULL |  |  |
| `message` | longtext | NO | NULL |  |  |
| `types` | varchar(255) | NO | NULL |  |  |
| `create_at` | datetime | NO | NULL |  |  |
| `form_id` | bigint | YES | NULL |  |  |
| `entry_id` | bigint | YES | NULL |  |  |
| `user_id` | bigint | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpforms_payment_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `payment_id` | bigint | NO | NULL | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| meta_value | meta_value | NO | BTREE |
| payment_id | payment_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpforms_payments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `form_id` | bigint | NO | NULL | MUL |  |
| `status` | varchar(10) | NO | NULL | MUL |  |
| `subtotal_amount` | decimal(26,8) | NO | 0.00000000 |  |  |
| `discount_amount` | decimal(26,8) | NO | 0.00000000 |  |  |
| `total_amount` | decimal(26,8) | NO | 0.00000000 | MUL |  |
| `currency` | varchar(3) | NO | NULL |  |  |
| `entry_id` | bigint | NO | 0 |  |  |
| `gateway` | varchar(20) | NO | NULL |  |  |
| `type` | varchar(12) | NO | NULL | MUL |  |
| `mode` | varchar(4) | NO | NULL |  |  |
| `transaction_id` | varchar(40) | NO | NULL | MUL |  |
| `customer_id` | varchar(40) | NO | NULL | MUL |  |
| `subscription_id` | varchar(40) | NO | NULL | MUL |  |
| `subscription_status` | varchar(10) | NO | NULL | MUL |  |
| `title` | varchar(255) | NO | NULL | MUL |  |
| `date_created_gmt` | datetime | NO | NULL |  |  |
| `date_updated_gmt` | datetime | NO | NULL |  |  |
| `is_published` | tinyint(1) | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| customer_id | customer_id | NO | BTREE |
| form_id | form_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| status | status | NO | BTREE |
| subscription_id | subscription_id | NO | BTREE |
| subscription_status | subscription_status | NO | BTREE |
| title | title | NO | BTREE |
| total_amount | total_amount | NO | BTREE |
| transaction_id | transaction_id | NO | BTREE |
| type | type | NO | BTREE |

---

## wpleads_wpforms_tasks_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `action` | varchar(255) | NO | NULL |  |  |
| `data` | longtext | NO | NULL |  |  |
| `date` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpforo_accesses

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `accessid` | int unsigned | NO | NULL | PRI | auto_increment |
| `access` | varchar(255) | NO | NULL | UNI |  |
| `title` | varchar(255) | NO | NULL |  |  |
| `cans` | longtext | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| access | access | YES | BTREE |
| PRIMARY | accessid | YES | BTREE |

---

## wpleads_wpforo_activity

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `type` | varchar(60) | NO | NULL | MUL |  |
| `itemid` | bigint unsigned | NO | NULL |  |  |
| `itemtype` | varchar(60) | NO | NULL | MUL |  |
| `itemid_second` | bigint unsigned | NO | 0 |  |  |
| `userid` | bigint unsigned | NO | 0 |  |  |
| `name` | varchar(60) | NO | NULL |  |  |
| `email` | varchar(70) | NO | NULL |  |  |
| `date` | int unsigned | NO | 0 | MUL |  |
| `content` | text | YES | NULL |  |  |
| `permalink` | varchar(255) | NO | NULL |  |  |
| `new` | tinyint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| date | date | NO | BTREE |
| itemtype_userid_new | itemtype | NO | BTREE |
| itemtype_userid_new | userid | NO | BTREE |
| itemtype_userid_new | new | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| type | type | NO | BTREE |
| type_objid_objtype | type | NO | BTREE |
| type_objid_objtype | itemid | NO | BTREE |
| type_objid_objtype | itemtype | NO | BTREE |
| type_objid_objtype_userid | type | NO | BTREE |
| type_objid_objtype_userid | itemid | NO | BTREE |
| type_objid_objtype_userid | itemtype | NO | BTREE |
| type_objid_objtype_userid | userid | NO | BTREE |

---

## wpleads_wpforo_forums

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `forumid` | int unsigned | NO | NULL | PRI | auto_increment |
| `title` | varchar(255) | NO | NULL |  |  |
| `slug` | varchar(255) | NO | NULL | UNI |  |
| `description` | longtext | YES | NULL |  |  |
| `parentid` | int unsigned | NO | 0 | MUL |  |
| `icon` | varchar(255) | YES | NULL |  |  |
| `last_topicid` | int unsigned | NO | 0 |  |  |
| `last_postid` | int unsigned | NO | 0 | MUL |  |
| `last_userid` | int unsigned | NO | 0 |  |  |
| `last_post_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `topics` | int | NO | 0 |  |  |
| `posts` | int | NO | 0 |  |  |
| `permissions` | text | YES | NULL |  |  |
| `meta_key` | text | YES | NULL |  |  |
| `meta_desc` | text | YES | NULL |  |  |
| `status` | tinyint unsigned | NO | 0 | MUL |  |
| `is_cat` | tinyint unsigned | NO | 0 | MUL |  |
| `cat_layout` | tinyint unsigned | NO | 0 |  |  |
| `order` | int unsigned | NO | 0 | MUL |  |
| `color` | varchar(7) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| is_cat | is_cat | NO | BTREE |
| last_postid | last_postid | NO | BTREE |
| order | order | NO | BTREE |
| parentid | parentid | NO | BTREE |
| PRIMARY | forumid | YES | BTREE |
| status | status | NO | BTREE |
| UNIQUE SLUG | slug | YES | BTREE |

---

## wpleads_wpforo_languages

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `langid` | int unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(255) | NO | NULL | UNI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | langid | YES | BTREE |
| UNIQUE language name | name | YES | BTREE |

---

## wpleads_wpforo_likes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `likeid` | int unsigned | NO | NULL | PRI | auto_increment |
| `userid` | int unsigned | NO | NULL | MUL |  |
| `postid` | int unsigned | NO | NULL |  |  |
| `post_userid` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | likeid | YES | BTREE |
| userid | userid | YES | BTREE |
| userid | postid | YES | BTREE |
| userid_2 | userid | YES | BTREE |
| userid_2 | postid | YES | BTREE |

---

## wpleads_wpforo_phrases

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `phraseid` | int unsigned | NO | NULL | PRI | auto_increment |
| `langid` | int unsigned | NO | NULL | MUL |  |
| `phrase_key` | text | YES | NULL | MUL |  |
| `phrase_value` | text | NO | NULL |  |  |
| `package` | varchar(255) | NO | wpforo |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| langid | langid | NO | BTREE |
| lng_and_key_uniq | langid | YES | BTREE |
| lng_and_key_uniq | phrase_key | YES | BTREE |
| phrase_key | phrase_key | NO | BTREE |
| PRIMARY | phraseid | YES | BTREE |

---

## wpleads_wpforo_post_revisions

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `revisionid` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `userid` | bigint unsigned | NO | 0 | MUL |  |
| `textareaid` | varchar(50) | NO | NULL |  |  |
| `postid` | bigint unsigned | NO | 0 |  |  |
| `body` | longtext | YES | NULL |  |  |
| `created` | int unsigned | NO | 0 |  |  |
| `version` | smallint | NO | 0 |  |  |
| `email` | varchar(50) | NO | NULL |  |  |
| `url` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | revisionid | YES | BTREE |
| userid_textareaid_postid_email | userid | NO | BTREE |
| userid_textareaid_postid_email | textareaid | NO | BTREE |
| userid_textareaid_postid_email | postid | NO | BTREE |
| userid_textareaid_postid_email | email | NO | BTREE |
| userid_textareaid_postid_email | url | NO | BTREE |

---

## wpleads_wpforo_postmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `metaid` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `postid` | bigint unsigned | NO | NULL | MUL |  |
| `metakey` | varchar(255) | NO | NULL |  |  |
| `metavalue` | mediumtext | YES | NULL |  |  |
| `forumid` | int unsigned | NO | 0 | MUL |  |
| `topicid` | bigint unsigned | NO | 0 | MUL |  |
| `is_first_post` | tinyint unsigned | NO | 0 | MUL |  |
| `status` | tinyint unsigned | NO | 0 | MUL |  |
| `private` | tinyint unsigned | NO | 0 | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| forumid | forumid | NO | BTREE |
| is_first_post | is_first_post | NO | BTREE |
| postid_metakey | postid | NO | BTREE |
| postid_metakey | metakey | NO | BTREE |
| PRIMARY | metaid | YES | BTREE |
| private | private | NO | BTREE |
| status | status | NO | BTREE |
| topicid | topicid | NO | BTREE |

---

## wpleads_wpforo_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `postid` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `parentid` | bigint unsigned | NO | 0 | MUL |  |
| `forumid` | int unsigned | NO | NULL | MUL |  |
| `topicid` | bigint unsigned | NO | NULL | MUL |  |
| `userid` | int unsigned | NO | NULL | MUL |  |
| `title` | varchar(255) | YES | NULL | MUL |  |
| `body` | longtext | YES | NULL | MUL |  |
| `created` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `likes` | int unsigned | NO | 0 |  |  |
| `votes` | int | NO | 0 |  |  |
| `is_answer` | tinyint unsigned | NO | 0 | MUL |  |
| `is_first_post` | tinyint unsigned | NO | 0 | MUL |  |
| `status` | tinyint unsigned | NO | 0 | MUL |  |
| `name` | varchar(50) | NO | NULL |  |  |
| `email` | varchar(50) | NO | NULL | MUL |  |
| `private` | tinyint unsigned | NO | 0 | MUL |  |
| `root` | bigint | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| body | body | NO | FULLTEXT |
| created | created | NO | BTREE |
| email | email | NO | BTREE |
| forumid | forumid | NO | BTREE |
| forumid_status | forumid | NO | BTREE |
| forumid_status | status | NO | BTREE |
| forumid_status_private | forumid | NO | BTREE |
| forumid_status_private | status | NO | BTREE |
| forumid_status_private | private | NO | BTREE |
| is_answer | is_answer | NO | BTREE |
| is_first_post | is_first_post | NO | BTREE |
| is_private | private | NO | BTREE |
| parentid | parentid | NO | BTREE |
| PRIMARY | postid | YES | BTREE |
| root | root | NO | BTREE |
| status | status | NO | BTREE |
| title | title | NO | FULLTEXT |
| title_plus_body | title | NO | FULLTEXT |
| title_plus_body | body | NO | FULLTEXT |
| topicid | topicid | NO | BTREE |
| topicid_parentid | topicid | NO | BTREE |
| topicid_parentid | parentid | NO | BTREE |
| topicid_solved | topicid | NO | BTREE |
| topicid_solved | is_answer | NO | BTREE |
| topicid_status | topicid | NO | BTREE |
| topicid_status | status | NO | BTREE |
| userid | userid | NO | BTREE |

---

## wpleads_wpforo_profiles

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `userid` | int unsigned | NO | NULL | PRI |  |
| `title` | varchar(255) | NO | member |  |  |
| `username` | varchar(255) | NO | NULL |  |  |
| `groupid` | int unsigned | NO | NULL | MUL |  |
| `posts` | int | NO | 0 | MUL |  |
| `questions` | int | NO | 0 |  |  |
| `answers` | int | NO | 0 |  |  |
| `comments` | int | NO | 0 |  |  |
| `site` | varchar(255) | YES | NULL |  |  |
| `icq` | varchar(255) | YES | NULL |  |  |
| `aim` | varchar(255) | YES | NULL |  |  |
| `yahoo` | varchar(255) | YES | NULL |  |  |
| `msn` | varchar(255) | YES | NULL |  |  |
| `facebook` | varchar(255) | YES | NULL |  |  |
| `twitter` | varchar(255) | YES | NULL |  |  |
| `gtalk` | varchar(255) | YES | NULL |  |  |
| `skype` | varchar(255) | YES | NULL |  |  |
| `avatar` | varchar(255) | YES | NULL |  |  |
| `signature` | text | YES | NULL |  |  |
| `about` | text | YES | NULL |  |  |
| `occupation` | text | YES | NULL |  |  |
| `location` | varchar(255) | YES | NULL |  |  |
| `last_login` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `online_time` | int unsigned | YES | NULL | MUL |  |
| `rank` | int unsigned | NO | 0 |  |  |
| `like` | int unsigned | NO | 0 |  |  |
| `status` | varchar(8) | YES | active | MUL |  |
| `timezone` | varchar(255) | YES | NULL |  |  |
| `is_email_confirmed` | tinyint(1) | NO | 0 | MUL |  |
| `secondary_groups` | varchar(255) | YES | NULL |  |  |
| `fields` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| groupid | groupid | NO | BTREE |
| is_email_confirmed | is_email_confirmed | NO | BTREE |
| online_time | online_time | NO | BTREE |
| posts | posts | NO | BTREE |
| PRIMARY | userid | YES | BTREE |
| status | status | NO | BTREE |

---

## wpleads_wpforo_subscribes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `subid` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `itemid` | bigint unsigned | NO | NULL | MUL |  |
| `type` | varchar(50) | NO | NULL |  |  |
| `confirmkey` | varchar(32) | NO | NULL | UNI |  |
| `userid` | bigint unsigned | NO | NULL | MUL |  |
| `active` | tinyint unsigned | NO | 0 |  |  |
| `user_name` | varchar(60) | NO | NULL |  |  |
| `user_email` | varchar(60) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| confirmkey | confirmkey | YES | BTREE |
| fld_group_unq | itemid | YES | BTREE |
| fld_group_unq | type | YES | BTREE |
| fld_group_unq | userid | YES | BTREE |
| fld_group_unq | user_email | YES | BTREE |
| itemid_2 | itemid | NO | BTREE |
| PRIMARY | subid | YES | BTREE |
| userid | userid | NO | BTREE |

---

## wpleads_wpforo_tags

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `tagid` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `tag` | varchar(255) | NO | NULL | UNI |  |
| `prefix` | tinyint unsigned | NO | 0 | MUL |  |
| `count` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| prefix | prefix | NO | BTREE |
| PRIMARY | tagid | YES | BTREE |
| tag | tag | YES | BTREE |

---

## wpleads_wpforo_topics

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `topicid` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `forumid` | int unsigned | NO | NULL | MUL |  |
| `first_postid` | bigint unsigned | NO | 0 | MUL |  |
| `userid` | int unsigned | NO | NULL | MUL |  |
| `title` | varchar(255) | NO | NULL | MUL |  |
| `slug` | varchar(255) | NO | NULL | MUL |  |
| `created` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `modified` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `last_post` | bigint unsigned | NO | 0 | MUL |  |
| `posts` | int | NO | 0 |  |  |
| `votes` | int | NO | 0 |  |  |
| `answers` | int | NO | 0 |  |  |
| `views` | int unsigned | NO | 0 |  |  |
| `meta_key` | text | YES | NULL |  |  |
| `meta_desc` | text | YES | NULL |  |  |
| `type` | tinyint | NO | 0 | MUL |  |
| `solved` | tinyint(1) | NO | 0 | MUL |  |
| `closed` | tinyint unsigned | NO | 0 |  |  |
| `has_attach` | tinyint unsigned | NO | 0 |  |  |
| `private` | tinyint unsigned | NO | 0 | MUL |  |
| `status` | tinyint unsigned | NO | 0 | MUL |  |
| `name` | varchar(50) | NO | NULL |  |  |
| `email` | varchar(50) | NO | NULL | MUL |  |
| `prefix` | varchar(100) | NO | NULL | MUL |  |
| `tags` | text | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| created | created | NO | BTREE |
| email | email | NO | BTREE |
| first_postid | first_postid | NO | BTREE |
| forumid | forumid | NO | BTREE |
| forumid_status | forumid | NO | BTREE |
| forumid_status | status | NO | BTREE |
| forumid_status_private | forumid | NO | BTREE |
| forumid_status_private | status | NO | BTREE |
| forumid_status_private | private | NO | BTREE |
| is_private | private | NO | BTREE |
| last_post | last_post | NO | BTREE |
| modified | modified | NO | BTREE |
| own_private | userid | NO | BTREE |
| own_private | private | NO | BTREE |
| prefix | prefix | NO | BTREE |
| PRIMARY | topicid | YES | BTREE |
| slug | slug | NO | BTREE |
| solved | solved | NO | BTREE |
| status | status | NO | BTREE |
| tags | tags | NO | BTREE |
| title | title | NO | FULLTEXT |
| type | type | NO | BTREE |

---

## wpleads_wpforo_usergroups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `groupid` | int unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(255) | NO | NULL | UNI |  |
| `cans` | longtext | NO | NULL |  |  |
| `description` | text | YES | NULL |  |  |
| `utitle` | varchar(100) | NO | NULL |  |  |
| `role` | varchar(50) | NO | NULL |  |  |
| `access` | varchar(50) | NO | NULL |  |  |
| `color` | varchar(7) | NO | NULL |  |  |
| `visible` | tinyint unsigned | NO | 1 | MUL |  |
| `secondary` | tinyint(1) | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | groupid | YES | BTREE |
| UNIQUE_GROUP_NAME | name | YES | BTREE |
| visible | visible | NO | BTREE |

---

## wpleads_wpforo_views

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `vid` | int unsigned | NO | NULL | PRI | auto_increment |
| `userid` | int unsigned | NO | NULL | MUL |  |
| `topicid` | int unsigned | NO | NULL | MUL |  |
| `created` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | vid | YES | BTREE |
| topicid | topicid | NO | BTREE |
| user_topic | userid | NO | BTREE |
| user_topic | topicid | NO | BTREE |
| userid | userid | NO | BTREE |
| userid_2 | userid | YES | BTREE |
| userid_2 | topicid | YES | BTREE |

---

## wpleads_wpforo_visits

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `userid` | bigint unsigned | NO | NULL | MUL |  |
| `name` | varchar(60) | NO | NULL |  |  |
| `ip` | varchar(60) | NO | NULL | MUL |  |
| `time` | int unsigned | NO | NULL | MUL |  |
| `forumid` | int unsigned | NO | NULL | MUL |  |
| `topicid` | bigint unsigned | NO | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| forumid | forumid | NO | BTREE |
| ip | ip | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| time | time | NO | BTREE |
| time_forumid | time | NO | BTREE |
| time_forumid | forumid | NO | BTREE |
| time_topicid | time | NO | BTREE |
| time_topicid | topicid | NO | BTREE |
| topicid | topicid | NO | BTREE |
| unique_tracking | userid | YES | BTREE |
| unique_tracking | ip | YES | BTREE |
| unique_tracking | forumid | YES | BTREE |
| unique_tracking | topicid | YES | BTREE |
| userid | userid | NO | BTREE |

---

## wpleads_wpforo_votes

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `voteid` | int unsigned | NO | NULL | PRI | auto_increment |
| `userid` | int unsigned | NO | NULL | MUL |  |
| `postid` | int unsigned | NO | NULL |  |  |
| `reaction` | tinyint | NO | 1 |  |  |
| `post_userid` | int unsigned | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | voteid | YES | BTREE |
| unique_vote | userid | YES | BTREE |
| unique_vote | postid | YES | BTREE |
| unique_vote | reaction | YES | BTREE |

---

## wpleads_wpmailsmtp_debug_events

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `content` | text | YES | NULL |  |  |
| `initiator` | text | YES | NULL |  |  |
| `event_type` | tinyint unsigned | NO | 0 |  |  |
| `created_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpmailsmtp_tasks_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint | NO | NULL | PRI | auto_increment |
| `action` | varchar(255) | NO | NULL |  |  |
| `data` | longtext | NO | NULL |  |  |
| `date` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wpleads_wpmm_subscribers

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id_subscriber` | bigint | NO | NULL | PRI | auto_increment |
| `email` | varchar(50) | NO | NULL |  |  |
| `insert_date` | datetime | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id_subscriber | YES | BTREE |

---

## wpleads_wsluserscontacts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL | MUL |  |
| `provider` | varchar(50) | NO | NULL |  |  |
| `identifier` | varchar(255) | NO | NULL |  |  |
| `full_name` | varchar(150) | NO | NULL |  |  |
| `email` | varchar(255) | NO | NULL |  |  |
| `profile_url` | varchar(255) | NO | NULL |  |  |
| `photo_url` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## wpleads_wslusersprofiles

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `user_id` | int | NO | NULL | MUL |  |
| `provider` | varchar(50) | NO | NULL | MUL |  |
| `object_sha` | varchar(45) | NO | NULL |  |  |
| `identifier` | varchar(255) | NO | NULL |  |  |
| `profileurl` | varchar(255) | NO | NULL |  |  |
| `websiteurl` | varchar(255) | NO | NULL |  |  |
| `photourl` | varchar(255) | NO | NULL |  |  |
| `displayname` | varchar(150) | NO | NULL |  |  |
| `description` | varchar(255) | NO | NULL |  |  |
| `firstname` | varchar(150) | NO | NULL |  |  |
| `lastname` | varchar(150) | NO | NULL |  |  |
| `gender` | varchar(10) | NO | NULL |  |  |
| `language` | varchar(20) | NO | NULL |  |  |
| `age` | varchar(10) | NO | NULL |  |  |
| `birthday` | int | NO | NULL |  |  |
| `birthmonth` | int | NO | NULL |  |  |
| `birthyear` | int | NO | NULL |  |  |
| `email` | varchar(255) | NO | NULL |  |  |
| `emailverified` | varchar(255) | NO | NULL |  |  |
| `phone` | varchar(75) | NO | NULL |  |  |
| `address` | varchar(255) | NO | NULL |  |  |
| `country` | varchar(75) | NO | NULL |  |  |
| `region` | varchar(50) | NO | NULL |  |  |
| `city` | varchar(50) | NO | NULL |  |  |
| `zip` | varchar(25) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| id | id | YES | BTREE |
| provider | provider | NO | BTREE |
| user_id | user_id | NO | BTREE |

---

## wpleads_yoast_indexable

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `permalink` | longtext | YES | NULL |  |  |
| `permalink_hash` | varchar(40) | YES | NULL | MUL |  |
| `object_id` | bigint | YES | NULL | MUL |  |
| `object_type` | varchar(32) | NO | NULL | MUL |  |
| `object_sub_type` | varchar(32) | YES | NULL |  |  |
| `author_id` | bigint | YES | NULL |  |  |
| `post_parent` | bigint | YES | NULL | MUL |  |
| `title` | text | YES | NULL |  |  |
| `description` | mediumtext | YES | NULL |  |  |
| `breadcrumb_title` | text | YES | NULL |  |  |
| `post_status` | varchar(20) | YES | NULL |  |  |
| `is_public` | tinyint(1) | YES | NULL |  |  |
| `is_protected` | tinyint(1) | YES | 0 |  |  |
| `has_public_posts` | tinyint(1) | YES | NULL |  |  |
| `number_of_pages` | int unsigned | YES | NULL |  |  |
| `canonical` | longtext | YES | NULL |  |  |
| `primary_focus_keyword` | varchar(191) | YES | NULL |  |  |
| `primary_focus_keyword_score` | int | YES | NULL |  |  |
| `readability_score` | int | YES | NULL |  |  |
| `is_cornerstone` | tinyint(1) | YES | 0 |  |  |
| `is_robots_noindex` | tinyint(1) | YES | 0 |  |  |
| `is_robots_nofollow` | tinyint(1) | YES | 0 |  |  |
| `is_robots_noarchive` | tinyint(1) | YES | 0 |  |  |
| `is_robots_noimageindex` | tinyint(1) | YES | 0 |  |  |
| `is_robots_nosnippet` | tinyint(1) | YES | 0 |  |  |
| `twitter_title` | text | YES | NULL |  |  |
| `twitter_image` | longtext | YES | NULL |  |  |
| `twitter_description` | longtext | YES | NULL |  |  |
| `twitter_image_id` | varchar(191) | YES | NULL |  |  |
| `twitter_image_source` | text | YES | NULL |  |  |
| `open_graph_title` | text | YES | NULL |  |  |
| `open_graph_description` | longtext | YES | NULL |  |  |
| `open_graph_image` | longtext | YES | NULL |  |  |
| `open_graph_image_id` | varchar(191) | YES | NULL |  |  |
| `open_graph_image_source` | text | YES | NULL |  |  |
| `open_graph_image_meta` | mediumtext | YES | NULL |  |  |
| `link_count` | int | YES | NULL |  |  |
| `incoming_link_count` | int | YES | NULL |  |  |
| `prominent_words_version` | int unsigned | YES | NULL | MUL |  |
| `created_at` | datetime | YES | NULL |  |  |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `blog_id` | bigint | NO | 1 |  |  |
| `language` | varchar(32) | YES | NULL |  |  |
| `region` | varchar(32) | YES | NULL |  |  |
| `schema_page_type` | varchar(64) | YES | NULL |  |  |
| `schema_article_type` | varchar(64) | YES | NULL |  |  |
| `has_ancestors` | tinyint(1) | YES | 0 |  |  |
| `estimated_reading_time_minutes` | int | YES | NULL |  |  |
| `version` | int | YES | 1 |  |  |
| `object_last_modified` | datetime | YES | NULL |  |  |
| `object_published_at` | datetime | YES | NULL | MUL |  |
| `inclusive_language_score` | int | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| object_id_and_type | object_id | NO | BTREE |
| object_id_and_type | object_type | NO | BTREE |
| object_type_and_sub_type | object_type | NO | BTREE |
| object_type_and_sub_type | object_sub_type | NO | BTREE |
| permalink_hash_and_object_type | permalink_hash | NO | BTREE |
| permalink_hash_and_object_type | object_type | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| prominent_words | prominent_words_version | NO | BTREE |
| prominent_words | object_type | NO | BTREE |
| prominent_words | object_sub_type | NO | BTREE |
| prominent_words | post_status | NO | BTREE |
| published_sitemap_index | object_published_at | NO | BTREE |
| published_sitemap_index | is_robots_noindex | NO | BTREE |
| published_sitemap_index | object_type | NO | BTREE |
| published_sitemap_index | object_sub_type | NO | BTREE |
| subpages | post_parent | NO | BTREE |
| subpages | object_type | NO | BTREE |
| subpages | post_status | NO | BTREE |
| subpages | object_id | NO | BTREE |

---

## wpleads_yoast_indexable_hierarchy

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `indexable_id` | int unsigned | NO | NULL | PRI |  |
| `ancestor_id` | int unsigned | NO | NULL | PRI |  |
| `depth` | int unsigned | YES | NULL | MUL |  |
| `blog_id` | bigint | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| ancestor_id | ancestor_id | NO | BTREE |
| depth | depth | NO | BTREE |
| indexable_id | indexable_id | NO | BTREE |
| PRIMARY | indexable_id | YES | BTREE |
| PRIMARY | ancestor_id | YES | BTREE |

---

## wpleads_yoast_migrations

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `version` | varchar(191) | YES | NULL | UNI |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| idx_wpleads_yoast_migrations_version | version | YES | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_yoast_primary_term

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint | YES | NULL | MUL |  |
| `term_id` | bigint | YES | NULL |  |  |
| `taxonomy` | varchar(32) | NO | NULL |  |  |
| `created_at` | datetime | YES | NULL |  |  |
| `updated_at` | timestamp | NO | CURRENT_TIMESTAMP |  | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| `blog_id` | bigint | NO | 1 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| post_taxonomy | post_id | NO | BTREE |
| post_taxonomy | taxonomy | NO | BTREE |
| post_term | post_id | NO | BTREE |
| post_term | term_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_yoast_seo_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `url` | varchar(255) | NO | NULL |  |  |
| `post_id` | bigint unsigned | NO | NULL | MUL |  |
| `target_post_id` | bigint unsigned | NO | NULL |  |  |
| `type` | varchar(8) | NO | NULL |  |  |
| `indexable_id` | int unsigned | YES | NULL | MUL |  |
| `target_indexable_id` | int unsigned | YES | NULL |  |  |
| `height` | int unsigned | YES | NULL |  |  |
| `width` | int unsigned | YES | NULL |  |  |
| `size` | int unsigned | YES | NULL |  |  |
| `language` | varchar(32) | YES | NULL |  |  |
| `region` | varchar(32) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| indexable_link_direction | indexable_id | NO | BTREE |
| indexable_link_direction | type | NO | BTREE |
| link_direction | post_id | NO | BTREE |
| link_direction | type | NO | BTREE |
| PRIMARY | id | YES | BTREE |

---

## wpleads_yoast_seo_meta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `object_id` | bigint unsigned | NO | NULL | PRI |  |
| `internal_link_count` | int unsigned | YES | NULL |  |  |
| `incoming_link_count` | int unsigned | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| object_id | object_id | YES | BTREE |

---

## wplogin_commentmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_id | comment_id | NO | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wplogin_comments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `comment_ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_post_ID` | bigint unsigned | NO | 0 | MUL |  |
| `comment_author` | tinytext | NO | NULL |  |  |
| `comment_author_email` | varchar(100) | NO | NULL | MUL |  |
| `comment_author_url` | varchar(200) | NO | NULL |  |  |
| `comment_author_IP` | varchar(100) | NO | NULL |  |  |
| `comment_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `comment_date_gmt` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `comment_content` | text | NO | NULL |  |  |
| `comment_karma` | int | NO | 0 |  |  |
| `comment_approved` | varchar(20) | NO | 1 | MUL |  |
| `comment_agent` | varchar(255) | NO | NULL |  |  |
| `comment_type` | varchar(20) | NO | comment |  |  |
| `comment_parent` | bigint unsigned | NO | 0 | MUL |  |
| `user_id` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_approved_date_gmt | comment_approved | NO | BTREE |
| comment_approved_date_gmt | comment_date_gmt | NO | BTREE |
| comment_author_email | comment_author_email | NO | BTREE |
| comment_date_gmt | comment_date_gmt | NO | BTREE |
| comment_parent | comment_parent | NO | BTREE |
| comment_post_ID | comment_post_ID | NO | BTREE |
| PRIMARY | comment_ID | YES | BTREE |

---

## wplogin_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `link_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `link_url` | varchar(255) | NO | NULL |  |  |
| `link_name` | varchar(255) | NO | NULL |  |  |
| `link_image` | varchar(255) | NO | NULL |  |  |
| `link_target` | varchar(25) | NO | NULL |  |  |
| `link_description` | varchar(255) | NO | NULL |  |  |
| `link_visible` | varchar(20) | NO | Y | MUL |  |
| `link_owner` | bigint unsigned | NO | 1 |  |  |
| `link_rating` | int | NO | 0 |  |  |
| `link_updated` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `link_rel` | varchar(255) | NO | NULL |  |  |
| `link_notes` | mediumtext | NO | NULL |  |  |
| `link_rss` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| link_visible | link_visible | NO | BTREE |
| PRIMARY | link_id | YES | BTREE |

---

## wplogin_options

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `option_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `option_name` | varchar(191) | NO | NULL | UNI |  |
| `option_value` | longtext | NO | NULL |  |  |
| `autoload` | varchar(20) | NO | yes | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| autoload | autoload | NO | BTREE |
| option_name | option_name | YES | BTREE |
| PRIMARY | option_id | YES | BTREE |

---

## wplogin_postmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| post_id | post_id | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wplogin_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_author` | bigint unsigned | NO | 0 | MUL |  |
| `post_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_date_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_content` | longtext | NO | NULL |  |  |
| `post_title` | text | NO | NULL |  |  |
| `post_excerpt` | text | NO | NULL |  |  |
| `post_status` | varchar(20) | NO | publish |  |  |
| `comment_status` | varchar(20) | NO | open |  |  |
| `ping_status` | varchar(20) | NO | open |  |  |
| `post_password` | varchar(255) | NO | NULL |  |  |
| `post_name` | varchar(200) | NO | NULL | MUL |  |
| `to_ping` | text | NO | NULL |  |  |
| `pinged` | text | NO | NULL |  |  |
| `post_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_modified_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_content_filtered` | longtext | NO | NULL |  |  |
| `post_parent` | bigint unsigned | NO | 0 | MUL |  |
| `guid` | varchar(255) | NO | NULL |  |  |
| `menu_order` | int | NO | 0 |  |  |
| `post_type` | varchar(20) | NO | post | MUL |  |
| `post_mime_type` | varchar(100) | NO | NULL |  |  |
| `comment_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| post_author | post_author | NO | BTREE |
| post_name | post_name | NO | BTREE |
| post_parent | post_parent | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| type_status_date | post_type | NO | BTREE |
| type_status_date | post_status | NO | BTREE |
| type_status_date | post_date | NO | BTREE |
| type_status_date | ID | NO | BTREE |

---

## wplogin_redirection_404

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `created` | datetime | NO | NULL | MUL |  |
| `url` | mediumtext | NO | NULL |  |  |
| `domain` | varchar(255) | YES | NULL |  |  |
| `agent` | varchar(255) | YES | NULL |  |  |
| `referrer` | varchar(255) | YES | NULL | MUL |  |
| `http_code` | int unsigned | NO | 0 |  |  |
| `request_method` | varchar(10) | YES | NULL |  |  |
| `request_data` | mediumtext | YES | NULL |  |  |
| `ip` | varchar(45) | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| created | created | NO | BTREE |
| ip | ip | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| referrer | referrer | NO | BTREE |

---

## wplogin_redirection_groups

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(50) | NO | NULL |  |  |
| `tracking` | int | NO | 1 |  |  |
| `module_id` | int unsigned | NO | 0 | MUL |  |
| `status` | enum('enabled','disabled') | NO | enabled | MUL |  |
| `position` | int unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| module_id | module_id | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| status | status | NO | BTREE |

---

## wplogin_redirection_items

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `url` | mediumtext | NO | NULL | MUL |  |
| `match_url` | varchar(2000) | YES | NULL | MUL |  |
| `match_data` | text | YES | NULL |  |  |
| `regex` | int unsigned | NO | 0 | MUL |  |
| `position` | int unsigned | NO | 0 |  |  |
| `last_count` | int unsigned | NO | 0 |  |  |
| `last_access` | datetime | NO | 1970-01-01 00:00:00 |  |  |
| `group_id` | int | NO | 0 | MUL |  |
| `status` | enum('enabled','disabled') | NO | enabled | MUL |  |
| `action_type` | varchar(20) | NO | NULL |  |  |
| `action_code` | int unsigned | NO | NULL |  |  |
| `action_data` | mediumtext | YES | NULL |  |  |
| `match_type` | varchar(20) | NO | NULL |  |  |
| `title` | text | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| group | group_id | NO | BTREE |
| group_idpos | group_id | NO | BTREE |
| group_idpos | position | NO | BTREE |
| match_url | match_url | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| regex | regex | NO | BTREE |
| status | status | NO | BTREE |
| url | url | NO | BTREE |

---

## wplogin_redirection_logs

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `created` | datetime | NO | NULL | MUL |  |
| `url` | mediumtext | NO | NULL |  |  |
| `domain` | varchar(255) | YES | NULL |  |  |
| `sent_to` | mediumtext | YES | NULL |  |  |
| `agent` | mediumtext | YES | NULL |  |  |
| `referrer` | mediumtext | YES | NULL |  |  |
| `http_code` | int unsigned | NO | 0 |  |  |
| `request_method` | varchar(10) | YES | NULL |  |  |
| `request_data` | mediumtext | YES | NULL |  |  |
| `redirect_by` | varchar(50) | YES | NULL |  |  |
| `redirection_id` | int unsigned | YES | NULL | MUL |  |
| `ip` | varchar(45) | YES | NULL | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| created | created | NO | BTREE |
| ip | ip | NO | BTREE |
| PRIMARY | id | YES | BTREE |
| redirection_id | redirection_id | NO | BTREE |

---

## wplogin_rich_web_video_slider_effects_data

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `slider_vid_name` | varchar(255) | NO | NULL |  |  |
| `slider_Vid_type` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_video_slider_font_family

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Font_family` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_video_slider_id

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Slider_ID` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_video_slider_manager

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Slider_Title` | varchar(255) | NO | NULL |  |  |
| `Slider_Type` | varchar(255) | NO | NULL |  |  |
| `Slider_Video_Quantity` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_video_slider_videos

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `Rich_Web_VSlider_Vid_Title` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSlider_Add_Desc` | longtext | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Img` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Vid` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Src` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_Link` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSldier_Add_ONT` | varchar(255) | NO | NULL |  |  |
| `Slider_ID` | int | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_vs_effect_10_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ASSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_vs_effect_1_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VS_ContSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_vs_effect_2_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SlickSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_vs_effect_3_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_ThumbSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_vs_effect_4_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VCCP_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_vs_effect_5_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_SimpleVS_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_vs_effect_6_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_VSVT_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_vs_effect_7_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_HSL_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_vs_effect_8_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_RichSl_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_rich_web_vs_effect_9_loader

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int unsigned | NO | NULL | PRI | auto_increment |
| `RW_VS_ID` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_Show` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_FS` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_FF` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T1_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T2_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_T3_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T2_BC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_C` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T2_AnC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_LT_T3_BgC` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_L_S` | varchar(255) | NO | NULL |  |  |
| `Rich_Web_TSL_Loading_Show` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_sib_model_forms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `title` | varchar(120) | YES | NULL |  |  |
| `html` | longtext | YES | NULL |  |  |
| `css` | longtext | YES | NULL |  |  |
| `dependTheme` | int | NO | 1 |  |  |
| `listID` | longtext | YES | NULL |  |  |
| `templateID` | int | NO | -1 |  |  |
| `confirmID` | int | NO | -1 |  |  |
| `isDopt` | int | NO | 0 |  |  |
| `isOpt` | int | NO | 0 |  |  |
| `redirectInEmail` | varchar(255) | YES | NULL |  |  |
| `redirectInForm` | varchar(255) | YES | NULL |  |  |
| `successMsg` | varchar(255) | YES | NULL |  |  |
| `errorMsg` | varchar(255) | YES | NULL |  |  |
| `existMsg` | varchar(255) | YES | NULL |  |  |
| `invalidMsg` | varchar(255) | YES | NULL |  |  |
| `requiredMsg` | varchar(255) | YES | NULL |  |  |
| `attributes` | text | YES | NULL |  |  |
| `date` | date | NO | NULL |  |  |
| `isDefault` | int | NO | 0 |  |  |
| `gCaptcha` | int | NO | 0 |  |  |
| `gCaptcha_secret` | varchar(255) | YES | NULL |  |  |
| `gCaptcha_site` | varchar(255) | YES | NULL |  |  |
| `selectCaptchaType` | int | NO | 0 |  |  |
| `cCaptcha_secret` | varchar(255) | YES | NULL |  |  |
| `cCaptcha_site` | varchar(255) | YES | NULL |  |  |
| `cCaptchaStyle` | varchar(255) | YES | NULL |  |  |
| `cCaptchaType` | int | NO | 0 |  |  |
| `termAccept` | int | NO | 0 |  |  |
| `termsURL` | varchar(255) | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_sib_model_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `id` | int | NO | NULL | PRI | auto_increment |
| `email` | varchar(255) | YES | NULL |  |  |
| `code` | varchar(100) | YES | NULL |  |  |
| `listIDs` | longtext | YES | NULL |  |  |
| `redirectUrl` | varchar(255) | YES | NULL |  |  |
| `info` | text | YES | NULL |  |  |
| `frmid` | int | YES | NULL |  |  |
| `user_added_date` | datetime | NO | NULL |  |  |
| `doi_sent` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | id | YES | BTREE |

---

## wplogin_term_relationships

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `object_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_taxonomy_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_order` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | object_id | YES | BTREE |
| PRIMARY | term_taxonomy_id | YES | BTREE |
| term_taxonomy_id | term_taxonomy_id | NO | BTREE |

---

## wplogin_term_taxonomy

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_taxonomy_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `taxonomy` | varchar(32) | NO | NULL | MUL |  |
| `description` | longtext | NO | NULL |  |  |
| `parent` | bigint unsigned | NO | 0 |  |  |
| `count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | term_taxonomy_id | YES | BTREE |
| taxonomy | taxonomy | NO | BTREE |
| term_id_taxonomy | term_id | YES | BTREE |
| term_id_taxonomy | taxonomy | YES | BTREE |

---

## wplogin_termmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |
| term_id | term_id | NO | BTREE |

---

## wplogin_terms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | NO | NULL | MUL |  |
| `slug` | varchar(200) | NO | NULL | MUL |  |
| `term_group` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | NO | BTREE |
| PRIMARY | term_id | YES | BTREE |
| slug | slug | NO | BTREE |

---

## wplogin_usermeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `umeta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | umeta_id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## wplogin_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_login` | varchar(60) | NO | NULL | MUL |  |
| `user_pass` | varchar(255) | NO | NULL |  |  |
| `user_nicename` | varchar(50) | NO | NULL | MUL |  |
| `user_email` | varchar(100) | NO | NULL | MUL |  |
| `user_url` | varchar(100) | NO | NULL |  |  |
| `user_registered` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `user_activation_key` | varchar(255) | NO | NULL |  |  |
| `user_status` | int | NO | 0 |  |  |
| `display_name` | varchar(250) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |
| user_email | user_email | NO | BTREE |
| user_login_key | user_login | NO | BTREE |
| user_nicename | user_nicename | NO | BTREE |

---

## wpstag_commentmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_id | comment_id | NO | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wpstag_comments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `comment_ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_post_ID` | bigint unsigned | NO | 0 | MUL |  |
| `comment_author` | tinytext | NO | NULL |  |  |
| `comment_author_email` | varchar(100) | NO | NULL | MUL |  |
| `comment_author_url` | varchar(200) | NO | NULL |  |  |
| `comment_author_IP` | varchar(100) | NO | NULL |  |  |
| `comment_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `comment_date_gmt` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `comment_content` | text | NO | NULL |  |  |
| `comment_karma` | int | NO | 0 |  |  |
| `comment_approved` | varchar(20) | NO | 1 | MUL |  |
| `comment_agent` | varchar(255) | NO | NULL |  |  |
| `comment_type` | varchar(20) | NO | comment |  |  |
| `comment_parent` | bigint unsigned | NO | 0 | MUL |  |
| `user_id` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_approved_date_gmt | comment_approved | NO | BTREE |
| comment_approved_date_gmt | comment_date_gmt | NO | BTREE |
| comment_author_email | comment_author_email | NO | BTREE |
| comment_date_gmt | comment_date_gmt | NO | BTREE |
| comment_parent | comment_parent | NO | BTREE |
| comment_post_ID | comment_post_ID | NO | BTREE |
| PRIMARY | comment_ID | YES | BTREE |

---

## wpstag_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `link_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `link_url` | varchar(255) | NO | NULL |  |  |
| `link_name` | varchar(255) | NO | NULL |  |  |
| `link_image` | varchar(255) | NO | NULL |  |  |
| `link_target` | varchar(25) | NO | NULL |  |  |
| `link_description` | varchar(255) | NO | NULL |  |  |
| `link_visible` | varchar(20) | NO | Y | MUL |  |
| `link_owner` | bigint unsigned | NO | 1 |  |  |
| `link_rating` | int | NO | 0 |  |  |
| `link_updated` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `link_rel` | varchar(255) | NO | NULL |  |  |
| `link_notes` | mediumtext | NO | NULL |  |  |
| `link_rss` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| link_visible | link_visible | NO | BTREE |
| PRIMARY | link_id | YES | BTREE |

---

## wpstag_options

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `option_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `option_name` | varchar(191) | NO | NULL | UNI |  |
| `option_value` | longtext | NO | NULL |  |  |
| `autoload` | varchar(20) | NO | yes | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| autoload | autoload | NO | BTREE |
| option_name | option_name | YES | BTREE |
| PRIMARY | option_id | YES | BTREE |

---

## wpstag_postmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| post_id | post_id | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wpstag_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_author` | bigint unsigned | NO | 0 | MUL |  |
| `post_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_date_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_content` | longtext | NO | NULL |  |  |
| `post_title` | text | NO | NULL |  |  |
| `post_excerpt` | text | NO | NULL |  |  |
| `post_status` | varchar(20) | NO | publish |  |  |
| `comment_status` | varchar(20) | NO | open |  |  |
| `ping_status` | varchar(20) | NO | open |  |  |
| `post_password` | varchar(255) | NO | NULL |  |  |
| `post_name` | varchar(200) | NO | NULL | MUL |  |
| `to_ping` | text | NO | NULL |  |  |
| `pinged` | text | NO | NULL |  |  |
| `post_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_modified_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_content_filtered` | longtext | NO | NULL |  |  |
| `post_parent` | bigint unsigned | NO | 0 | MUL |  |
| `guid` | varchar(255) | NO | NULL |  |  |
| `menu_order` | int | NO | 0 |  |  |
| `post_type` | varchar(20) | NO | post | MUL |  |
| `post_mime_type` | varchar(100) | NO | NULL |  |  |
| `comment_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| post_author | post_author | NO | BTREE |
| post_name | post_name | NO | BTREE |
| post_parent | post_parent | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| type_status_date | post_type | NO | BTREE |
| type_status_date | post_status | NO | BTREE |
| type_status_date | post_date | NO | BTREE |
| type_status_date | ID | NO | BTREE |

---

## wpstag_term_relationships

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `object_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_taxonomy_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_order` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | object_id | YES | BTREE |
| PRIMARY | term_taxonomy_id | YES | BTREE |
| term_taxonomy_id | term_taxonomy_id | NO | BTREE |

---

## wpstag_term_taxonomy

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_taxonomy_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `taxonomy` | varchar(32) | NO | NULL | MUL |  |
| `description` | longtext | NO | NULL |  |  |
| `parent` | bigint unsigned | NO | 0 |  |  |
| `count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | term_taxonomy_id | YES | BTREE |
| taxonomy | taxonomy | NO | BTREE |
| term_id_taxonomy | term_id | YES | BTREE |
| term_id_taxonomy | taxonomy | YES | BTREE |

---

## wpstag_termmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |
| term_id | term_id | NO | BTREE |

---

## wpstag_terms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | NO | NULL | MUL |  |
| `slug` | varchar(200) | NO | NULL | MUL |  |
| `term_group` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | NO | BTREE |
| PRIMARY | term_id | YES | BTREE |
| slug | slug | NO | BTREE |

---

## wptest_commentmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_id | comment_id | NO | BTREE |
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wptest_comments

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `comment_ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `comment_post_ID` | bigint unsigned | NO | 0 | MUL |  |
| `comment_author` | tinytext | NO | NULL |  |  |
| `comment_author_email` | varchar(100) | NO | NULL | MUL |  |
| `comment_author_url` | varchar(200) | NO | NULL |  |  |
| `comment_author_IP` | varchar(100) | NO | NULL |  |  |
| `comment_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `comment_date_gmt` | datetime | NO | 0000-00-00 00:00:00 | MUL |  |
| `comment_content` | text | NO | NULL |  |  |
| `comment_karma` | int | NO | 0 |  |  |
| `comment_approved` | varchar(20) | NO | 1 | MUL |  |
| `comment_agent` | varchar(255) | NO | NULL |  |  |
| `comment_type` | varchar(20) | NO | comment |  |  |
| `comment_parent` | bigint unsigned | NO | 0 | MUL |  |
| `user_id` | bigint unsigned | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| comment_approved_date_gmt | comment_approved | NO | BTREE |
| comment_approved_date_gmt | comment_date_gmt | NO | BTREE |
| comment_author_email | comment_author_email | NO | BTREE |
| comment_date_gmt | comment_date_gmt | NO | BTREE |
| comment_parent | comment_parent | NO | BTREE |
| comment_post_ID | comment_post_ID | NO | BTREE |
| PRIMARY | comment_ID | YES | BTREE |

---

## wptest_links

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `link_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `link_url` | varchar(255) | NO | NULL |  |  |
| `link_name` | varchar(255) | NO | NULL |  |  |
| `link_image` | varchar(255) | NO | NULL |  |  |
| `link_target` | varchar(25) | NO | NULL |  |  |
| `link_description` | varchar(255) | NO | NULL |  |  |
| `link_visible` | varchar(20) | NO | Y | MUL |  |
| `link_owner` | bigint unsigned | NO | 1 |  |  |
| `link_rating` | int | NO | 0 |  |  |
| `link_updated` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `link_rel` | varchar(255) | NO | NULL |  |  |
| `link_notes` | mediumtext | NO | NULL |  |  |
| `link_rss` | varchar(255) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| link_visible | link_visible | NO | BTREE |
| PRIMARY | link_id | YES | BTREE |

---

## wptest_options

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `option_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `option_name` | varchar(191) | NO | NULL | UNI |  |
| `option_value` | longtext | NO | NULL |  |  |
| `autoload` | varchar(20) | NO | yes | MUL |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| autoload | autoload | NO | BTREE |
| option_name | option_name | YES | BTREE |
| PRIMARY | option_id | YES | BTREE |

---

## wptest_postmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| post_id | post_id | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |

---

## wptest_posts

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `post_author` | bigint unsigned | NO | 0 | MUL |  |
| `post_date` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_date_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_content` | longtext | NO | NULL |  |  |
| `post_title` | text | NO | NULL |  |  |
| `post_excerpt` | text | NO | NULL |  |  |
| `post_status` | varchar(20) | NO | publish |  |  |
| `comment_status` | varchar(20) | NO | open |  |  |
| `ping_status` | varchar(20) | NO | open |  |  |
| `post_password` | varchar(255) | NO | NULL |  |  |
| `post_name` | varchar(200) | NO | NULL | MUL |  |
| `to_ping` | text | NO | NULL |  |  |
| `pinged` | text | NO | NULL |  |  |
| `post_modified` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_modified_gmt` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `post_content_filtered` | longtext | NO | NULL |  |  |
| `post_parent` | bigint unsigned | NO | 0 | MUL |  |
| `guid` | varchar(255) | NO | NULL |  |  |
| `menu_order` | int | NO | 0 |  |  |
| `post_type` | varchar(20) | NO | post | MUL |  |
| `post_mime_type` | varchar(100) | NO | NULL |  |  |
| `comment_count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| post_author | post_author | NO | BTREE |
| post_name | post_name | NO | BTREE |
| post_parent | post_parent | NO | BTREE |
| PRIMARY | ID | YES | BTREE |
| type_status_date | post_type | NO | BTREE |
| type_status_date | post_status | NO | BTREE |
| type_status_date | post_date | NO | BTREE |
| type_status_date | ID | NO | BTREE |

---

## wptest_term_relationships

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `object_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_taxonomy_id` | bigint unsigned | NO | 0 | PRI |  |
| `term_order` | int | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | object_id | YES | BTREE |
| PRIMARY | term_taxonomy_id | YES | BTREE |
| term_taxonomy_id | term_taxonomy_id | NO | BTREE |

---

## wptest_term_taxonomy

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_taxonomy_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `taxonomy` | varchar(32) | NO | NULL | MUL |  |
| `description` | longtext | NO | NULL |  |  |
| `parent` | bigint unsigned | NO | 0 |  |  |
| `count` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | term_taxonomy_id | YES | BTREE |
| taxonomy | taxonomy | NO | BTREE |
| term_id_taxonomy | term_id | YES | BTREE |
| term_id_taxonomy | taxonomy | YES | BTREE |

---

## wptest_termmeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `meta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `term_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | meta_id | YES | BTREE |
| term_id | term_id | NO | BTREE |

---

## wptest_terms

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `term_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `name` | varchar(200) | NO | NULL | MUL |  |
| `slug` | varchar(200) | NO | NULL | MUL |  |
| `term_group` | bigint | NO | 0 |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| name | name | NO | BTREE |
| PRIMARY | term_id | YES | BTREE |
| slug | slug | NO | BTREE |

---

## wptest_usermeta

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `umeta_id` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_id` | bigint unsigned | NO | 0 | MUL |  |
| `meta_key` | varchar(255) | YES | NULL | MUL |  |
| `meta_value` | longtext | YES | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| meta_key | meta_key | NO | BTREE |
| PRIMARY | umeta_id | YES | BTREE |
| user_id | user_id | NO | BTREE |

---

## wptest_users

### Columns

| Column Name | Type | Nullable | Default | Key | Extra |
|-------------|------|----------|---------|-----|-------|
| `ID` | bigint unsigned | NO | NULL | PRI | auto_increment |
| `user_login` | varchar(60) | NO | NULL | MUL |  |
| `user_pass` | varchar(255) | NO | NULL |  |  |
| `user_nicename` | varchar(50) | NO | NULL | MUL |  |
| `user_email` | varchar(100) | NO | NULL | MUL |  |
| `user_url` | varchar(100) | NO | NULL |  |  |
| `user_registered` | datetime | NO | 0000-00-00 00:00:00 |  |  |
| `user_activation_key` | varchar(255) | NO | NULL |  |  |
| `user_status` | int | NO | 0 |  |  |
| `display_name` | varchar(250) | NO | NULL |  |  |

### Indexes

| Index Name | Column | Unique | Type |
|------------|--------|--------|------|
| PRIMARY | ID | YES | BTREE |
| user_email | user_email | NO | BTREE |
| user_login_key | user_login | NO | BTREE |
| user_nicename | user_nicename | NO | BTREE |

---

