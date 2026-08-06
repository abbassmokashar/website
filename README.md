# Abbass Mokashar · Portfolio

A fully animated, dark-themed portfolio inspired by modern interactive portfolio designs (GSAP scroll animations, Lenis smooth scrolling, and a Three.js-powered 3D photo hero with mouse parallax).

**Zero build step**: it's plain HTML/CSS/JS, so it runs anywhere, including **GitHub Pages**.

## 🚀 Deploy to GitHub Pages

1. **Create a repository** on GitHub (e.g. `abbass-portfolio` or, for a personal site at `https://yourusername.github.io`, name it `yourusername.github.io`).

2. **Push this folder** to the repository. From this directory:

   ```bash
   git init
   git add .
   git commit -m "Portfolio v2"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Enable Pages**: go to the repo on GitHub → **Settings → Pages** →
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / folder: `/ (root)`
   - Click **Save**.

4. Wait ~1 minute, then visit:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO/` (project site), or
   - `https://YOUR_USERNAME.github.io/` (if the repo is named `YOUR_USERNAME.github.io`).

That's it: no npm, no build, no configuration files needed. All asset paths (`img/...`, `files/...`, `styles.css`, `script.js`) are relative, so they work from any subfolder URL.

## ✨ Customize

| What | Where |
| --- | --- |
| **Your photo (About section)** | Replace `img/abbass.jpg` with your own portrait (4:5 ratio works best). |
| **Hero 3D cutout** | `img/me.png` is a transparent-background cutout of the portrait (background + watermark removed). The 3D effect (float, parallax tilt, hover 360° turn + glow) lives in `script.js` → `initHero3D()`; the plane auto-fits whatever aspect ratio your cutout has. |
| **Hero fallback (no WebGL)** | `index.html` → `heroPhotoFallback`, the static `img/me.png` cutout shown if WebGL/Three.js is unavailable |
| **Colors** | `styles.css` → `:root` variables (accent, background, fonts) |
| **Dark/light theme** | Click the sun/moon button in the navbar; choice is saved to `localStorage` and follows your OS preference on first visit |
| **Projects** | `script.js` → `projects` array (title, category, image, link, tag, description) |
| **Featured projects** | `script.js` → `projects` array: add `featured: true` to any project to show it in the horizontal "Selected projects" section (order = array order) |
| **Project image sizing** | All project images (featured + grid) share one uniform 16:10 frame with `object-fit: cover` (`styles.css`); drop replacement screenshots into `img/` |
| **Contact / socials / CV** | `index.html`: search for `calendly.com`, `wa.me`, `linkedin`, `mailto:` |
| **Typewriter roles** | `script.js` → `roles` array in `startTypewriter()` |

## 🛠 Tech

- Vanilla HTML / CSS / JS
- [GSAP](https://gsap.com) + ScrollTrigger (scroll animations)
- [Lenis](https://github.com/darkroomengineering/lenis) (smooth scrolling)
- [Three.js](https://threejs.org) (3D photo hero)
- Fonts: Syne + Space Grotesk (Google Fonts, loaded via CDN)

All libraries load from CDNs, so no local installs are required.
