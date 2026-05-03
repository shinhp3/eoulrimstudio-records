const INDEX_HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>STL · 석고 반죽량 계산</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
:root {
  --bg: #f4f6fa;
  --surface: #ffffff;
  --border: #e2e5ed;
  --text: #111827;
  --muted: #5c6370;
  --muted-soft: #6b7280;
  --accent: #2563eb;
  --accent-dim: rgba(37, 99, 235, 0.10);
  --radius: 14px;
  --leading-tight: 1.35;
  --leading-body: 1.6;
  --leading-relaxed: 1.65;
}

html {
  font-size: 100%;
  -webkit-text-size-adjust: 100%;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  font-family: "IBM Plex Sans KR", system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 1rem;
  background: var(--bg);
  color: var(--text);
  line-height: var(--leading-body);
}

.wrap {
  max-width: 960px;
  margin: 0 auto;
  padding: 28px 22px 56px;
}

header { margin-bottom: 24px; }

header h1 {
  font-size: clamp(1.375rem, 2.5vw, 1.625rem);
  font-weight: 700;
  margin: 0 0 10px;
  letter-spacing: -0.025em;
  line-height: var(--leading-tight);
  color: var(--text);
}

header p {
  margin: 0;
  font-size: 1.0625rem;
  color: var(--muted);
  line-height: var(--leading-relaxed);
  max-width: 52ch;
}

header code {
  font-size: 0.9em;
  background: var(--surface);
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid var(--border);
}

.viewer-toolbar-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.viewer-toolbar-row button {
  font: inherit;
  font-size: 1rem;
  font-weight: 600;
  padding: 11px 18px;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid #fecaca;
  color: #b91c1c;
  background: #fef2f2;
  cursor: pointer;
}

.viewer-toolbar-row button:hover {
  border-color: #b91c1c;
  color: #7f1d1d;
}

.viewer-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
}

.main-add-drop {
  position: relative;
  min-height: 132px;
  margin-bottom: 20px;
  border-radius: var(--radius);
  border: 1px dashed var(--border);
  background: linear-gradient(160deg, #f0f4ff 0%, #e8edf8 100%);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, outline 0.15s;
}

.main-add-drop:hover { border-color: #c5d0e8; }

.main-add-drop.dragover {
  outline: 2px dashed var(--accent);
  outline-offset: -4px;
  background: var(--accent-dim);
  border-color: var(--accent);
}

.main-add-drop .main-drop-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 32px 22px;
  color: var(--muted);
  font-size: 1.0625rem;
  text-align: center;
  pointer-events: none;
}

.main-add-drop .main-drop-inner svg {
  width: 48px;
  height: 48px;
  opacity: 0.45;
}

.main-add-drop .main-drop-sub {
  font-size: 0.9375rem;
  max-width: 26rem;
  line-height: var(--leading-relaxed);
  color: var(--muted-soft);
}

.slot-toolbar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  background: rgba(248, 249, 251, 0.9);
}

.slot-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
}

.slot-toolbar-top button {
  font: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  padding: 8px 14px;
  min-height: 40px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--muted);
  cursor: pointer;
}

.slot-toolbar-top button:hover {
  border-color: #fecaca;
  color: #b91c1c;
}

.slot-toolbar-top .btn-remove-slot {
  flex-shrink: 0;
  width: 40px;
  min-width: 40px;
  height: 40px;
  min-height: 40px;
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1;
  border-radius: 10px;
  border: 1px solid var(--border);
  color: var(--muted-soft);
  background: var(--surface);
}

.slot-toolbar-top .btn-remove-slot:hover {
  border-color: #cbd5e1;
  color: var(--text);
  background: #f3f4f6;
}

.viewer-card--has-model .slot-toolbar-top .btn-remove-slot {
  border-color: #d1d5db;
  color: #4b5563;
}

.viewer-card--has-model .slot-toolbar-top .btn-remove-slot:hover {
  border-color: #9ca3af;
  color: #111827;
  background: #e5e7eb;
}

.slot-toolbar-top .btn-remove-slot:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.slot-drop-zone {
  position: relative;
  height: min(38vh, 360px);
  background: linear-gradient(160deg, #f0f4ff 0%, #e8edf8 100%);
  cursor: pointer;
}

.slot-drop-zone.dragover {
  outline: 2px dashed var(--accent);
  outline-offset: -6px;
  background: var(--accent-dim);
}

.slot-canvas-host { width: 100%; height: 100%; }

.drop-hint {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: var(--muted);
  font-size: 1.0625rem;
  gap: 10px;
  transition: opacity 0.25s;
}

.drop-hint-sub {
  font-size: 0.9375rem;
  color: var(--muted-soft);
  line-height: var(--leading-body);
}

.slot-drop-zone.has-model .drop-hint { opacity: 0; }

.drop-hint svg {
  width: 48px;
  height: 48px;
  opacity: 0.4;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-top: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.95);
}

.toolbar button,
.toolbar label.file-btn {
  font: inherit;
  font-size: 1rem;
  font-weight: 600;
  padding: 10px 16px;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: #ffffff;
  color: var(--text);
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.toolbar button:hover,
.toolbar label.file-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.toolbar input[type="file"] { display: none; }

.toolbar .filename {
  flex: 1;
  min-width: 0;
  font-size: 0.9375rem;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toolbar button.btn-clear {
  border-color: #fecaca;
  color: #b91c1c;
  background: #fef2f2;
}

.toolbar button.btn-clear:hover {
  border-color: #b91c1c;
  color: #7f1d1d;
}

.size-bar {
  display: none;
  align-items: center;
  gap: 16px;
  padding: 8px 14px;
  border-top: 1px solid var(--border);
  background: rgba(248, 249, 251, 0.95);
  flex-wrap: wrap;
}

.size-bar.visible { display: flex; }

.size-bar-label {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
}

.size-dims {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.size-dim {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 1rem;
}

.size-dim .ax {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  min-width: 14px;
}

.size-dim .vl {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: var(--text);
}

.size-dim .un {
  font-size: 0.8125rem;
  color: var(--muted);
}

section.plaster {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px 24px 26px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  margin-bottom: 24px;
}

.plaster-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px 16px;
  margin-bottom: 20px;
}

section.plaster .plaster-head h2 {
  font-size: clamp(1.125rem, 2vw, 1.3125rem);
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: var(--leading-tight);
  color: var(--text);
  flex: 1 1 200px;
  min-width: 0;
}

section.plaster .plaster-head h2::before {
  content: "";
  width: 5px;
  height: 22px;
  background: linear-gradient(180deg, #ea580c, #f97316);
  border-radius: 3px;
}

.plaster-vol-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.plaster-manual-wrap {
  margin-bottom: 20px;
}

.plaster-manual-label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}

.plaster-manual-hint {
  font-weight: 600;
  color: var(--muted);
  font-size: 0.875rem;
}

.plaster-manual-input-wrap {
  display: flex;
  align-items: stretch;
  gap: 0;
  max-width: 100%;
  border-radius: 12px;
  border: 1px solid #c9ced9;
  background: var(--surface);
  box-shadow:
    inset 0 1px 2px rgba(15, 23, 42, 0.06),
    0 1px 2px rgba(15, 23, 42, 0.04);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.plaster-manual-input-wrap:focus-within {
  border-color: var(--accent);
  box-shadow:
    0 0 0 3px var(--accent-dim),
    inset 0 1px 2px rgba(15, 23, 42, 0.04);
}

#plaster-vol-manual {
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
  padding: 16px 18px;
  min-height: 56px;
  border: none;
  border-radius: 11px 0 0 11px;
  font: inherit;
  font-size: 1.25rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  background: #fafbfc;
  color: var(--text);
}

#plaster-vol-manual::placeholder {
  color: var(--muted-soft);
  font-weight: 600;
}

#plaster-vol-manual:focus {
  outline: none;
  background: var(--surface);
}

.plaster-manual-unit {
  flex-shrink: 0;
  padding: 0 18px;
  min-height: 56px;
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  color: var(--muted);
  background: #f3f4f6;
  border-left: 1px solid #e2e5ed;
  border-radius: 0 11px 11px 0;
}

@media (max-width: 420px) {
  #plaster-vol-manual {
    max-width: 100%;
  }

  .plaster-head {
    flex-direction: column;
    align-items: stretch;
  }

  .plaster-head .btn-save-record {
    width: 100%;
    align-self: stretch;
    margin-top: 0;
  }
}

.plaster-vol-row .vol-badge {
  font-size: 1rem;
  color: var(--muted);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 14px;
  font-variant-numeric: tabular-nums;
}

.plaster-vol-row .vol-badge strong {
  color: var(--text);
  font-weight: 700;
  font-size: 1.0625rem;
}

.plaster-margin-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}

.plaster-margin-row label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
  min-width: 3.5rem;
}

.plaster-margin-row input[type=range] {
  flex: 1;
  min-height: 28px;
  accent-color: #ea580c;
}

.plaster-margin-val {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  min-width: 3.25rem;
  text-align: right;
}

.plaster-results {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 18px;
}

@media (max-width: 767px) {
  .plaster-results {
    grid-template-columns: 1fr;
  }
}

.plaster-box {
  background: linear-gradient(165deg, #fafafa 0%, #f4f4f5 100%);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 18px 18px 16px;
}

.plaster-box .p-label {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--muted);
  letter-spacing: 0.02em;
  margin-bottom: 8px;
}

.plaster-box .p-actual {
  font-size: clamp(1.75rem, 5vw, 2.125rem);
  font-weight: 800;
  color: var(--text);
  font-variant-numeric: tabular-nums;
  line-height: 1.15;
}

.plaster-box .p-unit {
  font-size: 1rem;
  font-weight: 500;
  color: var(--muted);
}

.plaster-box .p-recommend {
  margin-top: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #c2410c;
  font-variant-numeric: tabular-nums;
}

.plaster-box .p-recommend span {
  font-weight: 800;
  font-size: 1.0625rem;
}

.p-breakdown-wrap {
  margin-top: 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.p-breakdown-title {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: 0.03em;
  padding: 12px 16px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

.p-breakdown-row {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 14px;
}

.p-breakdown-row:last-child { border-bottom: none; }

.p-breakdown-name {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--text);
  min-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
}

.p-breakdown-vals {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
}

.p-bv-item {
  font-size: 1rem;
  color: var(--muted);
}

.p-bv-item strong {
  font-size: 1.0625rem;
  font-weight: 800;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}

.p-bv-item em {
  font-style: normal;
  font-size: 0.8125rem;
  color: var(--muted);
  margin-left: 2px;
}

.p-bv-rec {
  font-size: 0.9375rem;
  color: #c2410c;
  font-weight: 700;
}

.p-bv-sep {
  color: var(--border);
  font-size: 1rem;
}

.plaster-note {
  margin-top: 16px;
  font-size: 0.9375rem;
  color: var(--muted);
  line-height: var(--leading-relaxed);
}

/* ── 석고·물 비율 계산 (반죽량 계산기와 동일한 카드 셸) ── */
section.ratio-calc {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px 24px 26px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  margin-bottom: 24px;
}

section.ratio-calc h2 {
  font-size: clamp(1.125rem, 2vw, 1.3125rem);
  font-weight: 700;
  margin: 0 0 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: var(--leading-tight);
  color: var(--text);
}

section.ratio-calc h2::before {
  content: "";
  width: 5px;
  height: 22px;
  background: linear-gradient(180deg, #ea580c, #f97316);
  border-radius: 3px;
}

.ratio-calc-lead {
  margin: 0 0 20px;
  font-size: 1.0625rem;
  color: var(--muted);
  line-height: var(--leading-relaxed);
  max-width: 42rem;
}

.ratio-calc-lead strong {
  color: var(--text);
  font-weight: 700;
}

.ratio-calc-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px 16px;
  align-items: end;
}

@media (max-width: 767px) {
  .ratio-calc-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .ratio-calc-connector {
    flex-direction: row !important;
    justify-content: center;
    padding: 4px 0 !important;
    min-width: 0 !important;
  }

  .ratio-calc-icon {
    transform: rotate(90deg);
  }
}

.ratio-calc-cell {
  min-width: 0;
}

.ratio-calc-label {
  display: block;
  font-size: 0.9375rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 8px;
}

.ratio-calc-input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fafbfc;
  border: 1px solid #c9ced9;
  border-radius: 12px;
  padding: 4px 6px 4px 14px;
  box-shadow:
    inset 0 1px 2px rgba(15, 23, 42, 0.06),
    0 1px 2px rgba(15, 23, 42, 0.04);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.ratio-calc-input-wrap:focus-within {
  border-color: var(--accent);
  background: var(--surface);
  box-shadow:
    0 0 0 3px var(--accent-dim),
    inset 0 1px 2px rgba(15, 23, 42, 0.04);
}

.ratio-calc-input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  font: inherit;
  font-size: 1.25rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: var(--text);
  padding: 12px 0;
  outline: none;
}

.ratio-calc-input::placeholder {
  color: #d6d3d1;
  font-weight: 600;
}

.ratio-calc-unit {
  font-size: 1rem;
  font-weight: 700;
  color: var(--muted);
  padding-right: 10px;
  flex-shrink: 0;
}

