const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const sanitize = require('express-mongo-sanitize')
const path = require('path')
const limiter = require('./middleware/limiter')
const requireAuth = require('./middleware/requireAuth')
const handleErrors = require('./middleware/handleErrors')
const authRoute = require('./routes/auth.route')
const saucesRoute = require('./routes/sauces.route')

require('dotenv').config()

const app = express()

// Connect to db
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log('Failed to connect to db', err))

// Base middleware
app.use(express.json())
app.use(cors())

// Security middleware
app.use(helmet())
app.use(sanitize())
app.use('/api', limiter)

// Static
app.use(express.static(path.join(__dirname, '../public')))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/sauces', requireAuth, saucesRoute)

app.use(handleErrors)

module.exports = app
