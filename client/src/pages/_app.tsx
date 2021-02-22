import './../styles/stylesheet.scss';

import { Provider } from "react-redux";
import store from '../store';
import React from 'react';
import UserContextProvider from './../contexts/user.context';

export default function OtherApp({ Component, pageProps }) {

  //   async function getInitialProps({Component, ctx}) {
  //     const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  //     //Anything returned here can be access by the client
  //     return {pageProps: pageProps};
  // }

  console.log(process.env.NEXT_PUBLIC_API_URL);

  return (
    <Provider store={store}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </Provider>
  )
}