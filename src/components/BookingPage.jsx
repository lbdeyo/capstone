import Footer from "./Footer";
import Reservations from "./Reservations";
import Header from "./Header";

export default function BookingPage({ availableTimes, dispatch }) {
  return (
    <>
      <Header />
      <main>
        <Reservations availableTimes={availableTimes} dispatch={dispatch} />
      </main>
      <Footer />
    </>
  );
}
