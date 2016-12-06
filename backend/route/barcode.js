var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Barcode = require('../model/Barcode');

var router = express.Router();

router.route('/:barcode')
  .get(function(req, res){
    Barcode.findOne({
      bar_code: req.params.barcode
    }).exec(function(err, result){
      if(result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({warning: "Barcode not found!"});
      }
    })
  })

module.exports = router;
