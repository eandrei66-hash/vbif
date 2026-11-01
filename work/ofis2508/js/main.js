/* ===== Контакты — замените на свои ===== */
const CONTACTS = {
  whatsapp: "79132182508",          // номер без «+» и пробелов
  telegramUrl: "https://t.me/+79132182508",   // Telegram по номеру телефона
  vkUrl: "https://vk.com/ofis2508",
  phone: "+79132182508",
  phoneLabel: "+7 913 218-25-08",
};

const WA_URL = `https://wa.me/${CONTACTS.whatsapp}`;
const TG_URL = CONTACTS.telegramUrl;

const ICONS = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2.1 22l5.33-1.4a9.86 9.86 0 0 0 4.61 1.17h.01c5.44 0 9.87-4.43 9.87-9.87 0-2.64-1.03-5.12-2.87-6.99zm-7.01 15.19h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.16.83.84-3.08-.2-.32a8.17 8.17 0 0 1-1.25-4.33c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.86 5.8 2.41a8.15 8.15 0 0 1 2.4 5.8c0 4.53-3.68 8.22-8.15 8.22zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg>',
  tg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.94 4.3 18.9 18.65c-.23 1.01-.83 1.26-1.68.79l-4.63-3.41-2.23 2.15c-.25.25-.45.45-.93.45l.33-4.71 8.58-7.75c.37-.33-.08-.52-.58-.18L7.25 12.67 2.68 11.24c-.99-.31-1.01-.99.21-1.47l17.86-6.88c.83-.31 1.55.19 1.19 1.41z"/></svg>',
};

const FRAME = "M395 142 V96 H83 V410 H395 V360";
const LOGO_TEXT = '<g class="m-text" fill="currentColor" stroke="none" font-family="Jost, sans-serif" font-weight="300" font-size="108"><text x="228" y="247" textLength="240" lengthAdjust="spacingAndGlyphs">OFIS</text><text x="228" y="343" textLength="240" lengthAdjust="spacingAndGlyphs">2508</text></g>';
// полный знак (рамка + надпись); mono — только рамка для мелких мест
const markSvg = (cls = "", mono = false) => `<svg class="mark ${mono ? "mark--mono" : ""} ${cls}" viewBox="${mono ? "75 88 330 330" : "75 88 400 330"}" fill="none" stroke-linecap="square" aria-hidden="true"><path class="m-frame" pathLength="1" d="${FRAME}" stroke-width="${mono ? 10 : 4}"/>${mono ? "" : LOGO_TEXT}</svg>`;
const MARK = markSvg("", true);

/* ===== Общие блоки: хедер, футер, плавающие кнопки ===== */
const page = document.body.dataset.page;

