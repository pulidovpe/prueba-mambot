// database.js
const mongoose = require('mongoose');
const { db: { host, port, name } } = require('./config');

const connStr = `mongodb://${host}:${port}/${name}`;
// mongoose.Promise = global.Promise;
mongoose.connect(connStr)
  .then( db => console.log('DB is connected') )
  .catch( err => console.error(err.stack) );

module.exports = mongoose;