var request = require('request');
var serverUrl = "http://localhost:8080";


// // |========================================|
// // |API: GET /donee/:donee_name             |
// // |========================================|
// request.get({
//   url: serverUrl + '/donee/zizi'
// }, callbackFunction);


// // |========================================|
// // |API: POST /donee/:donee_name            |
// // |========================================|
// request.post({
//   url: serverUrl + '/donee/zizi',
//   form: {
//     phone: "0910345678",
//     address: "我住在嘉義啦",
//     area: "嘉義",
//     category: "Foodhub",
//     contact: "zizi",
//     contact_phone: "0910345678",
//     email: "zizi@gmail.com",
//   }
// }, callbackFunction);


// // |========================================|
// // |API: DELETE /donee/:donee_name          |
// // |========================================|
// request.delete({
//   url: serverUrl + '/donee/zizi'
// }, callbackFunction);




// // |========================================|
// // |API: GET /donor/:donor_name             |
// // |========================================|
// request.get({
//   url: serverUrl + '/donor/zizi'
// }, callbackFunction);

// // |========================================|
// // |API: POST /donor/:donor_name            |
// // |========================================|
// request.post({
//   url: serverUrl + '/donor/zizi',
//   form: {
//     ic: "abcde",
//     phone: "0910345678",
//     address: "我住在嘉義啦",
//     area: "嘉義",
//     category: "Foodhub",
//     contact: "zizi",
//     contact_phone: "0910345678",
//     email: "zizi@gmail.com",
//   }
// }, callbackFunction);

// // |========================================|
// // |API: DELETE /donor/:donor_name          |
// // |========================================|
// request.delete({
//   url: serverUrl + '/donor/zizi'
// }, callbackFunction);



// // |========================================|
// // |API: POST /user/login                   |
// // |========================================|
// request.post({
//   url: serverUrl + '/user/login/zizi',
//   form: {
//     pw: "foodhublalala"
//   }
// }, callbackFunction);



// // |========================================|
// // |API: GET /user/list                     |
// // |========================================|
// request.get({
//   url: serverUrl + '/user/list'
// }, callbackFunction);

// // |========================================|
// // |API: GET /user/:account                 |
// // |========================================|
// request.get({
//   url: serverUrl + '/user/zizi'
// }, callbackFunction);

// |========================================|
// |API: POST /user/:account                |
// |========================================|
request.post({
  url: serverUrl + '/user/zizi',
  form: {
    user_name: "Zizi",
    user_unit: "NCKU",
    phone: "03-23456789",
    area: "ChiaYi",
    auth: "user",
    password: "foodhub"
  }
}, callbackFunction);

// // |========================================|
// // |API: DELETE /user/:account              |
// // |========================================|
// request.delete({
//   url: serverUrl + '/user/erica'
// }, callbackFunction);



// // |========================================|
// // |API: GET /barcode/:barcode           |
// // |========================================|
// request.get({
//   url: serverUrl + '/barcode/13572468'
// }, callbackFunction);



// |========================================|
// |API: DELETE /donateItem/:itemId         |
// |========================================|
// // request.delete({
// //   serverUrl + '/donation/10503002',
// // }, callbackFunction);



// |==============================================|
// |API: GET /donateItem/:searchName?searchKey=xxx|
// |==============================================|
// request.get({
//   url: serverUrl + '/donation/' + encodeURI("開心果")+'?searchKey=item_name'
// }, callbackFunction);



// // |========================================|
// // |API: POST /donateItem/:itemId           |
// // |========================================|
// request.post({
//   url: serverUrl + '/donation/10504002',
//   form: {
//     donor_name: "boss",
//     item_name: "開心果",
//     area: "台中",
//     expire_dt: Date.parse("2016/03/01"),
//     category: "營養品",
//     weight: 150,
//     item_unit: "盒",
//     item_qt: 5,
//     item_unitprice: 200,
//     memo: "描述物品",
//     donate_dt: Date.parse("2016/02/20"),
//     barcode: "13572468"
//   }
// }, callbackFunction);


function callbackFunction(error, response, body) {
  if(error != undefined){
    console.log(error);
  } else {
    console.log(body);
  }
}
