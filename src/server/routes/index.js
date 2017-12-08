import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';
const router = require('express').Router();
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../client/reducers';

import renderFullPage from './renderFullPage';
import App from '../../client/components/app';

router.use('*', (req, res) => {

  const context = {};

  // Method 1, with rendering to string, not using streaming
  // Browser must wait for the server to write the entire app to string

  // const html = renderToString(
  //   <Provider store={createStore(reducers)}>
  //     <StaticRouter context={context} location={req.originalUrl} >
  //       <App />
  //     </StaticRouter>
  //   </Provider>
  // );

  // res.send(renderFullPage(html));

  // Method 2, with the app being streamed

  res.write(`<!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="/style.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
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
