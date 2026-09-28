export default function Home() {
  return (
    <section id="home" className="hero">
      <div className="wrap hero-inner">
        <div>
          <p className="hero-eyebrow reveal reveal-1">My Hobby Space</p>
          <h1 className="hero-name reveal reveal-2">Nithish S</h1>
          <p className="hero-tagline reveal reveal-3">
            A CSE student exploring technology, creativity, and the little
            things that make everyday life interesting.
          </p>
          <p className="hero-intro reveal reveal-3">
            This is a small corner of the internet where I keep track of the
            things I enjoy outside of coursework — from music and drawing to
            code and quiet evenings with a good book.
          </p>
          <button
            className="hero-cta reveal reveal-4"
            onClick={() =>
              document.getElementById("hobbies")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore My Hobbies
          </button>
        </div>

        <div className="hero-strata reveal reveal-2" aria-hidden="true">
          <svg viewBox="0 0 480 400" preserveAspectRatio="xMidYMid slice">
            <rect width="480" height="400" fill="#EDE7D9" />
            <path d="M0 40 C 120 20, 360 60, 480 30 L 480 90 C 360 120, 120 80, 0 100 Z" fill="#DFD5BF" />
            <path d="M0 120 C 140 150, 340 100, 480 130 L 480 170 C 340 145, 140 190, 0 165 Z" fill="#C7B99B" />
            <path d="M0 190 C 160 165, 320 220, 480 195 L 480 250 C 320 275, 160 220, 0 245 Z" fill="#A99878" />
            <path d="M0 270 C 130 300, 350 250, 480 280 L 480 330 C 350 305, 130 350, 0 320 Z" fill="#8C6A46" />
            <path d="M0 340 C 150 320, 330 365, 480 345 L 480 400 L 0 400 Z" fill="#74562F" />
          </svg>
        </div>
      </div>
    </section>
  );
}
