var request = require('request');
var serverUrl = "http://localhost:8080";


// |========================================|
// |API: POST /user/login                   |
// |========================================|
request.post({
  url: serverUrl + '/user/login/zizi',
  form: {
    pw: "foodhublalala"
  }
}, callbackFunction);


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

// // |========================================|
// // |API: POST /user/:account                |
// // |========================================|
// request.post({
//   url: serverUrl + '/user/zizi',
//   form: {
//     user_name: "Zizi",
//     user_unit: "NCKU",
//     phone: "03-23456789",
//     area: "ChiaYi",
//     auth: 1,
//     password: "foodhub"
//   }
// }, callbackFunction);

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



// // |========================================|
// // |API: GET /donateItem/:itemId            |
// // |========================================|
// request.get({
//   url: serverUrl + '/donation/' + encodeURI("開心果"),
//   form: {
//     searchKey: "item_name"
//   }
// }, callbackFunction);



// // |========================================|
// // |API: POST /donateItem/:itemId           |
// // |========================================|
// request.post({
//   url: serverUrl + '/donation/10503002',
//   form: {
//     name: "開心果",
//     category: "營養品",
//     area: "台中",
//     quantity: 5,
//     unit: "盒",
//     weight: 150,
//     donateDate: "2016/02/20",
//     expiryDate: "2016/03/01",
//     donater: "boss",
//     record: "描述物品",
//     barcode: "29384918 54239485",
//     price: 200,
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
