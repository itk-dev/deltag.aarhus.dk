# Høringsportal Data Model

Generated: 2026-01-29

Complete data model documentation showing all entity types, fields, and relationships.

## Architecture Overview

The Høringsportal data model consists of three main entity types:

**1. NODE Content Types** - Main content entities representing different types of civic engagement:

- **citizen_proposal** - Citizen proposals for municipal initiatives
- **hearing** - Public hearings (høringer) for municipal planning and decisions
- **dialogue** - Discussion forums for civic dialogue
- **dialogue_proposal** - User-submitted proposals within dialogues
- **public_meeting** - Public meetings and events with ticketing
- **course** - Educational courses and activities
- **decision** - Municipal decisions and resolutions
- **project_main_page** - Main pages for civic engagement projects
- **project_page** - Additional project pages
- **landing_page** - Landing pages with custom layouts
- **static_page** - General static content pages
- **page_map** - Map display pages

**2. PARAGRAPH Types** - Reusable content components used to build flexible page layouts:

- Text components: text, content_block, introduction, info_box
- Media components: image, video, projekt_billede_galleri
- Interactive components: accordion, accordion_item, link
- Layout components: text_aside_blocks_2_column, teaser_row, content_list
- Project-specific: timeline_note, aktuelt_i_projektet

**3. TAXONOMY Terms** - Classification and metadata:

- **area** - Geographic areas within the municipality
- **department** - Municipal departments
- **type** - Content type classifications
- **tags** - General tagging
- **activity_type** - Types of activities/courses
- **project_categories** - Project categorization
- **dialogue_proposal_categories** - Dialogue proposal categories

**4. MEDIA Entities** - File and media management:

- **image** - Images with metadata
- **document** - Document files (PDFs, etc.)
- **icon** - Icon images

### Key Relationships

- Most content types reference **area** and **department** taxonomies
- Many content types use **field_content_sections** or **field_section** to embed paragraphs
- **project_main_page** acts as a hub, referenced by hearings, meetings, dialogues, etc.
- **dialogue** contains **dialogue_proposal** entries
- **paragraph:timeline_note** is used in project timelines
- **paragraph:aktuelt_i_projektet** promotes dialogue content within projects

## Summary

### NODE (12 bundles)

- **citizen_proposal**: 13 fields
- **course**: 16 fields
- **decision**: 12 fields
- **dialogue**: 12 fields
- **dialogue_proposal**: 10 fields
- **hearing**: 25 fields
- **landing_page**: 5 fields
- **page_map**: 2 fields
- **project_main_page**: 10 fields
- **project_page**: 3 fields
- **public_meeting**: 30 fields
- **static_page**: 5 fields

### PARAGRAPH (18 bundles)

- **accordion**: 1 fields
- **accordion_item**: 2 fields
- **aktuelt_i_projektet**: 1 fields
- **content_block**: 3 fields
- **content_list**: 2 fields
- **content_promotion**: 5 fields
- **files**: 2 fields
- **image**: 1 fields
- **info_box**: 3 fields
- **introduction**: 3 fields
- **link**: 4 fields
- **links_on_a_background_image**: 2 fields
- **projekt_billede_galleri**: 2 fields
- **teaser_row**: 2 fields
- **text**: 2 fields
- **text_aside_blocks_2_column**: 4 fields
- **timeline_note**: 6 fields
- **video**: 1 fields

### TAXONOMY_TERM (2 bundles)

- **area**: 1 fields
- **department**: 1 fields

## NODE ENTITIES

### node: citizen_proposal

**Text Fields:**

- **field_author_name** (string)
- **field_author_phone** (string)
- **field_author_uuid** (string)
- **field_getorganized_case_id** (string) *required*
- **field_more_info** (text_long)
- **field_proposal** (text_long) *required*
- **field_remarks** (text_long) *required*

**Date/Time Fields:**

