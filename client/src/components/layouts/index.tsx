import Header from '../header/header';
import Footer from '../footer/footer';
import { useEffect } from 'react';

const withLayout = Page => {

  return () => (
      <main>
        <Header />
        <Page />
        <Footer />
      </main>
  );
};

export default withLayout;