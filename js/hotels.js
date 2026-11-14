/* ===== HOTELS: last-minute deals board, spotlight and wish builder ===== */
const hotelAreas = [
  { id: 'hurghada', code: 'HRG', name: 'Hurghada' },
  { id: 'makadi', code: 'MKD', name: 'Makadi Bay' },
  { id: 'sahl-hasheesh', code: 'SHL', name: 'Sahl Hasheesh' },
  { id: 'el-gouna', code: 'GOU', name: 'El Gouna' },
  { id: 'soma-bay', code: 'SOM', name: 'Soma Bay' },
];
const hotelBoards = ['AI', 'UAI', 'HB', 'BB'];
const FLAP_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

let hotelArea = 'all';
let spotlightDealId = null;
let hotelTimer = null;
const hotelWish = { area: null, checkIn: '', nights: 7, adults: 2, children: 0, stars: null, board: null };

function hotelDeals() {
  const deals = (window.SITE_HOTELS && Array.isArray(window.SITE_HOTELS.deals)) ? window.SITE_HOTELS.deals : [];
  const now = Date.now();
  return deals
    .filter(d => new Date(d.validUntil).getTime() > now)
    .sort((a, b) => a.checkIn.localeCompare(b.checkIn));
}

function visibleHotelDeals() {
  const deals = hotelDeals();
  return hotelArea === 'all' ? deals : deals.filter(d => d.area === hotelArea);
}

function hotelAreaOf(id) { return hotelAreas.find(a => a.id === id) || { code: '---', name: id }; }
function dealDiscount(d) { return Math.round((1 - d.price / d.oldPrice) * 100); }
function hotelLocale() { return currentLang === 'de' ? 'de-DE' : 'en-GB'; }

function formatCheckIn(date, opts) {
  return new Intl.DateTimeFormat(hotelLocale(), opts).format(new Date(`${date}T12:00:00`));
}

function starsHtml(n) {
  return `<span class="hotel-stars" aria-label="${n}★">${'★'.repeat(n)}</span>`;
}

function flapHtml(text) {
  return `<span class="flap-cells">${[...String(text)].map(c => c === ' '
    ? '<span class="flap flap-gap"></span>'
    : `<span class="flap" data-c="${escapeHtml(c)}">${escapeHtml(c)}</span>`).join('')}</span>`;
}

function animateFlaps(root) {
  if (prefersReducedMotion) return;
  root.querySelectorAll('.flap[data-c]').forEach((cell, i) => {
    const final = cell.dataset.c;
    let turns = 5 + (i % 7);
    const tick = () => {
      if (turns-- <= 0) { cell.textContent = final; cell.classList.remove('spin'); return; }
      cell.textContent = FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)];
      cell.classList.remove('spin');
      void cell.offsetWidth;
      cell.classList.add('spin');
      setTimeout(tick, 55);
    };
    setTimeout(tick, i * 14);
  });
}

/* ----- Area tabs ----- */
function renderHotelTabs() {
  const tabs = [{ id: 'all', name: t().hotels.allAreas }, ...hotelAreas];
  const counts = hotelDeals().reduce((acc, d) => ({ ...acc, [d.area]: (acc[d.area] || 0) + 1 }), {});
  document.getElementById('hotelTabs').innerHTML = tabs.map(tab => {
    const count = tab.id === 'all' ? hotelDeals().length : (counts[tab.id] || 0);
    return `<button type="button" class="hotel-tab ${hotelArea === tab.id ? 'active' : ''}" onclick="setHotelArea('${tab.id}')" ${count ? '' : 'disabled'}>${tab.name}<span>${count}</span></button>`;
  }).join('');
}

function setHotelArea(area) {
  hotelArea = area;
  const deals = visibleHotelDeals();
  if (!deals.some(d => d.id === spotlightDealId)) spotlightDealId = null;
  renderHotelTabs();
  renderHotelBoard(true);
  renderHotelSpotlight();
}

