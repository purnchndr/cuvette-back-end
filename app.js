const express = require('express');
const { serverLog } = require('./logs/logs');
const { errorHandeler } = require('./error/error');
const authRouther = require('./routes/auth');
const { authUser } = require('./controllers/auth');

const app = express();

app.use(serverLog);
app.use(express.json());
app.use(authUser);

app.use('/auth', authRouther);

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Hi there!' });
});

app.use(errorHandeler);

module.exports = app;
