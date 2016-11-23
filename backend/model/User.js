var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
}, {
  versionKey: false
});

module.exports = mongoose.model('User', User);
