'use strict';
var router = require('express').Router();
module.exports = router;
var db = require('../../db')
var Show = db.model('show')
var Promise = require('bluebird')

router.get('/', function (req, res, next) {
  Show.findAll()
  .then(function(shows) {
    res.status(200).send(shows);
  })
});

router.get('/:showId', function (req, res, next) {
  Show.findById(req.params.showId)
  .then(function(shows) {
    res.status(200).send(shows);
  })
});
