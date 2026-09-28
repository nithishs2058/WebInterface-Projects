import Header from "./Header";
import Footer from "./Footer";
import StudentCard from "./StudentCard";
import SubjectList from "./SubjectList";
import "./App.css";

export default function App() {
  const student = {
    photo: "nithi.jpeg",
    name: "Nithish",
    dept: "Computer Science",
    regno: "101",
    year: "3rd Year",
    cgpa: 8.4,
    att: 82,
  };

  return (
    <div className="page">
      <Header />

      <main>
        <StudentCard {...student} />
        <SubjectList />
      </main>

      <Footer />
    </div>
  );
}
