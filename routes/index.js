var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainApp/main');
});

router.get('/:page', function (req, res, next) {
  res.render('mainApp/req.params.page');
});

module.exports = router;
