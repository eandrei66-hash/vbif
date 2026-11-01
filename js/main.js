/* ===== Работы ===== */
const WORKS = [
  { id: "barbershop1988", niche: "barber", name: "BARBERSHOP 1988", meta: "Барбершоп · Горно-Алтайск",
    text: "Сайт барбершопа: цены, услуги, контакты и запись.", url: "https://phenomenal-basbousa-c905a4.netlify.app" },
  { id: "oldcapital", niche: "barber", name: "Олд-капитал", meta: "Барбершоп · Барнаул",
    text: "Сайт барбершопа на четыре страницы: услуги, цены, контакты.", url: "https://clinquant-salmiakki-3187f8.netlify.app" },
  { id: "fenita", niche: "clean", name: "ФениТа", meta: "Клининг · Горно-Алтайск",
    text: "Сайт клининговой компании. Два варианта оформления на выбор: тёмный и светлый.",
    variants: [
      { label: "Тёмный", url: "https://nimble-fox-058d15.netlify.app" },
      { label: "Светлый", url: "https://incandescent-beijinho-b12721.netlify.app" },
    ] },
  { id: "nega", niche: "spa", name: "Нега / HERA", meta: "SPA-салон",
    text: "Сайт SPA-салона: программы, массаж, аппаратные процедуры, цены.", url: "https://dazzling-cuchufli-956d05.netlify.app" },
  { id: "novara", niche: "spa", name: "Novara", meta: "Wellness и SPA · Алтай",
    text: "Сайт wellness и SPA: массаж, хаммам, сауна, программы и ретриты.", url: "work/novara/index.html" },
  { id: "ofis2508", niche: "spa", name: "Ofis.2508", meta: "Глэм-студия · Барнаул",
    text: "Сайт студии красоты: услуги и цены на брови, массаж и другое.", url: "work/ofis2508/index.html" },
  { id: "stroi", niche: "d3", name: "Строй-группа", meta: "Строительная группа · 3D-анимация (учебный макет)",
    text: "Большой сайт из 11 страниц. На первом экране здание строится при прокрутке: чертёж, подземный паркинг, каркас, фасад, свет в окнах. Есть фильтр объектов и форма заявки. Название и данные вымышлены.", url: "https://vbif13.github.io/stroi-gruppa-big/" },
  { id: "meridian", niche: "d3", name: "Meridian 40", meta: "Часы · 3D-анимация (концепт)",
    text: "Одна страница: часы собираются и разбираются при прокрутке. Вся 3D-модель построена кодом: сталь, сапфир, кожа, механизм с рубинами. Бренд вымышлен.", url: "https://vbif13.github.io/meridian-watch-3d/" },
];

const DESK = { w: 1280, h: 740 }, PH = { w: 375, h: 660 };
const cardsEl = document.getElementById("cards");
const views = [];
const SHOT = { barbershop1988: "barber", oldcapital: "old", nega: "nega", novara: "novara", ofis2508: "ofis", stroi: "stroi", meridian: "meridian" };
const shotKey = (w, variant) => (w.variants ? (variant ? "fenita-light" : "fenita-dark") : SHOT[w.id]);

function cardHtml(w) {
  const variants = w.variants ? `<div class="seg" data-role="variant">${w.variants.map((v, i) => `<button type="button" class="${i ? "" : "is-active"}" data-i="${i}">${v.label}</button>`).join("")}</div>` : "";
  return `<article class="card" data-niche="${w.niche}" id="w-${w.id}">
    <div class="card__top">
      <div class="seg" data-role="device"><button type="button" class="is-active" data-d="desk">Компьютер</button><button type="button" data-d="phone">Телефон</button></div>
      ${variants}
    </div>
    <div class="view"><button class="view__play" type="button" data-role="play"><span class="view__tri"></span>Открыть живой сайт</button></div>
    <div class="card__body"><p class="card__meta">${w.meta}</p><h3>${w.name}</h3><p>${w.text}</p></div>
    <div class="card__foot"><a class="btn btn--glow" href="${w.url || w.variants[0].url}" target="_blank" rel="noopener" data-role="open">Открыть сайт</a></div>
  </article>`;
}

