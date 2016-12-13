var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Donation = new Schema({
  _id: Schema.Types.ObjectId,
  donor_name: String,
  item_name: String,
  area: String,
  expire_dt: Number,
  category: String,
  weight: Number,
  item_unit: String,
  item_qt: Number,
  memo: String,
  donate_dt: Number,
}, {
  versionKey: false
});

module.exports = mongoose.model('Donation', Donation);
