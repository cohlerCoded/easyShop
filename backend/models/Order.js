const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

mongoose.model('Order', orderSchema)
