const express = require('express')
const router = express.Router()
const { User } = require('../models/User')
const bcrypt = require('bcryptjs')

// GET ALL USERS

router.get(`/`, async (req, res) => {
  try {
    const userList = await User.find().select('-password')
    res.send(userList)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

// GET A SINGLE USER

router.get(`/:id`, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      res
        .status(404)
        .send({ message: 'User with given Id not found', success: false })
    }
    res.status(200).send(user)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

// CREATE NEW USER

router.post('/', async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      street: req.body.street,
      apartment: req.body.apartment,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
    })
    user = await user.save()
    !user && res.status(400).send('The user could not be created')
    res.send(user)
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

module.exports = router
