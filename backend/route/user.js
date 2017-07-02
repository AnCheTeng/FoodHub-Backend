var express = require('express');
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
          auth: result.auth,
          account: result.account,
          user_name: result.user_name,
          success: "成功登入!"
        })
      } else {
        res.status(404).send({
          error: "您哪位？"
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

    var searchKey = req.query.searchKey;
    var searchName = decodeURI(req.params.account);
    var userQuery = {};
    userQuery[searchKey] = searchName;

    User.find(userQuery).exec(function(err, result) {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({
          error: "找不到使用者！",
          searchKey: req.query.searchKey,
          searchName: req.params.account,
          theQuery: userQuery
        });
      }
    });
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
          success: "新使用者已登入!"
        });
      } else {
        res.status(400).send({
          error: "權限只能為'admin'或'user'!"
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
          success: "使用者已刪除！"
        })
      } else {
        res.status(200).send({
          success: "找無此使用者!"
        })
      }
    })
  })

module.exports = router;
