const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.00.1:27017/TodoApp');

module.exports = {
    mongoose
};