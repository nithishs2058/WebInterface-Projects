export default function HobbyCard({ icon, name, description }) {
  return (
    <article className="hobby-card">
      <span className="hobby-icon" role="img" aria-hidden="true">
        {icon}
      </span>
      <h3 className="hobby-name">{name}</h3>
      <p className="hobby-desc">{description}</p>
    </article>
  );
}
