var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Barcode = new Schema({
  item_id: String,
  bar_code: String,
  item_name: String,
  item_unit: String,
  item_unitprice: Number
}, {
  versionKey: false
});

module.exports = mongoose.model('Barcode', Barcode);
