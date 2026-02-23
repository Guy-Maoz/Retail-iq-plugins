---
name: dashboard-ui
description: SimilarWeb-branded HTML dashboard builder for Amazon Intelligence. Generates beautiful, interactive single-file HTML reports with KPI cards, data tables, charts, trend indicators, and alerts. Every other skill should use this skill to present results visually. Use when generating any report, dashboard, or visual output.
---

# Dashboard UI

Build beautiful, interactive HTML dashboards using the SimilarWeb brand design system. **Every skill in this plugin should use this skill when presenting results to the user.** Output is a single self-contained `.html` file saved to the workspace folder.

## When to use

After any skill or command finishes pulling data from SimilarWeb MCP, use this skill to render the results as an interactive HTML dashboard instead of plain text. Always offer: "Would you like me to generate a visual dashboard for these results?"

## Architecture

Every dashboard is a **single self-contained HTML file** with:
- Inline CSS (SimilarWeb brand system)
- Inline JavaScript (Chart.js from CDN for charts, vanilla JS for interactivity)
- No external dependencies except the Google Fonts CDN for Inter and Chart.js CDN

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{Report Title}} — SimilarWeb Amazon Intelligence</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
  <style>/* Full CSS here */</style>
</head>
<body>
  <!-- Dashboard content -->
  <script>/* Chart initialization and interactivity */</script>
</body>
</html>
```

## Brand Foundation CSS

Every dashboard MUST begin with this base CSS. Do not deviate from these brand values.

```css
:root {
  /* === SimilarWeb Brand Colors === */
  --sw-navy-dark: #0A0E27;
  --sw-navy-medium: #141B3D;
  --sw-blue-bright: #2962FF;
  --sw-blue-electric: #4D7CFF;
  --sw-text-primary: #FFFFFF;
  --sw-text-secondary: #B8C5D9;
  --sw-text-tertiary: #7B8BA8;
  --sw-success: #10B981;
  --sw-danger: #EF4444;
  --sw-warning: #F97316;
  --sw-purple: #9333EA;

  /* === UI Surface Colors === */
  --sw-card-bg: rgba(20, 27, 61, 0.6);
  --sw-card-border: rgba(77, 124, 255, 0.2);
  --sw-card-hover: rgba(77, 124, 255, 0.08);
  --sw-divider: rgba(184, 197, 217, 0.1);
  --sw-input-bg: rgba(10, 14, 39, 0.6);

  /* === Typography === */
  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* === Spacing === */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  --space-xl: 48px;

  /* === Borders === */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font);
  background: var(--sw-navy-dark);
  color: var(--sw-text-primary);
  min-height: 100vh;
  line-height: 1.6;
}

/* === Tech grid background === */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(41, 98, 255, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(147, 51, 234, 0.05) 0%, transparent 50%),
    linear-gradient(rgba(41, 98, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(41, 98, 255, 0.03) 1px, transparent 1px);
  background-size: 100%, 100%, 40px 40px, 40px 40px;
  z-index: -1;
  pointer-events: none;
}
```

## Dashboard Shell

Every report uses this outer structure:

```html
<div class="dashboard">
  <header class="dash-header">
    <div class="dash-header-left">
      <div class="sw-logo">similarweb</div>
      <span class="dash-badge">Amazon Intelligence</span>
    </div>
    <div class="dash-header-right">
      <span class="dash-date">{{Generated date}}</span>
    </div>
  </header>

  <div class="dash-title-bar">
    <h1 class="dash-title">{{Report Title}}</h1>
    <p class="dash-subtitle">{{One-line description}}</p>
  </div>

  <!-- Alerts section (if any) -->
  <div class="alerts-strip">...</div>

  <!-- KPI row -->
  <div class="kpi-row">...</div>

  <!-- Main content sections -->
  <section class="dash-section">...</section>

  <footer class="dash-footer">
    Powered by SimilarWeb Shopper Intelligence &middot; Data as of {{date}}
  </footer>
</div>
```

```css
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-lg);
}

.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--sw-divider);
  margin-bottom: var(--space-lg);
}

.sw-logo {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, var(--sw-blue-bright), var(--sw-blue-electric));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dash-badge {
  font-size: 12px;
  font-weight: 600;
  background: var(--sw-blue-bright);
  color: white;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  margin-left: 12px;
}

.dash-date {
  font-size: 14px;
  color: var(--sw-text-tertiary);
}

.dash-title-bar {
  margin-bottom: var(--space-lg);
}

