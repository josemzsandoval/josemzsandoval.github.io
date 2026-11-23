# josemzsandoval.github.io

Personal portfolio of **Jose Miguel Zambrana Sandoval**, Geospatial Software Engineer & Solution Architect.

🌐 **https://josemzsandoval.github.io**

Built with React + Vite + TypeScript and MapLibre GL JS (OpenFreeMap tiles), deployed to GitHub Pages via GitHub Actions.

## Editing content

All content (headline, summary, jobs, skills, education) lives in [`src/data/profile.ts`](src/data/profile.ts).
Both the website and the printable CV read from it.

```bash
npm install
npm run dev        # local dev server
npm run build      # production build -> dist/
npm run cv:pdf     # regenerate public/cv/Jose_Miguel_Zambrana_CV.pdf from cv.html
                   # (first time: npx playwright install chromium)
```

After changing `profile.ts`, run `npm run cv:pdf` and commit the updated PDF so the "Download CV" button stays in sync.

## Deploy

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
In the repo settings, set **Pages → Source** to **GitHub Actions**.
