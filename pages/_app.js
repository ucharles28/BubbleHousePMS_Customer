import Meta from "../components/Meta";
// import '../dist/output.css';
import "../styles/tailwind.css";
import "antd/dist/antd.css";
import 'aos/dist/aos.css';
import nProgress from "nprogress";
import "../styles/nprogress.css";
import "../styles/app.css";
import "../styles/carousel.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Router from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserContext } from "../context/user";
import { useState, useEffect } from "react";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  console.log(`Where am i : ${process.env.NEXT_PUBLIC_REACT_APP_WHERE_AM_I}`);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="font-poppins">

      <GoogleOAuthProvider clientId="93183711763-q06sgd1u4vg3dvdaibjs7dt8orh34487.apps.googleusercontent.com">
        <UserContext.Provider value={user}>
          <Meta />
          <Component {...pageProps} />
        </UserContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
}
 
export default MyApp;
