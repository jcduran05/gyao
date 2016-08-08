// Tools for scraping
var path = require('path');
var read = require('fs').readFileSync;
var fs = require('fs');
var cheerio = require('cheerio');

// DB settings
var chalk = require('chalk');
var db = require('../server/db');
var Show = db.model('show');
var Promise = require('sequelize').Promise;

var html = read(path.resolve(__dirname, 'ntv_program_list.html'));
var $ = cheerio.load(html);

var shows = [];
$('.variety').next().find('li').each(function() {
  var data = $(this);
  var showName = data.text();
  var showUrl = data.find('a').attr('href');

  var search_showName = showName;
  if (showName == 'another sky') search_showName = 'アナザースカイ';
  if (showName == '世界の果てまでイッテQ！') search_showName = '世界の果てまでイッテQ';

  showObj = {
    name: showName,
    search_name: search_showName,
    url: showUrl
  };
  shows.push(showObj);
});

Show.bulkCreate(shows)
.then(function() {
  console.log(chalk.bgGreen.bold('Data scraping successful!'));
  process.exit(0);
})
.catch(function (err) {
  console.error(err);
  process.exit(1);
});



