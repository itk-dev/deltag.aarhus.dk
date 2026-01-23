# Timeline "I dag" Card Implementation Plan

## Overview

Replace the current "I gang" (In progress) status card with an auto-generated "I dag" (Today) card that displays the current project status from a Drupal field.

## Current Behavior

- Timeline cards with `status: 'current'` display a badge labeled "I gang"
- The card content (title, description) is manually configured in the timeline data
- The orange styling indicates the current/active state

## Proposed Behavior

### "I dag" Card Features

| Aspect | Implementation |
|--------|----------------|
| **Status badge** | "I dag" (replaces "I gang") |
| **Date display** | Auto-generated current month and year (e.g., "Januar 2026") |
| **Title** | "Projektstatus" |
| **Content** | Project status from Drupal field (e.g., "Åben for inddragelse") |
| **Card height** | Maintain minimum height to prevent overlap with adjacent cards |
| **Styling** | Keep existing orange/current styling |

### Data Source

The project status text will come from a Drupal field on the project content type. This allows editors to update the status without modifying timeline code.

**Suggested field**: `field_project_status` (or existing field if available)

**Example values**:
- "Åben for inddragelse"
- "Under behandling"
- "Afventer høring"
- "Afsluttet"

## Technical Implementation

### 1. Twig Template Changes

**File**: `web/themes/custom/hoeringsportal/templates/components/project-timeline-card.html.twig`

```twig
{% set status_labels = {
  completed: '✓ Afsluttet'|t,
  current: 'I dag'|t,           {# Changed from 'I gang' #}
  upcoming: 'Kommende'|t,
  note: 'Note'|t,
} %}
```

### 2. Timeline Data Generation

**File**: Module or preprocess function that generates timeline data

The "I dag" card should be auto-generated with:

```php
$today_card = [
  'id' => 'today',
  'date' => date('Y-m-d'),
  'month' => format_date(time(), 'custom', 'F Y'),  // "Januar 2026"
  'title' => t('Projektstatus'),
  'subtitle' => NULL,
  'description' => $node->get('field_project_status')->value,
  'status' => 'current',
  'image' => NULL,
  'link' => NULL,
  'linkText' => NULL,
  'accentColor' => NULL,
];
```

### 3. Card Insertion Logic

The "I dag" card should be inserted at the correct chronological position:

1. Sort all timeline items by date
2. Find the position where today's date falls
3. Insert the "I dag" card at that position
4. Remove any manually configured `status: 'current'` items (or convert them to regular items)

### 4. CSS Adjustments

**File**: `web/themes/custom/hoeringsportal/assets/css/module/_timeline.scss`

Ensure minimum card height for the current/today card:

```scss
.project-timeline-card--current {
  .project-timeline-card__content {
    min-height: 200px;  // Adjust as needed to prevent overlap
  }
}
```

## Migration Considerations

1. **Existing data**: Any timeline items with `status: 'current'` should be reviewed
   - Convert to `status: 'completed'` if in the past
   - Convert to `status: 'upcoming'` if in the future
   - Remove if they were placeholder "current" items

2. **Field creation**: If `field_project_status` doesn't exist, it needs to be added to the project content type

3. **Translation**: Ensure "I dag" and "Projektstatus" are added to translation files

## Files to Modify

| File | Changes |
|------|---------|
| `project-timeline-card.html.twig` | Update status label |
| `timeline.html.twig` or preprocess | Auto-generate today card |
| `_timeline.scss` | Add min-height for current card |
| Project content type | Add/configure status field |
| `hoeringsportal.module` or similar | Timeline data preprocessing |

## Testing Checklist

- [ ] "I dag" card displays with current month/year
- [ ] Project status text displays from Drupal field
- [ ] Card maintains proper height (no overlap)
- [ ] Card appears at correct chronological position
- [ ] Vertical view displays correctly
- [ ] Horizontal/carousel view displays correctly
- [ ] Mini-nav highlights today correctly
- [ ] Mobile responsive layout works
- [ ] Translation strings work

## Open Questions

1. What is the exact Drupal field name for project status? (or should we create a new one?)
2. Should there be a fallback text if the project status field is empty?
3. Should the "I dag" card be hidden if today's date is outside the project timeline range?
