import { useState, useEffect } from "react";

import * as api from "../../components/API";
import MovieList from "../../components/MovieList/MovieList";
import moment from "moment";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function resolveMovies() {
      const response = await api.fetchTending();
      setMovies(response.results);
    }
    resolveMovies();
  }, []);

  return (
    <div>
      <h1>Trending today {moment().format("DD.MM.YYYY")}</h1>
      <MovieList movies={movies} />
    </div>
  );
}
