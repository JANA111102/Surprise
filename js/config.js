/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║          BIRTHDAY SURPRISE — CONFIG FILE                 ║
 * ║  Edit ONLY this file to personalise everything!          ║
 * ╚══════════════════════════════════════════════════════════╝
 */

const CONFIG = {

  /* ─── 1. BIRTHDAY PERSON ─────────────────────────────── */
  friendName: "DURGA",          // Her name (shown in the slideshow & final page)
  friendDOB:  "26-07-2026",     // Her date of birth  YYYY-MM-DD  (used to verify input)

  /* ─── 2. UNLOCK DATE & TIME ──────────────────────────── */
  // The exact moment the surprise should unlock and the countdown reaches zero.
  // Format: "YYYY-MM-DDTHH:MM:SS"  (24-hour, local time of the person opening it)
  unlockDateTime: "26-07-2026T00:00:00",

  /* ─── 3. PHOTOS ──────────────────────────────────────── */
  // Place your photos inside the /photos/ folder and list their filenames here.
  // You can add up to ~20 photos (or more). Order = display order.
  photos: [
    "photos/photo1.jpg",
    "photos/photo2.jpg",
    "photos/photo3.jpg",
    "photos/photo4.jpg",
    "photos/photo5.jpg",
    "photos/photo6.jpg",
    "photos/photo7.jpg",
    "photos/photo8.jpg",
    "photos/photo9.jpg",
    "photos/photo10.jpg",
    "photos/photo11.jpg",
    "photos/photo12.jpg",
    "photos/photo13.jpg",
    "photos/photo14.jpg",
    "photos/photo15.jpg",
    "photos/photo16.jpg",
    "photos/photo17.jpg",
    "photos/photo18.jpg",
    "photos/photo19.jpg",
    "photos/photo20.jpg",
  ],

  // Optional caption for each photo (leave "" for no caption)
  captions: [
    "The beginning of us 🌸",
    "That day we laughed till we cried 😂",
    "Remember this adventure? 🌍",
    "Best day ever ☀️",
    "Our favorite spot 🌺",
    "Silly and beautiful 🦋",
    "When we were young and free 🌈",
    "This smile! 😍",
    "Friends forever 💜",
    "That crazy night 🎉",
    "The one who always shows up 💪",
    "You make everything better 🌟",
    "Memories that last forever 📸",
    "Pure happiness 🥰",
    "Together is our favourite place 🏡",
    "So many more to come ✨",
    "Sun, smiles, and you ☀️",
    "A moment I treasure 💎",
    "My person 💖",
    "To infinity and beyond 🚀",
  ],

  /* ─── 4. PHOTO INTERVAL ──────────────────────────────── */
  slideInterval: 5000,          // milliseconds between slides (3000 = 3 seconds)

  /* ─── 5. FINAL BACKGROUND PHOTO ─────────────────────── */
  // This photo appears FULL-SCREEN behind the birthday message on the last page.
  finalPhoto: "photos/photo20.jpg",

  /* ─── 6. BIRTHDAY MESSAGE (max ~500 chars) ───────────── */
  birthdayMessage: `Every moment spent with you is a memory I hold close to my heart. You light up every room you walk into, and the world is a better place because you're in it. On this special day, I want you to know just how much you mean to me — your laughter, your kindness, your strength, and your beautiful soul. Wishing you a birthday as amazing as you are. Here's to you, always! 🎂✨💖`,

  /* ─── 7. COLOUR PALETTE ──────────────────────────────── */
  // Gradient colours cycling through the slideshow background
  gradients: [
    ["#ff9a9e", "#fad0c4"],
    ["#a18cd1", "#fbc2eb"],
    ["#fbc2eb", "#a6c1ee"],
    ["#fddb92", "#d1fdff"],
    ["#96fbc4", "#f9f586"],
    ["#f093fb", "#f5576c"],
    ["#4facfe", "#00f2fe"],
    ["#43e97b", "#38f9d7"],
    ["#fa709a", "#fee140"],
    ["#30cfd0", "#330867"],
  ],

};
