var express = require('express');
var router = express.Router();

var Donee = require('../model/Donee');

router.route('/list')
  .get(function(req, res) {
    Donee.find().exec(function(err, result) {
      res.status(200).send(result);
    });
  })

router.route('/:donee_name')
  .get(function(req, res) {

    var searchKey = req.query.searchKey;
    var searchName = decodeURI(req.params.donee_name);
    var doneeQuery = {};
    doneeQuery[searchKey] = searchName;

    Donee.find(doneeQuery).exec(function(err, result) {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({
          error: "找不到此受贈者！",
          searchKey: req.query.searchKey,
          searchName: req.params.donee_name,
          theQuery: doneeQuery
        });
      }
    });
  })
  .post(function(req, res) {
    Donee.findOne({
      donee_name: req.params.donee_name
    }).exec(function(err, result) {
      if (result) {
        result.remove();
      }

      var newDonee = new Donee(req.body);
      newDonee.donee_name = req.params.donee_name;
      newDonee.save();
      res.status(200).send({
        success: "新受贈者已登入!"
      })
    })

  })
  .delete(function(req, res) {
    Donee.findOne({
      donee_name: req.params.donee_name
    }).exec(function(err, result) {
      if (result) {
        result.remove();
        res.status(200).send({
          success: "受贈者已刪除！"
        })
      } else {
        res.status(200).send({
          success: "無此受贈者!"
        })
      }
    })
  })

module.exports = router;
