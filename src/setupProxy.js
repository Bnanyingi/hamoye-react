// import React from 'react';

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://opensky-network.org',
      changeOrigin: true,
    })
  );
};