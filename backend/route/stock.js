var express = require('express');
var router = express.Router();

var Stock = require('../model/Stock');
var Barcode = require('../model/Barcode');

router.route('/list')
  .get(function(req, res) {
    Stock.find().sort({
      "_id": -1
    }).exec(function(err, result) {
      res.status(200).send(result);
    });
  })

router.route('/:query_attr')
  .get(function(req, res) {

    var searchKey = req.query.searchKey;
    var searchName = decodeURI(req.params.query_attr);
    var itemQuery = {};
    itemQuery[searchKey] = searchName;

    Stock.find(itemQuery).exec(function(err, result) {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({
          error: "找不到此庫存！",
          searchKey: req.query.searchKey,
          searchName: req.params.dn_id,
          theQuery: itemQuery
        });
      }
    });
  })

router.route('/expire_dt/:days')
  .get(function(req, res) {
    var days = parseInt(req.params.days);

    if (days > 30 || days < 1) {
      res.status(400).send({
        warning: "找得日期太遠囉！"
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
            warning: "沒有在" + days + "天內快過期的食物！",
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
              warning: "找不到庫存!"
            });
          }
        })
      } else {
        res.status(404).send({
          warning: "找無此條碼!"
        });
      }
    })
  })
module.exports = router;
