import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "out");
const port = 4173;
const locales = ["ru", "en"];

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
      await page.goto(`http://localhost:${port}/${locale}/pdf/`, {
        waitUntil: "networkidle",
      });
      const filePath = path.join(outDir, `pavel-kostin-cv-${locale}.pdf`);
      await page.pdf({ path: filePath, format: "A4", printBackground: true });
      console.log(`Generated ${path.relative(process.cwd(), filePath)}`);
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
