const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem',
      required: true,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  address1: {
    type: String,
    required: true,
    default: '',
  },
  address2: {
    type: String,
    required: true,
    default: '',
  },
  city: {
    type: String,
    required: true,
    default: '',
  },
  state: {
    type: String,
    default: '',
  },
  zip: {
    type: String,
    required: true,
    default: '',
  },
  country: {
    type: String,
    required: true,
    default: '',
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
  },
  totalPrice: {
    type: Number,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
})

orderSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

orderSchema.set('toJSON', {
  virtuals: true,
})

exports.Order = mongoose.model('Order', orderSchema)