- **field_vote_end** (datetime)
- **field_vote_start** (datetime)

**Boolean Fields:**

- **field_author_allow_email** (boolean)
- **field_author_email_display** (boolean)

**Other Fields:**

- **field_author_email** (email)
- **field_content_state** (list_string)

### node: course

**Reference Fields:**

- **field_activity_type** (entity_reference)
  → references **taxonomy_term**:activity_type
- **field_area** (entity_reference) *required*
  → references **taxonomy_term**:area
- **field_content_sections** (entity_reference_revisions)
  → references **paragraph**:text
  → references **paragraph**:image
  → references **paragraph**:content_block
  → references **paragraph**:text_aside_blocks_2_column
  → references **paragraph**:info_box
  → references **paragraph**:introduction
  → references **paragraph**:teaser_row
  → references **paragraph**:accordion
  → references **paragraph**:video
- **field_department** (entity_reference) *required*
  → references **taxonomy_term**:department
- **field_project_reference** (entity_reference)
  → references **node**:project_main_page
- **field_top_images** (entity_reference)
  → references **media**:image
- **field_type** (entity_reference) *required*
  → references **taxonomy_term**:type

**Text Fields:**

- **field_activity_location** (string)
- **field_address** (string)
- **field_teaser** (string_long) *required*

**Date/Time Fields:**

- **field_first_meeting_time** (datetime) *required*
- **field_last_meeting_time** (datetime) *required*

**Boolean Fields:**

- **field_hide_in_timeline** (boolean)
- **field_hide_time** (boolean)

**Other Fields:**

- **field_content_state** (list_string)
- **field_map** (hoeringsportal_data_map) *required*

### node: decision

**Reference Fields:**

- **field_area** (entity_reference) *required*
  → references **taxonomy_term**:area
- **field_content_sections** (entity_reference_revisions)
  → references **paragraph**:text
  → references **paragraph**:image
  → references **paragraph**:content_block
  → references **paragraph**:text_aside_blocks_2_column
  → references **paragraph**:info_box
  → references **paragraph**:introduction
  → references **paragraph**:teaser_row
  → references **paragraph**:accordion
  → references **paragraph**:video
- **field_department** (entity_reference) *required*
  → references **taxonomy_term**:department
- **field_media_document** (entity_reference)
  → references **media**:document
- **field_project_reference** (entity_reference)
  → references **node**:project_main_page
- **field_related_content** (entity_reference)
  → references **node**:public_meeting
  → references **node**:citizen_proposal
  → references **node**:dialogue
  → references **node**:hearing
  → references **node**:project_main_page
- **field_top_images** (entity_reference)
  → references **media**:image
- **field_type** (entity_reference) *required*
  → references **taxonomy_term**:type

**Text Fields:**

- **field_teaser** (string_long) *required*

**Date/Time Fields:**

- **field_decision_date** (datetime) *required*

**Boolean Fields:**

- **field_hide_in_timeline** (boolean)

**Other Fields:**

- **field_decision** (list_string) *required*

### node: dialogue

**Reference Fields:**

- **field_area** (entity_reference) *required*
  → references **taxonomy_term**:area
- **field_content_sections** (entity_reference_revisions)
  → references **paragraph**:text
  → references **paragraph**:image
  → references **paragraph**:content_block
  → references **paragraph**:text_aside_blocks_2_column
  → references **paragraph**:info_box
  → references **paragraph**:introduction
  → references **paragraph**:teaser_row
  → references **paragraph**:files
  → references **paragraph**:accordion
  → references **paragraph**:video
- **field_department** (entity_reference) *required*
  → references **taxonomy_term**:department
- **field_dialogue_proposal_category** (entity_reference) *required*
  → references **taxonomy_term**:dialogue_proposal_categories
- **field_project_reference** (entity_reference)
  → references **node**:project_main_page
- **field_top_images** (entity_reference)
  → references **media**:image
