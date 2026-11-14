/* ===== STATE ===== */
let currentLang = localStorage.getItem('lang') || 'de';
let activeCategory = 'all';
let searchTerm = '';
let visibleCount = 6;
let currentHeroSlide = 0;
let heroInterval = null;

/* ===== HELPERS ===== */
function t() { return translations[currentLang]; }

function getByLang(obj) { return obj[currentLang] || obj.de; }

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  closeMobileMenu();
}

/* ===== LANGUAGE ===== */
const langFlags = {
  de: '<svg viewBox="0 0 5 3" preserveAspectRatio="none" aria-hidden="true"><rect width="5" height="1" fill="#000"/><rect y="1" width="5" height="1" fill="#DD0000"/><rect y="2" width="5" height="1" fill="#FFCE00"/></svg>',
  en: '<svg viewBox="0 0 60 30" preserveAspectRatio="none" aria-hidden="true"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="2"/><path d="M30,0 v30 M0,15 h60" stroke="#FFF" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></svg>',
};

function renderLangSwitcher() {
  const flag = document.getElementById('langFlag');
  flag.dataset.flag = currentLang;
  document.getElementById('langLabel').textContent = currentLang.toUpperCase();
  document.querySelectorAll('.lang-flag[data-flag]').forEach(el => { el.innerHTML = langFlags[el.dataset.flag] || ''; });
  document.querySelectorAll('.lang-menu button[data-lang]').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLang));
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  renderLangSwitcher();
  toggleLangMenu();
  renderAll();
}

function toggleLangMenu() {
  const menu = document.getElementById('langMenu');
  const btn = document.getElementById('langBtn');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const switcher = document.querySelector('.lang-switcher');
  if (switcher && !switcher.contains(e.target)) {
    document.getElementById('langMenu').classList.remove('open');
    document.getElementById('langBtn').classList.remove('open');
  }
});

/* ===== HEADER SCROLL ===== */
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

/* ===== MOBILE MENU ===== */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const icon = document.getElementById('menuIcon');
  menu.classList.toggle('open');
  if (menu.classList.contains('open')) {
    icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18/>';
  } else {
    icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18/>';
  }
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu.classList.contains('open')) {
    menu.classList.remove('open');
    document.getElementById('menuIcon').innerHTML = '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18/>';
  }
}

/* ===== HERO SLIDER ===== */
function renderHero() {
  const slides = document.getElementById('heroSlides');
  const indicators = document.getElementById('heroIndicators');
  slides.innerHTML = '';
  indicators.innerHTML = '';

  heroImages.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    if (idx === 0) img.classList.add('active');
    slides.appendChild(img);

    const btn = document.createElement('button');
    if (idx === 0) btn.classList.add('active');
    btn.onclick = () => setHeroSlide(idx);
    indicators.appendChild(btn);
  });

  heroInterval = setInterval(() => {
    setHeroSlide((currentHeroSlide + 1) % heroImages.length);
  }, 6000);
}

function setHeroSlide(idx) {
  currentHeroSlide = idx;
  const imgs = document.querySelectorAll('#heroSlides img');
  const btns = document.querySelectorAll('#heroIndicators button');
  imgs.forEach((img, i) => img.classList.toggle('active', i === idx));
  btns.forEach((btn, i) => btn.classList.toggle('active', i === idx));
}

/* ===== OFFER SLIDER ===== */
const OFFER_MS = 5200;
let offers = [];
let offerIndex = 0;
let offerTimer = null;
let offerResizeBound = false;
let offerPointerX = null;

function offerText(value) {
  if (value && typeof value === 'object') return getByLang(value);
  return value || '';
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[ch]));
}

function applyOfferData(data) {
  offers = Array.isArray(data && data.offers) ? data.offers.filter(offer => offer && offer.name) : [];
  if (offerIndex >= offers.length) offerIndex = 0;
}

function loadOffers() {
  applyOfferData(window.SITE_OFFERS);
}

