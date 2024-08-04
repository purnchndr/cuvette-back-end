const express = require('express');

//* Util imports
const { serverLog } = require('./logs/logs');
const { errorHandeler } = require('./error/error');
// const { authUser } = require('./controllers/user');

//* Routers import
const userRouter = require('./routes/user');
const jobRouter = require('./routes/job');

const app = express();

app.use(express.json());
app.use(serverLog);
// app.use(authUser);
app.use('/user', userRouter);
app.use('/job', jobRouter);

app.get('*', (req, res, next) => {
  res.status(200).json({ message: 'Hi there!' });
});

app.use(errorHandeler);

module.exports = app;
