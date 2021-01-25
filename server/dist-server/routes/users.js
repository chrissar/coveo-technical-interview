"use strict";

var _express = _interopRequireDefault(require("express"));

var _https = _interopRequireDefault(require("https"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var API_URL = process.env.COVEO_API_URL;
console.log('hi', process.env.COVEO_API_URL);
/* GET users listing. */

router.get('/', function (req, res, next) {
  var a = _https["default"].get("".concat(API_URL, "search?access_token=058c85fd-3c79-42a3-9236-b83d3558810d3&q=test"), function (resp) {
    var data = '';
    resp.on('data', function (chunk) {
      data += chunk;
    });
    resp.on('end', function () {
      return JSON.parse(data);
    });
  }).on('error', function (err) {
    return err.message;
  });

  res.send(a);
});
module.exports = router;