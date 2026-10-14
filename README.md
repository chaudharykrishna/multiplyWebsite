# Multiply website

A static website built with HTML, CSS, and JavaScript. No build step is required.

## Directory structure

```text
Multiply-website/
|-- index.html             Home page
|-- about.html             Team and company page
|-- spotsafe360.html       Product page
|-- contact.html           Contact page
|-- privacy.html           Privacy page
|-- 404.html               Not-found page
|-- site.webmanifest       Site metadata and app icons
|-- sitemap.xml            Sitemap for deployment
|-- README.md              Project guide
`-- assets/
    |-- css/               Shared styles (styles.css)
    |-- js/                Site behavior (main.js) and animations (anim.js)
    |-- icons/             Favicons, touch icons, and manifest icons
    |-- images/            Website and social-preview images
    |-- logos/             Multiply and SpotSafe 360 logos
    `-- team/              Team portraits in JPG and WebP formats
```

## Preview and maintenance

Open `index.html` in a browser, or run `python -m http.server 8000` from this directory and visit `http://localhost:8000`.

Keep the HTML pages at the root to preserve their public URLs. Place shared files in the appropriate `assets/` folder and update references when moving or renaming files. Image paths in CSS are relative to `assets/css/`; asset paths in HTML are relative to the page.

Edit contact details, social links, and the game URL in `assets/js/main.js`.

Deploy this directory as the static site root. Before deployment, replace the relative sitemap locations with the full live URLs as described in `sitemap.xml`.
