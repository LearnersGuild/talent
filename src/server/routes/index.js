import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
const router = require('express').Router();
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../client/reducers';
import App from '../../client/components/app';
import apiRoutes from './apiRoutes';

router.use('/api', apiRoutes);

router.use('*', (req, res) => {

  const context = {};

  res.write(`<!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
      <link rel="stylesheet" href="/style.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fugaz+One">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans">
      <title>Talent</title>
    </head>
    <body>
      <div class="container">`);

  const stream = renderToNodeStream(
    <Provider store={createStore(reducers)}>
    <StaticRouter context={context} location={req.originalUrl} >
    <App />
    </StaticRouter>
    </Provider>
  );

  stream.pipe(res, { end: false, });
  stream.on('end', () => {
    res.write('</div><script type="text/javascript" src="/bundle.js"></script></body></html>');
    res.end();
  });

});

module.exports = router;
