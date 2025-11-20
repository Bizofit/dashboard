const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { loginWithGoogle } = require('../services/auth-service');

/**
 * Passport Google OAuth Configuration
 */

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract user data from Google profile
        const googleProfile = {
          id: profile.id,
          email: profile.emails[0].value,
          given_name: profile.name.givenName,
          family_name: profile.name.familyName,
          picture: profile.photos[0]?.value
        };

        // Login or register user
        const result = await loginWithGoogle(googleProfile);

        return done(null, result);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
