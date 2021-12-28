const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.route');
const handleErrors = require('./middleware/handleErrors');

require('dotenv').config();

const app = express();
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Connect to db
mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ah27n.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log('Failed to connect to db', err));

// Base middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);

app.use(handleErrors);

module.exports = app;