function renderOffers() {
  const root = document.getElementById('offerSlider');
  const track = document.getElementById('offerTrack');
  const dots = document.getElementById('offerDots');
  if (!root || !track || !dots) return;
  if (!offers.length) {
    root.hidden = true;
    clearInterval(offerTimer);
    return;
  }
  root.hidden = false;
  root.style.setProperty('--offer-ms', `${OFFER_MS}ms`);
  document.getElementById('offerPrev').setAttribute('aria-label', t().hero.offerPrev);
  document.getElementById('offerNext').setAttribute('aria-label', t().hero.offerNext);
  const many = offers.length > 1;
  document.getElementById('offerPrev').hidden = !many;
  document.getElementById('offerNext').hidden = !many;
  dots.hidden = !many;

  track.innerHTML = offers.map((offer, index) => `
    <article class="offer-card" aria-roledescription="slide" onclick="goToOffer(${index})">
      <span class="offer-rim" aria-hidden="true"></span>
      <span class="offer-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
      <div class="offer-card-top">
        <span class="offer-badge"><i></i>${escapeHtml(t().hero.offerBadge)}</span>
        <span class="offer-time">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${escapeHtml(offerText(offer.time))}
        </span>
      </div>
      <h2 class="offer-name">${escapeHtml(offerText(offer.name))}</h2>
      <p class="offer-desc">${escapeHtml(offerText(offer.description))}</p>
      <div class="offer-foot">
        <div>
          <span class="offer-price-label">${escapeHtml(t().hero.offerFrom)}</span>
          <span class="offer-price">${escapeHtml(offer.price)}</span>
        </div>
        <button type="button" class="offer-book" onclick="scrollToSection('contact')">${escapeHtml(t().hero.offerBook)}</button>
      </div>
      <div class="offer-progress"><span></span></div>
    </article>
  `).join('');

  dots.innerHTML = offers.map((_, i) => `
    <button type="button" class="offer-dot" aria-label="${i + 1}" onclick="goToOffer(${i})"></button>
  `).join('');

  layoutOfferTrack();
  if (!root.classList.contains('is-paused')) startOfferTimer();
}

function visibleOfferCount(innerWidth) {
  if (innerWidth < 560) return 1;
  if (innerWidth < 860) return 2;
  return 3;
}

