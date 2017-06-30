var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

var Delivery = require('../model/Delivery');
var Stock = require('../model/Stock');
var Donee = require('../model/Donee');
var User = require('../model/User');

router.route('/max_dvid')
  .get(function(req, res) {
    Delivery.find().sort({
      dv_id: -1
    }).limit(1).exec(function(err, maxResult) {
      if (err) {
        res.status(404).send({
          warning: "ERROR"
        });
      }

      if (maxResult.length > 0 && !isNaN(maxResult[0].dv_id)) {
        res.status(200).send(maxResult[0].dv_id);
      } else {
        var time = new Date();
        var new_dvid = (time.getFullYear() - 1911) + "0000";
        console.log(new_dvid);
        res.status(200).send(new_dvid);
      }
    });
  })

router.route('/list')
  .get(function(req, res) {
    Delivery.find().sort({
      "_id": -1
    }).exec(function(err, result) {
      res.status(200).send(result);
    });
  })

router.route('/:dv_id')
  .get(function(req, res) {

    var searchKey = req.query.searchKey;
    var searchName = decodeURI(req.params.dv_id);
    var itemQuery = {};
    itemQuery[searchKey] = searchName;

    Delivery.find(itemQuery).exec(function(err, result) {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({
          error: "Item not found",
          searchKey: req.query.searchKey,
          searchName: req.params.dv_id,
          theQuery: itemQuery
        });
      }
    });
  })
  .post(function(req, res) {

    var promiseList = [];

    promiseList.push(Stock.findOne({
      _id: req.body.stock_id
    }).exec());

    promiseList.push(Donee.findOne({
      donee_name: req.body.donee_name
    }).exec());

    promiseList.push(User.findOne({
      account: req.body.contractor
    }).exec());

    Promise.all(promiseList).then(function(promiseResults) {

      var foundStock = promiseResults[0]
      if (!foundStock) {
        res.status(404).send({
          error: "Item is not found!"
        });
        return;
      } else if (req.body.item_qt > foundStock.item_qt) {
        res.status(400).send({
          error: "Item is not enough!"
        });
        return;
      }

      var foundDonee = promiseResults[1]
      if(!foundDonee) {
        res.status(404).send({
          error: "Donee is not found!"
        });
        return;
      }

      var foundUser = promiseResults[2]
      if(!foundUser) {
        res.status(404).send({
          error: "Contractor is not found!"
        })
        return;
      }

      var newDeliveryItem = {
        dv_id: req.params.dv_id,
        donee_name: req.body.donee_name,
        contractor: req.body.contractor,
        delivery_dt: req.body.delivery_dt,
        item_name: foundStock.item_name,
        item_unit: foundStock.item_unit,
        item_qt: req.body.item_qt,
        expire_dt: foundStock.expire_dt,
        memo: req.body.memo
      }
      var newDelivery = new Delivery(newDeliveryItem);
      newDelivery.save();
      res.status(200).send({
        success: "The item has been delivered"
      });
      foundStock.item_qt = foundStock.item_qt - req.body.item_qt;
      if (foundStock.item_qt == 0) {
        foundStock.remove();
      } else {
        foundStock.save();
      }

    })
    //
    // Stock.findOne({
    //   _id: req.body.stock_id
    // }).exec(function(err, foundStock) {
    //   if (!foundStock) {
    //     res.status(404).send({
    //       error: "Item is not found"
    //     });
    //   } else if (req.body.item_qt > foundStock.item_qt) {
    //     res.status(400).send({
    //       error: "Item is not enough"
    //     });
    //   } else {
    //
    //   }
    // })
  })
  // .delete(function(req, res) {
  //   res.status(200).send("HI");
  // })


function wrong_dvid(new_dv_id) {
  new_dv_id = new_dv_id + "";
  var time = new Date();
  var taiwan_year = time.getFullYear() - 1911;

  if (new_dv_id.indexOf(taiwan_year) != 0 || new_dv_id.length != 7) {
    return true;
  } else {
    return false;
  }
}

function errTest(err) {
  if (err) console.log(err);
}


module.exports = router;
