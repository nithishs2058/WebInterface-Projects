import { createContext, useContext } from "react";

/* ------------------------------------------------------------------
   STEP 1 — CREATE the context
   createContext() makes a shared "channel" for the student data.
   (STEP 2, the Provider, lives in app.jsx.)
------------------------------------------------------------------- */
export const StudentContext = createContext(null);

// Overall letter grade from the percentage
function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  if (percentage >= 40) return "E";
  return "F";
}

const PASS_MARK = 35; // minimum marks needed in every subject

/* ------------------------------------------------------------------
   STEP 3 — CONSUME the context
   useContext() reads the student data. No props are passed in.
------------------------------------------------------------------- */
export default function StudentReportCard() {
  const student = useContext(StudentContext); // <-- consume

  // Values calculated from the shared data
  const totalObtained = student.subjects.reduce((sum, s) => sum + s.marks, 0);
  const totalMax = student.subjects.reduce((sum, s) => sum + s.maxMarks, 0);
  const percentage = (totalObtained / totalMax) * 100;
  const overallGrade = getGrade(percentage);
  const passed = student.subjects.every((s) => s.marks >= PASS_MARK);

  return (
    <article className="report-card">
      <h1>Student Report Card</h1>

      {/* Student details */}
      <section className="details">
        <div>
          <span className="label">Student Name</span>
          <span className="value">{student.name}</span>
        </div>
        <div>
          <span className="label">Roll Number</span>
          <span className="value">{student.rollNumber}</span>
        </div>
        <div>
          <span className="label">Grade</span>
          <span className="value">{student.grade}</span>
        </div>
      </section>

      {/* Subjects and marks */}
      <section>
        <h2>Subjects and Marks</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th className="num">Marks Obtained</th>
                <th className="num">Maximum Marks</th>
              </tr>
            </thead>
            <tbody>
              {student.subjects.map((subject) => (
                <tr key={subject.name}>
                  <td>{subject.name}</td>
                  <td className="num">{subject.marks}</td>
                  <td className="num">{subject.maxMarks}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td className="num">{totalObtained}</td>
                <td className="num">{totalMax}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Summary */}
      <section>
        <h2>Summary</h2>
        <div className="summary">
          <div>
            <span className="label">Total Marks</span>
            <span className="value">
              {totalObtained} / {totalMax}
            </span>
          </div>
          <div>
            <span className="label">Percentage</span>
            <span className="value">{percentage.toFixed(2)}%</span>
          </div>
          <div>
            <span className="label">Overall Grade</span>
            <span className="value">{overallGrade}</span>
          </div>
          <div>
            <span className="label">Result</span>
            <span className={`value result ${passed ? "pass" : "fail"}`}>
              {passed ? "Pass" : "Fail"}
            </span>
          </div>
        </div>
      </section>
    </article>
  );
}
