var has = function(obj, key) {
  return key.split(".").every(function(x) {
      if(typeof obj != "object" || obj === null || ! x in obj)
          return false;
      obj = obj[x];
      return true;
  });
};

module.exports = {
  run: function(cxCode, site, showIdToScrape) {

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

    var google = require('googleapis');
    var customSearch = google.customsearch('v1');

    // Create array to hold episodes
    var show_episodes = [];
    var show_episodes_tmp = [];
    var show_episodes_create = [];

    // Data to import into the table
    Show.find({
      where: {
        id: showIdToScrape
      }
    })
    .then(function(show) {

      var currentShowName = show.search_name || show.name;

      // console.log('=============');
      // console.log('=============');
      // console.log(currentShowName);
      // console.log(process.env.googleCSEKey);
      // console.log(cxCode);
      // console.log('=============');
      // console.log('=============');
      customSearch.cse.list({q: currentShowName, key: process.env.googleCSEKey, cx: cxCode}, function(err, body) {
        var resultsObj = body;
        // found for a given show
        for (var idx in resultsObj.items) {
          // console.log(resultsObj.items[idx]);
          var nameRegex = /【.*】/g;
          var dateRegex = /\d+月\d+日/g;

          var titleRegex = new RegExp(currentShowName,"g");
          var specialCharsRegex = /[【】「」]/g;

          // Contain episode name, date, and url
          var resultData = resultsObj.items[idx];
          var epUrl = has(resultData,'link') ? resultData.link : '';
          console.log('=============');
          console.log('=============');
          console.log(epUrl)
          console.log(resultData);

          // Need to case as not all are links
          if (epUrl) {
            var epName = has(resultData,'pagemap.metatags.og:title') ? resultData.pagemap.metatags[0]['og:title'] : '' ;
            console.log(epName);
            var epDate = dateRegex.exec(epName);
          }

          console.log('=============');
          console.log('=============');

          // Delete brackets characters and different bracket variations
          if (epName) epName = epName.replace(titleRegex, '');
          if (epName) epName = epName.replace(specialCharsRegex, '');
          if (epName) epName = epName.replace(dateRegex, '').trim();

          // Format episode date
          if (epDate) epDate = moment('2016年' +  epDate[0], 'YYYY-MM-DD').format();

          // Only episodes that have a name
          // and date will be registered
          if (epName && epDate && epUrl) {
            var epObj = {
              name: epName,
              url: epUrl,
              site: site,
              date: epDate,
              showId: show.id
            };

            var epObjCreate = {
              name: epName,
              date: epDate,
              showId: show.id
            };

            // if (!_.find(show_episodes_create, { 'name': epObj.name})) show_episodes_create.push(epObjCreate);
            if (!_.find(show_episodes, { 'name': epObj.name })) {
              show_episodes_tmp.push(epObjCreate);
              show_episodes.push(epObj);
            }
          }
        }

        show_episodes_tmp.forEach(function(ep) {
          if (ep.name && ep.date) {
            show_episodes_create.push(Episode.findOrCreate( { where: ep } ));
          }
        });

        Promise.all(show_episodes_create)
        .then(function (episodes) {
          // console.log(show_episodes);
          var epUrls = [];
          episodes.forEach(function(ep) {
            var currentEp = _.find(show_episodes, { 'name': ep[0].name} )

            if (currentEp) {

              epUrls.push(
                EpisodeUrl.findOrCreate({
                  where: {
                    episodeId: ep[0].id,
                    site: currentEp.site,
                    url: currentEp.url
                  }
                })
              );

            }
          });

          return Promise.all(epUrls);
        }) // Promise all close
      });

    })
    .then(function() {
      console.log(chalk.bgGreen.bold('Data scraping successful!'));
    })
    .catch(function(err) {
      console.log(err);
    })


  } // close run function
}; // close module exports
