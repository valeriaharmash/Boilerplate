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

const dbConnectionSTRING =
  process.env.DATABASE_URL || 'postgres://localhost:5432/boilerplate';

const db = new Sequelize(dbConnectionSTRING, {
  config,
});

module.exports = db;
