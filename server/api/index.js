'use strict';

const router = require('express').Router();
const usersRouter = require('./routes/users');

router.use('/users', usersRouter);

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