.ratio-calc-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-bottom: 10px;
  min-width: 72px;
}

.ratio-calc-icon {
  font-size: 1.75rem;
  line-height: 1;
  color: var(--accent);
  font-weight: 700;
}

.ratio-calc-ratio-tag {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--muted);
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 4px 10px;
  border-radius: 999px;
}

.ratio-calc-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.ratio-calc-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  font: inherit;
  font-size: 0.9375rem;
  font-weight: 700;
  padding: 10px 18px;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.ratio-calc-clear:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--bg);
}

.boot-screen {
  min-height: 100vh;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--bg);
}

.boot-inner {
  text-align: center;
  max-width: 440px;
}

.boot-inner h1 {
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 14px;
  letter-spacing: -0.02em;
  line-height: var(--leading-tight);
}

.boot-muted {
  margin: 0;
  font-size: 1.0625rem;
  color: var(--muted);
  line-height: var(--leading-relaxed);
}

.boot-inner code {
  font-size: 0.88em;
  background: var(--bg);
  padding: 2px 6px;
  border-radius: 6px;
  border: 1px solid var(--border);
}

.boot-spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 16px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: boot-spin 0.8s linear infinite;
}

@keyframes boot-spin {
  to { transform: rotate(360deg); }
}

html[data-viewer="error"] #screen-error { display: flex; }
html[data-viewer="error"] #screen-loading,
html[data-viewer="error"] #app-main { display: none !important; }

html[data-viewer="loading"] #screen-loading { display: flex; }
html[data-viewer="loading"] #screen-error,
html[data-viewer="loading"] #app-main { display: none !important; }

html[data-viewer="app"] #app-main { display: block; }
html[data-viewer="app"] #screen-loading,
html[data-viewer="app"] #screen-error { display: none !important; }

/* ── 앱 탭 ── */
.app-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
  border-bottom: 2px solid var(--border);
  padding-bottom: 0;
}

.app-tab {
  font: inherit;
  font-size: 1.0625rem;
  font-weight: 700;
  padding: 14px 22px;
  min-height: 48px;
  margin-bottom: -2px;
  border: 2px solid transparent;
  border-bottom: 2px solid transparent;
  border-radius: 12px 12px 0 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
}

.app-tab:hover {
  color: var(--text);
  background: rgba(37, 99, 235, 0.08);
}

.app-tab.active {
  color: var(--accent);
  background: var(--surface);
  border-color: var(--border);
  border-bottom-color: var(--accent);
}

.app-panel[hidden] {
  display: none !important;
}

.scroll-top-btn {
  display: none;
}

@media (min-width: 768px) {
  .scroll-top-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: max(22px, env(safe-area-inset-right, 0px));
    bottom: max(26px, env(safe-area-inset-bottom, 0px));
    z-index: 90;
    width: 48px;
    height: 48px;
    padding: 0;
    margin: 0;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--accent);
    box-shadow: 0 4px 18px rgba(15, 23, 42, 0.14);
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(10px);
    transition: opacity 0.22s ease, transform 0.22s ease, visibility 0.22s;
  }

  .scroll-top-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  .scroll-top-btn:hover {
    border-color: var(--accent);
    background: var(--accent-dim);
  }

  .scroll-top-btn.scroll-top-btn--visible {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
  }
}

@media (max-width: 767px) {
  .scroll-top-btn {
    display: none !important;
  }
}

/* ── 저장 버튼 (석고 헤더 · 모달) ── */
.btn-save-record {
  font: inherit;
  font-size: 1.0625rem;
  font-weight: 700;
  padding: 12px 28px;
  min-height: 48px;
  border-radius: 10px;
  border: 2px solid var(--accent);
  background: var(--accent-dim);
  color: var(--accent);
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s, transform 0.1s;
}

.btn-save-record:hover:not(:disabled) {
  background: rgba(47, 107, 255, 0.2);
}

.btn-save-record:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.plaster-head .btn-save-record {
  align-self: flex-start;
  margin-top: 2px;
}

.save-commit-overlay {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(17, 24, 39, 0.42);
  backdrop-filter: blur(3px);
}

.save-commit-overlay[hidden] {
  display: none !important;
}

.save-commit-inner {
  text-align: center;
  padding: 28px 32px;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.2);
  max-width: 280px;
}

.save-commit-spinner {
  width: 44px;
  height: 44px;
  margin: 0 auto 16px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: boot-spin 0.75s linear infinite;
}

.save-commit-msg {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--text);
}

.save-toast {
  position: fixed;
  left: 50%;
  bottom: max(28px, env(safe-area-inset-bottom, 0px));
  transform: translateX(-50%);
  z-index: 1090;
  padding: 12px 22px;
  border-radius: 999px;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #065f46;
  background: linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%);
  border: 2px solid #34d399;
  box-shadow:
    0 4px 14px rgba(16, 185, 129, 0.35),
    0 2px 6px rgba(6, 95, 70, 0.12);
  max-width: calc(100vw - 32px);
  text-align: center;
}

.save-toast[hidden] {
  display: none !important;
}

@media (max-width: 767px) {
  .save-toast {
    bottom: calc(68px + env(safe-area-inset-bottom, 0px));
  }
}

/* ── 저장소 목록 ── */
.records-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px 24px 28px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
}

.records-heading {
  font-size: clamp(1.125rem, 2vw, 1.3125rem);
  font-weight: 700;
  margin: 0 0 22px;
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: var(--leading-tight);
}

.records-heading::before {
  content: "";
  width: 5px;
  height: 22px;
  background: linear-gradient(180deg, var(--accent), #60a5fa);
  border-radius: 3px;
}

.records-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 14px 18px;
  margin-bottom: 14px;
}

.records-status {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--muted);
  margin: 0 0 10px;
}

.records-loading {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text);
}

.records-loading[hidden] {
  display: none !important;
}

.records-loading-text {
  color: var(--muted);
}

.records-loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: records-spin 0.7s linear infinite;
}

@keyframes records-spin {
  to { transform: rotate(360deg); }
}

.records-search-block,
.records-sort-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: min(100%, 220px);
  flex: 1 1 200px;
}

.records-sort-block {
  flex: 0 1 220px;
  min-width: 180px;
}

.records-field-label {
  font-size: 0.8125rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.01em;
}

.records-search {
  width: 100%;
  padding: 12px 14px;
  min-height: 48px;
  font: inherit;
  font-size: 1rem;
  border-radius: 10px;
  border: 2px solid var(--border);
  background: var(--bg);
  color: var(--text);
}

.records-search:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}

.records-search::placeholder {
  color: #9ca3af;
}

.records-sort {
  width: 100%;
  padding: 12px 14px;
  min-height: 48px;
  font: inherit;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  border: 2px solid var(--border);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
}

.records-sort:focus {
  outline: none;
  border-color: var(--accent);
}

.records-count {
  margin: 0 0 14px;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--muted);
}

.records-count[hidden] {
  display: none !important;
}

.search-highlight {
  background: linear-gradient(180deg, transparent 58%, #fef08a 58%);
  color: inherit;
  font-weight: inherit;
  padding: 0 2px;
  border-radius: 2px;
  box-decoration-break: clone;
}

.record-metric-value .search-highlight,
.record-card-title .search-highlight,
.record-card-memo .search-highlight {
  font-size: inherit;
  font-weight: inherit;
}

.records-empty {
  text-align: center;
  color: var(--muted);
  font-size: 1.0625rem;
  line-height: var(--leading-relaxed);
  padding: 48px 24px;
}

.records-empty[hidden] {
  display: none !important;
}

.records-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 248px), 1fr));
  gap: 14px 16px;
  align-items: stretch;
}

.record-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  min-height: 0;
  padding: 14px 14px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
  transition: box-shadow 0.15s, border-color 0.15s;
}

.record-card:hover {
  border-color: #c7d2fe;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.08);
}

.record-card-head {
  margin: 0 0 10px;
  min-width: 0;
}

.record-card-thumb {
  flex-shrink: 0;
  width: min(100%, 118px);
  aspect-ratio: 1;
  margin: 0 auto 10px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border);
  background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
}

.record-card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  vertical-align: top;
}

.record-card-thumb-fallback {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--muted);
  text-align: center;
  padding: 12px;
  background: var(--bg);
}

.record-card-date {
  display: block;
  margin-top: 4px;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.record-card-title {
  font-size: clamp(1.05rem, 2.5vw, 1.28rem);
  font-weight: 800;
  color: var(--text);
  word-break: break-word;
  margin: 0;
  line-height: var(--leading-tight);
}

.record-card-metrics {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0;
  margin: 0 0 8px;
  padding: 10px 12px;
  min-width: 0;
  background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.record-metric-inline {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px 10px;
  flex: 1 1 0;
  min-width: 0;
}

.record-metric-sep {
  width: 1px;
  align-self: stretch;
  min-height: 2.25rem;
  margin: 0 8px;
  background: var(--border);
  flex-shrink: 0;
}

.record-metric-label {
  flex-shrink: 0;
  font-size: 0.8125rem;
  font-weight: 800;
  color: var(--muted);
  letter-spacing: 0.04em;
}

.record-metric-value {
  font-size: clamp(1rem, 2.6vw, 1.3rem);
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: var(--text);
  line-height: 1.2;
  white-space: nowrap;
}

.record-metric-unit {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--muted);
  margin-left: 2px;
}

.record-card-memo {
  font-size: 0.875rem;
  color: var(--text);
  margin: 0 0 10px;
  padding-top: 8px;
  border-top: 1px solid #f3f4f6;
  line-height: var(--leading-relaxed);
  flex: 1 1 auto;
  min-height: 0;
}

.record-card-memo:empty::before {
  content: "(메모 없음)";
  color: var(--muted);
  font-style: italic;
}

.record-card-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-self: stretch;
  gap: 8px;
  flex-shrink: 0;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.record-card-actions button {
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 10px 12px;
  min-height: 44px;
  flex: 1 1 0;
  min-width: 0;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text);
}

.record-card-actions .btn-record-edit:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.record-card-actions .btn-record-delete {
  border-color: #fecaca;
  color: #b91c1c;
  background: #fef2f2;
}

.record-card-actions .btn-record-delete:hover {
  border-color: #b91c1c;
}

/* ── 저장 / 수정 모달 ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
  overscroll-behavior: contain;
  background: rgba(17, 24, 39, 0.45);
  backdrop-filter: blur(2px);
}

.modal-overlay[hidden] {
  display: none !important;
}

.modal-dialog {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  max-height: min(92vh, 720px);
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.18);
  padding: 0;
}

.modal-header-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px 16px;
  flex-shrink: 0;
  padding: 18px 20px 14px;
  border-bottom: 1px solid var(--border);
}

.modal-header-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
  flex-shrink: 0;
}

.modal-btn-header {
  padding: 9px 16px;
  min-height: 42px;
  font-size: 0.9375rem;
}

.modal-scroll {
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 18px 20px 22px;
  -webkit-overflow-scrolling: touch;
}

.modal-save-preview-wrap {
  margin-bottom: 18px;
}

.modal-preview-section-label {
  display: block;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}

.modal-preview-canvas-host {
  width: 100%;
  min-height: 176px;
  height: 200px;
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
  background: linear-gradient(160deg, #f0f4ff 0%, #e8edf8 100%);
}

.modal-preview-canvas-host canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}

.modal-save-preview-hint {
  margin: 10px 0 0;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--muted);
  line-height: var(--leading-relaxed);
}

.modal-edit-thumb-wrap {
  margin-bottom: 18px;
}

.modal-edit-thumb-inner {
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  max-height: 220px;
}

.modal-edit-thumb-img {
  display: block;
  width: 100%;
  max-height: 220px;
  height: auto;
  object-fit: contain;
}

.modal-edit-thumb-empty {
  padding: 20px 16px;
  font-size: 0.9375rem;
  color: var(--muted);
  text-align: center;
  line-height: var(--leading-relaxed);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  padding: 2px 0 0;
  flex: 1 1 180px;
  min-width: 0;
  letter-spacing: -0.02em;
  line-height: var(--leading-tight);
  color: var(--text);
}

.modal-fields {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.modal-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
}

.modal-metrics-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 10px 12px;
}

.modal-metrics-row > .modal-field {
  min-width: 0;
}

.modal-metrics-row .modal-label {
  font-size: 0.875rem;
}

.modal-metrics-row .modal-input {
  min-height: 42px;
  padding: 9px 11px;
  font-size: 0.9375rem;
  border-radius: 9px;
}

@media (max-width: 360px) {
  .modal-metrics-row {
    grid-template-columns: 1fr;
  }
}

.modal-label {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--text);
}

.modal-input,
.modal-textarea {
  width: 100%;
  padding: 12px 14px;
  min-height: 48px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  font: inherit;
  font-size: 1rem;
}

.modal-input:focus,
.modal-textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.modal-ratio-row {
  padding: 10px 12px;
  margin: 2px 0;
  background: linear-gradient(165deg, #eff6ff 0%, #f8fafc 100%);
  border: 1px solid #bfdbfe;
  border-radius: 10px;
}

.modal-ratio-toggle {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 0;
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--text);
  line-height: var(--leading-body);
}

.modal-ratio-toggle input[type="checkbox"] {
  width: 1.1rem;
  height: 1.1rem;
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: var(--accent);
  cursor: pointer;
}

.modal-ratio-hint {
  margin: 8px 0 0;
  padding-left: calc(1.1rem + 10px);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--muted);
  line-height: var(--leading-relaxed);
}

.modal-textarea {
  resize: vertical;
  min-height: 6rem;
  line-height: var(--leading-body);
}

.modal-btn {
  font: inherit;
  font-size: 1rem;
  font-weight: 700;
  padding: 12px 22px;
  min-height: 48px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text);
}

/* 모달 헤더 버튼: 기본 흰 배경·검정 글자; 호버 시 파랑 / 빨강 */
.modal-btn.modal-btn-primary.modal-btn-header,
.modal-btn.modal-btn-secondary.modal-btn-header {
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text);
}

