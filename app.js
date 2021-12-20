const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

require('dotenv').config();

const app = express();
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Connect to db
mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ah27n.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
  .then(() => console.log('Connected to db'))
  .catch((error) => console.log('Failed to connect to db', error));

// Base middleware
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);

module.exports = app;
