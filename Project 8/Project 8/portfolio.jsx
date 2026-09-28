import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Shared data                                                         */
/* ------------------------------------------------------------------ */

const CONTACT = {
  email: "nithish2058@gmail.com",
  phone: "9488224652",
  location: "Chennai, India",
  github: "https://github.com/nithishs2058",
  linkedin: "https://www.linkedin.com/in/nithish-s-17abb3386/?locale=%5D",
};

const SKILLS = [
  { name: "HTML", category: "Markup" },
  { name: "CSS", category: "Styling" },
  { name: "JavaScript", category: "Language" },
  { name: "React", category: "Library" },
  { name: "React Router", category: "Library" },
  { name: "Python", category: "Language" },
  { name: "Java", category: "Language" },
  { name: "SQL", category: "Database" },
  { name: "Git & GitHub", category: "Tooling" },
];

const PROJECTS = [
  {
    name: "Form Validator",
    description:
      "A web-based form validation tool that checks required fields, verifies input formats such as email and phone numbers, and displays clear, real-time validation messages as the user types. Built to reduce input errors and make forms feel more responsive and trustworthy before data ever reaches a server.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    name: "Student Attendance Tracker",
    description:
      "An interface for recording and reviewing student attendance, with present and absent status organized by date and class. The layout groups records so teachers can scan attendance patterns at a glance instead of digging through spreadsheets.",
    tech: ["HTML", "CSS", "JavaScript", "SQL"],
  },
  {
    name: "Hostel Room & Complaint Register",
    description:
      "A management system for hostel room records and student complaints, supporting adding, editing, searching, and filtering entries, along with complaint-status tracking from raised to resolved. Designed to replace paper registers with a searchable digital log.",
    tech: ["Java", "SQL"],
  },
];

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/skills", label: "Skills" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <span className="navbar-logo-mono">NS</span>
          <span className="navbar-logo-text">Nithish S</span>
        </Link>

        <button
          className={`navbar-toggle ${open ? "is-open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navbar-links ${open ? "is-open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "is-active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          &copy; {year} Nithish S. Built with React &amp; React Router.
        </p>
        <div className="footer-links">
          <a href={CONTACT.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${CONTACT.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Home                                                                 */
/* ------------------------------------------------------------------ */

export function Home() {
  return (
    <section className="page hero-page">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">Chennai, India</p>
          <h1>Hi, I'm Nithish S</h1>
          <h2 className="hero-role">CSE Student &amp; Technical Engineer</h2>
          <p className="hero-intro">
            I'm a Computer Science Engineering student who enjoys building
            practical, working software rather than just studying theory.
            My focus is on web development and problem solving &mdash;
            turning everyday, real-world problems into clean interfaces and
            reliable code, from form validation tools to record-management
            systems.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              View Projects
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Me
            </Link>
          </div>
        </div>

        <div className="hero-panel" aria-hidden="true">
          <div className="terminal">
            <div className="terminal-bar">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
              <span className="terminal-title">profile.json</span>
            </div>
            <pre className="terminal-body">
{`{
  "name": "Nithish S",
  "role": "CSE Student",
  "focus": [
    "Web Development",
    "Problem Solving",
    "Applied Software"
  ],
  "location": "Chennai",
  "status": "open to opportunities"
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

export function About() {
  const facts = [
    { label: "Role", value: "CSE Student & Technical Engineer" },
    { label: "Focus", value: "Web Development & Applied Software" },
    { label: "Location", value: "Chennai, India" },
    { label: "Status", value: "Open to internships & entry-level roles" },
  ];

  return (
    <section className="page">
      <div className="page-header">
        <h1>About Me</h1>
        <p className="page-subtitle">
          A little more about who I am and what I'm working toward.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm Nithish S, a Computer Science Engineering student based in
            Chennai with a strong interest in software development, web
            technologies, and practical problem solving. I like understanding
            how a system works end to end &mdash; from the way a user fills
            in a form, to how that data is validated, stored, and displayed
            back to them.
          </p>
          <p>
            Alongside my coursework, I work as a technical engineer on
            small, applied projects: tools that validate data, track
            records, and organize information that would otherwise live in
            spreadsheets or paper registers. I care less about using the
            newest technology for its own sake, and more about whether the
            final product is dependable and genuinely useful to the person
            using it.
          </p>
          <p>
            My current learning objective is to deepen my skills in
            full-stack web development &mdash; particularly React and
            database-backed applications &mdash; while continuing to build
            projects that solve real problems I encounter around me, whether
            that's in a classroom, a hostel, or a student organization.
          </p>
        </div>

        <div className="about-facts">
          {facts.map((fact) => (
            <div className="fact-card" key={fact.label}>
              <span className="fact-label">{fact.label}</span>
              <span className="fact-value">{fact.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Skills                                                               */
/* ------------------------------------------------------------------ */

export function Skills() {
  return (
    <section className="page">
      <div className="page-header">
        <h1>Skills</h1>
        <p className="page-subtitle">
          Languages, tools, and libraries I use to build and ship projects.
        </p>
      </div>

      <div className="skills-grid">
        {SKILLS.map((skill) => (
          <div className="skill-card" key={skill.name}>
            <span className="skill-category">{skill.category}</span>
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects                                                             */
/* ------------------------------------------------------------------ */

export function Projects() {
  return (
    <section className="page">
      <div className="page-header">
        <h1>Projects</h1>
        <p className="page-subtitle">
          A few things I've built while learning by doing.
        </p>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <article className="project-card" key={project.name}>
            <h3>{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.tech.map((t) => (
                <span className="tech-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline project-btn"
            >
              View Project
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                              */
/* ------------------------------------------------------------------ */

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section className="page">
      <div className="page-header">
        <h1>Contact</h1>
        <p className="page-subtitle">
          Have a project, an opportunity, or just a question? Reach out.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">Email</span>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Phone</span>
            <a href={`tel:+91${CONTACT.phone}`}>{CONTACT.phone}</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Location</span>
            <span>{CONTACT.location}</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">GitHub</span>
            <a href={CONTACT.github} target="_blank" rel="noreferrer">
              github.com/nithishs2058
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-label">LinkedIn</span>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
              linkedin.com/in/nithish-s
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </label>

          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="form-field">
            <span>Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to say?"
              rows={5}
              required
            ></textarea>
          </label>

          <button type="submit" className="btn btn-primary">
            Send Message
          </button>

          {sent && (
            <p className="form-success">
              Thanks, {form.name || "there"}! Your email client should now be
              open with this message ready to send.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
