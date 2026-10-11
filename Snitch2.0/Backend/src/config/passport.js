import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import { config } from "./config.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
    },

    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        const fullName = profile.displayName;
        const avatar = profile.photos?.[0]?.value || "";
        const signupRole = req.session?.googleSignupMode
          ? req.session.googleSignupRole
          : undefined;

        let user = await User.findOne({ googleId });

        if (!user) {
          user = await User.findOne({ email });

          if (user) {
            user.googleId = googleId;
            user.avatar = avatar;
            if (signupRole) {
              user.role = signupRole;
            }
            await user.save();
          } else {
            user = await User.create({
              googleId,
              email,
              fullName,
              avatar,
              role: signupRole || "buyer",
            });
          }
        } else if (signupRole && user.role !== signupRole) {
          user.role = signupRole;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;