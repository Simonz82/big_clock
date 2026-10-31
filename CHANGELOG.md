# Changelog

## 1.0.0
- New JS card `tablet-orologio-card`: full-screen clock for wall tablets, installable with HACS.
- `orientation: auto | vertical | horizontal` (default `auto`).
- Anti burn-in shift, dimming, weather icon, outdoor/indoor temperature, optional guest Wi-Fi QR.
- Weekday and date fall back to the Home Assistant language; Days One loaded from Google Fonts (`google_font`).
- `background_horizontal` / `background_horizontal_opacity`: dotted world map as default background in horizontal mode (`assets/world-dots.svg`), `none` to disable. Vertical and `auto` unchanged.
- Demo QR image in the screenshots (opens this repository).
- The original YAML card moved to `classic/` (unchanged).
