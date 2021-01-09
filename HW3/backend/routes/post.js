var express = require('express');
var router = express.Router();
const Parse = require('parse/node');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('post');
});

module.exports = router;
