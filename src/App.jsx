import Contact  from "./Pages/Contact";
import About from "./Pages/Home";
import Projects from "./Pages/Projects";
import NotFound from "./Pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectCard from "./components/ProjectCard";
import AboutSection from "./components/AboutSection";
import ContactForm from "./components/ContactForm";
import "./App.css";
export default function App() {
  return (<>
    <Header />
    <About />
    <AboutSection />
    <ProjectCard />
    <ContactForm />
    <Projects />
    <Contact />
    <NotFound />
    <About />
    <Footer />
  </>
  );
}
export { Contact, About, Projects, Header, Footer, ProjectCard, NotFound , AboutSection, ContactForm };
