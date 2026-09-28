export default function About() {
  return (
    <section id="about" className="section section-alt">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          <div className="about-copy">
            <p>
              I'm Nithish S, an 18-year-old CSE student who enjoys discovering
              how technology works while exploring creative ways to express
              ideas. Beyond academics, I believe hobbies help develop
              curiosity, imagination, focus, and a balanced lifestyle.
            </p>

            <ul className="about-facts">
              <li>
                <span className="label">Name</span>
                <span className="value">Nithish S</span>
              </li>
              <li>
                <span className="label">Age</span>
                <span className="value">18</span>
              </li>
              <li>
                <span className="label">Education</span>
                <span className="value">Computer Science Engineering</span>
              </li>
              <li>
                <span className="label">Interests</span>
                <span className="value">Technology &amp; Creativity</span>
              </li>
            </ul>
          </div>

          <div className="about-card">
            <blockquote>
              "I enjoy exploring new ideas, developing technical skills, and
              using my free time to learn, create, and improve myself."
            </blockquote>
            <cite>— Nithish S</cite>
          </div>
        </div>
      </div>
    </section>
  );
}
