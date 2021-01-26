"use strict";

var _express = _interopRequireDefault(require("express"));

var _https = _interopRequireDefault(require("https"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', function (req, res, next) {
  var API_URL = process.env.COVEO_API_URL;
  var COVEO_ACCESS_TOKEN = process.env.COVEO_ACCESS_TOKEN;
  new Promise(function (resolve, reject) {
    _https["default"].get("".concat(API_URL, "search?access_token=").concat(COVEO_ACCESS_TOKEN, "&q=Rousse"), function (res) {
      var statusCode = res.statusCode,
          message = res.message;
      var contentType = res.headers['content-type'];
      var error;

      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' + "Status Code: ".concat(statusCode, "\n") + "Message: ".concat(message));
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' + "Expected application/json but received ".concat(contentType));
      }

      if (error) {
        console.error(error.message); // consume response data to free up memory

        res.resume();
      }

      res.setEncoding('utf8');
      var rawData = '';
      res.on('data', function (chunk) {
        rawData += chunk;
      });
      res.on('end', function () {
        try {
          var parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          reject(e.message);
        }
      });
    }).on('error', function (e) {
      reject("Got error: ".concat(e.message));
    });
  }).then(function (response) {
    res.send(response);
  })["catch"](function (error) {
    res.send(error);
  });
});
module.exports = router;