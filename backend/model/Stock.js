var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
  item_id: Schema.Types.ObjectId,
  item_name: String,
  item_unit: String,
  item_qt: Number,
  expire_dt: Number,
  donor_name: String
}, {
  versionKey: false
});

module.exports = mongoose.model('Stock', Stock);
