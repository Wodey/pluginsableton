var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Слушаю ПОшлую молли и всем советую');
});

router.post("/", function(req, res, next) {
  res.send({...req.body, res: "Слушаю моргенштерна и радуюсь жизни"});
});

module.exports = router;
