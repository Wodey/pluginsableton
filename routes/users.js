var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Слушаю ПОшлую молли и всем советую');
});

router.post("/", function(req, res, next) {
  res.send({...req.body, res: "listening poshlay molly"});
});

router.post("/reqLis", function(req, res, next) {
  res.send({...req.body, res: true});
});

router.post("/login", function(req, res, next) {
  res.send({...req.body});
})

module.exports = router;
