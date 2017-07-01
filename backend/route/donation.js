var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

var Donation = require('../model/Donation');
var Stock = require('../model/Stock');
var Barcode = require('../model/Barcode');
var Donor = require('../model/Donor');
var User = require('../model/User');

router.route('/max_dnid')
  .get(function(req, res) {
    Donation.find().sort({
      dn_id: -1
    }).limit(1).exec(function(err, maxResult) {
      if (err) {
        res.status(404).send({
          warning: "Error!"
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

router.route('/list')
  .get(function(req, res) {
    Donation.find().sort({
      "_id": -1
    }).exec(function(err, result) {
      res.status(200).send(result);
    });
  })


router.route('/:dn_id')
  .get(function(req, res) {

    var searchKey = req.query.searchKey;
    var searchName = decodeURI(req.params.dn_id);
    var itemQuery = {};
    itemQuery[searchKey] = searchName;

    Donation.find(itemQuery).exec(function(err, result) {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({
          error: "找不到此物品！",
          searchKey: req.query.searchKey,
          searchName: req.params.dn_id,
          theQuery: itemQuery
        });
      }
    });
  })
  .post(function(req, res) {

    req.body.weight = parseInt(req.body.weight);
    req.body.quantity = parseInt(req.body.item_qt);
    req.body.price = parseFloat(req.body.item_unitprice);
    req.params.dn_id = req.params.dn_id + "";

    var safetyCheck = isNaN(req.body.expire_dt) || isNaN(req.body.donate_dt) ||
      isNaN(req.body.weight) || isNaN(req.body.item_qt) || wrong_dnid(req.params.dn_id);

    if (safetyCheck == true) {
      res.status(404).send({
        error: "有哪裡出錯了！(日期/數量/重量/全贈字號)？！"
      });
      return;
    }

    var newDonateItem = {
      donor_name: req.body.donor_name,
      contractor: req.body.contractor,
      item_name: req.body.item_name,
      area: req.body.area,
      expire_dt: req.body.expire_dt,
      category: req.body.category,
      weight: req.body.weight,
      item_unit: req.body.item_unit,
      item_qt: req.body.item_qt,
      item_unitprice: req.body.item_unitprice,
      memo: req.body.item_qt,
      donate_dt: req.body.donate_dt
    };
    var newStockItem = {
      dn_id: req.params.dn_id,
      item_name: req.body.item_name,
      item_unit: req.body.item_unit,
      item_qt: req.body.item_qt,
      item_unitprice: req.body.item_unitprice,
      category: req.body.category,
      expire_dt: req.body.expire_dt,
      donor_name: req.body.donor_name
    }
    var newBarcodeItem = {
      barcode: req.body.barcode,
      item_name: req.body.item_name,
      item_unit: req.body.item_unit
    }

    var promiseList = [];

    promiseList.push(Donation.find().sort({
      dn_id: -1
    }).limit(1).exec());

    promiseList.push(Donor.findOne({
      donor_name: req.body.donor_name
    }).exec());

    promiseList.push(User.findOne({
      account: req.body.contractor
    }).exec());

    promiseList.push(Barcode.findOne({
      item_name: req.body.item_name
    }).exec());


    Promise.all(promiseList).then(function(promiseResults) {
      var maxResult = promiseResults[0];
      if (maxResult.length > 0 &&
          parseInt(req.params.dn_id) < parseInt(maxResult[0].dn_id) &&
          !req.body._id) {
        res.status(400).send({
          error: "全贈字號有誤!"
        })
        return;
      }

      var foundDonor = promiseResults[1];
      if (!foundDonor) {
        res.status(400).send({
          error: "無此捐贈者!"
        })
        return;
      }

      var foundUser = promiseResults[2]
      if(!foundUser) {
        res.status(404).send({
          error: "無此承辦人!"
        })
        return;
      }

      var barcodeNew = promiseResults[3];
      if (req.body.barcode) {
        if (barcodeNew) {
          barcodeNew.remove();
        }
        var newBarcode = new Barcode(newBarcodeItem);
        newBarcode.save(errTest);
      }

      Donation.findOneAndUpdate({
        _id: req.body._id
      }, newDonateItem).exec(function(err, donateResult) {
        // Update:
        if (donateResult) {
          Stock.findOneAndUpdate({
            _id: donateResult.stock_id
          }, newStockItem).exec(function(err, stock_result) {
            res.status(200).send({
              success: "此物品已成功更新！"
            });
          })

        // Create:
        } else {
          var newStock = new Stock(newStockItem);
          newStock.save(function(err, saved) {
            newDonateItem["stock_id"] = saved._id;
            newDonateItem["dn_id"] = req.params.dn_id;
            var newDonation = new Donation(newDonateItem);
            newDonation.save(errTest);
            res.status(200).send({
              success: "新物品已成功登入！"
            });
          })
        }
      })
    })
  })
  .delete(function(req, res) {
    var searchKey = req.query.searchKey;
    var searchName = decodeURI(req.params.dn_id);
    var itemQuery = {};
    itemQuery[searchKey] = searchName;

    Donation.find({
      dn_id: req.params.dn_id
    }).exec(function(err, donation_result) {
      if (donation_result.length > 0) {
        donation_result.forEach(function(el) {
          el.remove();
        });

        Stock.find({
          dn_id: req.params.dn_id
        }).exec(function(err, stock_result) {
          if (stock_result.length > 0) {
            stock_result.forEach(function(el) {
              el.remove();
            });
          }
          res.status(200).send({
            success: "此物品已刪除！"
          });
        })
      } else {
        res.status(404).send({
          error: "找不到此物品！"
        });
      }
    });
  })


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
