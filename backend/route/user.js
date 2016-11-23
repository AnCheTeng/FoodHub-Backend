var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../model/User');

var router = express.Router();
var parseUrlencoded = bodyParser.urlencoded({
  extended: false
});

// mongoose.createConnection('mongodb://localhost/foodbank');

router.route('/login/:account')
  .get(parseUrlencoded, function(request, response) {
    // For temporary testing
    var accountDetail = {
      account: request.params.account,
      name: request.params.account,
      permission: "Admin"
    }
    response.send(accountDetail);
  });


module.exports = router;