- **field_type** (entity_reference) *required*
  → references **taxonomy_term**:type

**Text Fields:**

- **field_teaser** (string_long) *required*

**Boolean Fields:**

- **field_hidden_dialogue** (boolean)
- **field_hide_in_timeline** (boolean)

**Other Fields:**

- **field_dialogue_proposal_config** (list_string)
- **field_dialogue_proposal_location** (hoeringsportal_data_map)

### node: dialogue_proposal

**Reference Fields:**

- **field_area** (entity_reference)
  → references **taxonomy_term**:area
- **field_dialogue** (entity_reference)
  → references **node**:dialogue
- **field_dialogue_proposal_category** (entity_reference) *required*
  → references **taxonomy_term**:dialogue_proposal_categories
- **field_image_upload** (image)
  → references **media**:image

**Text Fields:**

- **field_dialogue_proposal_descr** (string_long) *required*
- **field_owner_name** (string)

**Other Fields:**

- **field_age_span** (list_string) *required*
- **field_comments** (comment)
- **field_location** (hoeringsportal_data_map)
- **field_owner_email** (email)

### node: hearing

**Reference Fields:**

- **field_area** (entity_reference) *required*
  → references **taxonomy_term**:area
- **field_department** (entity_reference) *required*
  → references **taxonomy_term**:department
- **field_media_document** (entity_reference)
  → references **media**:document
- **field_media_image** (entity_reference) *required*
  → references **media**:image
- **field_project_reference** (entity_reference)
  → references **node**:project_main_page
- **field_tags** (entity_reference)
  → references **taxonomy_term**:tags
- **field_type** (entity_reference) *required*
  → references **taxonomy_term**:type

**Text Fields:**

- **field_contact** (text_long)
- **field_description** (text_long) *required*
- **field_deskpro_department_id** (string) *required*
- **field_edoc_casefile_id** (string)
- **field_getorganized_case_id** (string) *required*
- **field_map_display** (string_long)
- **field_more_info** (text_long)
- **field_teaser** (string_long) *required*

**Date/Time Fields:**

- **field_delete_date** (datetime) *required*
- **field_reply_deadline** (datetime) *required*
- **field_start_date** (datetime) *required*

**Boolean Fields:**

- **field_hide_in_timeline** (boolean)

**Other Fields:**

- **field_content_state** (list_string)
- **field_deskpro_agent_email** (email) *required*
- **field_hearing_ticket_add** (link)
- **field_hearing_ticket_list** (link)
- **field_lokalplaner** (hoeringsportal_data_localplan)
- **field_map** (hoeringsportal_data_map) *required*

### node: landing_page

**Reference Fields:**

- **field_media_image_single** (entity_reference)
  → references **media**:image
- **field_section** (entity_reference_revisions)
  → references **paragraph**:introduction
  → references **paragraph**:content_block
  → references **paragraph**:content_list
  → references **paragraph**:teaser_row
  → references **paragraph**:content_promotion
  → references **paragraph**:accordion
  → references **paragraph**:links_on_a_background_image

**Text Fields:**

- **field_header_label** (string) *required*
- **field_teaser** (string_long)

**Boolean Fields:**

- **field_show_page_title** (boolean)

### node: page_map

**Text Fields:**

- **field_map_configuration** (string_long) *required*

**Other Fields:**

- **field_map_type** (list_string) *required*

### node: project_main_page

**Reference Fields:**

- **field_area** (entity_reference) *required*
  → references **taxonomy_term**:area
- **field_content_sections** (entity_reference_revisions)
  → references **paragraph**:text
  → references **paragraph**:image
  → references **paragraph**:content_block
  → references **paragraph**:text_aside_blocks_2_column
  → references **paragraph**:info_box
  → references **paragraph**:introduction
  → references **paragraph**:teaser_row
  → references **paragraph**:files
  → references **paragraph**:aktuelt_i_projektet
  → references **paragraph**:accordion
