const express = require('express')
const router = express.Router()
const { Order } = require('../models/Order')

// GET ALL ORDERS

router.get(`/`, async (req, res) => {
  try {
    const orderList = await Order.find()
    res.send(orderList)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

// POST A NEW ORDER

router.post('/', async (req, res) => {
  try {
    let order = new Order({
      orderItems: req.body.orderItems,
      user: req.body.user,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      toatlPrice: req.body.toatlPrice,
    })
    order = await category.save()
    !order && res.status(400).send('Order could not be created')
    res.send(order)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

module.exports = router
