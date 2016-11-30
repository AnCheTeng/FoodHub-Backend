var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Donation = require('../model/Donation');

var router = express.Router();

mongoose.createConnection('mongodb://localhost/foodbank');

router.route('/donateItem/:itemId')
  .get(function(request, response) {
    response.send(request.params.itemId);
  })
  .post(function(request, response) {
    response.send(request.params.itemId);
  })
  .delete(function(request, response) {
    response.send(request.params.itemId);
  })


module.exports = router;
