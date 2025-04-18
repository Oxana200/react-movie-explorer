import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { fetchMovieDetails } from '../../services/tmdbApi';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from || '/movies');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError('Фільм не знайдено');
      }
    }

    getMovieDetails();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Завантаження...</p>;

  const { poster_path, title, overview, genres, vote_average } = movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className={css.container}>
      <Link to={backLink.current} className={css.backLink}>
        &larr; Go back
      </Link>

      <div className={css.details}>
        <img src={posterUrl} alt={title} className={css.poster} />
        <div>
          <h2>{title}</h2>
          <p>User score: {Math.round(vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <div className={css.additional}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from: backLink.current }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLink.current }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
