import "./ReviewCard.css";

export default function ReviewCard({ userName, title, review, rating }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">by {userName}</h6>
        <p className="card-text">{review}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-primary">{rating}/5</span>
        </div>
      </div>
    </div>
  );
}
