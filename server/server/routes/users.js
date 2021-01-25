import express from 'express';
import https from 'https';
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
  const API_URL = process.env.COVEO_API_URL;
  const a = https.get(`${API_URL}search?access_token=058c85fd-3c79-42a3-9236-b83d3558810d3&q=test`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    })
    resp.on('end', () => {
      return (JSON.parse(data));
    });
  }).on('error', (err) => {
    return (err.message);
  });
  res.send(a);
});

module.exports = router;
