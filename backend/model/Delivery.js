var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Delivery = new Schema({
  ic_id: String,
  item_name: String,
  item_unit: String,
  donate_dt: Number,
  print_dt: Number,
  expire_dt Number,
  qt: Number,
  memo: String
}, {
  versionKey: false
});

module.exports = mongoose.model('Delivery', Delivery);
