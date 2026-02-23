---
name: similarweb-branding
description: "Similarweb's latest presentation design system with comprehensive layouts, typography, colors, and components. Use when creating Similarweb presentations, pitch decks, or any branded materials."
---

# Similarweb Presentation Branding & Design System

## Overview

This skill provides the complete Similarweb presentation design system extracted from the latest Q3 2025 internal deck. It includes colors, typography, layouts, and reusable components that reflect Similarweb's modern, tech-forward AI and data intelligence brand.

## Design Philosophy

**Brand Essence**: Modern, data-driven, AI-powered intelligence platform
**Visual Style**: Dark technology aesthetic with vibrant blue accents, glowing effects, and clean typography
**Tone**: Forward-thinking, professional, innovative, accessible

## Color Palette

### Primary Colors

```css
--sw-navy-dark: #0A0E27;        /* Primary background - deep navy */
--sw-navy-medium: #141B3D;      /* Secondary background */
--sw-blue-bright: #2962FF;      /* Primary brand blue - CTA, highlights */
--sw-blue-electric: #4D7CFF;    /* Accent blue - lighter variant */
--sw-blue-vivid: #FFEB00;       /* Yellow accent - for emphasis */
```

### Gradient System

```css
/* Background Gradients */
--sw-gradient-dark: radial-gradient(ellipse at center, #1a2555 0%, #0a0e27 100%);
--sw-gradient-blue: radial-gradient(circle at 50% 30%, #2962ff44 0%, transparent 70%);
--sw-gradient-tech: linear-gradient(135deg, #0a0e27 0%, #1a2555 50%, #0a0e27 100%);

/* Glow Effects */
--sw-glow-blue: radial-gradient(circle, rgba(41, 98, 255, 0.4) 0%, transparent 70%);
--sw-glow-purple: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%);
```

### Semantic Colors

```css
--sw-text-primary: #FFFFFF;
--sw-text-secondary: #B8C5D9;
--sw-text-tertiary: #7B8BA8;
--sw-success-green: #10B981;
--sw-warning-red: #EF4444;
--sw-accent-purple: #9333EA;
--sw-accent-orange: #F97316;
```

### UI Component Colors

```css
--sw-card-bg: rgba(20, 27, 61, 0.6);
--sw-card-border: rgba(77, 124, 255, 0.2);
--sw-button-primary: #2962FF;
--sw-button-hover: #4D7CFF;
--sw-divider: rgba(184, 197, 217, 0.1);
```

## Typography System

### Font Families

```css
--sw-font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--sw-font-display: 'Inter', sans-serif;  /* For large headings */
```

### Font Sizes & Hierarchy

```css
/* Display/Hero Text */
--sw-text-hero: 72px;           /* Line height: 1.1 */
--sw-text-display: 56px;        /* Line height: 1.1 */

/* Headings */
--sw-text-h1: 48px;             /* Line height: 1.2, weight: 700 */
--sw-text-h2: 36px;             /* Line height: 1.3, weight: 700 */
--sw-text-h3: 28px;             /* Line height: 1.4, weight: 600 */
--sw-text-h4: 24px;             /* Line height: 1.4, weight: 600 */

/* Body Text */
--sw-text-large: 20px;          /* Line height: 1.6, weight: 400 */
--sw-text-body: 18px;           /* Line height: 1.6, weight: 400 */
--sw-text-small: 16px;          /* Line height: 1.5, weight: 400 */
--sw-text-caption: 14px;        /* Line height: 1.4, weight: 400 */

/* Special Text */
--sw-text-code: 16px;           /* Monospace */
--sw-text-quote: 22px;          /* Line height: 1.6, italic */
```

### Font Weights

```css
--sw-weight-regular: 400;
--sw-weight-medium: 500;
--sw-weight-semibold: 600;
--sw-weight-bold: 700;
```

## Spacing System

```css
--sw-space-xs: 8px;
--sw-space-sm: 16px;
--sw-space-md: 24px;
--sw-space-lg: 32px;
--sw-space-xl: 48px;
--sw-space-2xl: 64px;
--sw-space-3xl: 96px;
```

