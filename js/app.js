"use strict";

// Elements
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");

const askScreen = document.getElementById("askScreen");
const yayScreen = document.getElementById("yayScreen");
const fireworks = document.getElementById("fireworks");

// State
let noCount = 0;
let yesScale = 1.0;
let noScale = 1.0;

const hints = ["hmmm 🤨", "are you sure? 😅", "think again…", "last chance 😳"];

// Helpers
function applyScales() {
  yesBtn.style.setProperty("--yesScale", yesScale.toFixed(3));
  yesBtn.style.transform = `scale(${yesScale})`;

  // spacing grows proportionally with size
  const extraMargin = Math.max(0, (yesScale - 1) * 22);
  yesBtn.style.setProperty("--yesMargin", `${extraMargin}px`);

  noBtn.style.setProperty("--noScale", noScale.toFixed(3));
  noBtn.style.transform = `scale(${noScale})`;
}

function restartAnimation(el, className) {
  el.classList.remove(className);
  void el.offsetWidth; // reflow to restart animation
  el.classList.add(className);
}

function spawnFireworks(bursts = 10) {
  fireworks.innerHTML = "";

  for (let i = 0; i < bursts; i++) {
    const b = document.createElement("div");
    b.className = "burst";
    b.style.setProperty("--x", `${10 + Math.random() * 80}%`);
    b.style.setProperty("--y", `${10 + Math.random() * 70}%`);
    b.style.animationDelay = `${Math.random() * 0.6}s`;
    fireworks.appendChild(b);
  }

  // Remove after 2.5s
  setTimeout(() => {
    fireworks.classList.add("hidden");
    fireworks.innerHTML = "";
  }, 2500);
}

function addFloatingHearts(count = 18) {
  const heartLayer = document.createElement("div");
  heartLayer.className = "heart-layer";
  document.body.appendChild(heartLayer);

  const heartEmojis = ["💗", "💖", "💘", "💝", "💕"];

  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    h.style.left = `${Math.random() * 100}%`;
    h.style.animationDuration = `${10 + Math.random() * 14}s`;
    h.style.animationDelay = `${Math.random() * 10}s`;
    h.style.fontSize = `${14 + Math.random() * 18}px`;

    heartLayer.appendChild(h);
  }
}

// Events
noBtn.addEventListener("click", () => {
  noCount += 1;

  // Yes grows (cap it)
  yesScale = Math.min(yesScale + 0.18, 2.6);

  // No shrinks
  noScale = Math.max(noScale - 0.06, 0.55);
  noBtn.style.opacity = String(Math.max(0.5, 0.95 - noCount * 0.06));

  hint.textContent = hints[Math.min(noCount - 1, hints.length - 1)];

  restartAnimation(noBtn, "wiggle");
  applyScales();
});

yesBtn.addEventListener("click", () => {
  askScreen.classList.add("hidden");
  yayScreen.classList.remove("hidden");

  fireworks.classList.remove("hidden");
  spawnFireworks(10);
});

// Init
addFloatingHearts(18);
applyScales();