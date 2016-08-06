// site:video.9tsu.com/video/
// site:channel.pandora.tv/channel/video.ptv?
// site:miomio.tv/watch/
// site:dailymotion.com/video/

// Tools for scraping
var path = require('path');
var read = require('fs').readFileSync;
var fs = require('fs');
var moment = require('moment');
var _ = require('lodash');

// DB settings
var chalk = require('chalk');
var db = require('../server/db');
var Show = db.model('show');
var Episode = db.model('episode');
var EpisodeUrl = db.model('episode_url');
var Promise = require('sequelize').Promise;

var jsonResults = fs.readFileSync('./9tsu_results.json', 'utf8');
var resultsObj = JSON.parse(jsonResults);

for (var idx in resultsObj.items) {
  // console.log(resultsObj.items[idx].link);
  // console.log(resultsObj.items[idx].pagemap.metatags[0]['og:title'])
}

// Create array to hold episodes
var show_episodes = [];
var show_episodes_tmp = [];
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

  console.log(resultsObj.items.length);
  // found for a given show
  for (var idx in resultsObj.items) {
    // console.log(resultsObj.items[idx]);
    var nameRegex = /【.*】/g;
    var dateRegex = /\d+月\d+日/g;

    var titleRegex = new RegExp(show.name,"g");
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

    // console.log(epName);
    // console.log(epUrl);
    // console.log(epDate);
    // console.log('=========');

    // Only episodes that have a name
    // and date will be registered
    if (epName, epDate) {
      var epObj = {
        name: epName,
        url: epUrl,
        date: epDate,
        showId: show.id
      };

      var epObjCreate = {
        name: epName,
        date: epDate,
        showId: show.id
      };

      // if (!_.find(show_episodes_create, { 'name': epObj.name})) show_episodes_create.push(epObjCreate);
      if (!_.find(show_episodes, { 'name': epObj.name})) {
        show_episodes_tmp.push(epObjCreate);
        show_episodes.push(epObj);
      }
    }
  }

  show_episodes_tmp.forEach(function(ep) {
    show_episodes_create.push(Episode.findOrCreate( { where: ep } ));
  })

  console.log(show_episodes_create);
  // console.log(show_episodes);

  return Promise.all(show_episodes_create);
  // return;
})
// .then(function (episodes) {

//   var epUrls = [];
//   episodes.forEach(function(ep) {
//     var currentEp = _.find(show_episodes, { 'name': ep[0].name} )

//     if (currentEp) {

//       epUrls.push(
//         EpisodeUrl.findOrCreate({
//           where: {
//             episodeId: ep[0].id,
//             url: currentEp.url
//           }
//         })
//       );

//     }
//   });

//   return Promise.all(epUrls);
// })
.then(function() {
  console.log(chalk.bgGreen.bold('Data scraping successful!'));
  process.exit(0);
})
.catch(function(err) {
  console.log(err);
  process.exit(1);
})
