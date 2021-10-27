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

router.post('/', async (req, res) => {
  try {
    const { name, icon, color } = req.body
    let category = new Category({
      name,
      icon,
      color,
    })
    category = await category.save()
    res.send(category)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

module.exports = router
