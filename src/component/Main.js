import { Link } from "react-router-dom";
import { useReviews } from "../customHook/useReviews";

export default function Main() {
  const { reviews } = useReviews({});
  return (
    <div className="Main">
      {reviews.map((review) => (
        <Link
          to={`/reviews/${review.review_id}`}
          key={review.review_id}
          className="reviewCard"
        >
          <img
            src={`${review.review_img_url}`}
            alt="reviewImg"
            className="reviewCardImg"
          />
          <div className="reviewsInfo">
            <p>Title: {review.title}</p>
            <p>Designer: {review.designer}</p>
            <p>Vote: {review.votes}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
