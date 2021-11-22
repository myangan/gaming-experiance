import { useEffect, useState } from "react";
import { getReviews } from "../utils/utils";

export default function Main() {
  const [reviews, setReviews] = useState([]);
  useEffect(
    () => getReviews().then((review) => setReviews(review.respond)),
    []
  );

  return (
    <div className="Main">
      {reviews.map((review) => (
        <section key={review.review_id} className="reviewCard">
          <h3 className="reviewCardName">{review.title}</h3>
          <img
            src={`${review.review_img_url}`}
            alt="reviewImg"
            className="reviewCardImg"
          />
          <p className="reviewDesiner">Desiner: {review.designer}</p>
          <p className="reviewVote">Vote: {review.votes}</p>
        </section>
      ))}
    </div>
  );
}
