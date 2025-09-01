export default function Card({ title, body, image }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <div className="card-body">
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    </div>
  );
}
