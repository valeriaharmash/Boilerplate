require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => await bcrypt.hash(password, 10);

const verifyPassword = async (target, actual) =>
  await bcrypt.compare(actual, target);

const generateToken = (userId) => jwt.sign({ id: userId }, process.env.JWT);

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT);
};

module.exports = { hashPassword, verifyPassword, generateToken, decodeToken };
