import { useState } from "react";

function Tracker() {
  const studentList = Array.from({ length: 10 }, (_, index) => ({
    rollNo: String(index + 1).padStart(2, "0"),
    name: `Student ${String(index + 1).padStart(2, "0")}`
  }));

  const [attendance, setAttendance] = useState({});

  const markAttendance = (rollNo, status) => {
    setAttendance((current) => ({
      ...current,
      [rollNo]: status
    }));
  };

  const presentCount = Object.values(attendance).filter(
    (status) => status === "present"
  ).length;

  const absentCount = Object.values(attendance).filter(
    (status) => status === "absent"
  ).length;

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>Student Attendance Tracker</h1>
          <p>Daily Attendance Management</p>
        </div>
      </header>

      <main className="container">
        <section className="intro-card">
          <div className="intro-details">
            <div>
              <span>Class</span>
              <strong>CSE</strong>
            </div>

            <div>
              <span>Batch</span>
              <strong>04</strong>
            </div>

            <div>
              <span>Total Students</span>
              <strong>10</strong>
            </div>
          </div>

          <p>
            Use this page to mark daily attendance for every student in the
            class.
          </p>
        </section>

        <section className="attendance-card">
          <div className="section-title">
            <h2>Attendance</h2>
            <span>{presentCount + absentCount} / 10 marked</span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>

              <tbody>
                {studentList.map((student) => (
                  <tr key={student.rollNo}>
                    <td>{student.rollNo}</td>
                    <td>{student.name}</td>

                    <td>
                      <div className="attendance-buttons">
                        <button
                          className={`present-button ${
                            attendance[student.rollNo] === "present"
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            markAttendance(student.rollNo, "present")
                          }
                        >
                          Present
                        </button>

                        <button
                          className={`absent-button ${
                            attendance[student.rollNo] === "absent"
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            markAttendance(student.rollNo, "absent")
                          }
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="summary-card">
          <h2>Attendance Summary</h2>

          <div className="summary-grid">
            <div className="summary-item total">
              <span>Total Students</span>
              <strong>10</strong>
            </div>

            <div className="summary-item present">
              <span>Present</span>
              <strong>{presentCount}</strong>
            </div>

            <div className="summary-item absent">
              <span>Absent</span>
              <strong>{absentCount}</strong>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Student Attendance Tracker</p>
      </footer>
    </div>
  );
}

export default Tracker;