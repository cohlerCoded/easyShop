const express = require('express')
const router = express.Router()
const { User } = require('../models/User')

router.get(`/`, async (req, res) => {
  try {
    const userList = await User.find()
    res.send(userList)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

module.exports = router
