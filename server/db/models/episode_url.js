'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('episode_url', {
    url: {
        type: Sequelize.STRING(800)
    },
    site: {
        type: Sequelize.STRING
    },
    picture: {
        type: Sequelize.STRING
    },
}, {
    instanceMethods: {},
    classMethods: {}
});
