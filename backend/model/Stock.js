var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
  dn_id: String,
  item_name: String,
  item_unit: String,
  item_unitprice: Number,
  item_qt: Number,
  category: String,
  expire_dt: Number,
  donor_name: String
}, {
  versionKey: false
});

module.exports = mongoose.model('Stock', Stock);
