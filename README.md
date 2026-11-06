# Landing kit

The shared layout, design and footer behind the robin.build landing pages:
[Dayline](https://dayline.robin.build), [Stillmic](https://stillmic.robin.build),
[Redmi Buds Bar](https://buds.robin.build) and [Satoma Sans](https://satoma.robin.build).
The footer also links to [Fungus Inc.](https://fungus.build).

Each site is a small [Astro](https://astro.build) project that installs this kit
at a tagged version. The kit gives it:

- **`Page.astro`**: the document head with search and social tags,
  structured data for the app, the header, and the footer with the
  "Made by Robin. Also behind…" line, donation addresses and a large wordmark.
- **`chrome.css`**: Satoma Sans, colour tokens, dark mode and the header and
  footer styles. Loaded by `Page.astro`.
- **`design.css`**: the shared page design. Optional.
- **Components**, all prefixed `rb-` in CSS:
  - `Hero`: a headline that can fill the page width (`fit`), lede, actions,
    and a slot for the product's signature visual.
  - `Section`: a heading with an optional intro, split or stacked.
  - `Facts`: large numbers with labels.
  - `FeatureList`: titled rows in two columns.
  - `MediaRows`: alternating screenshot and text rows.
  - `Faq`: questions with FAQ structured data for search engines.
  - `Closing`: a closing line and a full-width download bar.
  - `Support`, `DownloadIcon`.
- **`projects.ts`**: every project and the donation addresses, in one place.

Each site adds one signature visual of its own (Stillmic's listening demo,
Buds' popover over rings, Dayline's dawn), sets its colours, and composes the
page from these components. Add `@astrojs/sitemap` and a `robots.txt`, as the
template does.

## Start a new site

```sh
bun run new-site ../my-app/website
```

This copies [`template/`](template) and points it at the current kit release.
The copy includes the lint, format and type-check setup, and a CI workflow in
`.github/workflows/website.yml` to move to the repository's root.
Then set the site in `src/layouts/Site.astro`, its colours in
`src/styles/site.css`, and its domain in `wrangler.jsonc` and
`astro.config.mjs`.

## Theme a site

Override the tokens from [`chrome.css`](src/styles/chrome.css) in the site's
own stylesheet:

```css
:root {
  --accent: #0a66e4;
  --accent-hover: #0857c4;
}
@media (prefers-color-scheme: dark) {
  :root[data-auto-dark] {
    --accent: #6aa8ff;
  }
}
```

`--font-display` sets the heading font, `--shell` the page width. Set
`dark: false` on the site to stay light.

## Release and upgrade

1. Change the kit, bump `version` in `package.json`, merge, and tag it
   (`git tag v0.2.0 && git push --tags`).
2. In each site: `bun add github:robin-liquidium/landing-kit#v0.2.0`, check the
   pages, deploy.

New projects go in `src/projects.ts`; every site picks them up on its next
upgrade.

## Develop

```sh
bun install
bun run build   # builds the template against the local kit
bun run check && bun run lint && bun run fmt:check
```

Satoma Sans is a modified Albert Sans under the SIL Open Font License; see
[`src/fonts/satoma-sans-OFL.txt`](src/fonts/satoma-sans-OFL.txt). Everything
else is MIT.