function layoutOfferTrack() {
  const viewport = document.getElementById('offerViewport');
  const track = document.getElementById('offerTrack');
  if (!viewport || !track) return;
  const cards = [...track.children];
  if (!cards.length) return;
  const styles = getComputedStyle(viewport);
  const padX = (parseFloat(styles.paddingLeft) || 0) + (parseFloat(styles.paddingRight) || 0);
  const inner = Math.max(0, viewport.clientWidth - padX);
  if (inner < 40) return;
  const gap = 12;
  const visible = Math.min(visibleOfferCount(inner), cards.length);
  const cardWidth = (inner - gap * (visible - 1)) / visible;
  let windowStart = 0;
  if (cards.length > visible) {
    windowStart = offerIndex - Math.floor((visible - 1) / 2);
    windowStart = Math.max(0, Math.min(windowStart, cards.length - visible));
  }
  cards.forEach((card, i) => {
    card.style.width = `${cardWidth}px`;
    card.style.marginRight = i === cards.length - 1 ? '0' : `${gap}px`;
    const active = i === offerIndex;
    const onScreen = i >= windowStart && i < windowStart + visible;
    card.classList.toggle('is-active', active);
    card.setAttribute('aria-hidden', onScreen ? 'false' : 'true');
  });
  const rowWidth = cards.length * cardWidth + (cards.length - 1) * gap;
  const offset = cards.length <= visible
    ? (inner - rowWidth) / 2
    : -windowStart * (cardWidth + gap);
  track.style.transform = `translateX(${offset}px)`;
  document.querySelectorAll('.offer-dot').forEach((dot, i) => {
    const active = i === offerIndex;
    dot.classList.toggle('is-active', active);
    if (active) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
}

function keepOfferTimer() {
  const slider = document.getElementById('offerSlider');
  if (!slider?.classList.contains('is-paused')) startOfferTimer();
}

function stepOffer(direction) {
  if (offers.length < 2) return;
  offerIndex = (offerIndex + direction + offers.length) % offers.length;
  layoutOfferTrack();
  keepOfferTimer();
}

function goToOffer(index) {
  if (!Number.isInteger(index) || index < 0 || index >= offers.length) return;
  offerIndex = index;
  layoutOfferTrack();
  keepOfferTimer();
}

function startOfferTimer() {
  clearInterval(offerTimer);
  if (offers.length < 2) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  offerTimer = setInterval(() => stepOffer(1), OFFER_MS);
}

function bindOfferControls() {
  document.getElementById('offerPrev')?.addEventListener('click', () => stepOffer(-1));
  document.getElementById('offerNext')?.addEventListener('click', () => stepOffer(1));
  const slider = document.getElementById('offerSlider');
  const viewport = document.getElementById('offerViewport');
  if (!slider) return;
  const pause = () => {
    slider.classList.add('is-paused');
    clearInterval(offerTimer);
  };
  const resume = () => {
    slider.classList.remove('is-paused');
    startOfferTimer();
  };
  slider.addEventListener('mouseenter', pause);
  slider.addEventListener('mouseleave', resume);
  slider.addEventListener('focusin', pause);
  slider.addEventListener('focusout', (event) => {
    if (!slider.contains(event.relatedTarget)) resume();
  });
  viewport?.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    offerPointerX = event.clientX;
  });
  viewport?.addEventListener('pointerup', (event) => {
    if (offerPointerX == null) return;
    const delta = event.clientX - offerPointerX;
    offerPointerX = null;
    if (Math.abs(delta) < 48) return;
    stepOffer(delta < 0 ? 1 : -1);
  });
  viewport?.addEventListener('pointercancel', () => { offerPointerX = null; });
  if (!offerResizeBound) {
    window.addEventListener('resize', layoutOfferTrack);
    offerResizeBound = true;
  }
}

