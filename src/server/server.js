const express = require('express')
const app = express()

const port = process.env.PORT || 3000


app.get('/', (req, res) => {
  console.log('hello world');
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
