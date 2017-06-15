var request = require('request');
var serverUrl = "http://localhost:8080";

// // |========================================|
// // |API: GET /stock/barcode/:barcode       |
// // |========================================|
// request.get({
//   url: serverUrl + '/stock/barcode/24681357'
// }, callbackFunction);

// // |========================================|
// // |API: GET /stock/expire_dt/:days       |
// // |========================================|
// request.get({
//   url: serverUrl + '/stock/expire_dt/2'
// }, callbackFunction);


// // |========================================|
// // |API: GET /donation/list                    |
// // |========================================|
// request.get({
//   url: serverUrl + '/donation/list'
// }, callbackFunction);


// // |========================================|
// // |API: GET /donee/list                    |
// // |========================================|
// request.get({
//   url: serverUrl + '/donee/list'
// }, callbackFunction);

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
// // |API: GET /donor/list                    |
// // |========================================|
// request.get({
//   url: serverUrl + '/donor/list'
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
//     pw: "foodhub"
//   }
// }, callbackFunction);



// // |========================================|
// // |API: GET /user/list                     |
// // |========================================|
// request.get({
//   url: serverUrl + '/user/list'
// }, callbackFunction);

// // |========================================|
// // |API: GET /user/:account?searchKey=xxx   |
// // |========================================|
// request.get({
//   url: serverUrl + '/user/zizi?searchKey=account'
// }, callbackFunction);
//
// request.get({
//   url: serverUrl + '/user/ChiaYi?searchKey=area'
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
//     auth: "user",
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



// // |========================================|
// // |API: DELETE /donation/:itemId         |
// // |========================================|
// request.delete({
//   url: serverUrl + '/donation/1060002',
// }, callbackFunction);

// // |==============================================|
// // |API: GET /donation/:searchName?searchKey=xxx|
// // |==============================================|
// request.get({
//   url: serverUrl + '/donation/593762d81cd7de4430c57cd4?searchKey=_id'
// }, callbackFunction);

// // |==============================================|
// // |API: GET /donation/:searchName?searchKey=xxx|
// // |==============================================|
// request.get({
//   url: serverUrl + '/donation/' + encodeURI("開心果")+'?searchKey=item_name'
// }, callbackFunction);

// // |==============================================|
// // |API: GET /donation/:searchName?searchKey=xxx|
// // |==============================================|
// request.get({
//   url: serverUrl + '/donation/1060003?searchKey=dn_id'
// }, callbackFunction);

// |==============================================|
// |API: GET /delivery/:searchName?searchKey=xxx|
// |==============================================|
request.get({
  url: serverUrl + '/stock/' + encodeURI("花生餅乾")+'?searchKey=item_name'
}, callbackFunction);


// |==============================================|
// |API: GET /stock/:searchName?searchKey=xxx|
// |==============================================|
request.get({
  url: serverUrl + '/stock/' + encodeURI("開心果")+'?searchKey=item_name'
}, callbackFunction);

// // |========================================|
// // |API: POST /donation/:dn_id              |
// // |========================================|
// request.post({
//   url: serverUrl + '/donation/1060009',
//   form: {
//     donor_name: "boss",
//     item_name: "花生餅乾",
//     contractor: "zizi",
//     area: "台中",
//     expire_dt: Date.parse("2017/01/28"),
//     category: "營養品",
//     weight: 150,
//     item_unit: "盒",
//     item_qt: 5,
//     item_unitprice: 200,
//     memo: "描述物品",
//     donate_dt: Date.parse("2016/02/20")
//   }
// }, callbackFunction);

// |========================================|
// |API: POST /delivery/:dn_id              |
// |========================================|
request.post({
  url: serverUrl + '/delivery/1060001',
  form: {
    ic: "12344321",
    stock_id: "59428dcbc37d0c88219f92ae",
    donee_name: "ssd",
    contractor: "zizi",
    delivery_dt: Date.parse("2017/01/28"),
    item_qt: 1,
    memo: "描述物品",
  }
}, callbackFunction);

// // |========================================|
// // |API: POST /donation/:dn_id              |
// // |========================================|
// request.post({
//   url: serverUrl + '/donation/1060005',
//   form: {
//     _id: "594286fb55435f081c8096df",
//     donor_name: "ssd",
//     item_name: "花生餅乾",
//     contractor: "zizi",
//     area: "台中",
//     expire_dt: Date.parse("2017/01/28"),
//     category: "營養品",
//     weight: 150,
//     item_unit: "盒",
//     item_qt: 5,
//     item_unitprice: 200,
//     memo: "描述物品",
//     donate_dt: Date.parse("2016/02/20")
//   }
// }, callbackFunction);

// // |========================================|
// // |API: GET /donation/max_dnid              |
// // |========================================|
// request.get({
//   url: serverUrl + '/donation/max_dnid',
// }, callbackFunction);


function callbackFunction(error, response, body) {
  if(error != undefined){
    console.log(error);
  } else {
    console.log(body);
  }
}
