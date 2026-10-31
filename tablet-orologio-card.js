// tablet-orologio-card: full-screen clock / screensaver card for wall tablets (Fully Kiosk), portrait or landscape.
// Days One font, big yellow time, date, weather icon, indoor/outdoor temperature, optional guest Wi-Fi QR.
// Sizes use container queries (cqw/cqh/cqmin). Option `orientation`: auto | vertical | horizontal.
const VERSION = '1.0.0';

const DEFAULTS = {
  time: 'sensor.time',
  weekday: '',
  date: '',
  temp_out: '',
  temp_in: '',
  weather: '',
  background: '',
  thermometer: '',
  wifi_image: '',
  wifi_label: '',
  weather_icons: '/local/weather_icons/',
  dim: 0.85,          // luminosita' complessiva (1 = come l'originale)
  shift_px: 14,       // ampiezza spostamento anti burn-in
  shift_minutes: 4,   // ogni quanti minuti sposta
  google_font: true,  // carica 'Days One' da Google Fonts se non e' gia' presente (false = nessuna richiesta esterna)
  fullscreen: true,   // copre intestazione e barra laterale di HA
  orientation: 'auto', // 'auto' (come prima: segue lo schermo) | 'vertical' | 'horizontal'
};

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
// giorno e data di ripiego (se non configuri le entita'): lingua di Home Assistant, altrimenti quella del browser
const cap = t => t.charAt(0).toUpperCase() + t.slice(1);
const lang = h => h?.locale?.language || h?.language || navigator.language || 'en';
const fmtWeekday = (d, h) => cap(d.toLocaleDateString(lang(h), { weekday: 'long' }));
const fmtDate = (d, h) => d.toLocaleDateString(lang(h), { day: 'numeric', month: 'long', year: 'numeric' });

const CSS = `
:host { display: block; }
.root { position: fixed; inset: 0; z-index: 9; background: #000 center / cover no-repeat; overflow: hidden;
  container-type: size; font-family: 'Days One', 'Segoe UI', sans-serif; color: #fff; }
.root:not(.fs) { position: relative; inset: auto; width: 100%; height: 100vh; z-index: 0; }
.shift { position: absolute; inset: 0; display: grid; transition: transform 6s ease-in-out; will-change: transform;
  grid-template-rows: 1fr auto auto 1.5fr; grid-template-columns: 1fr 1fr; padding: 5cqh 6cqw 5cqh;
  grid-template-areas: "wx wx" "day day" "clock clock" "wifi room"; row-gap: 1cqh; }
.dim { position: absolute; inset: 0; pointer-events: none; }
.wx { grid-area: wx; display: flex; align-items: center; justify-content: center; gap: 4cqw; min-height: 0; }
.wx img { height: min(28cqh, 56cqw); width: auto; aspect-ratio: 1; filter: drop-shadow(0 0 3cqmin rgba(0,0,0,.6)); }
.out { font-size: min(14cqw, 6.5cqh); text-shadow: 0 0 40px #000; }
.day { grid-area: day; text-align: center; display: flex; flex-direction: column; gap: 1cqh; }
.wd { font-size: min(16cqw, 7.5cqh); opacity: .7; text-shadow: 6px 6px 6px #000; line-height: 1.1; }
.dt { white-space: nowrap; font-size: min(8cqw, 5.5cqh); opacity: .9; text-shadow: 6px 6px 6px #000; line-height: 1.2; }
.clock { grid-area: clock; display: flex; align-items: center; justify-content: center; color: #ffff00;
  font-size: 20cqw; text-shadow: 6px 6px 6px #000; white-space: nowrap; line-height: 1; margin-top: 4.5cqh; }
.wifi { grid-area: wifi; align-self: start; margin-top: 13cqh; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: .8cqh; min-height: 0; }
.wifi img { width: min(23cqw, 10cqh); border-radius: 1.2cqmin; filter: brightness(60%); }
.wifi span { color: grey; font-weight: bold; font-size: max(13px, 2.6cqmin); text-shadow: 1px 1px 3px #000; }
.room { grid-area: room; align-self: start; margin-top: 13cqh; height: min(23cqw, 10cqh); display: flex; align-items: center; justify-content: center; gap: 1cqw; opacity: .95; }
.room .v { font-size: min(12cqw, 5.8cqh); text-shadow: 0 0 40px #000; }
.room img { height: min(18cqw, 10cqh); width: auto; }
.na { opacity: .4; }
/* orizzontale: orologio a sinistra, il resto a destra */
@container (min-aspect-ratio: 5/4) {
  .o-auto .shift { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); grid-template-rows: auto auto 1fr auto; padding: 4cqh 4cqw;
    grid-template-areas: "clock wx" "clock day" "clock room" "clock wifi"; column-gap: 3cqw; }
  .o-auto .wx img { height: min(24cqh, 14cqw); } .o-auto .out { font-size: min(4.5cqw, 8cqh); }
  .o-auto .wd { font-size: min(4.2cqw, 8cqh); } .o-auto .dt { font-size: min(2.7cqw, 6cqh); }
  .o-auto .room .v { font-size: min(4.5cqw, 8cqh); } .o-auto .room img { height: min(6cqw, 12cqh); }
  .o-auto .wifi img { width: min(14cqw, 22cqh); }
}
/* orientation: horizontal. Giorno e data in alto a sinistra, temperature in alto a destra, ora grande a tutta larghezza sotto */
.o-h .shift { grid-template-columns: minmax(0, 1fr) auto; grid-template-rows: auto auto auto; align-content: center; padding: 4cqh 4cqw; column-gap: 3cqw; row-gap: 0;
  grid-template-areas: "day wx" "day room" "clock clock"; }
.o-h .day { align-items: flex-start; text-align: left; gap: 0; }
.o-h .wd { font-size: min(9cqw, 17cqh); } .o-h .dt { font-size: min(4.4cqw, 8.5cqh); }
.o-h .wx { justify-content: flex-end; gap: 1.5cqw; } .o-h .wx img { height: min(7cqw, 12cqh); } .o-h .out { font-size: min(2.8cqw, 5.5cqh); }
.o-h .room { margin-top: 0; height: auto; justify-content: flex-end; align-self: center; gap: .6cqw; }
.o-h .room .v { font-size: min(2.8cqw, 5.5cqh); } .o-h .room img { height: min(4cqw, 8cqh); }
.o-h .clock { margin-top: 0; align-self: start; line-height: .85; }
.o-h .wifi { position: absolute; right: 4cqw; bottom: 4cqh; margin-top: 0; }
.o-h .wifi img { width: min(9cqw, 14cqh); }`;

