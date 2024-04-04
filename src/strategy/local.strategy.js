import passport from "passport";
import { Strategy } from "passport-local";

const LocalStrategy = Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

const userInfo = {
  email: "junior@mail.com",
  password: "12345",
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = email === userInfo.email;

        if (!user) {
          return done(null, false, { message: "Vous n'etes pas authentifié" });
        }

        const isPasswordValid = password === userInfo.password;

        if (!isPasswordValid) {
          return done(null, false);
        }

        return done(null, userInfo);
      } catch (error) {
        return done(error);
      }
    }
  )
);
