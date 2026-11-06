// Copies the template into a new folder and points it at the released kit.
// Usage: bun run new-site ../my-app/website
import { cp, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve, sep } from 'node:path';

const target = process.argv[2];
if (!target) {
  console.error('Usage: bun run new-site <folder>');
  process.exit(1);
}
const root = dirname(import.meta.dir);
const destination = resolve(target);
await cp(join(root, 'template'), destination, {
  recursive: true,
  errorOnExist: true,
  force: false,
  filter: (path) =>
    !path
      .split(sep)
      .some((part) =>
        ['node_modules', 'dist', '.astro', '.wrangler'].includes(part),
      ),
});

interface PackageJson {
  name: string;
  version: string;
  dependencies: Record<string, string>;
}
const readJson = async (path: string) =>
  JSON.parse(await readFile(path, 'utf8')) as PackageJson;
const kit = await readJson(join(root, 'package.json'));
const file = join(destination, 'package.json');
const app = await readJson(file);
const name = basename(dirname(destination));
app.name = `${name}-website`;
app.dependencies['@robin-build/landing-kit'] =
  `github:robin-liquidium/landing-kit#v${kit.version}`;
await writeFile(file, `${JSON.stringify(app, null, 2)}\n`);

console.log(`Created ${destination}.
Next: set the site in src/layouts/Site.astro, the colours in src/styles/site.css,
the domain in wrangler.jsonc and astro.config.mjs, then bun install && bun run dev.`);