class TabletOrologioCard extends HTMLElement {
  setConfig(config) {
    this._cfg = { ...DEFAULTS, ...(config || {}) };
    this._built = false;
  }
  getCardSize() { return 20; }
  static getStubConfig() { return {}; }

  connectedCallback() {
    this._tick = setInterval(() => this._update(), 1000);
    this._shiftT = setInterval(() => this._shift(), Math.max(1, this._cfg?.shift_minutes || 4) * 60000);
  }
  disconnectedCallback() { clearInterval(this._tick); clearInterval(this._shiftT); }

  set hass(h) {
    this._hass = h;
    if (!this._built) this._build();
    this._update();
  }

  _build() {
    const c = this._cfg;
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    if (c.google_font !== false && !document.getElementById('tablet-orologio-days-one')) {
      const l = document.createElement('link');
      l.id = 'tablet-orologio-days-one'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Days+One&display=swap';
      document.head.appendChild(l);
    }
    this.shadowRoot.innerHTML = `<style>${CSS}</style>
      <div class="root ${c.fullscreen ? 'fs' : ''} ${c.orientation === 'horizontal' ? 'o-h' : c.orientation === 'vertical' ? 'o-v' : 'o-auto'}" style="${c.background ? `background-image:url('${esc(c.background)}')` : 'background:#000'}">
        <div class="shift">
          <div class="wx"><img id="wi" alt=""><div class="out" id="out"></div></div>
          <div class="day"><div class="wd" id="wd"></div><div class="dt" id="dt"></div></div>
          <div class="clock" id="clock"></div>
          <div class="wifi">${c.wifi_image ? `<img src="${esc(c.wifi_image)}" alt="">` : ''}<span>${esc(c.wifi_label)}</span></div>
          <div class="room"><div class="v" id="in"></div>${c.thermometer ? `<img src="${esc(c.thermometer)}" alt="">` : ''}</div>
        </div>
        <div class="dim" style="background:rgba(0,0,0,${Math.max(0, 1 - c.dim).toFixed(2)})"></div>
      </div>`;
    const q = id => this.shadowRoot.getElementById(id);
    this._el = { wi: q('wi'), out: q('out'), wd: q('wd'), dt: q('dt'), clock: q('clock'), inn: q('in'), shift: this.shadowRoot.querySelector('.shift') };
    this._last = {};
    this._built = true;
    this._fit = null;
    const refit = () => { this._fit = null; this._fitClock(); };
    try { new ResizeObserver(refit).observe(this.shadowRoot.querySelector('.root')); } catch (e) { /* senza ResizeObserver resta il ricalcolo periodico */ }
    window.addEventListener('orientationchange', refit);
    if (document.fonts) {
      document.fonts.load("100px 'Days One'", '0123456789:').then(refit).catch(() => {});
      document.fonts.ready.then(refit);
      document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', refit);
    }
  }

