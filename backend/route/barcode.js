var express = require('express');
var router = express.Router();

var Barcode = require('../model/Barcode');

router.route('/:barcode')
  .get(function(req, res){
    Barcode.findOne({
      barcode: req.params.barcode
    }).exec(function(err, result){
      if(result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({warning: "找不到條碼!"});
      }
    })
  })

module.exports = router;
