const express = require('express')
const router = express.Router()
const { Order } = require('../models/Order')
const { OrderItem } = require('../models/OrderItem')

// GET ALL ORDERS

router.get(`/`, async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate('user', 'name')
      .sort({ dateOrdered: -1 })
    res.send(orderList)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

// GET A SINGLE ORDER ORDERS

router.get(`/:id`, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name')
      .populate({
        path: 'orderItems',
        populate: { path: 'product', populate: 'category' },
      })
    !order && res.status(400).send('Order not found')
    res.send(order)
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

// UPDATE AN ORDER STATUS

router.put(`/:id`, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    )
    if (!order) {
      res
        .status(404)
        .send({ message: 'Order with given Id not found', success: false })
    }
    res.status(200).send(order)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

// DELETE AN ORDER

router.delete('/:id', async (req, res) => {
  try {
    const id = await Order.findById(req.params.id)
    if (id) {
      id.orderItems.forEach(async (id) => {
        const itemId = await OrderItem.findById(id)
        await Order.findByIdAndRemove(itemId)
      })
      res.status(200).json({ success: true, message: 'Deleted!' })
    } else {
      res.status(404).json({ success: false, message: 'Order not found' })
    }
    await Order.findByIdAndRemove(id)
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

module.exports = router
