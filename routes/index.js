var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.login) {
    return res.render('index');
  }
  else {
    return res.render('login');
  }
});

module.exports = router;
