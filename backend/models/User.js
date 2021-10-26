const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

exports.User = mongoose.model('User', userSchema)
