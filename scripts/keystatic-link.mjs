import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

// Keystatic's admin UI needs a live Node server (it reads/writes files via
// an API route) and cannot be part of a static export, so its route files
// live outside app/ and are only copied in for local dev. See scripts/keystatic-unlink.mjs.
const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const src = path.join(root, "keystatic-admin");

const copies = [
  ["keystatic.jsx", "app/keystatic/keystatic.jsx"],
  ["layout.jsx", "app/keystatic/layout.jsx"],
  ["page.jsx", "app/keystatic/[[...params]]/page.jsx"],
  ["route.js", "app/api/keystatic/[...params]/route.js"],
];

for (const [from, to] of copies) {
  const dest = path.join(root, to);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join(src, from), dest);
}

console.log("Keystatic admin routes linked into app/ for local dev.");
