import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';
import { fetchMovieCredits } from '../../services/tmdbApi';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCast() {
      try {
        const data = await fetchMovieCredits(movieId);
        setCast(data.cast);
      } catch (err) {
        setError('Не вдалося завантажити акторський склад');
      }
    }

    getCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  return (
    <ul className={styles.castList}>
      {cast.map(({ id, profile_path, name, character }) => (
        <li key={id} className={styles.castItem}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : 'https://via.placeholder.com/200x300?text=No+Image'
            }
            alt={name}
            className={styles.castImg}
          />
          <p><strong>{name}</strong></p>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
}


