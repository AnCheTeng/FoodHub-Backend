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
  .get(function(request, response) {
    // For temporary testing
    var accountDetail = {
      account: request.params.account,
      name: request.params.account,
      permission: "Admin"
    }
    response.send(accountDetail);
  })
  .post(function(request, response) {
    if (request.body.password != "foodbank") {
      response.status(404);
      response.send({
        error: "Login fails : Invalid account or wrong password"
      });
    } else {
      var accountDetail = {
        account: request.params.account,
        name: request.params.account,
        permission: "Admin"
      }
      response.send(accountDetail);
    }
  })


module.exports = router;
