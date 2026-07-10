import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

// Runs before every production build: Next.js's static export (output:
// 'export') fails outright if a dynamic Route Handler like Keystatic's
// admin API is present, so it must not exist in app/ at build time.
const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";

for (const dir of ["app/keystatic", "app/api/keystatic"]) {
  fs.rmSync(path.join(root, dir), { recursive: true, force: true });
}

console.log("Keystatic admin routes removed from app/ for the static build.");
