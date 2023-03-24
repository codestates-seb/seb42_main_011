/* eslint-disable import/no-extraneous-dependencies */
const { createProxyMiddleware } = require('http-proxy-middleware');
// const config = require('./config');

// src/setupProxy.js
module.exports = function(app) {
    app.use(
        createProxyMiddleware(
            '/api/v1', 
            {
            target: 'https://cde6-2001-2d8-ed39-ac40-cdd6-5af2-d5ba-a329.jp.ngrok.io',
            changeOrigin: true
      }),
    );
};