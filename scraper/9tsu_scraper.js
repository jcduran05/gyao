// Tools for scraping
var path = require('path');
var read = require('fs').readFileSync;
var fs = require('fs');
var cheerio = require('cheerio');
var moment = require('moment');
var _ = require('lodash');

// DB settings
var chalk = require('chalk');
var db = require('../server/db');
var Show = db.model('show');
var Episode = db.model('episode');
var EpisodeUrl = db.model('episode_url');
var Promise = require('sequelize').Promise;

var html = read(path.resolve(__dirname, '9tsu_results.html'));
var $ = cheerio.load(html);

// Create array to hold episodes
var show_episodes = [];
var show_episodes_create = [];

// Data to import into the table
Show.find({
  where: {
    name: '月曜から夜ふかし'
  }
})
.then(function(show) {
  return show;
})
.then(function(show) {

  // found for a given show
  $('.left').each(function() {
    var data = $(this);
    var nameRegex = /【.*】/g;
    var dateRegex = /\d+月\d+日/g;
    // Contain episode name, date, and url
    var epUrl = data.find('a').attr('href');
    // Need to case as not all are links
    if (epUrl) {
      var epName = epUrl.match(nameRegex);
      var epDate = dateRegex.exec(epUrl);
    }

    // 括弧を削除。他の種類も削除しないと。
    if (epName) epName = epName[0].replace(/[【】]/g, '');

    // Format episode date
    if (epDate) {
      epDate = epDate[0].replace(/[】]/g, '');
      epDate = moment('2016年' +  epDate, 'YYYY-MM-DD').format();
    }

    // Only episodes that have a name
    // and date will be registered
    if (epName, epDate) {
      var epObj = {
        name: epName,
        url: epUrl,
        date: epDate,
        showId: show.id
      };

      show_episodes_create.push(
        Episode.findOrCreate({
          where: {
            name: epName,
            date: epDate,
            showId: show.id
          }
        })
      );

      show_episodes.push(epObj);
    }
  });

  return Promise.all(show_episodes_create);
})
.then(function (episodes) {

  var epUrls = [];
  episodes.forEach(function(ep) {
    var currentEp = _.find(show_episodes, { 'name': ep[0].name} )

    if (currentEp) {

      epUrls.push(
        EpisodeUrl.findOrCreate({
          where: {
            episodeId: ep[0].id,
            url: currentEp.url
          }
        })
      );

    }
  });

  return Promise.all(epUrls);
})
.then(function() {
  console.log(chalk.bgGreen.bold('Data scraping successful!'));
  process.exit(0);
})
.catch(function(err) {
  console.log(err);
  process.exit(1);
})

//Testing
// Create array to hold episodes
// found for a given show
// var show_episodes = [];
// $('.left').each(function() {
//   var data = $(this);
//   var nameRegex = /【.*】/g;
//   var dateRegex = /\d+月\d+日/g;
//   // Contain episode name, date, and url
//   var epUrl = data.find('a').attr('href');
//   console.log(data.find('a'));
//   // Need to case as not all are links
//   if (epUrl) {
//     var epName = epUrl.match(nameRegex);
//     var epDate = dateRegex.exec(epUrl);
//   }

//   // 括弧を削除。他の種類も削除しないと。
//   if (epName) epName = epName[0].replace(/[【】]/g, '');

//   // Format episode date
//   if (epDate) {
//     epDate = epDate[0].replace(/[】]/g, '');
//     epDate = moment('2016年' +  epDate, 'YYYY-MM-DD').format();
//   }

//   // Only episodes that have a name
//   // and date will be registered
//   if (epName, epDate) {
//     epObj = {
//       name: epName,
//       url: epUrl,
//       date: epDate,
//       // showId: show.id
//     };

//     show_episodes.push(epObj);
//   }
// });
