const { hashPassword } = require('../../utils');

const { Sequelize } = require('sequelize');
const db = require('../database');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

User.beforeCreate(async (user) => {
  user.password = await hashPassword(user.password);
});

module.exports = User;