## Layout Dimensions

```css
/* Standard 16:9 Slide */
--slide-width: 960px;
--slide-height: 540px;

/* Content Safe Zones */
--content-padding: 48px;        /* Left/Right margin */
--content-padding-top: 48px;    /* Top margin */
--content-padding-bottom: 48px; /* Bottom margin */

/* Header/Footer */
--header-height: 80px;
--footer-height: 48px;
```

## Common Layout Patterns

### 1. Title Slide (Hero)

**Use for**: Opening slides, section dividers
**Layout**: Large heading on left, visual/graphic on right

```html
<style>
  body {
    background: radial-gradient(ellipse at 70% 50%, #1a2555 0%, #0a0e27 100%);
  }
  .hero-content {
    position: absolute;
    left: 48px;
    top: 80px;
    max-width: 550px;
  }
  .hero-title {
    font-size: 48px;
    font-weight: 700;
    line-height: 1.2;
    color: #FFFFFF;
    margin-bottom: 32px;
  }
  .hero-subtitle {
    font-size: 22px;
    font-style: italic;
    line-height: 1.6;
    color: #B8C5D9;
  }
  .hero-visual {
    position: absolute;
    right: 48px;
    top: 50%;
    transform: translateY(-50%);
    width: 400px;
  }
</style>
```

### 2. Three-Column Layout

**Use for**: Feature comparisons, pillars, benefits
**Layout**: Three equal columns with icons/headings

```html
<style>
  .three-col-container {
    display: flex;
    gap: 32px;
    padding: 80px 48px;
    justify-content: space-between;
  }
  .col-item {
    flex: 1;
    text-align: center;
  }
  .col-icon {
    width: 120px;
    height: 120px;
    margin: 0 auto 24px;
    background: radial-gradient(circle, rgba(41, 98, 255, 0.3) 0%, transparent 70%);
    border-radius: 50%;
  }
  .col-heading {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .col-body {
    font-size: 18px;
    line-height: 1.6;
    color: #B8C5D9;
  }
</style>
```

### 3. Content + Sidebar Layout

**Use for**: Text with supporting callout, stats, or checklist
**Layout**: Main content (60%), sidebar (35%), 5% gap

```html
<style>
  .content-sidebar {
    display: flex;
    gap: 48px;
    padding: 80px 48px;
  }
  .main-content {
    flex: 6;
  }
  .sidebar {
    flex: 4;
    background: rgba(20, 27, 61, 0.6);
    border: 1px solid rgba(77, 124, 255, 0.2);
    border-radius: 16px;
    padding: 32px;
  }
</style>
```

### 4. Card Grid Layout

**Use for**: Use cases, features, team members, testimonials
**Layout**: 2x2 or 2x3 grid of cards

```html
<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 80px 48px;
  }
  .card {
    background: rgba(20, 27, 61, 0.6);
    border: 1px solid rgba(77, 124, 255, 0.2);
    border-radius: 16px;
    padding: 32px;
  }
  .card-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
  }
</style>
```

### 5. Quote/Testimonial Slide

**Use for**: Customer quotes, key insights, important messages
**Layout**: Centered large text with attribution

```html
<style>
  .quote-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 120px;
    text-align: center;
  }
  .quote-text {
    font-size: 32px;
    font-style: italic;
    line-height: 1.5;
    color: #FFFFFF;
    margin-bottom: 24px;
  }
  .quote-author {
    font-size: 18px;
    color: #B8C5D9;
  }
</style>
```

### 6. Process/Timeline Slide

**Use for**: Step-by-step processes, roadmaps, timelines
**Layout**: Horizontal or vertical flow with numbered steps

```html
<style>
  .process-container {
    display: flex;
    gap: 24px;
    padding: 80px 48px;
    align-items: flex-start;
  }
  .process-step {
    flex: 1;
    text-align: center;
  }
  .step-number {
    width: 60px;
    height: 60px;
    margin: 0 auto 16px;
    background: #2962FF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
  }
</style>
```

