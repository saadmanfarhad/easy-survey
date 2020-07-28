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
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('accessToken', accessToken);
      // console.log('refreshToken', refreshToken);
      // console.log('profile', profile);

      User.findOne({ email: profile.emails[0].value }).then(existingUser => {
        if (existingUser) {
          if (existingUser.googleId) {
            done(null, existingUser);
          } else {
            const query = {
              email: profile.emails[0].value
            };
            User.findOneAndUpdate(query, {googleId: profile.id}, (err, user) => {
              done(null, user);
            })
          }
        } else {
          new User({ googleId: profile.id, email: profile.emails[0].value })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['emails']
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('accessToken', accessToken);
      // console.log('refreshToken', refreshToken);
      // console.log('profile', profile);

      if (profile.emails) {
        User.findOne({ email: profile.emails[0].value }).then(existingUser => {
          if (existingUser) {
            if (existingUser.facebookId) {
              done(null, existingUser);
            } else {
              const query = {
                email: profile.emails[0].value
              };
              User.findOneAndUpdate(query, {facebookId: profile.id}, (err, user) => {
                done(null, user);
              })
            }
          } else {
            new User({ facebookId: profile.id, email: profile.email })
              .save()
              .then(user => {
                done(null, user);
              });
          }
        });
      } else {
        User.findOne({ facebookId: profile.id }).then(existingUser => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({ facebookId: profile.id }).save().then(user => {
              done(null, user);
            });
          }
        });
      }
    }
  )
);
