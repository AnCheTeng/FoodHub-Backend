var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Donee = new Schema({
  donee_name: String,
  phone: String,
  address: String,
  category: String,
  contact: String,
  contact_phone: String,
  email: String,
  house_num: Number,
  people_num: Number
}, {
  versionKey: false
});

module.exports = mongoose.model('Donee', Donee);
