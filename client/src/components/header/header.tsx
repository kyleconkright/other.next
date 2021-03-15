import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';

import styles from './header.module.scss';

import Button from './../../components/button/button';
import { AppState } from '../../store/reducers';

export default function Header() {

  const user = useSelector((state: AppState) => state.user);

  const router = useRouter();

  return (
    <header className={styles.header}>
      <h1><a onClick={() => router.push('/')}>Other Supply</a></h1>
      <div>
        { user.username && !user.loading ? (
          <a onClick={() => router.push('/account')}><Button text="Account"></Button></a>
        ) : (
          user.loading ? (
            null
          ) : (
            <div>
              <a onClick={() => router.push('/login')}>Login</a>
            </div>
          )
        )}
      </div>
    </header>
  )
}
