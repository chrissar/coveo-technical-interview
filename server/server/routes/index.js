import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const a = https.get("https://cloudplatform.coveo.com/rest/search?access_token=058c85fd-3c79-42a3-9236-b83d35588103&q=test", (resp) => {
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

export default router;
