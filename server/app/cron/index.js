'use strict';

var router = require('express').Router();
module.exports = router;
var db = require('../../db');
var chalk = require('chalk');
var UserShow = db.model('user_show');
var schedule = require('node-schedule');
var googleCSE = require('../../../scraper/googleCustomSearch.js');
var config = require('../../../config.json');

UserShow.findAll()
.then(function(userShows) {
    var jobs = {};
    userShows.forEach(function(userShow, idx) {
        jobs['job' + idx] = schedule.scheduleJob('*/10 * * * *', function(){
            if (userShow.showId == 18) {
                googleCSE.run(config.googleCSE_9tsuCX, '9tsu', userShow.showId);
                googleCSE.run(config.googleCSE_dailyCX, 'daily', userShow.showId);
                console.log(chalk.bgGreen.bold('Cron ran successfully for id 18!'));
            }
        });
    });
    return;
});
