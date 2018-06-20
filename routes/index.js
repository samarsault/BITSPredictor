var express = require('express');
var db = require('../data');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var goa=[], pilani=[], hyd=[];
  db.get('pilani', function (rows) {
    pilani = rows;
    db.get('goa', function (gRows) {
      goa = gRows;
      console.log(goa);
      db.get('hyderabad', function(hRows) {
        hyd = hRows;
        res.render('index', {
          pilani: pilani,
          goa: goa,
          hyderabad: hyd
        });
      });
    })
  })
});

module.exports = router;
