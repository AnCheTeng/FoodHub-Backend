var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  user_name: String,
  user_unit: String,
  phone: String,
  area: String,
  auth: Number,
  account: String,
  password: String
}, {
  versionKey: false
});

module.exports = mongoose.model('User', User);
