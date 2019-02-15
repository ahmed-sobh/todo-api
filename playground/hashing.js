// var { SHA256 } = require('crypto-js');


// var data = {
//   key: 10
// };

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'secret').toString()
// };

// token.data.key = 11;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var hash = SHA256(JSON.stringify(token.data)+ 'secret').toString();
// console.log(token.hash === hash);


var jwt = require('jsonwebtoken');

var data = {
  key: 12
};


var token = jwt.sign(data, 'asdf');
var decoded = jwt.verify(token, 'asdf');

console.log(decoded);