/* ===== STATS ===== */
function renderStats() {
  const grid = document.getElementById('statsGrid');
  const stats = [
    { value: 30, label: t().stats.trips, suffix: '+' },
    { value: 8, label: t().stats.years, suffix: '+' },
    { value: 5000, label: t().stats.guests, suffix: '+' },
    { value: 2, label: t().stats.languages, suffix: '' },
  ];
  grid.innerHTML = stats.map(s => `
    <div class="stat-item">
      <div class="stat-value" data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
  animateStats();
}

function animateStats() {
  const statEls = document.querySelectorAll('.stat-value');
  statEls.forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix;
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 30);
  });
}

/* ===== ABOUT ===== */
function renderAbout() {
  const features = [
    t().about.feature1, t().about.feature2, t().about.feature3, t().about.feature4
  ];
  const container = document.getElementById('aboutFeatures');
  container.innerHTML = features.map((text, i) => `
    <div class="about-feature">
      <div class="about-feature-icon">${aboutFeatureIcons[i]}</div>
      <span class="about-feature-text">${text}</span>
    </div>
  `).join('');
}

/* ===== FILTER CHIPS ===== */
function renderFilterChips() {
  const container = document.getElementById('filterChips');
  let html = `<button class="chip ${activeCategory === 'all' ? 'active' : ''}" onclick="setCategory('all')">${t().categories.all}</button>`;
  categories.forEach(cat => {
    html += `<button class="chip ${activeCategory === cat.id ? 'active' : ''}" onclick="setCategory('${cat.id}')">${categoryIcons[cat.icon]} <span>${t().categoryNames[cat.id]}</span></button>`;
  });
  container.innerHTML = html;
}

function setCategory(catId) {
  activeCategory = catId;
  visibleCount = 6;
  renderFilterChips();
  renderExcursions();
}

/* ===== EXCURSIONS ===== */
function getFilteredExcursions() {
  let result = excursions;
  if (activeCategory !== 'all') result = result.filter(e => e.categoryId === activeCategory);
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    result = result.filter(e =>
      e.title.de.toLowerCase().includes(term) ||
      e.title.en.toLowerCase().includes(term) ||
      e.short.de.toLowerCase().includes(term) ||
      e.short.en.toLowerCase().includes(term)
    );
  }
  return result;
}

function handleSearch() {
  searchTerm = document.getElementById('searchInput').value;
  visibleCount = 6;
  renderExcursions();
}

function priceHtml(price) {
  if (!price) return `<span class="price-amount price-on-request">${t().excursion.priceOnRequest}</span>`;
  const from = price.from ? `<span class="price-from">${t().excursion.priceFrom}</span> ` : '';
  const per = price.per === 'boat' ? t().excursion.perBoat : t().excursion.perPerson;
  return `${from}<span class="price-amount">${price.amount} €</span> <span class="price-per">${per}</span>`;
}

function renderExcursions() {
  const grid = document.getElementById('excursionGrid');
  const loadMoreWrap = document.getElementById('loadMoreWrap');
  const filtered = getFilteredExcursions();
  const visible = filtered.slice(0, visibleCount);

  if (visible.length === 0) {
    grid.innerHTML = `<div class="empty-state">${t().categories.empty}</div>`;
    loadMoreWrap.style.display = 'none';
    return;
  }

  grid.innerHTML = visible.map(e => {
    const cat = categories.find(c => c.id === e.categoryId);
    const catName = cat ? t().categoryNames[cat.id] : '';
    const catIcon = cat ? categoryIcons[cat.icon] : '';
    const cover = activityPhotos(e)[0];
    const includes = e.includes[currentLang];
    const tagsHtml = includes.slice(0, 3).map(i => `<span class="excursion-tag">${i}</span>`).join('') +
      (includes.length > 3 ? `<span class="excursion-tag-more">+${includes.length - 3}</span>` : '');

    return `
      <div class="excursion-card" onclick="openModal('${e.id}')">
        <div class="excursion-card-image">
          <img src="${cover}" alt="${getByLang(e.title)}" />
          <div class="excursion-card-badge">${catIcon}<span>${catName}</span></div>
        </div>
        <div class="excursion-card-body">
          <h3 class="excursion-card-title">${getByLang(e.title)}</h3>
          <p class="excursion-card-short">${getByLang(e.short)}</p>
          <div class="excursion-tags">${tagsHtml}</div>
          <div class="excursion-card-price">${priceHtml(e.price)}</div>
          <div class="excursion-card-actions">
            <button class="excursion-card-details" onclick="event.stopPropagation(); openModal('${e.id}')">
              ${t().excursion.details}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <button class="excursion-card-whatsapp" onclick="event.stopPropagation(); sendWhatsAppExcursion('${e.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              ${t().excursion.bookButton}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  loadMoreWrap.style.display = visibleCount < filtered.length ? 'block' : 'none';
}

function loadMore() {
  visibleCount += 6;
  renderExcursions();
}

/* ===== ACTIVITY GALLERY ===== */
let gallery = null;

function activityPhotos(excursion) {
  const local = typeof activityGalleries !== 'undefined' ? activityGalleries[excursion.id] : null;
  return local && local.length ? local : [excursion.image];
}

function clearGallery() {
  if (!gallery) return;
  clearInterval(gallery.timer);
  gallery = null;
}

function paintGallery() {
  if (!gallery) return;
  const n = gallery.photos.length;
  gallery.slides.forEach((slide, i) => {
    let delta = i - gallery.index;
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;
    slide.classList.remove('is-active', 'is-prev', 'is-next');
    if (delta === 0) slide.classList.add('is-active');
    else if (delta === -1) slide.classList.add('is-prev');
    else if (delta === 1) slide.classList.add('is-next');
  });
  gallery.dots.forEach((dot, i) => dot.classList.toggle('is-active', i === gallery.index));
  if (gallery.count) gallery.count.textContent = `${gallery.index + 1} / ${n}`;
}

function stepGallery(direction) {
  if (!gallery || gallery.photos.length < 2) return;
  gallery.index = (gallery.index + direction + gallery.photos.length) % gallery.photos.length;
  paintGallery();
}

function startGalleryTimer() {
  if (!gallery) return;
  clearInterval(gallery.timer);
  if (gallery.photos.length < 2) return;
  gallery.timer = setInterval(() => stepGallery(1), 4500);
}

function bindGallery(root, photos) {
  clearGallery();
  const slides = [...root.querySelectorAll('.gallery-slide')];
  const dots = [...root.querySelectorAll('.gallery-dot')];
  gallery = { index: 0, photos, slides, dots, count: root.querySelector('.gallery-count'), timer: null, pointerX: null, swiped: false };
  paintGallery();
  startGalleryTimer();

  root.querySelector('.gallery-prev')?.addEventListener('click', () => { stepGallery(-1); startGalleryTimer(); });
  root.querySelector('.gallery-next')?.addEventListener('click', () => { stepGallery(1); startGalleryTimer(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    gallery.index = i;
    paintGallery();
    startGalleryTimer();
  }));
  slides.forEach((slide) => slide.addEventListener('click', () => {
    if (gallery.swiped) { gallery.swiped = false; return; }
    if (slide.classList.contains('is-prev')) stepGallery(-1);
    if (slide.classList.contains('is-next')) stepGallery(1);
    startGalleryTimer();
  }));
  root.addEventListener('pointerenter', () => gallery && clearInterval(gallery.timer));
  root.addEventListener('pointerleave', startGalleryTimer);
  root.addEventListener('pointerdown', (event) => { if (gallery) gallery.pointerX = event.clientX; });
  root.addEventListener('pointerup', (event) => {
    if (!gallery || gallery.pointerX == null) return;
    const delta = event.clientX - gallery.pointerX;
    gallery.pointerX = null;
    if (delta > 48) stepGallery(-1);
    else if (delta < -48) stepGallery(1);
    else return;
    gallery.swiped = true;
    startGalleryTimer();
  });
}

/* ===== MODAL ===== */
function openModal(excursionId) {
  const e = excursions.find(x => x.id === excursionId);
  if (!e) return;
  const cat = categories.find(c => c.id === e.categoryId);
  const catName = cat ? t().categoryNames[cat.id] : '';
  const includes = e.includes[currentLang];
  const photos = activityPhotos(e);
  const title = getByLang(e.title);
  const checkSvg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  const chevron = (points) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="${points}"/></svg>`;
  const many = photos.length > 1;

  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <div class="modal-gallery" id="activityGallery">
      <div class="gallery-stage">
        ${photos.map((src, i) => `<button type="button" class="gallery-slide" aria-label="${title}"><img src="${src}" alt="${title}" ${i === 0 ? '' : 'loading="lazy"'} /></button>`).join('')}
      </div>
      ${many ? `<button type="button" class="gallery-nav gallery-prev" aria-label="${t().excursion.prevImage}">${chevron('15 18 9 12 15 6')}</button>` : ''}
      ${many ? `<button type="button" class="gallery-nav gallery-next" aria-label="${t().excursion.nextImage}">${chevron('9 18 15 12 9 6')}</button>` : ''}
      <button class="modal-close" onclick="closeModalDirect()" aria-label="${t().excursion.close}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="modal-badge">${catName}</div>
      ${many ? `<div class="gallery-meta"><div class="gallery-dots">${photos.map((_, i) => `<button type="button" class="gallery-dot" aria-label="${i + 1}"></button>`).join('')}</div><span class="gallery-count"></span></div>` : ''}
    </div>
    <div class="modal-body">
      <h2 class="modal-title">${getByLang(e.title)}</h2>
      <div class="modal-price">${priceHtml(e.price)}</div>
      ${e.price && e.price.note ? `<p class="modal-price-note">${getByLang(e.price.note)}</p>` : ''}
      <p class="modal-desc">${getByLang(e.description)}</p>
      <h3 class="modal-includes-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        ${t().excursion.included}
      </h3>
      <div class="modal-includes">
        ${includes.map(i => `<div class="modal-include-item"><span class="modal-include-check">${checkSvg}</span>${i}</div>`).join('')}
      </div>
      <button class="btn-gold modal-cta" onclick="sendWhatsAppExcursion('${e.id}')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        ${t().excursion.bookButton}
      </button>
    </div>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  bindGallery(document.getElementById('activityGallery'), photos);
}

function closeModal(e) {
  if (e.target === e.currentTarget) closeModalDirect();
}

function closeModalDirect() {
  clearGallery();
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  const open = document.getElementById('modalOverlay').classList.contains('open');
  if (!open) return;
  if (e.key === 'Escape') closeModalDirect();
  if (e.key === 'ArrowRight') { stepGallery(1); startGalleryTimer(); }
  if (e.key === 'ArrowLeft') { stepGallery(-1); startGalleryTimer(); }
});

/* ===== WHATSAPP ===== */
function sendWhatsAppExcursion(excursionId) {
  const e = excursions.find(x => x.id === excursionId);
  if (!e) return;
  const msg = encodeURIComponent(`${t().excursion.whatsappMessage} ${getByLang(e.title)}`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

/* Returns the form message (with the chosen topic) or null after nudging the user to fill it in. */
function readContactForm() {
  const name = document.getElementById('contactName').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const intent = selectedIntent === null ? '' : t().contact.intents[selectedIntent];
  if (!message && !intent) {
    const pass = document.getElementById('boardingPass');
    const field = document.getElementById('contactMessage');
    pass.classList.remove('shake');
    void pass.offsetWidth;
    pass.classList.add('shake');
    field.placeholder = t().contact.emptyMessage;
    field.focus();
    return null;
  }
  return { name, text: [intent, message].filter(Boolean).join(' – ') };
}

function sendWhatsAppForm() {
  const form = readContactForm();
  if (!form) return;
  const msg = encodeURIComponent(`Hallo Hurghada Erlebnisse, mein Name ist ${form.name || '...'}. ${form.text}`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

function sendEmailForm() {
  const form = readContactForm();
  if (!form) return;
  const subject = encodeURIComponent('Anfrage über Website');
  const body = encodeURIComponent(`Name: ${form.name}\n\n${form.text}`);
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

/* ===== CONTACT CARDS ===== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderContactCards() {
  const container = document.getElementById('contactCards');
  const copyIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  container.innerHTML = contactCards.map((card, i) => `
    <div class="contact-card" style="--accent: ${card.color}; --delay: ${i * 0.12}s">
      <a href="${card.href}" target="_blank" rel="noopener" class="contact-card-link" aria-label="${getByLang(card.label)}: ${card.value}"></a>
      <div class="contact-card-glow"></div>
      <div class="contact-card-icon">${contactIcons[card.icon]}<span class="contact-card-ring"></span></div>
      <div class="contact-card-label">${getByLang(card.label)}</div>
      <div class="contact-card-value">${card.value}</div>
      <button type="button" class="contact-card-copy" data-copy="${card.value}">${copyIcon}<span>${t().contact.copy}</span></button>
    </div>
  `).join('');

  container.querySelectorAll('.contact-card').forEach(card => {
    if (!prefersReducedMotion) {
      card.addEventListener('pointermove', (ev) => {
        const r = card.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width;
        const y = (ev.clientY - r.top) / r.height;
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
        card.style.setProperty('--rx', `${(0.5 - y) * 12}deg`);
        card.style.setProperty('--ry', `${(x - 0.5) * 12}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    }
  });

  container.querySelectorAll('.contact-card-copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(btn.dataset.copy); } catch { return; }
      const label = btn.querySelector('span');
      btn.classList.add('copied');
      label.textContent = t().contact.copied;
      setTimeout(() => { btn.classList.remove('copied'); label.textContent = t().contact.copy; }, 1600);
    });
  });
}

