'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');


module.exports = db.define('show', {
    name: {
        type: Sequelize.STRING
    },
    search_name: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING
    },
}, {
    instanceMethods: {},
    classMethods: {}
});
