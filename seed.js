/*
Uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/
var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Show = db.model('show');
var UserShow = db.model('user_show');
var Episode = db.model('episode');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'jcduran05@gmail.com',
            password: 'fsa'
        },
        {
            email: 'sayako.uchiyama@gmail.com',
            password: 'oreo'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);
};

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
        console.log(chalk.bgGreen.bold('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
