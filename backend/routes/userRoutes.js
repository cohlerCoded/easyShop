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

// CREATE NEW USER

router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      passwordHash,
      street,
      apartment,
      city,
      zip,
      country,
      phone,
      isAdmin,
    } = req.body
    let user = new Category({
      name,
      email,
      passwordHash,
      street,
      apartment,
      city,
      zip,
      country,
      phone,
      isAdmin,
    })
    user = await user.save()
    !user && res.status(400).send('The user could not be created')
    res.send(user)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

module.exports = router
