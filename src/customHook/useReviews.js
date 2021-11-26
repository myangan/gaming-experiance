import { useEffect, useState } from "react";

import { getComments, getReviews } from "../utils/utils";

const useReviews = ({ categories, reviews_id }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    setLoading(true);
    getReviews({ categories, reviews_id })
      .then((review) => {
        setErr(null);
        setLoading(false);
        setReviews(review.respond);
      })
      .catch((err) => {
        setLoading(false);
        setErr(err.response.status);
      });
  }, [categories, reviews_id]);

  return { reviews, loading, err };
};

const useComments = ({ reviews_id }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments({ reviews_id })
      .then((comment) => setComments(comment))
      .catch((err) => console.log(err));
  }, [reviews_id]);
  return { comments, setComments };
};

export { useReviews, useComments };
