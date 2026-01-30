const detailTitle = document.getElementById("mapDetail")?.querySelector(".map__detailTitle");
const detailText = document.getElementById("mapDetail")?.querySelector(".map__detailText");
const yearEl = document.getElementById("year");

if (yearEl) yearEl.textContent = new Date().getFullYear();

const info = {
  PMPE: {
    t: "PMPE — Perception Engine",
    d: "Shapes sensation with safety-first modulation. Think: touch, temperature, multisensory response — grounded and controlled."
  },
  PSCS: {
    t: "PSCS — Spatial Computing",
    d: "Anchors interfaces and world elements in stable space. Presence, alignment, and believable structure for XR experiences."
  },
  ILCS: {
    t: "ILCS — Locomotion Control",
    d: "Interprets intent and movement signals for comfortable navigation. Designed for calibration, safety, and natural control."
  },
  PBES: {
    t: "PBES — Personality & Behavior",
    d: "Turns characters into consistent beings: emotion, decisions, adaptation, and safety frameworks — not random chaos."
  },
  VCS: {
    t: "VCS — Vocal Cognition",
    d: "Context-aware voice identity and speech behavior. Can integrate with PBES for expressive, believable interactions."
  },
};

function setActive(key){
  document.querySelectorAll(".node").forEach(n => n.classList.toggle("is-active", n.dataset.node === key));
  if (detailTitle && detailText && info[key]) {
    detailTitle.textContent = info[key].t;
    detailText.textContent = info[key].d;
  }
  const card = document.getElementById(key);
  if (card) {
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.style.outline = "2px solid rgba(79,195,255,0.35)";
    card.style.outlineOffset = "6px";
    setTimeout(() => { card.style.outline = "none"; }, 900);
  }
}

document.querySelectorAll(".node").forEach(btn => {
  btn.addEventListener("click", () => setActive(btn.dataset.node));
});

document.querySelectorAll(".stack__node").forEach(btn => {
  btn.addEventListener("click", () => setActive(btn.dataset.focus));
});
// Smooth anchor scrolling (no motion if user prefers reduced motion)
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  });
});
// Boot intro: logo -> site
(function () {
  const boot = document.getElementById("lxBoot");
  const skip = document.getElementById("lxBootSkip");
  if (!boot) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Only play once per browser (comment this out if you want it every time)
  const alreadyPlayed = localStorage.getItem("lxBootPlayed") === "1";

  function finishBoot() {
    boot.classList.add("is-out");
    document.body.classList.remove("is-booting");
    document.body.classList.add("is-booted");
    localStorage.setItem("lxBootPlayed", "1");
    setTimeout(() => boot.remove(), 900);
  }

  function startBoot() {
    document.body.classList.add("is-booting");

    // If reduced motion, skip the fancy part
    if (reduce) {
      finishBoot();
      return;
    }

    // Let the logo breathe a tiny bit, then reveal site
    setTimeout(finishBoot, 3500);
  }

  // Skip button
  skip?.addEventListener("click", finishBoot);
  boot.addEventListener("click", (e) => {
    // Clicking outside the button also skips (feels interactive)
    if (e.target === boot) finishBoot();
  });

  // If already played, don't show it again
  if (alreadyPlayed) {
    boot.remove();
    document.body.classList.add("is-booted");
  } else {
    startBoot();
  }
})();
// ===========================
// PMPE card hover slideshow
// (isolated, safe)
// ===========================
(function () {
  const card = document.getElementById("PMPE");
  if (!card) return;

  // Update these paths to match your repo /images/ names
  const images = [
    "./images/pmpe_tmhm_hero.png",
    "./images/pmpe_tmhm_front.png",
    "./images/pmpe_tmhm_conceptual-array.png",
    // later add:
    // "./images/pmpe_gm_hero.png",
    // "./images/pmpe_op_hero.png",
    // "./images/pmpe_gm_front.png",
    // ...
  ];

  // Create two layers for real crossfade (no layout changes)
  let bgA = card.querySelector(".pmpe-bg.pmpe-bg--a");
  let bgB = card.querySelector(".pmpe-bg.pmpe-bg--b");

  if (!bgA) {
    bgA = document.createElement("div");
    bgA.className = "pmpe-bg pmpe-bg--a";
    card.prepend(bgA);
  }
  if (!bgB) {
    bgB = document.createElement("div");
    bgB.className = "pmpe-bg pmpe-bg--b";
    card.prepend(bgB);
  }

  // Ensure starting states
  bgA.style.opacity = "0";
  bgB.style.opacity = "0";

  let idx = 0;
  let timer = null;
  let showA = true;

  function setLayer(el, url) {
    el.style.backgroundImage = `url("${url}")`;
  }

  function crossfadeTo(url) {
    const inEl = showA ? bgA : bgB;
    const outEl = showA ? bgB : bgA;

    setLayer(inEl, url);

    // Force a frame so background applies before opacity transition
    requestAnimationFrame(() => {
      // Let CSS hover rule handle overall visibility baseline,
      // but we also manage per-layer to crossfade.
      inEl.style.opacity = "0.33";
      outEl.style.opacity = "0";
      showA = !showA;
    });
  }

  function start() {
    // start at first image
    idx = 0;
    showA = true;
    bgA.style.opacity = "0";
    bgB.style.opacity = "0";

    crossfadeTo(images[idx]);

    // rotate while hovering
    timer = setInterval(() => {
      idx = (idx + 1) % images.length;
      crossfadeTo(images[idx]);
    }, 1800);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
    bgA.style.opacity = "0";
    bgB.style.opacity = "0";
  }

  // Only run on hover (no autoplay)
  card.addEventListener("mouseenter", start);
  card.addEventListener("mouseleave", stop);
})();