/* ----- Ticker ----- */
function renderHotelTicker() {
  const deals = hotelDeals();
  const track = document.getElementById('hotelTicker');
  if (!deals.length) { track.parentElement.style.display = 'none'; return; }
  track.parentElement.style.display = '';
  const h = t().hotels;
  const items = deals.map(d => `<span class="ticker-item"><b>${hotelAreaOf(d.area).name}</b> −${dealDiscount(d)}% · ${d.nights} ${h.nights} ${d.board} · ${h.from} ${d.price} €</span>`).join('<span class="ticker-sep">✦</span>');
  track.innerHTML = `<div class="ticker-run">${items}<span class="ticker-sep">✦</span></div><div class="ticker-run" aria-hidden="true">${items}<span class="ticker-sep">✦</span></div>`;
}

/* ----- Departure board ----- */
function renderHotelBoard(animate) {
  const body = document.getElementById('hotelBoardRows');
  const deals = visibleHotelDeals();
  const h = t().hotels;
  const activeId = (spotlightDeal() || {}).id;

  if (!deals.length) {
    body.innerHTML = `<div class="board-empty">${flapHtml(h.emptyFlap)}<p>${h.empty}</p></div>`;
    if (animate) animateFlaps(body);
    return;
  }

  body.innerHTML = deals.map(d => {
    const area = hotelAreaOf(d.area);
    const day = d.checkIn.slice(8, 10);
    const month = formatCheckIn(d.checkIn, { month: 'short' }).replace('.', '').slice(0, 3).toUpperCase();
    const date = `${day} ${month}`;
    const hot = d.roomsLeft <= 3;
    return `
      <button type="button" class="board-row ${d.id === activeId ? 'active' : ''}" onclick="showHotelDeal('${d.id}')">
        <span class="board-cell board-dest">${flapHtml(area.code)}</span>
        <span class="board-cell board-hotel">
          <strong>${escapeHtml(getByLang(d.name))}</strong>
          <small>${area.name} · ${starsHtml(d.stars)}</small>
        </span>
        <span class="board-cell board-date">${flapHtml(date)}</span>
        <span class="board-cell board-nights">${flapHtml(String(d.nights).padStart(2, '0'))}</span>
        <span class="board-cell board-board">${flapHtml(d.board.padEnd(3, ' '))}</span>
        <span class="board-cell board-price">${flapHtml(`${d.price}€`)}</span>
        <span class="board-status ${hot ? 'hot' : ''}">${hot ? h.lastRooms : `−${dealDiscount(d)}%`}</span>
      </button>`;
  }).join('');

  if (animate) animateFlaps(body);
}

/* ----- Spotlight ----- */
function spotlightDeal() {
  const deals = visibleHotelDeals();
  if (!deals.length) return null;
  return deals.find(d => d.id === spotlightDealId)
    || deals.reduce((best, d) => (dealDiscount(d) > dealDiscount(best) ? d : best), deals[0]);
}

