var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.isLogin) {
    return res.render('index');
  }
  else {
    return res.render('login');
  }
});

router.get('/signup', function(req, res, next) {
    return res.render('signup');
});

module.exports = router;
