var express = require('express');
var router = express.Router();

var Stock = require('../model/Stock');

router.route('/expiry_date/:days')
  .get(function(req, res) {
    var days = parseInt(req.params.days);

    if (days > 30) {
      res.status(400).send({
        warning: "Bad request"
      })
    } else {

      var date1 = +new Date;
      var date2 = date1 + Date.parse("2017/1/"+(1+days)) - Date.parse("2017/1/1");

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
            warning: "All foods are expired within "+days+" days",
          });
        }
      });
    }
  })


module.exports = router;
