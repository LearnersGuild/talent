import { renderToString } from 'react-dom/server'
import React from 'react'
const router = require('express').Router()
import { matchPath, StaticRouter } from 'react-router-dom'

const path = require('path')

import routes from '../../client/routes'
import renderFullPage from './renderFullPage'
import { tempInfo, userTempInfo, fakeDB, fakeProjects, experience, skills } from '../db/mock-data.js'
import App from '../../client/components/app'

router.use('*', (req, res) => {
  const match = routes.reduce((acc, route) => matchPath(req.originalUrl, { path: route, exact: true}) || acc, null)

  const context = {}

  const html = renderToString(
    <StaticRouter context={context} location={req.originalUrl} >
      <App />
    </StaticRouter>
  )
  res.send(renderFullPage(html))
})

module.exports = router
