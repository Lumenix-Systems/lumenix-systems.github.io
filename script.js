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
