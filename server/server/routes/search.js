import express from 'express';
import https from 'https';
let router = express.Router();

router.get('/', function (req, res, next) {

  const API_URL = process.env.COVEO_API_URL;
  const COVEO_ACCESS_TOKEN = process.env.COVEO_ACCESS_TOKEN;

  new Promise((resolve, reject) => {
    https.get(`${API_URL}search?access_token=${COVEO_ACCESS_TOKEN}&q=Rousse`, (res) => {
      let { statusCode, message } = res;
      let contentType = res.headers['content-type'];

      let error;

      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
          `Status Code: ${statusCode}\n` +
          `Message: ${message}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
          `Expected application/json but received ${contentType}`);
      }

      if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
      }

      res.setEncoding('utf8');
      let rawData = '';

      res.on('data', (chunk) => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          reject(e.message);
        }
      });
    }).on('error', (e) => {
      reject(`Got error: ${e.message}`);
    });

  }).then(response => {
    res.send(response);
  }).catch(error => {
    res.send(error);
  })
});

module.exports = router;
