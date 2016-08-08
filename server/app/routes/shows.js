'use strict';
var router = require('express').Router();
module.exports = router;
var db = require('../../db')
var Show = db.model('show');
var UserShow = db.model('user_show');
var googleCSE = require('../../../scraper/googleCustomSearch.js');
var config = require('../../../config.json');

router.get('/', function (req, res, next) {
  Show.findAll()
  .then(function(shows) {
    res.status(200).send(shows);
  })
  .catch(next);
});

router.get('/:showId', function (req, res, next) {
  Show.scope('showEpisodes').findById(req.params.showId)
  .then(function(shows) {
    res.status(200).send(shows);
  })
  .catch(next);
});

router.get('/scrape/:showId', function (req, res, next) {
  googleCSE.run(config.googleCSE_9tsuCX, '9tsu', req.params.showId);
  googleCSE.run(config.googleCSE_dailyCX, 'daily', req.params.showId);
  Show.scope('showEpisodes').findById(req.params.showId)
  .then(function(shows) {
    res.status(200).send(shows);
  })
  .catch(next);

  // var cse_9tsu = Promise.promisify(googleCSE.run, {context: googleCSE});
  // var cse_daily = Promise.promisify(googleCSE.run, {context: googleCSE});

  // cse_9tsu(config.googleCSE_9tsuCX, '9tsu', req.params.showId)
  // .then(function() {
  //   return cse_daily(config.googleCSE_dailyCX, 'daily', req.params.showId);
  // })
  // .then(function() {
  //   return Show.scope('showEpisodes').findById(req.params.showId);
  // })
  // .then(function(shows) {
  //   res.status(200).send(shows);
  // })
  // .catch(next);
});
