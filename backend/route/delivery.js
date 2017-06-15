var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

var Delivery = require('../model/Delivery');
var Stock = require('../model/Stock');

router.route('/max_icid')
  .get(function(req, res) {
    Delivery.find().sort({
      ic_id: -1
    }).limit(1).exec(function(err, maxResult) {
      if (err) {
        res.status(404).send({
          warning: "ERROR"
        });
      }

      if (maxResult.length > 0 && !isNaN(maxResult[0].ic_id)) {
        res.status(200).send(maxResult[0].ic_id);
      } else {
        var time = new Date();
        var new_icid = (time.getFullYear() - 1911) + "0000";
        console.log(new_icid);
        res.status(200).send(new_icid);
      }
    });
  })

router.route('/:ic_id')
  .post(function(req, res) {
    res.status(200).send("HI");
  })
  .delete(function(req, res) {
    res.status(200).send("HI");
  })


function wrong_icid(new_ic_id) {
  new_ic_id = new_ic_id + "";
  var time = new Date();
  var taiwan_year = time.getFullYear() - 1911;

  if (new_ic_id.indexOf(taiwan_year) != 0 || new_ic_id.length != 7) {
    return true;
  } else {
    return false;
  }
}

function errTest(err) {
  if (err) console.log(err);
}


module.exports = router;
