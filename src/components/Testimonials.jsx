import TestimonialsCard from "./TestimonialCard";

export default function Testimonials() {
  return (
    <section className="testimonials">
      <h2>Testimonials</h2>
      <section className="t-cards-container">
        <TestimonialsCard
          name="Joe E."
          rating="4.9"
          body="I love Little Lemon. The best."
          image="img/profile-pic-1.jpg"
        />
        <TestimonialsCard
          name="Maria X."
          rating="4.7"
          body="What a great dining experience. No notes."
          image="img/profile-pic-2.jpg"
        />
        <TestimonialsCard
          name="Lisa L."
          rating="4.89"
          body="Brilliant bruschetta!"
          image="img/profile-pic-3.jpg"
        />
        <TestimonialsCard
          name="Ralph D."
          rating="5"
          body="It was a thrill to be there."
          image="img/profile-pic-4.jpg"
        />
      </section>
    </section>
  );
}
