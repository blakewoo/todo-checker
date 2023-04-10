var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.isLogin) {
    return res.render('my_schedule',{title:req.session.ID});
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

router.get('/target', function(req, res, next) {
  if(req.session.isLogin) {
    return res.render('target_schedule',{title:req.session.ID,USER_ID:req.session.ID});
    // return res.render('under_construction',{title:req.session.ID,USER_ID:req.session.ID});
  }
  else {
    return res.redirect('/');
  }
});

router.get('/chatting', function(req, res, next) {
  if(req.session.isLogin) {
    return res.render('chatting',{title:req.session.ID,USER_ID:req.session.ID});
    // return res.render('under_construction',{title:req.session.ID,USER_ID:req.session.ID});
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
router.get('/schedule_setting', function(req, res, next) {
  if(req.session.isLogin) {
    return res.render('schedule_setting',{title:req.session.ID,USER_ID:req.session.ID});
  }
  else {
    return res.redirect('/');
  }
});

module.exports = router;
