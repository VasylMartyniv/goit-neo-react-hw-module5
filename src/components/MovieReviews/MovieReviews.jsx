import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../API";
import css from "./MovieReviews.module.css";
import moment from "moment";
export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function resolveMovieReviews(movieId) {
      const response = await api.fetchReviews(movieId);
      setMovieReviews(response.results);
    }

    resolveMovieReviews(movieId);
  }, [movieId]);

  return movieReviews && movieReviews.length > 0 ? (
    <ul className={css.review_list}>
      {movieReviews.map((review) => singleReview(review))}
    </ul>
  ) : (
    "No review yet"
  );

  function singleReview(review) {
    return (
      <li key={review.id} className={css.review}>
        <div className={css.header}>
          <div>
            <img
              src={api.getImgURL(review.author_details.avatar_path)}
              alt="Author avatar"
            />
          </div>
          <div className={css.metadata}>
            <span>
              <strong>Author:</strong> {review.author}
            </span>
            <span>
              <strong>Created:</strong>{" "}
              {moment(review.created_at).format("DD.MM.YYYY HH:mm")}
            </span>
            <span>
              <strong>Updated:</strong>{" "}
              {moment(review.updated_at).format("DD.MM.YYYY HH:mm")}
            </span>
          </div>
        </div>

        <div>
          <strong>Review:</strong>
          <p>{review.content}</p>
        </div>
      </li>
    );
  }
}
