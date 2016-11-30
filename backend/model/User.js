var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  unit: String,
  phone: String,
  area: String,
  auth: Number,
  account: String,
  pw: String,
  create_dt: Date,
  update_dt: Date,
  delete_dt: Date
}, {
  versionKey: false
});

module.exports = mongoose.model('User', User);
