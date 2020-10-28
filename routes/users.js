var express = require('express');
var router = express.Router();
var passport = require('passport');
var client = require('../db');

var User = require('../models/userModel');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Слушаю ПОшлую моЛлли и всем советую');
});

router.post("/", function(req, res, next) {
  res.send({...req.body, res: "listening poshlay molly"});
});

router.post("/reqLis", function(req, res, next) {
  res.send({...req.body, res: true});
});

router.post("/login", passport.authenticate('local'), (req, res) => {
  res.send("Successfull Authentication");
});

router.post("/test2", async (req, res) => {
  const newUser = new User({username: "hi", password: "fuck"});
  try {
      const result = await newUser.save();
  } catch (e) {
    res.send(e)
  }
  res.send(result)

})
router.get("/logout", (req, res) => {
  req.logout();
  res.send("Successfull Logout");
})

router.get("/test", async (req, res) => {
  const user = await User.find({});
  res.send(user);
})

router.post("/register", async (req, res) => {
  const {username, password } = req.body;
  User.findOne({ username: username}, (result, err) => {
    if(result) res.send("Error 1");
  });
  const newUser = new User({username: username, password: password});
  const result = newUser.save((err) => res.send(err));
  res.send('succes')
});

module.exports = router;
