var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Donation = require('../model/Donation');

var router = express.Router();

mongoose.createConnection('mongodb://localhost/foodbank');


function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function errTest (err){
  if(err) console.log(err);
}
router.route('/donateItem/:itemId')
  .get(function(request, response) {
    response.send(request.params.itemId);
  })
  .post(function(request, response) {
    console.log("POST /donateItem/:itemId");

    request.params.itemId = pad(request.params.itemId, 24);
    request.body.expiryDate = Date.parse(request.body.expiryDate);
    request.body.donateDate = Date.parse(request.body.donateDate);
    request.body.weight = parseInt(request.body.weight);
    request.body.quantity = parseInt(request.body.quantity);

    var safetyCheck = isNaN(request.body.expiryDate) || isNaN(request.body.donateDate)
                      || isNaN(request.body.weight) || isNaN(request.body.quantity);

    if(safetyCheck == true) {
      response.send({ error : "Something wrong with Date or quantity or weight" });
      return;
    }

    var newDonateItem = {
      _id: new mongoose.Types.ObjectId(request.params.itemId),
      D_serial: request.body.serialNumber,
      donor_name: request.body.donater,
      item_name: request.body.name,
      expire_dt: request.body.expiryDate,
      category: request.body.category,
      weight: request.body.weight,
      item_unit: request.body.unit,
      item_qt: request.body.quantity,
      memo: request.body.record,
      donate_dt: request.body.donateDate
    };

    Donation.findOne({
      _id: request.params.itemId
    }).exec(function(err, result) {
      if(result){
        response.send({ error : "Something wrong with this Id: Duplicate" });
      } else {
        var newDonation = new Donation(newDonateItem);
        newDonation.save(errTest);
        response.send({ success : "New item has been created" });
      }
    });
  })
  .delete(function(request, response) {
    response.send(request.params.itemId);
  })


module.exports = router;
