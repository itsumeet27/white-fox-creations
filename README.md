# Nirbhay Verma — Motion Graphics Portfolio

Premium portfolio for White Fox Creations.

## Live site

**https://itsumeet27.github.io/white-fox-creations/**

- Home: https://itsumeet27.github.io/white-fox-creations/
- About: https://itsumeet27.github.io/white-fox-creations/about/
- Projects: https://itsumeet27.github.io/white-fox-creations/projects/
- Gallery: https://itsumeet27.github.io/white-fox-creations/gallery/

Public URLs do not use `.html`. Older `*.html` links redirect to the folder URLs above.

Every push to `main` runs `.github/workflows/deploy-pages.yml` and republishes automatically.

> Note: `https://white-fox-creations.github.io` only works if a GitHub user/org named `white-fox-creations` owns a repo named `white-fox-creations.github.io`. Until then, the project Pages URL above is the live site.

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`, `http://localhost:8080/about/`, `http://localhost:8080/projects/`, or `http://localhost:8080/gallery/`.

Header and footer are loaded from `partials/header.html` and `partials/footer.html` via `js/site-chrome.js`, so a local server is required (file:// cannot fetch those files).

## Shared header and footer

Edit once; every page picks up the change:

- Navigation: `partials/header.html`
- Contact CTA + copyright bar: `partials/footer.html`
- Shared styles: `css/chrome.css`
- Loader: `js/site-chrome.js`

Each page includes:

```html
<body data-page="home">
  <header class="site-header" id="top" data-site-header></header>
  <!-- page content -->
  <div data-site-footer></div>
  <script src="js/site-chrome.js"></script>
</body>
```

Set `data-page` to `home`, `about`, `projects`, or `gallery` so the matching nav item is marked current.

## Adding a future page (no `.html` in the URL)

1. Create `pagename/index.html` (copy `scripts/page-skeleton.html`).
2. Keep `<base href="../">` so `css/`, `js/`, and `assets/` resolve from the site root.
3. Set `data-page="pagename"` and add a link in `partials/header.html` (`href="pagename/"`).
4. Include `css/chrome.css` and `js/site-chrome.js`, plus the header/footer placeholders.
5. Copy `scripts/html-redirect.html` to `pagename.html` and replace `DEST` with `pagename` so old `.html` bookmarks still work.
6. Add `pagename/` (and the redirect file) to the copy list in `.github/workflows/deploy-pages.yml`.

## Accent

Primary accent: `#FF6600`
