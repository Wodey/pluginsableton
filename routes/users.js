var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/userModel');
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

router.post("/login", passport.authenticate('local'), (req, res) => {
  res.send("Successfull Authentication");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("Successfull Logout");
})

router.post("/register", async (req, res) => {
  const {username, password } = req.body;
  User.findOne({ username: username}, (result, err) => {
    if(result) res.send("Error 1");
  });
  const newUser = new User({username: username, password: password});
  const result = await newUser.save();
  res.send("success but no")
  req.login(newUser, (error) => {
    if (error) throw error;
    return res.send("Successfull registration and login");
  });
});

module.exports = router;