.dash-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-xs);
}

.dash-subtitle {
  font-size: 16px;
  color: var(--sw-text-secondary);
}

.dash-section {
  margin-bottom: var(--space-xl);
}

.dash-section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.dash-footer {
  text-align: center;
  padding-top: var(--space-lg);
  border-top: 1px solid var(--sw-divider);
  font-size: 13px;
  color: var(--sw-text-tertiary);
}
```

## Component Library

### 1. KPI Card

Use for: headline metrics (revenue, units, search share, growth rate).

```html
<div class="kpi-row">
  <div class="kpi-card">
    <div class="kpi-label">Revenue</div>
    <div class="kpi-value">$2.4M</div>
    <div class="kpi-trend trend-up">
      <span class="trend-arrow">&#9650;</span> 12.3%
    </div>
  </div>
  <div class="kpi-card">
    <div class="kpi-label">Search Share</div>
    <div class="kpi-value">8.7%</div>
    <div class="kpi-trend trend-down">
      <span class="trend-arrow">&#9660;</span> 1.2%
    </div>
  </div>
  <!-- More KPI cards -->
</div>
```

```css
.kpi-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.kpi-card {
  background: var(--sw-card-bg);
  border: 1px solid var(--sw-card-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.kpi-card:hover {
  border-color: var(--sw-blue-electric);
  box-shadow: 0 4px 24px rgba(41, 98, 255, 0.15);
  transform: translateY(-2px);
}

.kpi-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--sw-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-xs);
}

.kpi-value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--space-xs);
}

