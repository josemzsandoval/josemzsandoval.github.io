// Builds the site, serves dist/ with Vite's preview server, prints cv.html to PDF.
// Usage: npm run cv:pdf   (first time only: npx playwright install chromium)
import { build, preview } from 'vite';
import { chromium } from 'playwright';

const OUT = 'public/cv/Jose_Miguel_Zambrana_CV.pdf';

await build({ logLevel: 'warn' });
const server = await preview({ preview: { port: 4179, strictPort: true }, logLevel: 'warn' });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto('http://localhost:4179/cv.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: OUT, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log(`✔ Wrote ${OUT}`);
} finally {
  await browser.close();
  await server.close();
}
