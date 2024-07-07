const express = require('express');
const { serverLog } = require('./logs/logs');
const { errorHandeler } = require('./error/error');

const app = express();

app.use(serverLog);

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Hi there!' });
});

app.use(errorHandeler);

module.exports = app;
