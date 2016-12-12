var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
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
    Donee.findOne({
      donee_name: req.params.donee_name
    }).exec(function(err, result) {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(400).send({
          error: "Donee " + req.params.donee_name + " not found!"
        });
      }
    })
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
        success: "Donee has been created!"
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
          success: "Donee has been deleted"
        })
      } else {
        res.status(200).send({
          success: "Donee not found!"
        })
      }
    })
  })

module.exports = router;