if (cardsEl) {
cardsEl.innerHTML = WORKS.map(cardHtml).join("");

WORKS.forEach((w) => {
  const card = document.getElementById("w-" + w.id);
  const view = card.querySelector(".view");
  const playBtn = card.querySelector('[data-role="play"]');
  const st = { w, card, view, device: "desk", variant: 0, live: false, frame: null };
  views.push(st);
  const curUrl = () => (w.variants ? w.variants[st.variant].url : w.url);
  // «оболочка» — рамка телефона или экран компьютера; внутри неё сначала картинка-превью, потом живой сайт
  const shell = document.createElement("div");
  shell.className = "view__phone";
  const poster = document.createElement("img");
  poster.className = "poster"; poster.alt = "Превью сайта " + w.name; poster.decoding = "async";
  shell.appendChild(poster); view.insertBefore(shell, playBtn);
  st.shell = shell; st.poster = poster;
  const setPoster = () => { poster.src = `img/pv/${shotKey(w, st.variant)}-${st.device === "desk" ? "d" : "m"}.jpg`; };

  st.layout = () => {
    const bw = view.clientWidth;
    if (!bw) return;
    if (st.device === "desk") {
      const s = bw / DESK.w;
      view.style.height = Math.round(DESK.h * s) + "px";
      view.classList.remove("view--phone");
      shell.style.cssText = `position:absolute;left:0;top:0;width:${DESK.w}px;height:${DESK.h}px;transform:scale(${s});transform-origin:0 0;border:0;border-radius:0`;
    } else {
      const vh = Math.min(640, Math.max(440, bw * 1.45));
      view.style.height = vh + "px";
      view.classList.add("view--phone");
      const border = 7, outerW = PH.w + border * 2, outerH = PH.h + border * 2;
      const s = Math.min((vh - 24) / outerH, (bw - 24) / outerW, 1);
      const left = (bw - outerW * s) / 2, top = (vh - outerH * s) / 2;
      shell.style.cssText = `position:absolute;left:${left}px;top:${top}px;width:${PH.w}px;height:${PH.h}px;transform:scale(${s});transform-origin:0 0;border-width:${border}px`;
    }
  };

  // живой сайт подгружается только по нажатию: до этого показывается лёгкая картинка
  st.go = () => {
    if (st.live) return;
    st.live = true; view.classList.add("is-loading");
    const f = document.createElement("iframe");
    f.title = w.name; f.src = curUrl();
    f.addEventListener("load", () => { view.classList.remove("is-loading"); view.classList.add("is-live"); });
    shell.appendChild(f); st.frame = f;
  };
  playBtn.addEventListener("click", st.go);
  poster.addEventListener("click", st.go);

  card.querySelector('[data-role="device"]').addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    card.querySelectorAll('[data-role="device"] button').forEach((x) => x.classList.toggle("is-active", x === b));
    st.device = b.dataset.d; setPoster(); st.layout();
  });
  const vs = card.querySelector('[data-role="variant"]');
  if (vs) vs.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    vs.querySelectorAll("button").forEach((x) => x.classList.toggle("is-active", x === b));
    st.variant = +b.dataset.i; setPoster();
    card.querySelector('[data-role="open"]').href = curUrl();
    if (st.frame) { view.classList.remove("is-live"); view.classList.add("is-loading"); st.frame.src = curUrl(); }
  });
  setPoster(); st.layout();
});

const relayout = () => views.forEach((v) => v.layout());
addEventListener("resize", relayout);
if (window.ResizeObserver) views.forEach((v) => new ResizeObserver(() => v.layout()).observe(v.card));

/* фильтр по нишам */
document.getElementById("filters").addEventListener("click", (e) => {
  const b = e.target.closest(".chip"); if (!b) return;
  document.querySelectorAll("#filters .chip").forEach((c) => c.classList.toggle("is-active", c === b));
  const f = b.dataset.f;
  views.forEach((v) => { v.card.hidden = !(f === "all" || v.w.niche === f); });
  setTimeout(relayout, 30);
});

}

/* заявка: готовое сообщение для Telegram (ничего не хранится и не отправляется само) */
document.getElementById("lead")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target), v = (k) => (f.get(k) || "").toString().trim();
  const lines = ["Здравствуйте! Хочу сайт.", "Бизнес: " + v("biz")];
  if (v("city")) lines.push("Город: " + v("city"));
  if (v("gis")) lines.push("2ГИС: " + v("gis"));
  if (v("wish")) lines.push("Пожелания: " + v("wish"));
  window.open("https://t.me/durov_wallet1?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
});

/* шапка, меню, тема */
const header = document.getElementById("site-header");
const onScroll = () => header.classList.toggle("is-solid", scrollY > 40);
onScroll(); addEventListener("scroll", onScroll, { passive: true });
document.getElementById("burger").addEventListener("click", () => { const opened = document.body.classList.toggle("menu-open"); document.getElementById("burger").setAttribute("aria-expanded", String(opened)); });
document.querySelectorAll("#nav a").forEach((a) => a.addEventListener("click", () => { document.body.classList.remove("menu-open"); document.getElementById("burger").setAttribute("aria-expanded", "false"); }));


/* «Обо мне»: код печатается сам, как будто сайт собирается на глазах */
(function () {
  const el = document.getElementById("code");
  if (!el) return;
  const SRC = [
    ["<section", "t"], [" class=", "a"], ['"hero"', "s"], [">\n  <", "t"], ["h1", "t"], [">", "t"], ["Сайты, которые продают", ""], ["</h1>\n  <", "t"], ["a", "t"], [" class=", "a"], ['"btn"', "s"], [">", "t"], ["Написать", ""], ["</a>\n</", "t"], ["section", "t"], [">", "t"],
  ];
  const chars = []; SRC.forEach(([txt, cls]) => [...txt].forEach((ch) => chars.push([ch, cls])));
  const esc = (c) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === "&" ? "&amp;" : c);
  function html(n) { let out = "", cur = null; for (let i = 0; i < n; i++) { const [ch, cls] = chars[i]; if (cls !== cur) { if (cur) out += "</span>"; if (cls) out += '<span class="' + cls + '">'; cur = cls; } out += esc(ch); } if (cur) out += "</span>"; return out; }
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.innerHTML = html(chars.length); return; }
  let n = 0, on = false, timer;
  function step() {
    if (!on) return;
    n++; el.innerHTML = html(n);
    if (n >= chars.length) { timer = setTimeout(() => { n = 0; step(); }, 4200); return; }
    timer = setTimeout(step, 55 + Math.random() * 45);
  }
  new IntersectionObserver((e) => { on = e[0].isIntersecting; clearTimeout(timer); if (on) step(); }).observe(el);
})();

document.addEventListener("keydown", e => { if(e.key === "Escape") { document.body.classList.remove("menu-open"); document.getElementById("burger").setAttribute("aria-expanded", "false"); } });
