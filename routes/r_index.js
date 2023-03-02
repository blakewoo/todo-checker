var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.isLogin) {
    return res.render('index',{title:req.session.ID});
  }
  else {
    return res.render('login');
  }
});

router.get('/myinfo', function(req, res, next) {
  if(req.session.isLogin) {
    return res.render('myinfo',{title:req.session.ID,USER_ID:req.session.ID});
  }
  else {
    return res.redirect('/');
  }
});

router.get('/logout', function(req, res, next) {
  req.session.ID = null
  req.session.isLogin = null
  req.session.isAdmin = null
  return res.redirect("/")
});

router.get('/signup', function(req, res, next) {
    return res.render('signup');
});


module.exports = router;
