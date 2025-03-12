import * as api from "../../components/API";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import { useState, useEffect } from "react";

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function resolveMovieCast(movieId) {
      const response = await api.fetchCast(movieId);
      setMovieCast(response.cast);
    }

    resolveMovieCast(movieId);
  }, [movieId]);

  return (
    <ul className={css.movie_cast}>
      {movieCast.map((cast) => singleActor(cast))}
    </ul>
  );
}

function singleActor(actor) {
  return (
    <li key={actor.id} className={css.movie_actor}>
      <img src={api.getImgURL(actor.profile_path)} />
      <a>{actor.name}</a>
      <a>Character: {actor.character}</a>
    </li>
  );
}
