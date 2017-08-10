const path = require('path');
// import express
const express = require('express');

// import webpack and the dev & hot middlewares
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function createServer() {
  // Step 1: create the express instance
  const app = express();

  // Step 2: Create & configure a webpack compiler
  const webpackConf = require('../webpack.config.dev.js');
  const webpackCompiller = webpack(webpackConf);

  // Webpack hot reloading attached to express server
  // documentation : https://github.com/glenjamin/webpack-hot-middleware
  const hotMiddleware = webpackHotMiddleware(webpackCompiller);

  // webpackDevMiddleware serves the files emitted from webpack
  // documentation : https://github.com/webpack/webpack-dev-middleware
  const devMiddleWare = webpackDevMiddleware(
    webpackCompiller,
    {
      // publicPath is required, whereas all other options are optional
      publicPath: webpackConf.output.publicPath,
      // public path to bind the middleware to
      // use the same as in webpack
      stats: {
        colors: true,
      },

   });

  // Step 3: Attach the dev middleware and hot middleware to the server
  app.use(devMiddleWare);
  app.use(hotMiddleware);
  
  /**
   *
   */
  function startServer() {
    app.listen(3000, function(err) {
      if (err) {
        console.error(err);
        return;
      }
      // log server running
      console.log('Listening at http://localhost:3000/');
    });
  }// end function start server

  /**
   *
   */
  function reloadClient() {
    hotMiddleware.publish({action: 'reload'});
  }// end function RelaodClient

  return {
    start: startServer,
    reloadClient: reloadClient,
  };
}
module.exports = createServer();
