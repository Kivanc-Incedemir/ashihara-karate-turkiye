#!/usr/bin/env node
/* =========================================================================
   build-gallery.mjs
   Scans ../photos for image files and (re)writes photos/manifest.json.

   - New images are added with sensible defaults.
   - Existing entries keep their category + captions (edit manifest.json
     freely; re-running will NOT overwrite what you typed).
   - Images removed from the folder are dropped from the manifest.

   Category is guessed from the filename: put words like "grading",
   "sinav", "event", "seminar", "turnuva" in the name and it's auto-tagged.

   Run from the project root:   node scripts/build-gallery.mjs
   Or double-click:            build-gallery.bat
   ========================================================================= */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PHOTOS_DIR = join(ROOT, "photos");
const MANIFEST = join(PHOTOS_DIR, "manifest.json");

const IMG_RE = /\.(jpe?g|png|webp|gif|avif|svg)$/i;

function guessCategory(name) {
  const n = name.toLowerCase();
  if (/(grading|sinav|sınav|kusak|kuşak|belt|dan|exam)/.test(n)) return "grading";
  if (/(event|seminar|turnuva|tournament|camp|kamp|gosteri|gösteri)/.test(n)) return "event";
  return "training";
}

function niceCaption(file) {
  return file
    .replace(IMG_RE, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

const files = (await readdir(PHOTOS_DIR))
  .filter((f) => IMG_RE.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

let existing = {};
if (existsSync(MANIFEST)) {
  try {
    const prev = JSON.parse(await readFile(MANIFEST, "utf8"));
    for (const p of prev.photos || []) existing[p.file] = p;
  } catch {
    console.warn("! Could not parse existing manifest.json — rebuilding fresh.");
  }
}

const photos = files.map((file) => {
  if (existing[file]) return existing[file]; // keep hand-edited data
  const base = niceCaption(file);
  return { file, category: guessCategory(file), tr: base, en: base };
});

await writeFile(MANIFEST, JSON.stringify({ photos }, null, 2) + "\n", "utf8");

console.log(`✓ manifest.json updated — ${photos.length} photo(s).`);
const added = files.filter((f) => !existing[f]);
if (added.length) console.log(`  + added: ${added.join(", ")}`);
if (!files.length) console.log("  (photos/ folder is empty — add .jpg/.png files and run again.)");
