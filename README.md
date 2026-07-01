# 🎂 Birthday Surprise — Setup Guide

## File Structure

```
birthday-surprise/
│
├── index.html          ← Open this in a browser to run the surprise
│
├── css/
│   └── style.css       ← All styles & animations (don't need to edit)
│
├── js/
│   ├── config.js       ← ⭐ EDIT THIS FILE to personalise everything
│   └── app.js          ← All logic (don't need to edit)
│
└── photos/
    ├── photo1.jpg      ← Add your 20 photos here
    ├── photo2.jpg
    ├── photo3.jpg
    │   ... (up to photo20.jpg or more)
    └── photo20.jpg     ← This one also becomes the final page background
```

---

## ✅ Quick Setup (5 steps)

### 1. Add Photos
- Put all your photos inside the `photos/` folder
- Name them `photo1.jpg`, `photo2.jpg` … `photo20.jpg`
- They can be `.jpg`, `.png`, or `.webp`

### 2. Open `js/config.js` and edit:

| Setting | What to change |
|---|---|
| `friendName` | Her exact name (case-insensitive match) |
| `friendDOB` | Her date of birth as `"YYYY-MM-DD"` |
| `unlockDateTime` | The exact moment it unlocks, e.g. midnight on her birthday |
| `photos[]` | List of your photo filenames |
| `captions[]` | A caption for each photo (or leave `""`) |
| `finalPhoto` | The photo shown on the final message page |
| `birthdayMessage` | Your personal message (up to ~500 chars) |
| `slideInterval` | Time per photo in ms (3000 = 3 seconds) |

### 3. Set the Unlock Time
```js
unlockDateTime: "2025-07-15T00:00:00",
```
Change this to the birthday midnight or whenever you want it to open.
The countdown will count down TO this exact moment.
Once the time passes, the OK button activates automatically.

### 4. Test it
- Open `index.html` in any browser (Chrome / Edge / Firefox)
- **To test without waiting:** temporarily set `unlockDateTime` to a past date

### 5. Send to your friend
- Zip the entire `birthday-surprise/` folder
- Send the zip file to her
- She unzips it, opens `index.html` in her browser
- The countdown runs on her device's local clock ✨

---

## 🎨 How it works

**Page 1 — Entry**
- Animated floating hearts background
- Live countdown timer ticking to unlock moment
- Name + DOB fields must match config exactly
- OK button only enables when: ✅ details match + ✅ unlock time passed

**Page 2 — Slideshow**
- 20 photos auto-advance every 3 seconds
- 3D flip transition between photos
- Blurred mirror image background syncs with each photo
- Colourful gradient background cycles per slide
- Progress bar shows time until next photo
- Clickable dot navigation to jump to any photo

**Page 3 — Final Message**
- Last photo fills the screen with slow zoom animation
- Birthday wish glows and pulses
- Your message types out letter by letter
- Balloons float up from the bottom
- Confetti bursts across the screen

---

## 🛠 Troubleshooting

**Photos not showing?**
→ Make sure filenames in `config.js` exactly match the files in `photos/`

**Countdown shows wrong time?**
→ The countdown uses the device's local clock. Make sure your friend's device time is correct.

**Want more than 20 photos?**
→ Just add more entries to the `photos[]` and `captions[]` arrays in config.js

**Works offline?**
→ Yes! No internet needed. Everything runs locally.
