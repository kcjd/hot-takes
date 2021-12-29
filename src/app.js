const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.route');
const handleErrors = require('./middleware/handleErrors');

require('dotenv').config();

const app = express();

// Connect to db
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log('Failed to connect to db', err));

// Base middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);

app.use(handleErrors);

module.exports = app;
