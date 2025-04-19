import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import css from './MoviesPage.module.css';
import { fetchMoviesByQuery } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    async function getMovies() {
      try {
        const data = await fetchMoviesByQuery(query);
        setMovies(data.results);
      } catch {
        setError('Помилка при пошуку фільмів');
      }
    }

    getMovies();
  }, [query]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const value = evt.target.elements.query.value.trim();
    if (value) {
      setSearchParams({ query: value });
    }
  };

  return (
  <div className={css.container}>
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        name="query"
        defaultValue={query}
        placeholder="Введіть назву фільму"
      />
      <button type="submit">Пошук</button>
    </form>

    {error && <p>{error}</p>}
    {movies.length > 0 && <MovieList movies={movies} />}
  </div>
);

}
