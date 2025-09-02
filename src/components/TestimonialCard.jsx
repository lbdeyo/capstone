export default function TestimonialsCard({ name, rating, body, image }) {
  return (
    <article className="testimonial-card">
      <p className="testimonial-rating">Rating: {rating}</p>
      <div className="testimonial-profile">
        <img src={image} alt={name} />
        <p className="testimonial-name">{name}</p>
      </div>
      <p>{body}</p>
    </article>
  );
}
