// import { setCookies } from "cookies-next";
import passport from "passport";
import "../../../lib/passport";

export default async function (req, res, next) {
  passport.authenticate("facebook", (err, user, info) => {
    console.log(err)
    console.log(user)
    if (err || !user) {
      //return res.redirect("http://localhost:3000/?a=auth_fail");
    }

    // set cookie and send redirect
    // setCookies("token", info.token, {
    //   req,
    //   res,
    // });
    res.redirect("http://localhost:3000/");
  })(req, res, next);
}