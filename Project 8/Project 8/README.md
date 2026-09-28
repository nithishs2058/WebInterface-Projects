# Nithish S — Personal Portfolio

A personal portfolio website for **Nithish S**, CSE Student & Technical Engineer, built with **React** and **React Router**.

## Pages

- **Home** — hero introduction with quick links to Projects and Contact
- **About** — background, focus areas, and learning objective
- **Skills** — HTML, CSS, JavaScript, React, React Router, Python, Java, SQL, Git & GitHub
- **Projects** — Form Validator, Student Attendance Tracker, Hostel Room & Complaint Register
- **Contact** — email, phone, location, GitHub, LinkedIn, and a message form

## Tech

- React 18
- React Router 6 (client-side routing, active link highlighting)
- Vite (dev server & build tool)
- Plain CSS (no framework), dark technical theme

## Project structure

```
Nithish-Portfolio/
├── app.jsx           # App entry point, React Router setup, renders to #root
├── portfolio.jsx     # Navbar, Footer, Home, About, Skills, Projects, Contact
├── app.css           # All styling (layout, navbar, cards, forms, responsive)
├── package.json      # Dependencies and npm scripts
├── vite.config.js    # Vite + React plugin configuration
├── index.html        # HTML entry point loaded by Vite
└── README.md
```

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## Notes

- The **Contact** form opens the visitor's default email client (via a `mailto:` link) pre-filled with their message — there is no backend, so this keeps the form fully functional without a server.
- Project "View Project" buttons link to the GitHub profile (`https://github.com/nithishs2058`); update these to specific repository URLs once individual project repos are published.
- Update contact details, skills, or project copy directly inside `portfolio.jsx`.
