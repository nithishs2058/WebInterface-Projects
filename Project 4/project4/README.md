# Nithish | My Hobby Space

A personal hobby webpage for Nithish S, built with React + Vite.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173) in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    Navbar.jsx
    Home.jsx
    About.jsx
    Hobbies.jsx
    HobbyCard.jsx
    Footer.jsx
  data/
    hobbies.js
  App.jsx
  main.jsx
  index.css
```

Hobby content lives in `src/data/hobbies.js` and is rendered dynamically —
add or edit a hobby there and it will appear automatically in the grid.
