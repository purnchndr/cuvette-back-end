const { serverLog, errorLog } = require('../logs/logs');

function errorHandeler(err, req, res, next) {
  const error = `[${new Date().toTimeString()}] || ${req.method} || ${
    req.ip
  } \n \t ${err}`;
  errorLog(error);
  console.log('Error: ', err.message);
  res.status(500).json({ error: err.message, message: 'something went wrong' });
}

module.exports = { errorHandeler };