## Component Library

### Header Component

```html
<div class="slide-header">
  <h2 class="header-title">Slide Title Here</h2>
</div>

<style>
  .slide-header {
    position: absolute;
    top: 32px;
    left: 48px;
    right: 48px;
  }
  .header-title {
    font-size: 32px;
    font-weight: 600;
    color: #FFFFFF;
  }
</style>
```

### Footer Component

```html
<div class="slide-footer">
  <div class="footer-left">
    <img src="similarweb-logo.svg" alt="Similarweb" class="footer-logo">
    <span class="footer-divider">|</span>
    <span class="footer-label">Enablement</span>
  </div>
  <div class="footer-right">
    <span>Business Proprietary & Confidential | <span class="page-num">1</span></span>
  </div>
</div>

<style>
  .slide-footer {
    position: absolute;
    bottom: 24px;
    left: 48px;
    right: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #B8C5D9;
  }
  .footer-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .footer-logo {
    height: 20px;
  }
  .footer-label {
    background: #2962FF;
    padding: 4px 12px;
    border-radius: 4px;
    color: #FFFFFF;
    font-weight: 500;
  }
</style>
```

### Icon Badge Component

**Use for**: Feature highlights, checkmarks, icons

```html
<div class="icon-badge">
  <svg><!-- Icon SVG --></svg>
</div>

<style>
  .icon-badge {
    width: 48px;
    height: 48px;
    background: rgba(41, 98, 255, 0.2);
    border: 2px solid #2962FF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
```

### Glowing Circle Component

**Use for**: Persona avatars, feature icons, emphasis points

```html
<div class="glow-circle">
  <div class="glow-inner">
    <!-- Content here -->
  </div>
</div>

<style>
  .glow-circle {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(41, 98, 255, 0.4) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    filter: blur(1px);
  }
  .glow-inner {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: #FFFFFF;
    overflow: hidden;
  }
</style>
```

### Pill Button Component

```html
<button class="pill-button">Button Text</button>

<style>
  .pill-button {
    background: #2962FF;
    color: #FFFFFF;
    padding: 12px 32px;
    border-radius: 24px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .pill-button:hover {
    background: #4D7CFF;
    transform: translateY(-2px);
  }
</style>
```

### Card Component

```html
<div class="sw-card">
  <h3 class="card-title">Card Title</h3>
  <p class="card-body">Card description text goes here.</p>
</div>

<style>
  .sw-card {
    background: rgba(20, 27, 61, 0.6);
    border: 1px solid rgba(77, 124, 255, 0.2);
    border-radius: 16px;
    padding: 32px;
    backdrop-filter: blur(10px);
  }
  .card-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #FFFFFF;
  }
  .card-body {
    font-size: 18px;
    line-height: 1.6;
    color: #B8C5D9;
  }
</style>
```

### Checklist Component

```html
<ul class="sw-checklist">
  <li>✔ First item with checkmark</li>
  <li>✔ Second item with checkmark</li>
  <li>✔ Third item with checkmark</li>
</ul>

<style>
  .sw-checklist {
    list-style: none;
    padding: 0;
  }
  .sw-checklist li {
    font-size: 18px;
    line-height: 1.8;
    color: #FFFFFF;
    padding-left: 8px;
  }
  .sw-checklist li::before {
    content: '✔';
    color: #10B981;
    font-weight: 700;
    margin-right: 12px;
  }
</style>
```

### Insight Box Component

**Use for**: Key takeaways, pro tips, important notes

```html
<div class="insight-box">
  <div class="insight-icon">💡</div>
  <div class="insight-content">
    <p>Key insight or takeaway message here</p>
  </div>
</div>

<style>
  .insight-box {
    background: linear-gradient(135deg, rgba(41, 98, 255, 0.2) 0%, rgba(41, 98, 255, 0.05) 100%);
    border-left: 4px solid #2962FF;
    padding: 24px;
    border-radius: 8px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }
  .insight-icon {
    font-size: 32px;
    flex-shrink: 0;
  }
  .insight-content {
    font-size: 18px;
    line-height: 1.6;
    color: #FFFFFF;
  }
</style>
```