function showHotelDeal(id) {
  spotlightDealId = id;
  renderHotelBoard(false);
  renderHotelSpotlight(true);
  if (window.innerWidth < 1024) document.getElementById('dealSpotlight').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderHotelSpotlight(flip) {
  const el = document.getElementById('dealSpotlight');
  const d = spotlightDeal();
  const h = t().hotels;
  if (!d) {
    el.innerHTML = `
      <div class="spotlight-empty">
        <div class="spotlight-empty-icon">${hotelIcon()}</div>
        <h3>${h.emptyTitle}</h3>
        <p>${h.empty}</p>
        <button class="btn-gold" onclick="scrollToHotelWish()">${h.wishCta}</button>
      </div>`;
    return;
  }
  const area = hotelAreaOf(d.area);
  const perks = (d.perks && d.perks[currentLang]) || [];
  const roomsPct = Math.max(8, Math.min(100, d.roomsLeft * 10));
  const roomsText = d.roomsLeft === 1 ? h.roomsLeftOne : h.roomsLeft.replace('{n}', d.roomsLeft);
  const nightsLabel = d.nights === 1 ? h.night : h.nights;

  el.innerHTML = `
    <div class="spotlight-media">
      <img src="${escapeHtml(d.image)}" alt="${escapeHtml(getByLang(d.name))}" />
      <span class="spotlight-kicker">${h.spotlight}</span>
      <span class="spotlight-stamp"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="stampPath" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs><text><textPath href="#stampPath">LAST MINUTE ✦ LAST MINUTE ✦</textPath></text></svg><b>−${dealDiscount(d)}%</b></span>
    </div>
    <div class="spotlight-body">
      <div class="spotlight-meta">${starsHtml(d.stars)}<span>${area.name}</span><span class="spotlight-code">${area.code}</span></div>
      <h3 class="spotlight-title">${escapeHtml(getByLang(d.name))}</h3>
      <div class="spotlight-perks">${perks.map(p => `<span>${escapeHtml(p)}</span>`).join('')}</div>
      <div class="spotlight-facts">
        <div><small>${h.checkIn}</small><strong>${formatCheckIn(d.checkIn, { weekday: 'short', day: 'numeric', month: 'short' })}</strong></div>
        <div><small>${h.stay}</small><strong>${d.nights} ${nightsLabel}</strong></div>
        <div><small>${h.boardLabel}</small><strong>${h.boards[d.board] || d.board}</strong></div>
      </div>
      <div class="spotlight-countdown">
        <small>${h.endsIn}</small>
        <div class="countdown" data-until="${escapeHtml(d.validUntil)}">
          ${['days', 'hours', 'minutes', 'seconds'].map(u => `<div class="countdown-seg"><span data-unit="${u}">--</span><small>${h.units[u]}</small></div>`).join('')}
        </div>
      </div>
      <div class="spotlight-rooms ${d.roomsLeft <= 3 ? 'hot' : ''}">
        <div class="rooms-bar"><span style="width:${roomsPct}%"></span></div>
        <small>${roomsText}</small>
      </div>
      <div class="spotlight-foot">
        <div class="spotlight-price">
          <s>${d.oldPrice} €</s>
          <strong>${d.price} €</strong>
          <small>${h.perPerson} · ${d.nights} ${nightsLabel} · ${h.save} ${d.oldPrice - d.price} €</small>
        </div>
        <button class="btn-gold spotlight-cta" onclick="sendWhatsAppHotelDeal('${d.id}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          ${h.book}
        </button>
      </div>
    </div>`;

  if (flip) {
    el.classList.remove('flip-in');
    void el.offsetWidth;
    el.classList.add('flip-in');
  }
  updateHotelCountdowns();
}

function hotelIcon() {
  return '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-4h6v4"/><path d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01"/></svg>';
}

/* ----- Timers: countdown + board clock ----- */
function updateHotelCountdowns() {
  const now = Date.now();
  let expired = false;
  document.querySelectorAll('.countdown[data-until]').forEach(cd => {
    const left = new Date(cd.dataset.until).getTime() - now;
    if (left <= 0) { expired = true; return; }
    const parts = {
      days: Math.floor(left / 86400000),
      hours: Math.floor(left / 3600000) % 24,
      minutes: Math.floor(left / 60000) % 60,
      seconds: Math.floor(left / 1000) % 60,
    };
    Object.entries(parts).forEach(([unit, value]) => {
      const span = cd.querySelector(`[data-unit="${unit}"]`);
      const text = String(value).padStart(2, '0');
      if (span && span.textContent !== text) {
        span.textContent = text;
        span.classList.remove('tick');
        void span.offsetWidth;
        span.classList.add('tick');
      }
    });
  });

  const clock = document.getElementById('hotelBoardClock');
  if (clock) {
    clock.textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(now));
  }
  if (expired) renderHotels();
}

