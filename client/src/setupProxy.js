const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/auth/google', {
      target: 'http://localhost:5000/',
    })
  );
  // app.use(
  //   createProxyMiddleware('/auth/facebook', {
  //     target: 'http://localhost:5000/'
  //   })
  // );
  app.use(
    createProxyMiddleware('/api/*', {
      target: 'http://localhost:5000/',
    })
  );
};
