const express = require('express');
const path = require('path');
const cors = require('cors');
const volleyball = require('volleyball');

const app = express();

// logging middleware
app.use(volleyball);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());

app.use('/api', require('./api'));

module.exports = app;
