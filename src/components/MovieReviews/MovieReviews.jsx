import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieReviews.module.css';
import { fetchMovieReviews } from '../../services/tmdbApi';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getReviews() {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch (err) {
        setError('Не вдалося завантажити огляди');
      }
    }

    getReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  if (reviews.length === 0) {
    return <p className={styles.noReviews}>Немає відгуків про цей фільм.</p>;
  }

  return (
    <ul className={styles.reviewList}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={styles.reviewItem}>
          <h4>Автор: {author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
}
