var express = require('express');
var router = express.Router();
var passport = require('passport');
var sha1 = require('js-sha1');
var md5 = require('md5');
var md5hex = require('md5-hex');

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

router.post("/issandboxtrue", async (req, res) => {
  res.send(req.user.sandbox);
});
router.post("/getlicense/:id", async (req, res) => {
  const licenses = req.user.licenses;
  const id = req.params.id;
  const result = licenses.find((e, i, a) => {
    return e === id;
  });
  res.send(!!result);
})
router.post("/register", (req, res) => {
  const {username, password } = req.body;
  User.findOne({ username: username}, (result, err) => {
    if(result) res.send("Error 1");
  });
  const newUser = new User({username: username, password: password});
  newUser.save().then((response) => res.send("there are a success" + response)).catch(err => res.send('There are a error' + err));
});

router.post("/hash", (req, res) => {
  try {
    const {hash} = req.body;
    const hashmd5 = md5(hash);
    const hashsha1 = sha1(hashmd5);
    res.send(hashsha1);
} catch(error) {
  res.send(error);
}
})

module.exports = router;
