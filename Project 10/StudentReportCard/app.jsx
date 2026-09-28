import { useState } from "react";
import StudentReportCard, { StudentContext } from "./student.jsx";

export default function App() {
  // Sample student data, kept in state
  const [student] = useState({
    name: "Ananya Krishnan",
    rollNumber: "10A-017",
    grade: "Grade 10",
    subjects: [
      { name: "English", marks: 82, maxMarks: 100 },
      { name: "Mathematics", marks: 91, maxMarks: 100 },
      { name: "Science", marks: 78, maxMarks: 100 },
      { name: "Social Studies", marks: 85, maxMarks: 100 },
      { name: "Computer Science", marks: 95, maxMarks: 100 },
    ],
  });

  /* ----------------------------------------------------------------
     STEP 2 — PROVIDE the context
     StudentContext.Provider shares `student` with every component
     inside it. StudentReportCard receives no props: it reads the data
     with useContext().
  ----------------------------------------------------------------- */
  return (
    <StudentContext.Provider value={student}>
      <main className="app">
        <StudentReportCard />
      </main>
    </StudentContext.Provider>
  );
}
