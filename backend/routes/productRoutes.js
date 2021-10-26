const express = require('express')
const router = express.Router()
const Product = require('../Models/ProductModel')

router.get(`/`, async (req, res) => {
  try {
    const productList = await Product.find()
    res.send(productList)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

router.post(`/`, async (req, res) => {
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

module.exports = router
