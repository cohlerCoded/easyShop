require('./Models/ProductModel')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const morgan = require('morgan')
const Product = mongoose.model('Product')

require('dotenv/config')

const api = process.env.API_URL
const mongoUrl = process.env.MONGODB_URL

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('tiny'))

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

app.get(`${api}/products`, async (req, res) => {
  try {
    const productList = await Product.find()
    res.send(productList)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})
app.post(`${api}/products`, async (req, res) => {
  try {
    const { name, image, countInStock } = req.body
    const product = new Product({
      name,
      image,
      countInStock,
    })
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
    })
  }
})