## Background Patterns

### Tech Grid Pattern

```html
<style>
  body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(41, 98, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(41, 98, 255, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: -1;
  }
</style>
```

### Dotted Pattern

```html
<style>
  body::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle, rgba(77, 124, 255, 0.1) 1px, transparent 1px);
    background-size: 30px 30px;
    z-index: -1;
  }
</style>
```

## Animation & Effects

### Subtle Hover Effects

```css
.hoverable {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hoverable:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(41, 98, 255, 0.3);
}
```

### Glow Animation

```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(41, 98, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(41, 98, 255, 0.8);
  }
}

.glow-animate {
  animation: pulse-glow 3s ease-in-out infinite;
}
```

## Usage Guidelines

### When to Use Each Layout

1. **Title Slide**: First slide, section dividers
2. **Three-Column**: Features, benefits, comparisons (3 items)
3. **Content + Sidebar**: Detailed content with supporting info
4. **Card Grid**: Multiple items to showcase (4-6 items)
5. **Quote**: Customer testimonials, key insights
6. **Process**: Step-by-step guides, workflows

### Typography Best Practices

- **Hero text**: Use sparingly, only on cover slides
- **Headers**: Keep to 1-2 lines maximum
- **Body text**: 18px minimum for readability
- **Line height**: Generous spacing (1.6) for body text
- **Bold text**: Use for emphasis on key points only

### Color Usage

- **Backgrounds**: Always use dark navy gradients
- **Text**: White for primary, light blue/gray for secondary
- **Accents**: Blue for CTA, success green for checkmarks
- **Warnings**: Use red sparingly, only for critical info

### Spacing Rules

- Minimum 48px padding from slide edges
- 24-32px gap between major sections
- 16-24px gap between related items
- 8-16px gap for tightly grouped elements

## Common Mistakes to Avoid

1. **Don't** use pure black (#000000) - use navy instead
2. **Don't** use small text (<16px) - readability is key
3. **Don't** overcrowd slides - embrace white space
4. **Don't** mix too many colors - stick to the palette
5. **Don't** use decorative fonts - Inter is the standard

## Accessibility Considerations

- Maintain 4.5:1 contrast ratio minimum
- Use 18px+ font size for body text
- Provide sufficient spacing between interactive elements
- Avoid color as the only means of conveying information

## Sample CSS Template

Use this as a starting point for all Similarweb presentations:

```css
:root {
  /* Colors */
  --sw-navy-dark: #0A0E27;
  --sw-navy-medium: #141B3D;
  --sw-blue-bright: #2962FF;
  --sw-blue-electric: #4D7CFF;
  --sw-text-primary: #FFFFFF;
  --sw-text-secondary: #B8C5D9;
  --sw-success-green: #10B981;
  
  /* Typography */
  --sw-font-primary: 'Inter', sans-serif;
  --sw-text-h1: 48px;
  --sw-text-h2: 36px;
  --sw-text-body: 18px;
  
  /* Spacing */
  --sw-space-sm: 16px;
  --sw-space-md: 24px;
  --sw-space-lg: 32px;
  --sw-space-xl: 48px;
}

body {
  width: 960px;
  height: 540px;
  margin: 0;
  padding: 0;
  font-family: var(--sw-font-primary);
  background: radial-gradient(ellipse at center, #1a2555 0%, #0a0e27 100%);
  color: var(--sw-text-primary);
  overflow: hidden;
}

h1 {
  font-size: var(--sw-text-h1);
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 var(--sw-space-md) 0;
}

h2 {
  font-size: var(--sw-text-h2);
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 var(--sw-space-md) 0;
}

p {
  font-size: var(--sw-text-body);
  line-height: 1.6;
  margin: 0 0 var(--sw-space-sm) 0;
  color: var(--sw-text-secondary);
}

.slide-content {
  padding: var(--sw-space-xl);
}
```

## Examples

### Example 1: Hero Slide

