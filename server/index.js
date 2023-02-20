require('dotenv').config();
const { db } = require('./db');
const app = require('./app');
const chalk = require('chalk');
const port = process.env.PORT || 3001;

db.sync().then(function () {
  app.listen(port, () =>
    console.log(chalk.yellow(`Listening on port ${port}`))
  );
});
