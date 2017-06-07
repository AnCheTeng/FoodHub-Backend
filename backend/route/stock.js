var express = require('express');
var router = express.Router();

var Stock = require('../model/Stock');
var Barcode = require('../model/Barcode');

router.route('/expire_dt/:days')
  .get(function(req, res) {
    var days = parseInt(req.params.days);

    if (days > 30 || days < 1) {
      res.status(400).send({
        warning: "Bad request"
      })
    } else {

      var date1 = +new Date;
      var date2 = date1 + Date.parse("2017/1/" + (1 + days)) - Date.parse("2017/1/1");

      Stock.find({
        "expire_dt": {
          $gt: date1,
          $lt: date2
        }
      }).sort("expire_dt").exec(function(err, result) {
        if (result.length > 0) {
          res.status(200).send(result);
        } else {
          res.status(404).send({
            warning: "All foods are expired within " + days + " days",
          });
        }
      });
    }
  })

router.route('/barcode/:barcode')
  .get(function(req, res) {
    Barcode.findOne({
      barcode: req.params.barcode
    }).exec(function(err, result) {
      if (result) {
        Stock.find({
          item_name: result.item_name
        }).exec(function(err, stocks) {
          if (stocks) {
            res.status(200).send(stocks);
          } else {
            res.status(404).send({
              warning: "Stocks not found!"
            });
          }
        })
      } else {
        res.status(404).send({
          warning: "Barcode not found!"
        });
      }
    })
  })
module.exports = router;
