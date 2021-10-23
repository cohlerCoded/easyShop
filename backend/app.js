const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv/config')

const api = process.env.API_URL
const mongoUrl = process.env.MONGODB_URL

app.use(express.json())
app.use(morgan('tiny'))

app.get(`${api}/products`, (req, res) => {
  res.json({
    id: '12345',
    name: 'laptop',
    price: 1000,
    description: 'Better than a Mac',
    rating: 5,
    numReviews: 4000,
  })
})
app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body
  console.log(newProduct)
  res.send(newProduct)
})

mongoose
  .connect(mongoUrl)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err))

app.listen(3000, () => {
  console.log(api)
  console.log('Server listening on port 3000')
})
