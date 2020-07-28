const passport = require('passport');

module.exports = app => {
  //GOOGLE LOGIN
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  //FACEBOOK LOGIN
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
  }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
