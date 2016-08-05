// site:video.9tsu.com/video/
// site:channel.pandora.tv/channel/video.ptv?
// site:miomio.tv/watch/
// site:dailymotion.com/video/

// Tools for scraping
var path = require('path');
var read = require('fs').readFileSync;
var fs = require('fs');
var moment = require('moment');

// DB settings
var chalk = require('chalk');
var db = require('../server/db');
var Show = db.model('show');
var Episode = db.model('episode');
var Promise = require('sequelize').Promise;

var jsonResults = fs.readFileSync('./9tsu_results.json', 'utf8');
var resultsObj = JSON.parse(jsonResults);

var show_episodes = [];
for (var idx in resultsObj.items) {
  console.log(resultsObj.items[idx].link);
  console.log(resultsObj.items[idx].pagemap.metatags[0]['og:title'])
}
