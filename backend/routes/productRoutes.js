const express = require('express')
const mongoose = require('mongoose')
const { Category } = require('../models/Category')
const router = express.Router()
const { Product } = require('../models/Product')
const multer = require('multer')

//DISK STORAGE FOR MULTER
const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype]
    let uploadError = new Error('Invalid image type')
    if (isValid) {
      uploadError = null
    }
    cb(uploadError, 'public/uploads')
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname.replace(' ', '-')
    if (fileName.includes('.png')) fileName = fileName.replace('.png', '')
    if (fileName.includes('.jpg')) fileName = fileName.replace('.jpg', '')
    if (fileName.includes('.jpeg')) fileName = fileName.replace('.jpeg', '')
    const extension = FILE_TYPE_MAP[file.mimetype]
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  },
})

const uploadOptions = multer({ storage: storage })

//GET ALL PRODUCTS

router.get(`/`, async (req, res) => {
  //FILTER PRODUCTS
  let filter = {}
  if (req.query.categories) {
    filter = { category: req.query.categories.split(',') }
  }
  try {
    const productList = await Product.find(filter).populate('category')
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

router.post(`/`, uploadOptions.single('image'), async (req, res) => {
  try {
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid Category')

    const file = req.file
    !file && res.status(400).send('No image file in request')

    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: `${basePath}${fileName}`,
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

router.put(`/:id`, uploadOptions.single('image'), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid Product Id')
  }
  try {
    const category = await Category.findById(req.body.category)
    if (!category) {
      return res.status(400).send('Invalid Category Id')
    }

    const product = await Product.findById(req.params.id)
    !product && res.status(400).send('Invalid Product')

    const file = req.file
    let imagePath

    if (file) {
      const fileName = req.file.filename
      const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
      imagePath = `${basePath}${fileName}`
    } else {
      imagePath = product.image
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: imagePath,
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
      return res
        .status(500)
        .send({ message: 'Product can not be updated', success: false })
    }
    res.status(200).send(updatedProduct)
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
})

//DELETE A PRODUCT

router.delete('/:id', async (req, res) => {
  try {
    const id = await Product.findById(req.params.id)
    if (id) res.status(200).json({ success: true, message: 'deleted!' })
    else res.status(404).json({ success: false, message: 'Product not found' })
    await Product.findByIdAndRemove(id)
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

//PRODUCT COUNT

router.get(`/get/count`, async (req, res) => {
  try {
    const productCount = await Product.countDocuments()
    res.send({ productCount })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

//FEATURED PRODUCTS

router.get(`/get/featured/:count`, async (req, res) => {
  const count = req.params.count ? req.params.count : 0
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).limit(
      +count
    )
    res.send(featuredProducts)
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

//UPLOAD IMAGE GALLERY
router.put(
  '/gallery-images/:id',
  uploadOptions.array('images', 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send('Invalid Product Id')
    }
    try {
      const product = await Product.findById(req.params.id)
      !product && res.status(400).send('Invalid Product')

      const files = req.files
      const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
      let imagesPaths = []

      if (files) {
        files.map((file) => {
          imagesPaths.push(`${basePath}${file.filename}`)
        })
      } else {
        imagePath = product.image
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          images: imagesPaths,
        },
        { new: true }
      )
      if (!updatedProduct) {
        return res
          .status(500)
          .send({ message: 'Product can not be updated', success: false })
      }
      res.status(200).send(updatedProduct)
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: error.message })
    }
  }
)

module.exports = router
