import Footer from "./Footer";
import Reservations from "./Reservations";
import Header from "./Header";

export default function BookingPage({ availableTimes, dispatch, onSubmit }) {
  return (
    <>
      <Header />
      <main>
        <Reservations
          availableTimes={availableTimes}
          dispatch={dispatch}
          onSubmit={onSubmit}
        />
      </main>
      <Footer />
    </>
  );
}