```html
<!DOCTYPE html>
<html>
<head>
<style>
:root {
  --sw-navy-dark: #0A0E27;
  --sw-blue-bright: #2962FF;
  --sw-text-primary: #FFFFFF;
  --sw-text-secondary: #B8C5D9;
}

body {
  width: 960px;
  height: 540px;
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: radial-gradient(ellipse at 70% 50%, #1a2555 0%, #0a0e27 100%);
  color: var(--sw-text-primary);
  position: relative;
}

.hero-content {
  position: absolute;
  left: 48px;
  top: 80px;
  max-width: 500px;
}

.section-label {
  font-size: 18px;
  color: var(--sw-text-secondary);
  margin-bottom: 24px;
}

h1 {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 32px;
}

.subtitle {
  font-size: 22px;
  font-style: italic;
  line-height: 1.6;
  color: var(--sw-text-secondary);
}

.subtitle strong {
  color: var(--sw-text-primary);
  font-weight: 600;
}

.footer {
  position: absolute;
  bottom: 24px;
  left: 48px;
  right: 48px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--sw-text-secondary);
}

.footer-label {
  background: var(--sw-blue-bright);
  padding: 4px 12px;
  border-radius: 4px;
  color: white;
  margin-left: 12px;
}
</style>
</head>
<body>
  <div class="hero-content">
    <div class="section-label">Product Vision</div>
    <h1>Transforming Digital Intelligence Through AI</h1>
    <p class="subtitle">
      We enable clients to <strong>unlock insights</strong>, 
      orchestrate workflows, and automate data delivery through 
      <strong>natural language</strong>
    </p>
  </div>
  
  <div class="footer">
    <div>
      <span>similarweb</span>
      <span class="footer-label">Internal</span>
    </div>
    <div>Business Proprietary & Confidential | 1</div>
  </div>
</body>
</html>
```

### Example 2: Three-Column Layout

```html
<!DOCTYPE html>
<html>
<head>
<style>
body {
  width: 960px;
  height: 540px;
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: radial-gradient(ellipse at center, #1a2555 0%, #0a0e27 100%);
  color: #FFFFFF;
  padding: 48px;
  box-sizing: border-box;
}

.header {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 48px;
}

.columns {
  display: flex;
  gap: 32px;
  margin-top: 64px;
}

.column {
  flex: 1;
  text-align: center;
}

.icon-circle {
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(41, 98, 255, 0.3) 0%, transparent 70%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

.column h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
}

.column p {
  font-size: 16px;
  line-height: 1.6;
  color: #B8C5D9;
}
</style>
</head>
<body>
  <h2 class="header">Three Pillars of Our Platform</h2>
  
  <div class="columns">
    <div class="column">
      <div class="icon-circle">🎯</div>
      <h3>Accessible</h3>
      <p>All data available through natural language interfaces</p>
    </div>
    
    <div class="column">
      <div class="icon-circle">⚡</div>
      <h3>Operational</h3>
      <p>Automate workflows and repetitive tasks with AI</p>
    </div>
    
    <div class="column">
      <div class="icon-circle">🚀</div>
      <h3>Actionable</h3>
      <p>Drive smarter decisions with proactive intelligence</p>
    </div>
  </div>
</body>
</html>
```

## Quick Reference

**Most Common Slide Types:**
1. Title/Hero (1st slide, section dividers)
2. Content slide with header
3. Three-column feature layout
4. Two-column comparison
5. Card grid (2x2 or 2x3)
6. Quote/testimonial
7. Process/timeline

**Essential Colors to Remember:**
- Background: `#0A0E27` (navy dark)
- Primary: `#2962FF` (bright blue)
- Text: `#FFFFFF` (white) and `#B8C5D9` (light blue-gray)
- Success: `#10B981` (green)

**Typography Quick Start:**
- Font: Inter
- H1: 48px, bold
- H2: 36px, semibold
- Body: 18px, regular
- Line height: 1.6 for body, 1.2 for headings

**Spacing Quick Start:**
- Slide padding: 48px
- Section gaps: 32px
- Element gaps: 24px
- Tight groups: 16px