.modal-btn.modal-btn-primary.modal-btn-header:hover:not(:disabled) {
  border-color: #2563eb;
  background: rgba(47, 107, 255, 0.14);
  color: #1d4ed8;
}

.modal-btn.modal-btn-secondary.modal-btn-header:hover:not(:disabled) {
  border-color: #dc2626;
  background: #fecaca;
  color: #991b1b;
}

/* 저장 확인 (예 / 아니요) */
.record-commit-dialog {
  padding: 0;
  border: none;
  max-width: calc(100vw - 32px);
  background: transparent;
}

.record-commit-dialog::backdrop {
  background: rgba(17, 24, 39, 0.42);
  backdrop-filter: blur(2px);
}

.record-commit-dialog-panel {
  padding: 22px 24px 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.22);
  min-width: min(100%, 280px);
}

.record-commit-dialog-msg {
  margin: 0 0 20px;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text);
  line-height: var(--leading-tight);
  text-align: center;
}

.record-commit-dialog-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.record-commit-dialog-actions .modal-btn-header {
  flex: 1 1 auto;
  min-width: 108px;
}

/* 태블릿 · 좁은 노트북 */
@media (min-width: 768px) and (max-width: 1024px) {
  .wrap {
    padding: 26px max(20px, env(safe-area-inset-left, 0px)) 56px max(20px, env(safe-area-inset-right, 0px));
  }

  .app-tabs {
    gap: 6px;
    margin-bottom: 22px;
  }

  .app-tab {
    padding: 13px 20px;
    font-size: 1.015rem;
    min-height: 46px;
  }

  .records-list {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 268px), 1fr));
    gap: 16px;
  }

  .records-toolbar {
    gap: 16px 18px;
  }

  .modal-dialog {
    max-width: min(480px, 94vw);
  }
}

/* 모바일·소형 태블릿: 하단 탭 · 저장소 1열 */
@media (max-width: 767px) {
  .wrap {
    padding: 18px max(14px, env(safe-area-inset-left, 0px)) calc(80px + env(safe-area-inset-bottom, 0px)) max(14px, env(safe-area-inset-right, 0px));
  }

  .app-tabs {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    gap: 2px;
    margin-bottom: 0;
    padding: 10px max(14px, env(safe-area-inset-left, 0px)) max(12px, env(safe-area-inset-bottom, 0px)) max(14px, env(safe-area-inset-right, 0px));
    background: var(--bg);
    border-bottom: none;
    border-top: 2px solid var(--border);
    box-shadow: 0 -6px 18px rgba(15, 23, 42, 0.08);
  }

  .app-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 0;
    min-width: 0;
    text-align: center;
    padding: 12px 10px;
    font-size: 1rem;
    min-height: 46px;
    margin-bottom: 0;
    margin-top: -2px;
    border-radius: 0 0 12px 12px;
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;
  }

  .app-tab.active {
    border-color: var(--border);
    border-top-color: var(--accent);
    border-bottom-color: transparent;
  }

  .records-list {
    grid-template-columns: 1fr;
  }
}

