const express = require('express')
const mongoose = require('mongoose')
const app = express()
const morgan = require('morgan')

require('dotenv/config')
const mongoUrl = process.env.MONGODB_URL

//Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('tiny'))

//Routers
const categoryRoutes = require('./routes/categoryRoutes')
const orderRoutes = require('./routes/orderRoutes')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

const api = process.env.API_URL

app.use(`${api}/categories`, categoryRoutes)
app.use(`${api}/orders`, orderRoutes)
app.use(`${api}/products`, productRoutes)
app.use(`${api}/users`, userRoutes)

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err))

app.listen(3000, () => {
  console.log(api)
  console.log('Server listening on port 3000')
})
