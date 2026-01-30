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
// --- PMPE hover slideshow (safe, isolated) ---
(function () {
  const pmpeCard = document.getElementById("PMPE");
  if (!pmpeCard) return;

  // Put your images here (paths relative to index.html)
  const pmpeImages = [
    "./images/pmpe_tmhm_hero.png",
    "./images/pmpe_tmhm_front.png",
    "./images/pmpe_tmhm_conceptual-array.png"
    // later: "./images/pmpe_gm_hero.png", "./images/pmpe_op_hero.png", ...
  ];

  // Create background layer (only once)
  let bg = pmpeCard.querySelector(".pmpe-bg");
  if (!bg) {
    bg = document.createElement("div");
    bg.className = "pmpe-bg";
    pmpeCard.prepend(bg);
  }

  let idx = 0;
  let timer = null;

  // helper: swap image with a subtle fade
  function setBg(url) {
    // quick fade out then swap then fade in
    bg.style.opacity = "0";
    requestAnimationFrame(() => {
      bg.style.backgroundImage = `url("${url}")`;
      // show only if hovered (CSS handles hover opacity)
      if (pmpeCard.matches(":hover")) bg.style.opacity = "";
    });
  }

  pmpeCard.addEventListener("mouseenter", () => {
    idx = 0;
    setBg(pmpeImages[idx]);

    timer = setInterval(() => {
      idx = (idx + 1) % pmpeImages.length;
      setBg(pmpeImages[idx]);
    }, 1600);
  });

  pmpeCard.addEventListener("mouseleave", () => {
    if (timer) clearInterval(timer);
    timer = null;
    idx = 0;
    // CSS hover handles visibility; ensure it's reset
    bg.style.backgroundImage = "";
  });
})();
