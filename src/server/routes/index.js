import React from 'react'
import { renderToString } from 'react-dom/server'
const router = require('express').Router()
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise'
import reducers from '../../client/reducers'

import renderFullPage from './renderFullPage'
import App from '../../client/components/app'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

router.use('*', (req, res) => {

  const context = {}

  const html = renderToString(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <StaticRouter context={context} location={req.originalUrl} >
        <App />
      </StaticRouter>
    </Provider>
  )

  res.send(renderFullPage(html))
})

module.exports = router
