const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const authRoute = require('./routes/auth.route')
const saucesRoute = require('./routes/sauces.route')
const requireAuth = require('./middleware/requireAuth')
const handleErrors = require('./middleware/handleErrors')

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

// Routes
app.use('/api/auth', authRoute)
app.use('/api/sauces', requireAuth, saucesRoute)

// Static
app.use(express.static(path.join(__dirname, '../public')))

app.use(handleErrors)

module.exports = app
