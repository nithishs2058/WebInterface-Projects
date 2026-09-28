function StudentCard(props) {
  return (
    <div className="student-card">
      <div className="profile">
        <img src={props.photo} alt="Student" />
        <div className="profile-info">
          <h2>{props.name}</h2>
          <p className="department">{props.dept} Department</p>
          <p>Register No : {props.regno}</p>
          <p>Year : {props.year}</p>
        </div>
      </div>

      <div className="student-stats">
        <div className="stat-box">
          <span>CGPA</span>
          <strong className="cgpa">{props.cgpa}</strong>
        </div>

        <div className="stat-box">
          <span>Attendance</span>
          <strong className="attendance">{props.att}%</strong>
        </div>

        <div className="stat-box">
          <span>Semester Status</span>
          {props.att >= 75 ? (
            <strong className="eligible">Eligible</strong>
          ) : (
            <strong className="not-eligible">Not Eligible</strong>
          )}
        </div>

        <div className="stat-box">
          <span>Placement</span>
          {props.cgpa >= 8 ? (
            <strong className="eligible">Eligible</strong>
          ) : (
            <strong className="not-eligible">Need Improvement</strong>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentCard;
