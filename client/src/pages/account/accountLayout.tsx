import AccountSideBar from './accountSideBar';
import { Fragment } from 'react';

const withAccountLayout = Page => {

  return () => (
    <Fragment>
      <AccountSideBar></AccountSideBar>
      <Page />
    </Fragment>
  );
};

export default withAccountLayout;