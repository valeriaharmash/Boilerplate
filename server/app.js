const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const volleyball = require('volleyball');

const app = express();

// logging middleware
app.use(volleyball);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

// CORS policy to accept front-end requests
app.use(cors());

// API routes
app.use('/api', require('./api'));

// error handling
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
