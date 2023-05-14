const passport = require('passport');

module.exports = (app) => {
  //GOOGLE LOGIN
  app.get(
    '/api/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/api/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  //FACEBOOK LOGIN
  app.get(
    '/api/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email'],
    })
  );

  app.get(
    '/api/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