- **field_department** (entity_reference) *required*
  → references **taxonomy_term**:department
- **field_project_category** (entity_reference)
  → references **taxonomy_term**:project_categories
- **field_project_image** (entity_reference)
  → references **media**:image
- **field_timeline** (entity_reference_revisions)
  → references **paragraph**:timeline_note
- **field_type** (entity_reference) *required*
  → references **taxonomy_term**:type

**Text Fields:**

- **field_short_description** (text_long)

**Boolean Fields:**

- **field_show_timeline** (boolean)

**Other Fields:**

- **field_project_status** (list_string)

### node: project_page

**Reference Fields:**

- **field_content_sections** (entity_reference_revisions)
  → references **paragraph**:text
  → references **paragraph**:image
  → references **paragraph**:content_block
  → references **paragraph**:info_box
  → references **paragraph**:introduction
  → references **paragraph**:teaser_row
  → references **paragraph**:files
  → references **paragraph**:accordion
  → references **paragraph**:text_aside_blocks_2_column
  → references **paragraph**:aktuelt_i_projektet
- **field_project_category** (entity_reference)
  → references **taxonomy_term**:project_categories

**Text Fields:**

- **field_teaser** (string_long)

### node: public_meeting

**Reference Fields:**

- **field_activity_type** (entity_reference)
  → references **taxonomy_term**:activity_type
- **field_area** (entity_reference) *required*
  → references **taxonomy_term**:area
- **field_department** (entity_reference) *required*
  → references **taxonomy_term**:department
- **field_media_document** (entity_reference)
  → references **media**:document
- **field_media_image_single** (entity_reference) *required*
  → references **media**:image
- **field_project_reference** (entity_reference)
  → references **node**:project_main_page
- **field_section** (entity_reference_revisions)
  → references **paragraph**:content_block
  → references **paragraph**:info_box
  → references **paragraph**:text
  → references **paragraph**:accordion
  → references **paragraph**:text_aside_blocks_2_column
  → references **paragraph**:video
- **field_type** (entity_reference) *required*
  → references **taxonomy_term**:type

**Text Fields:**

- **field_activity_location** (string)
- **field_address** (string)
- **field_cancelled_text** (string)
- **field_contact** (text_long)
- **field_description** (text_long)
- **field_signup_text** (text_long)
- **field_teaser** (string_long) *required*

**Date/Time Fields:**

- **field_cancelled_date** (datetime)
- **field_first_meeting_time** (datetime)
- **field_last_meeting_time** (datetime)
- **field_last_meeting_time_end** (datetime)
- **field_registration_deadline** (datetime)

**Boolean Fields:**

- **field_hidden_signup** (boolean)
- **field_hide_in_timeline** (boolean)
- **field_public_meeting_cancelled** (boolean)

**Other Fields:**

- **field_content_state** (list_string)
- **field_email_address** (email)
- **field_map** (hoeringsportal_data_map) *required*
- **field_pretix_dates** (pretix_date)
- **field_pretix_event_settings** (pretix_event_settings)
- **field_signup_link** (link)
- **field_signup_selection** (list_string) *required*

### node: static_page

**Reference Fields:**

- **field_media_image_single** (entity_reference)
  → references **media**:image
- **field_section** (entity_reference_revisions)
  → references **paragraph**:image
  → references **paragraph**:introduction
  → references **paragraph**:text
  → references **paragraph**:accordion

**Text Fields:**

- **field_sidebar** (text_long)
- **field_teaser** (string_long)

**Other Fields:**

- **field_teaser_color** (color_field_type)

## PARAGRAPH ENTITIES

### paragraph: accordion

**Reference Fields:**

- **field_accordion_items** (entity_reference_revisions)
  → references **paragraph**:accordion_item

### paragraph: accordion_item

**Text Fields:**

- **field_accordion_content** (text_long)
- **field_accordion_item_header** (string) *required*

