'use strict';

var router = require('express').Router();
module.exports = router;
var db = require('../../db');
var chalk = require('chalk');
var UserShow = db.model('user_show');
var schedule = require('node-schedule');
var googleCSE = require('../../../scraper/googleCustomSearch.js');

UserShow.findAll()
.then(function(userShows) {
    var jobs = {};
    userShows.forEach(function(userShow, idx) {

        jobs['job' + idx] = schedule.scheduleJob('*/1 * * * *', function(){
            if (userShow.showId == 18) {
                googleCSE.run(process.env.googleCSE_9tsuCX, '9tsu', userShow.showId);
                googleCSE.run(process.env.googleCSE_dailyCX, 'daily', userShow.showId);
                console.log(chalk.bgGreen.bold('Cron ran successfully for id 18!'));
            }
        });
    });

    console.log(jobs);
    return userShows;
});