.kpi-trend {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.trend-up { color: var(--sw-success); }
.trend-down { color: var(--sw-danger); }
.trend-flat { color: var(--sw-text-tertiary); }

.trend-arrow { font-size: 10px; }
```

### 2. Data Table

Use for: brand comparisons, keyword lists, product rankings.

```html
<div class="table-container">
  <table class="sw-table">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Brand</th>
        <th class="num">Revenue</th>
        <th class="num">Search Share</th>
        <th class="num">Change</th>
      </tr>
    </thead>
    <tbody>
      <tr class="row-highlight">
        <td>1</td>
        <td><span class="brand-badge mine">Your Brand</span></td>
        <td class="num">$2.4M</td>
        <td class="num">8.7%</td>
        <td class="num"><span class="change-up">+12.3%</span></td>
      </tr>
      <tr>
        <td>2</td>
        <td>Competitor A</td>
        <td class="num">$3.1M</td>
        <td class="num">11.2%</td>
        <td class="num"><span class="change-down">-2.1%</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

```css
.table-container {
  background: var(--sw-card-bg);
  border: 1px solid var(--sw-card-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.sw-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.sw-table thead {
  background: rgba(41, 98, 255, 0.1);
}

.sw-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--sw-text-tertiary);
  border-bottom: 1px solid var(--sw-divider);
}

.sw-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--sw-divider);
  color: var(--sw-text-secondary);
}

.sw-table th.num, .sw-table td.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.sw-table tbody tr:hover {
  background: var(--sw-card-hover);
}

.sw-table tbody tr:last-child td {
  border-bottom: none;
}

.row-highlight {
  background: rgba(41, 98, 255, 0.06) !important;
}

.row-highlight td {
  color: var(--sw-text-primary);
  font-weight: 500;
}

.brand-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 600;
}

.brand-badge.mine {
  background: rgba(41, 98, 255, 0.2);
  color: var(--sw-blue-electric);
  border: 1px solid rgba(41, 98, 255, 0.3);
}

.change-up { color: var(--sw-success); font-weight: 600; }
.change-down { color: var(--sw-danger); font-weight: 600; }
.change-flat { color: var(--sw-text-tertiary); }
```

### 3. Chart Container

Use Chart.js for line, bar, and doughnut charts. Always use the SimilarWeb color palette.

```html
<div class="chart-card">
  <div class="chart-card-header">
    <h3>Revenue Trend</h3>
    <div class="chart-legend">
      <span class="legend-item"><span class="legend-dot" style="background:#2962FF"></span> Your Brand</span>
      <span class="legend-item"><span class="legend-dot" style="background:#9333EA"></span> Competitor A</span>
    </div>
  </div>
  <div class="chart-wrap">
    <canvas id="revenueChart"></canvas>
  </div>
</div>
```

```css
.chart-card {
  background: var(--sw-card-bg);
  border: 1px solid var(--sw-card-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  backdrop-filter: blur(10px);
}

.chart-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.chart-card-header h3 {
  font-size: 16px;
  font-weight: 600;
}

.chart-legend {
  display: flex;
  gap: var(--space-sm);
  font-size: 13px;
  color: var(--sw-text-secondary);
}

.legend-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 4px;
  vertical-align: middle;
}

.chart-wrap {
  position: relative;
  height: 280px;
}
```

**Chart.js theme defaults** (include in every dashboard script):

```javascript
Chart.defaults.color = '#B8C5D9';
Chart.defaults.borderColor = 'rgba(184, 197, 217, 0.1)';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;

const SW_COLORS = {
  blue: '#2962FF',
  blueLight: '#4D7CFF',
  purple: '#9333EA',
  green: '#10B981',
  red: '#EF4444',
  orange: '#F97316',
  yellow: '#FFEB00',
  gray: '#7B8BA8',
  series: ['#2962FF', '#9333EA', '#10B981', '#F97316', '#EF4444', '#4D7CFF', '#FFEB00']
};
```

### 4. Alert Banner

Use for: brand monitor alerts, threshold breaches, notable changes.

```html
<div class="alert alert-danger">
  <span class="alert-icon">&#9888;</span>
  <div class="alert-body">
    <strong>Search share dropped 3.2%</strong> — Competitor X gained significant ground in "wireless earbuds" keyword
  </div>
</div>

<div class="alert alert-success">
  <span class="alert-icon">&#10003;</span>
  <div class="alert-body">
    <strong>Revenue up 18%</strong> — Your top ASIN B08XYZ is outperforming category growth
  </div>
</div>
```

```css
.alerts-strip {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.alert {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  font-size: 14px;
  line-height: 1.5;
}

.alert-danger {
  background: rgba(239, 68, 68, 0.1);
  border-left: 4px solid var(--sw-danger);
  color: #FCA5A5;
}

.alert-success {
  background: rgba(16, 185, 129, 0.1);
  border-left: 4px solid var(--sw-success);
  color: #6EE7B7;
}

.alert-warning {
  background: rgba(249, 115, 22, 0.1);
  border-left: 4px solid var(--sw-warning);
  color: #FDBA74;
}

.alert-info {
  background: rgba(41, 98, 255, 0.1);
  border-left: 4px solid var(--sw-blue-bright);
  color: var(--sw-blue-electric);
}

.alert-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}

.alert-body strong {
  color: var(--sw-text-primary);
}
```

### 5. Insight Box

Use for: AI-generated strategic recommendations and key takeaways.

```html
<div class="insight-box">
  <div class="insight-icon">&#128161;</div>
  <div>
    <div class="insight-title">Key Insight</div>
    <div class="insight-text">Your brand is gaining search share in the "portable charger" keyword cluster, but competitor X is investing heavily in "fast charging" terms where you have no presence.</div>
  </div>
</div>
```

```css
.insight-box {
  background: linear-gradient(135deg, rgba(41, 98, 255, 0.12) 0%, rgba(41, 98, 255, 0.03) 100%);
  border-left: 4px solid var(--sw-blue-bright);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.insight-icon { font-size: 24px; flex-shrink: 0; }

.insight-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--sw-blue-electric);
  margin-bottom: 4px;
}

.insight-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--sw-text-secondary);
}
```

### 6. Share Bar

Use for: visualizing market share, search share, keyword ownership.

```html
<div class="share-bar-container">
  <div class="share-bar-label">
    <span>Search Share of Voice</span>
  </div>
  <div class="share-bar">
    <div class="share-segment" style="width: 28%; background: #2962FF;" title="Your Brand: 28%"></div>
    <div class="share-segment" style="width: 22%; background: #9333EA;" title="Competitor A: 22%"></div>
    <div class="share-segment" style="width: 15%; background: #10B981;" title="Competitor B: 15%"></div>
    <div class="share-segment" style="width: 35%; background: #7B8BA8;" title="Others: 35%"></div>
  </div>
  <div class="share-legend">
    <span><span class="legend-dot" style="background:#2962FF"></span> Your Brand 28%</span>
    <span><span class="legend-dot" style="background:#9333EA"></span> Competitor A 22%</span>
    <span><span class="legend-dot" style="background:#10B981"></span> Competitor B 15%</span>
    <span><span class="legend-dot" style="background:#7B8BA8"></span> Others 35%</span>
  </div>
</div>
```

```css
.share-bar-container { margin-bottom: var(--space-md); }

.share-bar-label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.share-bar {
  display: flex;
  height: 28px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  gap: 2px;
}

.share-segment {
  transition: opacity 0.3s;
  cursor: pointer;
}

.share-segment:hover {
  opacity: 0.8;
}

.share-legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-xs);
  font-size: 13px;
  color: var(--sw-text-secondary);
}
```

### 7. Two-Column Layout

Use for: side-by-side comparisons, chart + table combos.

```css
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

@media (max-width: 800px) {
  .two-col { grid-template-columns: 1fr; }
}
```

### 8. Tab Navigation

Use for: switching between views (e.g., brands, keywords, products).

```html
<div class="tab-nav">
  <button class="tab active" data-tab="brands">Brands</button>
  <button class="tab" data-tab="keywords">Keywords</button>
  <button class="tab" data-tab="products">Products</button>
</div>

<div class="tab-panel active" id="tab-brands">...</div>
<div class="tab-panel" id="tab-keywords">...</div>
<div class="tab-panel" id="tab-products">...</div>
```

```css
.tab-nav {
  display: flex;
  gap: 4px;
  background: var(--sw-card-bg);
  border: 1px solid var(--sw-card-border);
  border-radius: var(--radius-pill);
  padding: 4px;
  margin-bottom: var(--space-md);
  width: fit-content;
}

.tab {
  background: transparent;
  border: none;
  color: var(--sw-text-tertiary);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 500;
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: all 0.2s;
}

.tab:hover { color: var(--sw-text-secondary); }

.tab.active {
  background: var(--sw-blue-bright);
  color: white;
}

.tab-panel { display: none; }
.tab-panel.active { display: block; }
```

```javascript
// Tab switching logic — include in every dashboard with tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});
```

### 9. Classification Badge

Use for: product classification (Star, Cash Cow, Rising Star), keyword type, alert severity.

```html
<span class="badge badge-star">Star</span>
<span class="badge badge-cashcow">Cash Cow</span>
<span class="badge badge-rising">Rising Star</span>
<span class="badge badge-warning">Needs Attention</span>
```

```css
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.badge-star { background: rgba(41, 98, 255, 0.2); color: var(--sw-blue-electric); }
.badge-cashcow { background: rgba(16, 185, 129, 0.2); color: var(--sw-success); }
.badge-rising { background: rgba(147, 51, 234, 0.2); color: var(--sw-purple); }
.badge-warning { background: rgba(239, 68, 68, 0.2); color: var(--sw-danger); }
.badge-generic { background: rgba(123, 139, 168, 0.2); color: var(--sw-text-tertiary); }
.badge-branded { background: rgba(249, 115, 22, 0.2); color: var(--sw-warning); }
```

## Report Templates

### Which template for which command

| Command | Template | Key components |
|---------|----------|---------------|
| `/market-overview` | Category Dashboard | KPI row + share bar + top brands table + top keywords table + trend chart |
| `/competitive-report` | Competitive Dashboard | KPI comparison + share bar + trend chart + keyword battleground table + alerts |
| `/keyword-intel` | Keyword Dashboard | KPI row + keyword table with badges + chart + gap analysis table |
| `/product-performance` | Product Dashboard | Portfolio KPI row + product table with classification badges + ASIN trend charts |
| `/brand-monitor` | Monitor Dashboard | Alerts strip + KPI row with trends + competitive share bar + change tables |

## Output Rules

1. **Always save to workspace**: Save the HTML file to the workspace folder with a descriptive name (e.g., `competitive-report-2026-02.html`)
2. **Always link the file**: Present the file with a `computer://` link so the user can open it immediately
3. **Data-driven**: Every number in the dashboard must come from actual SimilarWeb MCP responses — never fabricate data
4. **Responsive text**: Include a summary paragraph in the dashboard itself so it's self-contained
5. **Print-friendly**: Add `@media print` styles that switch to a white background for PDF export
6. **No truncation**: If there's a lot of data, use tabs or scrollable sections rather than cutting data

## Print Styles

Always include for PDF export:

```css
@media print {
  body { background: #FFFFFF; color: #1a1a1a; }
  body::before { display: none; }
  .sw-table th { color: #555; }
  .sw-table td { color: #333; border-color: #e5e5e5; }
  .kpi-card, .chart-card, .table-container, .alert, .insight-box {
    background: #f9fafb;
    border-color: #e5e5e5;
    box-shadow: none;
  }
  .dash-title, .kpi-value { color: #1a1a1a; }
}
```
