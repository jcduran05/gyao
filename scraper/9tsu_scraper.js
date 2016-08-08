module.exports = {

run: function(showIdToScrape) {

// Tools for scraping
var path = require('path');
var read = require('fs').readFileSync;
var fs = require('fs');
var cheerio = require('cheerio');
var moment = require('moment');
var _ = require('lodash');
var http = require('http');

// DB settings
var chalk = require('chalk');
var db = require('../server/db');
var Show = db.model('show');
var Episode = db.model('episode');
var EpisodeUrl = db.model('episode_url');
var Promise = require('sequelize').Promise;

// var html = read(path.resolve(__dirname, '9tsu_results.html'));
// var $ = cheerio.load(html);

// Create array to hold episodes
var show_episodes = [];
var show_episodes_create = [];

// Data to import into the table
Show.find({
  where: {
    id: showIdToScrape
  }
})
.then(function(show) {
  return show;
})
.then(function(show) {

  var options = {
    'host': 'http://video.9tsu.com',
    'path': '/search/all/' + show.name
  };

  // Making http request
  http.get('http://video.9tsu.com/search/all/' + show.name, function (res) {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function () {
      console.log(body);
      var $ = cheerio.load(body);
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
        if (epName) epName = epName[0].replace(/[【】「」[]]/g, '');

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
    })

    return Promise.all(show_episodes_create);

  }).on('error', function(err) {
    console.log('Got error: ', err);
  });

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
  return;
})
.catch(function(err) {
  console.log(err);
  return;
});

}
};
