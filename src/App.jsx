import Contact  from "./Pages/Contact";
import About from "./Pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
export default function App() {
  return (<>
    <Header />
    <About />
    <Contact />
    <About />
    <Footer />
  </>
  );
}
