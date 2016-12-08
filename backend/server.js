// npm install
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// DB Schema
var User = require('./model/User');
var Donations = require('./model/Donation');
var Barcode = require('./model/Barcode');

// route
var userRoute = require('./route/user')
var donationRoute = require('./route/donation')
var barcodeRoute = require('./route/barcode')

var app = express();

mongoose.connect('mongodb://localhost/foodbank');

console.log("===========================Server is starting===========================");

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));
app.use(express.static('../frontend'));

app.use(function(req, res, next) {
  // log
  console.log('Request Type:', req.method);
  console.log('Response URL:', req.originalUrl);
  console.log("----------------------------------------");
  next();
}, function(req, res, next) {
  // id-preprocess
  next();
});

app.use('/user', userRoute);
app.use('/donation', donationRoute);
app.use('/barcode', barcodeRoute);


app.get('/', function(request, response) {
  console.log('Hi, we are foodbank!');
});

app.listen('8080', function(request, response) {
  console.log('listening to 8080 port');
});
