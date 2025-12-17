# Color Refactoring Plan - Deltag Aarhus

## Executive Summary

This document outlines a plan to centralize all colors as CSS custom properties while maintaining SCSS compatibility.
The goal is better maintainability, easier theming, and runtime color customization capabilities.

---

## Current State Analysis

### Color Definition Locations

| File                      | Purpose                   | Status             |
| ------------------------- | ------------------------- | ------------------ |
| `_bootstrap-custom.scss`  | Primary color definitions | Well-organized     |
| `deskpro-custom-css.scss` | External Deskpro styling  | 5 hardcoded colors |
| `module/_accordion.scss`  | Accordion component       | 2 hardcoded colors |

### Existing Color Variables (SCSS)

**Grayscale:**

- `$white: #fff`
- `$black: #333` (redefined from `#000`)
- `$gray-100` through `$gray-900`

**Brand Colors (9 color pairs):**

| Color     | Base                | Light     |
| --------- | ------------------- | --------- |
| Pink      | `#ee0043`           | `#fab2c6` |
| Purple    | `#673ab7`           | `#d1c4e9` |
| Blue      | `#3661d8`           | `#c2cff3` |
| Navy      | `#2b3ba2`           | `#bfc4e3` |
| Petroleum | `#008486` (PRIMARY) | `#b2dada` |
| Green     | `#008850`           | `#b2dbca` |
| Yellow    | `#ffe13d`           | `#fff6c4` |
| Orange    | `#ff5f31`           | `#ffcfc1` |
| Red       | `#d32f2f`           | `#f2c0c0` |

**Modern OKLCH Colors (already added):**

- `$color-petroleum-100/200/800/900`
- `$color-peach-100/200/600`
- `$color-blue-100`
- `$color-stone-100/600`

### Current CSS Custom Properties Usage

Already using CSS custom properties in:

- `_info_box.scss` - `--bg-color`, `--secondary-bg-color`, `--text-color`, `--link-color`
- `_card.scss` - `--transition-duration-in/out`, `--transition-easing-in/out`
- `_animated-svg.scss` - `--path-fill-color`, `--path-stroke-color`
- `_accordion.scss` - `--accordion-border`

### Hardcoded Colors Found

1. **`deskpro-custom-css.scss`** (external stylesheet - special case):
   - `#f5f5f5` - should be `$gray-100` or similar
   - `#b2dada` - is `$petroleum-light`
   - `#858585` - is `$gray-700`
   - `#f2c0c0` - is `$red-light`
   - `#333` - is `$black`

2. **`module/_accordion.scss`**:
   - `#333` in border definition
   - `#008486` in SVG data URL

---

## OKLCH Strategy

All colors will be defined in OKLCH color space for better perceptual uniformity and easier color manipulation.
To support older browsers, we use a fallback strategy.

### Fallback Approach

Use the CSS cascade with fallback values:

```scss
:root {
  // Fallback for older browsers (hex/rgb)
  --color-petroleum: #008486;
  // Modern browsers will use OKLCH (overrides the above)
  --color-petroleum: oklch(52% 0.1 180);
}
```

Alternatively, use `@supports` for explicit separation:

```scss
:root {
  --color-petroleum: #008486;
}

@supports (color: oklch(0% 0 0)) {
  :root {
    --color-petroleum: oklch(52% 0.1 180);
  }
}
```

**Recommendation:** Use the cascade approach (first example) for simplicity.
Modern browsers override; older browsers ignore the OKLCH line.

### OKLCH Benefits

- Perceptually uniform lightness (50% lightness looks equally bright across hues)
- Easier to create consistent color scales
- Better for generating accessible color combinations
- Native support in modern browsers (Chrome 111+, Safari 15.4+, Firefox 113+)

---

## Proposed Architecture

### Token Layer Structure

The color system uses a **two-layer architecture** to support theming:

1. **Primitive tokens** - Raw color values (don't change between themes)
2. **Semantic tokens** - Contextual usage (change between themes)

This separation enables dark mode and accessibility themes without changing component code.

### Phase 1: Primitive Color Tokens

Create `_color-tokens.scss` with all base color values:

```scss
// _color-tokens.scss - Primitive tokens (raw values)
:root {
  // Grayscale primitives
  --primitive-white: #fff;
  --primitive-white: oklch(100% 0 0);
  --primitive-black: #333;
  --primitive-black: oklch(25% 0 0);
  --primitive-gray-100: #f8f9fa;
  --primitive-gray-100: oklch(98% 0.005 250);
  // ... etc for all gray scale

  // Brand color primitives
  --primitive-petroleum-500: #008486;
  --primitive-petroleum-500: oklch(52% 0.1 180);
  --primitive-petroleum-200: #b2dada;
  --primitive-petroleum-200: oklch(85% 0.05 180);

  --primitive-pink-500: #ee0043;
  --primitive-pink-500: oklch(55% 0.25 10);
  --primitive-pink-200: #fab2c6;
  --primitive-pink-200: oklch(82% 0.08 10);

  // ... etc for all brand colors

  // Status color primitives
  --primitive-red-500: #d32f2f;
  --primitive-red-500: oklch(50% 0.2 25);
  --primitive-green-500: #008850;
  --primitive-green-500: oklch(52% 0.15 160);
  --primitive-yellow-500: #ffe13d;
  --primitive-yellow-500: oklch(90% 0.15 95);
  --primitive-blue-500: #3661d8;
  --primitive-blue-500: oklch(50% 0.2 265);
}
```

### Phase 2: Semantic Color Tokens

Map primitives to semantic usage (these change between themes):

```scss
// _color-tokens.scss - Semantic tokens (contextual usage)
:root {
  // Text colors
  --text-primary: var(--primitive-black);
  --text-secondary: var(--primitive-gray-700);
  --text-muted: var(--primitive-gray-600);
  --text-inverse: var(--primitive-white);

  // Background colors
  --bg-primary: var(--primitive-white);
  --bg-secondary: var(--primitive-gray-100);
  --bg-accent: var(--primitive-petroleum-500);
  --bg-accent-subtle: var(--primitive-petroleum-200);

  // Border colors
  --border-default: var(--primitive-gray-300);
  --border-strong: var(--primitive-black);
  --border-accent: var(--primitive-petroleum-500);

  // Interactive colors
  --interactive-primary: var(--primitive-petroleum-500);
  --interactive-primary-hover: var(--primitive-petroleum-700);
  --interactive-primary-active: var(--primitive-petroleum-800);

  // Status colors
  --status-danger: var(--primitive-red-500);
  --status-warning: var(--primitive-yellow-500);
  --status-success: var(--primitive-green-500);
  --status-info: var(--primitive-blue-500);

  // Focus states
  --focus-ring-color: var(--primitive-petroleum-500);
  --focus-ring-width: 2px;
}
```

### Phase 3: Theme Variants

Scaffolding for future dark mode and accessibility themes:

```scss
// Dark mode (future implementation)
@media (prefers-color-scheme: dark) {
  :root:not(.theme-light) {
    // Invert semantic tokens
    --text-primary: var(--primitive-gray-100);
    --text-secondary: var(--primitive-gray-300);
    --text-inverse: var(--primitive-black);

    --bg-primary: var(--primitive-gray-900);
    --bg-secondary: var(--primitive-gray-800);

    --border-default: var(--primitive-gray-700);
    --border-strong: var(--primitive-white);
  }
}

// Manual dark mode toggle
.theme-dark {
  --text-primary: var(--primitive-gray-100);
  --bg-primary: var(--primitive-gray-900);
  // ... etc
}

// High contrast accessibility theme
.theme-high-contrast {
  --text-primary: #000;
  --text-secondary: #000;
  --bg-primary: #fff;
  --border-default: #000;
  --border-strong: #000;
  --focus-ring-width: 3px;
  --focus-ring-color: #000;
}
```

---

## Implementation Steps

### Step 1: Audit & Document Color Usage

- [ ] Identify all SCSS variables actually in use
- [ ] Map which components use which colors
- [ ] Document color usage in a reference table (color → components using it)
- [ ] Identify unused color variables for potential removal
- [ ] Convert existing hex colors to OKLCH equivalents (create conversion table)

### Step 2: Create Color Token File

- [ ] Create `_color-tokens.scss`
- [ ] Define primitive tokens with hex fallbacks + OKLCH values
- [ ] Define semantic tokens mapping to primitives
- [ ] Add theme variant scaffolding (dark mode, high contrast) as comments/placeholders
- [ ] Import before other modules in `hoeringsportal.scss`

### Step 3: Replace Hardcoded Values

- [ ] Fix `_accordion.scss` hardcoded colors
- [ ] Fix `deskpro-custom-css.scss` (requires special handling)

### Step 4: Migrate Components Gradually

Priority order (by impact):

1. [ ] `_btn.scss` - buttons are everywhere
2. [ ] `_card.scss` - content type colors
3. [ ] `_hero.scss` - prominent visual element
4. [ ] `_nav.scss` - site-wide navigation
5. [ ] `_form-elements.scss` - form styling
6. [ ] Remaining 40+ modules

### Step 5: Remove Unused Colors

After migration, evaluate and remove:

- Potentially unused: `$navy`, `$navy-light`, `$purple`, `$purple-light`
- Duplicate definitions (e.g., `$black` defined twice)

### Step 6: Documentation

- [ ] Document color naming conventions
- [ ] Create visual color palette reference
- [ ] Update component documentation

---

## File Structure After Refactoring

```Filestructure
assets/css/
├── _custom-variables.scss      (spacing, typography - unchanged)
├── _bootstrap-custom.scss      (Bootstrap overrides, SCSS color vars)
├── _color-tokens.scss          (NEW - CSS custom properties)
├── hoeringsportal.scss         (main entry - add _color-tokens import)
├── layout/
└── module/
```

**Import order in `hoeringsportal.scss`:**

```scss
@import "custom-variables";
@import "bootstrap-custom"; // SCSS vars + Bootstrap
@import "color-tokens"; // CSS custom properties (NEW)
@import "base";
// ... modules
```

---

## Migration Strategy Per Component

For each module file:

1. **Identify color usage** - Find all `$color-name` references
2. **Map to semantic tokens** - Determine appropriate semantic token (prefer semantic over primitive)
3. **Update selectors** - Replace `$var` with `var(--semantic-token)`
4. **Test visually** - Verify no regressions
5. **Document** - Note which semantic tokens are used by the component

**Token selection priority:**

1. Use **semantic tokens** when the color serves a purpose (text, background, border, status)
2. Use **primitive tokens** only when the color is decorative or brand-specific

**Example transformation:**

Before:

```scss
.hero {
  background-color: $primary;
  color: $white;
}
```

After:

```scss
.hero {
  background-color: var(--bg-accent);
  color: var(--text-inverse);
}
```

This approach ensures components automatically adapt to theme changes (dark mode, high contrast).

---

## Special Considerations

### Deskpro Stylesheet

The `deskpro-custom-css.scss` is loaded externally by Deskpro. Options:

1. **Keep hardcoded** - Simplest, Deskpro cannot use our CSS variables
2. **Duplicate values** - Define same colors but reference existing SCSS vars at build time
3. **Inline the values** - Use SCSS interpolation `#{$petroleum-light}`

**Recommendation:** Option 3 - use SCSS interpolation so colors stay in sync at build time.

### Bootstrap Integration

Bootstrap generates many color shades automatically. The approach:

- Keep SCSS variables for Bootstrap configuration
- Export final computed values as CSS custom properties
- Use `--bs-*` variables where Bootstrap already provides them

### SVG Data URLs

Colors in SVG data URLs (like in `_accordion.scss`) cannot use CSS variables directly. Solutions:

1. Use SCSS interpolation: `url("...stroke='#{$primary}'...")`
2. Use external SVG files with `currentColor`
3. Use CSS `mask-image` with `background-color`

---

## Risk Assessment

| Risk                | Impact   | Mitigation                               |
| ------------------- | -------- | ---------------------------------------- |
| Visual regressions  | Medium   | Thorough visual testing per component    |
| Bootstrap conflicts | Low      | Test Bootstrap component styling         |
| Build errors        | Low      | Incremental migration with CI checks     |
| Performance         | Very Low | CSS custom properties are well-optimized |

---

## Success Metrics

- [ ] All colors defined in central location (`_color-tokens.scss`)
- [ ] Zero hardcoded hex colors in module files
- [ ] All colors defined in OKLCH with hex fallbacks
- [ ] Documented color system with usage reference
- [ ] Primitive + semantic token architecture in place
- [ ] Ability to adjust colors at runtime via CSS custom properties
- [ ] Theme scaffolding ready for dark mode and high-contrast themes
- [ ] Reduced total number of unique colors (documented which are unused)

---

## Questions Resolved

1. **Color palette reduction**: Are all 9 brand color pairs needed, or can some be removed?
   ✅ **Decision:** Keep all for now. Document which ones are actually in use during the audit phase.

2. **OKLCH adoption**: Should all colors migrate to OKLCH for better color manipulation?
   ✅ **Decision:** Yes, all colors in OKLCH with hex fallbacks for older browsers. See "OKLCH Strategy" section.

3. **Dark mode**: Is dark mode support a future requirement? (Affects token architecture)
   ✅ **Decision:** Yes, possible future requirement. Architecture uses primitive + semantic token layers
   to support this. See "Phase 3: Theme Variants".

4. **Theming**: Will there be multiple color themes beyond the current one?
   ✅ **Decision:** Yes, high-contrast accessibility theme is a possibility. Theme scaffolding included in architecture.

---

## Color Audit Results

### Color Variables Defined (34 total)

**Hex-based (24):** `$white`, `$black`, `$gray-100` through `$gray-900`, `$pink`/`$pink-light`,
`$purple`/`$purple-light`, `$blue`/`$blue-light`, `$navy`/`$navy-light`, `$petroleum`/`$petroleum-light`,
`$green`/`$green-light`, `$yellow`/`$yellow-light`, `$orange`/`$orange-light`, `$red`/`$red-light`

**OKLCH (10):** `$color-petroleum-100/200/800/900`, `$color-peach-100/200/600`, `$color-blue-100`,
`$color-stone-100/600`

### Most Used Colors

| Variable                   | Usage | Primary Uses                         |
| -------------------------- | ----- | ------------------------------------ |
| `$primary` / `$petroleum`  | 40+   | Buttons, links, navigation, headings |
| `$white`                   | 30+   | Text, backgrounds, borders           |
| `$black` (#333)            | 15+   | Text, backgrounds                    |
| `$gray-*` series           | 25+   | Borders, backgrounds, secondary text |
| `$petroleum-light`         | 10+   | Backgrounds, timeline                |
| `$color-petroleum-100/800` | 8+    | Modern header components             |

### Unused Colors (13)

These colors are defined but never used in SCSS files:

- `$pink`, `$pink-light`
- `$purple`, `$purple-light`
- `$navy`, `$navy-light`
- `$green`, `$green-light`
- `$yellow`, `$yellow-light`
- `$blue-light` (note: `$blue` used 2x in `_card.scss`)

**Decision:** Keep all for now, document as "reserved for future use"

### Hardcoded Colors Found

| File                         | Color     | Should Be                   |
| ---------------------------- | --------- | --------------------------- |
| `deskpro-custom-css.scss:20` | `#f5f5f5` | `$gray-100`                 |
| `deskpro-custom-css.scss:26` | `#b2dada` | `$petroleum-light`          |
| `deskpro-custom-css.scss:33` | `#858585` | `$gray-700`                 |
| `deskpro-custom-css.scss:40` | `#f2c0c0` | `$red-light`                |
| `deskpro-custom-css.scss:41` | `#333`    | `$black`                    |
| `module/_accordion.scss:3`   | `#333`    | `$black`                    |
| `module/_accordion.scss:4`   | `#008486` | SVG data-uri (special case) |

### Files by Color Usage (Top 12)

| File                         | Color Refs | Primary Colors                           |
| ---------------------------- | ---------- | ---------------------------------------- |
| `module/_btn.scss`           | 16         | `$primary`, `$petroleum`, `$white`       |
| `module/_timeline.scss`      | 13         | `$primary`, `$black`, `$petroleum-light` |
| `module/_search.scss`        | 13         | `$primary`, `$black`, `$gray-*`          |
| `module/_page-teaser.scss`   | 12         | `$white`, `$gray-900`, `$petroleum`      |
| `module/_content.scss`       | 10         | `$white`, `$primary`, `$gray-*`          |
| `module/_info_box.scss`      | 9          | `$color-petroleum-100`, `$petroleum`     |
| `module/_header-v2.scss`     | 9          | `$color-petroleum-*`, `$color-peach-*`   |
| `module/_list.scss`          | 8          | `$white`, `$primary`, `$gray-*`          |
| `module/_hero.scss`          | 8          | `$white`, `$primary`, `$black`           |
| `module/_nav.scss`           | 7          | `$primary`, `$black`, `$gray-*`          |
| `module/_image-gallery.scss` | 7          | `$petroleum`, `$white`                   |
| `layout/_aside.scss`         | 7          | `$color-petroleum-*`, `$color-peach-*`   |

---

## Next Steps

1. ~~Review and approve this plan~~ ✅
2. ~~Start with Step 1 (Audit) to identify unused colors~~ ✅
3. Create `_color-tokens.scss` with initial CSS custom properties
4. Migrate one component as proof-of-concept
5. Continue migration in priority order
