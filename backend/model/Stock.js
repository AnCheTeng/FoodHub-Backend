var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
  item_id: String,
  item_name: String,
  item_unit: String,
  item_qt: Number,
  expiry_date: Date
}, {
  versionKey: false
});

module.exports = mongoose.model('Stock', Stock);