</style>
</head>
<body>
  <script>
  (function () {
    var q = new URLSearchParams(window.location.search).get("model");
    document.documentElement.setAttribute("data-viewer", (q && String(q).trim()) ? "loading" : "app");
  })();
  </script>
  <div id="screen-loading" class="boot-screen" aria-live="polite">
    <div class="boot-inner">
      <div class="boot-spinner" role="status" aria-label="로딩 중"></div>
      <p>모델을 불러오는 중…</p>
    </div>
  </div>
  <div id="screen-error" class="boot-screen">
    <div class="boot-inner">
      <h1>모델을 불러올 수 없습니다</h1>
      <p class="boot-muted">URL의 <code>?model=파일이름</code>이 올바른지, 저장소 <code>models/</code>에 해당 STL이 있는지 확인해 주세요.</p>
    </div>
  </div>
  <div id="app-main">
  <div class="wrap">
    <nav class="app-tabs" role="tablist" aria-label="메인 메뉴">
      <button type="button" class="app-tab active" role="tab" aria-selected="true" id="tab-btn-calc" data-tab="calc">계산기</button>
      <button type="button" class="app-tab" role="tab" aria-selected="false" id="tab-btn-store" data-tab="store">저장소</button>
    </nav>

    <div id="panel-calc" class="app-panel" role="tabpanel" aria-labelledby="tab-btn-calc">

    <div id="main-add-drop" class="main-add-drop" role="button" tabindex="0" aria-label="STL을 여기에 놓거나 클릭하여 추가">
      <input type="file" id="main-add-files" multiple accept=".stl,.STL" hidden />
      <div class="main-drop-inner">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
        <span><strong>STL을 여기에 드롭</strong>하거나 클릭해 선택</span>
        <span class="main-drop-sub">여러 파일을 한 번에 올리면 아래에 뷰 카드가 순서대로 생깁니다.</span>
      </div>
    </div>
    <div id="viewers-root"></div>

    <section class="plaster" aria-labelledby="plaster-title">
      <div class="plaster-head">
        <h2 id="plaster-title">석고 반죽량 계산기</h2>
        <button type="button" id="btn-save-record" class="btn-save-record" disabled>저장</button>
      </div>
      <div id="plaster-content">
        <div class="plaster-vol-row">
          <span class="vol-badge">체적 <strong id="plaster-vol-display">—</strong> mm³</span>
          <span class="vol-badge"><strong id="plaster-vol-cc">—</strong></span>
        </div>
        <div class="plaster-manual-wrap">
          
          <div class="plaster-manual-input-wrap">
            <input
              type="number"
              id="plaster-vol-manual"
              min="0"
              step="1"
              placeholder="체적 직접 입력란"
              inputmode="numeric"
              autocomplete="off"
            />
            <span class="plaster-manual-unit">mm³</span>
          </div>
        </div>
        <div class="plaster-margin-row">
          <label>여유분</label>
          <input type="range" id="plaster-margin" min="0" max="30" step="5" value="10" />
          <span class="plaster-margin-val" id="plaster-margin-out">+10%</span>
        </div>
        <div class="plaster-results">
          <div class="plaster-box">
            <div class="p-label">석고 (합산)</div>
            <div class="p-actual" id="p-plaster-actual">—<small class="p-unit"> g</small></div>
            <div class="p-recommend">추천값 → <span id="p-plaster-rec">—</span> g</div>
          </div>
          <div class="plaster-box">
            <div class="p-label">물 (합산)</div>
            <div class="p-actual" id="p-water-actual">—<small class="p-unit"> mL</small></div>
            <div class="p-recommend">추천값 → <span id="p-water-rec">—</span> mL</div>
          </div>
        </div>
        <div id="plaster-breakdown" hidden></div>

        <p class="plaster-note">
          물:석고 = 70:100 기준 · 실측 2회 평균 계수 적용 (석고 ×1.1163 / 물 ×0.78141)<br>
          추천값 물량은 <em>석고 추천값 × 0.70</em>으로 비율 일치 보장합니다.
        </p>
      </div>
    </section>

    <section class="ratio-calc" aria-labelledby="ratio-calc-title">
      <div class="ratio-calc-head">
        <h2 id="ratio-calc-title">석고·물 비율 계산</h2>
        <p class="ratio-calc-lead">석고 10 : 물 7 비율입니다. <strong>석고</strong> 또는 <strong>물</strong> 중 하나만 입력하면 나머지가 자동으로 맞춰집니다.</p>
      </div>
      <div class="ratio-calc-card">
        <div class="ratio-calc-grid">
          <div class="ratio-calc-cell">
            <label class="ratio-calc-label" for="ratio-input-plaster">석고량</label>
            <div class="ratio-calc-input-wrap">
              <input type="number" id="ratio-input-plaster" class="ratio-calc-input" min="0" step="any" inputmode="decimal" placeholder="g 입력" autocomplete="off" />
              <span class="ratio-calc-unit">g</span>
            </div>
          </div>
          <div class="ratio-calc-connector" aria-hidden="true">
            <span class="ratio-calc-icon">⇄</span>
            <span class="ratio-calc-ratio-tag">10 : 7</span>
          </div>
          <div class="ratio-calc-cell">
            <label class="ratio-calc-label" for="ratio-input-water">물량</label>
            <div class="ratio-calc-input-wrap">
              <input type="number" id="ratio-input-water" class="ratio-calc-input" min="0" step="any" inputmode="decimal" placeholder="mL 입력" autocomplete="off" />
              <span class="ratio-calc-unit">mL</span>
            </div>
          </div>
        </div>
        <div class="ratio-calc-actions">
          <button type="button" id="ratio-calc-clear" class="ratio-calc-clear">입력 초기화</button>
        </div>
      </div>
    </section>
    </div>

    <div id="panel-store" class="app-panel" role="tabpanel" aria-labelledby="tab-btn-store" hidden>
      <section class="records-section" aria-labelledby="records-heading">
        <h2 id="records-heading" class="records-heading">저장된 기록</h2>

        <div class="records-toolbar">
          <div class="records-search-block">
            <label class="records-field-label" for="records-search">검색</label>
            <input type="search" id="records-search" class="records-search" placeholder="이름·메모·날짜·숫자…" autocomplete="off" enterkeyhint="search" />
          </div>
          <div class="records-sort-block">
            <label class="records-field-label" for="records-sort">정렬</label>
            <select id="records-sort" class="records-sort">
              <option value="date-desc">날짜 · 최신순</option>
              <option value="date-asc">날짜 · 오래된순</option>
              <option value="name-asc">이름 · 가나다순</option>
              <option value="name-desc">이름 · 역순</option>
              <option value="plaster-desc">석고량 · 많은순</option>
              <option value="plaster-asc">석고량 · 적은순</option>
              <option value="water-desc">물량 · 많은순</option>
              <option value="water-asc">물량 · 적은순</option>
            </select>
          </div>
        </div>
        <p id="records-status" class="records-status" role="status" aria-live="polite" hidden></p>
        <div id="records-loading" class="records-loading" hidden aria-busy="true">
          <span class="records-loading-spinner" aria-hidden="true"></span>
          <span id="records-loading-text" class="records-loading-text">불러오는 중…</span>
        </div>

        <p id="records-count" class="records-count" hidden></p>

        <p id="records-empty" class="records-empty">저장된 기록이 없습니다.</p>
        <div id="records-list" class="records-list"></div>
      </section>
    </div>
  </div>
  </div>

  <button type="button" id="scroll-top-btn" class="scroll-top-btn" aria-label="페이지 맨 위로" title="맨 위로">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" /></svg>
  </button>

  <div id="save-commit-overlay" class="save-commit-overlay" hidden>
    <div class="save-commit-inner">
      <div class="save-commit-spinner" role="status" aria-live="polite" aria-label="저장 중"></div>
      <p class="save-commit-msg">저장 중…</p>
    </div>
  </div>
  <div id="save-toast" class="save-toast" role="status" aria-live="polite" hidden></div>

  <div id="record-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="record-modal-title" hidden>
    <div class="modal-dialog">
      <div class="modal-header-bar">
        <h2 id="record-modal-title" class="modal-title">저장</h2>
        <div class="modal-header-actions">
          <button type="button" id="modal-btn-primary" class="modal-btn modal-btn-primary modal-btn-header">저장 완료</button>
          <button type="button" id="modal-btn-cancel" class="modal-btn modal-btn-secondary modal-btn-header">닫기</button>
        </div>
      </div>
      <div class="modal-scroll">
      <div id="modal-save-preview-wrap" class="modal-save-preview-wrap">
        <span class="modal-preview-section-label">썸네일 미리보기</span>
        <div id="modal-preview-canvas-host" class="modal-preview-canvas-host" aria-label="저장용 3D 미리보기"></div>
        <p id="modal-save-preview-hint" class="modal-save-preview-hint"></p>
      </div>
      <div id="modal-edit-thumb-wrap" class="modal-edit-thumb-wrap" hidden>
        <span class="modal-preview-section-label">미리보기</span>
        <div class="modal-edit-thumb-inner">
          <img id="modal-edit-thumb-img" class="modal-edit-thumb-img" alt="" width="200" height="200" loading="lazy" hidden />
          <div id="modal-edit-thumb-empty" class="modal-edit-thumb-empty">등록된 미리보기 이미지가 없습니다.</div>
        </div>
      </div>
      <div class="modal-fields">
        <label class="modal-field">
          <span class="modal-label">이름</span>
          <input type="text" id="modal-field-name" class="modal-input" maxlength="200" autocomplete="off" />
        </label>
        <div class="modal-metrics-row">
          <label class="modal-field">
            <span class="modal-label">석고량 (g)</span>
            <input type="number" id="modal-field-plaster" class="modal-input" min="0" step="any" />
          </label>
          <label class="modal-field">
            <span class="modal-label">물량 (mL)</span>
            <input type="number" id="modal-field-water" class="modal-input" min="0" step="any" />
          </label>
        </div>
        <div class="modal-ratio-row" aria-describedby="modal-ratio-hint">
          <label class="modal-ratio-toggle">
            <input type="checkbox" id="modal-ratio-sync" checked />
            <span>석고 10 : 물 7 비율 자동 적용</span>
          </label>
          <p id="modal-ratio-hint" class="modal-ratio-hint">켜 두면 석고량 또는 물량을 바꿀 때 다른 쪽이 같은 비율로 맞춰집니다. 끄면 각각 독립적으로 입력할 수 있습니다.</p>
        </div>
        <label class="modal-field">
          <span class="modal-label">메모</span>
          <textarea id="modal-field-memo" class="modal-textarea" rows="3" maxlength="500"></textarea>
        </label>
      </div>
      </div>
    </div>
  </div>

  <dialog id="record-commit-confirm" class="record-commit-dialog" aria-labelledby="record-commit-confirm-msg">
    <div class="record-commit-dialog-panel">
      <p id="record-commit-confirm-msg" class="record-commit-dialog-msg">저장하시겠습니까?</p>
      <div class="record-commit-dialog-actions">
        <button type="button" id="record-commit-confirm-no" class="modal-btn modal-btn-secondary modal-btn-header">아니요</button>
        <button type="button" id="record-commit-confirm-yes" class="modal-btn modal-btn-primary modal-btn-header">예</button>
      </div>
    </div>
  </dialog>

  <script type="importmap">
  {
    "imports": {
      "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
      "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
    }
  }
  </script>
  <script type="module">
    import * as THREE from "three";
    import { STLLoader } from "three/addons/loaders/STLLoader.js";

    /** GitHub — STL 모델 파일 (raw, 기존) */
    const GITHUB_USERNAME = "shinhp3";
    const STL_MODELS_REPO = "eoulrimstudio-models";
    const GITHUB_BRANCH = "main";

    /** Cloudflare Worker — records.json (GitHub 토큰은 Worker env 전용) */
    const RECORDS_WORKER_BASE = "";

    function buildRawStlUrl(modelBaseName) {
      const name = String(modelBaseName).replace(/\\.stl$/i, "").trim();
      return \`https://raw.githubusercontent.com/\${GITHUB_USERNAME}/\${STL_MODELS_REPO}/\${GITHUB_BRANCH}/models/\${name}.stl\`;
    }

    function sanitizeModelParam(raw) {
      if (!raw || typeof raw !== "string") return "";
      const base = raw.trim().replace(/\\.stl$/i, "");
      if (!/^[a-zA-Z0-9._-]+$/.test(base)) return "";
      return base;
    }

    function computeVolumeMm3(geometry) {
      const pos = geometry.attributes.position;
      const vA = new THREE.Vector3(), vB = new THREE.Vector3(), vC = new THREE.Vector3();
      let sum = 0;
      for (let i = 0; i < pos.count; i += 3) {
        vA.fromBufferAttribute(pos, i);
        vB.fromBufferAttribute(pos, i + 1);
        vC.fromBufferAttribute(pos, i + 2);
        sum += vA.dot(vB.cross(vC)) / 6;
      }
      return Math.abs(sum);
    }

    function formatMm(n) {
      return n >= 100 ? n.toFixed(1) : n >= 10 ? n.toFixed(2) : n.toFixed(3);
    }
    function formatNum(n, digits) {
      return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(n);
    }

    /** 석고(g) : 물(mL) = 10 : 7 — 비율 계산기·저장 모달 공통 */
    const PLASTER_WATER_RATIO = { plaster: 10, water: 7 };

    /** GitHub records.json 동기화 상태 */
    let recordsRemoteCache = null;
    let recordsFileSha = null;
    let recordsLoadedOnce = false;

    function migrateRecord(r) {
      if (!r || typeof r !== "object") return null;
      const id = r.id != null ? Number(r.id) : Date.now();
      return {
        id,
        date: typeof r.date === "string" ? r.date : formatRecordDate(new Date(id)),
        name: String(r.name != null ? r.name : (r.filename != null ? r.filename : "이름 없음")),
        memo: String(r.memo != null ? r.memo : ""),
        plaster: Number(r.plaster != null ? r.plaster : (r.plasterRec != null ? r.plasterRec : (r.plasterActual ?? 0))),
        water: Number(r.water != null ? r.water : (r.waterRec != null ? r.waterRec : (r.waterActual ?? 0))),
        thumbnail: typeof r.thumbnail === "string" ? r.thumbnail : "",
      };
    }

    function normalizeRecordsPayload(parsed) {
      if (!parsed) return [];
      if (Array.isArray(parsed)) return parsed.map(migrateRecord).filter(Boolean);
      if (parsed.records != null && Array.isArray(parsed.records)) {
        return parsed.records.map(migrateRecord).filter(Boolean);
      }
      return [];
    }

    function recordToCleanJson(r) {
      return {
        id: r.id,
        date: r.date,
        name: r.name,
        memo: r.memo,
        plaster: r.plaster,
        water: r.water,
        thumbnail: r.thumbnail,
      };
    }

    function recordsWorkerUrl(path) {
      const base = String(RECORDS_WORKER_BASE || "").replace(/\\/$/, "");
      const p = path.startsWith("/") ? path : "/" + path;
      return base + p;
    }

    async function workerFetchRecordsMeta() {
      const res = await fetch(recordsWorkerUrl("/records"));
      const shaHdr = res.headers.get("X-GitHub-Content-Sha");
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error(\`응답을 해석할 수 없습니다 (HTTP \${res.status})\`);
      }
      if (!res.ok || data.success === false) {
        throw new Error(data?.error || \`HTTP \${res.status}\`);
      }
      const records = normalizeRecordsPayload(data);
      const sha = shaHdr || null;
      return { records, sha };
    }

    async function workerPutRecords(records) {
      const res = await fetch(recordsWorkerUrl("/records"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          records: records.map(recordToCleanJson),
          sha: recordsFileSha ?? "",
        }),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error(\`HTTP \${res.status}\`);
      }
      if (!res.ok || data.success === false) {
        throw new Error(data?.error || \`HTTP \${res.status}\`);
      }
      const meta = await workerFetchRecordsMeta();
      recordsRemoteCache = meta.records;
      recordsFileSha = meta.sha;
    }

    async function ensureRecordsLoaded(force = false) {
      if (!force && recordsLoadedOnce) return;
      const meta = await workerFetchRecordsMeta();
      recordsRemoteCache = meta.records;
      recordsFileSha = meta.sha;
      recordsLoadedOnce = true;
    }

    function setRecordsLoading(on, text = "불러오는 중…") {
      const el = document.getElementById("records-loading");
      const tx = document.getElementById("records-loading-text");
      const st = document.getElementById("records-status");
      if (tx) tx.textContent = text;
      if (el) el.hidden = !on;
      if (st) {
        st.hidden = !on;
        st.textContent = on ? text : "";
      }
    }


    function escapeHtml(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function escapeRegExp(s) {
      return String(s).replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&");
    }

    /** 검색어와 일치하는 부분만 형광 스타일로 표시 */
    function highlightSearch(text, query) {
      const t = String(text ?? "");
      const q = String(query ?? "").trim();
      if (!q) return escapeHtml(t);
      try {
        const re = new RegExp(\`(\${escapeRegExp(q)})\`, "gi");
        return t.replace(re, match => \`<mark class="search-highlight">\${escapeHtml(match)}</mark>\`);
      } catch {
        return escapeHtml(t);
      }
    }

    function filterRecordsBySearch(records, query) {
      const q = String(query ?? "").trim().toLowerCase();
      if (!q) return records.slice();
      return records.filter(r => {
        const blob = [
          r.name,
          r.memo,
          r.date,
          typeof r.plaster === "number" ? String(r.plaster) : "",
          typeof r.water === "number" ? String(r.water) : "",
        ].join(" ").toLowerCase();
        return blob.includes(q);
      });
    }

    function sortRecordsList(records, sortKey) {
      const arr = records.slice();
      const pn = (x) => (typeof x === "number" && Number.isFinite(x) ? x : 0);
      switch (sortKey) {
        case "date-asc":
          arr.sort((a, b) => a.id - b.id);
          break;
        case "date-desc":
          arr.sort((a, b) => b.id - a.id);
          break;
        case "name-asc":
          arr.sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ko"));
          break;
        case "name-desc":
          arr.sort((a, b) => String(b.name || "").localeCompare(String(a.name || ""), "ko"));
          break;
        case "plaster-asc":
          arr.sort((a, b) => pn(a.plaster) - pn(b.plaster));
          break;
        case "plaster-desc":
          arr.sort((a, b) => pn(b.plaster) - pn(a.plaster));
          break;
        case "water-asc":
          arr.sort((a, b) => pn(a.water) - pn(b.water));
          break;
        case "water-desc":
          arr.sort((a, b) => pn(b.water) - pn(a.water));
          break;
        default:
          arr.sort((a, b) => b.id - a.id);
      }
      return arr;
    }

    function buildRecordCardHtml(r, query) {
      const plasterDisp = typeof r.plaster === "number"
        ? formatNum(r.plaster, r.plaster % 1 === 0 ? 0 : 2)
        : "—";
      const waterDisp = typeof r.water === "number"
        ? (r.water % 1 === 0 ? r.water.toLocaleString("ko-KR") : r.water.toFixed(1))
        : "—";

      const nameHtml = highlightSearch(r.name || "", query);
      const memoHtml = highlightSearch(r.memo || "", query);
      const dateHtml = highlightSearch(r.date || "", query);
      const plasterHtml = highlightSearch(plasterDisp, query);
      const waterHtml = highlightSearch(waterDisp, query);

      const thumb = r.thumbnail || "";
      const thumbHtml = thumb
        ? \`<img src="\${thumb.replace(/"/g, "&quot;")}" alt="" width="200" height="200" loading="lazy" />\`
        : \`<div class="record-card-thumb-fallback">미리보기 없음</div>\`;

      return \`<article class="record-card" data-id="\${r.id}">
        <header class="record-card-head">
          <h3 class="record-card-title">\${nameHtml}</h3>
          <span class="record-card-date">\${dateHtml}</span>
        </header>
        <div class="record-card-thumb">\${thumbHtml}</div>
        <div class="record-card-metrics" role="group" aria-label="석고·물량">
          <span class="record-metric-inline">
            <span class="record-metric-label">석고</span>
            <span class="record-metric-value">\${plasterHtml}<span class="record-metric-unit"> g</span></span>
          </span>
          <span class="record-metric-sep" aria-hidden="true"></span>
          <span class="record-metric-inline">
            <span class="record-metric-label">물</span>
            <span class="record-metric-value">\${waterHtml}<span class="record-metric-unit"> mL</span></span>
          </span>
        </div>
        <p class="record-card-memo">\${memoHtml}</p>
        <div class="record-card-actions">
          <button type="button" class="btn-record-edit">수정</button>
          <button type="button" class="btn-record-delete">삭제</button>
        </div>
      </article>\`;
    }

    function formatRecordDate(d) {
      const x = d instanceof Date ? d : new Date(d);
      const pad = n => String(n).padStart(2, "0");
      return \`\${x.getFullYear()}-\${pad(x.getMonth() + 1)}-\${pad(x.getDate())} \${pad(x.getHours())}:\${pad(x.getMinutes())}\`;
    }

    function makePlaceholderThumbnail() {
      const c = document.createElement("canvas");
      const S = 80;
      c.width = S;
      c.height = S;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#e8edf8";
      ctx.fillRect(0, 0, S, S);
      ctx.fillStyle = "#9ca3af";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("미리보기 없음", S / 2, S / 2);
      return c.toDataURL("image/png");
    }

    function preventNavDrop(e) {
      e.preventDefault();
    }
    ["dragenter", "dragover", "drop"].forEach(ev => {
      window.addEventListener(ev, preventNavDrop, true);
    });

    const viewersRoot    = document.getElementById("viewers-root");
    const mainAddDrop    = document.getElementById("main-add-drop");
    const mainAddFiles   = document.getElementById("main-add-files");
    const btnClearAll    = document.getElementById("btn-clear-all");

    const MODEL_MESH_COLOR = 0xa3f958;

    function applySlotLighting(slot) {
      if (!slot?.scene || !slot?.dirLight || !slot?.hemiLight) return;
      const hemi = slot.hemiLight;
      const dir  = slot.dirLight;
      if (dir.parent) dir.parent.remove(dir);
      if (dir.target.parent) dir.target.parent.remove(dir.target);
      hemi.intensity = 0.25;
      dir.intensity  = 1.15;
      slot.scene.add(dir.target);
      dir.target.position.set(0, 0, 0);
      slot.scene.add(dir);
      dir.position.set(55, 95, 70);
    }

    function setupMeshDrag(slot) {
      const el = slot.renderer.domElement;
      let dragging = false;
      let lastX = 0, lastY = 0;
      const SPEED = 0.008;

      function applyDelta(dx, dy) {
        if (!slot.mesh) return;
        const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx * SPEED);
        const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy * SPEED);
        slot.mesh.quaternion.premultiply(qY).premultiply(qX);
      }

      function applyZoom(factor) {
        const minDist = 0.5;
        const maxDist = 10000;
        const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(slot.camera.quaternion);
        const dist = slot.camera.position.distanceTo(slot.controls_target || new THREE.Vector3(0, 0, 0));
        const step = dist * (1 - factor);
        slot.camera.position.addScaledVector(dir, step);
        const newDist = slot.camera.position.length();
        if (newDist < minDist) slot.camera.position.setLength(minDist);
        if (newDist > maxDist) slot.camera.position.setLength(maxDist);
      }

      el.addEventListener("mousedown", e => {
        if (e.button !== 0) return;
        dragging = true;
        lastX = e.clientX; lastY = e.clientY;
        el.style.cursor = "grabbing";
      });
      window.addEventListener("mousemove", e => {
        if (!dragging) return;
        applyDelta(e.clientX - lastX, e.clientY - lastY);
        lastX = e.clientX; lastY = e.clientY;
      });
      window.addEventListener("mouseup", () => { dragging = false; el.style.cursor = "grab"; });
      el.style.cursor = "grab";

      el.addEventListener("wheel", e => {
        e.preventDefault();
        applyZoom(e.deltaY > 0 ? 1.12 : 1 / 1.12);
      }, { passive: false });

      let lastTouchX = 0, lastTouchY = 0, lastPinchDist = 0;
      el.addEventListener("touchstart", e => {
        e.preventDefault();
        if (e.touches.length === 1) {
          lastTouchX = e.touches[0].clientX;
          lastTouchY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
          lastPinchDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
        }
      }, { passive: false });
      el.addEventListener("touchmove", e => {
        e.preventDefault();
        if (e.touches.length === 1) {
          applyDelta(e.touches[0].clientX - lastTouchX, e.touches[0].clientY - lastTouchY);
          lastTouchX = e.touches[0].clientX;
          lastTouchY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
          const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          if (lastPinchDist > 0) applyZoom(lastPinchDist / dist);
          lastPinchDist = dist;
        }
      }, { passive: false });
      el.addEventListener("touchend", () => { lastPinchDist = 0; }, { passive: true });
    }

    let viewerSeq = 0;
    let viewerSlots = [];

    function collectModelsWithGeometry() {
      return viewerSlots.filter(s => s.geometry && s.mesh && s.arrayBuffer).map(s => ({
        name: s.fileName,
        geometry: s.geometry,
        mesh: s.mesh,
        arrayBuffer: s.arrayBuffer,
      }));
    }

    function resizeSlotRenderer(slot) {
      if (!slot.renderer || !slot.canvasHost || !slot.camera) return;
      const host = slot.canvasHost;
      const w = Math.max(host.clientWidth, 2);
      const h = Math.max(host.clientHeight, 2);
      slot.camera.aspect = w / h;
      slot.camera.updateProjectionMatrix();
      slot.renderer.setSize(w, h);
    }

    function captureSlotThumbnail80(slot) {
      if (!slot?.renderer || !slot?.camera || !slot.scene) return makePlaceholderThumbnail();
      const r = slot.renderer;
      const cam = slot.camera;
      const host = slot.canvasHost;
      const w0 = Math.max(host.clientWidth, 2);
      const h0 = Math.max(host.clientHeight, 2);
      const pr = r.getPixelRatio();
      const SIZE = 80;

      r.setPixelRatio(1);
      r.setSize(SIZE, SIZE);
      cam.aspect = 1;
      cam.updateProjectionMatrix();
      r.render(slot.scene, cam);
      const dataUrl = r.domElement.toDataURL("image/png");

      r.setPixelRatio(pr);
      r.setSize(w0, h0);
      cam.aspect = w0 / h0;
      cam.updateProjectionMatrix();
      r.render(slot.scene, cam);
      return dataUrl;
    }

    let modalPreview = null;

    function capturePreviewAsDataURL(preview, size = 200) {
      if (!preview?.renderer || !preview?.camera || !preview?.scene || !preview?.mesh) {
        return makePlaceholderThumbnail();
      }
      const r = preview.renderer;
      const cam = preview.camera;
      const host = preview.host;
      const w0 = Math.max(host.clientWidth, 2);
      const h0 = Math.max(host.clientHeight, 2);
      const pr = r.getPixelRatio();
      const SIZE = size;

      r.setPixelRatio(1);
      r.setSize(SIZE, SIZE);
      cam.aspect = 1;
      cam.updateProjectionMatrix();
      r.render(preview.scene, cam);
      const dataUrl = r.domElement.toDataURL("image/png");

      r.setPixelRatio(pr);
      r.setSize(w0, h0);
      cam.aspect = w0 / h0;
      cam.updateProjectionMatrix();
      r.render(preview.scene, cam);
      return dataUrl;
    }

    function unbindPreviewOrbitControls(p) {
      (p._orbitCleanups || []).forEach(fn => {
        try { fn(); } catch (_) { /* noop */ }
      });
      p._orbitCleanups = [];
    }

    function bindPreviewOrbitControls(p) {
      const el = p.renderer.domElement;
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      const SPEED = 0.008;
      const cleanups = [];
      const add = (node, ev, fn, opts) => {
        node.addEventListener(ev, fn, opts);
        cleanups.push(() => node.removeEventListener(ev, fn, opts));
      };

      function applyDelta(dx, dy) {
        if (!p.mesh) return;
        const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx * SPEED);
        const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy * SPEED);
        p.mesh.quaternion.premultiply(qY).premultiply(qX);
      }

      function applyZoom(factor) {
        const minDist = 0.5;
        const maxDist = 10000;
        const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(p.camera.quaternion);
        const dist = p.camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
        const step = dist * (1 - factor);
        p.camera.position.addScaledVector(dir, step);
        const newDist = p.camera.position.length();
        if (newDist < minDist) p.camera.position.setLength(minDist);
        if (newDist > maxDist) p.camera.position.setLength(maxDist);
      }

      add(el, "mousedown", e => {
        if (e.button !== 0) return;
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        el.style.cursor = "grabbing";
      });
      add(window, "mousemove", e => {
        if (!dragging) return;
        applyDelta(e.clientX - lastX, e.clientY - lastY);
        lastX = e.clientX;
        lastY = e.clientY;
      });
      add(window, "mouseup", () => {
        dragging = false;
        el.style.cursor = "grab";
      });
      el.style.cursor = "grab";

      add(el, "wheel", e => {
        e.preventDefault();
        applyZoom(e.deltaY > 0 ? 1.12 : 1 / 1.12);
      }, { passive: false });

      let lastTouchX = 0;
      let lastTouchY = 0;
      let lastPinchDist = 0;
      add(el, "touchstart", e => {
        e.preventDefault();
        if (e.touches.length === 1) {
          lastTouchX = e.touches[0].clientX;
          lastTouchY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
          lastPinchDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
        }
      }, { passive: false });
      add(el, "touchmove", e => {
        e.preventDefault();
        if (e.touches.length === 1) {
          applyDelta(e.touches[0].clientX - lastTouchX, e.touches[0].clientY - lastTouchY);
          lastTouchX = e.touches[0].clientX;
          lastTouchY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
          const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          if (lastPinchDist > 0) applyZoom(lastPinchDist / dist);
          lastPinchDist = dist;
        }
      }, { passive: false });
      add(el, "touchend", () => {
        lastPinchDist = 0;
      }, { passive: true });

      p._orbitCleanups = cleanups;
    }

    function loopModalPreview() {
      if (!modalPreview?.renderer) return;
      modalPreview._raf = requestAnimationFrame(loopModalPreview);
      modalPreview.renderer.render(modalPreview.scene, modalPreview.camera);
    }

    function disposeModalPreview() {
      if (!modalPreview) return;
      if (modalPreview._raf) cancelAnimationFrame(modalPreview._raf);
      modalPreview._raf = null;
      if (modalPreview._resizeObs) {
        modalPreview._resizeObs.disconnect();
        modalPreview._resizeObs = null;
      }
      unbindPreviewOrbitControls(modalPreview);
      if (modalPreview.mesh) {
        modalPreview.scene.remove(modalPreview.mesh);
        modalPreview.mesh.geometry?.dispose();
        modalPreview.mesh.material?.dispose();
        modalPreview.mesh = null;
      }
      if (modalPreview.renderer) {
        modalPreview.renderer.dispose();
        const cel = modalPreview.renderer.domElement;
        if (cel?.parentNode) cel.parentNode.removeChild(cel);
        modalPreview.renderer = null;
      }
      modalPreview.scene = null;
      modalPreview.camera = null;
      modalPreview = null;
    }

    function syncSaveModalPreviewUI(hasModel) {
      const hint = document.getElementById("modal-save-preview-hint");
      const host = document.getElementById("modal-preview-canvas-host");
      if (!host) return;
      if (hasModel) {
        host.hidden = false;
        if (hint) {
          hint.hidden = false;
          hint.textContent =
            "메인 뷰어와 같은 모델입니다. 여기서 각도를 맞춘 뒤 저장하면 그 화면이 썸네일로 저장됩니다. 드래그·휠·핀치로 조절할 수 있습니다.";
        }
      } else {
        host.hidden = true;
        if (hint) {
          hint.hidden = false;
          hint.textContent =
            "불러온 STL이 없어 체적만 저장됩니다. 썸네일은 기본 이미지로 저장됩니다.";
        }
      }
    }

    function setupModalPreviewForSave() {
      disposeModalPreview();
      const host = document.getElementById("modal-preview-canvas-host");
      const slot = viewerSlots.find(s => s.mesh && s.geometry);
      if (!host) return;

      if (!slot) {
        syncSaveModalPreviewUI(false);
        return;
      }

      syncSaveModalPreviewUI(true);
      host.innerHTML = "";

      const w = Math.max(host.clientWidth, 200);
      const h = Math.max(host.clientHeight, 168);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f4ff);
      const camera = new THREE.PerspectiveCamera(45, w / h, slot.camera.near, slot.camera.far);
      camera.position.copy(slot.camera.position);
      camera.quaternion.copy(slot.camera.quaternion);
      camera.fov = slot.camera.fov;
      camera.zoom = slot.camera.zoom;
      camera.near = slot.camera.near;
      camera.far = slot.camera.far;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      host.appendChild(renderer.domElement);

      const hemi = new THREE.HemisphereLight(0xffffff, 0xdde4f0, 0.25);
      scene.add(hemi);
      const dir = new THREE.DirectionalLight(0xffffff, 1.15);
      const tgt = new THREE.Object3D();
      tgt.position.set(0, 0, 0);
      scene.add(tgt);
      dir.target = tgt;
      scene.add(dir);
      dir.position.set(55, 95, 70);

      const geom = slot.mesh.geometry.clone();
      const mat = slot.mesh.material.clone();
      const mesh = new THREE.Mesh(geom, mat);
      mesh.quaternion.copy(slot.mesh.quaternion);
      scene.add(mesh);

      modalPreview = {
        renderer,
        scene,
        camera,
        mesh,
        host,
        _raf: null,
        _resizeObs: null,
      };

      bindPreviewOrbitControls(modalPreview);
      loopModalPreview();

      const ro = new ResizeObserver(() => {
        if (!modalPreview?.host || !modalPreview.renderer) return;
        const hw = Math.max(modalPreview.host.clientWidth, 2);
        const hh = Math.max(modalPreview.host.clientHeight, 2);
        modalPreview.camera.aspect = hw / hh;
        modalPreview.camera.updateProjectionMatrix();
        modalPreview.renderer.setSize(hw, hh);
      });
      ro.observe(host);
      modalPreview._resizeObs = ro;
    }

    function setupEditModalThumb(record) {
      disposeModalPreview();
      const saveWrap = document.getElementById("modal-save-preview-wrap");
      const editWrap = document.getElementById("modal-edit-thumb-wrap");
      const img = document.getElementById("modal-edit-thumb-img");
      const empty = document.getElementById("modal-edit-thumb-empty");
      if (saveWrap) saveWrap.hidden = true;
      if (!editWrap || !img || !empty) return;
      editWrap.hidden = false;
      const thumb = record.thumbnail || "";
      if (thumb) {
        empty.hidden = true;
        img.hidden = false;
        img.onload = () => {
          empty.hidden = true;
        };
        img.onerror = () => {
          img.hidden = true;
          empty.hidden = false;
          empty.textContent = "미리보기 이미지를 불러올 수 없습니다.";
        };
        img.src = thumb;
      } else {
        img.hidden = true;
        img.removeAttribute("src");
        empty.hidden = false;
        empty.textContent = "등록된 미리보기 이미지가 없습니다.";
      }
    }

    function initThreeForSlot(slot) {
      const host = slot.canvasHost;
      const w = Math.max(host.clientWidth, 2);
      const h = Math.max(host.clientHeight, 2);
      slot.scene = new THREE.Scene();
      slot.scene.background = new THREE.Color(0xf0f4ff);
      slot.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000);
      slot.initialCameraPos = new THREE.Vector3(0, 0, 120);
      slot.camera.position.copy(slot.initialCameraPos);
      slot.camera.lookAt(0, 0, 0);
      slot.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      slot.renderer.setSize(w, h);
      slot.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      host.appendChild(slot.renderer.domElement);

      slot.hemiLight = new THREE.HemisphereLight(0xffffff, 0xdde4f0, 0.25);
      slot.scene.add(slot.hemiLight);
      slot.dirLight = new THREE.DirectionalLight(0xffffff, 1.15);
      slot.scene.add(slot.dirLight.target);
      slot.dirLight.target.position.set(0, 0, 0);
      slot.scene.add(slot.dirLight);
      slot.dirLight.position.set(55, 95, 70);
      applySlotLighting(slot);

      setupMeshDrag(slot);

      function loop() {
        slot._raf = requestAnimationFrame(loop);
        slot.renderer.render(slot.scene, slot.camera);
      }
      loop();

      slot._onResize = () => resizeSlotRenderer(slot);
      window.addEventListener("resize", slot._onResize);
      requestAnimationFrame(() => resizeSlotRenderer(slot));
    }

    function clearSlotMesh(slot) {
      if (!slot.scene) return;
      if (slot.mesh) {
        slot.scene.remove(slot.mesh);
        slot.mesh.geometry?.dispose();
        slot.mesh.material?.dispose();
        slot.mesh = undefined;
      }
      slot.geometry = undefined;
      slot.arrayBuffer = undefined;
      slot.fileName = "";
      slot.dropZone.classList.remove("has-model");
      slot.card.classList.remove("viewer-card--has-model");
      slot.fileLabel.textContent = "파일 없음";
      if (slot.sizeBar) slot.sizeBar.classList.remove("visible");
    }

    function disposeSlot(slot) {
      if (slot._raf) cancelAnimationFrame(slot._raf);
      slot._raf = null;
      if (slot._onResize) window.removeEventListener("resize", slot._onResize);
      clearSlotMesh(slot);
      if (slot.renderer) {
        slot.renderer.dispose();
        const el = slot.renderer.domElement;
        if (el?.parentNode) el.parentNode.removeChild(el);
        slot.renderer = null;
      }
      slot.scene = null;
      slot.camera = null;
    }

    function fitCameraToSlotMesh(slot) {
      if (!slot.mesh || !slot.camera) return;
      const box = new THREE.Box3().setFromObject(slot.mesh);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z, 1);
      const dist = maxDim * 2.0;
      slot.camera.near = Math.max(0.01, dist / 200);
      slot.camera.far = dist * 50;
      slot.camera.updateProjectionMatrix();
      slot.initialCameraPos = new THREE.Vector3(0, 0, dist);
      slot.camera.position.copy(slot.initialCameraPos);
      slot.camera.lookAt(0, 0, 0);
    }

    async function loadSTLIntoSlotFromArrayBuffer(slot, arrayBuffer, fileName) {
      const loader = new STLLoader();
      const geometry = loader.parse(arrayBuffer);
      geometry.computeVertexNormals();
      geometry.center();
      clearSlotMesh(slot);
      slot.geometry = geometry;
      slot.arrayBuffer = arrayBuffer;
      slot.fileName = fileName;
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshStandardMaterial({ color: MODEL_MESH_COLOR, metalness: 0.05, roughness: 0.55 })
      );
      slot.mesh = mesh;
      slot.scene.add(mesh);
      fitCameraToSlotMesh(slot);
      slot.dropZone.classList.add("has-model");
      slot.card.classList.add("viewer-card--has-model");
      slot.fileLabel.textContent = fileName;

      const box = new THREE.Box3().setFromObject(mesh);
      const sz = new THREE.Vector3();
      box.getSize(sz);
      slot.sizeX.textContent = formatMm(sz.x);
      slot.sizeY.textContent = formatMm(sz.y);
      slot.sizeZ.textContent = formatMm(sz.z);
      slot.sizeBar.classList.add("visible");

      refreshAfterModelsChange();
    }

    async function loadSTLIntoSlot(slot, file) {
      if (!file || !file.name.toLowerCase().endsWith(".stl")) {
        alert("STL 파일(.stl)만 지원합니다.");
        return;
      }
      const arrayBuffer = await file.arrayBuffer();
      await loadSTLIntoSlotFromArrayBuffer(slot, arrayBuffer, file.name);
    }

    function setupSlotClickOpenFile(slot) {
      const { dropZone, canvasHost, fileInput } = slot;
      dropZone.addEventListener("click", ev => {
        if (slot.geometry && ev.target.closest(".slot-canvas-host")) return;
        fileInput.click();
      });
    }

    function filterStlFiles(fileList) {
      return Array.from(fileList || []).filter(f => f.name.toLowerCase().endsWith(".stl"));
    }

    async function addViewsFromStlFiles(files) {
      const stl = filterStlFiles(files);
      if (stl.length === 0) {
        if (fileListLength(files) > 0) alert("STL 파일(.stl)만 지원합니다.");
        return;
      }
      for (const f of stl) {
        const slot = createViewerSlot();
        await loadSTLIntoSlot(slot, f);
      }
    }

    function fileListLength(fileList) {
      return fileList ? fileList.length : 0;
    }

    function setupMainAddDrop() {
      mainAddDrop.addEventListener("dragenter", e => { e.preventDefault(); mainAddDrop.classList.add("dragover"); });
      mainAddDrop.addEventListener("dragover", e => { e.preventDefault(); mainAddDrop.classList.add("dragover"); });
      mainAddDrop.addEventListener("dragleave", e => {
        if (!e.relatedTarget || !mainAddDrop.contains(e.relatedTarget)) mainAddDrop.classList.remove("dragover");
      });
      mainAddDrop.addEventListener("drop", e => {
        e.preventDefault();
        e.stopPropagation();
        mainAddDrop.classList.remove("dragover");
        addViewsFromStlFiles(e.dataTransfer?.files);
      });
      mainAddDrop.addEventListener("click", () => mainAddFiles.click());
      mainAddDrop.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          mainAddFiles.click();
        }
      });
      mainAddFiles.addEventListener("change", () => {
        addViewsFromStlFiles(mainAddFiles.files);
        mainAddFiles.value = "";
      });
    }

    function createViewerSlot() {
      viewerSeq += 1;
      const card = document.createElement("div");
      card.className = "viewer-card";
      card.innerHTML = \`
        <div class="slot-toolbar-top">
          <span class="slot-title">뷰어 \${viewerSeq}</span>
          <button type="button" class="btn-remove-slot" title="이 뷰 닫기" aria-label="이 뷰 닫기">×</button>
        </div>
        <div class="slot-drop-zone">
          <div class="slot-canvas-host"></div>
          <div class="drop-hint">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <span>이 박스를 클릭해 STL 선택</span>
            <span class="drop-hint-sub">또는 아래 <strong>STL 선택</strong> (한 뷰당 1개)</span>
          </div>
        </div>
        <div class="size-bar">
          <span class="size-bar-label">크기</span>
          <div class="size-dims">
            <span class="size-dim"><span class="ax">W</span><span class="vl size-x">—</span><span class="un">mm</span></span>
            <span class="size-dim"><span class="ax">D</span><span class="vl size-y">—</span><span class="un">mm</span></span>
            <span class="size-dim"><span class="ax">H</span><span class="vl size-z">—</span><span class="un">mm</span></span>
          </div>
        </div>
        <div class="toolbar">
          <label class="file-btn">STL 선택<input type="file" class="slot-file-input" accept=".stl,.STL" /></label>
          <button type="button" class="btn-slot-reset">뷰 리셋</button>
          <span class="filename slot-file-label">파일 없음</span>
        </div>\`;
      viewersRoot.appendChild(card);

      const slot = {
        id: \`slot-\${viewerSeq}\`,
        card,
        dropZone: card.querySelector(".slot-drop-zone"),
        canvasHost: card.querySelector(".slot-canvas-host"),
        fileInput: card.querySelector(".slot-file-input"),
        fileLabel: card.querySelector(".slot-file-label"),
        sizeBar: card.querySelector(".size-bar"),
        sizeX: card.querySelector(".size-x"),
        sizeY: card.querySelector(".size-y"),
        sizeZ: card.querySelector(".size-z"),
        btnReset: card.querySelector(".btn-slot-reset"),
        btnRemove: card.querySelector(".btn-remove-slot"),
      };

      initThreeForSlot(slot);
      setupSlotClickOpenFile(slot);

      slot.fileInput.addEventListener("change", () => {
        const f = slot.fileInput.files?.[0];
        if (f) loadSTLIntoSlot(slot, f);
        slot.fileInput.value = "";
      });
      slot.btnReset.addEventListener("click", () => {
        if (slot.mesh) slot.mesh.quaternion.identity();
        slot.camera.position.copy(slot.initialCameraPos);
        slot.camera.lookAt(0, 0, 0);
      });
      slot.btnRemove.addEventListener("click", () => removeViewerSlot(slot));

      viewerSlots.push(slot);
      return slot;
    }

    function removeViewerSlot(slot) {
      const i = viewerSlots.indexOf(slot);
      if (i < 0) return;
      viewerSlots.splice(i, 1);
      disposeSlot(slot);
      slot.card.remove();
      refreshAfterModelsChange();
    }

    function clearAllSlotsMeshes() {
      viewerSlots.forEach(s => clearSlotMesh(s));
      refreshAfterModelsChange();
    }

    function refreshAfterModelsChange() {
      updatePlasterCalc();
    }

    const PLASTER_K = 1.1163;
    const WATER_K   = 0.78141;

    const plasterMargin  = document.getElementById("plaster-margin");
    const plasterMarginOut = document.getElementById("plaster-margin-out");
    const plasterVolManual = document.getElementById("plaster-vol-manual");

    function roundUp10(n) { return Math.ceil(n / 10) * 10; }

    function getPlasterCalcResult() {
      const loadedModels = collectModelsWithGeometry();
      let totalVolMm3 = 0;
      if (loadedModels.length > 0) {
        for (const m of loadedModels) totalVolMm3 += computeVolumeMm3(m.geometry);
      } else {
        const manualMm3 = parseFloat(plasterVolManual.value);
        if (!manualMm3 || manualMm3 <= 0) return null;
        totalVolMm3 = manualMm3;
      }
      const margin = parseInt(plasterMargin.value, 10);
      const f = 1 + margin / 100;
      const cc = totalVolMm3 / 1000;
      const plaster = cc * PLASTER_K * f;
      const water = cc * WATER_K * f;
      const pRec = roundUp10(plaster);
      const wRec = pRec * 0.70;
      return {
        volMm3: totalVolMm3,
        volCc: cc,
        margin,
        plasterActual: Math.round(plaster),
        plasterRec: pRec,
        waterActual: Math.round(water),
        waterRec: wRec,
      };
    }

    function updateSaveButtonState() {
      const btn = document.getElementById("btn-save-record");
      if (btn) btn.disabled = getPlasterCalcResult() === null;
    }

    function getDefaultSaveName() {
      const models = collectModelsWithGeometry();
      if (models.length === 0) return "직접입력";
      if (models.length === 1) return models[0].name.replace(/\\.stl$/i, "") || models[0].name;
      return models.map(m => m.name).join(", ");
    }

    let modalMode = "create";
    let editingRecordId = null;

    let modalRatioProgrammatic = false;

    function modalWaterFromPlaster(plaster) {
      return plaster * (PLASTER_WATER_RATIO.water / PLASTER_WATER_RATIO.plaster);
    }

    function modalPlasterFromWater(water) {
      return water * (PLASTER_WATER_RATIO.plaster / PLASTER_WATER_RATIO.water);
    }

    function formatModalWaterDisplay(w) {
      if (!Number.isFinite(w)) return "";
      return w % 1 === 0 ? String(w) : String(Number(w.toFixed(1)));
    }

    function formatModalPlasterDisplay(p) {
      if (!Number.isFinite(p)) return "";
      return p % 1 === 0 ? String(Math.round(p)) : String(Number(p.toFixed(1)));
    }

    function setupModalRatioSync() {
      const chk = document.getElementById("modal-ratio-sync");
      const inpP = document.getElementById("modal-field-plaster");
      const inpW = document.getElementById("modal-field-water");
      if (!chk || !inpP || !inpW) return;

      function syncWaterFromPlaster() {
        if (modalRatioProgrammatic || !chk.checked) return;
        const p = parseFloat(inpP.value);
        if (!Number.isFinite(p) || p < 0) return;
        modalRatioProgrammatic = true;
        inpW.value = formatModalWaterDisplay(modalWaterFromPlaster(p));
        modalRatioProgrammatic = false;
      }

      function syncPlasterFromWater() {
        if (modalRatioProgrammatic || !chk.checked) return;
        const w = parseFloat(inpW.value);
        if (!Number.isFinite(w) || w < 0) return;
        modalRatioProgrammatic = true;
        inpP.value = formatModalPlasterDisplay(modalPlasterFromWater(w));
        modalRatioProgrammatic = false;
      }

      inpP.addEventListener("input", syncWaterFromPlaster);
      inpW.addEventListener("input", syncPlasterFromWater);

      chk.addEventListener("change", () => {
        if (!chk.checked) return;
        const p = parseFloat(inpP.value);
        const w = parseFloat(inpW.value);
        modalRatioProgrammatic = true;
        if (Number.isFinite(p) && p >= 0) {
          inpW.value = formatModalWaterDisplay(modalWaterFromPlaster(p));
        } else if (Number.isFinite(w) && w >= 0) {
          inpP.value = formatModalPlasterDisplay(modalPlasterFromWater(w));
        }
        modalRatioProgrammatic = false;
      });
    }

    let ratioPageSync = false;

    function setupStandaloneRatioCalc() {
      const inpP = document.getElementById("ratio-input-plaster");
      const inpW = document.getElementById("ratio-input-water");
      const btnClear = document.getElementById("ratio-calc-clear");
      if (!inpP || !inpW) return;

      function syncWaterFromPlaster() {
        if (ratioPageSync) return;
        const raw = inpP.value.trim();
        if (raw === "") {
          ratioPageSync = true;
          inpW.value = "";
          ratioPageSync = false;
          return;
        }
        const p = parseFloat(raw);
        if (!Number.isFinite(p) || p < 0) return;
        ratioPageSync = true;
        inpW.value = formatModalWaterDisplay(modalWaterFromPlaster(p));
        ratioPageSync = false;
      }

      function syncPlasterFromWater() {
        if (ratioPageSync) return;
        const raw = inpW.value.trim();
        if (raw === "") {
          ratioPageSync = true;
          inpP.value = "";
          ratioPageSync = false;
          return;
        }
        const w = parseFloat(raw);
        if (!Number.isFinite(w) || w < 0) return;
        ratioPageSync = true;
        inpP.value = formatModalPlasterDisplay(modalPlasterFromWater(w));
        ratioPageSync = false;
      }

      inpP.addEventListener("input", syncWaterFromPlaster);
      inpW.addEventListener("input", syncPlasterFromWater);
      btnClear?.addEventListener("click", () => {
        inpP.value = "";
        inpW.value = "";
        inpP.focus();
      });
    }

    function openRecordModal() {
      const el = document.getElementById("record-modal");
      if (el) {
        el.hidden = false;
        document.body.style.overflow = "hidden";
      }
    }

    function closeRecordModal() {
      disposeModalPreview();
      const el = document.getElementById("record-modal");
      if (el) {
        el.hidden = true;
        document.body.style.overflow = "";
      }
      editingRecordId = null;
      modalMode = "create";
    }

    function openSaveModal() {
      const calc = getPlasterCalcResult();
      if (!calc) {
        alert("저장할 계산 결과가 없습니다.");
        return;
      }
      modalMode = "create";
      editingRecordId = null;
      document.getElementById("record-modal-title").textContent = "저장";
      document.getElementById("modal-btn-primary").textContent = "저장 완료";
      document.getElementById("modal-field-name").value = getDefaultSaveName();
      document.getElementById("modal-field-plaster").value = String(calc.plasterRec);
      document.getElementById("modal-field-water").value =
        calc.waterRec % 1 === 0 ? String(calc.waterRec) : String(Number(calc.waterRec.toFixed(1)));
      document.getElementById("modal-field-memo").value = "";
      const ratioChk = document.getElementById("modal-ratio-sync");
      if (ratioChk) ratioChk.checked = true;
      const saveWrap = document.getElementById("modal-save-preview-wrap");
      const editWrap = document.getElementById("modal-edit-thumb-wrap");
      if (saveWrap) saveWrap.hidden = false;
      if (editWrap) editWrap.hidden = true;
      openRecordModal();
      requestAnimationFrame(() => setupModalPreviewForSave());
      document.getElementById("modal-field-name")?.focus();
    }

    function openEditModal(record) {
      modalMode = "edit";
      editingRecordId = record.id;
      document.getElementById("record-modal-title").textContent = "기록 수정";
      document.getElementById("modal-btn-primary").textContent = "수정 완료";
      document.getElementById("modal-field-name").value = record.name || "";
      document.getElementById("modal-field-plaster").value = String(record.plaster ?? "");
      document.getElementById("modal-field-water").value = String(record.water ?? "");
      document.getElementById("modal-field-memo").value = record.memo || "";
      const ratioChk = document.getElementById("modal-ratio-sync");
      if (ratioChk) ratioChk.checked = true;
      openRecordModal();
      setupEditModalThumb(record);
      document.getElementById("modal-field-name")?.focus();
    }

    function readModalFields() {
      const plaster = parseFloat(document.getElementById("modal-field-plaster").value);
      const water = parseFloat(document.getElementById("modal-field-water").value);
      return {
        name: (document.getElementById("modal-field-name").value || "").trim() || "이름 없음",
        memo: (document.getElementById("modal-field-memo").value || "").trim(),
        plaster: Number.isFinite(plaster) ? plaster : 0,
        water: Number.isFinite(water) ? water : 0,
      };
    }

    function showSaveCommitOverlay(on, msg = "저장 중…") {
      const el = document.getElementById("save-commit-overlay");
      const tx = el?.querySelector(".save-commit-msg");
      if (tx && msg) tx.textContent = msg;
      if (el) el.hidden = !on;
    }

    let saveToastTimer = null;
    function showSaveToast(text) {
      const el = document.getElementById("save-toast");
      if (!el) return;
      el.textContent = text;
      el.hidden = false;
      if (saveToastTimer) clearTimeout(saveToastTimer);
      saveToastTimer = setTimeout(() => {
        el.hidden = true;
        saveToastTimer = null;
      }, 2800);
    }

    function confirmRecordCommit() {
      const dlg = document.getElementById("record-commit-confirm");
      const msg = document.getElementById("record-commit-confirm-msg");
      const yesBtn = document.getElementById("record-commit-confirm-yes");
      const noBtn = document.getElementById("record-commit-confirm-no");
      if (!dlg || !msg || !yesBtn || !noBtn) return Promise.resolve(false);

      msg.textContent =
        modalMode === "edit" ? "수정 내용을 저장하시겠습니까?" : "저장하시겠습니까?";

      return new Promise(resolve => {
        let settled = false;
        function cleanup() {
          yesBtn.removeEventListener("click", onYes);
          noBtn.removeEventListener("click", onNo);
          dlg.removeEventListener("cancel", onCancel);
        }
        function finish(ok) {
          if (settled) return;
          settled = true;
          cleanup();
          dlg.close();
          resolve(ok);
        }
        function onYes() {
          finish(true);
        }
        function onNo() {
          finish(false);
        }
        function onCancel(e) {
          e.preventDefault();
          finish(false);
        }
        yesBtn.addEventListener("click", onYes);
        noBtn.addEventListener("click", onNo);
        dlg.addEventListener("cancel", onCancel);
        dlg.showModal();
      });
    }

    async function commitRecordModal() {
      const primaryBtn = document.getElementById("modal-btn-primary");
      const fields = readModalFields();

      if (modalMode === "create") {
        const thumbnail = modalPreview?.mesh
          ? capturePreviewAsDataURL(modalPreview, 200)
          : makePlaceholderThumbnail();
        const id = Date.now();
        const record = {
          id,
          date: formatRecordDate(new Date(id)),
          name: fields.name,
          memo: fields.memo,
          plaster: fields.plaster,
          water: fields.water,
          thumbnail,
        };
        if (primaryBtn) primaryBtn.disabled = true;
        showSaveCommitOverlay(true, "저장 중…");
        try {
          await ensureRecordsLoaded(true);
          const records = [...(recordsRemoteCache || [])];
          records.push(record);
          await workerPutRecords(records);
          await renderRecordsList({ forceFetch: false });
          closeRecordModal();
          showSaveToast("저장되었습니다.");
        } catch (e) {
          alert(\`저장에 실패했습니다.\\n\${e?.message || e}\`);
        } finally {
          showSaveCommitOverlay(false);
          if (primaryBtn) primaryBtn.disabled = false;
        }
        return;
      }
      if (modalMode === "edit" && editingRecordId != null) {
        if (primaryBtn) primaryBtn.disabled = true;
        showSaveCommitOverlay(true, "수정 반영 중…");
        try {
          await ensureRecordsLoaded(true);
          const records = [...(recordsRemoteCache || [])];
          const rec = records.find(x => x.id === editingRecordId);
          if (!rec) {
            closeRecordModal();
            return;
          }
          rec.name = fields.name;
          rec.memo = fields.memo;
          rec.plaster = fields.plaster;
          rec.water = fields.water;
          await workerPutRecords(records);
          await renderRecordsList({ forceFetch: false });
          closeRecordModal();
          showSaveToast("저장되었습니다.");
        } catch (e) {
          alert(\`수정에 실패했습니다.\\n\${e?.message || e}\`);
        } finally {
          showSaveCommitOverlay(false);
          if (primaryBtn) primaryBtn.disabled = false;
        }
      }
    }

    async function renderRecordsList(opts = {}) {
      const forceFetch = opts.forceFetch === true;
      const listEl = document.getElementById("records-list");
      const emptyEl = document.getElementById("records-empty");
      const countEl = document.getElementById("records-count");
      const searchEl = document.getElementById("records-search");
      const sortEl = document.getElementById("records-sort");
      if (!listEl || !emptyEl) return;

      const needsNetwork = forceFetch || !recordsLoadedOnce;
      if (needsNetwork) setRecordsLoading(true, "불러오는 중…");

      try {
        await ensureRecordsLoaded(forceFetch);
      } catch (e) {
        emptyEl.hidden = false;
        emptyEl.textContent = \`기록을 불러오지 못했습니다. (\${e?.message || e})\`;
        listEl.innerHTML = "";
        if (countEl) {
          countEl.hidden = true;
          countEl.textContent = "";
        }
        return;
      } finally {
        if (needsNetwork) setRecordsLoading(false);
      }

      const all = recordsRemoteCache || [];
      const query = searchEl?.value ?? "";
      const sortKey = sortEl?.value ?? "date-desc";

      let rows = filterRecordsBySearch(all, query);
      rows = sortRecordsList(rows, sortKey);

      if (countEl) {
        if (all.length === 0) {
          countEl.hidden = true;
          countEl.textContent = "";
        } else {
          countEl.hidden = false;
          const q = String(query).trim();
          countEl.textContent = q
            ? \`전체 \${all.length}건 · 검색 결과 \${rows.length}건\`
            : \`총 \${all.length}건\`;
        }
      }

      if (all.length === 0) {
        emptyEl.hidden = false;
        emptyEl.textContent = "저장된 기록이 없습니다.";
        listEl.innerHTML = "";
        return;
      }

      if (rows.length === 0) {
        emptyEl.hidden = false;
        emptyEl.textContent = "검색·정렬 조건에 맞는 기록이 없습니다.";
        listEl.innerHTML = "";
        return;
      }

      emptyEl.hidden = true;
      listEl.innerHTML = rows.map(r => buildRecordCardHtml(r, query)).join("");
    }

    function switchTab(tab) {
      const calcBtn = document.getElementById("tab-btn-calc");
      const storeBtn = document.getElementById("tab-btn-store");
      const panelCalc = document.getElementById("panel-calc");
      const panelStore = document.getElementById("panel-store");
      const isCalc = tab === "calc";
      if (calcBtn) {
        calcBtn.classList.toggle("active", isCalc);
        calcBtn.setAttribute("aria-selected", isCalc ? "true" : "false");
      }
      if (storeBtn) {
        storeBtn.classList.toggle("active", !isCalc);
        storeBtn.setAttribute("aria-selected", !isCalc ? "true" : "false");
      }
      if (panelCalc) panelCalc.hidden = !isCalc;
      if (panelStore) panelStore.hidden = isCalc;
      if (!isCalc) void renderRecordsList({ forceFetch: false });
    }

    function updatePlasterCalc() {
      const loadedModels = collectModelsWithGeometry();

      if (loadedModels.length > 0) {
        let sumMm3 = 0;
        for (const m of loadedModels) sumMm3 += computeVolumeMm3(m.geometry);
        plasterVolManual.value = Math.round(sumMm3);
      }

      const result = getPlasterCalcResult();

      if (!result) {
        document.getElementById("plaster-vol-display").textContent = "—";
        document.getElementById("plaster-vol-cc").textContent = "— cc";
        document.getElementById("p-plaster-actual").innerHTML = \`—<small class="p-unit"> g</small>\`;
        document.getElementById("p-water-actual").innerHTML   = \`—<small class="p-unit"> mL</small>\`;
        document.getElementById("p-plaster-rec").textContent  = "—";
        document.getElementById("p-water-rec").textContent    = "—";
        document.getElementById("plaster-breakdown").hidden = true;
        plasterMarginOut.textContent = "+" + plasterMargin.value + "%";
        updateSaveButtonState();
        return;
      }

      const margin = result.margin;
      const f = 1 + margin / 100;
      const totalVolMm3 = result.volMm3;
      const cc = result.volCc;
      const pRound = result.plasterActual;
      const wRound = result.waterActual;
      const pRec = result.plasterRec;
      const wRec = result.waterRec;

      document.getElementById("plaster-vol-display").textContent = formatNum(totalVolMm3, 1);
      document.getElementById("plaster-vol-cc").textContent      = formatNum(cc, 2) + " cc";

      document.getElementById("p-plaster-actual").innerHTML = \`\${pRound.toLocaleString()}<small class="p-unit"> g</small>\`;
      document.getElementById("p-water-actual").innerHTML   = \`\${wRound.toLocaleString()}<small class="p-unit"> mL</small>\`;
      document.getElementById("p-plaster-rec").textContent  = pRec.toLocaleString();
      document.getElementById("p-water-rec").textContent    = wRec % 1 === 0 ? wRec.toLocaleString() : wRec.toFixed(1);

      const breakdownEl = document.getElementById("plaster-breakdown");
      if (loadedModels.length > 1) {
        const rows = loadedModels.map((m, i) => {
          const vMm3 = computeVolumeMm3(m.geometry);
          const vCc  = vMm3 / 1000;
          const mp   = Math.round(vCc * PLASTER_K * f);
          const mw   = Math.round(vCc * WATER_K   * f);
          const mpR  = roundUp10(vCc * PLASTER_K * f);
          const mwR  = roundUp10(vCc * WATER_K   * f);
          const name = m.name.replace(/\\.stl$/i, "");
          return \`<div class="p-breakdown-row">
            <div class="p-breakdown-name" title="\${name}">뷰어 \${i+1} · \${name}</div>
            <div class="p-breakdown-vals">
              <span class="p-bv-item">석고 <strong>\${mp.toLocaleString()}</strong><em>g</em> <span class="p-bv-rec">(→\${mpR.toLocaleString()})</span></span>
              <span class="p-bv-sep">·</span>
              <span class="p-bv-item">물 <strong>\${mw.toLocaleString()}</strong><em>mL</em> <span class="p-bv-rec">(→\${mwR.toLocaleString()})</span></span>
            </div>
          </div>\`;
        }).join("");
        breakdownEl.innerHTML = \`<div class="p-breakdown-wrap"><div class="p-breakdown-title">뷰어별 개별값</div>\${rows}</div>\`;
        breakdownEl.hidden = false;
      } else {
        breakdownEl.hidden = true;
      }

      plasterMarginOut.textContent = "+" + margin + "%";
      updateSaveButtonState();
    }

    plasterMargin.addEventListener("input", () => {
      plasterMarginOut.textContent = "+" + plasterMargin.value + "%";
      updatePlasterCalc();
    });

    plasterVolManual.addEventListener("input", updatePlasterCalc);

    btnClearAll?.addEventListener("click", () => clearAllSlotsMeshes());

    document.getElementById("tab-btn-calc")?.addEventListener("click", () => switchTab("calc"));
    document.getElementById("tab-btn-store")?.addEventListener("click", () => switchTab("store"));

    document.getElementById("btn-save-record")?.addEventListener("click", openSaveModal);

    document.getElementById("modal-btn-primary")?.addEventListener("click", async () => {
      if (!(await confirmRecordCommit())) return;
      await commitRecordModal();
    });
    document.getElementById("modal-btn-cancel")?.addEventListener("click", closeRecordModal);
    document.addEventListener("keydown", e => {
      if (e.key !== "Escape") return;
      const confirmDlg = document.getElementById("record-commit-confirm");
      if (confirmDlg?.open) return;
      const modal = document.getElementById("record-modal");
      if (modal && !modal.hidden) closeRecordModal();
    });

    document.getElementById("records-list")?.addEventListener("click", e => {
      const editBtn = e.target.closest(".btn-record-edit");
      const delBtn = e.target.closest(".btn-record-delete");
      const card = e.target.closest(".record-card");
      if (!card) return;
      const id = Number(card.dataset.id);
      if (editBtn) {
        const rec = (recordsRemoteCache || []).find(x => x.id === id);
        if (rec) openEditModal(rec);
        return;
      }
      if (delBtn) {
        void (async () => {
          if (!confirm("이 기록을 삭제할까요?")) return;
          setRecordsLoading(true, "삭제 중…");
          try {
            await ensureRecordsLoaded(true);
            const next = (recordsRemoteCache || []).filter(x => x.id !== id);
            await workerPutRecords(next);
            await renderRecordsList({ forceFetch: false });
          } catch (err) {
            alert(\`삭제에 실패했습니다.\\n\${err?.message || err}\`);
          } finally {
            setRecordsLoading(false);
          }
        })();
      }
    });

    setupModalRatioSync();
    setupStandaloneRatioCalc();
    setupMainAddDrop();
    document.getElementById("records-search")?.addEventListener("input", () => void renderRecordsList({ forceFetch: false }));
    document.getElementById("records-sort")?.addEventListener("change", () => void renderRecordsList({ forceFetch: false }));
    void renderRecordsList({ forceFetch: true });

    function setupScrollTopFab() {
      const btn = document.getElementById("scroll-top-btn");
      const tabs = document.querySelector(".app-tabs");
      const modal = document.getElementById("record-modal");
      const appMain = document.getElementById("app-main");
      if (!btn || !tabs) return;

      const mq = window.matchMedia("(min-width: 768px)");

      function appMainVisible() {
        if (!appMain) return false;
        return window.getComputedStyle(appMain).display !== "none";
      }

      function tick() {
        if (!mq.matches || !appMainVisible()) {
          btn.classList.remove("scroll-top-btn--visible");
          btn.setAttribute("aria-hidden", "true");
          btn.tabIndex = -1;
          return;
        }
        if (modal && !modal.hidden) {
          btn.classList.remove("scroll-top-btn--visible");
          btn.setAttribute("aria-hidden", "true");
          btn.tabIndex = -1;
          return;
        }
        const rect = tabs.getBoundingClientRect();
        const pastTabs = rect.bottom < 8;
        const show = pastTabs;
        btn.classList.toggle("scroll-top-btn--visible", show);
        btn.setAttribute("aria-hidden", show ? "false" : "true");
        btn.tabIndex = show ? 0 : -1;
      }

      window.addEventListener("scroll", tick, { passive: true });
      window.addEventListener("resize", tick, { passive: true });
      mq.addEventListener("change", tick);
      if (modal) {
        const mo = new MutationObserver(tick);
        mo.observe(modal, { attributes: true, attributeFilter: ["hidden"] });
      }

      btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        btn.blur();
      });

      tick();
    }

    setupScrollTopFab();

    async function initViewerFromQuery() {
      const params = new URLSearchParams(window.location.search);
      const modelName = params.get("model");
      if (!modelName || !String(modelName).trim()) return;

      const slug = sanitizeModelParam(modelName);
      if (!slug) {
        document.documentElement.setAttribute("data-viewer", "error");
        return;
      }

      try {
        const url = buildRawStlUrl(slug);
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const buf = await res.arrayBuffer();
        if (!buf || buf.byteLength === 0) throw new Error("empty body");

        document.documentElement.setAttribute("data-viewer", "app");
        const slot = createViewerSlot();
        await loadSTLIntoSlotFromArrayBuffer(slot, buf, \`\${slug}.stl\`);
      } catch (e) {
        console.error(e);
        document.documentElement.setAttribute("data-viewer", "error");
      }
    }

    initViewerFromQuery();
  </script>
</body>
</html>
`;


/**
 * eoulrimstudio-records — Cloudflare Worker (단일 파일, import 없음)
 *
 * 라우트: GET / (계산기 HTML·인라인 CSS), GET/PUT /records, OPTIONS
 * 환경 변수:
 *   GITHUB_TOKEN
 *   GITHUB_USERNAME
 *   GITHUB_RECORDS_REPO
 */

const GITHUB_API = "https://api.github.com";
const DEFAULT_BRANCH = "main";

function corsHeaders(extra) {
  const base = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (extra && typeof extra === "object") Object.assign(base, extra);
  return base;
}

function jsonResponse(obj, status, extraHeaders) {
  status = status == null ? 200 : status;
  return new Response(JSON.stringify(obj), {
    status: status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(extraHeaders),
    },
  });
}

