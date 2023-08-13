var express = require('express');
let sessionCheckPage = require("../module/m_verify_user").user_auth_page
let sessionCheckRedirect = require("../module/m_verify_user").user_auth_redirect
var router = express.Router();

router.get('/',sessionCheckPage, function(req, res, next) {
    return res.render('mySchedule',{title:req.session.ID});
});

router.get('/myinfo',sessionCheckRedirect, function(req, res, next) {
    return res.render('myInfo',{title:req.session.ID,USER_ID:req.session.ID});
});

router.get('/target',sessionCheckRedirect, function(req, res, next) {
    return res.render('targetSchedule',{title:req.session.ID,USER_ID:req.session.ID});
});

router.get('/chatting',sessionCheckRedirect, function(req, res, next) {
    return res.render('chatting',{title:req.session.ID,USER_ID:req.session.ID});
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

router.get('/schedule_setting',sessionCheckRedirect, function(req, res, next) {
    return res.render('scheduleSetting',{title:req.session.ID,USER_ID:req.session.ID});
});

module.exports = router;
