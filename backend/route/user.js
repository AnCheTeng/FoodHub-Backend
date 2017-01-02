var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

var User = require('../model/User');

router.route('/login/:account')
  .post(function(req, res) {
    User.findOne({
      account: req.params.account,
      password: req.body.pw
    }).exec(function(err, result) {
      if (result) {
        res.status(200).send({
          success: "Login successfully!"
        })
      } else {
        res.status(404).send({
          error: "Who are you?"
        })
      }
    })
  })

router.route('/list')
  .get(function(req, res) {
    User.find().exec(function(err, result) {
      res.status(200).send(result);
    })
  })

router.route('/:account')
  .get(function(req, res) {
    User.findOne({
      account: req.params.account
    }).exec(function(err, result) {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(400).send({
          error: "User " + req.params.account + " not found!"
        });
      }
    })
  })
  .post(function(req, res) {
    User.findOne({
      account: req.params.account
    }).exec(function(err, result) {
      if (result) {
        result.remove();
      }

      if(req.body.auth=="admin" || req.body.auth=="user"){
        var newUser = new User(req.body);
        newUser.account = req.params.account;
        newUser.save();
        res.status(200).send({
          success: "User has been created!"
        });
      } else {
        res.status(400).send({
          error: "Authentication can only be 'admin' or 'user'!"
        });
      }

    })

  })
  .delete(function(req, res) {
    User.findOne({
      account: req.params.account
    }).exec(function(err, result) {
      if (result) {
        result.remove();
        res.status(200).send({
          success: "User has been deleted"
        })
      } else {
        res.status(200).send({
          success: "User not found!"
        })
      }
    })
  })

module.exports = router;