  // larghezza (per font-size 1px) della stringa d'ora piu' larga tra 00:00 e 23:59
  _widest() {
    if (!this._cv) this._cv = document.createElement('canvas').getContext('2d');
    const ctx = this._cv; ctx.font = "1000px 'Days One', 'Segoe UI', sans-serif";
    let m = 0;
    for (let h = 0; h < 24; h++) for (let n = 0; n < 60; n++) m = Math.max(m, ctx.measureText(`${pad(h)}:${pad(n)}`).width);
    return m / 1000;
  }

  _measure(txt) {
    if (!this._cv) this._cv = document.createElement('canvas').getContext('2d');
    const ctx = this._cv; ctx.font = "1000px 'Days One', 'Segoe UI', sans-serif";
    return ctx.measureText(txt).width / 1000;
  }

  _fitClock() {
    if (!this._built) return;
    const root = this.shadowRoot.querySelector('.root'), el = this._el.clock;
    const W = root.clientWidth, H = root.clientHeight;
    if (!W || !H) return;
    const horiz = this._cfg.orientation === 'horizontal';
    const land = horiz || W / H >= 1.25;
    // la misura dipende dal font: se Days One non e' ancora caricato canvas usa un ripiego, quindi si rimisura ogni 20 s e a ogni evento font
    const t = Date.now();
    // misura l'ora mostrata (non la piu' larga): riempie sempre la larghezza, la grandezza cambia un poco con le cifre
    const txt = (el.textContent || '').trim() || '00:00';
    if (!this._wv || this._wtxt !== txt || t - this._wt > 20000 || this._fit === null) { this._wv = this._measure(txt); this._wtxt = txt; this._wt = t; }
    const avail = (land ? el.clientWidth * 0.98 : W * 0.96) - 2 * this._cfg.shift_px;
    let fs = avail / this._wv;
    if (horiz) { // in orizzontale ora e blocco giorno/data riempiono l'altezza: l'ora non esce dallo schermo
      const dayH = this.shadowRoot.querySelector('.day').offsetHeight;
      fs = Math.min(fs, (H * 0.92 - dayH) / 0.85);
    }
    const px = `${Math.floor(fs * 10) / 10}px`;
    if (el.style.fontSize !== px) el.style.fontSize = px;
    this._fit = W + 'x' + H;
  }

  _set(k, el, v, prop = 'textContent') {
    if (this._last[k] !== v) { this._last[k] = v; el[prop] = v; }
  }

  _temp(id) {
    const s = this._hass?.states[id];
    const v = parseFloat(s?.state);
    return isNaN(v) ? null : `${v.toFixed(1).replace('.', ',')}°`;
  }

  _update() {
    if (!this._built || !this._hass) return;
    const c = this._cfg, st = this._hass.states, now = new Date(), e = this._el;
    const ok = id => st[id] && !['unavailable', 'unknown'].includes(st[id].state);
    let tt = null; try { tt = new URLSearchParams(location.search).get('orologio_test'); } catch (x) { /* nessun parametro */ }
    this._set('clock', e.clock, tt || (ok(c.time) ? st[c.time].state : `${pad(now.getHours())}:${pad(now.getMinutes())}`));
    this._fitClock();
    this._set('wd', e.wd, ok(c.weekday) ? st[c.weekday].state : fmtWeekday(now, this._hass));
    this._set('dt', e.dt, ok(c.date) ? st[c.date].state : fmtDate(now, this._hass));
    const to = this._temp(c.temp_out), ti = this._temp(c.temp_in);
    this._set('out', e.out, to ?? '--');
    this._set('in', e.inn, ti ?? '--');
    const w = ok(c.weather) ? st[c.weather].state : null;
    this._set('wi', e.wi, w ? `${c.weather_icons}${w}.svg` : '', 'src');
    e.wi.style.display = w ? '' : 'none';
  }

  _shift() {
    const a = this._cfg.shift_px;
    const r = () => Math.round((Math.random() * 2 - 1) * a);
    if (this._el) this._el.shift.style.transform = `translate(${r()}px, ${r()}px)`;
  }
}
if (!customElements.get('tablet-orologio-card')) customElements.define('tablet-orologio-card', TabletOrologioCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: 'tablet-orologio-card', name: 'Tablet orologio', description: `Salvaschermo tablet ${VERSION}` });