/* ----- Wish builder ----- */
function renderHotelWish() {
  const h = t().hotels;
  const chips = (key, options) => options.map(o =>
    `<button type="button" class="wish-chip ${hotelWish[key] === o.value ? 'active' : ''}" onclick="setHotelWish('${key}', ${o.value === null ? 'null' : `'${o.value}'`})">${o.label}</button>`
  ).join('');
  const stepper = (key, min, max) => `
    <div class="wish-stepper">
      <button type="button" onclick="stepHotelWish('${key}', -1, ${min}, ${max})" aria-label="−">−</button>
      <output>${hotelWish[key]}</output>
      <button type="button" onclick="stepHotelWish('${key}', 1, ${min}, ${max})" aria-label="+">+</button>
    </div>`;
  const today = new Date().toISOString().slice(0, 10);

  document.getElementById('hotelWishForm').innerHTML = `
    <div class="wish-field wish-wide">
      <label>${h.wishArea}</label>
      <div class="wish-chips">${chips('area', [{ value: null, label: h.wishAny }, ...hotelAreas.map(a => ({ value: a.id, label: a.name }))])}</div>
    </div>
    <div class="wish-field">
      <label for="wishCheckIn">${h.checkIn}</label>
      <input type="date" id="wishCheckIn" min="${today}" value="${hotelWish.checkIn}" onchange="hotelWish.checkIn = this.value; renderHotelWishSummary()" />
    </div>
    <div class="wish-field"><label>${h.wishNights}</label>${stepper('nights', 1, 28)}</div>
    <div class="wish-field"><label>${h.wishAdults}</label>${stepper('adults', 1, 10)}</div>
    <div class="wish-field"><label>${h.wishChildren}</label>${stepper('children', 0, 8)}</div>
    <div class="wish-field">
      <label>${h.wishStars}</label>
      <div class="wish-chips">${chips('stars', [{ value: null, label: h.wishAny }, { value: '3', label: '3★' }, { value: '4', label: '4★' }, { value: '5', label: '5★' }])}</div>
    </div>
    <div class="wish-field">
      <label>${h.boardLabel}</label>
      <div class="wish-chips">${chips('board', [{ value: null, label: h.wishAny }, ...hotelBoards.map(b => ({ value: b, label: b }))])}</div>
    </div>`;
  renderHotelWishSummary();
}

function setHotelWish(key, value) {
  hotelWish[key] = hotelWish[key] === value ? null : value;
  renderHotelWish();
}

function stepHotelWish(key, delta, min, max) {
  hotelWish[key] = Math.min(max, Math.max(min, hotelWish[key] + delta));
  renderHotelWish();
}

function hotelWishLines() {
  const h = t().hotels;
  const any = h.wishFlexible;
  return [
    [h.wishArea, hotelWish.area ? hotelAreaOf(hotelWish.area).name : any],
    [h.checkIn, hotelWish.checkIn ? formatCheckIn(hotelWish.checkIn, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }) : any],
    [h.wishNights, String(hotelWish.nights)],
    [h.wishGuests, [
      `${hotelWish.adults} ${hotelWish.adults === 1 ? h.wishAdult : h.wishAdultsCount}`,
      hotelWish.children ? `${hotelWish.children} ${hotelWish.children === 1 ? h.wishChild : h.wishChildrenCount}` : '',
    ].filter(Boolean).join(', ')],
    [h.wishStars, hotelWish.stars ? `${hotelWish.stars}★` : any],
    [h.boardLabel, hotelWish.board ? h.boards[hotelWish.board] : any],
  ];
}

function renderHotelWishSummary() {
  document.getElementById('hotelWishSummary').innerHTML = hotelWishLines()
    .map(([label, value]) => `<div class="wish-line"><small>${label}</small><span></span><strong>${escapeHtml(value)}</strong></div>`).join('');
}

function scrollToHotelWish() {
  document.getElementById('hotelWish').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ----- WhatsApp ----- */
function sendWhatsAppHotelDeal(id) {
  const d = hotelDeals().find(x => x.id === id);
  if (!d) return;
  const h = t().hotels;
  const lines = [
    h.whatsappDeal,
    `${getByLang(d.name)} (${d.stars}★, ${hotelAreaOf(d.area).name})`,
    `${h.checkIn}: ${formatCheckIn(d.checkIn, { day: 'numeric', month: 'long', year: 'numeric' })} · ${d.nights} ${h.nights} · ${h.boards[d.board] || d.board}`,
    `${d.price} € ${h.perPerson}`,
  ];
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
}

function sendWhatsAppHotelWish() {
  const lines = [t().hotels.whatsappWish, ...hotelWishLines().map(([label, value]) => `${label}: ${value}`)];
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
}

/* ----- Entry point (called from renderAll) ----- */
function renderHotels() {
  renderHotelTabs();
  renderHotelTicker();
  renderHotelBoard(true);
  renderHotelSpotlight();
  renderHotelWish();
  document.getElementById('hotelFeatures').innerHTML = t().hotels.features
    .map(f => `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>${f}</li>`).join('');
  if (!hotelTimer) hotelTimer = setInterval(updateHotelCountdowns, 1000);
}
