import Header from "./Header";
import Footer from "./Footer";
import Reservations from "./Reservations";

export default function BookingPage({ onSubmit }) {
  return (
    <>
      <Header />
      <main>
        <Reservations onSubmit={onSubmit} />
      </main>
      <Footer />
    </>
  );
}
