require('dotenv').config();
const Sequelize = require('sequelize');
const chalk = require('chalk');

const config = {
  logging: Boolean(process.env.LOGGING) ? true : false,
};

console.log(
  chalk.yellow('Opening database connection'),
  chalk.yellow(`logger enabled: ${config.logging}`)
);

const db = new Sequelize(`postgres://localhost:5432/boilerplate`, {
  config,
});

module.exports = db;
