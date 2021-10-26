const express = require('express')
const router = express.Router()
const { Category } = require('../models/Category')

router.get(`/`, async (req, res) => {
  try {
    const categoryList = await Category.find()
    res.send(categoryList)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

module.exports = router
