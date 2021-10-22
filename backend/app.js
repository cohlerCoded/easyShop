const express = require('express')
const app = express()

require('dotenv/config')

const api = process.env.API_URL

app.get(api + '/products', (req, res) => {
  res.send('Welcome to Eshop')
})

app.listen(3000, () => {
  console.log(api)
  console.log('Server listening on port 3000')
})
