const express = require('express')
const router = express.Router()
const { Order } = require('../models/Order')
const { OrderItem } = require('../models/OrderItem')

// GET ALL ORDERS

router.get(`/`, async (req, res) => {
  try {
    const orderList = await Order.find().populate('user')
    res.send(orderList)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

// POST A NEW ORDER

router.post('/', async (req, res) => {
  try {
    const orderItemsIds = await Promise.all(
      req.body.orderItems.map(async (item) => {
        let newOrderItem = new OrderItem({
          quantity: item.quantity,
          product: item.product,
        })
        newOrderItem = await newOrderItem.save()
        return newOrderItem._id
      })
    )

    let order = new Order({
      orderItems: orderItemsIds,
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
    order = await order.save()
    !order && res.status(400).send('Order could not be created')
    res.send(order)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

module.exports = router
