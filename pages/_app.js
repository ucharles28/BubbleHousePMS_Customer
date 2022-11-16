import Meta from '../components/Meta'
import '../styles/tailwind.css';
import 'antd/dist/antd.css';
import nProgress from "nprogress";
import "../styles/nprogress.css";
import Router from "next/router";


Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {

  return (
    <>
    <Meta />
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
