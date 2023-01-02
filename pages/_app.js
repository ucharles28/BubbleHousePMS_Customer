import Meta from '../components/Meta'
// import '../dist/output.css';
import '../styles/tailwind.css'
import 'antd/dist/antd.css';
import nProgress from "nprogress";
import "../styles/nprogress.css";
import '../styles/app.css'
import '../styles/carousel.css'
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Router from "next/router";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserContext } from "../context/user";
import { useState, useEffect } from 'react';



Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div className='font-poppins'>
      <GoogleOAuthProvider clientId="922531234913-c1fo824rqu7148itrumhd7rf49krs093.apps.googleusercontent.com">
        <UserContext.Provider value={user}>
          <Meta />
          <Component {...pageProps} />
        </UserContext.Provider>
      </GoogleOAuthProvider>
    </div>
  )
}

export default MyApp
