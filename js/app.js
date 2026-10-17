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
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.getElementById('langLabel').textContent = lang.toUpperCase();
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

function sendWhatsAppForm() {
  const name = document.getElementById('contactName').value;
  const message = document.getElementById('contactMessage').value;
  const msg = encodeURIComponent(`Hallo Hurghada Erlebnisse, mein Name ist ${name || '...'}. ${message || ''}`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

function sendEmailForm() {
  const name = document.getElementById('contactName').value;
  const message = document.getElementById('contactMessage').value;
  const subject = encodeURIComponent('Anfrage über Website');
  const body = encodeURIComponent(`Name: ${name}\n\n${message}`);
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

/* ===== CONTACT CARDS ===== */
function renderContactCards() {
  const container = document.getElementById('contactCards');
  container.innerHTML = contactCards.map(card => `
    <a href="${card.href}" target="_blank" rel="noopener" class="contact-card">
      <div class="contact-card-icon" style="color: ${card.color}">${contactIcons[card.icon]}</div>
      <div class="contact-card-label">${getByLang(card.label)}</div>
      <div class="contact-card-value">${card.value}</div>
    </a>
  `).join('');
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
  renderStats();
  renderAbout();
  renderFilterChips();
  renderExcursions();
  renderContactCards();
  renderFooterCategories();
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = currentLang;
  document.getElementById('langLabel').textContent = currentLang.toUpperCase();
  renderHero();
  renderAll();
});
