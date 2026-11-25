# Changelog

## 1.0.1
- Fix: the card no longer covers the whole screen in the card picker, the card preview, the card editor dialog or dashboard edit mode (it stays inside its box there, so you can configure and save it). Detection: `editMode`, `preview`, and ancestors such as `hui-card-preview`, `hui-card-picker`, `hui-dialog-edit-card`, `ha-dialog`.
- Full screen can always be closed: press `Esc` or tap the screen (`tap_to_exit: false` disables the tap).
- Empty or missing configuration and errors while building the card are handled safely; `getStubConfig` returns `{ fullscreen: true }`.

## 1.0.0
- New JS card `tablet-orologio-card`: full-screen clock for wall tablets, installable with HACS.
- `orientation: auto | vertical | horizontal` (default `auto`).
- Anti burn-in shift, dimming, weather icon, outdoor/indoor temperature, optional guest Wi-Fi QR.
- Weekday and date fall back to the Home Assistant language; Days One loaded from Google Fonts (`google_font`).
- `background_horizontal` / `background_horizontal_opacity`: dotted world map as default background in horizontal mode (`assets/world-dots.svg`), `none` to disable. Vertical and `auto` unchanged.
- Demo QR image in the screenshots (opens this repository).
- The original YAML card moved to `classic/` (unchanged).
