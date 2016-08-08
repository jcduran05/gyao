'use strict';
var router = require('express').Router();
module.exports = router;
var db = require('../../db')
var User = db.model('user');
var UserShow = db.model('user_show');

router.get('/shows', function (req, res, next) {
  User.scope('userShows').findById(req.user.id)
  .then(function(userShows) {
    res.status(200).send(userShows);
  })
});

router.post('/shows/add/:showId', function (req, res, next) {
  UserShow.findOrCreate({
    where: {
      showId: req.params.showId,
      userId: req.user.id
    }
  })
  .then(function(userShow) {
    res.status(200).send(userShow);
  })
  .catch(next);
});
