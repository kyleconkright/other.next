import Header from '../header/header';
import Footer from '../footer/footer';

const withLayout = Page => {
  return () => (
      <main>
        <Header />
        <div id="content">
          <Page />
        </div>
        <Footer />
      </main>
  );
};

export default withLayout;