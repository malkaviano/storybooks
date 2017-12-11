'use strict';

const mongoose = require('mongoose');

// Use native promise
mongoose.Promise = global.Promise;

const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

mongoose.connect(
  process.env.MONGO_URI,
  options,
).then(db => console.log(`MongoDB connected to: ${process.env.MONGO_URI}`))
.catch(err => { 
  console.log(`DB Error: ${err}`);

  throw err;
});

module.exports = mongoose;