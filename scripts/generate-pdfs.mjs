import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { FOCUSES } from "../lib/focuses.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "out");
const publicDir = path.join(__dirname, "..", "public");
const port = 4173;
const locales = ["ru", "en"];
const focuses = FOCUSES;
// A4 height in CSS px, at the 96px/inch mapping Chromium's page.pdf() uses.
const A4_HEIGHT_PX = 297 * (96 / 25.4);

const pdfPath = (locale, focus) =>
  focus === "fullstack" ? `${locale}/pdf` : `${locale}/${focus}/pdf`;
const pdfFileName = (locale, focus) =>
  focus === "fullstack" ? `pavel-kostin-cv-${locale}.pdf` : `pavel-kostin-cv-${locale}-${focus}.pdf`;

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        // server not up yet
      }
      if (Date.now() - start > timeoutMs) {
        return reject(new Error(`Timed out waiting for ${url}`));
      }
      setTimeout(check, 300);
    };
    check();
  });
}

async function main() {
  if (!fs.existsSync(outDir)) {
    throw new Error(`Static export not found at ${outDir}. Run "next build" first.`);
  }

  const server = spawn("npx", ["serve", outDir, "-l", String(port)], {
    stdio: "ignore",
  });

  try {
    await waitForServer(`http://localhost:${port}/ru/pdf/`);

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 1600 });
    // Use screen CSS (not print) so the PDF matches the live site design.
    await page.emulateMedia({ media: "screen" });

    for (const locale of locales) {
      for (const focus of focuses) {
        await page.goto(`http://localhost:${port}/${pdfPath(locale, focus)}/`, {
          waitUntil: "networkidle",
        });

        // Pad the resume card to an exact whole number of A4 pages, so the
        // columns' background stretches all the way to the bottom of the
        // last page instead of stopping wherever the content happens to end.
        const contentHeight = await page.evaluate(() => document.body.scrollHeight);
        const pageCount = Math.ceil(contentHeight / A4_HEIGHT_PX);
        await page.addStyleTag({
          content: `.resume { min-height: ${pageCount * A4_HEIGHT_PX}px !important; }`,
        });

        const fileName = pdfFileName(locale, focus);
        const filePath = path.join(outDir, fileName);
        await page.pdf({
          path: filePath,
          format: "A4",
          printBackground: true,
          margin: { top: "0", bottom: "0", left: "0", right: "0" },
        });
        // Also copy into public/ so "next dev" (which doesn't run this script)
        // serves a real PDF instead of 404ing on the download link.
        fs.copyFileSync(filePath, path.join(publicDir, fileName));
        console.log(`Generated ${path.relative(process.cwd(), filePath)}`);
      }
    }

    await browser.close();
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
