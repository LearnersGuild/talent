import { renderToString } from 'react-dom/server'
import React from 'react'
const router = require('express').Router()
import { matchPath, StaticRouter, ServerRouter } from 'react-router-dom'

const path = require('path')

import routes from '../../client/routes'
import renderFullPage from './renderFullPage'
import { tempInfo, userTempInfo, fakeDB, fakeProjects, experience, skills } from '../db/mock-data.js'
import App from '../../client/components/app'



router.use('*', (req, res) => {
  console.log('entered *')
  const match = routes.reduce((acc, route) => matchPath(req.originalUrl, { path: route, exact: true}) || acc, null)

  const context = {}

  const html = renderToString(
    <StaticRouter context={context} location={req.originalUrl} >
      <App />
    </StaticRouter>
  )
  console.log('html:', html)

  res.send(renderFullPage(html))
})

module.exports = router
