var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Donor = new Schema({
  ic: String,
  name: String,
  phone: String,
  mobile: String,
  email: String,
  address: String,
  contact: String,
  area: String,
  category: String
}, {
  versionKey: false
});

module.exports = mongoose.model('Donor', Donor);
