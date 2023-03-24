/* eslint-disable import/no-extraneous-dependencies */
const { createProxyMiddleware } = require('http-proxy-middleware');
// const config = require('./config');

// src/setupProxy.js
module.exports = function(app) {
    app.use(
        createProxyMiddleware(
            '/api/v1', 
            {
            target: 'https://d3cd-2001-2d8-ed38-d397-14a0-bd42-bfa8-ec6.jp.ngrok.io',
            changeOrigin: true
      }),
    );
};