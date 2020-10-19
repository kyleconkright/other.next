import Header from '../header/header';
import Footer from '../footer/footer';

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