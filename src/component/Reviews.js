import { Link, useSearchParams } from "react-router-dom";
import { useReviews } from "../customHook/useReviews";

export default function Reviews() {
  const [searchParams] = useSearchParams();
  const categories = searchParams.get("category");
  const { reviews, loading, err } = useReviews({ categories });
  if (loading) return <p>Loading...</p>;
  if (err) return <p>error code: {err}</p>;
  return (
    <div className="Main">
      {reviews.map((review) => (
        <Link
          to={`/reviews/${review.review_id}`}
          key={review.review_id}
          className="reviewCard"
        >
          <h3 className="reviewCardName">{review.title}</h3>
          <img
            src={`${review.review_img_url}`}
            alt="reviewImg"
            className="reviewCardImg"
          />
          <p className="reviewDesigner">Designer: {review.designer}</p>
          <p className="reviewVote">Vote: {review.votes}</p>
        </Link>
      ))}
    </div>
  );
}
