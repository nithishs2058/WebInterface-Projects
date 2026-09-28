import hobbies from "../data/hobbies";
import HobbyCard from "./HobbyCard";

export default function Hobbies() {
  return (
    <section id="hobbies" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title">My Hobbies</h2>
          <p className="section-sub">
            A collection of activities I enjoy in my free time.
          </p>
        </div>

        <div className="hobby-grid">
          {hobbies.map((hobby) => (
            <HobbyCard
              key={hobby.name}
              icon={hobby.icon}
              name={hobby.name}
              description={hobby.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
