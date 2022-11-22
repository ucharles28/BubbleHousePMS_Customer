import Meta from '../components/Meta'
import '../styles/tailwind.css';
import 'antd/dist/antd.css';
import nProgress from "nprogress";
import "../styles/nprogress.css";
import '../styles/app.css'
import Router from "next/router";
import { GoogleOAuthProvider } from '@react-oauth/google';


Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {

  return (
    <>
      <GoogleOAuthProvider clientId="922531234913-c1fo824rqu7148itrumhd7rf49krs093.apps.googleusercontent.com">
        <Meta />
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </>
  )
}

export default MyApp
