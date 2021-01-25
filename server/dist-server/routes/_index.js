"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/* GET home page. */


router.get('/', function (req, res, next) {
  var a = https.get("https://cloudplatform.coveo.com/rest/search?access_token=058c85fd-3c79-42a3-9236-b83d35588103&q=test", function (resp) {
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
var _default = router;
exports["default"] = _default;