import { useEffect, useState, useRef } from "react";
import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import * as api from "../../components/API";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState();
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const locationRef = useRef(location.state);

  useEffect(() => {
    async function resolveMovieDetails(movieId) {
      const response = await api.fetchMovieDetails(movieId);
      setMovieDetails(response);
    }

    resolveMovieDetails(movieId);
  }, [movieId]);

  useEffect(() => {
    locationRef.current = location.state;
  }, [location]);

  const onBack = () => {
    navigate(locationRef.current || "/", { replace: false });
  };

  return (
    <div className={css.movie_details_page}>
      <button className={css.go_back} onClick={onBack}>
        Go back
      </button>
      {movieDetails && (
        <div>
          <div className={css.movie_details}>
            <img src={api.getImgURL(movieDetails.poster_path)} />
            <div>
              <h1>
                {movieDetails.original_title} (
                {getReleaseYear(movieDetails.release_date)})
              </h1>
              User score: {Math.round(movieDetails.vote_average * 10)}%
              <h2>Overview</h2>
              <p>{movieDetails.overview}</p>
              <h2>Genres</h2>
              <p>{movieDetails.genres.map((genre) => genre.name).join(" ")}</p>
            </div>
          </div>
          <h3>Addintional Information</h3>
          <ul className={css.movie_details_sub_menu}>
            <li>
              <NavLink to="cast" state={location.state}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" state={location.state}>
                Reviews
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      )}
    </div>
  );
}

function getReleaseYear(date) {
  return new Date(date).getUTCFullYear();
}