function gitContentsPath(relPath) {
  return relPath
    .split("/")
    .filter(Boolean)
    .map(function (s) {
      return encodeURIComponent(s);
    })
    .join("/");
}

function githubHeaders(token) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: "Bearer " + token,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "eoulrimstudio-records-worker",
  };
}

async function githubJson(method, url, token, bodyObj) {
  var opts = {
    method: method,
    headers: Object.assign({}, githubHeaders(token)),
  };
  if (bodyObj !== undefined) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(bodyObj);
  }

  var res = await fetch(url, opts);
  var text = await res.text();
  var data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = { message: text };
  }
  var err = new Error((data && data.message) || res.statusText || "HTTP " + res.status);
  err.status = res.status;
  err.data = data;
  if (!res.ok) throw err;
  return data;
}

function recordsUtf8ToBase64(str) {
  var bytes = new TextEncoder().encode(str);
  var bin = "";
  for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function requireRecordsEnv(env) {
  var token = env.GITHUB_TOKEN;
  var username = env.GITHUB_USERNAME;
  var repo = env.GITHUB_RECORDS_REPO;
  if (!token || !username || !repo) {
    var e = new Error("GITHUB_TOKEN, GITHUB_USERNAME, GITHUB_RECORDS_REPO 설정을 확인해 주세요.");
    e.status = 500;
    throw e;
  }
  return { token: token, username: username, repo: repo };
}

async function handleGetRecords(env) {
  try {
    var cred = requireRecordsEnv(env);
    var apiPath =
      GITHUB_API +
      "/repos/" +
      cred.username +
      "/" +
      cred.repo +
      "/contents/" +
      gitContentsPath("records.json") +
      "?ref=" +
      encodeURIComponent(DEFAULT_BRANCH);

    var data;
    try {
      data = await githubJson("GET", apiPath, cred.token);
    } catch (e) {
      if (e.status === 404) {
        var emptyBody = JSON.stringify({ records: [] });
        return new Response(emptyBody, {
          headers: Object.assign(
            { "Content-Type": "application/json; charset=utf-8" },
            corsHeaders()
          ),
        });
      }
      throw e;
    }

    if (!data.content || data.encoding !== "base64") {
      return jsonResponse({ success: false, error: "GitHub 응답 형식이 올바르지 않습니다." }, 502);
    }

    var binStr = atob(String(data.content).replace(/\s/g, ""));
    var u8 = new Uint8Array(binStr.length);
    for (var i = 0; i < binStr.length; i++) u8[i] = binStr.charCodeAt(i);
    var text = new TextDecoder("utf-8").decode(u8);
    var sha = typeof data.sha === "string" ? data.sha : "";

    var h = corsHeaders({
      "Access-Control-Expose-Headers": "X-GitHub-Content-Sha",
    });
    if (sha) h["X-GitHub-Content-Sha"] = sha;

    return new Response(text, {
      headers: Object.assign({ "Content-Type": "application/json; charset=utf-8" }, h),
    });
  } catch (e) {
    var msg = e.message || String(e);
    var st = e.status >= 400 && e.status < 600 ? e.status : 500;
    return jsonResponse({ success: false, error: msg }, st);
  }
}

async function handlePutRecords(request, env) {
  try {
    var cred = requireRecordsEnv(env);
    var body;
    try {
      body = await request.json();
    } catch (e2) {
      return jsonResponse({ success: false, error: "JSON 본문을 읽을 수 없습니다." }, 400);
    }

    if (!Array.isArray(body.records)) {
      return jsonResponse({ success: false, error: "records 배열이 필요합니다." }, 400);
    }

    var payload = JSON.stringify({ records: body.records }, null, 2);
    var content = recordsUtf8ToBase64(payload);
    var apiPath =
      GITHUB_API +
      "/repos/" +
      cred.username +
      "/" +
      cred.repo +
      "/contents/" +
      gitContentsPath("records.json");

    var putBody = {
      message: "Update records.json",
      content: content,
      branch: DEFAULT_BRANCH,
    };
    if (typeof body.sha === "string" && body.sha.length > 0) putBody.sha = body.sha;

    await githubJson("PUT", apiPath, cred.token, putBody);
    return jsonResponse({ success: true });
  } catch (e) {
    var msg = e.message || String(e);
    var st = 500;
    if (typeof e.status === "number" && e.status >= 400 && e.status < 600) st = e.status;
    return jsonResponse({ success: false, error: msg }, st);
  }
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    var url = new URL(request.url);
    var path = url.pathname;

    if (path === "/records" && request.method === "GET") {
      return handleGetRecords(env);
    }

    if (path === "/records" && request.method === "PUT") {
      return handlePutRecords(request, env);
    }

    if ((path === "/" || path === "/index.html") && request.method === "GET") {
      return new Response(INDEX_HTML, {
        headers: Object.assign(
          { "Content-Type": "text/html; charset=utf-8" },
          corsHeaders()
        ),
      });
    }

    return jsonResponse({ success: false, error: "Not Found" }, 404);
  },
};
