var request = require('request');

// |========================================|
// |API: POST /donateItem/:itemId           |
// |========================================|

request.get({
  url: 'http://localhost:8080/donation/donateItem/1456761600000',
  form: {
    searchKey: "expire_dt"
  }
}, function(error, response, body) {
  if(error != undefined){
    console.log(error);
  } else {
    console.log(body);
  }
});



// request.post({
//   url: 'http://localhost:8080/donation/donateItem/10503002',
  // form: {
  //   name: "開心果",
  //   serialNumber: 2938410,
  //   category: "營養品",
  //   area: "台中",
  //   quantity: 5,
  //   unit: "盒",
  //   weight: 150,
  //   donateDate: "2016/02/20",
  //   expiryDate: "2016/03/01",
  //   donater: "boss",
  //   record: "描述物品",
  //   barcode: "29384918 54239485",
  //   price: 200
  // }
// }, function(error, response, body) {
//   if(error != undefined){
//     console.log(error);
//   } else {
//     console.log(body);
//   }
// });
