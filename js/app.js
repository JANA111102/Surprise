/**
 * Birthday Surprise — app.js
 * Handles: countdown, form validation, slideshow, final message, confetti
 */

/* ═══════════════════════════════════════════
   GLOBAL STATE
═══════════════════════════════════════════ */
let currentSlide   = 0;
let slideshowTimer = null;
let progressTimer  = null;
let countdownTimer = null;
let isUnlocked     = false;

/* ═══════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════ */
const $  = id => document.getElementById(id);
const pad = n  => String(n).padStart(2, "0");

function goToPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  $(id).classList.add("active");
}

/* ═══════════════════════════════════════════
   1 ▸ FLOATING HEARTS  (entry page ambience)
═══════════════════════════════════════════ */
function spawnHearts() {
  const container = $("floatingHearts");
  const symbols   = ["❤️","💜","💛","💚","💙","🌸","✨","⭐","🎀","🎊"];
  setInterval(() => {
    const el   = document.createElement("span");
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-duration: ${3 + Math.random() * 4}s;
      font-size: ${14 + Math.random() * 18}px;
      opacity: 0;
    `;
    container.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }, 400);
}

/* ═══════════════════════════════════════════
   2 ▸ COUNTDOWN TIMER
═══════════════════════════════════════════ */
function startCountdown() {
  const target = new Date(CONFIG.unlockDateTime).getTime();

  function tick() {
    const now  = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      // Countdown reached zero
      clearInterval(countdownTimer);
      isUnlocked = true;
      $("countdownWrap").style.display = "none";
      checkForm();   // re-evaluate the OK button
      $("hintText").textContent = "🎉 The surprise is ready! Fill in your details.";
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    $("cdDays").textContent  = pad(days);
    $("cdHours").textContent = pad(hours);
    $("cdMins").textContent  = pad(mins);
    $("cdSecs").textContent  = pad(secs);
  }

  tick();
  countdownTimer = setInterval(tick, 1000);
}

/* ═══════════════════════════════════════════
   3 ▸ FORM VALIDATION
═══════════════════════════════════════════ */
function checkForm() {
  const name = $("nameInput").value.trim().toLowerCase();
  const dob  = $("dobInput").value;
  const okBtn = $("okBtn");

  const nameOk = name === CONFIG.friendName.toLowerCase();
  const dobOk  = dob  === CONFIG.friendDOB;

  if (nameOk && dobOk && isUnlocked) {
    okBtn.disabled = false;
    okBtn.classList.add("ready");
    $("hintText").textContent = "✅ It's you! Click to open your surprise 🎁";
  } else if (nameOk && dobOk && !isUnlocked) {
    $("hintText").textContent = "⏳ Verified! Waiting for the unlock time…";
    okBtn.disabled = true;
  } else {
    okBtn.disabled = true;
    okBtn.classList.remove("ready");
    if (name && dob && (!nameOk || !dobOk)) {
      $("hintText").textContent = "🤔 Hmm, that doesn't match. Try again!";
    }
  }
}

$("nameInput").addEventListener("input", checkForm);
$("dobInput").addEventListener("change", checkForm);

/* ═══════════════════════════════════════════
   4 ▸ OK BUTTON → start slideshow
═══════════════════════════════════════════ */
$("okBtn").addEventListener("click", () => {
  buildSlideshow();
  goToPage("page-photos");
  startSlideshow();
});

/* ═══════════════════════════════════════════
   5 ▸ BUILD SLIDESHOW
═══════════════════════════════════════════ */
function buildSlideshow() {
  const frame = $("slideFrame");
  const dots  = $("slideDots");
  $("slideName").textContent = CONFIG.friendName + " 🎉";

  CONFIG.photos.forEach((src, i) => {
    // Slide
    const slide = document.createElement("div");
    slide.className = "slide" + (i === 0 ? " active" : "");
    slide.dataset.index = i;

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Memory ${i + 1}`;

    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = CONFIG.captions[i] || "";

    slide.appendChild(img);
    slide.appendChild(caption);
    frame.appendChild(slide);

    // Dot
    const dot = document.createElement("span");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => jumpToSlide(i));
    dots.appendChild(dot);
  });

  updateCounter();
  setSlideBackground(0);
}

