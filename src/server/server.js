const express = require('express')
const path = require('path')
const app = express()
import router from './routes'

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../../public')))

app.use('*', router)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
 export default app
