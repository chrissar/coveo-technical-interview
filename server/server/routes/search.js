import express from 'express';
import https from 'https';
import url from 'url';
import cors from 'cors';
import queryString from 'query-string';
let router = express.Router();
let c = cors();
router.post('/', c, function (req, res, next) {
  let body = req.body;
  const options = {
    hostname: process.env.COVEO_API_URL,
    path: '/rest/search',
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Authorization": `Bearer ${process.env.COVEO_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(body).length,
    }
  }

  return new Promise((resolve, reject) => {
    let request = https.request(options, res => {
      let response = "";

      console.log(options);

      if (200 < res.statusCode && 300 > res.statusCode) {
        return resolve(res.headers);
      }

      if (400 <= res.statusCode) {
        let err = new Error(response);
        err.statusCode = res.statusCode;
        return reject(err);
      }

      res.on("data", function (chunk) {
        response += chunk;
      });

      res.on("end", () => {
        let reply = JSON.parse(response);
        resolve(reply);
      });
    });

    request.write(JSON.stringify(body));

    request.on('error', function (err) {
      return reject(err);
    });

    request.end();
  }).catch((e) => {
    console.log(e);
  }).then(response => {
    res.send(response);
  })
});

module.exports = router;
