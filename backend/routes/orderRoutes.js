const express = require('express')
const router = express.Router()
const { Order } = require('../models/Order')
const { OrderItem } = require('../models/OrderItem')
const { Product } = require('../models/Product')

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

// GET USER ORDERS

router.get(`/get/userorders/:id`, async (req, res) => {
  try {
    const userOrderList = await Order.find({ user: req.params.id })
      .populate({
        path: 'orderItems',
        populate: { path: 'product', populate: 'category' },
      })
      .sort({ dateOrdered: -1 })
    res.send(userOrderList)
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
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
        const price = await Product.findById(item.product).populate('price')
          .price
        let newOrderItem = new OrderItem({
          quantity: item.quantity,
          product: item.product,
          price,
        })
        newOrderItem = await newOrderItem.save()
        return newOrderItem._id
      })
    )

    const totalPrices = await Promise.all(
      orderItemsIds.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          'product',
          'price'
        )
        const toatlPrice = orderItem.product.price * orderItem.quantity
        return toatlPrice
      })
    )

    const totalPricesSum = totalPrices.reduce((sum, price) => (sum += price), 0)

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
      totalPrice: totalPricesSum,
    })

    order = await order.save()
    !order && res.status(400).send('Order could not be created')
    res.send(order)
  } catch (error) {
    res.status(500).json({ success: false })
    console.log(error)
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
    const order = await Order.findById(req.params.id)
    if (order) {
      order.orderItems.map(async (orderItem) => {
        if (orderItem._id) {
          await OrderItem.findByIdAndRemove(orderItem._id)
        } else {
          res
            .status(404)
            .json({ success: false, message: 'Order Item not found' })
        }
      })
      await Order.findByIdAndRemove(order._id)
      res.status(200).json({ success: true, message: 'Deleted!' })
    } else {
      res.status(404).json({ success: false, message: 'Order not found' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

//get totalSales

router.get('/get/totalsales', async (req, res) => {
  try {
    //My solution
    // let ordersPrices = await Order.find({}).select('totalPrice')
    // ordersPrices = ordersPrices.map((item) => item.totalPrice)
    // const totalRevenue = ordersPrices.reduce(
    //   (sum, orderTotal) => (sum += orderTotal),
    //   0
    // )
    // res.json({ totalRevenue })
    //aggregate
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } },
    ])
    !totalSales && res.status(400).send('The order sales can not be generated')
    res.send({ totalsales: totalSales.pop().totalsales })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false })
  }
})

//get order count

router.get(`/get/count`, async (req, res) => {
  try {
    const orderCount = await Order.countDocuments()
    res.send({ orderCount })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router
