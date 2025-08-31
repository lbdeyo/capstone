import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Testimonials from "./components/Testimonials";

function App() {
  return (
    <>
      <header>
        <Nav />
      </header>

      <main>
        <Hero />
        <Specials />
        <Testimonials />
        <About />
      </main>
      <Footer />
    </>
  );
}

export default App;
