require('./Models/ProductModel')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const morgan = require('morgan')
const Product = mongoose.model('Product')
const productRouter = require('./routers/productRoutes')
require('dotenv/config')

const api = process.env.API_URL
const mongoUrl = process.env.MONGODB_URL

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('tiny'))
app.use(`${api}/products`, productRouter)

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err))

app.listen(3000, () => {
  console.log(api)
  console.log('Server listening on port 3000')
})
