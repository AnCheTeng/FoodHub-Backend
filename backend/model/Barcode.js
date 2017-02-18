var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Barcode = new Schema({
  barcode: String,
  item_name: String,
  item_unit: String
}, {
  versionKey: false
});

module.exports = mongoose.model('Barcode', Barcode);
