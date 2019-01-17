var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.write("contact us ");
  res.end();
});

module.exports = router;