/* ═══════════════════════════════════════════
   6 ▸ SLIDESHOW ENGINE
═══════════════════════════════════════════ */
function startSlideshow() {
  clearInterval(slideshowTimer);
  resetProgressBar();
  slideshowTimer = setInterval(nextSlide, CONFIG.slideInterval);
}

function nextSlide() {
  currentSlide++;
  if (currentSlide >= CONFIG.photos.length) {
    clearInterval(slideshowTimer);
    clearInterval(progressTimer);
    setTimeout(showFinalPage, 800);
    return;
  }
  activateSlide(currentSlide);
}

function jumpToSlide(index) {
  clearInterval(slideshowTimer);
  clearInterval(progressTimer);
  currentSlide = index;
  activateSlide(index);
  resetProgressBar();
  slideshowTimer = setInterval(nextSlide, CONFIG.slideInterval);
}

function activateSlide(index) {
  // Slides
  document.querySelectorAll(".slide").forEach((s, i) => {
    s.classList.toggle("active", i === index);
    s.classList.toggle("prev",   i === index - 1);
  });
  // Dots
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
  updateCounter();
  setSlideBackground(index);
  resetProgressBar();
}

function updateCounter() {
  $("photoCounter").textContent =
    `${currentSlide + 1} / ${CONFIG.photos.length}`;
}

function setSlideBackground(index) {
  const grad = CONFIG.gradients[index % CONFIG.gradients.length];
  document.body.style.setProperty("--grad-a", grad[0]);
  document.body.style.setProperty("--grad-b", grad[1]);

  // Blurred background mirror
  const blur = $("photoBgBlur");
  blur.style.backgroundImage = `url('${CONFIG.photos[index]}')`;
}

/* ─── Progress bar ─────────────────────── */
function resetProgressBar() {
  const bar = $("progressBar");
  clearInterval(progressTimer);
  bar.style.transition = "none";
  bar.style.width = "0%";
  // Force reflow
  bar.getBoundingClientRect();
  bar.style.transition = `width ${CONFIG.slideInterval}ms linear`;
  bar.style.width = "100%";
}

/* ═══════════════════════════════════════════
   7 ▸ FINAL PAGE
═══════════════════════════════════════════ */
function showFinalPage() {
  // Set background photo
  $("finalBg").style.backgroundImage = `url('${CONFIG.finalPhoto}')`;

  // Name + wish
  $("finalWish").innerHTML = `Happy Birthday, ${CONFIG.friendName}! 🎂`;

  // Typewriter for the message
  typeMessage(CONFIG.birthdayMessage);

  // Balloons
  spawnBalloons();

  // Confetti burst
  launchConfetti();

  goToPage("page-final");
}

/* ─── Typewriter ───────────────────────── */
function typeMessage(text) {
  const el = $("messageText");
  el.textContent = "";
  let i = 0;
  const speed = Math.max(18, Math.floor(4000 / text.length)); // auto-pace
  const t = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(t);
  }, speed);
}

/* ─── Balloons ─────────────────────────── */
function spawnBalloons() {
  const container = $("balloons");
  const colors    = ["#ff6b9d","#c44dff","#ffc700","#00d4aa","#ff6b35","#4dcfff"];
  for (let i = 0; i < 14; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    b.style.cssText = `
      left: ${5 + Math.random() * 90}%;
      background: ${colors[i % colors.length]};
      animation-delay: ${Math.random() * 2}s;
      animation-duration: ${4 + Math.random() * 3}s;
      width: ${40 + Math.random() * 20}px;
      height: ${50 + Math.random() * 25}px;
    `;
    container.appendChild(b);
  }
}

/* ─── Confetti ─────────────────────────── */
function launchConfetti() {
  const container = $("confetti");
  const colors    = ["#ff6b9d","#ffd700","#00e5ff","#b44dff","#ff6b35","#43ff64"];
  for (let i = 0; i < 120; i++) {
    const c = document.createElement("div");
    c.className = "confetti-piece";
    c.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      animation-delay: ${Math.random() * 3}s;
      animation-duration: ${2 + Math.random() * 3}s;
    `;
    container.appendChild(c);
  }
}

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
(function init() {
  spawnHearts();
  startCountdown();

  // Check if already past unlock time on load
  if (new Date(CONFIG.unlockDateTime).getTime() <= Date.now()) {
    isUnlocked = true;
    $("countdownWrap").style.display = "none";
    $("hintText").textContent = "🎉 The surprise is ready! Fill in your details.";
  }
})();
