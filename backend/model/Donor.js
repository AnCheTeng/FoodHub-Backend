var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Donor = new Schema({
  ic: String,
  donor_name: String,
  phone: String,
  address: String,
  area: String,
  category: String,
  contact: String,
  contact_phone: String,
  email: String,
}, {
  versionKey: false
});

module.exports = mongoose.model('Donor', Donor);