### paragraph: aktuelt_i_projektet

**Reference Fields:**

- **field_promoted_content** (entity_reference) *required*
  → references **node**:dialogue

### paragraph: content_block

**Reference Fields:**

- **field_paragraph_image** (entity_reference)
  → references **media**:image

**Text Fields:**

- **field_content_block_text** (text_long)
- **field_paragraph_title** (string)

### paragraph: content_list

**Text Fields:**

- **field_list_title** (string)

**Other Fields:**

- **field_content_list** (viewsreference)

### paragraph: content_promotion

**Reference Fields:**

- **field_button** (entity_reference_revisions)
  → references **paragraph**:link
- **field_paragraph_image** (entity_reference)
  → references **media**:image

**Text Fields:**

- **field_abstract** (string_long)
- **field_lead** (string_long)
- **field_title** (string)

### paragraph: files

**Reference Fields:**

- **field_files** (entity_reference)
  → references **media**:image
  → references **media**:document

**Text Fields:**

- **field_title** (string)

### paragraph: image

**Reference Fields:**

- **field_paragraph_image** (entity_reference)
  → references **media**:image

### paragraph: info_box

**Text Fields:**

- **field_content_block_text** (text_long) *required*
- **field_paragraph_title** (string)

**Other Fields:**

- **field_variant** (list_string)

### paragraph: introduction

**Text Fields:**

- **field_intro_body** (string_long)
- **field_paragraph_title** (string)

**Other Fields:**

- **field_intro_link** (link)

### paragraph: link

**Reference Fields:**

- **field_icon** (entity_reference)
  → references **media**:icon
- **field_link** (entity_reference)
  → references **node**:public_meeting
  → references **node**:citizen_proposal
  → references **node**:hearing
  → references **node**:page_map
  → references **node**:landing_page
  → references **node**:project_main_page
  → references **node**:project_page
  → references **node**:static_page

**Boolean Fields:**

- **field_decorative_arrow** (boolean)

**Other Fields:**

- **field_button_variant** (list_string)

### paragraph: links_on_a_background_image

**Reference Fields:**

- **field_links_list** (entity_reference_revisions)
  → references **paragraph**:link
- **field_paragraph_image** (entity_reference)
  → references **media**:image

### paragraph: projekt_billede_galleri

**Reference Fields:**

- **field_image_gallery** (entity_reference)
  → references **media**:image

**Other Fields:**

- **field_external_link** (link)

### paragraph: teaser_row

**Reference Fields:**

- **field_content** (entity_reference)
  → references **node**:public_meeting
  → references **node**:citizen_proposal
  → references **node**:hearing
  → references **node**:project_main_page
  → references **node**:static_page

**Text Fields:**

- **field_paragraph_title** (string)

### paragraph: text

**Text Fields:**

- **field_content_block_text** (text_long)

**Other Fields:**

- **field_external_link** (link)

### paragraph: text_aside_blocks_2_column

**Reference Fields:**

- **field_aside_block** (entity_reference)
  → references **block_content**:aside_contact_info
  → references **block_content**:aside_link_box

**Text Fields:**

- **field_abstract** (string_long)
- **field_body** (text_long) *required*
- **field_title** (string)

### paragraph: timeline_note

**Reference Fields:**

- **field_paragraph_image** (entity_reference)
  → references **media**:image

**Text Fields:**

- **field_note** (string_long) *required*
- **field_subtitle** (string)
- **field_title** (string) *required*

**Date/Time Fields:**

- **field_date** (datetime) *required*

**Other Fields:**

- **field_external_link** (link)

### paragraph: video

**Other Fields:**

- **field_video** (itk_video_field)

## TAXONOMY_TERM ENTITIES

### taxonomy_term: area

**Other Fields:**

- **field_area_id** (integer) *required*

### taxonomy_term: department

**Text Fields:**

- **field_claim_value** (string)

## ENTITY RELATIONSHIPS

