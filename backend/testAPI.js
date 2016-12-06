var request = require('request');
var serverUrl = "http://localhost:8080";



// |========================================|
// |API: GET /barcode/:barcode           |
// |========================================|
request.get({
  url: serverUrl + '/barcode/13572468'
}, callbackFunction);



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
//   url: serverUrl + '/donation/160',
//   form: {
//     searchKey: "weight"
//   }
// }, callbackFunction);



// // |========================================|
// // |API: POST /donateItem/:itemId           |
// // |========================================|
// request.post({
//   url: serverUrl + '/donation/10503002',
//   form: {
//     name: "開心果",
//     serialNumber: 2938410,
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
