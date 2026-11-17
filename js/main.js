const P = window.PORTFOLIO;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const motion = document.documentElement.classList.contains("motion");
const ARROW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`;

// Content
document.title = `${P.name} | ${P.role}`;
$$("[data-bind]").forEach((el) => (el.textContent = P[el.dataset.bind] ?? ""));
$$("[data-avatar]").forEach((img) => (img.src = P.avatar));
$$("[data-arrow]").forEach((el) => (el.innerHTML = ARROW));
$$("[data-roblox]").forEach((a) => (a.href = P.contact.roblox));
if (!P.available) $("#availability").remove();

$("#hero-word").innerHTML = [...P.name.toUpperCase()].map((c, i) => `<span style="--i:${i}">${esc(c)}</span>`).join("");

$("#intro").innerHTML = P.intro.split(/\s+/).map((w) =>
  w === "{headshot}"
    ? `<span class="intro__pill" aria-hidden="true"><img src="${esc(P.headshot)}" alt="" loading="lazy" /></span>`
    : `<span class="w">${esc(w)}</span>`
).join(" ");

$("#stats").innerHTML = P.stats.map((s, i) => `
  <div class="big big--${i % 3}" data-reveal>
    <p class="big__value"><span>${esc(s.value)}</span></p>
    <p class="big__label">${esc(s.label)}</p>
  </div>`).join("");

const chips = (list, cls = "") => `<ul class="chips ${cls}">${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;

const cells = P.projects.map((p, i) => `
  <article class="cell cell--p${Math.min(i, 3)}" data-reveal data-i="${i}" tabindex="0" role="button" aria-label="Open ${esc(p.title)}">
    <div class="cell__core">
      <div class="cell__shot">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy" />` : ""}</div>
      <div class="cell__text">
        <p class="cell__cat">${esc(p.category)}</p>
        <h3 class="cell__title">${esc(p.title)}</h3>
        <p class="cell__body">${esc(p.description)}</p>
      </div>
    </div>
  </article>`);
cells.splice(Math.min(3, cells.length), 0, `
  <article class="cell cell--tool" data-reveal>
    <div class="cell__core">
      <div>
        <p class="cell__big">Studio</p>
        <h3 class="cell__title">Built where your game lives</h3>
        <p class="cell__body">Designed and built in Roblox Studio, scaled for PC, mobile, tablet and console.</p>
      </div>
      ${chips(P.skills.slice(0, 6), "chips--on-blue")}
    </div>
  </article>`);
$("#projects").innerHTML = cells.join("");

$("#pricing").innerHTML = P.pricing.map((t) => `
  <article class="rate${t.featured ? " rate--featured" : ""}" data-reveal>
    <div class="rate__core">
      <div class="rate__head"><h3 class="rate__name">${esc(t.name)}</h3>${t.featured ? `<span class="rate__flag">Most popular</span>` : ""}</div>
      <p class="rate__price">${esc(t.price)}</p>
      <p class="rate__desc">${esc(t.desc)}</p>
      <ul class="rate__list">${t.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
    </div>
  </article>`).join("");

const c = P.contact;
$("#contact-links").innerHTML = [
  `<button class="pill" type="button" data-discord><span class="pill__label">Message me on Discord</span><span class="pill__icon">${ARROW}</span></button>`,
  c.roblox && `<a class="text-link" href="${esc(c.roblox)}" target="_blank" rel="noopener">Roblox</a>`,
  c.twitter && `<a class="text-link" href="${esc(c.twitter)}" target="_blank" rel="noopener">X</a>`,
  c.devforum && `<a class="text-link" href="${esc(c.devforum)}" target="_blank" rel="noopener">DevForum</a>`,
  c.email && `<a class="text-link" href="mailto:${esc(c.email)}">Email</a>`
].filter(Boolean).join("");

// Discord: copy the username
const toast = $("#toast");
let toastTimer;
const showToast = (msg) => {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
};
document.addEventListener("click", (e) => {
  if (!e.target.closest("[data-discord]")) return;
  const msg = `Discord: ${c.discord} (copied)`;
  navigator.clipboard?.writeText(c.discord).then(() => showToast(msg), () => showToast(`Discord: ${c.discord}`)) ?? showToast(`Discord: ${c.discord}`);
});

// Project popup
const modal = $("#modal");
const openProject = (i) => {
  const p = P.projects[i];
  $("#modal-shot").innerHTML = p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" />` : "";
  $("#modal-cat").textContent = p.category;
  $("#modal-title").textContent = p.title;
  $("#modal-desc").textContent = p.description;
  $("#modal-tags").innerHTML = (p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("");
  const link = $("#modal-link");
  link.hidden = !p.link;
  if (p.link) link.href = p.link;
  modal.showModal();
};
$("#projects").addEventListener("click", (e) => {
  const cell = e.target.closest("[data-i]");
  if (cell) openProject(+cell.dataset.i);
});
$("#projects").addEventListener("keydown", (e) => {
  const cell = e.target.closest("[data-i]");
  if (cell && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openProject(+cell.dataset.i); }
});
modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest("[data-close]")) modal.close(); });

