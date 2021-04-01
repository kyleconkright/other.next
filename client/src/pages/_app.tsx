import './../styles/stylesheet.scss';

import { Provider } from "react-redux";
import store from '../store';
import React, { useEffect } from 'react';
import UserContextProvider from './../contexts/user.context';
import { useRouter } from 'next/router';
import * as gtag from "./../../utils/gtag";

export default function OtherApp({ Component, pageProps }) {
  const router = useRouter();

  //   async function getInitialProps({Component, ctx}) {
  //     const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  //     //Anything returned here can be access by the client
  //     return {pageProps: pageProps};
  // }

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </Provider>
  )
}