/* ===== CONTACT INTENTS ===== */
let selectedIntent = null;

function renderContactIntents() {
  const container = document.getElementById('contactIntents');
  container.innerHTML = t().contact.intents.map((label, i) =>
    `<button type="button" class="bp-intent ${selectedIntent === i ? 'active' : ''}" onclick="selectIntent(${i})">${label}</button>`
  ).join('');
}

function selectIntent(index) {
  selectedIntent = selectedIntent === index ? null : index;
  renderContactIntents();
}

/* ===== LIVE CLOCK (Hurghada time) ===== */
const OPEN_HOUR = 8;
const CLOSE_HOUR = 22;
let liveClockTimer = null;

function updateLiveClock() {
  const locale = currentLang === 'de' ? 'de-DE' : 'en-GB';
  const now = new Date();
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(now).map(p => [p.type, p.value]));
  const hour = Number(parts.hour);
  const minute = Number(parts.minute);

  document.getElementById('liveTime').innerHTML = `${parts.hour}:${parts.minute}<small>:${parts.second}</small>`;
  document.getElementById('liveDate').textContent = new Intl.DateTimeFormat(locale, {
    timeZone: 'Africa/Cairo', weekday: 'long', day: 'numeric', month: 'long',
  }).format(now);

  const open = hour >= OPEN_HOUR && hour < CLOSE_HOUR;
  const status = document.getElementById('liveStatus');
  status.classList.toggle('online', open);
  document.getElementById('liveStatusText').textContent = open ? t().contact.online : t().contact.offline;

  // Sun travels the arc 06:00–18:00, the moon 18:00–06:00.
  const minutes = hour * 60 + minute;
  const day = minutes >= 360 && minutes < 1080;
  const progress = ((minutes - (day ? 360 : 1080) + 1440) % 1440) / 720;
  const u = 1 - progress;
  const x = u * u * 4 + 2 * u * progress * 100 + progress * progress * 196;
  const y = u * u * 56 + 2 * u * progress * -24 + progress * progress * 56;
  const dot = document.getElementById('liveSunDot');
  dot.style.left = `${x / 2}%`;
  dot.style.top = `${(y / 60) * 100}%`;
  dot.classList.toggle('night', !day);
}

