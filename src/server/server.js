const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../../public')))

app.get('/api/ohNo', (req, res) => {
  res.send('Im an PIE')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'))
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
