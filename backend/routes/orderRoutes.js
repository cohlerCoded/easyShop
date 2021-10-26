const express = require('express')
const router = express.Router()
const { Order } = require('../models/Order')

router.get(`/`, async (req, res) => {
  try {
    const orderList = await Order.find()
    res.send(orderList)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

module.exports = router
