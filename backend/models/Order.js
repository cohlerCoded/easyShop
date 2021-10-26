const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

exports.Order = mongoose.model('Order', orderSchema)
