var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Delivery = new Schema({
  ic: String,
  item_name: String,
  item_unit: String,
  donate_dt: Date,
  print_dt: Date,
  expire_dt Date,
  qt: Number,
  memo: String
}, {
  versionKey: false
});

module.exports = mongoose.model('Delivery', Delivery);