This section shows all entity reference fields and what they reference.

### node:course

- `field_activity_type` → **taxonomy_term**:activity_type
- `field_area` → **taxonomy_term**:area
- `field_content_sections` → **paragraph**:text
- `field_content_sections` → **paragraph**:image
- `field_content_sections` → **paragraph**:content_block
- `field_content_sections` → **paragraph**:text_aside_blocks_2_column
- `field_content_sections` → **paragraph**:info_box
- `field_content_sections` → **paragraph**:introduction
- `field_content_sections` → **paragraph**:teaser_row
- `field_content_sections` → **paragraph**:accordion
- `field_content_sections` → **paragraph**:video
- `field_department` → **taxonomy_term**:department
- `field_project_reference` → **node**:project_main_page
- `field_top_images` → **media**:image
- `field_type` → **taxonomy_term**:type

### node:decision

- `field_area` → **taxonomy_term**:area
- `field_content_sections` → **paragraph**:text
- `field_content_sections` → **paragraph**:image
- `field_content_sections` → **paragraph**:content_block
- `field_content_sections` → **paragraph**:text_aside_blocks_2_column
- `field_content_sections` → **paragraph**:info_box
- `field_content_sections` → **paragraph**:introduction
- `field_content_sections` → **paragraph**:teaser_row
- `field_content_sections` → **paragraph**:accordion
- `field_content_sections` → **paragraph**:video
- `field_department` → **taxonomy_term**:department
- `field_media_document` → **media**:document
- `field_project_reference` → **node**:project_main_page
- `field_related_content` → **node**:public_meeting
- `field_related_content` → **node**:citizen_proposal
- `field_related_content` → **node**:dialogue
- `field_related_content` → **node**:hearing
- `field_related_content` → **node**:project_main_page
- `field_top_images` → **media**:image
- `field_type` → **taxonomy_term**:type

### node:dialogue

- `field_area` → **taxonomy_term**:area
- `field_content_sections` → **paragraph**:text
- `field_content_sections` → **paragraph**:image
- `field_content_sections` → **paragraph**:content_block
- `field_content_sections` → **paragraph**:text_aside_blocks_2_column
- `field_content_sections` → **paragraph**:info_box
- `field_content_sections` → **paragraph**:introduction
- `field_content_sections` → **paragraph**:teaser_row
- `field_content_sections` → **paragraph**:files
- `field_content_sections` → **paragraph**:accordion
- `field_content_sections` → **paragraph**:video
- `field_department` → **taxonomy_term**:department
- `field_dialogue_proposal_category` → **taxonomy_term**:dialogue_proposal_categories
- `field_project_reference` → **node**:project_main_page
- `field_top_images` → **media**:image
- `field_type` → **taxonomy_term**:type

### node:dialogue_proposal

- `field_area` → **taxonomy_term**:area
- `field_dialogue` → **node**:dialogue
- `field_dialogue_proposal_category` → **taxonomy_term**:dialogue_proposal_categories
- `field_image_upload` → **media**:image

### node:hearing

- `field_area` → **taxonomy_term**:area
- `field_department` → **taxonomy_term**:department
- `field_media_document` → **media**:document
- `field_media_image` → **media**:image
- `field_project_reference` → **node**:project_main_page
- `field_tags` → **taxonomy_term**:tags
- `field_type` → **taxonomy_term**:type

### node:landing_page

- `field_media_image_single` → **media**:image
- `field_section` → **paragraph**:introduction
- `field_section` → **paragraph**:content_block
- `field_section` → **paragraph**:content_list
- `field_section` → **paragraph**:teaser_row
- `field_section` → **paragraph**:content_promotion
- `field_section` → **paragraph**:accordion
- `field_section` → **paragraph**:links_on_a_background_image

### node:project_main_page

