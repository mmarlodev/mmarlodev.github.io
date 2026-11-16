(function () {
  const P = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  document.querySelectorAll("[data-bind]").forEach((el) => { el.textContent = P[el.dataset.bind] || ""; });
  document.title = `${P.name} | ${P.role}`;
  $("#year").textContent = new Date().getFullYear();
  if (!P.available) $("#availability").classList.add("off"), ($("#availability").lastChild.textContent = "Currently booked");

  $("#stats").innerHTML = P.stats.map((s) => `<li><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></li>`).join("");
  $("#skills").innerHTML = P.skills.map((s) => `<li>${esc(s)}</li>`).join("");

  // CSS-drawn Roblox-style UI previews
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const rar = ["#9aa4b2", "#3fbf5f", "#3a8dff", "#a04cff", "#ffb020"];
  const MOCKS = {
    shop: () => `
      <div class="w-top"><span class="w-title">SHOP</span><span class="w-x">X</span></div>
      <div class="w-tabs"><b class="on">Gamepasses</b><b>Coins</b><b>Pets</b></div>
      <div class="w-banner"><span>2x COINS</span><i>R$ 199</i></div>
      <div class="w-items">${range(3).map((i) => `<div class="w-item"><div class="w-icon" style="--c:${rar[i + 2]}"></div><i>R$ ${[49, 99, 399][i]}</i></div>`).join("")}</div>`,
    inventory: () => `
      <div class="w-top"><span class="w-title">INVENTORY</span><span class="w-x">X</span></div>
      <div class="w-inv">${range(12).map((i) => `<div class="w-slot${i === 4 ? " eq" : ""}" style="--c:${rar[(i * 7) % 5]}"><div></div></div>`).join("")}</div>
      <div class="w-bar"><span>24 / 50</span><b>EQUIP BEST</b></div>`,
    hud: () => `
      <div class="w-hud">
        <div class="w-cur"><span class="coin"></span>12,450</div>
        <div class="w-cur gem"><span class="coin"></span>320</div>
        <div class="w-meters"><div class="w-meter hp"><i style="width:72%"></i></div><div class="w-meter st"><i style="width:45%"></i></div></div>
        <div class="w-abil">${range(4).map((i) => `<div class="w-ab${i === 1 ? " cd" : ""}"><span>${["Q", "E", "R", "F"][i]}</span></div>`).join("")}</div>
      </div>`,
    menu: () => `
      <div class="w-menu"><div class="w-logo">BLOX<br/>QUEST</div>
      <b class="w-btn play">PLAY</b><b class="w-btn">SETTINGS</b><b class="w-btn">UPDATES</b></div>`,
    settings: () => `
      <div class="w-top"><span class="w-title">SETTINGS</span><span class="w-x">X</span></div>
      <div class="w-set">${["Music", "Sound FX", "Shadows", "Low Graphics"].map((l, i) => `<div class="w-row"><span>${l}</span>${i < 2 ? `<div class="w-slider"><i style="width:${[70, 40][i]}%"></i></div>` : `<div class="w-tog${i === 2 ? " on" : ""}"><i></i></div>`}</div>`).join("")}</div>`,
    rewards: () => `
      <div class="w-top"><span class="w-title">DAILY REWARDS</span><span class="w-x">X</span></div>
      <div class="w-days">${range(7).map((i) => `<div class="w-day${i < 3 ? " got" : i === 3 ? " now" : ""}${i === 6 ? " big" : ""}"><small>Day ${i + 1}</small><div class="w-icon" style="--c:${rar[Math.min(4, Math.floor(i / 1.5))]}"></div></div>`).join("")}</div>`
  };
  const renderMock = (type) => `<div class="mock mock-${type}">${(MOCKS[type] || MOCKS.shop)()}</div>`;
  const heroImgs = P.projects.filter((p) => p.image).slice(0, 3);
  document.querySelectorAll(".hero-art .mock").forEach((el, i) => {
    if (heroImgs.length === 3) { el.outerHTML = `<img class="hero-shot" src="${esc(heroImgs[i].image)}" alt="${esc(heroImgs[i].title)}" />`; return; }
    const type = [...el.classList].find((c) => c.startsWith("mock-")).slice(5);
    el.innerHTML = MOCKS[type]();
  });
  const preview = (p) => p.image
    ? `<div class="shot" style="--img:url('${esc(p.image)}')"><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" /></div>`
    : renderMock(p.mock);

  // Projects + filters
  const cats = ["All", ...new Set(P.projects.map((p) => p.category))];
  $("#filters").innerHTML = cats.map((c, i) => `<button class="${i ? "" : "on"}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  $("#projects").innerHTML = P.projects.map((p, i) => `
    <article class="card project reveal" data-cat="${esc(p.category)}" data-i="${i}" tabindex="0">
      <div class="preview">${preview(p)}</div>
      <div class="project-body">
        <span class="cat">${esc(p.category)}</span>
        <h3>${esc(p.title)}</h3>
        <p class="muted">${esc(p.description)}</p>
      </div>
    </article>`).join("");
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    $("#filters .on").classList.remove("on"); b.classList.add("on");
    document.querySelectorAll(".project").forEach((c) => { c.hidden = b.dataset.cat !== "All" && c.dataset.cat !== b.dataset.cat; });
  });

  // Modal
  const modal = $("#modal");
  const openModal = (p) => {
    $("#modal-preview").innerHTML = preview(p);
    $("#modal-title").textContent = p.title;
    $("#modal-desc").textContent = p.description;
    $("#modal-tags").innerHTML = (p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("");
    const link = $("#modal-link"); link.hidden = !p.link; link.href = p.link || "#";
    modal.hidden = false; document.body.style.overflow = "hidden";
  };
  const closeModal = () => { modal.hidden = true; document.body.style.overflow = ""; };
  $("#projects").addEventListener("click", (e) => { const c = e.target.closest(".project"); if (c) openModal(P.projects[c.dataset.i]); });
  $("#projects").addEventListener("keydown", (e) => { const c = e.target.closest(".project"); if (c && e.key === "Enter") openModal(P.projects[c.dataset.i]); });
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest(".modal-close")) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  // Pricing
  $("#pricing-cards").innerHTML = P.pricing.map((t) => `
    <div class="card tier reveal${t.featured ? " featured" : ""}">
      ${t.featured ? '<span class="ribbon">Most popular</span>' : ""}
      <h3>${esc(t.name)}</h3><div class="price">${esc(t.price)}</div>
      <p class="muted">${esc(t.desc)}</p>
      <ul>${t.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      <a href="#contact" class="btn${t.featured ? "" : " btn-ghost"}">Order</a>
    </div>`).join("");

  // Contact
  const C = P.contact, links = [];
  if (C.discord) links.push(`<button class="contact-btn discord" data-copy="${esc(C.discord)}"><b>Discord</b><span>${esc(C.discord)}</span></button>`);
  if (C.roblox) links.push(`<a class="contact-btn" href="${esc(C.roblox)}" target="_blank" rel="noopener"><b>Roblox</b><span>${esc(P.handle)}</span></a>`);
  if (C.twitter) links.push(`<a class="contact-btn" href="${esc(C.twitter)}" target="_blank" rel="noopener"><b>X / Twitter</b><span>Follow</span></a>`);
  if (C.devforum) links.push(`<a class="contact-btn" href="${esc(C.devforum)}" target="_blank" rel="noopener"><b>DevForum</b><span>Profile</span></a>`);
  if (C.email) links.push(`<a class="contact-btn" href="mailto:${esc(C.email)}"><b>Email</b><span>${esc(C.email)}</span></a>`);
  $("#contact-links").innerHTML = links.join("");
  const toast = (msg) => { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2000); };
  $("#contact-links").addEventListener("click", (e) => {
    const b = e.target.closest("[data-copy]"); if (!b) return;
    navigator.clipboard?.writeText(b.dataset.copy).then(() => toast("Discord username copied!"), () => toast(b.dataset.copy));
  });

  // Scroll reveal
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
