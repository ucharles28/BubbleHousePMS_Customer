import Meta from '../components/Meta'
import '../styles/tailwind.css';
import 'antd/dist/antd.css';
import nProgress from "nprogress";
import "../styles/nprogress.css";
import Router from "next/router";
import { GoogleOAuthProvider } from '@react-oauth/google';


Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {

  return (
    <>
      <GoogleOAuthProvider clientId="93183711763-boe87qj6thsf6m1m1j5v1q9773civoch.apps.googleusercontent.com">
        <Meta />
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </>
  )
}

export default MyApp
