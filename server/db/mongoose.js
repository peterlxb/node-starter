const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = "mongodb://heroku_6b7nwrxh:ksim8qc2aguc4jvecjp828a0u0@ds123556.mlab.com:23556/heroku_6b7nwrxh";

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.00.1:27017/TodoApp');

module.exports = {
    mongoose
};