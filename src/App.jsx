import Contact  from "./Pages/Contact";
import About from "./Pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectCard from "./components/ProjectCard";
export default function App() {
  return (<>
    <Header />
    <About />
    <ProjectCard />
    <Contact />
    <About />
    <Footer />
  </>
  );
}
