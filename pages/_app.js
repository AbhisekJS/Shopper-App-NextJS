import { StoreProvider } from '../components/Store'
import '../styles/globals.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'
import React,{ useEffect } from 'react'

Router.events.on('routeChangeStart', ()=> NProgress.start())
Router.events.on('routeChangeComplete', ()=> NProgress.done())
Router.events.on('routeChangeError', ()=> NProgress.done())

export default function MyApp({ pageProps, Component }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}


MyApp.getInitialProps = async()=>{
  return {
    pageProps:{
      commercePublicKey : process.env.REACT_APP_COMMERCE_PUBLIC_KEY
    }
  }
}