'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));

router.use('/shows', require('./shows'));
router.use('/user', require('./user'));
router.use('/mail', require('./mail'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