function startLiveClock() {
  updateLiveClock();
  clearInterval(liveClockTimer);
  liveClockTimer = setInterval(updateLiveClock, 1000);
}

/* ===== FOOTER CATEGORIES ===== */
function renderFooterCategories() {
  const container = document.getElementById('footerCategories');
  container.innerHTML = categories.slice(0, 6).map(cat => `
    <li><button onclick="scrollToSection('excursions')">${t().categoryNames[cat.id]}</button></li>
  `).join('');
}

/* ===== I18N TEXT UPDATE ===== */
function updateTexts() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const keys = key.split('.');
    let val = t();
    for (const k of keys) { val = val[k]; if (!val) break; }
    if (val) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const keys = key.split('.');
    let val = t();
    for (const k of keys) { val = val[k]; if (!val) break; }
    if (val) el.placeholder = val;
  });
}

/* ===== RENDER ALL ===== */
function renderAll() {
  updateTexts();
  renderOffers();
  renderStats();
  renderAbout();
  renderHotels();
  renderFilterChips();
  renderExcursions();
  renderContactCards();
  renderContactIntents();
  updateLiveClock();
  renderFooterCategories();
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', async () => {
  document.documentElement.lang = currentLang;
  renderLangSwitcher();
  bindOfferControls();
  renderHero();
  loadOffers();
  renderAll();
  startLiveClock();
  if (prefersReducedMotion) document.querySelectorAll('.bp-flight-svg').forEach(svg => svg.pauseAnimations());
});
