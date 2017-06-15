var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

var Delivery = require('../model/Delivery');
var Stock = require('../model/Stock');

router.route('/max_dnid')
  .get(function(req, res) {
    Delivery.find().sort({
      dn_id: -1
    }).limit(1).exec(function(err, maxResult) {
      if (err) {
        res.status(404).send({
          warning: "ERROR"
        });
      }

      if (maxResult.length > 0 && !isNaN(maxResult[0].dn_id)) {
        res.status(200).send(maxResult[0].dn_id);
      } else {
        var time = new Date();
        var new_dnid = (time.getFullYear() - 1911) + "0000";
        console.log(new_dnid);
        res.status(200).send(new_dnid);
      }
    });
  })

router.route('/:dn_id')
  .post(function(req, res) {
    Stock.findOne({
      _id: req.body.stock_id
    }).exec(function(err, found_stock) {
      if (req.body.item_qt > found_stock.item_qt) {
        res.status(404).send({
          error: "Item is not enough"
        });
      } else {
        var newDeliveryItem = {
          dn_id: req.params.dn_id,
          ic: req.body.ic,
          donee_name: req.body.donee_name,
          contractor: req.body.contractor,
          delivery_dt: req.body.delivery_dt,
          item_name: found_stock.item_name,
          item_unit: found_stock.item_unit,
          item_qt: req.body.item_qt,
          expire_dt: found_stock.expire_dt,
          memo: req.body.memo
        }
        var newDelivery = new Delivery(newDeliveryItem);
        newDelivery.save();
        res.status(200).send({
          success: "The item has been delivered"
        });
        found_stock.item_qt = found_stock.item_qt - req.body.item_qt;
        if (found_stock.item_qt == 0) {
          found_stock.remove();
        } else {
          found_stock.save();
        }
      }
    })
  })
  // .delete(function(req, res) {
  //   res.status(200).send("HI");
  // })


function wrong_dnid(new_dn_id) {
  new_dn_id = new_dn_id + "";
  var time = new Date();
  var taiwan_year = time.getFullYear() - 1911;

  if (new_dn_id.indexOf(taiwan_year) != 0 || new_dn_id.length != 7) {
    return true;
  } else {
    return false;
  }
}

function errTest(err) {
  if (err) console.log(err);
}


module.exports = router;
