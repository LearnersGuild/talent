import { renderToString } from 'react-dom/server'
import React from 'react'
import { matchPath, StaticRouter } from 'react-router-dom'

const path = require('path')

import routes from '../../client/routes'
import renderFullPage from './renderFullPage'
import { tempInfo, userTempInfo, fakeDB, fakeProjects, experience, skills } from '../db/mock-data.js'
import App from '../../client/components/app'

function router(req, res) {

  const match = routes.reduce((acc, route) => matchPath(req.url, { path: route, exact: true}) || acc, null)

  // if (!match) {
  //   res.status(404).send('page not found')
  //   return
  // }

  const context = {}

  const html = renderToString(
    <StaticRouter context={context} location={req.url} >
      <App />
    </StaticRouter>
  )

  res.send(renderFullPage(html))
}
// router.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../../public/index.html'))
// })

module.exports = router
