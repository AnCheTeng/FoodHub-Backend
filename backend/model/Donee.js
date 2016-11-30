var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Donee = new Schema({
  ic: String,
  name: String,
  phone: String,
  mobile: String,
  email: String,
  address: String,
  contact: String,
  area: String,
  category: String,
  house: Number,
  people: Number,
}, {
  versionKey: false
});

module.exports = mongoose.model('Donee', Donee);
