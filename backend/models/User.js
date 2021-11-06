const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
    default: '',
  },
  apartment: {
    type: String,
    required: true,
    default: '',
  },
  city: {
    type: String,
    required: true,
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
  isAdmin: {
    type: Boolean,
    required: true,
  },
})

productSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

productSchema.set('toJSON', {
  virtuals: true,
})

exports.User = mongoose.model('User', userSchema)
