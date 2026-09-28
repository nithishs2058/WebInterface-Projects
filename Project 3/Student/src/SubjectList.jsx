function SubjectList() {
  const subjects = ["React", "Java", "Python", "SQL", "DBMS"];

  return (
    <div className="subjects-section">
      <div className="section-title">
        <h2>Current Subjects</h2>
      </div>
      <ul>
        {subjects.map((subject, index) => (
          <li key={index}>
            <span>{index + 1}</span>
            {subject}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectList;
