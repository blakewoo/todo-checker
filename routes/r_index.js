var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.isLogin) {
    return res.render('mySchedule',{title:req.session.ID});
  }
  else {
    return res.render('login');
  }
});

router.get('/myinfo', function(req, res, next) {
  if(req.session.isLogin) {
    return res.render('myInfo',{title:req.session.ID,USER_ID:req.session.ID});
  }
  else {
    return res.redirect('/');
  }
});

router.get('/target', function(req, res, next) {
  if(req.session.isLogin) {
    return res.render('targetSchedule',{title:req.session.ID,USER_ID:req.session.ID});
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
  req.session.destroy(function (err) {
    if(err) {
      console.error(err)
    }
    return res.redirect("/")
  })
});

router.get('/signup', function(req, res, next) {
    return res.render('signUp');
});

router.get('/schedule_setting', function(req, res, next) {
  if(req.session.isLogin) {
    return res.render('scheduleSetting',{title:req.session.ID,USER_ID:req.session.ID});
  }
  else {
    return res.redirect('/');
  }
});

module.exports = router;