function renderChrome() {
  const header = document.getElementById("header");
  if (header) {
    header.outerHTML = `
    <header class="header" id="site-header">
      <div class="wrap header__in">
        <a class="brand" href="index.html" aria-label="Ofis.2508">${MARK}<span class="brand__word">Ofis.2508</span></a>
        <nav class="nav" id="nav">
          <a href="index.html" data-i18n="nav.home" class="${page === "home" ? "is-active" : ""}"></a>
          <a href="services.html" data-i18n="nav.services" class="${page === "services" ? "is-active" : ""}"></a>
          <a href="about.html" data-i18n="nav.about" class="${page === "about" ? "is-active" : ""}"></a>
        </nav>
        <div class="header__side">
          <div class="lang"><button data-lang="ru">RU</button><span>/</span><button data-lang="en">EN</button></div>
          <a class="btn btn--ghost-light" href="${WA_URL}" target="_blank" rel="noopener" data-i18n="btn.write"></a>
          <button class="burger" id="burger" aria-label="Menu"><span></span></button>
        </div>
      </div>
    </header>`;
  }

  const footer = document.getElementById("footer");
  if (footer) {
    footer.outerHTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="footer__grid">
          <div>
            <a class="brand" href="index.html">${MARK}<span class="brand__word">Ofis.2508</span></a>
            <p data-i18n="ft.about"></p>
          </div>
          <div>
            <h4 data-i18n="ft.nav"></h4>
            <ul>
              <li><a href="index.html" data-i18n="nav.home"></a></li>
              <li><a href="services.html" data-i18n="nav.services"></a></li>
              <li><a href="about.html" data-i18n="nav.about"></a></li>
            </ul>
          </div>
          <div>
            <h4 data-i18n="ft.contacts"></h4>
            <ul>
              <li><a href="${WA_URL}" target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a href="${TG_URL}" target="_blank" rel="noopener">Telegram</a></li>
              <li><a href="${CONTACTS.vkUrl}" target="_blank" rel="noopener">ВКонтакте</a></li>
              <li><a href="tel:${CONTACTS.phone}">${CONTACTS.phoneLabel}</a></li>
            </ul>
          </div>
          <div>
            <h4 data-i18n="ft.visit"></h4>
            <ul>
              <li data-i18n="ft.address"></li>
              <li data-i18n="ft.hours"></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom"><span data-i18n="ft.rights"></span><span data-i18n="ft.demo"></span></div>
      </div>
    </footer>
    <div class="float">
      <a href="${WA_URL}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONS.wa}<span class="float__label">WhatsApp</span></a>
      <a href="${TG_URL}" target="_blank" rel="noopener" aria-label="Telegram">${ICONS.tg}<span class="float__label">Telegram</span></a>
    </div>`;
  }

  // Логотипы-знаки в разметке страниц
  document.querySelectorAll("[data-mark]").forEach((el) => (el.outerHTML = markSvg(el.dataset.mark, el.hasAttribute("data-mono"))));

  // Кнопки мессенджеров в контенте
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = WA_URL; a.target = "_blank"; a.rel = "noopener";
    a.insertAdjacentHTML("afterbegin", ICONS.wa);
  });
  document.querySelectorAll("[data-tg]").forEach((a) => {
    a.href = TG_URL; a.target = "_blank"; a.rel = "noopener";
    a.insertAdjacentHTML("afterbegin", ICONS.tg);
  });
}

/* ===== Языки ===== */
function getLang() {
  try { return localStorage.getItem("ofis-lang") || "ru"; } catch (e) { return "ru"; }
}
function setLang(lang) {
  const dict = window.OFIS_I18N[lang] || window.OFIS_I18N.ru;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = dict[el.dataset.i18n];
    if (v !== undefined) {
      // сохраняем иконку внутри кнопок мессенджеров
      const icon = el.querySelector("svg");
      el.innerHTML = v;
      if (icon) el.prepend(icon);
    }
  });
  const titleKey = document.body.dataset.title;
  if (titleKey && dict[titleKey]) document.title = dict[titleKey];
  document.querySelectorAll(".lang button").forEach((b) => b.classList.toggle("is-active", b.dataset.lang === lang));
  try { localStorage.setItem("ofis-lang", lang); } catch (e) {}
}

/* ===== Поведение ===== */
function initHeader() {
  const header = document.getElementById("site-header");
  const onScroll = () => {
    header.classList.toggle("is-solid", window.scrollY > 60);
    document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  header.addEventListener("transitionend", onScroll);

  const burger = document.getElementById("burger");
  burger.addEventListener("click", () => document.body.classList.toggle("menu-open"));
  document.querySelectorAll("#nav a").forEach((a) =>
    a.addEventListener("click", () => document.body.classList.remove("menu-open"))
  );
  document.querySelectorAll(".lang button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
}

function initSubnav() {
  const links = document.querySelectorAll(".subnav a");
  if (!links.length) return;
  const sections = [...links].map((a) => document.querySelector(a.getAttribute("href")));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => s && io.observe(s));
}

renderChrome();
setLang(getLang());
initHeader();
initSubnav();
