# Roblox UI Designer Portfolio

A static portfolio site for a Roblox Studio UI designer, hosted on GitHub Pages. Plain HTML/CSS/JS with no build step.

## Customize

Everything personal is in **`js/config.js`**: name, tagline, stats, skills, projects, pricing and contact links.

### Add your own screenshots
1. Put an image in `assets/projects/`, e.g. `assets/projects/shop.png`.
2. In `js/config.js`, set that project's `image: "assets/projects/shop.png"`.

If a project has no `image`, it shows a built-in CSS mockup. Pick one with `mock`: `shop`, `inventory`, `hud`, `menu`, `settings` or `rewards`.

## Publish on GitHub Pages
Go to repo **Settings → Pages**, set **Source: Deploy from a branch**, then pick **Branch: `main`** and **Folder: `/ (root)`**.
The site goes live at `https://<your-username>.github.io/roblox-ui-portfolio/`.

## Preview locally
```bash
python3 -m http.server 8080
# open http://localhost:8080
```
