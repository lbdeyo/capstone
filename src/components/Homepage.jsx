import Hero from "./Hero";
import Specials from "./Specials";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import About from "./About";
import Header from "./Header";
export default function Homepage() {
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
