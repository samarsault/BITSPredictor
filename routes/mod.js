var express = require('express');
var db = require('../data');
var router = express.Router();

/* GET users listing. */
router.get('/:fb_id', function (req, res, next) {
    var fb_id=req.param('fb_id');
    db.isMod(fb_id, (yes) => {
        if (yes) {
            res.render('moderator');
        } else {
            res.render('error', {
                message: 'Not authorized'
            });
        }
    });
});

module.exports = router;