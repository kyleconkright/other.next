import styles from './header.module.scss';
import { useRouter } from 'next/router'

export default function Header() {

  const router = useRouter()

  function auth(event) {
    event.preventDefault();
    router.push('http://localhost:5001/auth/discogs');
  }

  return (
    <header className={styles.header}>
      <h1>Other Supply Co.</h1>
      <div>
        <a onClick={auth}>Sync Discogs</a>
      </div>
    </header>
  )
}
