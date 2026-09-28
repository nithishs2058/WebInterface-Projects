import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Hobbies from "./components/Hobbies";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Hobbies />
      </main>
      <Footer />
    </>
  );
}
