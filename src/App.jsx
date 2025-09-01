import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Testimonials from "./components/Testimonials";
import Specials from "./components/Specials";

function App() {
  return (
    <>
      <Header />

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
