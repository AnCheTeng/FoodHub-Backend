var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Donation = require('../model/Donation');
var Stock = require('../model/Stock');
var Barcode = require('../model/Barcode');

var router = express.Router();

function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function errTest(err) {
  if (err) console.log(err);
}


router.use('/:itemId', function(req, res, next) {
  // log
  console.log('Request Type:', req.method);
  console.log('Response URL:', req.originalUrl);
  console.log("----------------------------------------");
  next();
}, function(req, res, next) {
  // id-preprocess
  next();
});

router.route('/:itemId')
  .get(function(req, res) {

    var searchKey = (req.body.searchKey == "id" ? "_id"
                     : req.body.searchKey);
    var searchName = (req.body.searchKey == "id" ? pad(req.params.itemId, 24)
                     : decodeURI(req.params.itemId));
    var itemQuery = {};
    itemQuery[searchKey] = searchName;

    Donation.find(itemQuery).exec(function(err, result) {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({
          error: "Item not found",
          searchKey: req.body.searchKey,
          searchName: req.params.itemId,
          theQuery: itemQuery
        });
      }
    });
  })
  .post(function(req, res) {
    req.params.itemId = pad(req.params.itemId, 24);
    console.log(req.body);
    req.body.expiryDate = Date.parse(req.body.expiryDate);
    req.body.donateDate = Date.parse(req.body.donateDate);
    req.body.weight = parseInt(req.body.weight);
    req.body.quantity = parseInt(req.body.quantity);
    req.body.price = parseFloat(req.body.price);

    var safetyCheck = isNaN(req.body.expiryDate) || isNaN(req.body.donateDate) ||
      isNaN(req.body.weight) || isNaN(req.body.quantity);

    if (safetyCheck == true) {
      res.status(404).send({
        error: "Something wrong with Date or quantity or weight"
      });
      return;
    }

    var newDonateItem = {
      _id: new mongoose.Types.ObjectId(req.params.itemId),
      D_serial: req.body.serialNumber,
      donor_name: req.body.donater,
      item_name: req.body.name,
      expire_dt: req.body.expiryDate,
      category: req.body.category,
      weight: req.body.weight,
      item_unit: req.body.unit,
      item_qt: req.body.quantity,
      memo: req.body.record,
      donate_dt: req.body.donateDate
    };
    var newStockItem = {
      item_id: new mongoose.Types.ObjectId(req.params.itemId),
      item_name: req.body.name,
      item_unit: req.body.unit,
      item_qt: req.body.quantity,
      expiry_date: req.body.expiryDate,
      donor_name: req.body.donater
    }
    var newBarcodeItem = {
      barcode: req.body.barcode,
      item_name: req.body.name,
      item_unit: req.body.unit,
      item_unitprice: req.body.price
    }

    var donationPromise = Donation.findOne({
      _id: req.params.itemId
    }).exec(function(err, result) {
      if (result) {
        res.send({
          error: "Something wrong with this Id: Duplicate"
        });
      } else {
        var newDonation = new Donation(newDonateItem);
        newDonation.save(errTest);
      }
    });
    var stockPromise = Stock.findOne({
      item_id: req.params.itemId
    }).exec(function(err, result) {
      if(!result) {
        var newStock = new Stock(newStockItem);
        newStock.save(errTest);
      }
    });
    var barcodePromise = Barcode.findOne({
      item_id: req.params.itemId
    }).exec(function(err, result) {
      if(!result){
        var newBarcode = new Barcode(newBarcodeItem);
        newBarcode.save(errTest);
      }
    });

    Promise.all([donationPromise, stockPromise, barcodePromise]).then(function(values){
      res.send({
        success: "New item has been created"
      });
    });

  })
  .delete(function(req, res) {
    req.params.itemId = pad(req.params.itemId, 24);

    Donation.findOne({
      _id: req.params.itemId
    }).exec(function(err, result) {
      if (result) {
        result.remove();
        Stock.findOne({
          item_id: req.params.itemId
        }).exec(function(err, result) {
          if(result){
            result.remove();
          }
          res.status(200).send({ success : "Item has been deleted" });
        })
      } else {
        res.status(404).send({ error : "Item not found" });
      }
    });
  })


module.exports = router;
