var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Donation = new Schema({
  dn_id: String,
  donor_name: String,
  contractor: String,
  item_name: String,
  area: String,
  expire_dt: Number,
  category: String,
  weight: Number,
  item_unit: String,
  item_qt: Number,
  memo: String,
  donate_dt: Number,
  stock_id: Schema.Types.ObjectId,
}, {
  versionKey: false
});

module.exports = mongoose.model('Donation', Donation);
