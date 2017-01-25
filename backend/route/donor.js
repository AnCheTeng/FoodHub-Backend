var express = require('express');
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

    var searchKey = req.query.searchKey;
    var searchName = decodeURI(req.params.donor_name);
    var donorQuery = {};
    donorQuery[searchKey] = searchName;

    Donor.find(donorQuery).exec(function(err, result) {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({
          error: "Donor not found",
          searchKey: req.query.searchKey,
          searchName: req.params.donor_name,
          theQuery: donorQuery
        });
      }
    });
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
