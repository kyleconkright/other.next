import { Fragment } from 'react';
import Layout from '../components/layouts';
import Feed from './feed';

function HomePage() {

  return (
    <Fragment>
      <Feed></Feed>
    </Fragment>
  )
}

export default Layout(HomePage);