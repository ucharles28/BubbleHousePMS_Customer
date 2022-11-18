import passport from "passport";
import "../../../lib/passport";

export default async function (req, res, next) {
  passport.authenticate("facebook", {
    scope: ["email"],
    session: false,
  })(req, res, next);
}