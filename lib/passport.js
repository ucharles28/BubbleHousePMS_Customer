import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
// import { Strategy as FacebookStrategy  } from "passport-facebook";
import strategy from "passport-facebook";

const FacebookStrategy = strategy.Strategy;

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: '93183711763-r1s27d24vk7km5uo667okv4ssm5voj4e.apps.googleusercontent.com',//process.env.GOOGLE_CLIENT_ID,
      clientSecret: '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',//process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
    //   try {
    //     const obj = await User.findOne({ email: profile.email });
    //     if (!obj) {
    //       // create new user
    //       const newUser = new User({
    //         email: profile.email,
    //         name: profile.displayName,
    //         accessToken,
    //       });
    //       await newUser.save();
    //       const token = await jwt.sign(
    //         {
    //           id: newUser._id,
    //           created: Date.now().toString(),
    //         },
    //         process.env.JWT_SECRET
    //       );
    //       newUser.tokens.push(token);
    //       await newUser.save();
    //       done(null, newUser, { message: "Auth successful", token });
    //     } else {
    //       // login existing user
    //       const token = await jwt.sign(
    //         {
    //           id: obj._id,
    //           created: Date.now().toString(),
    //         },
    //         process.env.JWT_SECRET
    //       );
    //       obj.tokens.push(token);
    //       await obj.save();
    //       done(null, obj, { message: "Auth successful", token });
    //     }
    //   } catch (err) {
    //     console.error(err);
    //     done(err, false, { message: "Internal server error" });
    //   }
    }
  )
);

passport.use(
    "facebook",
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/facebook/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
          console.log(profile)
      //   try {
      //     const obj = await User.findOne({ email: profile.email });
      //     if (!obj) {
      //       // create new user
      //       const newUser = new User({
      //         email: profile.email,
      //         name: profile.displayName,
      //         accessToken,
      //       });
      //       await newUser.save();
      //       const token = await jwt.sign(
      //         {
      //           id: newUser._id,
      //           created: Date.now().toString(),
      //         },
      //         process.env.JWT_SECRET
      //       );
      //       newUser.tokens.push(token);
      //       await newUser.save();
      //       done(null, newUser, { message: "Auth successful", token });
      //     } else {
      //       // login existing user
      //       const token = await jwt.sign(
      //         {
      //           id: obj._id,
      //           created: Date.now().toString(),
      //         },
      //         process.env.JWT_SECRET
      //       );
      //       obj.tokens.push(token);
      //       await obj.save();
      //       done(null, obj, { message: "Auth successful", token });
      //     }
      //   } catch (err) {
      //     console.error(err);
      //     done(err, false, { message: "Internal server error" });
      //   }
      }
    )
  );
  
