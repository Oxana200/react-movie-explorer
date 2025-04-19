import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id} className={styles.item}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }} className={styles.link}>
            <img
              src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : '/default-poster.jpg'}
              alt={movie.title || movie.name}
              className={styles.poster}
            />
            <p className={styles.title}>{movie.title || movie.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};
