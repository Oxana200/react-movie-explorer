import { useEffect, useState } from 'react';
import css from './HomePage.module.css';
import { fetchTrendingMovies } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getTrending() {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch {
        setError('Не вдалося завантажити популярні фільми');
      }
    }

    getTrending();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.heading}>Trending today</h1>
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
