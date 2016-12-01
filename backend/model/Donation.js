var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Donation = new Schema({
  D_serial: String,
  donor_name: String,
  item_name: String,
  expire_dt: Date,
  category: String,
  weight: Number,
  item_unit: String,
  item_qt: Number,
  memo: String,
  donate_dt: Date
}, {
  versionKey: false
});

module.exports = mongoose.model('Donation', Donation);
