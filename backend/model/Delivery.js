var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Delivery = new Schema({
  dn_id: String,
  ic: String,
  donee_name: String,
  contractor: String,
  delivery_dt: Number,
  item_name: String,
  item_unit: String,
  item_qt: Number,
  expire_dt: Number,
  memo: String
}, {
  versionKey: false
});

module.exports = mongoose.model('Delivery', Delivery);
