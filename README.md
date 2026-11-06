# Landing kit

The shared layout, design and footer behind the robin.build landing pages:
[Dayline](https://dayline.robin.build), [Stillmic](https://stillmic.robin.build),
[Redmi Buds Bar](https://buds.robin.build) and [Satoma Sans](https://satoma.robin.build).
The footer also links to [Fungus Inc.](https://fungus.build).

Each site is a small [Astro](https://astro.build) project that installs this kit
at a tagged version. The kit gives it:

- **`Page.astro`**: the document head, header, and footer with the
  "Made by Robin. Also behind…" line and the donation addresses.
- **`chrome.css`**: Satoma Sans, colour tokens, dark mode and the header/footer
  styles. Loaded by `Page.astro`.
- **`design.css`**: the shared page design: hero, buttons, numbers, feature
  cards, questions, closing call and text pages. Optional.
- **Components**: `Stats`, `Features`, `Faq`, `DownloadIcon`.
- **`projects.ts`**: every project and the donation addresses, in one place.

## Start a new site

```sh
bun run new-site ../my-app/website
```

This copies [`template/`](template) and points it at the current kit release.
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
