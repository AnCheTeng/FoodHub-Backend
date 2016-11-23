// npm install
var express = require('express');
var mongoose = require('mongoose');

// DB Schema
var User = require('./model/User');

// route
var userRoute = require('./route/user')

var app = express();

// mongoose.connect('mongodb://localhost/foodbank');

console.log("===========================Server is starting===========================");

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static('../frontend'));

app.use('/user', userRoute);

app.get('/', function(request, response) {
  console.log('Hi, we are foodbank!');
});

app.listen('8080', function(request, response) {
  console.log('listening to 8080 port');
});
