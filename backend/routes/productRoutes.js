const express = require('express')
const { Category } = require('../models/Category')
const router = express.Router()
const { Product } = require('../models/Product')

router.get(`/`, async (req, res) => {
  try {
    const productList = await Product.find().populate('category')
    res.send(productList)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

router.get(`/:id`, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category')
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
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid Category')

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
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

//UPDATE A PRODUCT

router.put(`/:id`, async (req, res) => {
  try {
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid Category')

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      },
      { new: true }
    )
    if (!updatedProduct) {
      res
        .status(404)
        .send({ message: 'Product with given Id not found', success: false })
    }
    res.status(200).send(updatedProduct)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

module.exports = router
