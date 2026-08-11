# Motion Graphics Artist Portfolio

Premium single-page portfolio. Open `index.html` locally, or view the published site after GitHub Pages deploys.

## Live site

Target production URL: **https://white-fox-creations.github.io**

Every push to `main` triggers GitHub Actions (`.github/workflows/deploy-pages.yml`) and republishes the site.

### One-time GitHub setup for `white-fox-creations.github.io`

1. Create a GitHub user or organization named **`white-fox-creations`**.
2. Create a repository named exactly **`white-fox-creations.github.io`** (this name is required for that URL).
3. Push this project’s `main` branch to that repository.
4. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. Confirm the Actions workflow `Deploy GitHub Pages` runs successfully.

Until that org/repo exists, merging to `main` on this repo can still publish to:

`https://itsumeet27.github.io/motion-graphics-artist-portfolio/`

(after enabling Pages with the GitHub Actions source on this repository).

## Run locally

```bash
# optional local server
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Structure

```text
index.html
css/style.css
css/responsive.css
js/main.js
js/animations.js
js/gallery.js
js/cursor.js
assets/images/
assets/videos/
assets/icons/
.github/workflows/deploy-pages.yml
```

## Replace assets

- Hero: `assets/images/hero-cinematic.jpg`
- Projects: `assets/images/project-*.jpg`
- Gallery: `assets/images/gallery-0*.jpg`
- Portrait / signature: `assets/images/portrait.jpg`, `signature.png`
- Showreel: `assets/videos/showreel.mp4`

Accent color: `#FF6600`
