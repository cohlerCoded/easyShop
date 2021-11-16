const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
})

exports.Order = mongoose.model('OrderItem', orderItemSchema)
