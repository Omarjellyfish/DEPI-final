import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../../components/ReviewCard/ReviewCard";

const ReviewsComponent = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/review",{headers:{"token":localStorage.getItem("token")}})
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  return (
    <div className="row">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div className="col-md-4 mb-3" key={review.id}>
            <ReviewCard
              userName={review.userName}
              review={review.review}
              rating={review.rating}
              title={review.title}
            />
          </div>
        ))
      ) : (
        <div>No reviews available</div>
      )}
    </div>
  );
};

export default ReviewsComponent;
