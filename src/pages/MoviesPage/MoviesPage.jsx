import css from "./MoviesPage.module.css";
import * as api from "../../components/API";
import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryUrl = searchParams.get("query") ? searchParams.get("query") : "";
  const [searchQuery, setSearchQuery] = useState(queryUrl);
  const [finalSearchQuery, setFinalSearchQuery] = useState(queryUrl);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function resolveMovies() {
      const response = await api.findMovies(finalSearchQuery);
      setMovies(response.results);
    }
    if (finalSearchQuery) {
      resolveMovies();
    }
  }, [finalSearchQuery]);

  const onSubmit = (event) => {
    event.preventDefault();
    setFinalSearchQuery(searchQuery);
    console.log(searchQuery);
    setSearchParams({ query: searchQuery });
  };

  return (
    <div>
      <form className={css.search_form} onSubmit={onSubmit}>
        <input
          value={searchQuery}
          onChange={(evt) => {
            setSearchQuery(evt.target.value);
          }}
          placeholder="Search for the movie..."
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}
