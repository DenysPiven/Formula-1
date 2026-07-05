# Formula 1 · 2026

Interactive reference for the **2026 F1 season** — all 11 teams and 22 drivers with logos, photos, and detailed profiles.

**Live site:** [denyspiven.github.io/Formula-1](https://denyspiven.github.io/Formula-1/)

## Features

- Grid of team cards (4-4-3 layout) with logos and driver photos
- **Driver profiles** — full portrait, stats, bio, team link
- **Team profiles** — headquarters, team principal, power unit, constructor titles, roster
- Works offline (open `index.html` locally) and on GitHub Pages

## Project structure

```
Formula-1/
├── index.html          # Main page
├── js/app.js           # Profile modals & interactions
├── data/
│   ├── f1-2026.json    # Season data (source)
│   └── f1-2026.js      # Data bundle for browsers
└── assets/
    ├── logos/          # Team logos (.webp)
    └── drivers/        # Driver photos (.png / .webp)
```

## Run locally

No build step required. Open `index.html` in a browser, or:

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Update data

Edit `data/f1-2026.json`, then regenerate the JS bundle:

```bash
python3 -c "
import json
with open('data/f1-2026.json') as f: data = json.load(f)
with open('data/f1-2026.js', 'w') as f:
    f.write('window.F1_DATA = ')
    json.dump(data, f, ensure_ascii=False)
    f.write(';\n')
"
```

## Deploy

Pushes to `main` automatically deploy to GitHub Pages via `.github/workflows/pages.yml`.

## Data sources

- Driver & team info: [formula1.com](https://www.formula1.com/)
- Logos & photos: [media.formula1.com](https://media.formula1.com/)
- Grid data: [jolpica-f1 API](https://api.jolpi.ca/)

## License

Team logos and driver images are property of Formula One Licensing B.V. This project is for personal / educational use only.
