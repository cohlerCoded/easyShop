const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const protect = require('./utils/jwt')
const errorHandler = require('./utils/error-handler')
require('dotenv/config')

app.use(cors())
app.options('*', cors())

//Middleware//
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('tiny'))
app.use(protect())
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(errorHandler)

//Routers
const categoryRoutes = require('./routes/categoryRoutes')
const orderRoutes = require('./routes/orderRoutes')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const authJwt = require('./utils/jwt')

const api = process.env.API_URL

app.use(`${api}/categories`, categoryRoutes)
app.use(`${api}/orders`, orderRoutes)
app.use(`${api}/products`, productRoutes)
app.use(`${api}/users`, userRoutes)

const mongoUrl = process.env.MONGODB_URL

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
