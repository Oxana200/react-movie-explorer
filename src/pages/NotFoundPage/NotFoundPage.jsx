import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h2>Сторінку не знайдено</h2>
      <Link to="/" className={css.backButton}>Повернутись на головну</Link>
    </div>
  );
}
