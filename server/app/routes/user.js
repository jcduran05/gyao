'use strict';
var router = require('express').Router();
module.exports = router;
var db = require('../../db')
var User = db.model('user');
var UserShow = db.model('user_show');
var Show = db.model('show');
var Promise = require('bluebird')

router.get('/shows', function (req, res, next) {
  User.findById(req.user.id)
  .then(function(userShows) {
    res.status(200).send(userShows);
  })
});

router.post('/shows/add/:showId', function (req, res, next) {
  var data = {
    showId: req.params.showId,
    userId: req.body.id || req.user.id
  };

  UserShow.create(data)
  .then(function(userShow) {
    res.status(200).send(userShow);
  })
  .catch(next);
});
