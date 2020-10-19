import AccountSideBar from './AccountSideBar';
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