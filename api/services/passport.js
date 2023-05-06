const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: keys.googleRedirectURI,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log('accessToken', accessToken);
      // console.log('refreshToken', refreshToken);
      // console.log('profile', profile);

      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });

      if (existingUser) {
        if (existingUser.googleId) {
          return done(null, existingUser);
        }
        const query = {
          email: profile.emails[0].value,
        };
        User.findOneAndUpdate(query, { googleId: profile.id }, (err, user) => {
          done(null, user);
        });
      } else {
        const user = await new User({
          googleId: profile.id,
          email: profile.emails[0].value,
        }).save();
        done(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['emails'],
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log('accessToken', accessToken);
      // console.log('refreshToken', refreshToken);
      // console.log('profile', profile);

      if (profile.emails) {
        const existingUser = User.findOne({ email: profile.emails[0].value });

        if (existingUser) {
          if (existingUser.facebookId) {
            return done(null, existingUser);
          }
          const query = {
            email: profile.emails[0].value,
          };
          User.findOneAndUpdate(
            query,
            { facebookId: profile.id },
            (err, user) => {
              done(null, user);
            }
          );
        } else {
          const user = new User({
            facebookId: profile.id,
            email: profile.emails[0].value,
          }).save();
          done(null, user);
        }
      } else {
        const existingUser = User.findOne({ facebookId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = new User({ facebookId: profile.id }).save();
        done(null, user);
      }
    }
  )
);
