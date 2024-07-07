const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

async function start() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('DB Connected');
  app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
}

start().catch(e => console.log(e));

//* https://github.com/ishar19/backend_cap_feb;