// Nav hides while scrolling down, comes back when scrolling up
(() => {
  const nav = $("[data-nav]");
  let last = scrollY;
  addEventListener("scroll", () => {
    const y = scrollY;
    nav.classList.toggle("is-hidden", y > last && y > 160);
    last = y;
  }, { passive: true });
})();

// Screenshot strip: speed follows scroll velocity, direction follows scroll direction
(() => {
  const track = $("#marquee");
  const shots = P.projects.filter((p) => p.image);
  if (!shots.length) return track.parentElement.remove();
  const set = shots.map((p) => `<div class="marquee__item"><img src="${esc(p.image)}" alt="" loading="lazy" /></div>`).join("");
  track.innerHTML = set.repeat(4);
  if (!motion) return;
  let x = 0, dir = -1, boost = 0, lastY = scrollY, last = performance.now();
  addEventListener("scroll", () => {
    const dy = scrollY - lastY;
    lastY = scrollY;
    if (dy) dir = dy > 0 ? -1 : 1;
    boost = Math.min(boost + Math.abs(dy) * 0.6, 900);
  }, { passive: true });
  const tick = (now) => {
    const dt = Math.min(now - last, 50) / 1000;
    last = now;
    boost *= 0.92;
    x += dir * (40 + boost) * dt;
    const half = track.scrollWidth / 2;
    if (half) { if (x <= -half) x += half; if (x > 0) x -= half; }
    track.style.transform = `translate3d(${x}px,0,0)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

// Reveal on scroll
(() => {
  const els = $$("[data-reveal]");
  if (!motion || !("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("in"));
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  els.forEach((el) => io.observe(el));
})();

// Intro words light up as the statement scrolls through the screen
(() => {
  const words = $$("#intro .w");
  if (!motion) return words.forEach((w) => w.classList.add("on"));
  const intro = $("#intro");
  const update = () => {
    const r = intro.getBoundingClientRect();
    const p = Math.min(Math.max((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.3), 0), 1);
    const lit = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle("on", i < lit));
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
})();

// Hero parallax: the name drifts slower than the page, the avatar leans toward the cursor
(() => {
  if (!motion) return;
  const word = $("[data-hero-word]"), fig = $("[data-hero-figure]");
  let mx = 0, my = 0, tx = 0, ty = 0;
  addEventListener("pointermove", (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
  const loop = () => {
    tx += (mx - tx) * 0.07;
    ty += (my - ty) * 0.07;
    const y = scrollY;
    if (y < innerHeight * 1.2) {
      word.style.transform = `translate3d(${tx * -26}px,${y * 0.38 + ty * -10}px,0)`;
      fig.style.transform = `translate3d(${tx * 28}px,${y * -0.06}px,0) rotate(${tx * 4}deg)`;
    }
    requestAnimationFrame(loop);
  };
  loop();
})();
