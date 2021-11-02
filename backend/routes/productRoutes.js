const express = require('express')
const { Category } = require('../models/Category')
const router = express.Router()
const { Product } = require('../models/Product')

router.get(`/`, async (req, res) => {
  try {
    const productList = await Product.find().select('name image -_id')
    res.send(productList)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

router.get(`/:id`, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res
        .status(404)
        .send({ message: 'Product with given Id not found', success: false })
    }
    res.status(200).send(product)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

router.post(`/`, async (req, res) => {
  try {
    const {
      name,
      description,
      richDescription,
      image,
      images,
      brand,
      price,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = req.body
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid Category')

    const product = new Product({
      name,
      description,
      richDescription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    })
    const savedProduct = await product.save()
    if (!savedProduct) return res.status(500).send('Product can not be created')
    res.status(201).send(savedProduct)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message,
      success: false,
    })
  }
})

module.exports = router
