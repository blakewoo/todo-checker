var express = require('express');
var router = express.Router();

// This function does not conform to the api specification
router.post('/', function(req, res, next) {

});

module.exports = router;
