var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Delivery = new Schema({
  R_serial: String,
  R_name: String,
  R_dt: Date,
  R_man: String,
  R_unit: Number,
  unit: String,
  R_unit: String,
  Quantity: Number,
  type: String,
  memo: String,
  create_dt: Date,
  update_dt: Date
}, {
  versionKey: false
});

module.exports = mongoose.model('Delivery', Delivery);