- `field_area` → **taxonomy_term**:area
- `field_content_sections` → **paragraph**:text
- `field_content_sections` → **paragraph**:image
- `field_content_sections` → **paragraph**:content_block
- `field_content_sections` → **paragraph**:text_aside_blocks_2_column
- `field_content_sections` → **paragraph**:info_box
- `field_content_sections` → **paragraph**:introduction
- `field_content_sections` → **paragraph**:teaser_row
- `field_content_sections` → **paragraph**:files
- `field_content_sections` → **paragraph**:aktuelt_i_projektet
- `field_content_sections` → **paragraph**:accordion
- `field_department` → **taxonomy_term**:department
- `field_project_category` → **taxonomy_term**:project_categories
- `field_project_image` → **media**:image
- `field_timeline` → **paragraph**:timeline_note
- `field_type` → **taxonomy_term**:type

### node:project_page

- `field_content_sections` → **paragraph**:text
- `field_content_sections` → **paragraph**:image
- `field_content_sections` → **paragraph**:content_block
- `field_content_sections` → **paragraph**:info_box
- `field_content_sections` → **paragraph**:introduction
- `field_content_sections` → **paragraph**:teaser_row
- `field_content_sections` → **paragraph**:files
- `field_content_sections` → **paragraph**:accordion
- `field_content_sections` → **paragraph**:text_aside_blocks_2_column
- `field_content_sections` → **paragraph**:aktuelt_i_projektet
- `field_project_category` → **taxonomy_term**:project_categories

### node:public_meeting

- `field_activity_type` → **taxonomy_term**:activity_type
- `field_area` → **taxonomy_term**:area
- `field_department` → **taxonomy_term**:department
- `field_media_document` → **media**:document
- `field_media_image_single` → **media**:image
- `field_project_reference` → **node**:project_main_page
- `field_section` → **paragraph**:content_block
- `field_section` → **paragraph**:info_box
- `field_section` → **paragraph**:text
- `field_section` → **paragraph**:accordion
- `field_section` → **paragraph**:text_aside_blocks_2_column
- `field_section` → **paragraph**:video
- `field_type` → **taxonomy_term**:type

### node:static_page

- `field_media_image_single` → **media**:image
- `field_section` → **paragraph**:image
- `field_section` → **paragraph**:introduction
- `field_section` → **paragraph**:text
- `field_section` → **paragraph**:accordion

### paragraph:accordion

- `field_accordion_items` → **paragraph**:accordion_item

### paragraph:aktuelt_i_projektet

- `field_promoted_content` → **node**:dialogue

### paragraph:content_block

- `field_paragraph_image` → **media**:image

### paragraph:content_promotion

- `field_button` → **paragraph**:link
- `field_paragraph_image` → **media**:image

### paragraph:files

- `field_files` → **media**:image
- `field_files` → **media**:document

### paragraph:image

- `field_paragraph_image` → **media**:image

### paragraph:link

- `field_icon` → **media**:icon
- `field_link` → **node**:public_meeting
- `field_link` → **node**:citizen_proposal
- `field_link` → **node**:hearing
- `field_link` → **node**:page_map
- `field_link` → **node**:landing_page
- `field_link` → **node**:project_main_page
- `field_link` → **node**:project_page
- `field_link` → **node**:static_page

### paragraph:links_on_a_background_image

- `field_links_list` → **paragraph**:link
- `field_paragraph_image` → **media**:image

### paragraph:projekt_billede_galleri

- `field_image_gallery` → **media**:image

### paragraph:teaser_row

- `field_content` → **node**:public_meeting
- `field_content` → **node**:citizen_proposal
- `field_content` → **node**:hearing
- `field_content` → **node**:project_main_page
- `field_content` → **node**:static_page

### paragraph:text_aside_blocks_2_column

- `field_aside_block` → **block_content**:aside_contact_info
- `field_aside_block` → **block_content**:aside_link_box

### paragraph:timeline_note

- `field_paragraph_image` → **media**:image
