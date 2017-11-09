import { renderToString } from 'react-dom/server'
import React from 'react'
const router = require('express').Router()
import { matchPath, StaticRouter, ServerRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise'
import reducers from '../../client/reducers'

const path = require('path')

import routes from '../../client/routes'
import renderFullPage from './renderFullPage'
import { tempInfo, userTempInfo, fakeDB, fakeProjects, experience, skills } from '../db/mock-data.js'
import App from '../../client/components/app'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

router.use('*', (req, res) => {

  const match = routes.reduce((acc, route) => matchPath(req.originalUrl, { path: route, exact: true}) || acc, null)

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
