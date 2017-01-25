var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

var Donation = require('../model/Donation');
var Stock = require('../model/Stock');
var Barcode = require('../model/Barcode');

function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function errTest(err) {
  if (err) console.log(err);
}

router.route('/list')
  .get(function(req, res) {
    Donation.find().exec(function(err, result) {
      res.status(200).send(result);
    });
  })


router.route('/:itemId')
  .get(function(req, res) {

    var searchKey = req.query.searchKey;
    var searchName = (req.query.searchKey == "_id" ? pad(req.params.itemId, 24)
                     : decodeURI(req.params.itemId));
    var itemQuery = {};
    itemQuery[searchKey] = searchName;

    Donation.find(itemQuery).exec(function(err, result) {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({
          error: "Item not found",
          searchKey: req.query.searchKey,
          searchName: req.params.itemId,
          theQuery: itemQuery
        });
      }
    });
  })
  .post(function(req, res) {
    req.params.itemId = pad(req.params.itemId, 24);
    // console.log(req.body);
    // req.body.expiryDate = Date.parse(req.body.expiryDate);
    // req.body.donateDate = Date.parse(req.body.donateDate);
    req.body.weight = parseInt(req.body.weight);
    req.body.quantity = parseInt(req.body.item_qt);
    req.body.price = parseFloat(req.body.item_unitprice);

    var safetyCheck = isNaN(req.body.expire_dt) || isNaN(req.body.donate_dt) ||
      isNaN(req.body.weight) || isNaN(req.body.item_qt);

    if (safetyCheck == true) {
      res.status(404).send({
        error: "Something wrong with Date or quantity or weight"
      });
      return;
    }

    var newDonateItem = {
      _id: new mongoose.Types.ObjectId(req.params.itemId),
      donor_name: req.body.donor_name,
      item_name: req.body.item_name,
      area: req.body.area,
      expire_dt: req.body.expire_dt,
      category: req.body.category,
      weight: req.body.weight,
      item_unit: req.body.item_unit,
      item_qt: req.body.item_qt,
      memo: req.body.item_qt,
      donate_dt: req.body.donate_dt
    };
    var newStockItem = {
      item_id: new mongoose.Types.ObjectId(req.params.itemId),
      item_name: req.body.item_name,
      item_unit: req.body.item_unit,
      item_qt: req.body.item_qt,
      expiry_date: req.body.expiry_date,
      donor_name: req.body.donor_name
    }
    var newBarcodeItem = {
      barcode: req.body.barcode,
      item_name: req.body.item_name,
      item_unit: req.body.item_unit,
      item_unitprice: req.body.item_unitprice
    }

    var donationPromise = Donation.findOne({
      _id: req.params.itemId
    }).exec(function(err, result) {
      if (result) {
        result.remove();
      }
      var newDonation = new Donation(newDonateItem);
      newDonation.save(errTest);
    });
    var stockPromise = Stock.findOne({
      item_id: req.params.itemId
    }).exec(function(err, result) {
      if (result) {
        result.remove();
      }
      var newStock = new Stock(newStockItem);
      newStock.save(errTest);
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
