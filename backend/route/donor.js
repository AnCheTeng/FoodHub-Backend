var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

var Donor = require('../model/Donor');

router.route('/list')
  .get(function(req, res) {
    Donor.find().exec(function(err, result) {
      res.status(200).send(result);
    });
  })

router.route('/:donor_name')
  .get(function(req, res) {
    Donor.findOne({
      donor_name: req.params.donor_name
    }).exec(function(err, result) {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(400).send({
          error: "Donor " + req.params.donor_name + " not found!"
        });
      }
    })
  })
  .post(function(req, res) {
    Donor.findOne({
      donor_name: req.params.donor_name
    }).exec(function(err, result) {
      if (result) {
        result.remove();
      }

      var newDonor = new Donor(req.body);
      newDonor.donor_name = req.params.donor_name;
      newDonor.save();
      res.status(200).send({
        success: "Donor has been created!"
      })
    })

  })
  .delete(function(req, res) {
    Donor.findOne({
      donor_name: req.params.donor_name
    }).exec(function(err, result) {
      if (result) {
        result.remove();
        res.status(200).send({
          success: "Donor has been deleted"
        })
      } else {
        res.status(200).send({
          success: "Donor not found!"
        })
      }
    })
  })

module.exports = router;
