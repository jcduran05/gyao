// Tools for scraping
var path = require('path');
var read = require('fs').readFileSync;
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var _ = require('lodash');
var http = require('http');
var https = require('https');
var requestify = require('requestify');

// DB settings
var chalk = require('chalk');
var db = require('../server/db');
var Show = db.model('show');
var Episode = db.model('episode');
var EpisodeUrl = db.model('episode_url');
var Promise = require('sequelize').Promise;
var google = require('googleapis');
var customSearch = google.customsearch('v1');

var options = {
  url: 'http://video.9tsu.com/search/all/月曜から夜ふかし',
  method: 'GET', //Specify the method
  gzip: true,
  'cache-control': 'no-store, no-cache'
};



var show_episodes = [];
var show_episodes_tmp = [];
var show_episodes_create = [];

  customSearch.cse.list({q: '月曜から夜ふかし', key: '', cx: ''}, function(err, body) {

    // console.log(body);
    var resultsObj = body;
  // var resultsObj = JSON.parse(body);

  // found for a given show
  for (var idx in resultsObj.items) {
    // console.log(resultsObj.items[idx]);
    var nameRegex = /【.*】/g;
    var dateRegex = /\d+月\d+日/g;

    var titleRegex = new RegExp('月曜から夜ふかし',"g");
    var specialCharsRegex = /[【】「」]/g;

    // Contain episode name, date, and url
    var epUrl = resultsObj.items[idx].link;
    // Need to case as not all are links
    if (epUrl) {
      var epName = resultsObj.items[idx].pagemap.metatags[0]['og:title'];
      var epDate = dateRegex.exec(epName);
    }

    // 括弧を削除。他の種類も削除しないと。
    if (epName) epName = epName.replace(titleRegex, '');
    if (epName) epName = epName.replace(specialCharsRegex, '');
    if (epName) epName = epName.replace(dateRegex, '').trim();

    // Format episode date
    if (epDate) epDate = moment('2016年' +  epDate[0], 'YYYY-MM-DD').format();

    // Only episodes that have a name
    // and date will be registered
    if (epName, epDate) {
      var epObj = {
        name: epName,
        url: epUrl,
        date: epDate,
      };

      var epObjCreate = {
        name: epName,
        date: epDate,
      };

      // if (!_.find(show_episodes_create, { 'name': epObj.name})) show_episodes_create.push(epObjCreate);
      if (!_.find(show_episodes, { 'name': epObj.name})) {
        show_episodes_tmp.push(epObjCreate);
        show_episodes.push(epObj);
      }
    }
  }

  show_episodes_tmp.forEach(function(ep) {
    // show_episodes_create.push(Episode.findOrCreate( { where: ep } ));
  });

  console.log(show_episodes)
  return show_episodes_create;
  });
